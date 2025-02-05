import React, { useState } from 'react';
import './DestinationComponent.css';
import sigiriyaImage from '../../assets/sigiriyaImage.jpg';
import { Col, Row } from 'react-bootstrap';

const DestinationComponent = () => {
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
            <h1 className="display-6">Sigiriya</h1>
          </Row>
          <Col xs={12} className="text-md-start">
            <p className="text-justify" style={{ textAlign: 'justify' }}>
              Our city is home to a rich tapestry of cultural attractions that highlight the deep-rooted history and traditions of the local community. From grand historical monuments and ancient temples to bustling markets and local art exhibitions, every corner tells a story. The cultural heritage sites not only offer a glimpse into the past but also connect visitors to the essence of the community,
              creating an immersive experience. As you explore these sites, you'll witness a blend of architectural marvels and serene landscapes, each narrating a unique chapter of our city's journey. Local guides are available to provide insights into the folklore, rituals, and architectural significance of each attraction, allowing you to truly connect with the heart of our culture. Be sure to savor
              the flavors of traditional cuisine along the way, as many attractions are located near famous local eateries.
            </p>
          </Col>

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
