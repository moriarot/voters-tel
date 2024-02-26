import React, { useState, useEffect } from 'react';
import logoTak from  '../assets/Intersection 1.png';

import { useDataElection } from '../context/DataElectionContext';

import './Header.css';
import ProgressGraph from './ProgressGraph';
const Header = ({  }) => {
  const name = localStorage.getItem('userName')
  const phone = localStorage.getItem('userPhone')
  const { urlLogoHeader, sumAllSupport, sumSupportVoted, cities, updateCitySow } = useDataElection();
  
  const precentVotedFromAll = (!sumSupportVoted || !sumAllSupport) ? 0 : (sumSupportVoted / sumAllSupport) * 100;

  return (
    <div className="header">
      <img
        src={logoTak}
        alt="Description of the image"
        className="header-image"
      />
      <div className='container-header'>
        <div className='user-details'>
          <div>{name}</div>
          <div>{phone}</div>
        </div>

        {urlLogoHeader ? <img
                src={urlLogoHeader}
                className='logo-header'
              /> : <div className='logo-header' ></div>}
              <div className='graphs'>
                הצביעו {precentVotedFromAll}% מהתומכים שלנו
                <div>{sumSupportVoted} מתוך {sumAllSupport}</div>
                {/* <ProgressGraph /> */}
                </div>
      </div>
    </div>
  );
};

export default Header;
