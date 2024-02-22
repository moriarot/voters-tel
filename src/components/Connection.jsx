import React, { useState } from 'react';
import contact from '../assets/Contact.svg';
import whatsapp from '../assets/Whatsapp.svg';
import email from '../assets/Email.svg';
import message from '../assets/message.svg';
import phone from '../assets/phone.svg';
import './Connection.css';

const Connection = () => {
  const [openConnection, setOpenConnection] = useState(false);

  const showConnection = () => {
    setOpenConnection(!openConnection);
  };

  return (
    <div className="connection-container">
      {!openConnection ? (
        <img onClick={showConnection} src={contact} alt="Contact" className="" />
      ) : (
        <div className="div-connection" onClick={showConnection}>
          <img src={whatsapp} alt="WhatsApp" className="" />
          <img src={email} alt="Email" className="" />
          <img src={message} alt="Message" className="" />
          <img src={phone} alt="Phone" className="" />
        </div>
      )}
    </div>
  );
};

export default Connection;
