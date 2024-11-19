import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import Utils from '../components/Utils';
import { GRAPH, TABLE } from '../MainNavigator';
const apiKey = "a12345bC4@11!lo9987"
import './VoterDetails.css';
// לא בשימוש
const VoterDetails = ({ voterDetails }) => {
  const { login } = useAuth();
    // const {name, phone, id, status, note } = voterDetails;
const name = 'נטע טי';
const id = '211727870';
const phone = '0585727870';
const status = 0;
  return (
        <div className="container-details">
          <div className='details-background'>
        
        <div className='title-details'>כרטיסיית תומך</div>
        <div className='body-details'>
            <div className='rigth-flex-details'>
                <div className='voter-details'>
                <div>{name}</div>
                <div>{id}</div>
                </div>
                <div style={{fontWeight: 'bold'}}>פרטי קשר</div>
                <div className='voter-phone'>
                    נייד {phone}
                </div>
                <div style={{marginTop: '3vh'}}>מצב</div>
                <div className='voter-phone'>
                    {status == 1 ? 'הצביע' : 'לא הצביע'}
                </div>
            </div>
            <div className='rigth-flex-details'>
                <div>הערות</div>
                <input
        type="text"
        id="text-box"
        value={text}
        onChange={handleChange}
        placeholder="Type here..."
      />
                <div>אחרי שיחה</div>
                <select id="select-box"  onChange={()=>{}}>
        <option value="">בחר/י...</option>
        <option value="option1">היה מענה</option>
        <option value="option2">שיחה ממתינה</option>
        <option value="option3">שיחה חוזרת</option>
      </select>
                <div>שיחה חוזרת</div>
            </div>
        </div>
         {/* <input
            className={`input ${nameFocused && 'greenUnderline'}`}
            placeholder="שם משתמש"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameFocused(false)}
            onFocus={() => setNameFocused(true)}
          />
          <input
            className={`input ${phoneFocused && 'greenUnderline'}`}
            placeholder="פלאפון"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => setPhoneFocused(false)}
            onFocus={() => setPhoneFocused(true)}
          /> */}
          {/* <button className="button-login" onClick={handleSendCode}>
            {loadingSentCode ? 'טוען...' : 'התחברות'}
          </button> */}
          </div>
        </div>
  );
};

export default VoterDetails;
