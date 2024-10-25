import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for DatePicker
import AdminLogo from '../../assets/TravelMateAdminLogo.png'
import axios from "axios";


const AddGuide = () => {

  const [image, setImage] = useState(null);
  const [guideDetails, setGuideDetails] = useState({
    guideName: "",
    area: [],
    languages: [],
    chargesPerDay: "",
    description: "",
    birthDate: null,
    contactNumber: "",
    nic: "",
  });

  const areaOptions = [
    { value: "Colombo", label: "Colombo" },
    { value: "Gampaha", label: "Gampaha" },
    { value: "Kalutara", label: "Kalutara" },
    { value: "Kandy", label: "Kandy" },
     { value: "Matale", label: "Matale" },
    { value: "Nuwara Eliya", label: "Nuwara Eliya" },
    { value: "Galle", label: "Galle" },
    { value: "Matara", label: "Matara" },
    { value: "Hambantota", label: "Hambantota" },
    { value: "Jaffna", label: "Jaffna" },
    { value: "Kilinochchi", label: "Kilinochchi" },
    { value: "Mannar", label: "Mannar" },
    { value: "Vavuniya", label: "Vavuniya" },
    { value: "Mullaitivu", label: "Mullaitivu" },
    { value: "Trincomalee", label: "Trincomalee" },
    { value: "Batticaloa", label: "Batticaloa" },
    { value: "Ampara", label: "Ampara" },
    { value: "Kurunegala", label: "Kurunegala" },
    { value: "Puttalam", label: "Puttalam" },
    { value: "Anuradhapura", label: "Anuradhapura" },
    { value: "Polonnaruwa", label: "Polonnaruwa" },
    { value: "Badulla", label: "Badulla" },
    { value: "Monaragala", label: "Monaragala" },
    { value: "Ratnapura", label: "Ratnapura" },
    { value: "Kegalle", label: "Kegalle" },
    

    
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Sinhala", label: "Sinhala" },
    { value: "Tamil", label: "Tamil" },
    { value: "Chinese", label: "Chinese" },
    { value: "Japanese", label: "Japanese" },
    { value: "Russian", label: "Russian" },
    { value: "Other", label: "Other" }, // Option to allow custom languages
  ];


  const handleMultiSelectChange = (selectedOptions, action) => {
    setGuideDetails({
      ...guideDetails,
      [action.name]: selectedOptions.map(option => option.value),
    });
  };
  
  
 // Handle file input for the image
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle change in text fields
  const changeHandler = (e) => {
    setGuideDetails({
      ...guideDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted");

    try {
        const response = await axios.post("http://localhost:3000/travelmate/addGuide", guideDetails, );
        // console.log("Profile updated successfully", response.data);
    
        navigate('/')
    } catch (error) {
        console.log("Error updating profile", error);
    }
};


  return (
    <div className="AddGuide">
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
                Add Guide
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formGuideName" className="mb-3">
                        <Form.Label>Guide Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new guide"
                          name="guideName"
                          value={guideDetails.guideName}
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
                      <Form.Group controlId="formBirthDate" className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <div>
                          <DatePicker
                            selected={guideDetails.birthDate}
                            onChange={(date) =>
                              setGuideDetails({
                                ...guideDetails,
                                birthDate: date,
                              })
                            }
                            dateFormat="yyyy/MM/dd"
                            className="form-control"
                            placeholderText="Select birth date"
                            style={{ display: "block", width: "100%" }}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col md="6">
                      <Form.Group controlId="formGuideNic" className="mb-3">
                        <Form.Label>NIC</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the NIC Number"
                          name="nic"
                          value={guideDetails.nic}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                  <Row>
                 
                    <Col md="6">
                      <Form.Group controlId="formAreas" className="mb-3">
                        <Form.Label>Areas</Form.Label>
                        <Select
                          isMulti
                          name="area"
                          options={areaOptions}
                          value={areaOptions.filter((option) =>
                            guideDetails.area.includes(option.value)
                          )}
                          onChange={handleMultiSelectChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formLanguages" className="mb-3">
                        <Form.Label>Languages</Form.Label>
                        <Select
                          isMulti
                          name="languages"
                          options={languageOptions}
                          value={languageOptions.filter((option) =>
                            guideDetails.languages.includes(option.value)
                          )}
                          onChange={handleMultiSelectChange}
                        />
                        {guideDetails.languages.includes("Other") && (
                          <Form.Control
                            type="text"
                            placeholder="Enter other languages"
                            name="otherLanguages"
                            value={guideDetails.otherLanguages}
                            onChange={changeHandler}
                            className="mt-2"
                          />
                        )}
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group
                        controlId="formChargesPerDay"
                        className="mb-3"
                      >
                        <Form.Label>Charges per day ($)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter the charges per day"
                          name="chargesPerDay"
                          value={guideDetails.chargesPerDay}
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
                          value={guideDetails.contactNumber}
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
                          placeholder="Enter a brief description about the guide"
                          name="description"
                          value={guideDetails.description}
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
                    Add Guide
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

export default AddGuide;
