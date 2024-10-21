import express from 'express';
import { GetProfile, RegWithGoogle, UpdateProfile } from '../controller/UserController.js';
import { AddAccommodation, GetData, GetCity } from '../controller/AccommodationController.js';
const router = express.Router()

router.post('/signinwithgoogle',RegWithGoogle)

router.get("/getprofile/:id",GetProfile)

router.post("/updateprofile/:id",UpdateProfile)

router.post("/addAccomodation",AddAccommodation)

router.get("/getdata",GetData)

router.get("/getcity/:id",GetCity)



export default router;

export{router as Router}



