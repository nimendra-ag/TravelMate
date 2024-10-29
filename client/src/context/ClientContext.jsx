import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const ClientContext = createContext(null);

const ClientContextProvider = (props) => {

    const [allAccomodations, setAllAccomodations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/travelmate/allAccomodations')
        .then((response) => {
            console.log('response.data', response.data);
            setAllAccomodations(response.data);
        })
        .catch((error) => {
            console.log('error', error);
        })
    }, []);

const contextValue = {allAccomodations};

  return (
    <ClientContext.Provider value={contextValue}>
        {props.children}
    </ClientContext.Provider>
  )
}

export default ClientContextProvider;