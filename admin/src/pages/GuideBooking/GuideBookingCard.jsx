import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaLanguage, FaCalendarAlt, FaDollarSign, FaUser, FaClock } from "react-icons/fa";
import moment from 'moment';

const GuideBookingCard = ({ booking, onMarkComplete, onMarkCancle }) => {

  console.log("booking is",booking);
  
  return (
    <div className="card shadow-lg mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">Booking ID: {booking._id}</h5>
          <small>
            <FaClock className="me-2" />
            {moment(booking.date).format('MMMM Do YYYY, h:mm:ss a')}
          </small>
        </div>

        <div className="d-flex align-items-center gap-2">
          {booking.status === "Booked" && (
            <>
              <button
                className="btn btn-success btn-sm"
                onClick={() => onMarkComplete(booking)}
              >
                <i className="fas fa-check me-2"></i>Mark as Completed
              </button>
              <button
                className="btn btn-danger btn-sm mx-3"
                onClick={() => onMarkCancle(booking)}
              >
                <i className="fas fa-times me-2"></i>Cancel
              </button>
            </>
          )}
          <span
            className={`badge ${
              booking.status === "Cancelled"
                ? "bg-danger"
                : booking.status === "Completed"
                ? "bg-success"
                : "bg-primary"
            }`}
          >
            {booking.status}
          </span>
        </div>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h6 className="text-primary mb-1">
              {booking.user.firstName} {booking.user.lastName}
            </h6>
            <p className="text-muted mb-1">
              <FaUser className="me-2" />
              Guide: <strong>{booking.guide.name}</strong> ({booking.guide.rating} ⭐)
            </p>
            <p className="mb-1">
              <FaMapMarkerAlt className="me-2 text-muted" />
              {booking.guide.area.join(", ")}
            </p>
            <p className="mb-1">
              <FaLanguage className="me-2 text-muted" />
              {booking.guide.languages.join(", ")}
            </p>
            <p className="mb-1">
              <FaPhoneAlt className="me-2 text-muted" />
              {booking.guide.contactNumber}
            </p>
          </div>

          <div className="col-md-6">
            <p className="mb-1">
              <FaCalendarAlt className="me-2 text-muted" />
              <strong>{booking.fromDate}</strong> → <strong>{booking.toDate}</strong>
            </p>
            <p className="mb-1">
              <FaDollarSign className="me-2 text-muted" />
              Charges per day: <strong>${booking.guide.chargesPerDay}</strong>
            </p>
            <p className="mb-1">
              <strong>Total Days:</strong> {booking.totaldays}
            </p>
            <p className="mb-1">
              <strong>Total Price:</strong> ${booking.totalprice}
            </p>
          </div>
        </div>

        <p
          className={`fw-bold mb-0 ${
            booking.status === "Booked" ? "text-success" : "text-danger"
          }`}
        >
          Status: {booking.status}
        </p>
      </div>
    </div>
  );
};

export default GuideBookingCard;
