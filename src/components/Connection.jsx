import React, { useState } from 'react';
import Utils from '../components/Utils';
import contact from '../assets/Contact.svg';
import whatsapp from '../assets/Whatsapp.svg';
import email from '../assets/Email.svg';
import message from '../assets/message.svg';
import phoneIcon from '../assets/phone.svg';
import './Connection.css';
const CALL = 'call';
const WHATSAPP = 'Whatsapp';

const Connection = ({phone}) => {
  const [openConnection, setOpenConnection] = useState(false);
  const [textMsg, setTextMsg] = useState('');
  const [writeMsg, setWriteMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [call, setCall] = useState(false);
  const [loading, setLoading] = useState(false);

  const showConnection = () => {
    setOpenConnection(!openConnection);
  };
  const openMsgWhatsapp = ()=>{
    setOpenConnection(false);
    setWriteMsg(true);
  }
  const handleChange = (e) =>{
    //chech data
    setTextMsg(e.target.value);
  }
  const sendWhatsapp = () =>{
    whatsappVoter();
  }
  const callVoter = async () => {
    setCall(true);

    // const name = localStorage.getItem('userName')
    const userPhone = localStorage.getItem('userPhone')
    const apiKey = "a12345bC4@11!lo9987"

    const parameters = new FormData();
    // parameters.append('get_voters_to_tel', true);
    parameters.append('call_to_voter', true);
    parameters.append('auth', true);
    parameters.append('apiKey', apiKey);
    // parameters.append('name', name);
    // parameters.append('phone', phone);
    parameters.append('phoneUser', userPhone);
    parameters.append('phoneVoter', phone);

    try {
      const response = await fetch('https://tak.co.il/election/index.php', {
        method: 'POST',
        body: parameters,
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse the response as JSON
        console.log('Server response:', responseData);

        // Process the responseData further, if needed
        if (responseData.success === true) {
          // Handle success
          // filter sow only support
          // const dataVotersSupport = responseData.message.filter(voter => (filterArr.includes(voter.status) && voter.status3 != "1"));
          // setDatatableVoterFilter(dataVotersSupport);
          // setSearch('');
          // setDatatable(dataVotersSupport);
          // setAllDatatableVoter(responseData.message)
          // updateNumbersSupportVored(responseData.message);
          // updateDataElectionArr(responseData.logos)
        } else {
          Utils.showResponseDialog(responseData.message,'שגיאה!')
        }
      } else {
        Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
      }
    } catch (error) {
       Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
    }
  }
  const whatsappVoter = async () => {
    const apiKey = "a12345bC4@11!lo9987";
    const name = localStorage.getItem('userName')
    const userPhone = localStorage.getItem('userPhone')

    const parameters = new FormData();
    parameters.append('whatsapp_to_voter', true);
    parameters.append('auth', true);
    parameters.append('apiKey', apiKey);
    parameters.append('name', name);
    parameters.append('phoneUser', userPhone);
    parameters.append('phoneVoter', phone);
    parameters.append('textMsg', textMsg);

    try {
      const response = await fetch('https://tak.co.il/election/index.php', {
        method: 'POST',
        body: parameters,
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse the response as JSON
        console.log('Server response:', responseData);

        // Process the responseData further, if needed
        if (responseData.success === true) {
          setSuccess(true);
        } else {
          // Utils.showResponseDialog(responseData.message,'שגיאה!')
          setError(responseData.message);
        }
      } else {
        Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
      }
    } catch (error) {
       Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
    }
  }
const finishWriteAndSend = () =>{
  if(!error){
    setTextMsg('');
  } else {
    setError('');
  }
  setSuccess(false); 
  setWriteMsg(false);
}
const finishCallAndSend = () =>{
  setCall(false);
  setSuccess(false); 
}
  return (
    <div className="connection-container">
      {!openConnection ? (
        <img onClick={showConnection} src={contact} alt="Contact" className="" />
      ) : (
        <div className="div-connection" >
          <img src={whatsapp} alt="WhatsApp" className="" onClick={openMsgWhatsapp} />
          {/* <img src={email} alt="Email" className="" /> */}
          {/* <img src={message} alt="Message" className="" /> */}
          <img src={phoneIcon} alt="Phone" onClick={()=>callVoter()} className="" />
        </div>
      )}
      {/* <writeMessage /> */}
      {/* {success && <div className='container-msg'>
       <div className='msg-background'>
        <div>ההודעה נשלחה בהצלחה</div>
        <button onClick={()=>setSuccess(false)}>סגור</button>
        <button onClick={()=>setWriteMsg(true)}>שלח הודעה נוספת</button>
        </div>
        </div>
         } */}
         {loading && <div className='container-msg'>
        <div className='msg-background'>
         <div>טוען...</div>
        {/* <button onClick={()=>setWriteMsg(true)}>שלח הודעה נוספת</button> */}
        </div> 
        </div> }
         {call && <div className='container-msg'>
        <div className='msg-background'>
         <div>מתקשר ל{phone}...</div>
        <button className='close-write-msg' onClick={finishCallAndSend}>סיימתי</button>
        {/* <button onClick={()=>setWriteMsg(true)}>שלח הודעה נוספת</button> */}
        </div> 
        </div> }
    {writeMsg && <div className='container-msg'>
      {(success || error) ? <div className='msg-background'>
        {error ? <div>{error}</div> : <div>ההודעה נשלחה בהצלחה</div>}
        <button className='close-write-msg' onClick={finishWriteAndSend}>סגור</button>
        {/* <button onClick={()=>setWriteMsg(true)}>שלח הודעה נוספת</button> */}
        </div> 
        : <div className='msg-background'>
      <div className='title-to-send-msg'>שליחת הודעת וואצאפ</div>
      <div>
        <div className='msg-to-phone'>אל:{phone}</div>
        {/* <div></div> */}
        <div>טקסט ההודעה:</div>
        {/* <input
          type="text"
          id="text-box"
          value={textMsg}
          onChange={handleChange}
          placeholder="כתוב כאן..."
        /> */}
        <textarea
          id="message"
          className='input-msg'
          name="message"
          value={textMsg}
          onChange={handleChange}
          rows={5} // You can adjust the number of rows as needed
        />
        </div>
        <div className='div-buttons'>
        <button className='close-write-msg' onClick={()=>setWriteMsg(false)}>סגור</button>
      <button className='send-msg-whatsapp' onClick={()=>sendWhatsapp()}>שלח</button>
      </div>
      </div>}
      </div>}
    </div>
  );
};

export default Connection;
