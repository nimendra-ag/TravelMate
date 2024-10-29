import dotenv from "dotenv"
import { AccommodationModel } from "../models/Accommodation.js"
dotenv.config({ path: "../.env" })

const AddAccommodation = async (req, res) => {

    // console.log(req.body.hotel_name);
    
    try {

        let hotels = await AccommodationModel.find({});
        let id = hotels.length > 0 ? hotels[hotels.length - 1].id + 1 : 1;
        console.log(req.body)
        const hotel = new AccommodationModel({
            id: id,
            hotel_name: req.body.accommodationName,
            address: req.body.address,
            description: req.body.description,
            cardImage: req.body.cardImage,
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

// API to delete a Hotels
const deleteAccommodation = async (req, res) => {
    await hotel.findOneAndDelete({ id: req.body.id });
  res.json({
      success: true,
      p_name: req.body.hotel_name,
  });
}

export { AddAccommodation, getAllAccomodations, deleteAccommodation }







