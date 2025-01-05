import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClientContext } from '../../../context/ClientContext';
import { DatePicker } from 'antd';
import { FaPhone, FaWhatsapp, FaLanguage, FaMapMarkedAlt, FaStar, FaCalendarAlt, FaMoneyBillWave, FaBirthdayCake, FaPhoneAlt, FaIdCard } from 'react-icons/fa';
import './GuidPage.css';
const { RangePicker } = DatePicker;
import moment from 'moment';

const GuidPage = () => {

    const [data,setData] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const { id } = useParams();
    const { allGuides } = useContext(ClientContext);
    const guid = allGuides.find((e) => e.id === parseInt(id));

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

    const readable = moment(guid?.birthDate).format('MMMM Do YYYY');


    const bookingHandler = () => {

       const user = JSON.parse(localStorage.getItem("user"));

        const data = {
            fromDate,
            toDate,
            guid,
            user,
            totaldays: moment.duration(moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))).asDays() + 1,
            totalprice: guid?.chargesPerDay * (moment.duration(moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))).asDays() + 1),

            

        };

        setData(data);
    };


    return (
        <div className='container py-5'>
            {/* Hero Section */}
            <div className="card border-0 shadow-lg mb-5">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img 
                            src={guid?.imageUrl || "https://picsum.photos/800/600"} 
                            className="img-fluid rounded-start h-100 object-fit-cover" 
                            alt={guid?.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body p-4 p-md-5">
                            <h1 className="display-4 fw-bold mb-4">{guid?.name}</h1>
                            <p className="lead mb-4">{guid?.description}</p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary btn-lg d-flex align-items-center gap-2">
                                    <FaPhone /> Call Now
                                </button>
                                <button className="btn btn-success btn-lg d-flex align-items-center gap-2">
                                    <FaWhatsapp /> WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Booking Section */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="card-title mb-4">
                                <FaCalendarAlt className="me-2 text-primary"/>
                                Check Availability
                            </h4>
                            <RangePicker
                                format={"DD-MM-YYYY"}
                                onChange={filterByDate}
                                className="w-100 mb-3"
                            />
                            {!fromDate || !toDate ? (
                                <div className="alert alert-warning mt-3">
                                    Please select dates to proceed
                                </div>
                            ) : (
                                <button onClick={()=>bookingHandler()} className="btn btn-primary w-100 py-3 mt-3">
                                    Book Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Guide Details Section */}
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title mb-4">About {guid?.name}</h2>
                            
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <FaLanguage className="text-primary me-2" size={24}/>
                                        <h5 className="mb-0">Languages</h5>
                                    </div>
                                    <ul className="list-group">
                                        {guid?.languages.map((language, index) => (
                                            <li key={index} className="list-group-item">{language}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-md-6">
                                    <div className="d-flex align-items-center mb-3">
                                        <FaMapMarkedAlt className="text-primary me-2" size={24}/>
                                        <h5 className="mb-0">Expert Areas</h5>
                                    </div>
                                    <ul className="list-group">
                                        {guid?.area.map((area, index) => (
                                            <li key={index} className="list-group-item">{area}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="col-12">
                                    <hr/>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaMoneyBillWave className="text-primary me-2" size={20}/>
                                                <h5 className="mb-0">Charges per day: ${guid?.chargesPerDay}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaBirthdayCake className="text-primary me-2" size={20}/>
                                                <h5 className="mb-0">Birth date: {readable}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaPhoneAlt className="text-primary me-2" size={20}/>
                                                <h5 className="mb-0">Contact: {guid?.contactNumber}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-center">
                                                <FaIdCard className="text-primary me-2" size={20}/>
                                                <h5 className="mb-0">NIC: {guid?.nic}</h5>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-center gap-3">
                                                <h5 className="mb-0">Rating:</h5>
                                                <StarRating rating={guid?.rating} />
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
