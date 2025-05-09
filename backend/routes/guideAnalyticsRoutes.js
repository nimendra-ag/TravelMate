import express from 'express';
import {
  getGuideDistributionByArea,
  getLanguageProficiency,
  getAgeDistribution,
  getRatingAnalysis
} from '../controller/guideAnalyticsController.js';

const router = express.Router();

router.get('/area-distribution', getGuideDistributionByArea);
router.get('/language-distribution', getLanguageProficiency);
router.get('/age-distribution', getAgeDistribution);
router.get('/rating-distribution', getRatingAnalysis);

export default router;
