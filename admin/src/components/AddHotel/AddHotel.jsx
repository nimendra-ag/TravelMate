import React, { useState } from "react";
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";

const AddHotel = () => {
  const [cardImage, setCardImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [accommodationDetails, setAccommodationDetails] = useState({
    name: "",
    category: "Hotels",
    address: "",
    contactNumber: "",
    distance_from_city: "",
    perPerson_price: "",
    description: "",
    cardImage: "",
    miniDescription: "",

  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!accommodationDetails.name.trim()) {
      tempErrors.name = "Accommodation name is required";
      isValid = false;
    }

    if (!accommodationDetails.address.trim()) {
      tempErrors.address = "Address is required";
      isValid = false;
    }

    if (!accommodationDetails.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(accommodationDetails.contactNumber)) {
      tempErrors.contactNumber = "Contact number must be 10 digits";
      isValid = false;
    }

    if (!accommodationDetails.distance_from_city.trim()) {
      tempErrors.distance_from_city = "Distance is required";
      isValid = false;
    }

    if (!accommodationDetails.perPerson_price.trim()) {
      tempErrors.perPerson_price = "Price is required";
      isValid = false;
    }

    if (!accommodationDetails.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    if (!cardImage) {
      tempErrors.cardImage = "Image is required";
      isValid = false;
    }

    if (!accommodationDetails.miniDescription.trim()) {
      tempErrors.miniDescription = "Mini Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const cardImageHandler = (e) => {
    setCardImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setAccommodationDetails({
      ...accommodationDetails,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
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

    let responseDataCardImage;
    let formDataCardImage = new FormData();

    formDataCardImage.append('image', cardImage);

    try {
      const responseCardImage = await axios.post('http://localhost:3000/upload', formDataCardImage, {
        headers: { Accept: 'application/json' },
      });
      responseDataCardImage = responseCardImage.data;
    } catch (error) {
      console.error('Error uploading carousel image:', error);
      return;
    }

    if (responseDataCardImage.success) {
      accommodationDetails.cardImage = responseDataCardImage.image_url;

      try {
        console.log("Accommodation Details:", accommodationDetails);
        
        const response = await axios.post("http://localhost:3000/travelmate/addAccomodation", accommodationDetails);

        if (response.data.success) {
          alert("Accommodation added successfully!");
          setAccommodationDetails({
            name: "",
            category: "Hotels",
            address: "",
            contactNumber: "",
            distance_from_city: "",
            perPerson_price: "",
            description: "",
            cardImage: "",
            miniDescription: "",
          });

          setCardImage(null);
          window.location.reload();
        }

      } catch (error) {
        console.log("Error updating profile", error);
      }
    } else {
      alert("Failed to upload images");
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
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
                <img src={AdminLogo} alt="Icon" style={{ height: "98px", paddingBottom: "33px" }} />
              </div>
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>Add Hotel</h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formAccommodationName" className="mb-3">
                        <Form.Label>Accommodation Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new accommodation"
                          name="name"
                          value={accommodationDetails.name}
                          onChange={changeHandler}
                          isInvalid={!!errors.name}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formCategory" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          as="select"
                          name="category"
                          value={accommodationDetails.category}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        >
                          <option value="Hotels">Hotels</option>
                          <option value="Resorts">Resorts</option>
                          <option value="Vacation Rentals">Vacation Rentals</option>
                          <option value="Boutique Hotels">Boutique Hotels</option>
                          <option value="Villas">Villas</option>
                          <option value="Camping Sites">Camping Sites</option>
                          <option value="Bed and Breakfast">Bed and Breakfast</option>
                          <option value="Eco-Lodges">Eco-Lodges</option>
                        </Form.Control>
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
                          placeholder="Enter the address"
                          name="address"
                          value={accommodationDetails.address}
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
                          value={accommodationDetails.contactNumber}
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
                      <Form.Group controlId="formDistanceFromMainCity" className="mb-3">
                        <Form.Label>Distance from Main City,KM</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter in kms"
                          name="distance_from_city"
                          value={accommodationDetails.distance_from_city}
                          onChange={changeHandler}
                          isInvalid={!!errors.distance_from_city}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.distance_from_city}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formPrice" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            name="perPerson_price"
                            value={accommodationDetails.perPerson_price}
                            onChange={changeHandler}
                            isInvalid={!!errors.perPerson_price}
                            style={{
                              borderRadius: "10px 0 0 10px",
                              height: "50px",
                              borderWidth: "2px",
                            }}
                          />
                          <InputGroup.Text style={{
                            borderRadius: "0 10px 10px 0",
                            height: "50px",
                            borderWidth: "2px",
                          }}>
                            $ per person / 1 day
                          </InputGroup.Text>
                          <Form.Control.Feedback type="invalid">
                            {errors.perPerson_price}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={cardImageHandler}
                          isInvalid={!!errors.cardImage}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardImage}
                        </Form.Control.Feedback>
                      </Form.Group>

                      
                    </Col>
                    <Form.Group controlId="formAccommodationName" className="mb-3">
                        <Form.Label>Mini Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the mini Description"
                          name="miniDescription"
                          value={accommodationDetails.miniDescription}
                          onChange={changeHandler}
                     
                     
              
                          isInvalid={!!errors.miniDescription}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.miniDescription}
                        </Form.Control.Feedback>
                      </Form.Group>

                    
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
                          value={accommodationDetails.description}
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
                    Add Accommodation
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

export default AddHotel;
