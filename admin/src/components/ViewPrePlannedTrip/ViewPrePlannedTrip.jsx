import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";

const ViewPrePlannedTrip = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState(null);
    const [prePlannedTripDetails, setPrePlannedTripDetails] = useState({
        name: "",
        mainDestinations: "",
        guides: "",
        mainActivities: "",
        price: "",
        duration: "",
        startTime: "",
        startLocation: "",
        endTime: "",
        endLocation: "",
        description: "",
        availableDates: "",
        contactNumber: "",
        whatsExpected: "",
        whatsIncluded: "",
        additionalInfo: "",
        cancellationPolicy: "",
        help: "",
        activityImages: "",
        mainImage: "",


    });

     // Fetch trip details when the component mounts
      useEffect(() => {
        const fetchPrePlannedTripDetails = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/travelmate/viewPrePlannedTrip/${id}`
            );
    
            if (response.data.success) {
              setPrePlannedTripDetails(response.data.data);
              setMainImage(response.data.data.cardImage);
            } else {
              alert(response.data.message || "Failed to fetch trip details.");
            }
          } catch (error) {
            console.error("Error fetching trip details:", error);
          }
        };
    
        fetchPrePlannedTripDetails();
      }, [id]);

      // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrePlannedTripDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/travelmate/updatePrePlannedTrip/${id}`,
        prePlannedTripDetails
      );

      if (response.data.success) {
        alert("Trip details updated successfully!");
        navigate("/pre-planned-trip-data-table"); // Navigate back to the admin prePlannedTrips page
      } else {
        alert(response.data.message || "Failed to update trip details.");
      }
    } catch (error) {
      console.error("Error updating trip details:", error);
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
              Edit Trip Details
            </h2>
            <Container style={{ maxWidth: "100%" }}>
              <Form>
                <Row>
                  <Col md="6">
                    <Form.Group
                      controlId="formTripName"
                      className="mb-3"
                    >
                      <Form.Label>Trip Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Trip Name"
                        name="name"
                        value={prePlannedTripDetails.name}
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
                    <Form.Group controlId="formPrice" className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={prePlannedTripDetails.price}
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
                    <Form.Group controlId="formDuration" className="mb-3">
                      <Form.Label>Duration (days)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Duration"
                        name="duration"
                        value={prePlannedTripDetails.duration}
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
                        value={prePlannedTripDetails.contactNumber}
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
                    <Form.Group
                      controlId="formNoOfTravelers"
                      className="mb-3"
                    >
                      <Form.Label>Number of Travelers</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Number of Travelers"
                        name="noOfTravelers"
                        value={prePlannedTripDetails.noOfTravelers}
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
                    <Form.Group controlId="formRating" className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Rating"
                        name="rating"
                        value={prePlannedTripDetails.rating}
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
                    <Form.Group controlId="formStartTime" className="mb-3">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Start Time"
                        name="startTime"
                        value={prePlannedTripDetails.startTime}
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
                    <Form.Group controlId="formStartLocation" className="mb-3">
                      <Form.Label>Start Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Start Location"
                        name="startLocation"
                        value={prePlannedTripDetails.startLocation}
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
                    <Form.Group controlId="formEndTime" className="mb-3">
                      <Form.Label>End Time</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="End Time"
                        name="endTime"
                        value={prePlannedTripDetails.endTime}
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
                    <Form.Group controlId="formEndLocation" className="mb-3">
                      <Form.Label>End Location</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="End Location"
                        name="endLocation"
                        value={prePlannedTripDetails.endLocation}
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
                    <Form.Group controlId="formMainDestinations" className="mb-3">
                      <Form.Label>Main Destinations (comma separated)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Main Destinations"
                        value={Array.isArray(prePlannedTripDetails.mainDestinations) ? prePlannedTripDetails.mainDestinations.join(', ') : prePlannedTripDetails.mainDestinations}
                        onChange={(e) => handleArrayChange(e, 'mainDestinations')}
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
                    <Form.Group controlId="formMainActivities" className="mb-3">
                      <Form.Label>Main Activities (comma separated)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Main Activities"
                        value={Array.isArray(prePlannedTripDetails.mainActivities) ? prePlannedTripDetails.mainActivities.join(', ') : prePlannedTripDetails.mainActivities}
                        onChange={(e) => handleArrayChange(e, 'mainActivities')}
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
                    <Form.Group controlId="formAvailableDates" className="mb-3">
                      <Form.Label>Available Dates</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Available Dates"
                        name="availableDates"
                        value={prePlannedTripDetails.availableDates}
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
                        rows={5}
                        placeholder="Description"
                        name="description"
                        value={prePlannedTripDetails.description}
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
                <Row>
                  <Col md="12">
                    <Form.Group controlId="formWhatsExpected" className="mb-3">
                      <Form.Label>What's Expected</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="What's Expected"
                        name="whatsExpected"
                        value={prePlannedTripDetails.whatsExpected}
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
                <Row>
                  <Col md="12">
                    <Form.Group controlId="formWhatsIncluded" className="mb-3">
                      <Form.Label>What's Included</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="What's Included"
                        name="whatsIncluded"
                        value={prePlannedTripDetails.whatsIncluded}
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
                <Row>
                  <Col md="12">
                    <Form.Group controlId="formAdditionalInfo" className="mb-3">
                      <Form.Label>Additional Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Additional Information"
                        name="additionalInfo"
                        value={prePlannedTripDetails.additionalInfo}
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
                <Row>
                  <Col md="12">
                    <Form.Group controlId="formCancellationPolicy" className="mb-3">
                      <Form.Label>Cancellation Policy</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Cancellation Policy"
                        name="cancellationPolicy"
                        value={prePlannedTripDetails.cancellationPolicy}
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
                <Row>
                  <Col md="12">
                    <Form.Group controlId="formHelp" className="mb-3">
                      <Form.Label>Help Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Help Information"
                        name="help"
                        value={prePlannedTripDetails.help}
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
                <Row>
                  <Col md="12">
                    <Form.Group controlId="formMainImage" className="mb-3">
                      <Form.Label>Main Image</Form.Label>
                      <div>
                        <img
                          src={mainImage || prePlannedTripDetails.mainImage}
                          alt="Trip Main Image"
                          style={{ maxWidth: "100%", height: "auto", marginBottom: "15px" }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
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
  </div>
);

}

export default ViewPrePlannedTrip