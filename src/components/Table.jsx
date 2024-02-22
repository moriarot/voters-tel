import React from 'react';
import './Table.css';
import Connection from './Connection.jsx'
const Table = () => {

    // the function get data table
    const getDataTable = async () => {

      // Show the progress bar
      //progressBar.style.visibility = 'visible';

      const name = localStorage.getItem('userName')
      const phone = localStorage.getItem('userPhone')

      const parameters = new FormData();
      parameters.append('get_data_tel_table', code);
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


  const title = ['שם התומך', 'תז', 'נייד', 'מצב', 'הערה'];
  const data = [
    { id: 1, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 2, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 3, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 4, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 5, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
  ];

  return (
    <table className="custom-table">
      <thead>
        <tr className="title-row">
          {title.map((t, index) => (
            <th key={index} className="table-cell">
              {t}
            </th>
          ))}
          <th className="table-cell" ></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {title.map((t, index) => (
              <td key={index} className="table-cell">
                {row[t]}
              </td>
            ))}
            <td className="table-cell"><Connection /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
