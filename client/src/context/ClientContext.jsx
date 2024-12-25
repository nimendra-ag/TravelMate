import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ClientContext = createContext(null);

const ClientContextProvider = (props) => {
    const [allAccommodations, setAllAccommodations] = useState([]);
    const [allTravelMateFeedback, setAllTravelMateFeedback] = useState([]);
    const [allGuides, setAllGuides] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [allPrePlannedTrips, setAllPrePlannedTrips] = useState([]);



    useEffect(() => {
        // Fetch accommodations data
        axios.get('http://localhost:3000/travelmate/allAccomodations')
            .then((response) => {
                console.log('Accommodations:', response.data);
                setAllAccommodations(response.data);
            })
            .catch((error) => {
                console.log('Accommodations fetch error:', error);
            });

        // Fetch travel mate feedback data
        axios.get('http://localhost:3000/travelmate/gettravelmatefeedback')
            .then((response) => {
                console.log('Feedback:', response.data);
                setAllTravelMateFeedback(response.data);
            })
            .catch((error) => {
                console.log('Feedback fetch error:', error);
            });
        
        // Fetch guides data
        axios.get('http://localhost:3000/travelmate/allGuides')
            .then((response) => {
                console.log('Guides:', response.data);
                setAllGuides(response.data);
            })
            .catch((error) => {
                console.log('Feedback fetch error:', error);
            });
        
            //Fetch restaurants data
            axios.get('http://localhost:3000/travelmate/allRestaurants')
            .then((response) => {
                console.log('Restaurants:', response.data);
                setAllRestaurants(response.data);
            })
            .catch((error) => {
                console.log('Feedback fetch error:', error);
            });
        //Fetch pre planned trips data
        axios.get('http://localhost:3000/travelmate/allPrePlannedTrips')
        .then((response) => {
            console.log('PrePlannedTrips:', response.data);
            setAllPrePlannedTrips(response.data);
        })
        .catch((error) => {
            console.log('Feedback fetch error:', error);
        });
            
        
    }, []);

    // Add both data to the context value
    const contextValue = {
        allAccommodations,
        allTravelMateFeedback,
        allGuides,
        allRestaurants,
        allPrePlannedTrips,
    };

    return (
        <ClientContext.Provider value={contextValue}>
            {props.children}
        </ClientContext.Provider>
    );
}

export default ClientContextProvider;
