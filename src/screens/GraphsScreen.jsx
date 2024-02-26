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
  const [statusTypeId, setStatusTypeId] = useState('');
  const [labels, setLabels] = useState([]);
  const [dataNumbers, setDataNumbers] = useState([]);
  const [progress, setProgress] = useState(0.5);
  const [loading, setLoading] = useState(false);
//   const { electionId } = useDataElection();
//   const { statusesArr } = useStatuses();
  const [openDropDown, setOpenDropDown] = useState(false);
  const [statusesShow, setStatusesShow] = useState([]);
  const [openDropDownCity, setOpenDropDownCity] = useState(false);
  const [cityId, setCityId] = useState(0);

  useEffect(() => {
    fetchDataGraphs();
  }, [statusTypeId, cityId]);

//   useEffect(() => {
//     const renderedItems = statusesArr.map((status, index) => ({
//       label: status['statusTypeName'],
//       value: status['statusTypeId']
//     }));
//     setStatusesShow(renderedItems);
//     setStatusTypeId(renderedItems[0]?.value);
//   }, [statusesArr]);

  const fetchDataGraphs = async () => {
    if (localStorage.getItem('isAuthenticated')) {
    // if (!electionId || (!statusesArr && !statusTypeId)) {
    //   Utils.showResponseDialog('אירעה שגיאה', 'שגיאה!')
      return;
    }

    setLoading(true);
    try {
      const apiKey = "a12345bC4@11!lo9987"
      const userName = await AsyncStorage.getItem('userName');
      const userPhone = await AsyncStorage.getItem('userPhone');

    //   const statusTypeIdToPost = statusTypeId ? statusTypeId : statusesArr[0]['statusTypeId'];
      const parameters = new FormData();
      parameters.append('get_graphs', true);
      parameters.append('apiKey', apiKey);
      parameters.append('name', userName);
      parameters.append('phone', userPhone);
      parameters.append('electionId', 'electionId');
    //   parameters.append('statusTypeId', statusTypeIdToPost);

      const response = await fetch('https://tak.co.il/election/index.php', {
        method: 'POST',
        body: parameters
      });

      if (response.ok) {
        console.log('q2');
        const responseData = await response.json();

        const labelsFromData = Object.keys(responseData).filter(key => key !== "total");
        const numbersFromData = Object.values(responseData).filter(value => value !== responseData.total);
        const difference = responseData.total - responseData['לא ידוע'];
        const percentage = difference / responseData.total;

        setLabels(labelsFromData);
        setDataNumbers(numbersFromData);
        setProgress(percentage);
        setLoading(false);

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
        <button onClick={()=>{setPage(TABLE)}}>עבור לטבלה</button>
      {/* {loading || !labels ? <>
        <div className="loadingContainer">
          <ActivityIndicator size="large" color="#8EEEE5" />
        </div>
      </> :  */}
      {<div className='container-graph'>
        <div className='title-graphs'>
          <div>התומכים שלנו</div>
          <div>כלל המצביעים</div>
        </div>
        <div className='body-graphs'>
      <div>
      <BarGraph labels={labels} dataNumbers={dataNumbers} />

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

