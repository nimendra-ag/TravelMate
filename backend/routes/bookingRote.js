import express from "express";
import { AddBooking, deleteBooking, getBookings } from "../controller/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/bookhotel',AddBooking)

bookingRouter.get('/getbookings',getBookings)

bookingRouter.delete('/deletebooking',deleteBooking)

export default bookingRouter;
