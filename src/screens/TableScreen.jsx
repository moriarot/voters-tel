import React from 'react';
import Table from '../components/Table';
import { HOME } from '../MainNavigator';
import './TableScreen.css';

const TableScreen = ({setPage}) => {
  return (
    <div className='container-table'>
        <Table />
        <button className='button-change-page' onClick={()=>{setPage(HOME)}}>חזור למסך הבית</button>
    </div>
  );
};

export default TableScreen;
