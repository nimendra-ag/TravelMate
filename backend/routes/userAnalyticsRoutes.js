import express from 'express';
import {
  getAgeDistribution,
  getGenderDistribution,
  getGeographicDistribution,
  getTopCountries,
  getUserRegistrationTrends,
  getAllUserAnalytics
} from '../controller/userAnalyticsController.js';

const router = express.Router();

router.get('/age-distribution', getAgeDistribution);
router.get('/gender-distribution', getGenderDistribution);
router.get('/geographic-distribution', getGeographicDistribution);
router.get('/top-countries', getTopCountries);
router.get('/registration-trends', getUserRegistrationTrends);
router.get('/all', getAllUserAnalytics);

export default router;
