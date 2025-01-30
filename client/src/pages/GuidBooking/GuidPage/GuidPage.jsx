import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientContext } from '../../../context/ClientContext';
import { DatePicker } from 'antd';
import { FaPhone, FaWhatsapp, FaLanguage, FaMapMarkedAlt, FaStar, FaCalendarAlt, FaMoneyBillWave, FaBirthdayCake, FaPhoneAlt, FaIdCard, FaMapMarkerAlt } from 'react-icons/fa';
import './GuidPage.css';
import moment from 'moment';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const { RangePicker } = DatePicker;

const GuidPage = () => {
    const [data, setData] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const { id } = useParams();
    const { allGuides } = useContext(ClientContext);
    const guide = allGuides.find((e) => e.id === parseInt(id));
    const [isAvailable, setIsAvailable] = useState();
    const navigator = useNavigate();

    function filterByDate(dates) {
        if (dates) {
            setFromDate(dates[0].format("DD-MM-YYYY"));
            setToDate(dates[1].format("DD-MM-YYYY"));
        }
    }

    const StarRating = ({ rating }) => {
        return (
            <div className="d-flex align-items-center">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={`${index < rating ? 'text-warning' : 'text-muted'}`}
                        size={20}
                    />
                ))}
            </div>
        );
    };

    const readable = moment(guide?.birthDate).format('MMMM Do YYYY');

    const checkAvailability = (newFromDate, newToDate, existingBookings) => {
        console.log(newFromDate, newToDate, existingBookings);

        // Convert input dates to moment objects for better comparison
        const checkStart = moment(newFromDate, "DD-MM-YYYY");
        const checkEnd = moment(newToDate, "DD-MM-YYYY");

        for (const booking of existingBookings) {
            const existingStart = moment(booking.fromDate, "DD-MM-YYYY");
            const existingEnd = moment(booking.toDate, "DD-MM-YYYY");

            // All possible overlap scenarios:
            const isOverlapping = (
                // New booking starts during existing booking
                (checkStart.isSameOrAfter(existingStart) && checkStart.isSameOrBefore(existingEnd)) ||
                // New booking ends during existing booking
                (checkEnd.isSameOrAfter(existingStart) && checkEnd.isSameOrBefore(existingEnd)) ||
                // New booking contains existing booking
                (checkStart.isSameOrBefore(existingStart) && checkEnd.isSameOrAfter(existingEnd)) ||
                // Existing booking contains new booking
                (existingStart.isSameOrBefore(checkStart) && existingEnd.isSameOrAfter(checkEnd)) ||
                // Same day bookings
                checkStart.isSame(existingStart) || checkEnd.isSame(existingEnd)
            );

            if (isOverlapping) {
                return false;
            }
        }
        return true;
    };


    const handleAvailabilityCheck = () => {
        const available = checkAvailability(fromDate, toDate, guide.bookings);
        setIsAvailable(available);
    }

    const bookingHandler = () => {
        const mySwal = withReactContent(Swal);
        mySwal.fire({
            title: "Confirm Your Booking",
            text: "Are you ready to proceed with your reservation?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Book Now!"
        }).then((result) => {
            if (result.isConfirmed) {
                const user = JSON.parse(localStorage.getItem("user"));
                const bookingData = {
                    fromDate,
                    toDate,
                    guide,
                    user,
                    totaldays: moment.duration(moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))).asDays() + 1,
                    totalprice: guide?.chargesPerDay * (moment.duration(moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))).asDays() + 1),
                };
                setData(bookingData);
                try {
                    axios.post("http://localhost:3000/booking/bookguide", bookingData)
                        .then((res) => {
                            mySwal.fire("Success", "Booking confirmed successfully!", "success").then(() => {
                                setTimeout(() => {
                                    navigator("/")
                                    window.location.reload();

                                }, 1000);
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            mySwal.fire("Error", "Failed to confirm booking", "error");
                        });
                } catch (error) {
                    console.log("error");
                    mySwal.fire("Error", "Something went wrong", "error");
                }
            } else {
                mySwal.fire("Booking Cancelled", "Your booking request was cancelled.", "info");
            }
        });
    };

    return (
        <div className='container py-5'>
            {/* Hero Section */}

            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                overflow: 'hidden',
                // boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
                <div className="row g-0">
                    <div className="col-md-4" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '30px',
                        // backgroundColor: '#f8f9fa'
                    }}>
                        <div style={{
                            width: '250px',
                            height: '250px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            // border: '5px solid white',
                            // boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                            // margin: '20px 0'
                        }}>
                            <img
                                src={guide?.images[0] || "https://picsum.photos/500"}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                                alt={guide?.name}
                            />
                        </div>
                        {/* <div style={{
                            backgroundColor: '#2196f3',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            marginTop: '15px'
                        }}>
                            Professional Guide
                        </div> */}
                    </div>

                    <div className="col-md-8">
                        <div style={{
                            padding: '30px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    marginBottom: '15px'
                                }}>
                                    <h1 style={{
                                        fontSize: '1.8rem',
                                        fontWeight: '700',
                                        margin: 0,
                                        color: '#1a1a1a'
                                    }}>
                                        {guide?.name}
                                    </h1>
                                    {/* <div style={{
                                        backgroundColor: '#4CAF50',
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%'
                                    }}></div> */}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginBottom: '20px'
                                }}>
                                    <span style={{
                                        backgroundColor: '#f5f5f5',
                                        padding: '6px 12px',
                                        borderRadius: '15px',
                                        fontSize: '0.9rem'
                                    }}>
                                        <FaStar style={{ color: '#ffd700', marginRight: '5px' }} /> 4.9
                                    </span>
                                    <span style={{
                                        backgroundColor: '#f5f5f5',
                                        padding: '6px 12px',
                                        borderRadius: '15px',
                                        fontSize: '0.9rem'
                                    }}>
                                        <FaMapMarkerAlt style={{ color: '#ff4444', marginRight: '5px' }} /> Local Expert
                                    </span>
                                </div>

                                <p style={{
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    color: '#666',
                                    marginBottom: '25px'
                                }}>
                                    {guide?.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, ratione nam fugit laborum velit rem, nulla in sunt consequatur tempora dolor quia itaque amet magnam blanditiis. Quam quisquam quas optio?
                                </p>
                            </div>

                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                marginTop: 'auto'
                            }}>
                                <button style={{
                                    flex: 1,
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    backgroundColor: '#0d6efd',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                }}>
                                    <FaPhone /> Call Now
                                </button>
                                <button style={{
                                    flex: 1,
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontSize: '0.95rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                }}>
                                    <FaWhatsapp /> WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row mt-5">
                {/* Booking Section */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">
                                <FaCalendarAlt className="me-2 text-primary" />
                                Check Availability
                            </h4>
                            <RangePicker

                                format={"DD-MM-YYYY"}
                                onChange={filterByDate}
                                className="w-100 mb-3"
                                disabledDate={(current) => current && current < moment().startOf('day')}

                            />
                            {!fromDate || !toDate ? (
                                <div className="alert alert-warning mt-3">
                                    Please select dates to proceed
                                </div>
                            ) : (
                                <div>
                                    <button onClick={handleAvailabilityCheck} className="btn btn-primary w-100 py-3 mt-3">
                                        Check Availability
                                    </button>
                                    {isAvailable &&
                                        <div>
                                            <div className="text-success mt-2 text-center">These Dates are Available ! </div>
                                            <button onClick={bookingHandler} className="btn btn-primary w-100 py-3 mt-3">
                                                Book Now
                                            </button>
                                        </div>
                                    }

                                    {isAvailable === false && <div className="text-danger mt-2 text-center">These dates are not available</div>}

                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>

                {/* Guide Details Section */}
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">About {guide?.name}</h2>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <FaLanguage className="text-primary me-2" size={24} />
                                        <h5 className="mb-0">Languages</h5>
                                    </div>
                                    <ul className="list-group">
                                        {guide?.languages.map((language, index) => (
                                            <li key={index} className="list-group-item">{language}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <FaMapMarkedAlt className="text-primary me-2" size={24} />
                                        <h5 className="mb-0">Expert Areas</h5>
                                    </div>
                                    <ul className="list-group">
                                        {guide?.area.map((area, index) => (
                                            <li key={index} className="list-group-item">{area}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-12">
                                    <hr />
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaMoneyBillWave className="text-primary me-2" size={20} />
                                                <h5 className="mb-0">Charges per day: ${guide?.chargesPerDay}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaBirthdayCake className="text-primary me-2" size={20} />
                                                <h5 className="mb-0">Birth date: {readable}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaPhoneAlt className="text-primary me-2" size={20} />
                                                <h5 className="mb-0">Contact: {guide?.contactNumber}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaIdCard className="text-primary me-2" size={20} />
                                                <h5 className="mb-0">NIC: {guide?.nic}</h5>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-center gap-3">
                                                <h5 className="mb-0">Rating:</h5>
                                                <StarRating rating={guide?.rating} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default GuidPage;
