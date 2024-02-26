import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import Utils from '../components/Utils';
import { GRAPH, TABLE } from '../MainNavigator';
const apiKey = "a12345bC4@11!lo9987"
import './Filtering.css';

const Filtering = ({ updateListVoters, setShowFiltering, filterArr, showVoted, setShowVoted }) => {
    const [selectedStatuses, setSelectedStatuses] = useState(filterArr);
  const handleCheckboxChange = (status) => {
    // Check if the status is already selected
    if (selectedStatuses.includes(status)) {
      // Deselect the status
      setSelectedStatuses(prevSelected => prevSelected.filter(selected => selected !== status));
    } else {
      // Select the status
      setSelectedStatuses(prevSelected => [...prevSelected, status]);
    }
  };
  const closeAndUpdateListVoters = ()=>{
    updateListVoters(selectedStatuses, showVoted);
    setShowFiltering(false)
  }

  return (
        <div className="container-filtering">
          <div className='filtering-background'>
        
        <div className='title-filtering'>סינון</div>
        <div className='body-filtering'>

        <label>הצג לי מצביעים בסטטוס:</label>
        <div>
        <div>
        <input
          type="checkbox"
          id="1"
          value="1"
          checked={selectedStatuses.includes("1")}
          onChange={() => handleCheckboxChange("1")}
        />
        <label htmlFor="1">תומך</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="3"
          value="3"
          checked={selectedStatuses.includes("3")}
          onChange={() => handleCheckboxChange("3")}
        />
        <label htmlFor="3">מתלבט</label>
      </div>

      <div>
        <input
          type="checkbox"
          id="0"
          value="0"
          checked={selectedStatuses.includes("0")}
          onChange={() => handleCheckboxChange("0")}
        />
        <label htmlFor="0">לא יודע</label>
      </div>
      </div>


        <div style={{margin: 0}}>
        <input
          type="checkbox"
          id="voted"
          value="voted"
          checked={showVoted}
          onChange={() => setShowVoted(!showVoted)}
        />
        <label htmlFor="voted">הצג לי גם מצביעים שהצביעו כבר</label>
      
      </div>
               <button onClick={closeAndUpdateListVoters} className='show-voter-by-filter'>הצג</button>
            </div>
        
          </div>
        </div>
  );
};

export default Filtering;
