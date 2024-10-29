import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom';
import HotelMainSection from '../../components/HotelMainSection/HotelMainSection';


const HotelPage = () => {
    const { allAccomodations } = useContext(ClientContext);
    const { accomodationID } = useParams();
    const accomodation = allAccomodations.find((e) => e.id === parseInt(accomodationID));
    return (
        <>
            {accomodation ? <>
            <HotelMainSection/>
            </>: <></>}
         
        </>
    )
}

export default HotelPage