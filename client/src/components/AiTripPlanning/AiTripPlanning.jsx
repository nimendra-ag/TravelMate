import React from 'react'
import './AiTripPlanning.css'
import TripPlanning_Img from '../../assets/AiTripPlanning.png'

const AiTripPlanning = () => {
  return (
    <div className='tripPlanning'>
        <div className="tripPlanning-left">
            <p>Powerd by AI</p>
            <h1>Plan Your Perfect 
            Trip with AI </h1>
           <h2>Get personalized travel</h2>
           <h2>itineraries in minutes, </h2>
           <h2>crafted by AI with real</h2>
           <h2>traveler insights.</h2>
            <button> Plan a Trip with AI</button>
        </div>
        <div className="tripPlanning-right">
            <img src={TripPlanning_Img} alt="" />
        </div>
    </div>

  )
}

export default AiTripPlanning