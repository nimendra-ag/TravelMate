import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const AddPrePlannedTrips = () => {
  const [prePlannedTripDetails, setPrePlannedTripDetails] = useState({
    name: "",
    mainDestinations: [""],
    guides: [""],
    mainActivities: [""],
    price: "",
    duration: "",
    noOfTravelers: "",
    startTime: "",
    startLocation: "",
    endTime: "",
    endLocation: "",
    description: "",
    // availableDates: "",
    contactNumber: "",
    whatsExpected: "",
    whatsIncluded: "",
    additionalInfo: "",
    cancellationPolicy: "",
    help: "",
  });

  const [selectedActivityImages, setSelectedActivityImages] = useState([]);
  const [selectedMainImage, setSelectedMainImage] = useState(null); // Changed to single object
  const [activityImagesToUpload, setActivityImagesToUpload] = useState([]);
  const [mainImageToUpload, setMainImageToUpload] = useState(null); // Changed to single file

  // Handle single input field change
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPrePlannedTripDetails({ ...prePlannedTripDetails, [name]: value });
  };

  // Update the cleanup useEffect
  useEffect(() => {
    return () => {
      // Clean up activity images
      selectedActivityImages.forEach((image) => {
        if (image.url) {
          URL.revokeObjectURL(image.url);
        }
      });

      // Clean up main image
      if (selectedMainImage?.url) {
        URL.revokeObjectURL(selectedMainImage.url);
      }
    };
  }, [selectedActivityImages, selectedMainImage]);

  // Create separate handlers for each image type
  const handleActivityImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file: file,
    }));
    setSelectedActivityImages((prev) => [...prev, ...newImages]);
    setActivityImagesToUpload((prev) => [...prev, ...files]);
  };

  const handleMainImageChange = (e) => {
    // First, clean up any existing main image URL
    if (selectedMainImage?.url) {
      URL.revokeObjectURL(selectedMainImage.url);
    }

    // Only take the first file
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
        file: file,
      };
      setSelectedMainImage(newImage);
      setMainImageToUpload(file);
    }
  };

  // Create separate remove handlers
  const removeActivityImage = (id) => {
    setSelectedActivityImages((prevImages) => {
      const imageToRemove = prevImages.find((img) => img.id === id);
      if (imageToRemove?.url) URL.revokeObjectURL(imageToRemove.url);
      return prevImages.filter((img) => img.id !== id);
    });

    const indexToRemove = selectedActivityImages.findIndex(
      (img) => img.id === id
    );
    if (indexToRemove !== -1) {
      setActivityImagesToUpload((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const removeMainImage = () => {
    if (selectedMainImage?.url) {
      URL.revokeObjectURL(selectedMainImage.url);
    }
    setSelectedMainImage(null);
    setMainImageToUpload(null);
  };

  // Handle array input change for guides and mainDestinations
  const handleArrayChange = (index, e, field) => {
    const { value } = e.target;
    const list = [...prePlannedTripDetails[field]];
    list[index] = value;
    setPrePlannedTripDetails({ ...prePlannedTripDetails, [field]: list });
  };

  // Add a new field for guides or mainDestinations
  const addArrayField = (field) => {
    setPrePlannedTripDetails({
      ...prePlannedTripDetails,
      [field]: [...prePlannedTripDetails[field], ""],
    });
  };

  // Remove a field from guides or mainDestinations
  const removeArrayField = (index, field) => {
    const list = [...prePlannedTripDetails[field]];
    list.splice(index, 1);
    setPrePlannedTripDetails({ ...prePlannedTripDetails, [field]: list });
  };

  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];
    console.log("Just outside the loop");
    console.log(files);

    // Handle array of files (activity images)
    if (Array.isArray(files)) {
      for (const file of files) {
        console.log("within the loop");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "preset-for-file-upload");
        formData.append("cloud_name", "dz4wm9iug");
        const response = await axios
          .post(
            "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
            formData
          )
          .catch((error) => {
            console.log("Error uploading image", error);
          });
        if (response && response.status === 200) {
          uploadedUrls.push({
            imageUrl: response.data.secure_url,
          });
        }
      }
    }
    // Handle single file (main image)
    else if (files) {
      console.log("uploading single file");
      const formData = new FormData();
      formData.append("file", files);
      formData.append("upload_preset", "preset-for-file-upload");
      formData.append("cloud_name", "dz4wm9iug");
      const response = await axios
        .post(
          "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
          formData
        )
        .catch((error) => {
          console.log("Error uploading image", error);
        });
      if (response && response.status === 200) {
        uploadedUrls.push({
          imageUrl: response.data.secure_url,
        });
      }
    }

    return uploadedUrls;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedActivityImages = await uploadImagesToCloudinary(
      activityImagesToUpload
    );

    const uploadedMainImage = await uploadImagesToCloudinary(mainImageToUpload);

    prePlannedTripDetails.activityImages = uploadedActivityImages.map(
      (image) => image.imageUrl
    );

    prePlannedTripDetails.mainImage =
      uploadedMainImage.length > 0 ? uploadedMainImage[0].imageUrl : "";

    console.log("Form submitted", prePlannedTripDetails);

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/addPrePlannedTrips",
        prePlannedTripDetails
      );
      console.log("Trip added successfully", response.data);
      // Show success message
      setSuccessMessage("Form submitted successfully!");
      // Clear the form fields
      setPrePlannedTripDetails({
        name: "",
        mainDestinations: [""],
        guides: [""],
        mainActivities: [""],
        price: "",
        duration: "",
        noOfTravelers: "",
        startTime: "",
        startLocation: "",
        endTime: "",
        endLocation: "",
        description: "",
        availableDates: "",
        contactNumber: "",
        whatsExpected: "",
        whatsIncluded: "",
        additionalInfo: "",
        cancellationPolicy: "",
        help: "",
      });

      // Clear images
      setSelectedActivityImages([]);
      setSelectedMainImage(null);
      setActivityImagesToUpload([]);
      setMainImageToUpload(null);

      // Optionally refresh the page after 2 seconds
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after 2 seconds
        // navigate("/"); // Redirect or refresh the page - uncomment if you have navigate defined
      }, 2000);
    } catch (error) {
      console.log("Error adding trip", error);
    }
  };

  return (
    <div className="AddPrePlannedTrips" style={{ marginTop: "1000px" }}>
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
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Add Pre-planned Trip
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formTripName" className="mb-3">
                        <Form.Label>Trip Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the trip name"
                          name="name"
                          value={prePlannedTripDetails.name}
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
                        <Form.Label>Price per person ($)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter the price"
                          name="price"
                          value={prePlannedTripDetails.price}
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
                    <Col md="6">
                      <Form.Group
                        controlId="formNoOfTravelers"
                        className="mb-3"
                      >
                        <Form.Label>No. of travelers</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter the no of maximum travelers"
                          name="noOfTravelers"
                          value={prePlannedTripDetails.noOfTravelers}
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
                      <Form.Group controlId="formDuration" className="mb-3">
                        <Form.Label>Duration (No. of days)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter the trip duration"
                          name="duration"
                          value={prePlannedTripDetails.duration}
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
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formStartLocation"
                        className="mb-3"
                      >
                        <Form.Label>Start Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter start location"
                          name="startLocation"
                          value={prePlannedTripDetails.startLocation}
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
                      <Form.Group controlId="formStartTime" className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="startTime"
                          value={prePlannedTripDetails.startTime}
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
                    <Col md="6">
                      <Form.Group controlId="formEndLocation" className="mb-3">
                        <Form.Label>End Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter end location"
                          name="endLocation"
                          value={prePlannedTripDetails.endLocation}
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
                      <Form.Group controlId="formEndTime" className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="endTime"
                          value={prePlannedTripDetails.endTime}
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
                  {/* <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formAvailableDates"
                        className="mb-3"
                      >
                        <Form.Label>Available days</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Eg: Every Saturday"
                          name="availableDates"
                          value={prePlannedTripDetails.availableDates}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter trip description"
                          name="description"
                          value={prePlannedTripDetails.description}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formContactNumber"
                        className="mb-3"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter contact number"
                          name="contactNumber"
                          value={prePlannedTripDetails.contactNumber}
                          onChange={changeHandler}
                          maxLength="10"
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* Guides Input Fields */}
                  <Row>
                    <Col md="12">
                      <Form.Label>Guides</Form.Label>
                      {prePlannedTripDetails.guides.map((guide, index) => (
                        <Row key={index} className="mb-2">
                          <Col md="10">
                            <Form.Control
                              type="text"
                              placeholder={`Enter guide ${index + 1}`}
                              value={guide}
                              onChange={(e) =>
                                handleArrayChange(index, e, "guides")
                              }
                            />
                          </Col>
                          <Col md="2">
                            <Button
                              variant="danger"
                              onClick={() => removeArrayField(index, "guides")}
                            >
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        variant="secondary"
                        onClick={() => addArrayField("guides")}
                      >
                        Add Guide
                      </Button>
                    </Col>
                  </Row>

                  {/* Main Destinations Input Fields */}
                  <Row className="mt-4">
                    <Col md="12">
                      <Form.Label>Main Destinations</Form.Label>
                      {prePlannedTripDetails.mainDestinations.map(
                        (destination, index) => (
                          <Row key={index} className="mb-2">
                            <Col md="10">
                              <Form.Control
                                type="text"
                                placeholder={`Enter destination ${index + 1}`}
                                value={destination}
                                onChange={(e) =>
                                  handleArrayChange(
                                    index,
                                    e,
                                    "mainDestinations"
                                  )
                                }
                              />
                            </Col>
                            <Col md="2">
                              <Button
                                variant="danger"
                                onClick={() =>
                                  removeArrayField(index, "mainDestinations")
                                }
                              >
                                Remove
                              </Button>
                            </Col>
                          </Row>
                        )
                      )}

                      <Button
                        variant="secondary"
                        onClick={() => addArrayField("mainDestinations")}
                      >
                        Add Destination
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group
                        controlId="formWhatsExpected"
                        className="mb-3"
                      >
                        <Form.Label>What's Expected</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter what's Expected"
                          name="whatsExpected"
                          value={prePlannedTripDetails.whatsExpected}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                            whiteSpace: "pre-line",
                          }}
                        />
                        <Row>
                          <Col md="12">
                            <Form.Label>Things to do</Form.Label>
                            {prePlannedTripDetails.mainActivities.map(
                              (mainActivity, index) => (
                                <Row key={index} className="mb-2">
                                  <Col md="10">
                                    <Form.Control
                                      type="text"
                                      placeholder={`Enter 3 things to do during the trip ${
                                        index + 1
                                      }`}
                                      value={mainActivity}
                                      onChange={(e) =>
                                        handleArrayChange(
                                          index,
                                          e,
                                          "mainActivities"
                                        )
                                      }
                                    />
                                  </Col>
                                  <Col md="2">
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        removeArrayField(
                                          index,
                                          "mainActivities"
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </Col>
                                </Row>
                              )
                            )}
                            <Button
                              variant="secondary"
                              onClick={() => addArrayField("mainActivities")}
                            >
                              Add Activity
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group
                        controlId="formWhatsIncluded"
                        className="mb-3"
                      >
                        <Form.Label>What's Included</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter what's included"
                          name="whatsIncluded"
                          value={prePlannedTripDetails.whatsIncluded}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group
                        controlId="formAdditionalInfo"
                        className="mb-3"
                      >
                        <Form.Label>Additional Infomation</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter additional info"
                          name="additionalInfo"
                          value={prePlannedTripDetails.additionalInfo}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group
                        controlId="formCancellationPolicy"
                        className="mb-3"
                      >
                        <Form.Label>Cancellation Policy</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter cancellation policy"
                          name="cancellationPolicy"
                          value={prePlannedTripDetails.cancellationPolicy}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group controlId="formHelp" className="mb-3">
                        <Form.Label>Help</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter Help Infomation"
                          name="help"
                          value={prePlannedTripDetails.help}
                          onChange={changeHandler}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    {/* Activity Images */}
                    <Form.Group controlId="formActivityImages" className="mb-3">
                      <Form.Label>Upload Activity Images</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleActivityImageChange}
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                          borderWidth: "2px",
                          color: "transparent",
                        }}
                      />
                    </Form.Group>
                    {selectedActivityImages.length > 0 && (
                      <div style={{ marginBottom: "2rem" }}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(200px, 1fr))",
                            gap: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          {selectedActivityImages.map((image) => (
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
                              onMouseOver={(e) =>
                                (e.currentTarget.style.transform =
                                  "scale(1.02)")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
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
                                  removeActivityImage(image.id);
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

                    {/* Main Image - MODIFIED to only accept one image */}
                    <Form.Group controlId="formMainImage" className="mb-3">
                      <Form.Label>Upload Main Image</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                          borderWidth: "2px",
                          color: "transparent",
                        }}
                      />
                    </Form.Group>

                    {/* Main Image Preview - MODIFIED for single image */}
                    {selectedMainImage && (
                      <div style={{ marginBottom: "2rem" }}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(200px, 1fr)",
                            gap: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <div
                            key={selectedMainImage.id}
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
                            onMouseOver={(e) =>
                              (e.currentTarget.style.transform = "scale(1.02)")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          >
                            <img
                              src={selectedMainImage.url}
                              alt={`Preview ${selectedMainImage.id}`}
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
                                removeMainImage();
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
                        </div>
                      </div>
                    )}
                  </Row>

                  {successMessage && (
                    <div style={{ color: "green", marginTop: "20px" }}>
                      {successMessage}
                    </div>
                  )}
                  <Button variant="primary" onClick={handleSubmit}>
                    Add Trip
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

export default AddPrePlannedTrips;
