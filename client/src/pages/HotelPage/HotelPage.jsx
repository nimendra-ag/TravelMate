import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom';
import HotelMainSection from '../../components/HotelMainSection/HotelMainSection';
import DisplayHotelReviews from '../../components/displayHotelReviews/DisplayHotelReviews';


const HotelPage = () => {
    const { allAccommodations } = useContext(ClientContext);
    const { accommodationID } = useParams();
    const accommodation = allAccommodations.find((e) => e.id === parseInt(accommodationID));
    return (
        <>
            {accommodation ? <>
            <HotelMainSection
            
                name = {accommodation.name}
                description = {accommodation.description}
                distance_from_city = {accommodation.distance_from_city}
                id = {accommodationID}
            />
             <DisplayHotelReviews
                    id={accommodationID}
                />
            </>: <></>}
         
        </>
    )
}

export default HotelPage