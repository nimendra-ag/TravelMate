import React, { useState, useEffect } from "react";
import axios from "axios";
import GuideBookingCard from "./GuideBookingCard";
import Swal from "sweetalert2";

const GuideBookingsAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [activeTab, setActiveTab] = useState("booked");
    const [refreshBookings, setRefreshBookings] = useState(false);
    const [loading, setLoading] = useState(true);

    const onMarkComplete = async (bookingId) => {
        const result = await Swal.fire({
            title: "Confirm Completion",
            text: "Are you sure you want to mark this booking as completed?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, mark as completed",
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.put("http://localhost:3000/booking/completeguidebooking", null, {
                    params: { id: bookingId },
                });

                if (response.data.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "Guide booking has been marked as completed",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    setRefreshBookings(!refreshBookings);
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to mark guide booking as completed",
                    icon: "error",
                });
                console.log(error);
            }
        }
    };


    const onMarkCancle = async (bookingId) => {
        const result = await Swal.fire({
            title: "Confirm Completion",
            text: "Are you sure you want to mark this booking as Cancled ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, mark as Cancled",
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.put("http://localhost:3000/booking/cancleguidebooking", null, {
                    params: { id: bookingId },
                });

                if (response.data.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "Guide booking has been marked as Cancled",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    setRefreshBookings(!refreshBookings);
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to mark guide booking as Cancle",
                    icon: "error",
                });
                console.log(error);
            }
        }
    };



    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/booking/getallguidbookings");
                setBookings(response.data);
                console.log(response.data);
                
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchBookings();
    }, [refreshBookings]);

    const filteredBookings = bookings.filter((booking) => {
        switch (activeTab) {
            case "cancelled":
                return booking.status === "Cancelled";
            case "completed":
                return booking.status === "Completed";
            case "booked":
                return booking.status === "Booked";
            default:
                return true;
        }
    });



    

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                    <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <ul className="nav nav-tabs mb-4">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "booked" ? "active" : ""}`}
                                onClick={() => setActiveTab("booked")}
                            >
                                <i className="fas fa-calendar-check me-2"></i>
                                Booked
                                <span className="badge bg-primary ms-2">
                                    {bookings.filter((b) => b.status === "Booked").length}
                                </span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
                                onClick={() => setActiveTab("completed")}
                            >
                                <i className="fas fa-check-circle me-2"></i>
                                Completed
                                <span className="badge bg-success ms-2">
                                    {bookings.filter((b) => b.status === "Completed").length}
                                </span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "cancelled" ? "active" : ""}`}
                                onClick={() => setActiveTab("cancelled")}
                            >
                                <i className="fas fa-times-circle me-2"></i>
                                Cancelled
                                <span className="badge bg-danger ms-2">
                                    {bookings.filter((b) => b.status === "Cancelled").length}
                                </span>
                            </button>
                        </li>
                    </ul>

                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <GuideBookingCard
                                key={booking._id}
                                booking={booking}
                                onMarkComplete={() => onMarkComplete(booking._id)}
                                onMarkCancle={() => onMarkCancle(booking._id)}
                            />
                        ))
                    ) : (
                        <div className="alert alert-info">
                            <i className="fas fa-info-circle me-2"></i>
                            No {activeTab} bookings found
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GuideBookingsAdmin;
