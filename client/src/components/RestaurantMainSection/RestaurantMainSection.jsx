import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './RestaurantMainSection.css';
import RestaurantDetails from '../restaurantDetails/RestaurantDetails';
import DisplayRestaurantReviews from '../displayRestaurantReviews/DisplayRestaurantReviews';

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

      <RestaurantDetails/>
    </div>
  );
};

export default RestaurantMainSection;
