import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './RestaurantMainSection.css';

const RestaurantMainSection = ({id, type, name, address, category, contactNumber, description, email, website, openingHours, priceRange, rating}) => {
  const images = [
    'https://picsum.photos/600/600?random=1',
    'https://picsum.photos/600/600?random=2',
    'https://picsum.photos/600/600?random=3',
    'https://picsum.photos/600/600?random=4',
    'https://picsum.photos/600/600?random=5',
    'https://picsum.photos/600/600?random=6',
    'https://picsum.photos/600/600?random=6',


  ];

  const [mainImage, setMainImage] = useState(images[0]);
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setMainImage(images[index]);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="restaurant-main-section">
      {/* Restaurant name and description */}
      <div className="restaurant-details">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>

      {/* Images Section */}
      <div className="images-section">
        <div className="left-image">
          <img src={images[1]} alt="Thumbnail 1" />
        </div>
        <div className="main-image">
          <img src={mainImage} alt="Main display" />
        </div>
        <div className="right-image">
          <img src={images[3]} alt="Thumbnail 2" />
        </div>
        <div className="bottom-images">
          <img src={images[2]} alt="Thumbnail 3" />
          <img src={images[4]} alt="Thumbnail 4" />
          <img src={images[5]} alt="Thumbnail 5" />
          <img src={images[6]} alt="Thumbnail 5" />


        </div>
      </div>

      {/* Additional Restaurant Info with Icons */}
      <div className="additional-info">
        <div className="info-item">
          <FontAwesomeIcon icon={faPhone} />
        <p> {contactNumber}</p>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faEnvelope} />
          <p><a href=" mailto:info@deliciousbites.com">{email}</a></p>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faGlobe} />
          <p><a href="https://www.deliciousbites.com" target="_blank" rel="noopener noreferrer">{website}</a></p>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p> {address}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMainSection;
