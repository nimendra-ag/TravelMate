import dotenv from "dotenv"
import { RestaurantModel } from "../models/Restaurant.js"
import { RestaurantReviewModel } from "../models/RestaurantReview.js";
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
            mainCategory: req.body.mainCategory,
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

const addRestaurantReview = async (req, res) =>{
    try{
    
        let restaurantReviews = await RestaurantReviewModel.find({});
        let id = restaurantReviews.length > 0 ? restaurantReviews[restaurantReviews.length - 1].id + 1 : 1;
        let restaurantReview = new RestaurantReviewModel({
            id: id,
            userName: req.body.userName,
            restaurantId: req.body.restaurantId,
            overallRating: req.body.overallRating,
            foodRating: req.body.foodRating,
            serviceRating: req.body.serviceRating,
            valueRating: req.body.valueRating,
            atmosphereRating: req.body.atmosphereRating,
            visitDate: req.body.visitDate,
            familyType: req.body.familyType,
            mealType: req.body.mealType,
            reviewBody: req.body.body,
            reviewTitle: req.body.title
        })

        console.log(restaurantReview);
        await restaurantReview.save();
        res.json({
            success: true,
            message: 'Restaurant review added successfully'
        });

    } catch (error){
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}


const getAllRestaurantReviews = async (req, res) => {
    try{
        let allRestaurantReviews = await RestaurantReviewModel.find({});
        console.log("All Restaurant Reviews Fetched");
        console.log(allRestaurantReviews);
        res.send(allRestaurantReviews);

    } catch(error){
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}



export { AddRestaurant, getAllRestaurants, addRestaurantReview, getAllRestaurantReviews}

