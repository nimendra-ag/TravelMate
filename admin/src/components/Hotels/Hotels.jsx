import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {AccomodationContext} from '../../context/AccomodationContext';

const Hotels = () => {
  const {allAccomodations} = useContext(AccomodationContext);
  console.log(allAccomodations)
  return (
    <div>
      <h2>Hotels</h2>
      <p>This is the guide page. Click the button below to go to the form.</p>
      
      <Link to="/add-new-hotel">
        <button className="btn btn-primary">Go to Form</button>
      </Link>

     {
      allAccomodations.map((accomodation) => {
        return (
          <div key={accomodation.id}>
            <h1>{accomodation.hotel_name}</h1>
            <h2>{accomodation.address}</h2>
          </div>
        )
      })
     } 
    </div>
  );
};

export default Hotels;