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


function App() {



  return (
    <>

      <Router>
        <Routes>
        <Route path="/details" element={<GetDetails/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/activities" element={<Activities/>} />
          <Route path="/footer" element={<Footer/>} />
          <Route path="/destination" element={<Destination/>} />


        </Routes>
      </Router>
     
    </>
  )
}

export default App
