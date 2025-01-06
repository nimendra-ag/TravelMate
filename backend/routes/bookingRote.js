import express from "express";
import { AddBooking,  BookGuide, deleteBooking, getBookings, getCBookings, getComBookings } from "../controller/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/bookhotel',AddBooking)

bookingRouter.get('/getbookings',getBookings)

bookingRouter.delete('/deletebooking',deleteBooking)

bookingRouter.get('/getcbookings',getCBookings)

bookingRouter.get('/getcombookings',getComBookings)

bookingRouter.post('/bookguide',BookGuide)


export default bookingRouter;
