import express from 'express';
import { getTransportationAnalytics } from '../controller/transportationServices.js';

const transportationRouter = express.Router();

// Route for transportation analytics
transportationRouter.get('/analytics', getTransportationAnalytics);

export default transportationRouter;
