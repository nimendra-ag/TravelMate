import express from 'express';
import { GetProfile, RegWithGoogle, UpdateProfile } from '../controller/UserController.js';
import { AddAccommodation, getAllAccomodations } from '../controller/AccommodationController.js';
import { AddGuide, getAllGuides } from '../controller/GuideController.js';
const router = express.Router()

router.post('/signinwithgoogle',RegWithGoogle)

router.get("/getprofile/:id",GetProfile)

router.post("/updateprofile/:id",UpdateProfile)

router.post("/addAccomodation",AddAccommodation)

router.get("/allAccomodations", getAllAccomodations)

router.post("/addGuide",AddGuide)

router.get("/allGuides", getAllGuides)


export default router;

export{router as Router}



