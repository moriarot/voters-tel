import React, { useEffect, useState } from 'react';

import ProgressGraph from '../components/ProgressGraph';
import BarGraph from '../components/Graph';
import Utils from '../components/Utils';
import { useDataElection } from '../context/DataElectionContext';
// import { useStatuses } from '../context/StatusesContext';
// import DropDownPicker from 'react-native-dropdown-picker';
import { HOME } from '../MainNavigator';
import './GraphsScreen.css';

export default function GraphsScreen({setPage}) {
  const [arrValuesGraph, setArrValuesGraph] = useState([[0,0], [0,0], [0,0]]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { electionId, sumAllSupport, sumSupportVoted } = useDataElection();

  useEffect(() => {
    // Set interval to execute the function every 30 seconds
    const intervalId = setInterval(fetchDataGraphs, 30000);
    // const intervalId = setInterval(getDataTable, 5000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs once after the initial render

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
      // parameters.append('get_graphs', true);
      parameters.append('get_graphs_sql', true);
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
        // console.log('Server response:', responseData);
    
        
        // [[votedSupport, notVSupport], [votedNoKnow, notVNoKnow], [votedNoKnow, notVNoKnow]]
        // [[1&1, (0||2)&1], [1&2, (0||2)&2], [1&(0||3||4), (0||2)&(0||3||4)] ] 
        let countAllVoted = 0;
        let countAllNotVoted = 0;
        const arrValues = [
          [0, 0], 
          [0, 0], 
          [0, 0]]
      responseData.message.forEach((item)=>{
        switch (item.status3) {
          case '1':
            {
            countAllVoted += parseInt(item.count, 10);
            switch (item.status) {
              case '1':
                arrValues[0][0]+= parseInt(item.count, 10);
                break;
                case '2':
                  arrValues[1][0]+= parseInt(item.count, 10);
                  break;
                case '0':
                case '3':
                case '4':
                default:
                  arrValues[2][0]+= parseInt(item.count, 10);
                  break;
            }
            break;
          }
          case '0':
          case '2':
          default:
            {
            countAllNotVoted += parseInt(item.count, 10);

            switch (item.status) {
              
              case '1':
                arrValues[0][1]+= parseInt(item.count, 10);
                break;
                case '2':
                  arrValues[1][1]+= parseInt(item.count, 10);
                  break;
                case '0':
                case '3':
                case '4':
                default:
                  arrValues[2][1]+= parseInt(item.count, 10);
                  break;
            }
            break;
          }
          }
        })
        setArrValuesGraph(arrValues);
        const percentage = countAllVoted / (countAllVoted + countAllNotVoted);
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
        <button className='button-change-page' onClick={()=>{setPage(HOME)}}>חזור למסך הבית</button>
      {<div className='container-graph'>
        <div className='title-graphs'>
          {/* <div>התומכים שלנו</div> */}
          <div>כלל המצביעים</div>
        </div>
        <div className='body-graphs'>
      <div>
      <BarGraph arrValuesGraph={arrValuesGraph}/>

        {/* <h1 className="note title">*סטטוס המספרים עבור התומכים של רשימה זו</h1> */}

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

