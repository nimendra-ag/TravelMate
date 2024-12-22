import React, { useContext } from 'react'
import RestaurantCategoryPageHeader from '../../components/restaurantCategoryPageHeader/RestaurantCategoryPageHeader'
import { ClientContext } from '../../context/ClientContext'
import TopRatedRestaurant from '../../components/topRatedRestaurant/TopRatedRestaurant';

const VeganAndVegCategoryRestaurants = () => {
    const {allRestaurants} = useContext(ClientContext);

    return (
        <>
            <RestaurantCategoryPageHeader
            category={"Vegan & Veg"}
            headerText={"From farm-fresh ingredients to creative plant-based dishes, these restaurants are a haven for those seeking healthy, sustainable, and delicious dining options."}
            />
            <TopRatedRestaurant/>

            {allRestaurants.map((restaurant) => (
                <div key={restaurant.id}>
                    <h2>{restaurant.restaurantName}</h2>
                </div>
            ))}
        </>
    )
}

export default VeganAndVegCategoryRestaurants