import React, { createContext, useContext, useState } from 'react';

const DataElectionContext = createContext();

export const DataElectionProvider = ({ children }) => {
  const [dataElectionArr, setDataElectionArr] = useState([])
  const [cities, setCities] = useState([]);
  const [cityShow, setCitySow] = useState('');
  
  const updateCities = (cities) => {
    const cityNames = cities && cities.map(item => item.City.trim());
    setCities(cityNames);
  }

  const updateDataElectionArr = (electionData) => {
    setDataElectionArr(electionData);
  }

  const updateCitySow = (city) => {
    setCitySow(city);
  }

  const DataElectionContextValue = {
    updateDataElectionArr,
    dataElectionArr,
    urlLogoHeader: dataElectionArr ? dataElectionArr['electionImgUrlBar'] : '',
    electionId: dataElectionArr? dataElectionArr['electionId'] : '',
    electionDate: dataElectionArr ? dataElectionArr['dateToElection'] : '',
    updateCities,
    cities,
    updateCitySow,
    cityShow
  };

  return (
    <DataElectionContext.Provider value={DataElectionContextValue}>
      {children}
    </DataElectionContext.Provider>
  );
};

export const useDataElection = () => {
  return useContext(DataElectionContext);
};
