import express from "express";
import { AddBooking,  BookGuide, cancleGuidBooking, completeBooking, completeGuidBooking, deleteBooking, getAllBookings, getAllGuidBookings, getBookings, getCancledGuideBookings, getCBookings, getComBookings, getComGuideBookings, getGuideBookings } from "../controller/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/bookhotel',AddBooking)

bookingRouter.get('/getbookings',getBookings)

bookingRouter.delete('/deletebooking',deleteBooking)

bookingRouter.get('/getcbookings',getCBookings)

bookingRouter.get('/getcombookings',getComBookings)

bookingRouter.post('/bookguide',BookGuide)


bookingRouter.get('/getallbookings',getAllBookings)

bookingRouter.put('/completebooking',completeBooking)

bookingRouter.get("/getallguidbookings",getAllGuidBookings)

bookingRouter.put('/completeguidebooking',completeGuidBooking)


bookingRouter.put('/cancleguidebooking',cancleGuidBooking)

bookingRouter.get('/getguidebookings', getGuideBookings )

bookingRouter.get('/getguidecancledbookings', getCancledGuideBookings )

bookingRouter.get('/getguidecombookings', getComGuideBookings )



export default bookingRouter;
