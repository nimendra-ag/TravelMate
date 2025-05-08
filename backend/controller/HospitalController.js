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
            description: req.body.description,


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

const viewHospital = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the ID is numeric
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        // Fetch hospital by numeric ID
        const hospital = await HospitalModel.findOne({ id: Number(id) });

        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }

        // Success response
        res.status(200).json({ success: true, data: hospital });
    } catch (error) {
        console.error('Error fetching hospital:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// API to delete a Hotel
const deleteHospital = async (req, res) => {
    try {
        const deletedHospital = await HospitalModel.findOneAndDelete({ id: req.body.id });
        if (deletedHospital) {
            res.json({
                success: true,
                message: `Hospital with ID ${req.body.id} deleted successfully.`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Hospital not found.",
            });
        }
    } catch (error) {
        console.error("Error deleting hospital:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the hospital.",
        });

        
    }
};

// Update Hospital API
const updateHospital = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHospital = await HospitalModel.findOneAndUpdate(
            { id: id },
            {
                
            name: req.body.name,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            website: req.body.website,
            category: req.body.category,
            nearestCity: req.body.nearestCity,
            distanceFromNearestCity: req.body.distanceFromNearestCity,
            description: req.body.description,
            },
            { new: true }
        );

        if (updatedHospital) {
            return res.json({
                success: true,
                message: 'Hospital updated successfully',
                data: updatedHospital,
            });
        } else {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
    } catch (error) {
        console.error("Error updating hospital:", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


export { AddHospital, getAllHospitals, viewHospital, deleteHospital, updateHospital}