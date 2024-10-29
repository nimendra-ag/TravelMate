import dotenv from "dotenv"
import { RestaurantModel } from "../models/Restaurant.js"
dotenv.config({ path: "../.env" })

const AddRestaurant = async (req, res) => {

    console.log(req.body.name);
    
    try {

        let restaurants = await RestaurantModel.find({});
        let id = restaurants.length > 0 ? restaurants[restaurants.length - 1].id + 1 : 1;
        const restaurant = new RestaurantModel({
            id: id,
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            // image: req.file.path || req.file.secure_url,
            category: req.body.category,
            email: req.body.email,
            website: req.body.website,
            contactNumber: req.body.contactNumber,
            priceRange: req.body.priceRange,
            openingHours: req.body.openingHours,

        });

        await restaurant.save();
        res.json({
            success: true,
            message: 'Restaurant added successfully',
            name: req.body.name,
        });
    }
    catch(error) {

        console.error("Error saving restaurant:", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }

}

const getAllRestaurants = async (req, res) => {
    try {
        let restaurants = await RestaurantModel.find({});
        console.log("All Restaurants Fetched");
        console.log(restaurants);
        res.send(restaurants);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });

    }
}

export { AddRestaurant, getAllRestaurants}

