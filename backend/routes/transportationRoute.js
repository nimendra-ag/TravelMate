import express from 'express';
import AddVehicle from '../../admin/src/components/ViewTransportationServices/AddVehical';
const transportationrouter = express.Router();

transportationrouter.post("/addVehical",AddVehicle)

export default transportationrouter;