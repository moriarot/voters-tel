import React, { useState, useEffect } from 'react';
import Image from '../assets/tak-logo.png';
import logoTak from '../assets/tak-logo.svg';
import { useDataElection } from '../context/DataElectionContext';

import './Header.css';
import ProgressGraph from './ProgressGraph';
const Header = ({  }) => {
  const name = localStorage.getItem('userName')
  const phone = localStorage.getItem('userPhone')
  const { urlLogoHeader, electionDate, cities, updateCitySow } = useDataElection();


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
                {/* <ProgressGraph /> */}
                </div>
      </div>
    </div>
  );
};

export default Header;
