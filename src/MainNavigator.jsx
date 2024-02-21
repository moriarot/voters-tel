import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import GraphScreen from './screens/GraphsScreen';
import LoginScreen from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import { DataElectionProvider } from './context/DataElectionContext';
import TableScreen from './screens/TableScreen';

export const LOGIN = 'login';
export const GRAPH = 'graph';
export const TABLE = 'table';

function MainNavigator() {
  const [pageToShow, setPageToShow] = useState(localStorage.getItem('isAuthenticated') ? GRAPH : LOGIN)

  const setPage = (newPage) => {
    setPageToShow(newPage);
  };
  return (
    <div className='App'>
      <div className='container'>
        <DataElectionProvider>
          {/* <Header pageToShow={pageToShow} /> */}
          {!localStorage.getItem('isAuthenticated') && <LoginScreen setPage={setPage}/>}
          {(localStorage.getItem('isAuthenticated') && pageToShow == GRAPH) && <GraphScreen setPage={setPage}/>}
          {(localStorage.getItem('isAuthenticated') && pageToShow == TABLE) && <TableScreen setPage={setPage} />}
        </DataElectionProvider>
      </div>
    </div>
  );
}

export default MainNavigator;
