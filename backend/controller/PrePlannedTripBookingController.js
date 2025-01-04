import dotenv from "dotenv"
import { PrePlannedTripBookingModel  } from "../models/PrePlannedTripBooking.js"
dotenv.config({ path: "../.env" })

const AddPrePlannedTripBooking = async (req, res) => {

    // console.log(req.body.name);
    
    try {

        let prePlannedTripBookings = await PrePlannedTripBookingModel.find({});
        let id = prePlannedTripBookings.length > 0 ? prePlannedTripBookings[prePlannedTripBookings.length - 1].id + 1 : 1;
        const prePlannedTripBooking = new PrePlannedTripBookingModel({
            id: id,
            prePlannedTripId:req.body.prePlannedTripId,
            date: req.body.date,
            email: req.body.email,
            travelerName: req.body.travelerName,
            phone: req.body.phone,
            adults: req.body.adults,
            kids: req.body.kids,
        });

        await prePlannedTripBooking.save();
        res.json({
            success: true,
            message: 'Booking added successfully',
            travelerName: req.body.travelerName,
        });
    }
    catch(error) {

        console.error("Error saving booking:", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }

}

const getAllPrePlannedTripBookings = async (req, res) => {
    try {
        let prePlannedTripBookings = await PrePlannedTripBookingModel.find({});
        // console.log("All Bookings Fetched");
        // console.log(prePlannedTripBookings);
        res.send(prePlannedTripBookings);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });

    }
}

export { AddPrePlannedTripBooking, getAllPrePlannedTripBookings}
