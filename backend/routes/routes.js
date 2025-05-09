import express from 'express';
import { UpdateGuide,AddGuide, getAllGuides,deleteGuide,viewGuide, addGuideReview, getAllGuideReviews } from '../controller/GuideController.js';
import { AddTransportationService, getAllTransportationServices,UpdateTransportationService,deleteTransportationService,viewTransportationService } from '../controller/TransportationServiceController.js';
import { AddRestaurant, getAllRestaurants ,UpdateRestaurant,deleteRestaurant,viewRestaurant, addRestaurantReview, getAllRestaurantReviews} from '../controller/RestaurantController.js';
import { AddDestination,UpdateDestination,getAllDestinations,DeleteDestination,viewDestination } from '../controller/DestinationController.js';

import { GetProfile, RegWithGoogle, SignInWithEmailAndPassword, SignUpWithEmailAndPassword, UpdateProfile } from '../controller/UserController.js';
import { updateAccommodation,addAccommodation, getAllAccomodations, GetData, GetCity, deleteAccommodation , viewAccommodation, getAllHotelReviews, addHotelReview} from '../controller/AccommodationController.js';
import { AddTravelMateFeedback, GetTravelMateFeedback } from '../controller/FeedbackController.js';
import { AddPrePlannedTrips, getAllPrePlannedTrips } from '../controller/PrePlannedTripController.js';
import { AddPrePlannedTripBooking, getAllPrePlannedTripBookings } from '../controller/PrePlannedTripBookingController.js';
import { AddNewsletterMail } from '../controller/NewsLetterController.js';
import { AddHospital } from '../controller/HospitalController.js';
import { getPriceDistribution,getAvailabilityStatus,getLocationData,getPopularCategories,getPriceRatingData,getAreaAccommodations} from '../controller/AnalyticsController.js';

const router = express.Router()

router.post('/signinwithgoogle',RegWithGoogle)

router.get("/getprofile/:id",GetProfile)

router.post("/updateprofile/:id",UpdateProfile)

router.post("/addAccomodation",addAccommodation)

router.put("/updateAccommodation/:id",updateAccommodation)

router.get("/getdata",GetData)

router.get("/getcity/:id",GetCity)


router.get("/allAccomodations", getAllAccomodations)

router.delete("/deleteAccommodation", deleteAccommodation)

router.get('/viewAccommodation/:id', viewAccommodation)

router.post("/signupwithemailandpassword", SignUpWithEmailAndPassword);

router.post("/signinwithemailandpassword", SignInWithEmailAndPassword)


router.post("/addGuide", AddGuide);

router.put("/updateGuide/:id", UpdateGuide);

router.get("/allGuides", getAllGuides);

router.delete("/deleteGuide", deleteGuide);

router.get('/viewGuide/:id', viewGuide)

router.get("/allTransportationServices", getAllTransportationServices)

router.post("/add-transportation-service", AddTransportationService)

router.put("/updateTransportationService/:id",UpdateTransportationService )

router.delete("/deleteTransportationService", deleteTransportationService)

router.get('/viewTransportationService/:id', viewTransportationService)

router.post("/add-restaurant",AddRestaurant)

router.get("/allRestaurants", getAllRestaurants)

router.put("/updateRestaurant/:id", UpdateRestaurant)

router.delete("/deleteRestaurant", deleteRestaurant)

router.get('/viewRestaurant/:id', viewRestaurant)

router.put("/updateGuide/:id", UpdateGuide);

router.post("/addDestination",AddDestination)

router.put("/updateDestination/:id", UpdateDestination);

router.get("/allDestinations", getAllDestinations)

router.delete("/deleteDestination", DeleteDestination)

router.get('/viewDestination/:id', viewDestination)

router.post("/addPrePlannedTrips",AddPrePlannedTrips)

router.get("/allPrePlannedTrips", getAllPrePlannedTrips)

router.get("/all-pre-planned-trip-bookings", getAllPrePlannedTripBookings)

router.post("/add-pre-planned-trip-bookings", AddPrePlannedTripBooking)

router.post("/signupwithemailandpassword", SignUpWithEmailAndPassword);

router.post("/signinwithemailandpassword", SignInWithEmailAndPassword)

router.post("/addtravelmatefeedback", AddTravelMateFeedback)

router.get("/gettravelmatefeedback", GetTravelMateFeedback)

router.post("/addRestaurantReview", addRestaurantReview)

router.get("/getAllRestaurantReviews", getAllRestaurantReviews)

router.post("/addHotelReview", addHotelReview)

router.get("/getAllHotelReviews", getAllHotelReviews)

router.post("/addGuideReview", addGuideReview)

router.get("/getAllGuideReviews", getAllGuideReviews)

router.post("/add-hospital",AddHospital)

router.post("/subscribetonewsletter", AddNewsletterMail)

router.get("/price-distribution", getPriceDistribution);

router.get("/availability", getAvailabilityStatus);

router.get("/location-data", getLocationData);

router.get("/popular-categories", getPopularCategories);

router.get("/price-rating", getPriceRatingData);

router.get("/area-count", getAreaAccommodations);



export default router;

export{router as Router}



