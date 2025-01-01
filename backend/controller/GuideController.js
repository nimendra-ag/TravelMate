import dotenv from "dotenv";
import { GuideModel } from "../models/Guide.js";

dotenv.config({ path: "../.env" });

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



export { AddGuide, getAllGuides };
