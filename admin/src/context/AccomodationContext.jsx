import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const AccomodationContext = createContext(null);

const AccomodationContextProvider = (props) => {

    const [allAccomodations, setAllAccomodations] = useState([]);

    useEffect (() => {
            axios.get('http://localhost:3000/travelmate/allAccomodations')
            .then((response) => {
                console.log('response.data', response.data);
                setAllAccomodations(response.data);
            })
            .catch((error) => {
                console.log('error', error);
            })
    }, []);

const contextValue = { allAccomodations };

return (
    <AccomodationContext.Provider value={contextValue}>
        {props.children}
    </AccomodationContext.Provider>
  )
}

export default AccomodationContextProvider;