import express from 'express';
import { GetProfile, RegWithGoogle, SignInWithEmailAndPassword, SignUpWithEmailAndPassword, UpdateProfile } from '../controller/UserController.js';
import { AddAccommodation, getAllAccomodations, GetData, GetCity } from '../controller/AccommodationController.js';
import { AddTravelMateFeedback, GetTravelMateFeedback } from '../controller/FeedbackController.js';
const router = express.Router()

router.post('/signinwithgoogle',RegWithGoogle)

router.get("/getprofile/:id",GetProfile)

router.post("/updateprofile/:id",UpdateProfile)

router.post("/addAccomodation",AddAccommodation)

router.get("/getdata",GetData)

router.get("/getcity/:id",GetCity)


router.get("/allAccomodations", getAllAccomodations)

router.post("/signupwithemailandpassword", SignUpWithEmailAndPassword);

router.post("/signinwithemailandpassword", SignInWithEmailAndPassword)

router.post("/addtravelmatefeedback", AddTravelMateFeedback)

router.get("/gettravelmatefeedback", GetTravelMateFeedback)

export default router;

export{router as Router}



