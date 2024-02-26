import React, { useState, useEffect, useCallback } from 'react';
import './Table.css';
import searchIcon from  '../assets/Search.svg';
import filtering from  '../assets/filtering.svg';
import Connection from './Connection.jsx'
import { useDataElection } from '../context/DataElectionContext';
// import VoterDetails from './VoterDetails';
import Filtering from './Filtering';

const Table = () => {
  const title = ['שם התומך', 'תז', 'נייד', 'יישוב', 'מצב', 'הערה'];
  const [allDataTableVoter, setAllDatatableVoter] = useState([]);
  const [dataTableVoterFilter, setDatatableVoterFilter] = useState([]);
  const [dataTable, setDatatable] = useState(null);
  const { updateDataElectionArr, updateNumbersSupportVored, cityShow } = useDataElection()
  // const [isShowDetails, setIdShowDetails] = useState(null);
  const [showFiltering, setShowFiltering] = useState(false);
  const [filterArr, setFilterArr] = useState(['1']);
  const [showSearch, setShowSearch] = useState('');
  const [search, setSearch] = useState('');
  const [showVoted, setShowVoted] = useState(false)
  useEffect(() => {
    // Set interval to execute the function every 2 minutes
    const intervalId = setInterval(getDataTable, 120000);
    // const intervalId = setInterval(getDataTable, 5000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [filterArr]); // Empty dependency array ensures the effect runs once after the initial render

    useEffect(() => {
      getDataTable();
    }, []);

    const filterItems = useCallback((searchTerm) => {
      setDatatable(dataTableVoterFilter.filter(v => {
        return (v?.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) || v?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()))
      }))
    }, [dataTableVoterFilter]);

    const updateListVoters = (filterValues, showVoted) => {
      setFilterArr(prevArray => filterValues);
      const valuesCheck = filterValues;
      let dataVotersSupport = allDataTableVoter.filter(voter => valuesCheck.includes(voter.status));
      
      const valuesCheckVoted = showVoted ? ['0','1','2'] : ['0', '2'];
      dataVotersSupport = dataVotersSupport.filter(voter => valuesCheckVoted.includes(voter.status3));
      setDatatableVoterFilter(dataVotersSupport)
      setDatatable(dataVotersSupport);
      setSearch('');

    }
    // the function get data table
    const getDataTable = async () => {
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
            const dataVotersSupport = responseData.message.filter(voter => (filterArr.includes(voter.status) && voter.status3 != "1"));
            setDatatableVoterFilter(dataVotersSupport);
            setSearch('');
            setDatatable(dataVotersSupport);
            setAllDatatableVoter(responseData.message)
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
    <div>
    <table className="custom-table">
      <thead>
        <tr className="title-row">
        <th className="table-cell" ></th>
          {title.map((t, index) => (
            <th key={index} className="table-cell">
              {t}
            </th>
          ))}
          <th className="table-cell search-div" >
          {showSearch && <input
            className="input-search"
            placeholder="חיפוש"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filterItems(e.target.value);
            }}
          />}
          <img
            src={searchIcon}
            alt="search"
            onClick={()=>setShowSearch(true)}
          />
          <img
            src={filtering}
            alt="filtering"
            onClick={()=>setShowFiltering(true)}
          />
          </th>
        </tr>
      </thead>
      {(!dataTable || dataTable.length == 0) ? (
        dataTable && dataTable.length == 0 ? <div className='loading'>לא נמצא מידע תואם לחיפוש</div> :
      <div className='loading'>טוען...</div> 
      ):
      <tbody>
        {dataTable.map((row) => (
          <tr key={row.id}>
            <td className="table-cell"></td>
            <td className="table-cell" style={{width: '15%'}}>{row["FirstName"].trim()} {row["lastName"].trim()}</td>
            <td className="table-cell">{row["id"]}</td>
            <td className="table-cell">{row["phone"]}</td>
            <td className="table-cell">{row["City"].trim()}</td>
            <td className="table-cell">{row["status3"] == 1 ? 'הצביע' : 'לא הצביע'}</td>
            <td className="table-cell" style={{width: '25%'}}>{row["note"]}</td>
            <td className="table-cell"><Connection /></td>
          </tr>
        ))}
      </tbody>}
    </table>
{/* {isShowDetails && <VoterDetails voterDetails={dataTable.filter(v => v.id==isShowDetails)}/>} */}
{showFiltering && <Filtering updateListVoters={updateListVoters} setShowFiltering={setShowFiltering} filterArr={filterArr} setShowVoted={setShowVoted} showVoted={showVoted}/>}
    </div>

  );
};

export default Table;
