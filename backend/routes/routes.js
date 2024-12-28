import express from 'express';
import { AddOrUpdateGuide, getAllGuides } from '../controller/GuideController.js';
import { AddTransportationService, getAllTransportationServices } from '../controller/TransportationServiceController.js';
import { AddRestaurant, getAllRestaurants } from '../controller/RestaurantController.js';
import { AddDestination, getAllDestinations } from '../controller/DestinationController.js';

import { GetProfile, RegWithGoogle, SignInWithEmailAndPassword, SignUpWithEmailAndPassword, UpdateProfile } from '../controller/UserController.js';
import { AddOrUpdateAccommodation, getAllAccomodations, GetData, GetCity, deleteAccommodation , viewAccommodation} from '../controller/AccommodationController.js';
import { AddTravelMateFeedback, GetTravelMateFeedback } from '../controller/FeedbackController.js';
import { AddPrePlannedTrips, getAllPrePlannedTrips } from '../controller/PrePlannedTripController.js';
const router = express.Router()

router.post('/signinwithgoogle',RegWithGoogle)

router.get("/getprofile/:id",GetProfile)

router.post("/updateprofile/:id",UpdateProfile)

router.post("/addAccomodation",AddOrUpdateAccommodation)

router.put("/updateAccommodation/:id",AddOrUpdateAccommodation)

router.get("/getdata",GetData)

router.get("/getcity/:id",GetCity)


router.get("/allAccomodations", getAllAccomodations)

router.delete("/deleteAccommodation", deleteAccommodation)

router.get('/viewAccommodation/:id', viewAccommodation)

router.post("/signupwithemailandpassword", SignUpWithEmailAndPassword);

router.post("/signinwithemailandpassword", SignInWithEmailAndPassword)


router.post("/addGuide",AddOrUpdateGuide)

router.post("/updateGuide/:id",AddOrUpdateGuide)

router.get("/allGuides", getAllGuides)

router.get("/allTransportationServices", getAllTransportationServices)

router.post("/add-transportation-service", AddTransportationService)

router.post("/add-restaurant",AddRestaurant)

router.get("/allRestaurants", getAllRestaurants)

router.post("/add-destination",AddDestination)

router.get("/allDestinations", getAllDestinations)

router.post("/addPrePlannedTrips",AddPrePlannedTrips)

router.get("/allPrePlannedTrips", getAllPrePlannedTrips)


router.post("/signupwithemailandpassword", SignUpWithEmailAndPassword);

router.post("/signinwithemailandpassword", SignInWithEmailAndPassword)

router.post("/addtravelmatefeedback", AddTravelMateFeedback)

router.get("/gettravelmatefeedback", GetTravelMateFeedback)

export default router;

export{router as Router}



