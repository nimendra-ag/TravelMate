import React from 'react'
import './Destination.css'
import DestinationComponent from '../../components/destinationComponent/DestinationComponent'
import PrePlannedTripsInLandingPage from '../../components/prePlannedTripsInLandingPage/PrePlannedTripsInLandingPage'
import HotelsInLandingPage from '../../components/HotelsInLandingPage/HotelsInLandingPage'


const Destination = () => {
  return (
    <div>
        <DestinationComponent/>
        <PrePlannedTripsInLandingPage/>
        <HotelsInLandingPage/>
    </div>
  )
}

export default Destination