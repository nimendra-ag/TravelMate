import dotenv from "dotenv"
import { AccommodationModel } from "../models/Accommodation.js"
import { CityModel } from "../models/Citiy.js";
import { DestinationModel } from "../models/Destination.js";
import { GuideModel } from "../models/Guide.js";
dotenv.config({ path: "../.env" })

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
        res.json({
            success: true,
            message: 'Hotel added successfully',
            name: req.body.name,
        });
    }
    catch(error) {

        console.error("Error saving hotel:", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }

}

const getAllAccomodations = async (req, res) => {
    try {
        let hotels = await AccommodationModel.find({});
        res.send(hotels);
        
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });

    }
}

const GetData = async (req, res) => {


    
    




    try {
        const cities = await CityModel.find();
        const accommodations = await AccommodationModel.find(); 
        const destinations = await DestinationModel.find();
        const guids = await GuideModel.find();


    
    
        return res.status(200).json({ success: true, cities,accommodations,destinations,guids  });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ success: false, error: err.message }); // Consistent success flag
    }
    
}


const GetCity = async (req, res) => {

    const { id } = req.params;

    




    try {
        const city = await CityModel.findOne({ _id: id });
        console.log(city);
    
        return res.status(200).json({ success: true, city });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ success: false, error: err.message }); // Consistent success flag
    }
    
}

// API to delete a Hotels
const deleteAccommodation = async (req, res) => {
    await hotel.findOneAndDelete({ id: req.body.id });
  res.json({
      success: true,
      p_name: req.body.hotel_name,
  });
}

export { AddAccommodation, GetData , GetCity, getAllAccomodations, deleteAccommodation}










