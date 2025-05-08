import dotenv from "dotenv";
import { GuideModel } from "../models/Guide.js";
import { GuideReviewModel } from "../models/GuideReview.js";

dotenv.config({ path: "../.env" });

const AddGuide = async (req, res) => {
    try {
        // Fetch existing guides to calculate the new ID
        const guides = await GuideModel.find({}).sort({ id: 1 }); // Sort by ID in ascending order
        const newId = guides.length > 0 ? guides[guides.length - 1].id + 1 : 1;

        // Create a new guide document
        const guide = new GuideModel({
            id: newId,
            name: req.body.name,
            area: req.body.area,
            languages: req.body.languages,
            chargesPerDay: req.body.chargesPerDay,
            description: req.body.description,
            birthDate: req.body.birthDate,
            contactNumber: req.body.contactNumber,
            nic: req.body.nic,
            rating: req.body.rating || 0, // Default rating to 0 if not provided
            images : req.body.images,
            miniDescription: req.body.miniDescription,
            cardImage: req.body.cardImage,
        });

        // Save the guide to the database
        await guide.save();
        return res.json({
            success: true,
            message: 'Guide added successfully',
            data: guide,
        });
    } catch (error) {
        console.error('Error adding guide:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const UpdateGuide = async (req, res) => {
    try {
        const { id } = req.params;

        // Update the existing guide with new data
        const updatedGuide = await GuideModel.findOneAndUpdate(
            { id: id },
            {
                name: req.body.name,
                area: req.body.area,
                languages: req.body.languages,
                chargesPerDay: req.body.chargesPerDay,
                description: req.body.description,
                birthDate: req.body.birthDate,
                contactNumber: req.body.contactNumber,
                nic: req.body.nic,
                rating: req.body.rating,
            },
            { new: true } // Return the updated document
        );

        if (updatedGuide) {
            return res.json({
                success: true,
                message: 'Guide updated successfully',
                data: updatedGuide,
            });
        } else {
            return res.status(404).json({ success: false, message: 'Guide not found' });
        }
    } catch (error) {
        console.error('Error updating guide:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// Get all guides
const getAllGuides = async (req, res) => {
  try {
      let guides = await GuideModel.find({});
      // console.log("All Guides Fetched");
      // console.log(guides);
      res.send(guides);
      
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server Error' });

  }
}

// API to delete a Hotel
const deleteGuide = async (req, res) => {
    try {
        const deletedGuide = await GuideModel.findOneAndDelete({ id: req.body.id });
        if (deletedGuide) {
            res.json({
                success: true,
                message: `Guide with ID ${req.body.id} deleted successfully.`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Guide not found.",
            });
        }
    } catch (error) {
        console.error("Error deleting Guide:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the Guide.",
        });
    }
};

const viewGuide = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the ID is numeric
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        // Fetch guide by numeric ID
        const guide = await GuideModel.findOne({ id: Number(id) });

        if (!guide) {
            return res.status(404).json({ success: false, message: 'Guide not found' });
        }

        // Success response
        res.status(200).json({ success: true, data: guide });
    } catch (error) {
        console.error('Error fetching guide:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};  

const addGuideReview = async (req, res) =>{
    try{
    
        let guideReviews = await GuideReviewModel.find({});
        let id = guideReviews.length > 0 ? guideReviews[guideReviews.length - 1].id + 1 : 1;
        let guideReview = new GuideReviewModel({
            id: id,
            userName: req.body.userName,
            guideId: req.body.guideId,
            overallRating: req.body.overallRating,
            serviceRating: req.body.serviceRating,
            valueRating: req.body.valueRating,
            reviewBody: req.body.body,
            reviewTitle: req.body.title,
            recommendation: req.body.recommendation,
            createdAt: req.body.createdAt,
            country: req.body.country,
        })

        // console.log(guideReview);
        await guideReview.save();
        res.json({
            success: true,
            message: 'Guide review added successfully'
        });

    } catch (error){
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}


const getAllGuideReviews = async (req, res) => {
    try{
        let allGuideReviews = await GuideReviewModel.find({});
        console.log("All Guide Reviews Fetched");
        // console.log(allGuideReviews);
        res.send(allGuideReviews);

    } catch(error){
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}


export { AddGuide,UpdateGuide, getAllGuides,deleteGuide,viewGuide,getAllGuideReviews,addGuideReview };
