import express from 'express';
import { getDestinations, getDestinationStats } from '../controller/DestinationAnalyticsController.js';

const router = express.Router();

router.get('/destinations', getDestinations);
router.get('/destinations/stats', getDestinationStats);

export default router;