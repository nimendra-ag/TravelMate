import React from "react";
import "./PrePlannedTripsMainSection.css";
import Galle_fort_image from "../../assets/GalleFortTour.png";

const PrePlannedTripsMainSection = ({
  name,
  mainDestinations,
  guides,
  price,
  duration,
  noOfTravelers,
  startTime,
  startLocation,
  endTime,
  endLocation,
  description,
  availableDates,
  contactNumber,
  rating,
}) => {
  return (
    <div className="trip-section">
      {/* Title */}
      <h1 className="trip-title">{name}</h1>
      <div className="trip-main-image">
        {/* Replace with your image source */}
        <img src={Galle_fort_image} alt={name} className="trip-img" />
      </div>
      <div className="trip-about">
        <p className="trip-description">{description}</p>
      </div>
      {/* Image and Details */}
      <div className="trip-card">
        <div className="trip-image">
          {/* Replace with your image source */}
          <img
            src="https://picsum.photos/id/237/800/400"
            alt={name}
            className="trip-img"
          />
        </div>
        <div className="trip-details">
          <p className="trip-description">{description}</p>
          <div className="trip-info">
            <span className="trip-duration">Duration: {duration} days</span>
            <span className="trip-price">From: ${price} per adult</span>
          </div>
          <button className="trip-button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default PrePlannedTripsMainSection;
