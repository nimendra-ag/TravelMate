import express from 'express';
import { GetProfile, RegWithGoogle, UpdateProfile } from '../controller/UserController.js';
import { AddAccommodation, getAllAccomodations } from '../controller/AccommodationController.js';
import { AddGuide, getAllGuides } from '../controller/GuideController.js';
import { AddTransportationService, getAllTransportationServices } from '../controller/TransportationServiceController.js';
import { AddRestaurant, getAllRestaurants } from '../controller/RestauranrController.js';
import { AddDestination, getAllDestinations } from '../controller/DestinationController.js';

const router = express.Router()

router.post('/signinwithgoogle',RegWithGoogle)

router.get("/getprofile/:id",GetProfile)

router.post("/updateprofile/:id",UpdateProfile)

router.post("/addAccomodation",AddAccommodation)

router.get("/allAccomodations", getAllAccomodations)

router.post("/addGuide",AddGuide)

router.get("/allGuides", getAllGuides)

router.get("/allTransportationServices", getAllTransportationServices)

router.post("/add-transportation-service", AddTransportationService)

router.post("/add-restaurant",AddRestaurant)

router.get("/allRestaurants", getAllRestaurants)

router.post("/add-destination",AddDestination)

router.get("/allDestinations", getAllDestinations)



export default router;

export{router as Router}



