import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Booking = ({ accName, roomName, roomCount, price, toDate, fromDate, daysCount, id, status }) => {
    const cancleBooking = async (id) => {
        const mySwal = withReactContent(Swal);
        mySwal.fire({
            title: "Are you sure?",
            text: "Do you want to Delete the Booking ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Want !"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:3000/booking/deletebooking", {
                    params: { id: id }
                })
                .then(window.location.reload())
                .catch((err) => {
                    console.log(err);
                });
            }
        });
    };

    return (
        <div className="container my-4">
            <div className="card shadow-lg" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <div className="card-header bg-primary text-white py-3">
                    <h3 className="mb-0">{roomName} at {accName}</h3>
                </div>
                <div className="card-body p-4">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="booking-details">
                                <div className="detail-item mb-3">
                                    <i className="fas fa-bed text-primary me-2"></i>
                                    <span className="fw-bold">Rooms:</span> {roomCount}
                                </div>
                                <div className="detail-item mb-3">
                                    <i className="fas fa-dollar-sign text-primary me-2"></i>
                                    <span className="fw-bold">Price:</span> ${price}
                                </div>
                                <div className="detail-item mb-3">
                                    <i className="fas fa-calendar-alt text-primary me-2"></i>
                                    <span className="fw-bold">Check-in:</span> {fromDate}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="booking-details">
                                <div className="detail-item mb-3">
                                    <i className="fas fa-calendar-check text-primary me-2"></i>
                                    <span className="fw-bold">Check-out:</span> {toDate}
                                </div>
                                <div className="detail-item mb-3">
                                    <i className="fas fa-clock text-primary me-2"></i>
                                    <span className="fw-bold">Duration:</span> {daysCount} days
                                </div>
                                <div className="detail-item mb-3">
                                    <i className="fas fa-info-circle text-primary me-2"></i>
                                    <span className="fw-bold">Status:</span> 
                                    <span className={`badge ${status === 'Booked' ? 'bg-success' : 'bg-secondary'} ms-2`}>
                                        {status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {status === "Booked" && (
                        <div className="text-end mt-3">
                            <button
                                className="btn btn-danger px-4 py-2"
                                onClick={() => cancleBooking(id)}
                            >
                                <i className="fas fa-times-circle me-2"></i>
                                Cancel Booking
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
