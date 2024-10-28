import React, { useState } from "react";
import { InputGroup, Form, Col, Row, Container, Button } from "react-bootstrap";
import Select from "react-select";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTransportationService() {
  const [image, setImage] = useState(null);
  const [transportationServiceDetails, setTransportationServiceDetails] =
    useState({
      transportationServiceName: "",
      availableVehicles: [],
      pricePerHour: "",
      address: "",
      contactNumber: "",
      description: "",
    });

  const availableVehicleOptions = [
    { value: "Cars", label: "Cars" },
    { value: "Buses", label: "Buses" },
    { value: "Motorcycles", label: "Motorcycles" },
    { value: "Bicycles", label: "Bicycles" },
    { value: "Other", label: "Other" },
  ];

  const handleMultiSelectChange = (selectedOptions, action) => {
    setTransportationServiceDetails({
      ...transportationServiceDetails,
      [action.name]: selectedOptions.map((option) => option.value),
    });
  };

  // Handle file input for the image
  //   const imageHandler = (e) => {
  //     setImage(e.target.files[0]);
  //   };

  // Handle change in text fields
  const changeHandler = (e) => {
    setTransportationServiceDetails({
      ...transportationServiceDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted");

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-transportation-service",
        transportationServiceDetails
      );
      // console.log("Profile updated successfully", response.data);

      navigate("/");
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  return (
    <div className="AddTransportationService">
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
              <div className="d-flex justify-content-left align-items-left">
                <img
                  src={AdminLogo} // Update the logo path if needed
                  alt="Icon"
                  style={{ height: "98px", paddingBottom: "33px" }}
                />
              </div>
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add Transportation Service
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formTransportationServiceName"
                        className="mb-3"
                      >
                        <Form.Label>Transportation Service Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new transportation service"
                          name="transportationServiceName"
                          value={
                            transportationServiceDetails.transportationServiceName
                          }
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
                      <Form.Group
                        controlId="formAvailableVehicles"
                        className="mb-3"
                      >
                        <Form.Label>Available Vehicles</Form.Label>
                        <Select
                          isMulti
                          name="availableVehicles"
                          options={availableVehicleOptions}
                          value={availableVehicleOptions.filter((option) =>
                            transportationServiceDetails.availableVehicles.includes(
                              option.value
                            )
                          )}
                          onChange={handleMultiSelectChange}
                        />
                        {transportationServiceDetails.availableVehicles.includes(
                          "Other"
                        ) && (
                          <Form.Control
                            type="text"
                            placeholder="Enter other vehicles"
                            name="otherVehicles"
                            value={transportationServiceDetails.otherVehicles}
                            onChange={changeHandler}
                            className="mt-2"
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4} // Set fixed height using rows
                          placeholder="Enter the address"
                          name="address"
                          value={transportationServiceDetails.address}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none", // Prevent resizing
                            height: "100px", // Fixed height for the textarea
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group
                        controlId="formContactNumber"
                        className="mb-3"
                      >
                        <Form.Label>Contact Number</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Enter the contact number"
                          maxLength="10"
                          name="contactNumber"
                          value={transportationServiceDetails.contactNumber}
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
                      <Form.Group controlId="formPricePerHour" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            placeholder="Enter Price per Hour"
                            name="pricePerHour"
                            value={transportationServiceDetails.pricePerHour}
                            onChange={changeHandler}
                            style={{
                              borderRadius: "10px 0 0 10px",
                              height: "50px",
                              borderWidth: "2px",
                            }}
                          />
                          <InputGroup.Text
                            style={{
                              borderRadius: "0 10px 10px 0",
                              height: "50px",
                              borderWidth: "2px",
                            }}
                          >
                            $ per hour
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    {/* <Col md="6">
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
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
                    <Col md="12">
                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={10} // Set fixed height using rows
                          placeholder="Enter a brief description"
                          name="description"
                          value={transportationServiceDetails.description}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none", // Prevent resizing
                            height: "100px", // Fixed height for the textarea
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" onClick={handleSubmit}>
                    Add TransportationService
                  </Button>
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default AddTransportationService;
