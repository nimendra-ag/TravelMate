import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientContext'
import { useParams } from 'react-router-dom';
import RestaurantMainSection from '../../components/RestaurantMainSection/RestaurantMainSection.jsx';


const RestaurantPage = () => {
    const { allRestaurants } = useContext(ClientContext);
    const { id } = useParams();
    const restaurant = allRestaurants.find((e) => e.id === parseInt(id));
    return (
        <>
            {restaurant ? <>
            <RestaurantMainSection/>
            </>: <></>}
         
        </>
    )
}

export default RestaurantPage