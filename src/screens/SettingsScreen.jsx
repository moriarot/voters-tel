import React, { useEffect, useState } from 'react';
import './SettingsScreen.css';
import { HOME } from '../MainNavigator';

const SettingsScreen = ({setPage}) => {
    const [tokenWhatsapp, setTokenWhatsapp] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getTokenWhatsapp();
    }, []);
    
    const getTokenWhatsapp = async (callOrWhatsapp) => {
        const phone = localStorage.getItem('userPhone')
        const name = localStorage.getItem('userName')
        const apiKey = "a12345bC4@11!lo9987"
        
        const parameters = new FormData();
        parameters.append('get_tokenWhatsapp', true);
        parameters.append('apiKey', apiKey);
        parameters.append('phone', phone);
        parameters.append('name', name);
    
        try {
          const response = await fetch('https://tak.co.il/election/index.php', {
            method: 'POST',
            body: parameters,
          });
    
          if (response.ok) {
            const responseData = await response.json(); // Parse the response as JSON
            // console.log('Server response:', responseData);
    
            // Process the responseData further, if needed
            if (responseData.success === true) {
              setLoading(false)
                if(responseData.message == '' || responseData.message == null){
                    setErrMsg('לא מוגדר חיבור לוואצאפ למשתמש זה, אנא פנה לתמיכה');
                } else {
                    setTokenWhatsapp(responseData.message);
                }
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
  return (
    <div className='container-settings'>
        <div className='title-settings'>
            <div>הגדרות</div>
        </div>
        {loading && <div>טוען...</div>}
        {errMsg ? <div className='body-settings'>{errMsg} </div> 
        : <iframe
            src={"https://wa.app4you.co.il/api/Auth/login/" + tokenWhatsapp} // Replace with your settings page URL
            title="Settings"
            width="100%"
            height="500px"
            frameBorder="0"
        />}
        <button className='button-change-page' onClick={()=>{setPage(HOME)}}>חזור למסך הבית</button>
    </div>
  );
};

export default SettingsScreen;
