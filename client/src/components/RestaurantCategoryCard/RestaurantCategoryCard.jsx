import React from 'react'
import './RestaurantCategoryCard.css'

const RestaurantCategoryCard = () => {
    return (
      <div className="card-container">
        <div className="card border-0 shadow-sm">
          <img
            src="https://picsum.photos/300" // Replace with your image URL
            className="card-img-top rounded"
            alt="Card example"
          />
          <div className="card-img-overlay d-flex flex-column justify-content-end">
            <div className="card-title-overlay">
              <h5 className="text-white fw-bold">Date Night</h5>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default RestaurantCategoryCard