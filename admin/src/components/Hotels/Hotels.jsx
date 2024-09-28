import React from 'react';
import { Link } from 'react-router-dom';

const Hotels = () => {
  return (
    <div>
      <h2>Hotels</h2>
      <p>This is the guide page. Click the button below to go to the form.</p>
      
      <Link to="/add-new-hotel">
        <button className="btn btn-primary">Go to Form</button>
      </Link>
    </div>
  );
};

export default Hotels;