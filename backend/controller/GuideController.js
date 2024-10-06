import dotenv from "dotenv";
import { GuideModel } from "../models/Guide";
dotenv.config({ path: "../.env" });

const AddGuide = async (req, res) => {
  console.log(req.body.guideName);
  try {
    let guides = await GuideModel.find({});
    let id = guides.length > 0 ? guides[guides.length - 1].id + 1 : 1;
    const guide = new GuideModel({
      id: id,
      guideName: req.body.guideName,
      areas: req.body.areas,
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

export{ AddGuide}