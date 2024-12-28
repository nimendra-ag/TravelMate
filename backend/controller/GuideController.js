import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import {GuideModel} from "../models/Guide.js"

const AddGuide = async (req, res) => {
  console.log(req.body);
  try {
    let guides = await GuideModel.find({});
    let id = guides.length > 0 ? guides[guides.length - 1].id + 1 : 1;
    const guide = new GuideModel({
      id: id,
      name: req.body.name,
      area: req.body.area,
      languages: req.body.languages,
      chargesPerDay: req.body.chargesPerDay,
      description: req.body.description,
      birthDate: req.body.birthDate,
      contactNumber: req.body.contactNumber,
      nic: req.body.nic,

    });
    await guide.save();
    res.json({
        success: true,
        message: 'Guide added successfully',
        hotel_name: req.body.name,
    });

  } catch (error) {
    console.error("Error saving guide:", error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
import { GuideModel } from "../models/Guide.js";

// Add a new guide
const AddOrUpdateGuide = async (req, res) => {
    try {
        const { id } = req.body;

        if (id) {
            // Update existing guide
            const updatedGuide = await GuideModel.findOneAndUpdate(
                { id: id },
                {
                    guideName: req.body.guideName,
                    area: req.body.area,
                    languages: req.body.languages,
                    chargesPerDay: req.body.chargesPerDay,
                    description: req.body.description,
                    birthDate: req.body.birthDate,
                    contactNumber: req.body.contactNumber,
                    nic: req.body.nic,
                    rating: req.body.rating, // Optional
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
        } else {
            // Add new guide
            const guides = await GuideModel.find({}).sort({ id: 1 }); // Sort by ID in ascending order
            const newId = guides.length > 0 ? guides[guides.length - 1].id + 1 : 1;

            const guide = new GuideModel({
                id: newId,
                guideName: req.body.guideName,
                area: req.body.area,
                languages: req.body.languages,
                chargesPerDay: req.body.chargesPerDay,
                description: req.body.description,
                birthDate: req.body.birthDate,
                contactNumber: req.body.contactNumber,
                nic: req.body.nic,
                rating: req.body.rating || 0, // Default to 0 if not provided
            });

            await guide.save();
            return res.json({
                success: true,
                message: 'Guide added successfully',
                data: guide,
            });
        }
    } catch (error) {
        console.error('Error saving/updating guide:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get all guides
const getAllGuides = async (req, res) => {
    try {
        const guides = await GuideModel.find({});
        console.log("All Guides Fetched");
        res.json({ success: true, guides });
    } catch (error) {
        console.error("Error fetching guides:", error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

export { AddOrUpdateGuide, getAllGuides };
