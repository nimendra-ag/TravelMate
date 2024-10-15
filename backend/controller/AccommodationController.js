import dotenv from "dotenv"
import { AccommodationModel } from "../models/Accommodation.js"
import { CityModel } from "../models/Citiy.js";
dotenv.config({ path: "../.env" })

const AddAccommodation = async (req, res) => {


    console.log(req.body.hotel_name);
    


    try {

        let hotels = await AccommodationModel.find({});
        let id = hotels.length > 0 ? hotels[hotels.length - 1].id + 1 : 1;
        const hotel = new AccommodationModel({
            id: id,
            hotel_name: req.body.accommodationName,
            address: req.body.address,
            description: req.body.description,
            // image: req.file.path || req.file.secure_url,
            category: req.body.category,
            distance_from_city: req.body.distanceFromMainCity,
            perPerson_price: req.body.price,
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


const GetCities = async (req, res) => {


    console.log("Getttttttttttttttt");
    




    try {
        const cities = await CityModel.find();
        console.log(cities);
    
        return res.status(200).json({ success: true, cities });
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



export { AddAccommodation, GetCities , GetCity}







