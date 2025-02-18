import dotenv from "dotenv"
import { RestaurantModel } from "../models/Restaurant.js"
import { RestaurantReviewModel } from "../models/RestaurantReview.js";
dotenv.config({ path: "../.env" })

const AddRestaurant = async (req, res) => {
    try {
        // Fetch existing restaurants to calculate the new ID
        const restaurants = await RestaurantModel.find({}).sort({ id: 1 }); // Sort by ID in ascending order
        const newId = restaurants.length > 0 ? restaurants[restaurants.length - 1].id + 1 : 1;

        // Create a new restaurant document
        const restaurant = new RestaurantModel({
            id: newId,
            name: req.body.name,
            area: req.body.area,
            address: req.body.address,
            category: req.body.category,
            description: req.body.description,
            mainCategory: req.body.mainCategory,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            website: req.body.website,
            openingHours: req.body.openingHours,
            priceRange: req.body.priceRange,
            rating: req.body.rating || 0, // Default rating to 0 if not provided
            cardImages: req.body.cardImages || [], // Default to empty array if not provided
            caroImages: req.body.caroImages || [], // Default to empty array if not provided
            mainImages: req.body.mainImages || [], // Default to empty array if not provided
        });

        // Save the restaurant to the database
        await restaurant.save();
        return res.json({
            success: true,
            message: 'Restaurant added successfully',
            data: restaurant,
        });
    } catch (error) {
        console.error('Error adding restaurant:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


const UpdateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        // Update the existing Restaurant with new data
        const UpdatedRestaurant = await RestaurantModel.findOneAndUpdate(
            { id: id },
            {
                name: req.body.name,
                address: req.body.address,
                category: req.body.category,
                description: req.body.description,
                mainCategory: req.body.mainCategory,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
                website: req.body.website,
                openingHours: req.body.openingHours,
                priceRange: req.body.priceRange,
                area: req.body.area,
                rating: req.body.rating
            },
            { new: true } // Return the updated document
        );

        if (UpdatedRestaurant) {
            return res.json({
                success: true,
                message: 'Restaurant updated successfully',
                data: UpdatedRestaurant,
            });
        } else {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error updating Restaurant:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};



const getAllRestaurants = async (req, res) => {
    try {
        let restaurants = await RestaurantModel.find({});
        console.log("All Restaurants Fetched");
        // console.log(restaurants);
        res.send(restaurants);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });

    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await RestaurantModel.findOneAndDelete({ id: req.body.id });
        if (deletedRestaurant) {
            res.json({
                success: true,
                message: `Restaurant with ID ${req.body.id} deleted successfully.`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Restaurant not found.",
            });
        }
    } catch (error) {
        console.error("Error deleting Restaurant:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the Restaurant.",
        });
    }
};

const viewRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the ID is numeric
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        // Fetch restaurant by numeric ID
        const restaurant = await RestaurantModel.findOne({ id: Number(id) });

        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }

        // Success response
        res.status(200).json({ success: true, data: restaurant });
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

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

        // console.log(restaurantReview);
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
        // console.log(allRestaurantReviews);
        res.send(allRestaurantReviews);

    } catch(error){
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}



export { AddRestaurant, getAllRestaurants,UpdateRestaurant,deleteRestaurant,viewRestaurant, getAllRestaurantReviews, addRestaurantReview};

