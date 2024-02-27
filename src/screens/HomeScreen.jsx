import React, { useEffect, useState } from 'react';
import './HomeScreen.css';
import table from '../assets/table.svg';
import settings from '../assets/settings.svg';
import graphs from '../assets/graphs.svg';
import { TABLE, GRAPH, SETTINGS } from '../MainNavigator';
import { useDataElection } from '../context/DataElectionContext';

const HomeScreen = ({setPage}) => {
    const [tokenWhatsapp, setTokenWhatsapp] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { updateDataElectionArr, updateNumbersSupportVored, electionId } = useDataElection()
    
    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        const name = localStorage.getItem('userName')
        const phone = localStorage.getItem('userPhone')
        const apiKey = "a12345bC4@11!lo9987"
  
        const parameters = new FormData();
        // parameters.append('get_voters_to_tel', true);
        parameters.append('get_voters', true);
        parameters.append('auth', true);
        parameters.append('apiKey', apiKey);
        parameters.append('name', name);
        parameters.append('phone', phone);
    
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
              updateNumbersSupportVored(responseData.message);
              updateDataElectionArr(responseData.logos)
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
    <div className='container-home'>
        
<div className='body-home'>
    <div onClick={() => setPage(TABLE)}>
          <img src={table} alt="table" className="" />
        <div>טלמרקטינג</div>
    </div>
    <div onClick={() => {if(!electionId) return; setPage(GRAPH)}} className={`${!electionId && 'laoding-data'}`}>
        <img src={graphs} alt="graphs" className="" />
        <div>תמונת מצב</div>
    </div>
    <div onClick={() => setPage(SETTINGS)}>
         <img src={settings} alt="settings" className="" style={{width: '6vw'}} />
         <div>הגדרות</div>
    </div>

        </div>
    </div>
  );
};

export default HomeScreen;
