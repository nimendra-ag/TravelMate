import React, { useContext } from 'react'
import './Destination.css'
import DestinationComponent from '../../components/destinationComponent/DestinationComponent'
import PrePlannedTripsInLandingPage from '../../components/prePlannedTripsInLandingPage/PrePlannedTripsInLandingPage'
import HotelsInLandingPage from '../../components/HotelsInLandingPage/HotelsInLandingPage'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom'


const Destination = () => {
  const {allDestinations} = useContext(ClientContext);
  const {id} = useParams();
  console.log(id);
  const destination = allDestinations.find((e) => e.id === parseInt(id));
  return (
    <>
    {destination ? <>
      <div>
        <DestinationComponent
        id={id}
        name={destination.name}
        description={destination.description}
        image1={destination.mainImages[0]}
        image2={destination.mainImages[1]}
        image3={destination.mainImages[2]}
        image4={destination.mainImages[3]}
        image5={destination.mainImages[0]}
        city={destination.city}
        category={destination.category[0]}
        bestTimeToVisit={destination.bestTimeToVisit}
        website={destination.website}
        distanceFromColombo={destination.distanceFromColombo}
        />
        <PrePlannedTripsInLandingPage/>
        <HotelsInLandingPage/>
      </div>
    </> : <></>}
    </>
    
  )
}

export default Destination