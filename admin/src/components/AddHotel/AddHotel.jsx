import React, { useState } from "react";
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap"; // Import Bootstrap components
import axios from "axios";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";

const AddHotel = () => {
  const [cardImage, setCardImage] = useState(null);
  const [accommodationDetails, setAccommodationDetails] = useState({
    accommodationName: "",
    category: "Hotels", // Default category
    address: "",
    distanceFromMainCity: "",
    price: "",
    description: "",
    cardImage: "",
  });

  // Handle file input for the image
  const cardImageHandler = (e) => {
    setCardImage(e.target.files[0]);
  };

  // Handle change in text fields
  const changeHandler = (e) => {
    setAccommodationDetails({
      ...accommodationDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted");
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
    }

    if(responseDataCardImage.success){
      accommodationDetails.cardImage = responseDataCardImage.image_url;

      try {
        const response = await axios.post("http://localhost:3000/travelmate/addAccomodation", accommodationDetails,);
        // console.log("Profile updated successfully", response.data);

        if(response.data.success){
          alert("Accommodation added successfully!");
          setAccommodationDetails({
            accommodationName: "",
            category: "Hotels", // Default category
            address: "",
            distanceFromMainCity: "",
            price: "",
            description: "",
            cardImage: "",
          });

          setCardImage(null);
          window.location.reload(); //Reload the page
        }
  
        
      } catch (error) {
        console.log("Error updating profile", error);
      }
    } else{
      alert("Faild to upload images");
    }


  };

  return (
    <div >
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
                  src={AdminLogo} // Update the logo path if needed
                  alt="Icon"
                  style={{ height: "98px", paddingBottom: "33px" }}
                />
              </div>
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add Accommodation
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formAccommodationName"
                        className="mb-3"
                      >
                        <Form.Label>Accommodation Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new accommodation"
                          name="accommodationName"
                          value={accommodationDetails.accommodationName}
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
                          <option value="Vacation Rentals">
                            Vacation Rentals
                          </option>
                          <option value="Boutique Hotels">
                            Boutique Hotels
                          </option>
                          <option value="Villas">Hostels</option>
                          <option value="Camping Sites">Camping Sites</option>
                          <option value="Bed and Breakfast">
                            Bed and Breakfast
                          </option>
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
                          rows={3} // Set fixed height using rows
                          placeholder="Enter the address"
                          name="address"
                          value={accommodationDetails.address}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none", // Prevent resizing
                            height: "100px", // Fixed height for the textarea
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group
                        controlId="formDistanceFromMainCity"
                        className="mb-3"
                      >
                        <Form.Label>Distance from Main City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter in kms"
                          name="distanceFromMainCity"
                          value={accommodationDetails.distanceFromMainCity}
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
                      <Form.Group controlId="formPrice" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            name="price"
                            value={accommodationDetails.price}
                            onChange={changeHandler}
                            style={{
                              borderRadius: "10px 0 0 10px",
                              height: "50px",
                              borderWidth: "2px",
                            }}
                          />
                          <InputGroup.Text
                            style={{
                              borderRadius: "0 10px 10px 0",
                              height: "50px",
                              borderWidth: "2px",
                            }}
                          >
                            $ per person / 1 day
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={cardImageHandler}
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
                          rows={10} // Set fixed height using rows
                          placeholder="Enter a brief description"
                          name="description"
                          value={accommodationDetails.description}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none", // Prevent resizing
                            height: "100px", // Fixed height for the textarea
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" onClick={handleSubmit}>
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