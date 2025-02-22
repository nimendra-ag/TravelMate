import React, { useState } from 'react';
import './DestinationComponent.css';
import sigiriyaImage from '../../assets/sigiriyaImage.jpg';
import { Col, Row } from 'react-bootstrap';

const DestinationComponent = ({name, description, image1, image2, image3, image4, image5, category, bestTimeToVisit, website, distanceFromColombo}) => {
  const images = [
    'https://picsum.photos/1080/720?random=1',
    'https://picsum.photos/1080/720?random=2',
    'https://picsum.photos/1080/720?random=3',
    'https://picsum.photos/1080/720?random=4',
    'https://picsum.photos/1080/720?random=5',
    'https://picsum.photos/1080/720?random=6',
  ];

  const [selectedImage, setSelectedImage] = useState(sigiriyaImage);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className='destinationDescription'>
      <div className="content">
        <div className="text-section">
          <div className="destination-header">
            <h1 className="destination-title">{name}</h1>
            <span className="destination-category">{category}</span>
          </div>
          
          <div className="destination-description">
            <p>{description}</p>
          </div>

          <div className="info-section">
            <h3 className="info-title">Essential Information</h3>
            <div className="info-grid">
              <div className="info-card">
                <i className="fas fa-route"></i>
                <div className="info-content">
                  <h3>Distance</h3>
                  <p>{distanceFromColombo} km from Colombo</p>
                </div>
              </div>

              <div className="info-card">
                <i className="fas fa-clock"></i>
                <div className="info-content">
                  <h3>Best Time to Visit</h3>
                  <p>{bestTimeToVisit}</p>
                </div>
              </div>

              <div className="info-card">
                <i className="fas fa-globe"></i>
                <div className="info-content">
                  <h3>More Information</h3>
                  <p>Website: <a href={website} target="_blank" rel="noopener noreferrer">Official Website</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="image-section">
          <img src={selectedImage} alt="Main" className="main-image" />
          <div className="thumbnail-gallery">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationComponent;
