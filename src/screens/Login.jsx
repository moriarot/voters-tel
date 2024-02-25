import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import Utils from '../components/Utils';
import './Login.css';
import { GRAPH, TABLE } from '../MainNavigator';
const apiKey = "a12345bC4@11!lo9987"

const Login = ({ setPage }) => {
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [sentCode, setSentCode] = useState(false);
  const [sentSecondCode, setSentSecondCode] = useState(false);
  const [loadingSentCode, setLoadingSentCode] = useState(false);
  const [loadingVertifyCode, setLoadingVertifyCode] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  const handleSendCode = () => {
    setLoadingSentCode(true)
    // Implement your code here to send a verification code
    console.log(`Sending code to ${phone}`);
    sendLogRequest();
  };
  const handleVerifyCode = () => {
    if(code.length == 6){
      setLoadingVertifyCode(true);
      sendVerifyCode();
    } else {
      Utils.showResponseDialog("קוד 6 ספרות בלבד",'שגיאה!')
    }
  }
  // the function check auth and if success, send code to phone
  const sendLogRequest = async () => {
    // Show the progress bar
    //progressBar.style.visibility = 'visible';
    if (name != '' && phone != ''  && phone.length == 10) {
      const parameters = new FormData();
      parameters.append('user_and_phone', true);
      parameters.append('apiKey', apiKey);
      parameters.append('name', name);
      parameters.append('phone', phone);

      // The actual request using fetch


      try {
        const response = await fetch('https://tak.co.il/election/index.php', {
          method: 'POST',
          body: parameters,
        });

        if (response.ok) {
          const responseData = await response.json(); // Parse the response as JSON

          if (responseData.success === true) {
            // Handle success
            setSentCode(true);
            setSessionId(responseData.sessionId);
          } else {
              Utils.showResponseDialog(responseData.message,'שגיאת הזדהות')
          }
        } else {
          Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
        }
      } catch (error) {
        Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
      }
    } else {
      Utils.showResponseDialog('אחד הנתונים שהזנת אינו תקין', 'שגיאת הזדהות')
    }
    setLoadingSentCode(false)
  }

  // the function verify code
  const sendVerifyCode = async () => {

    // Show the progress bar
    //progressBar.style.visibility = 'visible';
    const parameters = new FormData();
    parameters.append('verify_code', code);
    parameters.append('apiKey', apiKey);
    parameters.append('name', name);
    parameters.append('phone', phone);
    parameters.append('sessionId', sessionId);

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
          setSentCode(false);
          localStorage.setItem('userName', name)
          localStorage.setItem('userPhone', phone)
          localStorage.setItem('isAuthenticated', 'true');
          login();
          setPage(TABLE);
        } else {
          Utils.showResponseDialog(responseData.message,'שגיאה!')
        }
      } else {
        Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
      }
    } catch (error) {
       Utils.showResponseDialog('אירעה שגיאה , יש לנסות שנית','שגיאה!')
    }
    setLoadingVertifyCode(false);
  }


  return (
        <div className="container-login">
          <h1>ברוכים הבאים!</h1>
         {!sentCode ? 
          <div className='div-one-step-login'>
         <input
            className={`input ${nameFocused && 'greenUnderline'}`}
            placeholder="שם משתמש"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameFocused(false)}
            onFocus={() => setNameFocused(true)}
          />
          <input
            className={`input ${phoneFocused && 'greenUnderline'}`}
            placeholder="פלאפון"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setPhoneFocused(false)}
            onFocus={() => setPhoneFocused(true)}
          />
          <button className="button-login" onClick={handleSendCode}>
            {loadingSentCode ? 'טוען...' : 'התחברות'}
          </button>
          </div>
           : (
            // <div className="modalBackground">
              <div className="div-one-step-login">
                {/* <div className="titleModal">מצביעים</div> */}
                <input
                  className={`input ${codeFocused && 'greenUnderline'}`}
                  placeholder="קוד נשלח (6 ספרות)"
                  type="tel"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onBlur={() => setCodeFocused(false)}
                  onFocus={() => setCodeFocused(true)}
                />
                <button className={`button-login`} onClick={handleVerifyCode}>
                  {loadingVertifyCode ? 'טוען..' : 'התחברות'}
                </button>
                {sentSecondCode && <div style={{ textAlign: 'center', marginTop: 5 }}>נשלח קוד שוב...</div>}
                 <div style={{ textAlign: 'center', marginTop: 5 }}>לא קילבת קוד?
                 <span className="send-again" onClick={() => { handleSendCode(); setSentSecondCode(true); }}>
                    שלח שוב
                  </span>
                 </div>
                
                {/* <div className="buttonModalContainer">
                  <button className="buttonModal" onClick={() => { setSentCode(false); setCodeFocused(false); }}>
                    בטל
                  </button>
                  <button className="buttonModal" onClick={() => { handleSendCode(); setSentSecondCode(true); }}>
                    שלח שוב
                  </button>
                </div> */}
              </div>
            // </div>
          )}
        </div>
  );
};

export default Login;
