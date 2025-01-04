import dotenv from "dotenv"
dotenv.config({ path: "../.env" })
import { TransportationServiceModel } from "../models/Transportation.js"

const AddTransportationService = async (req, res) => {

    // console.log(req.body.transportationServiceName);
    
    try {

        let transportationServices = await TransportationServiceModel.find({});
        let id = transportationServices.length > 0 ? transportationServices[transportationServices.length - 1].id + 1 : 1;
        const transportationService = new TransportationServiceModel({
            id: id,
            transportationServiceName: req.body.transportationServiceName,
            availableVehicles: req.body.availableVehicles,
            pricePerHour: req.body.pricePerHour,
            // image: req.file.path || req.file.secure_url,
            address: req.body.address,
            contactNumber: req.body.contactNumber,
            description: req.body.description,
            
        });

        await transportationService.save();
        res.json({
            success: true,
            message: 'Service added successfully',
            transportation_service_name: req.body.transportationServiceName,
        });
    }
    catch(error) {

        console.error("Error saving transportation service:", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }

}
const getAllTransportationServices = async (req, res) => {
    try {
        let transportationServices = await TransportationServiceModel.find({});
        // console.log("All Transportation Services Fetched");
        // console.log(transportationServices);
        res.send(transportationServices);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Server Error' });

    }
}
export { AddTransportationService, getAllTransportationServices}
