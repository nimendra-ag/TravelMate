import dotenv from "dotenv";
import { PrePlannedTripModel } from "../models/PrePlannedTrip.js";

dotenv.config({ path: "../.env" });

const AddPrePlannedTrips = async (req, res) => {
  // console.log(req.body);
  try {
    let prePlannedTrips = await PrePlannedTripModel.find({});
    let id =
      prePlannedTrips.length > 0
        ? prePlannedTrips[prePlannedTrips.length - 1].id + 1
        : 1;
    const prePlannedTrip = new PrePlannedTripModel({
      id: id,
      name: req.body.name,
      mainDestinations: req.body.mainDestinations,
      guides: req.body.guides,
      mainActivities: req.body.mainActivities,
      price: req.body.price,
      description: req.body.description,
      duration: req.body.duration,
      contactNumber: req.body.contactNumber,
      noOfTravelers: req.body.noOfTravelers,
      startTime: req.body.startTime,
      startLocation: req.body.startLocation,
      endTime: req.body.endTime,
      endLocation: req.body.endLocation,
      availableDates: req.body.availableDates,
      whatsExpected: req.body.whatsExpected,
      whatsIncluded: req.body.whatsIncluded,
      additionalInfo: req.body.additionalInfo,
      cancellationPolicy: req.body.cancellationPolicy,
      help: req.body.help,
      activityImages: req.body.activityImages || [], // Default to empty array if not provided
      mainImage: req.body.mainImage || "", // Changed to empty string default for single image
    });
    await prePlannedTrip.save();
    res.json({
      success: true,
      message: "Trip added successfully",
      pre_planned_trip_name: req.body.name,
    });
  } catch (error) {
    console.error("Error saving trip:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const getAllPrePlannedTrips = async (req, res) => {
  try {
    let prePlannedTrips = await PrePlannedTripModel.find({});
    // console.log("All Trips Fetched");
    // console.log(prePlannedTrips);
    res.send(prePlannedTrips);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const UpdatePrePlannedTrip = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Create update object
    const updateData = {
      name: req.body.name,
      mainDestinations: req.body.mainDestinations,
      guides: req.body.guides,
      mainActivities: req.body.mainActivities,
      price: req.body.price,
      description: req.body.description,
      duration: req.body.duration,
      contactNumber: req.body.contactNumber,
      noOfTravelers: req.body.noOfTravelers,
      startTime: req.body.startTime,
      startLocation: req.body.startLocation,
      endTime: req.body.endTime,
      endLocation: req.body.endLocation,
      availableDates: req.body.availableDates,
      whatsExpected: req.body.whatsExpected,
      whatsIncluded: req.body.whatsIncluded,
      additionalInfo: req.body.additionalInfo,
      cancellationPolicy: req.body.cancellationPolicy,
      help: req.body.help,
    };
    
    // Add mainImage to update if provided
    if (req.body.mainImage !== undefined) {
      updateData.mainImage = req.body.mainImage;
    }
    
    // Add activityImages to update if provided
    if (req.body.activityImages !== undefined) {
      updateData.activityImages = req.body.activityImages;
    }

    // Update the existing PrePlannedTrip with new data
    const UpdatedPrePlannedTrip = await PrePlannedTripModel.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true } // Return the updated document
    );

    if (UpdatedPrePlannedTrip) {
      return res.json({
        success: true,
        message: 'PrePlannedTrip updated successfully',
        data: UpdatedPrePlannedTrip,
      });
    } else {
      return res.status(404).json({ success: false, message: 'PrePlannedTrip not found' });
    }
  } catch (error) {
    console.error('Error updating PrePlannedTrip:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const deletePrePlannedTrip = async (req, res) => {
  try {
    const deletedPrePlannedTrip = await PrePlannedTripModel.findOneAndDelete({ id: req.body.id });
    if (deletedPrePlannedTrip) {
      res.json({
        success: true,
        message: `PrePlannedTrip with ID ${req.body.id} deleted successfully.`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "PrePlannedTrip not found.",
      });
    }
  } catch (error) {
    console.error("Error deleting PrePlannedTrip:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the PrePlannedTrip.",
    });
  }
};

const viewPrePlannedTrip = async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure the ID is numeric
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
    // Fetch PrePlannedTrip by numeric ID
    const prePlannedTrip = await PrePlannedTripModel.findOne({ id: Number(id) });
    if (!prePlannedTrip) {
      return res.status(404).json({ success: false, message: 'PrePlannedTrip not found' });
    }
    // Success response
    res.status(200).json({ success: true, data: prePlannedTrip });
  } catch (error) {
    console.error('Error fetching prePlannedTrip:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { AddPrePlannedTrips, getAllPrePlannedTrips, UpdatePrePlannedTrip, deletePrePlannedTrip, viewPrePlannedTrip };
