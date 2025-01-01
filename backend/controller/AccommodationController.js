import dotenv from "dotenv";
import mongoose from 'mongoose';
import { AccommodationModel } from "../models/Accommodation.js";
import { CityModel } from "../models/Citiy.js";
import { DestinationModel } from "../models/Destination.js";
import { GuideModel } from "../models/Guide.js";

dotenv.config({ path: "../.env" });

const AddAccommodation = async (req, res) => {

    
    try {

        let hotels = await AccommodationModel.find({});
        let id = hotels.length > 0 ? hotels[hotels.length - 1].id + 1 : 1;
        const hotel = new AccommodationModel({
            id: id,
            name: req.body.accommodationName,
            address: req.body.address,
            description: req.body.description,
            cardImage: req.body.cardImage,
            category: req.body.category,
            distance_from_city: req.body.distanceFromMainCity,
            perPerson_price: req.body.price,
            contactNumber: req.body.contactNumber,
        });

            await hotel.save();
            return res.json({
                success: true,
                message: 'Hotel added successfully',
                data: hotel,
            });
        }
    } catch (error) {
        console.error("Error saving/updating hotel:", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const getAllAccomodations = async (req, res) => {
    try {
        let hotels = await AccommodationModel.find({});
        res.send(hotels);
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const GetData = async (req, res) => {
    try {
        const cities = await CityModel.find();
        const accommodations = await AccommodationModel.find();
        const destinations = await DestinationModel.find();
        const guids = await GuideModel.find();


    
    
        return res.status(200).json({ success: true, cities,accommodations,destinations,guids  });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ success: false, error: err.message });
    }
};

const GetCity = async (req, res) => {
    const { id } = req.params;

    try {
        const city = await CityModel.findOne({ _id: id });
        console.log(city);

        return res.status(200).json({ success: true, city });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ success: false, error: err.message });
    }
};

// API to delete a Hotel
const deleteAccommodation = async (req, res) => {
    try {
        const deletedHotel = await AccommodationModel.findOneAndDelete({ id: req.body.id });
        if (deletedHotel) {
            res.json({
                success: true,
                message: `Hotel with ID ${req.body.id} deleted successfully.`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Hotel not found.",
            });
        }
    } catch (error) {
        console.error("Error deleting hotel:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the hotel.",
        });
    }
};

const viewAccommodation = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the ID is numeric
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        // Fetch accommodation by numeric ID
        const accommodation = await AccommodationModel.findOne({ id: Number(id) });

        if (!accommodation) {
            return res.status(404).json({ success: false, message: 'Accommodation not found' });
        }

        // Success response
        res.status(200).json({ success: true, data: accommodation });
    } catch (error) {
        console.error('Error fetching accommodation:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};  

export { AddOrUpdateAccommodation, GetData,GetCity, getAllAccomodations, deleteAccommodation,viewAccommodation }







