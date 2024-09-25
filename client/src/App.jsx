import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import GetDetails from './pages/details/GetDetails'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/activities/Activities'


function App() {



  return (
    <>

      <Router>
        <Routes>
          <Route path="/details" element={<GetDetails/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/activities" element={<Activities/>} />


        </Routes>
      </Router>
     
    </>
  )
}

export default App
