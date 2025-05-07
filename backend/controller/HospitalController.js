import dotenv from "dotenv";
import { HospitalModel } from "../models/Hospital.js";

dotenv.config({ path: "../.env" });

const AddHospital = async (req, res) => {
    try {
        // Fetch existing hospitals to calculate the new ID
        const hospitals = await HospitalModel.find({}).sort({ id: 1 }); // Sort by ID in ascending order
        const newId = hospitals.length > 0 ? hospitals[hospitals.length - 1].id + 1 : 1;

        // Create a new hospital document
        const hospital = new HospitalModel({
            id: newId,
            name: req.body.name,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            website: req.body.website,
            category: req.body.category,
            nearestCity: req.body.nearestCity,
            distanceFromNearestCity: req.body.distanceFromNearestCity,

        });

        
        // Save the hospital to the database
        await hospital.save();
        return res.json({
            success: true,
            message: 'Hospital added successfully',
            data: hospital,
        });
    } catch (error) {
        console.error('Error adding hospital:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
  try {
      let hospitals = await HospitalModel.find({});
      // console.log("All Hospitals Fetched");
      // console.log(hospitals);
      res.send(hospitals);
      
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Server Error' });

  }
}
export { AddHospital, getAllHospitals}