import React, { useState } from 'react';
import './DestinationComponent.css';
import sigiriyaImage from '../../assets/sigiriyaImage.jpg';
import { Col, Row } from 'react-bootstrap';

const DestinationComponent = ({name, description, image1, image2, image3, image4, image5, city, category, bestTimeToVisit, website, distanceFromColombo, entranceFee, openingHours, duration}) => {
  // Array of images - add your actual image imports
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
          <Row className="mb-4">
            <h1 className="display-6">{name}</h1>
          </Row>
          <Col xs={12} className="text-md-start">
            <p className="text-justify" style={{ textAlign: 'justify' }}>
              {description}
            </p>
          </Col>

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
                  <p>Webslite: <a href={website} target="_blank" rel="noopener noreferrer">Official Website</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="image-section">
          <img src={selectedImage} alt="Sigiriya Main" className="main-image" />
          <div className="thumbnail-gallery">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Sigiriya ${index + 1}`}
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
