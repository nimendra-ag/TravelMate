import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const AddDestination = () => {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [destinationDetails, setDestinationDetails] = useState({
    name: "",
    city: "",
    distanceFromColombo: "",
    category: [],
    bestTimeToVisit: "",
    website: "",
    contactNumber: "",
    openingHours: [
      {
        startTime: "",
        endTime: "",
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
    { value: "Food and Drink Experiences", label: "Food and Drink Experiences" },
    { value: "Other", label: "Other" },
  ];

<<<<<<< HEAD
=======
  const [selectedCardImages, setSelectedCardImages] = useState([]);
  const [selectedMainImages, setSelectedMainImages] = useState([]);

  const [cardImagesToUpload, setCardImagesToUpload] = useState([]);
  const [mainImagesToUpload, setMainImagesToUpload] = useState([]);

  // Update the cleanup useEffect
  useEffect(() => {
    return () => {
      [, ...selectedCardImages, ...selectedMainImages].forEach(image => {
        if (image.url) {
          URL.revokeObjectURL(image.url);
        }
      });
    };
  }, [selectedCardImages, selectedMainImages]);

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


>>>>>>> origin/Nimendra
  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!destinationDetails.name.trim()) {
      tempErrors.name = "Destination name is required";
      isValid = false;
    }

    if (!destinationDetails.city.trim()) {
      tempErrors.city = "City is required";
      isValid = false;
    }

    if (!destinationDetails.distanceFromColombo.trim()) {
      tempErrors.distanceFromColombo = "Distance is required";
      isValid = false;
    }

    if (destinationDetails.category.length === 0) {
      tempErrors.category = "Please select at least one category";
      isValid = false;
    }

    if (!destinationDetails.bestTimeToVisit.trim()) {
      tempErrors.bestTimeToVisit = "Best time to visit is required";
      isValid = false;
    }

    if (!destinationDetails.website.trim()) {
      tempErrors.website = "Website URL is required";
      isValid = false;
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(destinationDetails.website)) {
      tempErrors.website = "Please enter a valid URL";
      isValid = false;
    }

    if (!destinationDetails.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(destinationDetails.contactNumber)) {
      tempErrors.contactNumber = "Contact number must be 10 digits";
      isValid = false;
    }

    if (!destinationDetails.openingHours[0].startTime || !destinationDetails.openingHours[0].endTime) {
      tempErrors.openingHours = "Opening hours are required";
      isValid = false;
    }

    if (!destinationDetails.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleMultiSelectChange = (selectedOptions, action) => {
    setDestinationDetails({
      ...destinationDetails,
      [action.name]: selectedOptions.map((option) => option.value),
    });
    if (errors.category) {
      setErrors({
        ...errors,
        category: "",
      });
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setDestinationDetails({
      ...destinationDetails,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleTimeChange = (e, index, timeType) => {
    const updatedOpeningHours = [...destinationDetails.openingHours];
    updatedOpeningHours[index][timeType] = e.target.value;
    setDestinationDetails({
      ...destinationDetails,
      openingHours: updatedOpeningHours,
    });
    if (errors.openingHours) {
      setErrors({
        ...errors,
        openingHours: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
    if (!validateForm()) {
      return;
    }
=======

    if (!validateForm()) {
      return;
    }

    const uploadedCardImages = await uploadImagesToCloudinary(cardImagesToUpload);
    const uploadedMainImages = await uploadImagesToCloudinary(mainImagesToUpload);

    destinationDetails.cardImages = uploadedCardImages.map(image => image.imageUrl);
    destinationDetails.mainImages = uploadedMainImages.map(image => image.imageUrl);
>>>>>>> origin/Nimendra

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/addDestination",
        destinationDetails
      );

      if (response.data.success) {
        alert("Destination added successfully!");
        setDestinationDetails({
          name: "",
          city: "",
          distanceFromColombo: "",
          category: [],
          bestTimeToVisit: "",
          website: "",
          contactNumber: "",
          openingHours: [
            {
              startTime: "",
              endTime: "",
            },
          ],
          description: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("Error adding destination", error);
    }
  };
  return (
    <div className="AddDestination" style={{ marginTop: "60px" }}>
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
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>Add Destination</h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Destination Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new destination"
                          name="name"
                          value={destinationDetails.name}
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
                      <Form.Group controlId="formWebsite" className="mb-3">
                        <Form.Label>Website URL</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter website URL"
                          name="website"
                          value={destinationDetails.website}
                          onChange={changeHandler}
                          isInvalid={!!errors.website}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.website}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    {destinationDetails.openingHours.map((day, index) => (
                      <Col md="6" key={index} className="mb-3">
                        <Form.Group controlId={`formOpeningHours-${index}`}>
                          <Form.Label>Opening Hours</Form.Label>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Opening time</Tooltip>}>
                              <Form.Control
                                type="time"
                                name="startTime"
                                value={day.startTime}
                                onChange={(e) => handleTimeChange(e, index, "startTime")}
                                isInvalid={!!errors.openingHours}
                              />
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Closing time</Tooltip>}>
                              <Form.Control
                                type="time"
                                name="endTime"
                                value={day.endTime}
                                onChange={(e) => handleTimeChange(e, index, "endTime")}
                                isInvalid={!!errors.openingHours}
                              />
                            </OverlayTrigger>
                          </div>
                          {errors.openingHours && (
                            <div className="invalid-feedback d-block">{errors.openingHours}</div>
                          )}
                        </Form.Group>
                      </Col>
                    ))}
                  </Row>

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
                          className={errors.category ? 'is-invalid' : ''}
                        />
                        {errors.category && (
                          <div className="invalid-feedback d-block">{errors.category}</div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formDistanceFromMainColombo" className="mb-3">
                        <Form.Label>Distance from Colombo</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter in kms"
                          name="distanceFromColombo"
                          value={destinationDetails.distanceFromColombo}
                          onChange={changeHandler}
                          isInvalid={!!errors.distanceFromColombo}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.distanceFromColombo}
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
                          value={destinationDetails.contactNumber}
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
                      <Form.Group controlId="city" className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the city"
                          name="city"
                          value={destinationDetails.city}
                          onChange={changeHandler}
                          isInvalid={!!errors.city}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.city}
                        </Form.Control.Feedback>
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
                          isInvalid={!!errors.bestTimeToVisit}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.bestTimeToVisit}
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
                          rows={10}
                          placeholder="Enter a brief description about the destination"
                          name="description"
                          value={destinationDetails.description}
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

<<<<<<< HEAD
=======
                  <Row>
                    <Col md="12">
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

>>>>>>> origin/Nimendra
                  <Button variant="primary" type="submit">
                    Add Destination
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

export default AddDestination;
