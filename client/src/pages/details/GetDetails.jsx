import React, { useState } from 'react'
import { Form, Row, Col, Container } from 'react-bootstrap';
import logo from "../../assets/TravalMateLogo2.png"
import "../details/GetDetails.css"



const GetDetails = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [mobileNo, setMobileNo] = useState();
    const [bday, setBday] = useState();
    const [gender, setGender] = useState();
    const [profilePic, setProfilePic] = useState();









    return (
        <header>

            <div className="d-flex justify-content-center align-items-center vh-100">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: '100%' }} // Ensure the inner div takes full width
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            padding: '30px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            maxWidth: '1200px', // Increase the maxWidth as needed
                            width: '100%' // Ensure the div takes full width up to the maxWidth
                        }}
                    >
                        <div className="d-flex justify-content-left align-items-left">
                            <img
                                src={logo}
                                alt="Icon"
                                style={{ height: '98px', paddingBottom: '33px' }}
                            />
                        </div>
                        <h2 className='fw-bold' style={{ paddingBottom: '25px' }}>Hello, adventurer!</h2>

                        <Container style={{ maxWidth: '100%' }}>
                            <Form>
                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formFirstName" className="mb-3">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter First Name"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md="6">
                                        <Form.Group controlId="formLastName" className="mb-3">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Last Name"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formCountry" className="mb-3">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Country"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md="6">
                                        <Form.Group controlId="formState" className="mb-3">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter State"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formMobileNo" className="mb-3">
                                            <Form.Label>Mobile No</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter Mobile Number"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={mobileNo}
                                                onChange={(e) => setMobileNo(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md="6">
                                        <Form.Group controlId="formBday" className="mb-3">
                                            <Form.Label>Birthday</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="Enter Birthday"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={bday}
                                                onChange={(e) => setBday(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md="6">
                                        <Form.Group controlId="formMobileNo" className="mb-3">
                                            <Form.Label>Profile Picture</Form.Label>
                                            <Form.Control
                                                type="file"
                                                placeholder="Select your Profile Picture"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={profilePic}
                                                onChange={(e) => setProfilePic(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md="6">
                                        <Form.Group controlId="formGender" className="mb-3">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control
                                                as="select"
                                                placeholder="Select Gender"
                                                style={{
                                                    borderRadius: '10px',
                                                    height: '50px',
                                                    borderWidth: '2px',
                                                }}
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Form.Control>
                                        </Form.Group>

                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>

        </header>



    )
}

export default GetDetails