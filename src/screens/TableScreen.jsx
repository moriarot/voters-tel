import React from 'react';
import Table from '../components/Table';
import { GRAPH } from '../MainNavigator';
import './TableScreen.css';

const TableScreen = ({setPage}) => {
  return (
    <div className='container-table'>
         {/* <button onClick={()=>{setPage(GRAPH)}}>עבור לגרפים</button> */}
        <Table />
    </div>
  );
};

export default TableScreen;
