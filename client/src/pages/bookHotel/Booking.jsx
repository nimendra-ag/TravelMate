import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Booking = ({accName , roomName , roomCount , price , toDate , fromDate , daysCount , id}) => {


const cancleBooking= async (id) => {


    const mySwal = withReactContent(Swal)
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



    axios.delete("http://localhost:3000/booking/deletebooking",
        {
            params: { id: id }
        }
    )
    .then((response) => {
        console.log(response);
        window.location.reload();
    }).catch((err) => {
        console.log(err);
    })
}



           
})


    

    
}

    
  return (




    <div>

<div className='container w-75 mx-auto border border-dark border-3 rounded mt-5 p-2'>
            <div className='d-flex flex-column flex-md-row'>
              
                <div className='flex-column'>
                    <h1>{roomName} Booking at {accName}</h1>
                    <h5>Number of Rooms - {roomCount}</h5>
                    <h5>Price - {price}$</h5>
                    <h5>From - {fromDate}</h5>
                    <h5>To - {toDate}</h5>
                    <h5>To - {toDate}</h5>
                    <h5>Total Days - {daysCount}</h5>




                        <button
                            className="btn btn-danger mt-3"
                            onClick={() => {cancleBooking(id)}}
                        
                        >
                            Cancle
                        </button>
                    </div>
                </div>
            </div>
        </div>




    
  )
}

export default Booking