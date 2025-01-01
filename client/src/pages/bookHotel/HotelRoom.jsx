import React from 'react'
import { useNavigate } from 'react-router-dom'
import './bookHotel.css'

const HotelRoom = ({ name, type, price, capacity, available, id, fromDate, toDate, hid }) => {


    const navigate = useNavigate();

    const handleBook = (from, to, id, hid) => {

        navigate(`/conhotelbook/${from}/${to}/${id}/${hid}`)

        console.log(toDate);










    }



    return (
        <div className='container w-75 mx-auto border border-dark border-3 rounded mt-5 p-2'>
            <div className='d-flex flex-column flex-md-row'>
                <img
                    src="https://picsum.photos/300/200"
                    className='rounded mb-3 mb-md-0 me-md-5'
                    alt="room image"
                />
                <div className='flex-column'>
                    <h1>{name}</h1>
                    <h5>Type - {type}</h5>
                    <h5>Price for one Day - {price}$</h5>
                    <h5>Room Capcity - {capacity}</h5>
                    <h5>Number of Available Rooms - {available}</h5>

                    {available === 0 ? (
                        <p className="bold-red-text py-2">Currently No Rooms Available in our Website</p>
                    ) : null}
                    <div className='d-flex'>

                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => handleBook(fromDate, toDate, id, hid)}
                            disabled={available === 0 || !fromDate || !toDate}
                        >
                            Book Now!
                        </button>
                        <button className="btn btn-primary mt-3 ms-3">More Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelRoom
