import React, { useContext, useEffect, useState } from 'react';
import { ClientContext } from '../../context/ClientContext';
import { useParams } from 'react-router-dom';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import HotelRoom from './HotelRoom';
import './bookHotel.css';

const BookHotel = () => {
    const { allAccommodations } = useContext(ClientContext);
    const { id } = useParams();
    const accommodation = allAccommodations.find((e) => e.id === parseInt(id));
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    function filterByDate(dates) {
        setFromDate(dates[0].format("DD-MM-YYYY"));
        setToDate(dates[1].format("DD-MM-YYYY"));
        console.log(dates[0].format("DD-MM-YYYY"));
        console.log(dates[1].format("DD-MM-YYYY"));
    }

    return (
        <div className="container-fluid py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
            <div className="container">
                {accommodation && (
                    <div className="card shadow-lg mb-5">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h1 className="display-4 text-primary fw-bold mb-3">
                                    <i className="fas fa-hotel me-3"></i>
                                    {accommodation.name}
                                </h1>
                                <div className="w-25 mx-auto">
                                    <hr className="text-primary" style={{ height: '3px', opacity: '0.5' }} />
                                </div>
                                <h4 className="text-muted mt-4">{accommodation.minidescription}</h4>
                            </div>

                            <div className="row mt-5">
                                <div className="col-md-8">
                                    <div className="p-4 bg-white rounded shadow-sm">
                                        <h5 className="text-primary mb-3">
                                            <i className="fas fa-info-circle me-2"></i>
                                            About This Property
                                        </h5>
                                        <p className="text-muted">{accommodation.description}</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-4 bg-white rounded shadow-sm">
                                        <h5 className="text-primary mb-4">
                                            <i className="fas fa-calendar-alt me-2"></i>
                                            Check Availability
                                        </h5>
                                        <RangePicker 
                                            format={"DD-MM-YYYY"} 
                                            onChange={filterByDate}
                                            className="w-100 mb-3"
                                        />
                                        {!fromDate || !toDate ? (
                                            <div className="alert alert-warning mt-3" role="alert">
                                                <i className="fas fa-exclamation-triangle me-2"></i>
                                                Please select dates to book hotels
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {accommodation?.rooms && (
                    <div className="room-list">
                        <h3 className="text-primary mb-4">
                            <i className="fas fa-bed me-2"></i>
                            Available Rooms
                        </h3>
                        {accommodation.rooms.map((room) => (
                            <HotelRoom
                                key={room.id}
                                name={room.name}
                                type={room.grade}
                                price={room.price}
                                capacity={room.capacity}
                                available={room.available}
                                id={room.id}
                                fromDate={fromDate}
                                toDate={toDate}
                                hid={accommodation.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookHotel;
