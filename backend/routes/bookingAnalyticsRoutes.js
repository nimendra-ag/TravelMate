import express from 'express';
import {
  getSeasonalBookingPatterns,
  getBookingStatusOverview,
  getDailyBookingActivity,
  getAllBookingAnalytics
} from '../controller/bookingAnalyticsController.js';

const router = express.Router();

router.get('/seasonal-patterns', getSeasonalBookingPatterns);
router.get('/status-overview', getBookingStatusOverview);
router.get('/daily-activity', getDailyBookingActivity);
router.get('/all', getAllBookingAnalytics);

export default router;
