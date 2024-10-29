import dotenv from "dotenv"
import { AccommodationModel } from "../models/Accommodation.js"
import { CityModel } from "../models/Citiy.js";
dotenv.config({ path: "../.env" })

const AddAccommodation = async (req, res) => {

    // console.log(req.body.hotel_name);
    
    try {

        let hotels = await AccommodationModel.find({});
        let id = hotels.length > 0 ? hotels[hotels.length - 1].id + 1 : 1;
        console.log(req.body)
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
            hotel_name: req.body.hotel_name,
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
        console.log("All Accomodations Fetched");
        console.log(hotels);
        res.send(hotels);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });

    }
}

const GetData = async (req, res) => {


    console.log("Getttttttttttttttt");
    




    try {
        const cities = await CityModel.find();
        const accommodations = await AccommodationModel.find(); 
        console.log(cities);
        console.log(accommodations);
    
        return res.status(200).json({ success: true, cities,accommodations  });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ success: false, error: err.message }); // Consistent success flag
    }
    
}


const GetCity = async (req, res) => {

    const { id } = req.params;

    console.log("Getttttttttttttttt");
    




    try {
        const city = await CityModel.findOne({ _id: id });
        console.log(city);
    
        return res.status(200).json({ success: true, city });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ success: false, error: err.message }); // Consistent success flag
    }
    
}



export { AddAccommodation, GetData , GetCity, getAllAccomodations}








