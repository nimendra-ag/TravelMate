import React, { useContext, useEffect, useState } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import HotelRoom from './HotelRoom';
import './bookHotel.css'
import { use } from 'react';


const BookHotel = () => {





    const { allAccommodations } = useContext(ClientContext)
    const { id } = useParams()
    const accommodation = allAccommodations.find((e) => e.id === parseInt(id))
    const [fromDate,setFromDate] = useState()
    const [toDate,setToDate] = useState()




    function filterByDate(dates) {
        // Since dates from RangePicker are already Moment objects, we can use them directly
        setFromDate(dates[0].format("DD-MM-YYYY"));
        setToDate(dates[1].format("DD-MM-YYYY"));
        
        // For logging/verification
        console.log(dates[0].format("DD-MM-YYYY"));
        console.log(dates[1].format("DD-MM-YYYY"));
    }


    return (


        <div className='container pb-5'>

            {
                accommodation ?

                    <div>


                        <h1 className='text-center m-4'> Welcome to {accommodation.name}</h1>

                        <h4 className='text-center m-4'>{accommodation.minidescription}</h4>

                        <p>{accommodation.description}</p>


                        <h4 className='my-5'>Check Availability</h4>






                    </div> : null


            }


            <div className='col-md-3'>


                <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate} />

                {fromDate && toDate ? null : (
    <p className="bold-red-text py-2">Please select Dates to Book Hotels</p>
)}














            </div>



{accommodation?.rooms?(


<div>




    {
        accommodation.rooms.map((room)=>{


            return <HotelRoom
            key={room.id}
            name={room.name}
            type = {room.grade}
            price = {room.price}
            capacity = {room.capacity}
            available = {room.available}
            id = {room.id}
            fromDate = {fromDate}
            toDate = {toDate}
            hid = {accommodation.id}

            
            />
        })
    }


    


  



</div>):null


}

        </div>
    )
}

export default BookHotel

