import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const AddPrePlannedTrips = () => {
  const [prePlannedTripDetails, setPrePlannedTripDetails] = useState({
    name: "",
    mainDestinations: [""],
    guides: [""],
    price: "",
    duration: "",
    noOfTravelers: "",
    startTime: "",
    startLocation: "",
    endTime: "",
    endLocation: "",
    description: "",
    availableDates: "",
    contactNumber: "",
  });

  // Handle single input field change
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPrePlannedTripDetails({ ...prePlannedTripDetails, [name]: value });
  };

  // Handle array input change for guides and mainDestinations
  const handleArrayChange = (index, e, field) => {
    const { value } = e.target;
    const list = [...prePlannedTripDetails[field]];
    list[index] = value;
    setPrePlannedTripDetails({ ...prePlannedTripDetails, [field]: list });
  };

  // Add a new field for guides or mainDestinations
  const addArrayField = (field) => {
    setPrePlannedTripDetails({
      ...prePlannedTripDetails,
      [field]: [...prePlannedTripDetails[field], ""],
    });
  };

  // Remove a field from guides or mainDestinations
  const removeArrayField = (index, field) => {
    const list = [...prePlannedTripDetails[field]];
    list.splice(index, 1);
    setPrePlannedTripDetails({ ...prePlannedTripDetails, [field]: list });
  };

  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", prePlannedTripDetails);

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/addPrePlannedTrips",
        prePlannedTripDetails
      );
      console.log("Trip added successfully", response.data);

      // Show success message
      setSuccessMessage("Form submitted successfully!");

      // Clear the form fields
      setPrePlannedTripDetails({
        name: "",
        mainDestinations: "",
        guides: "",
        price: "",
        duration: "",
        noOfTravelers: "",
        startTime: "",
        startLocation: "",
        endTime: "",
        endLocation: "",
        description: "",
        availableDates: "",
        contactNumber: "",
      });

      // Optionally refresh the page after 2 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 2 seconds
        navigate("/"); // Redirect or refresh the page
      }, 2000);
    } catch (error) {
      console.log("Error adding trip", error);
    }
  };

  return (
    <div className="AddPrePlannedTrips" style={{ marginTop: "330px" }}>
      <header>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%" }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "1200px",
                width: "100%",
              }}
            >
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add Pre-planned Trip
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formTripName" className="mb-3">
                        <Form.Label>Trip Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the trip name"
                          name="name"
                          value={prePlannedTripDetails.name}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formPrice" className="mb-3">
                        <Form.Label>Price per person ($)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter the price"
                          name="price"
                          value={prePlannedTripDetails.price}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formNoOfTravelers"
                        className="mb-3"
                      >
                        <Form.Label>No. of travelers</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter the no of maximum travelers"
                          name="noOfTravelers"
                          value={prePlannedTripDetails.noOfTravelers}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formDuration" className="mb-3">
                        <Form.Label>Duration (No. of days)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter the trip duration"
                          name="duration"
                          value={prePlannedTripDetails.duration}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    {/* <Col md="6">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Photo</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={imageHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col> */}
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formStartLocation"
                        className="mb-3"
                      >
                        <Form.Label>Start Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter start location"
                          name="startLocation"
                          value={prePlannedTripDetails.startLocation}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formStartTime" className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="startTime"
                          value={prePlannedTripDetails.startTime}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formEndLocation" className="mb-3">
                        <Form.Label>End Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter end location"
                          name="endLocation"
                          value={prePlannedTripDetails.endLocation}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formEndTime" className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="endTime"
                          value={prePlannedTripDetails.endTime}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formAvailableDates"
                        className="mb-3"
                      >
                        <Form.Label>Available days</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Eg: Every Saturday"
                          name="availableDates"
                          value={prePlannedTripDetails.availableDates}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter trip description"
                          name="description"
                          value={prePlannedTripDetails.description}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formContactNumber"
                        className="mb-3"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter contact number"
                          name="contactNumber"
                          value={prePlannedTripDetails.contactNumber}
                          onChange={changeHandler}
                          maxLength="10"
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Guides Input Fields */}
                  <Row>
                    <Col md="12">
                      <Form.Label>Guides</Form.Label>
                      {prePlannedTripDetails.guides.map((guide, index) => (
                        <Row key={index} className="mb-2">
                          <Col md="10">
                            <Form.Control
                              type="text"
                              placeholder={`Enter guide ${index + 1}`}
                              value={guide}
                              onChange={(e) =>
                                handleArrayChange(index, e, "guides")
                              }
                            />
                          </Col>
                          <Col md="2">
                            <Button
                              variant="danger"
                              onClick={() => removeArrayField(index, "guides")}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        variant="secondary"
                        onClick={() => addArrayField("guides")}
                      >
                        Add Guide
                      </Button>
                    </Col>
                  </Row>

                  {/* Main Destinations Input Fields */}
                  <Row className="mt-4">
                    <Col md="12">
                      <Form.Label>Main Destinations</Form.Label>
                      {prePlannedTripDetails.mainDestinations.map(
                        (destination, index) => (
                          <Row key={index} className="mb-2">
                            <Col md="10">
                              <Form.Control
                                type="text"
                                placeholder={`Enter destination ${index + 1}`}
                                value={destination}
                                onChange={(e) =>
                                  handleArrayChange(
                                    index,
                                    e,
                                    "mainDestinations"
                                  )
                                }
                              />
                            </Col>
                            <Col md="2">
                              <Button
                                variant="danger"
                                onClick={() =>
                                  removeArrayField(index, "mainDestinations")
                                }
                              >
                                Remove
                              </Button>
                            </Col>
                          </Row>
                        )
                      )}
                      <Button
                        variant="secondary"
                        onClick={() => addArrayField("mainDestinations")}
                      >
                        Add Destination
                      </Button>
                    </Col>
                  </Row>

                  {successMessage && (
                    <div style={{ color: "green", marginTop: "20px" }}>
                      {successMessage}
                    </div>
                  )}
                  <Button variant="primary" onClick={handleSubmit}>
                    Add Trip
                  </Button>
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AddPrePlannedTrips;
