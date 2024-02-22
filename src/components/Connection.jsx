import React, { useState, useEffect } from 'react';
import Image from '../assets/tak-logo.png';
import logoTak from '../tak-logo/tak-logo.png';
// import './Connection.css';
import contact from '../assets/Contact.svg';
import './Connection.css';

const Connection = ({  }) => {

const [openConnection, setOpenConnection] = useState(false);
const showConnection = ()=>{
    setOpenConnection(!openConnection);
}
  return (
    <div className="connection-container">
      {!openConnection ? <img
        onClick={showConnection}
        src={contact}
        alt="Description of the image"
        className=""
      />
       : <div className="div-connection">
      {/* <img
        // src={contact}
        alt="Description of the image"
        className="div-connection"
      /> */}
      <p>icon icon</p>
      </div>}
    </div>
  );
};

export default Connection;
