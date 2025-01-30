import React, { useState, useEffect } from "react";
import { InputGroup, Form, Col, Row, Container, Button } from "react-bootstrap";
import Select from "react-select";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTransportationService() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [transportationServiceDetails, setTransportationServiceDetails] =
    useState({
      transportationServiceName: "",
      availableVehicles: [],
      pricePerHour: "",
      address: "",
      contactNumber: "",
      description: "",
    });

  const availableVehicleOptions = [
    { value: "Cars", label: "Cars" },
    { value: "Buses", label: "Buses" },
    { value: "Motorcycles", label: "Motorcycles" },
    { value: "Bicycles", label: "Bicycles" },
    { value: "Other", label: "Other" },
  ];

  // Update the cleanup useEffect
  useEffect(() => {
    return () => {
      selectedImages.forEach(image => {
        if (image.url) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, []);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file: file
    }));
    setSelectedImages(prev => [...prev, ...newImages]);
    setImagesToUpload(prev => [...prev, ...files]);
  };

  const removeImage = (id) => {
    setSelectedImages(prevImages => {
      const imageToRemove = prevImages.find(img => img.id === id);
      if (imageToRemove && imageToRemove.url) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prevImages.filter(img => img.id !== id);
    });

    const indexToRemove = selectedImages.findIndex(img => img.id === id);
    if (indexToRemove !== -1) {
      setImagesToUpload(prev => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedImages = await uploadImagesToCloudinary(imagesToUpload);
    console.log("images", uploadedImages);

    const formData = new FormData();

    Object.keys(transportationServiceDetails).forEach(key => {
      formData.append(key, transportationServiceDetails[key]);
    });

    imagesToUpload.forEach((image) => {
      formData.append('images', image);
    });

    console.log("form data", transportationServiceDetails);
    
    transportationServiceDetails.images = uploadedImages.map(image => image.imageUrl);

    console.log("form data with images", transportationServiceDetails);
    try {
      console.log("Before axios", transportationServiceDetails);
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-transportation-service",
        transportationServiceDetails,
      );
      if(response.data.success){
        alert("Transportation Service added successfully");
      }
      else{
        alert("Failed to add Transportation Service");
      }
    } catch (error) {
      console.log("Error updating profile", error);
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

  return (
    <div className="AddTransportationService">
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
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add Transportation Service
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Images</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                            color: "transparent"  // This hides the file count text
                          }}
                        />
                      </Form.Group>


                      {selectedImages.length > 0 && (
                        <div style={{ marginBottom: "2rem" }}>
                          <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "1rem",
                            marginTop: "1rem"
                          }}>
                            {selectedImages.map((image) => (
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
                                    removeImage(image.id);
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

                  <Button variant="primary" onClick={handleSubmit}>
                    Add Transportation Service
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

export default AddTransportationService;
