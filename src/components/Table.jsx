import React from 'react';
import './Table.css';
import Connection from './Connection.jsx'
const Table = () => {
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
