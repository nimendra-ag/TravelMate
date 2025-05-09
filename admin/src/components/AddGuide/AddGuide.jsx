import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import AdminLogo from '../../assets/TravelMateAdminLogo.png';
import axios from "axios";

const AddGuide = () => {
  const [cardImage, setCardImage] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [guideDetails, setGuideDetails] = useState({
    name: "",
    area: [],
    languages: [],
    chargesPerDay: "",
    description: "",
    birthDate: null,
    contactNumber: "",
    nic: "",
    miniDescription: "",
    cardImage: "",
  });

  const cardImageHandler = (e) => {
    setCardImage(e.target.files[0]);
    if (errors.cardImage) {
      setErrors((prev) => ({ ...prev, cardImage: "" }));
    }
  };

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

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!guideDetails.name.trim()) {
      tempErrors.name = "Guide name is required";
      isValid = false;
    }

    if (!guideDetails.birthDate) {
      tempErrors.birthDate = "Date of birth is required";
      isValid = false;
    }

    if (!guideDetails.nic.trim()) {
      tempErrors.nic = "NIC is required";
      isValid = false;
    } else if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(guideDetails.nic)) {
      tempErrors.nic = "Invalid NIC format";
      isValid = false;
    }

    if (guideDetails.area.length === 0) {
      tempErrors.area = "Please select at least one area";
      isValid = false;
    }

    if (guideDetails.languages.length === 0) {
      tempErrors.languages = "Please select at least one language";
      isValid = false;
    }

    if (!guideDetails.chargesPerDay) {
      tempErrors.chargesPerDay = "Charges per day is required";
      isValid = false;
    } else if (guideDetails.chargesPerDay <= 0) {
      tempErrors.chargesPerDay = "Charges must be greater than 0";
      isValid = false;
    }

    if (!guideDetails.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(guideDetails.contactNumber)) {
      tempErrors.contactNumber = "Contact number must be 10 digits";
      isValid = false;
    }

    if (!guideDetails.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    if (!guideDetails.miniDescription.trim()) {
      tempErrors.miniDescription = "Mini description is required";
      isValid = false;
    }
    
    if (!cardImage) {
      tempErrors.cardImage = "Image is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleMultiSelectChange = (selectedOptions, field) => {
    setGuideDetails({
      ...guideDetails,
      [field]: selectedOptions.map(option => option.value),
    });
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const changeHandler = (e) => {
    setGuideDetails({
      ...guideDetails,
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
      const formDataCardImage = new FormData();
      formDataCardImage.append("image", cardImage);
      
      const responseCardImage = await axios.post(
        "http://localhost:3000/upload",
        formDataCardImage,
        {
          headers: { Accept: "application/json" },
        }
      );
      
      const responseDataCardImage = responseCardImage.data;
      
      if (responseDataCardImage.success) {
        const updatedGuideDetails = {
          ...guideDetails,
          cardImage: responseDataCardImage.image_url,
        };
        
        console.log("Updated Details:", updatedGuideDetails);
        
        const response = await axios.post(
          "http://localhost:3000/travelmate/addGuide", 
          updatedGuideDetails
        );
        
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
            miniDescription: "",
            cardImage: "",
          });
          setCardImage(null);
          setImage(null);
          // window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error adding guide", error);
      alert("Error adding guide. Please try again.");
    }
  };

  return (
    <div className="AddGuide" style={{ marginTop: '45px' }}>
      <header>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "1200px",
            width: "100%",
          }}>
            <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>Add Guide</h2>
            <Container>
              <Form onSubmit={handleSubmit}>
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
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group controlId="formBirthDate" className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <DatePicker
                        selected={guideDetails.birthDate}
                        onChange={(date) => {
                          setGuideDetails({ ...guideDetails, birthDate: date });
                          if (errors.birthDate) {
                            setErrors({ ...errors, birthDate: "" });
                          }
                        }}
                        dateFormat="yyyy/MM/dd"
                        className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
                        placeholderText="Select birth date"
                      />
                      {errors.birthDate && (
                        <div className="invalid-feedback d-block">{errors.birthDate}</div>
                      )}
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
                        isInvalid={!!errors.nic}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nic}
                      </Form.Control.Feedback>
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
                        className={errors.area ? 'is-invalid' : ''}
                      />
                      {errors.area && (
                        <div className="invalid-feedback d-block">{errors.area}</div>
                      )}
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
                        className={errors.languages ? 'is-invalid' : ''}
                      />
                      {errors.languages && (
                        <div className="invalid-feedback d-block">{errors.languages}</div>
                      )}
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
                        isInvalid={!!errors.chargesPerDay}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.chargesPerDay}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.contactNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Upload Card Image</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={cardImageHandler}
                        isInvalid={!!errors.cardImage}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardImage}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group controlId="formMiniDescription" className="mb-3">
                      <Form.Label>Mini Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mini description"
                        name="miniDescription"
                        value={guideDetails.miniDescription}
                        onChange={changeHandler}
                        isInvalid={!!errors.miniDescription}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.miniDescription}
                      </Form.Control.Feedback>
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
                        i  isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
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