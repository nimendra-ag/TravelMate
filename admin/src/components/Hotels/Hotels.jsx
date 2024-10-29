import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const Hotels = () => {
  const {allAccomodations} = useContext(AdminContext);
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
            <h1>{accomodation.name}</h1>
            <h2>{accomodation.address}</h2>
          </div>
        )
      })
     } 
    </div>
  );
};

export default Hotels;