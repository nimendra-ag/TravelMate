import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';

const BookingCard = ({ booking, onMarkComplete, onMarkCancle }) => {
    console.log("Booking is", booking);
    
    return (
        <div className="card shadow-lg mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Booking ID: {booking?._id}</h5>
                <div className="d-flex align-items-center gap-2">
                    {booking?.status === 'Booked' && (
                        <div>  
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => onMarkComplete(booking?._id)}
                            >
                                <i className="fas fa-check me-2"></i>
                                Mark as Completed
                            </button>

                            <button
                                className="btn btn-danger btn-sm mx-3"
                                onClick={() => onMarkCancle(booking?._id)}
                            >
                                <i className="fas fa-times me-2"></i>
                                Cancel
                            </button>
                        </div>
                    )}
                    <span className={`badge ${booking?.status === 'Cancelled' ? 'bg-danger' : booking?.status === 'Completed' ? 'bg-success' : 'bg-primary'}`}>
                        {booking?.status}
                    </span>
                </div>
            </div>

            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-primary">{booking?.accommodation?.name}</h4>
                        <p className="text-muted mb-2">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {booking?.accommodation?.address}
                        </p>
                        
                        <p className="text-muted mb-2">
                            <i className="fas fa-clock me-2"></i>
                            Booked on: {moment(booking?.date).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                <h6 className="mb-2">Room Details</h6>
                                <p className="mb-1"><strong>Type:</strong> {booking?.room?.name}</p>
                                <p className="mb-1"><strong>Grade:</strong> {booking?.room?.grade}</p>
                                <p className="mb-1"><strong>Capacity:</strong> {booking?.room?.capacity} Person(s)</p>
                                <p className="mb-1"><strong>Number of Rooms:</strong> {booking?.roomcount}</p>
                            </div>

                            <div className="col-md-6">
                                <h6 className="mb-2">Booking Details</h6>
                                <p className="mb-1"><strong>Check-in:</strong> {moment(booking?.from).format('MMMM Do YYYY')}</p>
                                <p className="mb-1"><strong>Check-out:</strong> {moment(booking?.to).format('MMMM Do YYYY')}</p>
                                <p className="mb-1"><strong>Duration:</strong> {booking?.totaldays} days</p>
                                <p className="mb-1"><strong>Total Price:</strong> ${booking?.totalprice}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 border-top pt-3">
                    <h6 className="mb-2">Guest Information</h6>
                    <div>
                        <p className="mb-0 fw-bold">{`${booking?.user?.firstName} ${booking?.user?.lastName}`}</p>
                        <p className="mb-0 text-muted small">{booking?.user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
