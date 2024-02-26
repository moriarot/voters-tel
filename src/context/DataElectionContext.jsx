import React, { createContext, useContext, useState } from 'react';

const DataElectionContext = createContext();

export const DataElectionProvider = ({ children }) => {
  const [dataElectionArr, setDataElectionArr] = useState([])
  const [cities, setCities] = useState([]);
  const [cityShow, setCitySow] = useState('');
  const [sumSupportVoted, setSumSupportVoted] = useState(0);
  const [sumAllSupport, setSumAllSupport] = useState(0);

  const updateCities = (cities) => {
    const cityNames = cities && cities.map(item => item.City.trim());
    setCities(cityNames);
  }

  const updateDataElectionArr = (electionData) => {
    setDataElectionArr(electionData);
  }

  const updateNumbersSupportVored = (voters) => {
    const voterSupport = voters.filter(voter => voter.status === "1");
    setSumAllSupport(voterSupport.length);
    const sumVoted = voterSupport.reduce((sum, item) => {
      return sum + (item.status3 === "1" ? 1 : 0);
    }, 0);
    setSumSupportVoted(sumVoted);
    
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
    cityShow,
    updateNumbersSupportVored,
    sumAllSupport,
    sumSupportVoted
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
