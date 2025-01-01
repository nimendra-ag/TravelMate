import React, { useEffect, useState } from 'react'
import { use } from 'react'
import axios from 'axios'
import Booking from './Booking'

const MyBookings = () => {



    const [bookings, setBookings] = useState([])
    

    const user = JSON.parse(localStorage.getItem("user"))




    useEffect(() => {
        if (user) {
            axios
                .get("http://localhost:3000/booking/getbookings",

                    {
                        params: { email: user.email }
                    }
                 ) // Pass the user object in the request body
                .then((res) => {
                    setBookings(res.data); // Process the response

                    console.log("Bookings are", bookings);

                    
                    

                    console.log(res.data);
                    
                })
                .catch((err) => {
                    console.log("Error is", err);
                });
        }
    }, []); 
    
  return (
    <div className='container '>

        <h1 className='text-center m-4'> Hello {user.firstName}  Here is your Current Bookings !</h1>


        
{bookings?(


<div>




    {
bookings.map((booking)=>{


            return <Booking
            key={booking._id}
            roomName={booking.room.name}
            accName={booking.accommodation.name}
            roomCount={booking.roomcount}
            price={booking.totalprice}
            toDate={booking.to}
            fromDate={booking.from}
            daysCount={booking.totaldays}
            id ={booking._id}



        

            
            />
        })
    }


    


  



</div>):null


}




        




    </div>
  )
}

export default MyBookings