import React, { useState } from "react";
import axios from "axios";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";
import Select from "react-select";
import {
  InputGroup,
  Form,
  Col,
  Row,
  Container,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

const AddDestination = () => {
  const [image, setImage] = useState(null);
  const [destinationDetails, setDestinationDetails] = useState({
    destinationName: "",
    city: "",
    distanceFromColombo: "",
    category: [],
    bestTimeToVisit: "",
    website: "",
    contactNumber: "",
    openingHours: [
        {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
        },
      ],    
      description: "",
  });
  const categoryOptions = [
    { value: "Nature and Outdoors", label: "Nature and Outdoors" },
    { value: "Cultural and Historical", label: "Cultural and Historical" },
    { value: "Adventure and Activities", label: "Adventure and Activities" },
    { value: "Urban and Entertainment", label: "Urban and Entertainment" },
    { value: "Relaxation and Wellness", label: "Relaxation and Wellness" },
    {
      value: "Food and Drink Experiences",
      label: "Food and Drink Experiences",
    },
    { value: "Other", label: "Other" }, // Option to allow custom categories
  ];
  const handleMultiSelectChange = (selectedOptions, action) => {
    setDestinationDetails({
      ...destinationDetails,
      [action.name]: selectedOptions.map((option) => option.value),
    });
  };
  // Handle file input for the image
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  // Handle change in text fields
  const changeHandler = (e) => {
    setDestinationDetails({
      ...destinationDetails,
      [e.target.name]: e.target.value,
    });
  };
//   //handle time change
//   const handleTimeChange = (e, index, timeType) => {
//     const updatedOpeningHours = [...destinationDetails.openingHours];
//     updatedOpeningHours[index][timeType] = e.target.value;
//     setDestinationDetails({
//       ...destinationDetails,
//       openingHours: updatedOpeningHours,
//     });
//   };

   // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted");

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-destination",
        destinationDetails
      );
      // console.log("Profile updated successfully", response.data);

      navigate("/");
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };


  return ( <div className="AddDestination">
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
              Add Destination
            </h2>

            <Container style={{ maxWidth: "100%" }}>
              <Form>
                <Row>
                  <Col md="6">
                    <Form.Group
                      controlId="formDestinationName"
                      className="mb-3"
                    >
                      <Form.Label>Destination Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the new destination"
                        name="destinationName"
                        value={destinationDetails.destinationName}
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
                      <Form.Label>Website url</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter website url"
                        name="website"
                        value={destinationDetails.website}
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
                {/* <Row>
                  {destinationDetails.openingHours.map((day, index) => (
                    <Col md="6" key={index} className="mb-3">
                      <Form.Group controlId={`formOpeningHours-${day.day}`}>
                        <Form.Label>Opening hours</Form.Label>
                        <div style={{ display: "flex", gap: "10px" }}>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Opening time</Tooltip>}
                          >
                          <Form.Control
                            type="time"
                            name="startTime"
                            value={day.startTime}
                            onChange={(e) =>
                              handleTimeChange(e, index, "startTime")
                            }
                          />
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Closing time</Tooltip>}
                          >
                            <Form.Control
                              type="time"
                              name="endTime"
                              value={day.endTime}
                              onChange={(e) =>
                                handleTimeChange(e, index, "endTime")
                              }
                            />
                          </OverlayTrigger>
                        </div>
                      </Form.Group>
                    </Col>
                  ))}
                </Row> */}
                <Row>
                  <Col md="6">
                    <Form.Group controlId="formCategory" className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Select
                        isMulti
                        name="category"
                        options={categoryOptions}
                        value={categoryOptions.filter((option) =>
                          destinationDetails.category.includes(option.value)
                        )}
                        onChange={handleMultiSelectChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md="6">
                      <Form.Group
                        controlId="formDistanceFromMainColombo"
                        className="mb-3"
                      >
                        <Form.Label>Distance from Colombo</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter in kms"
                          name="distanceFromColombo"
                          value={destinationDetails.distanceFromColombo}
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
                        value={destinationDetails.contactNumber}
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
                  <Form.Group controlId="city" className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="enter the city"
                      name="city"
                      value={destinationDetails.city}
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
                  <Form.Group controlId="bestTimeToVisit" className="mb-3">
                    <Form.Label>Best Time to Visit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Eg:- March to April"
                      name="bestTimeToVisit"
                      value={destinationDetails.bestTimeToVisit}
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
                        rows={10}
                        placeholder="Enter a brief description about the destination"
                        name="description"
                        value={destinationDetails.description}
                        onChange={changeHandler}
                        style={{
                          borderRadius: "10px",
                          borderWidth: "2px",
                          resize: "none",
                          height: "100px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" onClick={handleSubmit}>
                  Add Destination
                </Button>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </header>
  </div>);
};

export default AddDestination;
