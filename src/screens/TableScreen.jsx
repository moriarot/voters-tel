import React from 'react';
import Table from '../components/Table';
import { GRAPH } from '../MainNavigator';

const TableScreen = ({setPage}) => {
  return (
    <div>
         <button onClick={()=>{setPage(GRAPH)}}>עבור לגרפים</button>
        <Table />
    </div>
  );
};

export default TableScreen;
