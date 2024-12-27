import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ClientContext } from '../../context/ClientContext';


const SearchBar = () => {




    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const {allDetails} = useContext(ClientContext);


   
    
    useEffect(() => {
        if (allDetails) {
            const acc = allDetails.accommodations || [];
            const des = allDetails.destinations || [];
            const guids = allDetails.guids || [];
            const cities = allDetails.cities || [];
            setData([...cities, ...acc, ...des, ...guids]);
            // console.log([...cities, ...acc]);
        }
    }, [allDetails]);
    



                    



    

    // useEffect(() => {
    //     axios.get("http://localhost:3000/travelmate/getdata")

    //         .then((res) => {
    //             if (res.data.success) {
    //                 const cities = res.data.cities;

    

    //             }
    //         })
    //         .catch((err) => {
    //             console.log("Error is", err);
    //         });
    // }, []);




    // const filteredData = data.filter((data) =>
    //     data.name.toLowerCase().includes(search.toLowerCase())
    // );


    const filteredData = data
    .filter((data) => data.name && data.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 6); // This limits the results to 6 items

    const handleClick = (dataId, type) => {


        // console.log(dataId);
        // console.log(type);

        if (type === "city") {
            navigate(`/city/${dataId}`)
        }
        else if (type === "accommodation") {
            navigate(`/accommodations/${dataId}`)
        }
        else if (type === "Destinations") {
            navigate(`/destinations/${dataId}`)
        }



    };



    return (
        <div >
            <div className="d-flex justify-content-center mt-5">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            style={{ borderRadius: '50px', marginBottom: "25px", width: "700px", height: "50px", borderWidth: "2px" }}
                            placeholder="Search for a anything..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </div>

            {/* Change to vertical direction flex */}
            <div className=" flex-column">
                {/* Only render results if search is not empty */}
                {search && filteredData.length > 0 ? (
                    filteredData.map((data) => (
                        <div
                            key={data.id} // Ensure you have a unique key, `city.id` is assumed here
                            className="city-card  rounded-pill"
                        // Add click handler
                        >
                            <div className="m-2" style={{ display: "flex" }} onClick={() => handleClick(data.id, data.type)}>
                                <div style={{ width: "100%" }} >

                                

                                <div className="d-flex p-2 " >
                                    <p style={{ margin: 0 }}>{data.name}</p>
                                    <span style={{ margin: '0 5px' }}>—</span>
                                    <p style={{ margin: 0 }}>{data.minidescription}</p>
                                </div>
                                </div>
                               
                            </div>
                        </div>

                    ))
                ) : search && filteredData.length === 0 ? (
                    <p>No results found</p> // Display message if no matches
                ) : null /* If search is empty, render nothing */}
            </div>
        </div>
    );
};

export default SearchBar;
