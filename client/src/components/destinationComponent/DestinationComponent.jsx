import React from 'react';
import './DestinationComponent.css';
import sigiriyaImage from '../../assets/sigiriyaImage.jpg'

const DestinationComponent = () => {
  return (
    <div className='destinationDescription'>
      <div className="content">
        <div className="text-section">
          <h1>Sigiriya</h1>
          <h2>About</h2>
          <p>
            Sigiriya, known as the "Eighth Wonder of the World," is a stunning rock fortress in central Sri Lanka. 
            Rising 200 meters, this ancient site features the ruins of a 5th-century palace, lush gardens, 
            and timeless frescoes. A climb to the summit offers breathtaking views and a journey into the island's rich history. 
            Perfect for adventurers and history lovers alike, Sigiriya is a must-visit destination that showcases 
            the beauty and heritage of Sri Lanka.
          </p>
          <div className="info-section">
            <div className="info">
              <img src="" alt="Duration Icon" />
              <p>Duration: More than 3 hours</p>
            </div>
            <div className="info">
              <img src="" alt="Distance Icon" />
              <p>Distance from Colombo: About 175 km</p>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img src={sigiriyaImage} alt="Sigiriya Image" />
        </div>
      </div>
    </div>
  );
}

export default DestinationComponent;