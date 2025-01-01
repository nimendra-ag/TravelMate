import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientContext } from '../../context/ClientContext';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ConBookHotel = () => {

    const { from, to, id, hid } = useParams();

    const { allAccommodations } = useContext(ClientContext)

    const accommodation = allAccommodations?.find((e) => e.id === parseInt(hid))

    const room = accommodation?.rooms[id]

    const ar = room?.available

    const [selectedValue, setSelectedValue] = useState(1); // Store the selected value

    const handleChange = (event) => {
        setSelectedValue(event.target.value); // Update the state with the selected value
    };


    const fromDate = moment(from, "DD-MM-YYYY")

    const toDate = moment(to, "DD-MM-YYYY")

    const totaldays = moment.duration((toDate).diff(fromDate)).asDays() + 1

    const navigator = useNavigate()

    const handleBook = () => {

        const mySwal = withReactContent(Swal)
        mySwal.fire({
            title: "Are you sure?",
            text: "Do you want to Confirm Booking ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I Want !"
        }).then((result) => {
            if (result.isConfirmed) {



                const user = JSON.parse(localStorage.getItem("user"))
        const data = {
            user: user,
            room: room,
            accommodation: accommodation,
            from: from,
            to: to,
            totaldays: totaldays,
            totalprice: price,
            roomcount: parseInt(selectedValue)
        }
        console.log(data)

        axios.post("http://localhost:3000/booking/bookhotel", data)
            .then(

                (res) => {
                    console.log(res.data)
                },

                mySwal.fire("Booking Confirmed", "Your Booking is Confirmed :)", "success")
    .then(() => {
        setTimeout(() => {
            // Navigate to the home page after 5 seconds
            navigator("/");

            // Reload the page after navigation
            window.location.reload();
        }, 2000); // Delay of 5 seconds (5000 milliseconds)
    })



                









            )
            .catch(



                (err) => {
                    console.log(err)
                }


            )









            } else {
                mySwal.fire("Cancelled", "Your Booking is Cancelled :)", "error");
            }
        });




        

    }










    const price = selectedValue * room?.price * totaldays;

    const user = JSON.parse(localStorage.getItem("user"))




    return (
        <div className='container p-5'>



            <div className="container col-xxl-8 px-4 ">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src="https://picsum.photos/300/200" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">{room?.name} at {accommodation?.name} </h1>

                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">

                        </div>
                    </div>
                </div>

                <p className="lead">{room?.description}</p>


                <div className='py-5' >
                    <h5>from - {from}</h5>
                    <h5>to - {to}</h5>
                    <h5>Price for One Day and One Room - {room?.price}</h5>
                    <h5>Number of Rooms - </h5>

                    <div className="form-group my-3">
                        <select className="form-control" id="exampleFormControlSelect1"
                            onChange={handleChange} // Attach the onChange handler


                        >
                            {/* Dynamically generate options */}
                            {Array.from({ length: ar }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <h5>Total Days - {totaldays}</h5>


                    <h5>Price - ${price}</h5>



                    <button className="btn btn-primary px-3  py-2" onClick={() => handleBook(price, selectedValue,)}>Pay Now !</button>






                </div>


            </div>











        </div>
    )
}

export default ConBookHotel