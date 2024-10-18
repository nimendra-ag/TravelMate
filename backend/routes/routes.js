import express from 'express';
import { GetProfile, RegWithGoogle, SignInWithEmailAndPassword, SignUpWithEmailAndPassword, UpdateProfile } from '../controller/UserController.js';
import { AddAccommodation, getAllAccomodations } from '../controller/AccommodationController.js';
const router = express.Router()

router.post('/signinwithgoogle',RegWithGoogle)

router.get("/getprofile/:id",GetProfile)

router.post("/updateprofile/:id",UpdateProfile)

router.post("/addAccomodation",AddAccommodation)

router.get("/allAccomodations", getAllAccomodations)

router.post("/signupwithemailandpassword", SignUpWithEmailAndPassword);

router.post("/signinwithemailandpassword", SignInWithEmailAndPassword)

export default router;

export{router as Router}



