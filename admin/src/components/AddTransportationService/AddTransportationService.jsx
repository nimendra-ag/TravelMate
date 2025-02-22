import React, { useState } from "react";
import { InputGroup, Form, Col, Row, Container, Button } from "react-bootstrap";
import Select from "react-select";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTransportationService() {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [transportationServiceDetails, setTransportationServiceDetails] = useState({
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

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!transportationServiceDetails.transportationServiceName.trim()) {
      tempErrors.transportationServiceName = "Service name is required";
      isValid = false;
    }

    if (transportationServiceDetails.availableVehicles.length === 0) {
      tempErrors.availableVehicles = "Please select at least one vehicle type";
      isValid = false;
    }

    if (!transportationServiceDetails.pricePerHour) {
      tempErrors.pricePerHour = "Price per hour is required";
      isValid = false;
    } else if (isNaN(transportationServiceDetails.pricePerHour) || transportationServiceDetails.pricePerHour <= 0) {
      tempErrors.pricePerHour = "Please enter a valid price";
      isValid = false;
    }

    if (!transportationServiceDetails.address.trim()) {
      tempErrors.address = "Address is required";
      isValid = false;
    }

    if (!transportationServiceDetails.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(transportationServiceDetails.contactNumber)) {
      tempErrors.contactNumber = "Contact number must be 10 digits";
      isValid = false;
    }

    if (!transportationServiceDetails.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleMultiSelectChange = (selectedOptions, action) => {
    setTransportationServiceDetails({
      ...transportationServiceDetails,
      [action.name]: selectedOptions.map((option) => option.value),
    });
    if (errors.availableVehicles) {
      setErrors({
        ...errors,
        availableVehicles: "",
      });
    }
  };

  const changeHandler = (e) => {
    setTransportationServiceDetails({
      ...transportationServiceDetails,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-transportation-service",
        transportationServiceDetails
      );

      if (response.data.success) {
        alert("Transportation service added successfully!");
        setTransportationServiceDetails({
          transportationServiceName: "",
          availableVehicles: [],
          pricePerHour: "",
          address: "",
          contactNumber: "",
          description: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("Error adding transportation service", error);
    }
  };
  return (
    <div className="AddTransportationService">
      <header>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="d-flex justify-content-center align-items-center" style={{ width: "100%" }}>
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              maxWidth: "1200px",
              width: "100%",
            }}>
              <div className="d-flex justify-content-left align-items-left">
                <img
                  src={AdminLogo}
                  alt="Icon"
                  style={{ height: "98px", paddingBottom: "33px" }}
                />
              </div>
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add Transportation Service
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formTransportationServiceName" className="mb-3">
                        <Form.Label>Transportation Service Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new transportation service"
                          name="transportationServiceName"
                          value={transportationServiceDetails.transportationServiceName}
                          onChange={changeHandler}
                          isInvalid={!!errors.transportationServiceName}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.transportationServiceName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formAvailableVehicles" className="mb-3">
                        <Form.Label>Available Vehicles</Form.Label>
                        <Select
                          isMulti
                          name="availableVehicles"
                          options={availableVehicleOptions}
                          value={availableVehicleOptions.filter((option) =>
                            transportationServiceDetails.availableVehicles.includes(option.value)
                          )}
                          onChange={handleMultiSelectChange}
                          className={errors.availableVehicles ? 'is-invalid' : ''}
                        />
                        {errors.availableVehicles && (
                          <div className="invalid-feedback d-block">{errors.availableVehicles}</div>
                        )}
                        {transportationServiceDetails.availableVehicles.includes("Other") && (
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
                          rows={4}
                          placeholder="Enter the address"
                          name="address"
                          value={transportationServiceDetails.address}
                          onChange={changeHandler}
                          isInvalid={!!errors.address}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                            height: "100px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formContactNumber" className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the contact number"
                          maxLength="10"
                          name="contactNumber"
                          value={transportationServiceDetails.contactNumber}
                          onChange={changeHandler}
                          isInvalid={!!errors.contactNumber}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.contactNumber}
                        </Form.Control.Feedback>
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
                            isInvalid={!!errors.pricePerHour}
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
                          <Form.Control.Feedback type="invalid">
                            {errors.pricePerHour}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={10}
                          placeholder="Enter a brief description"
                          name="description"
                          value={transportationServiceDetails.description}
                          onChange={changeHandler}
                          isInvalid={!!errors.description}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                            height: "100px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit">
                    Add Transportation Service
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
