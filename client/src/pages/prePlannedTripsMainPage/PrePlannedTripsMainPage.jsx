import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom';
import PrePlannedTripsInLandingPage from '../../components/prePlannedTripsInLandingPage/PrePlannedTripsInLandingPage.jsx';
import Footer from '../../components/footer/Footer.jsx'
import PrePlannedTripsMainSection from '../../components/prePlannedTripsMainSection/PrePlannedTripsMainSection.jsx';

const PrePlannedTripsMainPage = () => {
    const { allPrePlannedTrips } = useContext(ClientContext);
    const { id } = useParams();
    const prePlannedTrip = allPrePlannedTrips.find((e) => e.id === parseInt(id));
    console.log(prePlannedTrip)
  return (
<>
            {prePlannedTrip ? <>
            <PrePlannedTripsMainSection
            name = {prePlannedTrip.name}
            mainDestinations={prePlannedTrip.mainDestinations}
            guides={prePlannedTrip.guides}
            price={prePlannedTrip.price}
            duration={prePlannedTrip.duration}
            noOfTravelers={prePlannedTrip.noOfTravelers}
            startTime={prePlannedTrip.startTime}
            startLocation={prePlannedTrip.startLocation}
            endTime={prePlannedTrip.endTime}
            endLocation={prePlannedTrip.endLocation}
            description={prePlannedTrip.description}
            availableDates={prePlannedTrip.availableDates}
            contactNumber={prePlannedTrip.contactNumber}
            rating={prePlannedTrip.rating}

            />
            <PrePlannedTripsInLandingPage/>
            <Footer/>
            </>: <></>}
         
        </>  )
}

export default PrePlannedTripsMainPage