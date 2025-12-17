import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Form,
  Col,
  Row,
  Container,
  Button,
} from "react-bootstrap";


const AddRestaurant = () => {

  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    category: [],
    mainCategory: "",
    address: "",
    contactNumber: "",
    email: "",
    website: "",
    openingHours: [{ startTime: "", endTime: "" }],
    priceRange: [],
    description: "",
  });

  // Update the state variables first
  const [selectedCaroImages, setSelectedCaroImages] = useState([]);
  const [selectedCardImages, setSelectedCardImages] = useState([]);
  const [selectedMainImages, setSelectedMainImages] = useState([]);

  const [caroImagesToUpload, setCaroImagesToUpload] = useState([]);
  const [cardImagesToUpload, setCardImagesToUpload] = useState([]);
  const [mainImagesToUpload, setMainImagesToUpload] = useState([]);

  // Update the cleanup useEffect
  useEffect(() => {
    return () => {
      [...selectedCaroImages, ...selectedCardImages, ...selectedMainImages].forEach(image => {
        if (image.url) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [selectedCaroImages, selectedCardImages, selectedMainImages]);


  // Create separate handlers for each image type
  const handleCaroImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file: file
    }));
    setSelectedCaroImages(prev => [...prev, ...newImages]);
    setCaroImagesToUpload(prev => [...prev, ...files]);
  };

  const handleCardImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file: file
    }));
    setSelectedCardImages(prev => [...prev, ...newImages]);
    setCardImagesToUpload(prev => [...prev, ...files]);
  };

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file: file
    }));
    setSelectedMainImages(prev => [...prev, ...newImages]);
    setMainImagesToUpload(prev => [...prev, ...files]);
  };


  // Create separate remove handlers
  const removeCaroImage = (id) => {
    setSelectedCaroImages(prevImages => {
      const imageToRemove = prevImages.find(img => img.id === id);
      if (imageToRemove?.url) URL.revokeObjectURL(imageToRemove.url);
      return prevImages.filter(img => img.id !== id);
    });
    const indexToRemove = selectedCaroImages.findIndex(img => img.id === id);
    if (indexToRemove !== -1) {
      setCaroImagesToUpload(prev => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const removeCardImage = (id) => {
    setSelectedCardImages(prevImages => {
      const imageToRemove = prevImages.find(img => img.id === id);
      if (imageToRemove?.url) URL.revokeObjectURL(imageToRemove.url);
      return prevImages.filter(img => img.id !== id);
    });
    const indexToRemove = selectedCardImages.findIndex(img => img.id === id);
    if (indexToRemove !== -1) {
      setCardImagesToUpload(prev => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const removeMainImage = (id) => {
    setSelectedMainImages(prevImages => {
      const imageToRemove = prevImages.find(img => img.id === id);
      if (imageToRemove?.url) URL.revokeObjectURL(imageToRemove.url);
      return prevImages.filter(img => img.id !== id);
    });
    const indexToRemove = selectedMainImages.findIndex(img => img.id === id);
    if (indexToRemove !== -1) {
      setMainImagesToUpload(prev => prev.filter((_, index) => index !== indexToRemove));
    }
  };


  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];

    console.log('Just outside the loop');
    console.log(files);

    for (const file of files) {
      console.log("with in the loop");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "preset-for-file-upload");
      formData.append("cloud_name", "dz4wm9iug");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
        formData
      ).catch((error) => {
        console.log("Error uploading image", error);
      });

      if (response.status === 200) {
        uploadedUrls.push({
          imageUrl: response.data.secure_url
        });
      }
    }
    return uploadedUrls;
  };


  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    console.log("Inside the handle submit function");
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const uploadedCaroImages = await uploadImagesToCloudinary(caroImagesToUpload);
    const uploadedCardImages = await uploadImagesToCloudinary(cardImagesToUpload);
    const uploadedMainImages = await uploadImagesToCloudinary(mainImagesToUpload);

    restaurantDetails.caroImages = uploadedCaroImages.map(image => image.imageUrl);
    restaurantDetails.cardImages = uploadedCardImages.map(image => image.imageUrl);
    restaurantDetails.mainImages = uploadedMainImages.map(image => image.imageUrl);

    console.log(restaurantDetails);

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-restaurant",
        restaurantDetails
      );

      if (response.data.success) {
        alert("Restaurant added successfully!");
        // Reset form...
        // window.location.reload();
      }
    } catch (error) {
      console.log("Error adding restaurant", error);
    }
  };



  return (
    <div className="AddRestaurant" style={{ marginTop: '350px' }}>
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
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>Add Restaurant</h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      {/* Carousel Images */}
                      <Form.Group controlId="formCaroImages" className="mb-3">
                        <Form.Label>Upload Carousel Images</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleCaroImageChange}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            color: "transparent"
                          }}
                        />
                      </Form.Group>

                      {selectedCaroImages.length > 0 && (
                        <div style={{ marginBottom: "2rem" }}>
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "1rem",
                            marginTop: "1rem"
                          }}>
                            {selectedCaroImages.map((image) => (
                              <div
                                key={image.id}
                                style={{
                                  position: "relative",
                                  paddingBottom: "75%",
                                  height: 0,
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "transform 0.2s ease",
                                  cursor: "pointer",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                              >
                                <img
                                  src={image.url}
                                  alt={`Preview ${image.id}`}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeCaroImage(image.id);
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    background: "rgba(255, 255, 255, 0.8)",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Card Images */}
                      <Form.Group controlId="formCardImages" className="mb-3">
                        <Form.Label>Upload Card Images</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleCardImageChange}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            color: "transparent"
                          }}
                        />
                      </Form.Group>

                      {selectedCardImages.length > 0 && (
                        <div style={{ marginBottom: "2rem" }}>
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "1rem",
                            marginTop: "1rem"
                          }}>
                            {selectedCardImages.map((image) => (
                              <div
                                key={image.id}
                                style={{
                                  position: "relative",
                                  paddingBottom: "75%",
                                  height: 0,
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "transform 0.2s ease",
                                  cursor: "pointer",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                              >
                                <img
                                  src={image.url}
                                  alt={`Preview ${image.id}`}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeCardImage(image.id);
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    background: "rgba(255, 255, 255, 0.8)",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Main Images */}
                      <Form.Group controlId="formMainImages" className="mb-3">
                        <Form.Label>Upload Main Images</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleMainImageChange}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            color: "transparent"
                          }}
                        />
                      </Form.Group>

                      {selectedMainImages.length > 0 && (
                        <div style={{ marginBottom: "2rem" }}>
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "1rem",
                            marginTop: "1rem"
                          }}>
                            {selectedMainImages.map((image) => (
                              <div
                                key={image.id}
                                style={{
                                  position: "relative",
                                  paddingBottom: "75%",
                                  height: 0,
                                  borderRadius: "10px",
                                  overflow: "hidden",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  transition: "transform 0.2s ease",
                                  cursor: "pointer",
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                              >
                                <img
                                  src={image.url}
                                  alt={`Preview ${image.id}`}
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMainImage(image.id);
                                  }}
                                  style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: "5px",
                                    background: "rgba(255, 255, 255, 0.8)",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
                    Add Restaurant
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

export default AddRestaurant;

