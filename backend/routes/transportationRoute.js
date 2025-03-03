import express from 'express';
import { addVehical } from '../controller/TransportationServiceController.js';
const transportationrouter = express.Router();

transportationrouter.post("/addVehical",addVehical)

export default transportationrouter;