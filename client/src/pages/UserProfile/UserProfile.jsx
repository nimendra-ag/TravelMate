import React, { useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    
    const fetchUser = async () => {
        try {
            const response = await axios.post("http://localhost:3000/travelmate/fetchUserinProfilePage", 
            {},
            {
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // useEffect(() => {
    //     console.log("User Profile called.");
    //     fetchUser();
    // }, []); // Runs once on component mount

    return (
        <>
            <div style={{ marginTop: "90px" }}>
                <div>
                    <img src="https://picsum.photos/200/200" className="mx-auto d-block" style={{ borderRadius: '100px' }} alt="Profile" />
                </div>
                <div className="container" style={{ marginTop: "50px", marginBottom:"200px", backgroundColor: 'rgba(13, 96, 171, 0.98)', padding: '20px', borderRadius: '8px' }}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Update Your Profile Picture</label>
                            <input className="form-control" type="file" id="formFile"/>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">City</label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputState" className="form-label">State</label>
                            <select id="inputState" className="form-select">
                                <option defaultValue>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputZip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="inputZip" />
                        </div>
                        
                        <div className="col-12">
                            <button type="submit" className="btn btn-danger">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
