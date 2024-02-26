import React from 'react';
import Table from '../components/Table';
import { GRAPH } from '../MainNavigator';
import './TableScreen.css';

const TableScreen = ({setPage}) => {
  return (
    <div className='container-table'>
        <Table />
        <button className='button-change-page' onClick={()=>{setPage(GRAPH)}}>הצג לי גרפים כלליים</button>
    </div>
  );
};

export default TableScreen;
