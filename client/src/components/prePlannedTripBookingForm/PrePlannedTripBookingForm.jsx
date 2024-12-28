import { useState } from "react";
import "./PrePlannedTripBookingForm.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

const PrePlannedTripBookingForm = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [prePlannedTripBookingDetails, setPrePlannedTripBookingDetails] =
    useState({
      prePlannedTripId:id,
      date: "",
      travelerName: "",
      email: "",
      phone: "",
      adults: 1,
      kids: 0,
    });

  const changeHandler = (e) => {
    setPrePlannedTripBookingDetails({
      ...prePlannedTripBookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Booking Completed!");

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-pre-planned-trip-bookings",
        prePlannedTripBookingDetails
      );

      console.log("Booking saved successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.log("Error saving booking:", error);
    }
  };


  return (
    <div className="booking-container">
      {/* Form Section */}
      <div className="form-section">
        <h1>Book the Trip</h1>
        <p>
          Amazing stuff waiting for you and your friends / family! <br />
          You're just one step away from a new adventure.
        </p>
        <form className="booking-form" onSubmit={handleSubmit}>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="checkin">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={prePlannedTripBookingDetails.date}
                  onChange={changeHandler}
                />
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <label htmlFor="travelerName">Your Name</label>
            <input
              type="text"
              id="travelerName"
              name="travelerName"
              value={prePlannedTripBookingDetails.travelerName}
              onChange={changeHandler}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={prePlannedTripBookingDetails.email}
              onChange={changeHandler}
              placeholder="Enter your e-mail address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={prePlannedTripBookingDetails.phone}
              onChange={changeHandler}
              placeholder="Enter your phone number"
            />
          </div>
          <Row>
            <Col>
              <div className="form-group small-inputs">
                <label htmlFor="adults">Adults</label>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  value={prePlannedTripBookingDetails.adults}
                  onChange={changeHandler}
                  min="1"
                />
                <label htmlFor="kids">Kids</label>
                <input
                  type="number"
                  id="kids"
                  name="kids"
                  value={prePlannedTripBookingDetails.kids}
                  onChange={changeHandler}
                  min="0"
                />
              </div>
            </Col>
          </Row>
          <button type="submit" className="submit-btn">
            Complete your booking
          </button>
        </form>
      </div>
      {/* Image Section */}
      <div className="image-section">
        <img src="https://picsum.photos/500/700" alt="Travel Background" />
      </div>
    </div>
  );
};

export default PrePlannedTripBookingForm;
