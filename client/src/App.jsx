import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Components
import Footer from './components/footer/Footer'
import Exist from './components/Exist'
import SearchResult from './components/searchResult/SearchResult'

// Pages
import Home from './pages/home/Home'
import Destination from './pages/Destination/Destination'
import GetDetails from './pages/details/GetDetails'
import CityResults from './pages/cityResults/CityResults'
import HotelPage from './pages/HotelPage/HotelPage'
import ActivitiesPage from './pages/activitiesPage/ActivitiesPage'
import RestaurantPage from './pages/restaurantPage/RestaurantPage'
import PrePlannedTripsMainPage from './pages/prePlannedTripsMainPage/PrePlannedTripsMainPage'
import BookHotel from './pages/bookHotel/BookHotel'
import HotelRoom from './pages/bookHotel/HotelRoom'
import ConBookHotel from './pages/bookHotel/ConBookHotel'
import MyBookings from './pages/bookHotel/MyBookings'
import DateNightCategoryRestaurants from './pages/dateNightCategoryRestaurants/DateNightCategoryRestaurants'
import FineDiningCategoryRestaurants from './pages/fineDiningCategoryRestaurants/FineDiningCategoryRestaurants'
import OutsideCategoryRestaurants from './pages/outsideCategoryRestaurants/OutsideCategoryRestaurants'
import VeganAndVegCategoryRestaurants from './pages/veganAndVegCategoryRestaurants/VeganAndVegCategoryRestaurants'
import CasualDiningCategoryRestaurants from './pages/casualDiningCategoryRestaurants/CasualDiningCategoryRestaurants'
import ReviewRestaurant from './pages/reviewRestaurant/ReviewRestaurant'
import PrePlannedTripBookingForm from './components/prePlannedTripBookingForm/PrePlannedTripBookingForm'
import AvailableBookings from './pages/bookHotel/AvailableBookings'
import CancledBookings from './pages/bookHotel/CancledBookings'
import CompletedBookings from './pages/bookHotel/CompletedBookings'
import ClientLayout from './components/ClientLayout/ClientLayout'
import GuidPage from './pages/GuidBooking/GuidPage/GuidPage'
import PaymentPage from './pages/Payement/PaymentPage';
import PaymentSuccess from './pages/Payement/PaymentSuccess';
import PaymentFailed from './pages/Payement/PaymentFailed';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ClientLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<GetDetails />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/destinations/:id" element={<Destination />} />
          {/* <Route path="/destination" element={<Destination />} /> */}
          <Route path="/ex" element={<Exist />} />
          <Route path="/sr" element={<SearchResult />} />
          <Route path="/city/:id" element={<CityResults />} />

          <Route path="/accommodations" element={<HotelPage />}>
            <Route path=":accommodationID" element={<HotelPage />} />
          </Route>

          <Route path="/restaurants" element={<RestaurantPage />}>
            <Route path=":id" element={<RestaurantPage />} />
          </Route>

          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/restaurants/DateNight" element={<DateNightCategoryRestaurants />} />
          <Route path="/restaurants/Casual Dining" element={<CasualDiningCategoryRestaurants />} />
          <Route path="/restaurants/Fine Dining" element={<FineDiningCategoryRestaurants />} />
          <Route path="/restaurants/Outside" element={<OutsideCategoryRestaurants />} />
          <Route path="/restaurants/Vegan & Veg" element={<VeganAndVegCategoryRestaurants />} />

          <Route path="/pre-planned-trips" element={<PrePlannedTripsMainPage />}>
            <Route path=":id" element={<PrePlannedTripsMainPage />} />
          </Route>

          <Route path="/pre-planned-trip-booking/:tripId" element={<PrePlannedTripBookingForm />} />
          <Route path="/bookHotel/:id" element={<BookHotel />} />
          <Route path="/room" element={<HotelRoom />} />
          <Route path="/conhotelbook/:from/:to/:id/:hid/:available" element={<ConBookHotel />} />

          <Route path="/mybookings" element={<MyBookings />}>
            <Route path="available" element={<AvailableBookings />} />
            <Route path="cancelled" element={<CancledBookings />} />
            <Route path="completed" element={<CompletedBookings />} />
          </Route>


          <Route path="/guide/:id" element={<GuidPage/>} />


          <Route path="/review/restaurants/:id" element={<ReviewRestaurant />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
