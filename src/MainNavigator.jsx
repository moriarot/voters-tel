import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import GraphScreen from './screens/GraphsScreen';
import LoginScreen from './screens/Login';
import SplashScreen from './screens/SplashScreen';
import { DataElectionProvider } from './context/DataElectionContext';
import TableScreen from './screens/TableScreen';
import Header from './components/Header';
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';

export const LOGIN = 'login';
export const GRAPH = 'graph';
export const TABLE = 'table';
export const SETTINGS = 'settings';
export const HOME = 'home';

function MainNavigator() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [pageToShow, setPageToShow] = useState(isAuthenticated ? HOME : LOGIN)

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
          {(isAuthenticated && pageToShow == SETTINGS) && <SettingsScreen setPage={setPage}/>}
          {(isAuthenticated && pageToShow == HOME) && <HomeScreen setPage={setPage}/>}
        </DataElectionProvider>
      </div>
    </div>
  );
}

export default MainNavigator;
