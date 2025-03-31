import React, { useState } from 'react';
import axios from "axios";
import Select from "react-select";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddHospital = () => {
  const navigate = useNavigate();
  
  const [hospitalDetails, setHospitalDetails] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "",
    website: "",
    category: "",
    nearestCity: "",
    distanceFromNearestCity: "",
  });
  
  const [errors, setErrors] = useState({});

  const categoryOptions = [
    { value: "General Hospitals", label: "General Hospitals" },
    { value: "Teaching/University Hospitals", label: "Teaching/University Hospitals" },
    { value: "Government Hospitals", label: "Government Hospitals" },
    { value: "Private Hospitals", label: "Private Hospitals" },
  ];

  // Handle change in text fields
  const changeHandler = (e) => {
    setHospitalDetails({
      ...hospitalDetails,
      [e.target.name]: e.target.value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Check required fields (excluding email and website)
    if (!hospitalDetails.name.trim()) newErrors.name = "Hospital name is required";
    if (!hospitalDetails.address.trim()) newErrors.address = "Address is required";
    if (!hospitalDetails.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (!hospitalDetails.category) newErrors.category = "Category is required";
    if (!hospitalDetails.nearestCity.trim()) newErrors.nearestCity = "Nearest city is required";
    if (!hospitalDetails.distanceFromNearestCity.trim()) newErrors.distanceFromNearestCity = "Distance is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    
    console.log("Form submitted");

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-hospital",
        hospitalDetails
      );
      console.log("Hospital added successfully", response.data);

      if (response.data.success) {
        alert("Hospital added successfully!");
        setHospitalDetails({
          name: "",
          address: "",
          contactNumber: "",
          email: "",
          website: "",
          category: "",
          nearestCity: "",
          distanceFromNearestCity: "",
        });
        
        window.location.reload(); //Reload the page
      }
    } catch (error) {
      console.log("Error adding hospital", error);
    }
  };

  return (
    <div className="AddHospital" style={{marginTop:'200px'}}>
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
                  src={AdminLogo}
                  alt="Icon"
                  style={{ height: "98px", paddingBottom: "33px" }}
                />
              </div>
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add Hospital
              </h2>
              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Hospital Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new hospital"
                          name="name"
                          value={hospitalDetails.name}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            borderColor: errors.name ? "red" : "",
                          }}
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the hospital address"
                          name="address"
                          value={hospitalDetails.address}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            borderColor: errors.address ? "red" : "",
                          }}
                          isInvalid={!!errors.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.address}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the e-mail address"
                          name="email"
                          value={hospitalDetails.email}
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
                      <Form.Group controlId="formWebsite" className="mb-3">
                        <Form.Label>Website URL</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter website URL"
                          name="website"
                          value={hospitalDetails.website}
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
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formCategory" className="mb-3">
                        <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                        <Select
                          name="category"
                          options={categoryOptions}
                          value={categoryOptions.find(
                            (option) =>
                              option.value === hospitalDetails.category
                          )}
                          onChange={(selectedOption) => {
                            setHospitalDetails({
                              ...hospitalDetails,
                              category: selectedOption ? selectedOption.value : "",
                            });
                            if (errors.category) {
                              setErrors({
                                ...errors,
                                category: null
                              });
                            }
                          }}
                          isClearable
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              borderColor: errors.category ? 'red' : provided.borderColor,
                              boxShadow: errors.category ? '0 0 0 1px red' : provided.boxShadow,
                            }),
                          }}
                        />
                        {errors.category && (
                          <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>
                            {errors.category}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group
                        controlId="formDistanceFromNearestCity"
                        className="mb-3"
                      >
                        <Form.Label>Distance from Nearest City <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter in kms"
                          name="distanceFromNearestCity"
                          value={hospitalDetails.distanceFromNearestCity}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            borderColor: errors.distanceFromNearestCity ? "red" : "",
                          }}
                          isInvalid={!!errors.distanceFromNearestCity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.distanceFromNearestCity}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formContactNumber" className="mb-3">
                        <Form.Label>Contact Number <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the contact number"
                          maxLength="10"
                          name="contactNumber"
                          value={hospitalDetails.contactNumber}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            borderColor: errors.contactNumber ? "red" : "",
                          }}
                          isInvalid={!!errors.contactNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.contactNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formNearestcity" className="mb-3">
                        <Form.Label>Nearest City <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the nearest City"
                          name="nearestCity"
                          value={hospitalDetails.nearestCity}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            borderColor: errors.nearestCity ? "red" : "",
                          }}
                          isInvalid={!!errors.nearestCity}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nearestCity}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  </Row>
                  <div className="mt-3">
                    <p className="text-muted mb-3"><span className="text-danger">*</span> Required fields</p>
                    <Button variant="primary" onClick={handleSubmit}>
                      Add Hospital
                    </Button>
                  </div>
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AddHospital;
