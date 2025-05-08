import React, { useState } from "react";
import {
  InputGroup,
  Form,
  Col,
  Row,
  Container,
  Button,
} from "react-bootstrap";
import Select from "react-select";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";
import axios from "axios";

function AddTransportationService() {
  const [cardImage, setCardImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [transportationServiceDetails, setTransportationServiceDetails] = useState({
    name: "",
    availableVehicles: [],
    pricePerHour: "",
    address: "",
    contactNumber: "",
    description: "",
    miniDescription: "",
    cardImage: "",
  });



  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!transportationServiceDetails.name.trim()) {
      tempErrors.name = "Service name is required";
      isValid = false;
    }

  

    if (!transportationServiceDetails.pricePerHour) {
      tempErrors.pricePerHour = "Price per hour is required";
      isValid = false;
    } else if (
      isNaN(transportationServiceDetails.pricePerHour) ||
      transportationServiceDetails.pricePerHour <= 0
    ) {
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

    if (!transportationServiceDetails.miniDescription.trim()) {
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

  const handleMultiSelectChange = (selectedOptions, action) => {
    setTransportationServiceDetails((prev) => ({
      ...prev,
      [action.name]: selectedOptions.map((option) => option.value),
    }));
    if (errors.availableVehicles) {
      setErrors((prev) => ({ ...prev, availableVehicles: "" }));
    }
  };

  const changeHandler = (e) => {
    setTransportationServiceDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const cardImageHandler = (e) => {
    setCardImage(e.target.files[0]);
    if (errors.cardImage) {
      setErrors((prev) => ({ ...prev, cardImage: "" }));
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
        const updatedDetails = {
          ...transportationServiceDetails,
          cardImage: responseDataCardImage.image_url,
        };

        console.log("Updated Details:", updatedDetails);
        

        const response = await axios.post(
          "http://localhost:3000/travelmate/add-transportation-service",
          updatedDetails
        );

        if (response.data.success) {
          alert("Transportation service added successfully!");
          setTransportationServiceDetails({
            name: "",
            availableVehicles: [],
            pricePerHour: "",
            address: "",
            contactNumber: "",
            description: "",
            miniDescription: "",
            cardImage: "",
          });
          setCardImage(null);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="AddTransportationService">
      <Container className="py-5">
        <div
          className="p-4 rounded"
          style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
        >
          <div className="d-flex justify-content-start mb-3">
            <img src={AdminLogo} alt="Admin" style={{ height: "80px" }} />
          </div>
          <h3 className="fw-bold mb-4">Add Transportation Service</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={transportationServiceDetails.name}
                    onChange={changeHandler}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>

              <Form.Group className="mb-3">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    value={transportationServiceDetails.contactNumber}
                    onChange={changeHandler}
                    isInvalid={!!errors.contactNumber}
                    maxLength={10}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contactNumber}
                  </Form.Control.Feedback>
                </Form.Group>
             
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per Hour</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="pricePerHour"
                      value={transportationServiceDetails.pricePerHour}
                      onChange={changeHandler}
                      isInvalid={!!errors.pricePerHour}
                    />
                    <InputGroup.Text>$ / hr</InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.pricePerHour}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                rows={3}
                value={transportationServiceDetails.address}
                onChange={changeHandler}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mini Description</Form.Label>
              <Form.Control
                type="text"
                name="miniDescription"
                value={transportationServiceDetails.miniDescription}
                onChange={changeHandler}
                isInvalid={!!errors.miniDescription}
              />
              <Form.Control.Feedback type="invalid">
                {errors.miniDescription}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={6}
                value={transportationServiceDetails.description}
                onChange={changeHandler}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
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

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default AddTransportationService;
