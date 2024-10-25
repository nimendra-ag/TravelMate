// Guides.js
import React from 'react';
import { Link } from 'react-router-dom';

const Guides = () => {
  return (
    <div>
      <h2>Guides</h2>
      <p>This is the guide page. Click the button below to go to the form.</p>
      
      <Link to="/add-new-guide">
        <button className="btn btn-primary">Go to Form</button>
      </Link>
    </div>
  );
};

export default Guides;
