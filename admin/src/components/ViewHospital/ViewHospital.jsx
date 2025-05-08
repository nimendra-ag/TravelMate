import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";

const ViewHospital = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const[hospitalDetails, setHospitalDetails] = useState({
        name: "",
        category: "",
        address: "",
        contactNumber: "",
        email: "",
        website: "",
        distanceFromNearestCity: "",
        nearestCity: "",
        description: "",
        // image: "",
    });

// Fetch hospital details when the component mounts
useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/travelmate/viewHospital/${id}`
        );

        if (response.data.success) {
          setHospitalDetails(response.data.data);
        //   setCardImage(response.data.data.cardImage);
        } else {
          alert(response.data.message || "Failed to fetch hospital details.");
        }
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/travelmate/updateHospital/${id}`,
        hospitalDetails
      );

      if (response.data.success) {
        alert("Hospital details updated successfully!");
        navigate("/hospital-data-table"); // Navigate back to the admin hospitals page
      } else {
        alert(response.data.message || "Failed to update hospital details.");
      }
    } catch (error) {
      console.error("Error updating hospital details:", error);
      alert("An error occurred while saving changes.");
    }
  };

  return (
<div style={{ marginTop: "250px" }}>
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
                Edit Hospital Details
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formHospitalName"
                        className="mb-3"
                      >
                        <Form.Label>Hospital Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Hospital Name"
                          name="name"
                          value={hospitalDetails.name}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formCategory" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Category"
                          name="category"
                          value={hospitalDetails.category}
                          onChange={handleChange}
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
                      <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Address"
                          name="address"
                          value={hospitalDetails.address}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formNearestCity" className="mb-3">
                        <Form.Label>Nearest City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nearest City"
                          name="nearestCity"
                          value={hospitalDetails.nearestCity}
                          onChange={handleChange}
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
                        controlId="formContactNumber"
                        className="mb-3"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Contact Number"
                          name="contactNumber"
                          value={hospitalDetails.contactNumber}
                          onChange={handleChange}
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
                        controlId="formEmail"
                        className="mb-3"
                      >
                        <Form.Label>e-mail</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="email"
                          name="email"
                          value={hospitalDetails.email}
                          onChange={handleChange}
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
                        controlId="formWebsite"
                        className="mb-3"
                      >
                        <Form.Label>Web site</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Website"
                          name="website"
                          value={hospitalDetails.website}
                          onChange={handleChange}
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
                        controlId="formDistanceFromMainCity"
                        className="mb-3"
                      >
                        <Form.Label>Distance from the Nearest City (KM)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Distance"
                          name="distance_from_city"
                          value={hospitalDetails.distanceFromNearestCity}
                          onChange={handleChange}
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
                          rows={10}
                          placeholder="Description"
                          name="description"
                          value={hospitalDetails.description}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md="12">
                      <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <div>
                          <img
                            src={cardImage || hospitalDetails.image}
                            alt="Hospital"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row> */}

                  <Button
                    variant="primary"
                    onClick={handleSaveChanges}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                  >
                    Save Changes
                  </Button>
                </Form>
              </Container>
            </div>
          </div>
        </div>
      </header>
    </div>  )
}

export default ViewHospital