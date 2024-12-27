import express from "express";
import { AddBooking } from "../controller/BookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/bookhotel',AddBooking)

export default bookingRouter;
