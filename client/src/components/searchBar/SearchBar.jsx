import React from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center mt-5">
                <Form >
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            // placeholder="Search Here"
                            style={{ borderRadius: '50px', marginBottom: "25px", width: "700px", height: "50px", borderWidth: "2px" }}
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default SearchBar;
