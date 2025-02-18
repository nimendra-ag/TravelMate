import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {

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
    <AdminContext.Provider value={contextValue}>
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;