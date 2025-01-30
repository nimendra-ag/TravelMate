import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientContext } from '../../context/ClientContext';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './bookHotel.css';

const ConBookHotel = () => {
    const { from, to, id, hid} = useParams();
    const { available } = useParams();
    const { allAccommodations } = useContext(ClientContext);
    const accommodation = allAccommodations?.find((e) => e.id === parseInt(hid));
    const room = accommodation?.rooms[id];

    
    const [selectedValue, setSelectedValue] = useState(1);
    const navigator = useNavigate();

    const fromDate = moment(from, "DD-MM-YYYY");
    const toDate = moment(to, "DD-MM-YYYY");
    const totaldays = moment.duration((toDate).diff(fromDate)).asDays() + 1;
    const price = selectedValue * room?.price * totaldays;

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleBook = () => {
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
                const data = {
                    user,
                    room,
                    accommodation,
                    from,
                    to,
                    totaldays,
                    totalprice: price,
                    roomcount: parseInt(selectedValue)
                };

                axios.post("http://localhost:3000/booking/bookhotel", data)
                    .then(() => {
                        mySwal.fire("Booking Confirmed!", "Your stay has been successfully booked.", "success")
                            .then(() => {
                                setTimeout(() => {
                                    navigator("/");
                                    window.location.reload();
                                }, 2000);
                            });
                    })
                    .catch((err) => console.log(err));
            } else {
                mySwal.fire("Booking Cancelled", "Your booking request was cancelled.", "info");
            }
        });
    };

    console.log("==========================");
    console.log(available);
    
    


    

    return (
        <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
            <div className="container">
                <div className="card shadow-lg">
                    <div className="card-body p-0">
                        <div className="row g-0">
                            <div className="col-lg-6">
                                <img 
                                    src="https://picsum.photos/800/600" 
                                    className="img-fluid rounded-start h-100 object-fit-cover"
                                    alt="room"
                                />
                            </div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <h2 className="display-6 text-primary fw-bold mb-4">
                                        {room?.name}
                                        <small className="d-block text-muted fs-5 mt-2">{accommodation?.name}</small>
                                    </h2>
                                    
                                    <p className="lead mb-4">{room?.description}</p>

                                    <div className="card bg-light mb-4">
                                        <div className="card-body">
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-calendar-check text-primary fs-4 me-3"></i>
                                                        <div>
                                                            <small className="text-muted d-block">Check-in</small>
                                                            <strong>{from}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-center">
                                                        <i className="fas fa-calendar-times text-primary fs-4 me-3"></i>
                                                        <div>
                                                            <small className="text-muted d-block">Check-out</small>
                                                            <strong>{to}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Select Number of Rooms</label>
                                        <select 
                                            className="form-select form-select-lg mb-3" 
                                            onChange={handleChange}
                                        >
                                            {Array.from({ length: available }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1} Room(s)</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Price per night</span>
                                                <strong>${room?.price}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Number of nights</span>
                                                <strong>{totaldays}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Number of rooms</span>
                                                <strong>{selectedValue}</strong>
                                            </div>
                                            <hr className="my-2" />
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="h5 mb-0">Total Price</span>
                                                <strong className="h5 mb-0">${price}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        className="btn btn-primary btn-lg w-100" 
                                        onClick={handleBook}
                                    >
                                        <i className="fas fa-credit-card me-2"></i>
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConBookHotel;
