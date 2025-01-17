import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import AdminLogo from '../../assets/TravelMateAdminLogo.png';
import axios from "axios";

const AddGuide = () => {
  const [image, setImage] = useState(null);
  const [guideDetails, setGuideDetails] = useState({
    name: "",
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
    { value: "Other", label: "Other" },
  ];

  const handleMultiSelectChange = (selectedOptions, field) => {
    setGuideDetails({
      ...guideDetails,
      [field]: selectedOptions.map(option => option.value),
    });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setGuideDetails({
      ...guideDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/travelmate/addGuide", guideDetails);
      console.log("Guide added successfully", response.data);
      
      if (response.data.success) {
        alert("Guide added successfully!");
        setGuideDetails({
          name: "",
          area: [],
          languages: [],
          chargesPerDay: "",
          description: "",
          birthDate: null,
          contactNumber: "",
          nic: "",
        });

        setCardImage(null);
        window.location.reload(); //Reload the page
      }
    } catch (error) {
        console.log("Error uploading data", error);
    }
  };

  return (
    <div className="AddGuide" style={{ marginTop: '45px' }}>
      <header>
        <div className="d-flex justify-content-center align-items-center vh-100">
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
              Add Guide
            </h2>
            <Container>
              <Form>
                <Row>
                  <Col md="6">
                    <Form.Group controlId="formGuideName" className="mb-3">
                      <Form.Label>Guide Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the guide name"
                        name="name"
                        value={guideDetails.name}
                        onChange={changeHandler}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group controlId="formBirthDate" className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <DatePicker
                        selected={guideDetails.birthDate}
                        onChange={(date) =>
                          setGuideDetails({ ...guideDetails, birthDate: date })
                        }
                        dateFormat="yyyy/MM/dd"
                        className="form-control"
                        placeholderText="Select birth date"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group controlId="formNIC" className="mb-3">
                      <Form.Label>NIC</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter NIC"
                        name="nic"
                        value={guideDetails.nic}
                        onChange={changeHandler}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group controlId="formAreas" className="mb-3">
                      <Form.Label>Areas</Form.Label>
                      <Select
                        isMulti
                        options={areaOptions}
                        value={areaOptions.filter((option) =>
                          guideDetails.area.includes(option.value)
                        )}
                        onChange={(selectedOptions) =>
                          handleMultiSelectChange(selectedOptions, "area")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group controlId="formLanguages" className="mb-3">
                      <Form.Label>Languages</Form.Label>
                      <Select
                        isMulti
                        options={languageOptions}
                        value={languageOptions.filter((option) =>
                          guideDetails.languages.includes(option.value)
                        )}
                        onChange={(selectedOptions) =>
                          handleMultiSelectChange(selectedOptions, "languages")
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group controlId="formCharges" className="mb-3">
                      <Form.Label>Charges Per Day</Form.Label>
                      <Form.Control
                        type="number"
                        name="chargesPerDay"
                        placeholder="Enter charges"
                        value={guideDetails.chargesPerDay}
                        onChange={changeHandler}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group controlId="formContactNumber" className="mb-3">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="contactNumber"
                        placeholder="Enter contact number"
                        value={guideDetails.contactNumber}
                        onChange={changeHandler}
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
                        rows={3}
                        name="description"
                        placeholder="Enter description"
                        value={guideDetails.description}
                        onChange={changeHandler}
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
      </header>
    </div>
  );
};

export default AddGuide;
