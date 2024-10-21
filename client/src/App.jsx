import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'
import Destination from './pages/Destination/Destination'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetDetails from './pages/details/GetDetails'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/activities/Activities'
import Footer from './components/footer/Footer'
import Exist from './components/Exist'
import SearchResult from './components/searchResult/SearchResult'
import CityResults from './pages/cityResults/CityResults'
import AccomodationResult from './pages/accomodationResult/AccomodationResult'


function App() {



  return (
    <>

      <Router>
        <Routes>
          <Route path="/details/:id" element={<GetDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/ex" element={<Exist />} />
          <Route path="/sr" element={<SearchResult />} />
          <Route path="/city/:id" element={<CityResults />} />

          <Route path="/accommodation/:id" element={<AccomodationResult />} />





        </Routes>
      </Router>

    </>
  )
}

export default App
