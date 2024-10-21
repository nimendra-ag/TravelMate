import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom';
import HotelMainSection from '../../components/HotelMainSection/HotelMainSection';


const HotelPage = () => {
    const { allAccommodations } = useContext(ClientContext);
    const { accommodationID } = useParams();
    const accommodation = allAccommodations.find((e) => e.id === parseInt(accommodationID));
    return (
        <>
            {accommodation ? <>
            <HotelMainSection/>
            </>: <></>}
         
        </>
    )
}

export default HotelPage