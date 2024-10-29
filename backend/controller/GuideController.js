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
      name: req.body.guideName,
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
        hotel_name: req.body.guideName,
    });

  } catch (error) {
    console.error("Error saving guide:", error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const getAllGuides = async (req, res) => {
  try {
      let guides = await GuideModel.find({});
      console.log("All Guides Fetched");
      console.log(guides);
      res.send(guides);
      
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server Error' });

  }
}

export{ AddGuide, getAllGuides}