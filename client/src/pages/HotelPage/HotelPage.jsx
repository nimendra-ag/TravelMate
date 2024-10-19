import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom';


const HotelPage = () => {
    const { allAccomodations } = useContext(ClientContext);
    const { accomodationID } = useParams();
    const accomodation = allAccomodations.find((accomodation) => accomodation.id === parseInt(accomodationID));
    return (
        <>
            HotelPage
            {accomodation.id}
            <br />
            {accomodation.address}
            <br />
            {accomodation.description}
        </>
    )
}

export default HotelPage