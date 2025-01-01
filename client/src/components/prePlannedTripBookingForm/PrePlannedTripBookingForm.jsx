import { useState, useEffect } from "react";
import "./PrePlannedTripBookingForm.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PrePlannedTripBookingForm = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [prePlannedTripBookingDetails, setPrePlannedTripBookingDetails] =
    useState({
      prePlannedTripId: tripId,
      date: "",
      travelerName: "",
      email: "",
      phone: "",
      adults: 1,
      kids: 0,
    });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!prePlannedTripBookingDetails.date) {
      newErrors.date = "Date is required.";
    }
    if (!prePlannedTripBookingDetails.travelerName.trim()) {
      newErrors.travelerName = "Traveler name is required.";
    }
    if (!prePlannedTripBookingDetails.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(prePlannedTripBookingDetails.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!prePlannedTripBookingDetails.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(prePlannedTripBookingDetails.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (prePlannedTripBookingDetails.adults <= 0) {
      newErrors.adults = "There must be at least 1 adult.";
    }
    if (prePlannedTripBookingDetails.kids < 0) {
      newErrors.kids = "Kids count cannot be negative.";
    }

    setErrors(newErrors);

    // Check if there are no errors
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm(); // Validate form on initial render and whenever state changes
  }, [prePlannedTripBookingDetails]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPrePlannedTripBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!isFormValid) {
      return; // Prevent submission if the form is invalid
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-pre-planned-trip-bookings",
        prePlannedTripBookingDetails
      );

      console.log("Booking saved successfully:", response.data);

      // Show success notification
      window.alert("Booking successfully completed!");

      // Navigate to the trip details page
      navigate(`/pre-planned-trips/${tripId}`);
    } catch (error) {
      console.error("Error saving booking:", error);

      // Show error notification
      window.alert("Error saving booking. Please try again later.");
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
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={prePlannedTripBookingDetails.date}
                  onChange={changeHandler}
                  aria-invalid={errors.date ? "true" : "false"}
                />
                {errors.date && <span className="error">{errors.date}</span>}
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
              aria-invalid={errors.travelerName ? "true" : "false"}
            />
            {errors.travelerName && (
              <span className="error">{errors.travelerName}</span>
            )}
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
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <span className="error">{errors.email}</span>}
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
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
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
                  aria-invalid={errors.adults ? "true" : "false"}
                />
                {errors.adults && <span className="error">{errors.adults}</span>}
                <label htmlFor="kids">Kids</label>
                <input
                  type="number"
                  id="kids"
                  name="kids"
                  value={prePlannedTripBookingDetails.kids}
                  onChange={changeHandler}
                  min="0"
                  aria-invalid={errors.kids ? "true" : "false"}
                />
                {errors.kids && <span className="error">{errors.kids}</span>}
              </div>
            </Col>
          </Row>
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid}
          >
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
