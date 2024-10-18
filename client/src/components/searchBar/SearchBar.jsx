import axios from 'axios';
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const SearchBar = () => {
    



    const [cities, setCities] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    

    useEffect(() => {
        axios.get("http://localhost:3000/travelmate/getcities")
        
            .then((res) => {
                if (res.data.success) {
                    const cities = res.data.cities;
                    setCities(cities);
                }
            })
            .catch((err) => {
                console.log("Error is", err);
            });
    }, []);

    const filteredCities = cities.filter((city) => 
        city.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleClick = (cityId) => {





        navigate(`/city/${cityId}`)
        
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
                            placeholder="Search for a city..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </div>

            {/* Change to vertical direction flex */}
            <div className="d-flex flex-column align-items-center">
                {/* Only render results if search is not empty */}
                {search && filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                        <div 
                        key={city.id} // Ensure you have a unique key, `city.id` is assumed here
                        className="city-card my-3 mx-3 px-2 py-3 rounded-pill"
                        // Add click handler
                    >
                        <div className="d-flex" onClick={() => handleClick(city._id)}>
                            <div style={{ width: "30%" }} className="mx-3 my-auto">
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="rounded-pill"
                                    style={{ width: '100%', height: "100px" }}
                                />
                            </div>
                    
                            <div>
                                <h3>{city.name}</h3>
                                <p>{city.discription}</p> {/* Corrected spelling of 'description' */}
                            </div>
                        </div>
                    </div>
                    
                    ))
                ) : search && filteredCities.length === 0 ? (
                    <p>No results found</p> // Display message if no matches
                ) : null /* If search is empty, render nothing */}
            </div>
        </div>
    );
};

export default SearchBar;
