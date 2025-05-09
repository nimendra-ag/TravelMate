import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { DestinationModel } from "../models/Destination.js";

const AddDestination = async (req, res) => {
  try {
      // Fetch existing guides to calculate the new ID
      const destinations = await DestinationModel.find({}).sort({ id: 1 }); // Sort by ID in ascending order
      const newId = destinations.length > 0 ? destinations[destinations.length - 1].id + 1 : 1;

      // Create a new guide document
      const destination = new DestinationModel({
          id: newId,
          name: req.body.name,
          city: req.body.city,
          distanceFromColombo: req.body.distanceFromColombo,
          category: req.body.category,
          description: req.body.description,
          bestTimeToVisit: req.body.bestTimeToVisit,
          contactNumber: req.body.contactNumber,
          openingHours: req.body.openingHours,
          website: req.body.website,
          miniDescription: req.body.miniDescription,

          rating: req.body.rating || 0, // Default rating to 0 if not provided
          cardImages: req.body.cardImages || [], // Default to empty array if not provided
          mainImages: req.body.mainImages || [], // Default to empty array if not provided

        });

      // Save the guide to the database
      await destination.save();
      return res.json({
          success: true,
          message: 'Destination added successfully',
          data: destination,
      });
  } catch (error) {
      console.error('Error adding destination:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const UpdateDestination = async (req, res) => {
  try {
      const { id } = req.params;

      // Update the existing Destination with new data
      const updatedDestination = await DestinationModel.findOneAndUpdate(
          { id: id },
          {
            name: req.body.name,
            city: req.body.city,
            distanceFromColombo: req.body.distanceFromColombo,
            category: req.body.category,
            description: req.body.description,
            bestTimeToVisit: req.body.bestTimeToVisit,
            contactNumber: req.body.contactNumber,
            openingHours: req.body.openingHours,
            website: req.body.website,
            rating: req.body.rating,
            images: req.body.images,
            miniDescription: req.body.miniDescription,
          },
          { new: true } // Return the updated document
      );

      if (updatedDestination) {
          return res.json({
              success: true,
              message: 'Destination updated successfully',
              data: updatedDestination,
          });
      } else {
          return res.status(404).json({ success: false, message: 'Destination not found' });
      }
  } catch (error) {
      console.error('Error updating Destination:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const getAllDestinations = async (req, res) => {
  try {
    let destinations = await DestinationModel.find({});
    // console.log("All Destinations Fetched");
    // console.log(destinations);
    res.send(destinations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

const DeleteDestination = async (req, res) => {
  try {
      const deletedDestination = await DestinationModel.findOneAndDelete({ id: req.body.id });
      if (deletedDestination) {
          res.json({
              success: true,
              message: `Destination with ID ${req.body.id} deleted successfully.`,
          });
      } else {
          res.status(404).json({
              success: false,
              message: "Destination not found.",
          });
      }
  } catch (error) {
      console.error("Error deleting Destination:", error);
      res.status(500).json({
          success: false,
          message: "An error occurred while deleting the Destination.",
      });
  }
};

const viewDestination = async (req, res) => {
  try {
      const { id } = req.params;

      // Ensure the ID is numeric
      if (isNaN(id)) {
          return res.status(400).json({ success: false, message: 'Invalid ID format' });
      }

      // Fetch destination by numeric ID
      const destination = await DestinationModel.findOne({ id: Number(id) });

      if (!destination) {
          return res.status(404).json({ success: false, message: 'Destination not found' });
      }

      // Success response
      res.status(200).json({ success: true, data: destination });
  } catch (error) {
      console.error('Error fetching destination:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};  




export { AddDestination, getAllDestinations,UpdateDestination,DeleteDestination,viewDestination };
