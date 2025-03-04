import express from 'express';
import { addVehical, deleteVehicalImage, editVehical } from '../controller/TransportationServiceController.js';
const transportationrouter = express.Router();

transportationrouter.post("/addVehical",addVehical)

transportationrouter.delete("/deleteVehicalImage",deleteVehicalImage)

transportationrouter.put("/editVehical",editVehical)


export default transportationrouter;