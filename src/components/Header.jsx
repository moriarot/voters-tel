import React, { useState, useEffect } from 'react';
import Image from '../assets/tak-logo.png';
import logoTak from '../tak-logo/tak-logo.png';

import './Header.css';
const Header = ({  }) => {


  return (
    <div className="header-container">
      <img
        src={logoTak}
        alt="Description of the image"
        className="header-image"
      />
    </div>
  );
};

export default Header;
