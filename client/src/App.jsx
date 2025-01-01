import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'
import Destination from './pages/Destination/Destination'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetDetails from './pages/details/GetDetails'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Footer from './components/footer/Footer'
import Exist from './components/Exist'
import SearchResult from './components/searchResult/SearchResult'
import CityResults from './pages/cityResults/CityResults'
import AccomodationResult from './pages/accomodationResult/AccomodationResult'
import HotelPage from './pages/HotelPage/HotelPage'
import ActivitiesPage from './pages/activitiesPage/ActivitiesPage'
import RestaurantPage from './pages/restaurantPage/RestaurantPage'
import PrePlannedTripsMainPage from './pages/prePlannedTripsMainPage/PrePlannedTripsMainPage'
import BookHotel from './pages/bookHotel/BookHotel'
import HotelRoom from './pages/bookHotel/HotelRoom'
import ConBookHotel from './pages/bookHotel/ConBookHotel'
import MyBookings from './pages/bookHotel/MyBookings'



import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'
import Destination from './pages/Destination/Destination'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetDetails from './pages/details/GetDetails'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Footer from './components/footer/Footer'
import Exist from './components/Exist'
import SearchResult from './components/searchResult/SearchResult'
import CityResults from './pages/cityResults/CityResults'
import AccomodationResult from './pages/accomodationResult/AccomodationResult'
import HotelPage from './pages/HotelPage/HotelPage'
import ActivitiesPage from './pages/activitiesPage/ActivitiesPage'
import DateNightCategoryRestaurants from './pages/dateNightCategoryRestaurants/DateNightCategoryRestaurants'
import FineDiningCategoryRestaurants from './pages/fineDiningCategoryRestaurants/FineDiningCategoryRestaurants'
import OutsideCategoryRestaurants from './pages/outsideCategoryRestaurants/OutsideCategoryRestaurants'
import VeganAndVegCategoryRestaurants from './pages/veganAndVegCategoryRestaurants/VeganAndVegCategoryRestaurants'
import CasualDiningCategoryRestaurants from './pages/casualDiningCategoryRestaurants/CasualDiningCategoryRestaurants'
import RestaurantPage from './pages/restaurantPage/RestaurantPage'
import PrePlannedTripsMainPage from './pages/prePlannedTripsMainPage/PrePlannedTripsMainPage'
import BookHotel from './pages/bookHotel/BookHotel'
import HotelRoom from './pages/bookHotel/HotelRoom'
import ConBookHotel from './pages/bookHotel/ConBookHotel'
import MyBookings from './pages/bookHotel/MyBookings'
import ReviewRestaurant from './pages/reviewRestaurant/ReviewRestaurant'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/details/:id" element={<GetDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/destinations/:id" element={<Destination />} /> 
          <Route path="/ex" element={<Exist />} />
          <Route path="/sr" element={<SearchResult />} />
          <Route path="/city/:id" element={<CityResults />} />
          <Route path="/accommodation/:id" element={<HotelPage />} />
          <Route path="/details/:id" element={<GetDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/ex" element={<Exist />} />
          <Route path='/accommodations' element={<HotelPage />}>
          <Route path=':accommodationID' element={<HotelPage />} />
          </Route>
          <Route path='/restaurants' element={<RestaurantPage />}>
            <Route path=':id' element={<RestaurantPage />} />
          </Route>
          <Route path='/activities' element={<ActivitiesPage />} />
          <Route path='/restaurants/DateNight' element={<DateNightCategoryRestaurants />} />
          <Route path='/restaurants/Casual Dining' element={<CasualDiningCategoryRestaurants />} />
          <Route path='/restaurants/Fine Dining' element={<FineDiningCategoryRestaurants />} />
          <Route path='/restaurants/Outside' element={<OutsideCategoryRestaurants />} />
          <Route path='/restaurants/Vegan & Veg' element={<VeganAndVegCategoryRestaurants />} />
          <Route path='/pre-planned-trips' element={<PrePlannedTripsMainPage />}>
      <Route path=':id' element={<PrePlannedTripsMainPage />} />

      </Route>


      <Route path='/bookHotel/:id' element={<BookHotel />} />
      <Route path='/room' element={<HotelRoom />} />

      <Route path='/conhotelbook/:from/:to/:id/:hid' element={<ConBookHotel/>} />

      <Route path='/mybookings' element={<MyBookings/>} />


            <Route path=':id' element={<PrePlannedTripsMainPage />} />
          </Route>
          <Route path='/review/restaurants/:id' element={<ReviewRestaurant />} />
          </Routes>
        </Router>

     


    </>
  )
}

export default App
