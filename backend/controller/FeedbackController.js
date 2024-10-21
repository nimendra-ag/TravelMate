import { TravelMateFeedbackModel } from "../models/TravelMateFeedback.js";


const AddTravelMateFeedback = async (req, res) => {
    
    try {
        const feedback = new TravelMateFeedbackModel({
            name: req.body.name,
            country: req.body.country,
            feedback: req.body.feedback
        })
        await feedback.save();

        res.json({success:true})
        
    } catch (error) {
        console.error("Error adding travelmate feedback", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
}

const GetTravelMateFeedback = async (req, res) => {
    try {
        // MongoDB aggregation to get a random sample of 6 feedbacks
        const feedbacks = await TravelMateFeedbackModel.find({});
        res.send(feedbacks);

    } catch (error) {
        console.error('Error fetching travelmatefeedbacks:', error);
        res.status(500).send('Internal Server Error');
    }
}

export {AddTravelMateFeedback, GetTravelMateFeedback};