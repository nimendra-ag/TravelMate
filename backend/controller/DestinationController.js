import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { DestinationModel } from "../models/Destination.js";

const AddDestination = async (req, res) => {
  console.log(req.body);
  try {
    let destinations = await DestinationModel.find({});
    let id =
      destinations.length > 0
        ? destinations[destinations.length - 1].id + 1
        : 1;
    const destination = new DestinationModel({
      id: id,
      destinationName: req.body.destinationName,
      city: req.body.city,
      distanceFromColombo: req.body.distanceFromColombo,
      bestTimeToVisit: req.body.bestTimeToVisit,
      category: req.body.category,
      website: req.body.website,
      contactNumber: req.body.contactNumber,
      description: req.body.description,
      openingHours: req.body.openingHours,
    });
    await destination.save();
    res.json({
      success: true,
      message: "Destination added successfully",
      hotel_name: req.body.destinationName,
    });
  } catch (error) {
    console.error("Error saving destination:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
const getAllDestinations = async (req, res) => {
  try {
    let destinations = await DestinationModel.find({});
    console.log("All Destinations Fetched");
    console.log(destinations);
    res.send(destinations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export { AddDestination, getAllDestinations };
