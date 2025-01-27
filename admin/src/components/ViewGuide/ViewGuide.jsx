import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ViewGuide = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const navigate = useNavigate();

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
    // Add more area options as needed
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Sinhala", label: "Sinhala" },
    { value: "Tamil", label: "Tamil" },
    // Add more language options as needed
  ];

  // Fetch guide details when the component mounts
  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/travelmate/viewGuide/${id}`);
        if (response.data.success) {
          setGuideDetails(response.data.data);
        } else {
          alert(response.data.message || "Failed to fetch guide details.");
        }
      } catch (error) {
        console.error("Error fetching guide details:", error);
      }
    };

    fetchGuideDetails();
  }, [id]);

  const handleMultiSelectChange = (selectedOptions, field) => {
    setGuideDetails({
      ...guideDetails,
      [field]: selectedOptions.map((option) => option.value),
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGuideDetails({ ...guideDetails, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/travelmate/updateGuide/${id}`,
        guideDetails
      );

      if (response.data.success) {
        alert("Guide updated successfully!");
        navigate("/guides"); // Redirect after saving
      } else {
        alert(response.data.message || "Failed to update guide.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Container style={{ marginTop: '70px' }}>
      <h2 className="fw-bold mb-4">Edit Guide</h2>
      <Form>
        <Row>
          <Col md="6">
            <Form.Group controlId="formGuideName" className="mb-3">
              <Form.Label>Guide Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={guideDetails.name}
                onChange={changeHandler}
                placeholder="Enter guide name"
              />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="formBirthDate" className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <DatePicker
                selected={new Date(guideDetails.birthDate)}
                onChange={(date) => setGuideDetails({ ...guideDetails, birthDate: date })}
                dateFormat="yyyy/MM/dd"
                className="form-control"
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
                name="nic"
                value={guideDetails.nic}
                onChange={changeHandler}
                placeholder="Enter NIC"
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
                value={guideDetails.chargesPerDay}
                onChange={changeHandler}
                placeholder="Enter charges per day"
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
                value={guideDetails.contactNumber}
                onChange={changeHandler}
                placeholder="Enter contact number"
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
                name="description"
                value={guideDetails.description}
                onChange={changeHandler}
                rows={3}
                placeholder="Enter description"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default ViewGuide;
