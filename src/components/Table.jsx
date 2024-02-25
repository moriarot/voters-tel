import React, { useState, useEffect } from 'react';
import './Table.css';
import Connection from './Connection.jsx'
import { useDataElection } from '../context/DataElectionContext';

const Table = () => {
  const title = ['שם התומך', 'תז', 'נייד', 'מצב', 'הערה'];
  const [dataTable, setDatatable] = useState([]);
  const { updateDataElectionArr, updateCities, cityShow } = useDataElection()

    useEffect(() => {
      getDataTable();
    }, []);
    // the function get data table
    const getDataTable = async () => {
      const name = localStorage.getItem('userName')
      const phone = localStorage.getItem('userPhone')
      const apiKey = "a12345bC4@11!lo9987"

      const parameters = new FormData();
      // parameters.append('get_data_tel_table', code);
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
            setDatatable(responseData.message.filter(voter => voter.status === "1"));
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
    <table className="custom-table">
      <thead>
        <tr className="title-row">
        <th className="table-cell" ></th>
          {title.map((t, index) => (
            <th key={index} className="table-cell">
              {t}
            </th>
          ))}
          <th className="table-cell" ></th>
        </tr>
      </thead>
      {(!dataTable || dataTable.length == 0) ? <div className='loading'>טוען...</div> :
      <tbody>
        {dataTable.map((row) => (
          <tr key={row.id}>
            <td className="table-cell"></td>
            <td className="table-cell">{row["FirstName"]} {row["lastName"]}</td>
            <td className="table-cell">{row["id"]}</td>
            <td className="table-cell">{row["phone"]}</td>
            <td className="table-cell">{row["status1"] == 1 ? 'הצביע' : 'לא הצביע'}</td>
            <td className="table-cell">{row["note"]}</td>
            <td className="table-cell"><Connection /></td>
          </tr>
        ))}
      </tbody>}
    </table>
  );
};

export default Table;
