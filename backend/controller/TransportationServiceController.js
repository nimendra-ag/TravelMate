import dotenv from "dotenv"
dotenv.config({ path: "../.env" })
import { TransportationServiceModel } from "../models/Transportation.js"

const addTransportationServices = async (req, res) => {
    try {
        // Fetch existing transportation services to calculate the new ID
        const transportModes = await TransportationServiceModel.find({}).sort({ id: 1 }); // Sort by ID in ascending order
        const newId = transportModes.length > 0 ? transportModes[transportModes.length - 1].id + 1 : 1;

        // Create a new transportation service document
        const transportMode = new TransportationServiceModel({
            id: newId,
            transportationServiceName: req.body.transportationServiceName,
            availableVehicles: req.body.availableVehicles,
            pricePerHour: req.body.pricePerHour,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
            description: req.body.description,
            rating: req.body.rating || 0, // Default rating to 0 if not provided
        });

        // Save the transportation service to the database
        await transportMode.save();
        return res.json({
            success: true,
            message: 'Transportation service added successfully',
            data: transportMode,
        });
    } catch (error) {
        console.error('Error adding transportation service:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const UpdateTransportationService= async (req, res) => {
    try {
        const { id } = req.params;

        // Update the existing transportation mode with new data
        const updatedTransportMode = await TransportationServiceModel.findOneAndUpdate(
            { id: id }, // Match by ID
            {
                transportationServiceName: req.body.transportationServiceName,
                availableVehicles: req.body.availableVehicles,
                pricePerHour: req.body.pricePerHour,
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                description: req.body.description,
                rating: req.body.rating,
            },
            { new: true } // Return the updated document
        );

        if (updatedTransportMode) {
            return res.json({
                success: true,
                message: 'Transportation service updated successfully',
                data: updatedTransportMode,
            });
        } else {
            return res.status(404).json({ success: false, message: 'Transportation service not found' });
        }
    } catch (error) {
        console.error('Error updating transportation service:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
const getAllTransportationServices = async (req, res) => {
    try {
        let transportationServices = await TransportationServiceModel.find({});
        console.log("All Transportation Services Fetched");
        console.log(transportationServices);
        res.send(transportationServices);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });

    }
};

const deleteTransportationService = async (req, res) => {
    try {
        // Find and delete the transportation service by ID
        const deletedTransportationService = await TransportationServiceModel.findOneAndDelete({ id: req.body.id });
        
        if (deletedTransportationService) {
            return res.json({
                success: true,
                message: `Transportation service with ID ${req.body.id} deleted successfully.`,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Transportation service not found.",
            });
        }
    } catch (error) {
        console.error("Error deleting transportation service:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the transportation service.",
        });
    }
};
const viewTransportationService = async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the ID is numeric
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        // Fetch transportation service by numeric ID
        const transportationService = await TransportationServiceModel.findOne({ id: Number(id) });

        if (!transportationService) {
            return res.status(404).json({ success: false, message: 'Transportation service not found' });
        }

        // Success response
        res.status(200).json({ success: true, data: transportationService });
    } catch (error) {
        console.error('Error fetching transportation service:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export { addTransportationServices, getAllTransportationServices,UpdateTransportationService,deleteTransportationService,viewTransportationService}
