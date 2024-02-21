import React from 'react';

const Table = () => {
    const title = ['שם התומך','תז','נייד','מצב','הערה']
  const data = [
    { id: 1, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 2, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 3, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 4, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
    { id: 5, 'שם התומך': 'נטע טי', 'נייד': '0585727870', 'מצב': 'לא הצביע' },
  ];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', direction: 'rtl' }}>
      <thead>
        <tr style={{ background: '#f2f2f2' }}>
            {title.map((t, index) => <th key={index} style={cellStyle}>{t}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {title.map((t, index) => <td key={index} style={cellStyle}>{row[t]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'center',
};

export default Table;
