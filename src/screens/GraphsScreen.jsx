import React, { useEffect, useState } from 'react';

import ProgressGraph from '../components/ProgressGraph';
import BarGraph from '../components/Graph';
import Utils from '../components/Utils';
import { useDataElection } from '../context/DataElectionContext';
// import { useStatuses } from '../context/StatusesContext';
// import DropDownPicker from 'react-native-dropdown-picker';
import { TABLE } from '../MainNavigator';
import './GraphsScreen.css';
export default function GraphsScreen({setPage}) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { electionId, sumAllSupport, sumSupportVoted } = useDataElection();

  useEffect(() => {
    fetchDataGraphs();
  }, []);

  const fetchDataGraphs = async () => {
    if (!electionId) {
      Utils.showResponseDialog('אירעה שגיאה', 'שגיאה!')
      return;
    }

    setLoading(true);
    try {
      const apiKey = "a12345bC4@11!lo9987"
      const userName = localStorage.getItem('userName');
      const userPhone = localStorage.getItem('userPhone');
      const parameters = new FormData();
      parameters.append('get_graphs', true);
      parameters.append('apiKey', apiKey);
      parameters.append('name', userName);
      parameters.append('phone', userPhone);
      parameters.append('electionId', electionId);
      parameters.append('statusTypeId', '3'); // status voted

      const response = await fetch('https://tak.co.il/election/index.php', {
        method: 'POST',
        body: parameters
      });

      if (response.ok) {
        const responseData = await response.json();
        const percentage = responseData['הצביע'] / responseData.total;
        setProgress(percentage.toFixed(3));
        // setLoading(false);
      } else {
        setLoading(false);
        Utils.showResponseDialog('אירעה שגיאה', 'שגיאה!')
      }
    } catch (error) {
      setLoading(false);
      Utils.showResponseDialog('אירעה שגיאה', 'שגיאה!')
    }
  }

  return (
    <div className="appContainer">
        <button className='button-change-page' onClick={()=>{setPage(TABLE)}}>חזור לטבלה</button>
      {<div className='container-graph'>
        <div className='title-graphs'>
          <div>התומכים שלנו</div>
          <div>כלל המצביעים</div>
        </div>
        <div className='body-graphs'>
      <div>
      <BarGraph sumSupportVoted={sumSupportVoted} sumSupportNotVoted={(sumAllSupport-sumSupportVoted)} />

        <h1 className="note title">*סטטוס המספרים עבור התומכים של רשימה זו</h1>

      </div> 
        <div>
        <ProgressGraph progress={progress} />

        <h1 className="note title">*אחוז המצביעים מכלל בעלי הזכות ברשות</h1>

      </div>
      </div>
      </div>}
    </div>
  );
};

