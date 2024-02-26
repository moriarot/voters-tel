import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import GraphScreen from './screens/GraphsScreen';
import LoginScreen from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import { DataElectionProvider } from './context/DataElectionContext';
import TableScreen from './screens/TableScreen';
import Header from './components/Header';

export const LOGIN = 'login';
export const GRAPH = 'graph';
export const TABLE = 'table';

function MainNavigator() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [pageToShow, setPageToShow] = useState(isAuthenticated ? TABLE : LOGIN)

  const setPage = (newPage) => {
    setPageToShow(newPage);
  };

  return (
    <div className='App'>
      <div className='container'>
        <DataElectionProvider>
          {isAuthenticated && <Header  />}
          {/* <Header pageToShow={pageToShow} /> */}
          {!isAuthenticated && <LoginScreen setPage={setPage}/>}
          {(isAuthenticated && pageToShow == TABLE) && <TableScreen setPage={setPage} />}
          {(isAuthenticated && pageToShow == GRAPH) && <GraphScreen setPage={setPage}/>}
        </DataElectionProvider>
      </div>
    </div>
  );
}

export default MainNavigator;
