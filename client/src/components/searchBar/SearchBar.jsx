import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const SearchBar = () => {




    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate



    useEffect(() => {
        axios.get("http://localhost:3000/travelmate/getdata")

            .then((res) => {
                if (res.data.success) {
                    const cities = res.data.cities;

                    const acc = res.data.accommodations;



                    setData([...cities, ...acc]);
                    console.log([...cities, ...acc]); // Log the new data right after setting


                }
            })
            .catch((err) => {
                console.log("Error is", err);
            });
    }, []);

    // const filteredData = data.filter((data) =>
    //     data.name.toLowerCase().includes(search.toLowerCase())
    // );


    const filteredData = data.filter((data) =>
        data.name && data.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleClick = (dataId, type) => {


        console.log(dataId);
        console.log(type);

        if (type === "city") {
            navigate(`/city/${dataId}`)
        }
        else if (type === "accommodation") {
            navigate(`/accommodation/${dataId}`)
        }

     

        // Navigate to the next page with cityId in URL
    };



    return (
        <div className="container">
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
            <div className="d-flex flex-column align-items-center">
                {/* Only render results if search is not empty */}
                {search && filteredData.length > 0 ? (
                    filteredData.map((data) => (
                        <div
                            key={data.id} // Ensure you have a unique key, `city.id` is assumed here
                            className="city-card  rounded-pill"
                        // Add click handler
                        >
                            <div style={{ display: "flex" }} onClick={() => handleClick(data._id, data.type)}>
                                <div style={{ width: "30%" }} >

                                </div>

                                <div style={{ display: "flex" }}>

                                    <p style={{ margin: 0 }}>{data.name}</p>
                                    <span style={{ margin: '0 5px' }}>—</span>
                                    <p style={{ margin: 0 }}>{data.minidescription}</p>
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
