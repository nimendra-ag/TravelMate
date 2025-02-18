import dotenv from "dotenv";
import { PrePlannedTripModel } from "../models/PrePlannedTrip.js";
dotenv.config({ path: "../.env" });

const AddPrePlannedTrips = async (req, res) => {
    // console.log(req.body);
    try {
      let prePlannedTrips = await PrePlannedTripModel.find({});
      let id = prePlannedTrips.length > 0 ? prePlannedTrips[prePlannedTrips.length - 1].id + 1 : 1;
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


  
      });
      await prePlannedTrip.save();
      res.json({
          success: true,
          message: 'Trip added successfully',
          pre_planned_trip_name: req.body.name,
      });
  
    } catch (error) {
      console.error("Error saving trip:", error);
      res.status(500).json({ success: false, error: 'Server Error' });
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
        res.status(500).json({ success: false, error: 'Server Error' });
  
    }
  }
  
  export{ AddPrePlannedTrips, getAllPrePlannedTrips}