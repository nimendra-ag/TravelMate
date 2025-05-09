import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";

const ViewDestination = () => {

  const [selectedImages, setSelectedImages] = useState([]);
  const { id } = useParams(); // Extract the ID from the URL
  const navigate = useNavigate();

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
    images: [],
  });

  const categoryOptions = [
    { value: "Nature and Outdoors", label: "Nature and Outdoors" },
    { value: "Cultural and Historical", label: "Cultural and Historical" },
    { value: "Adventure and Activities", label: "Adventure and Activities" },
    { value: "Urban and Entertainment", label: "Urban and Entertainment" },
    { value: "Relaxation and Wellness", label: "Relaxation and Wellness" },
    {
      value: "Food and Drink Experiences",
      label: "Food and Drink Experiences",
    },
    { value: "Other", label: "Other" },
  ];

  // Fetch destination details when the component mounts
  useEffect(() => {
    const fetchDestinationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/travelmate/viewDestination/${id}`);
        if (response.data.success) {
          setDestinationDetails(response.data.data);
        } else {
          alert(response.data.message || "Failed to fetch destination details.");
        }
      } catch (error) {
        console.error("Error fetching destination details:", error);
      }
    };

    fetchDestinationDetails();
  }, [id]);

  const handleMultiSelectChange = (selectedOptions, field) => {
    setDestinationDetails({
      ...destinationDetails,
      [field]: selectedOptions.map((option) => option.value),
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDestinationDetails({ ...destinationDetails, [name]: value });
  };

  const handleTimeChange = (e, index, timeType) => {
    const updatedOpeningHours = [...destinationDetails.openingHours];
    updatedOpeningHours[index][timeType] = e.target.value;
    setDestinationDetails({
      ...destinationDetails,
      openingHours: updatedOpeningHours,
    });
  };

  const handleSaveChanges = async () => {
    const uploadedImages = await uploadImagesToCloudinary(destinationDetails.images);

      destinationDetails.images = uploadedImages;

      console.log("destinationDetails", destinationDetails);
      
    try {
      const response = await axios.put(
        `http://localhost:3000/travelmate/updateDestination/${id}`,
        destinationDetails
      );

      if (response.data.success) {
        alert("Destination updated successfully!");
        navigate("/destinations"); // Redirect after saving
      } else {
        alert(response.data.message || "Failed to update destination.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setSelectedImages(prevImages => [...prevImages, ...newPreviewUrls]);
    setDestinationDetails(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newFiles]
    }));
  };


  const removeImage = (indexToRemove) => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setDestinationDetails(prevState => ({
      ...prevState,
      images: prevState?.images?.filter((_, index) => index !== indexToRemove)
    }));
  };




  const uploadImagesToCloudinary = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "preset-for-file-upload");
        formData.append("cloud_name", "dqbkxghlh");

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
            formData
        );

        if (response.status === 200) {
            uploadedUrls.push(response.data.secure_url);
        }
    }
    return uploadedUrls;
};

  return (
    <Container style={{ marginTop: "60px" }}>
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
                  src={AdminLogo}
                  alt="Icon"
                  style={{ height: "98px", paddingBottom: "33px" }}
                />
              </div>
              <h2 className="fw-bold" style={{ paddingBottom: "25px" }}>
                Update Destination
              </h2>

              <Form>
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
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                          borderWidth: "2px",
                        }}
                      />
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
                  {destinationDetails.openingHours.map((day, index) => (
                    <Col md="6" key={index} className="mb-3">
                      <Form.Group controlId={`formOpeningHours-${index}`}>
                        <Form.Label>Opening Hours</Form.Label>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <Form.Control
                            type="time"
                            name="startTime"
                            value={day.startTime}
                            onChange={(e) =>
                              handleTimeChange(e, index, "startTime")
                            }
                          />
                          <Form.Control
                            type="time"
                            name="endTime"
                            value={day.endTime}
                            onChange={(e) =>
                              handleTimeChange(e, index, "endTime")
                            }
                          />
                        </div>
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
                        onChange={(selectedOptions) =>
                          handleMultiSelectChange(selectedOptions, "category")
                        }
                      />
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
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                          borderWidth: "2px",
                        }}
                      />
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
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                          borderWidth: "2px",
                        }}
                      />
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
                        style={{
                          borderRadius: "10px",
                          height: "50px",
                          borderWidth: "2px",
                        }}
                      />
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
                        rows={10}
                        placeholder="Enter a brief description about the destination"
                        name="description"
                        value={destinationDetails.description}
                        onChange={changeHandler}
                        style={{
                          borderRadius: "10px",
                          height: "150px",
                          borderWidth: "2px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <div className="mb-4">
                    <label className="form-label">Destination Images</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      multiple
                      style={{ color: 'transparent' }}
                    />
                  </div>

                  {selectedImages.length > 0 && (
                    <div className="mb-4">
                      <label className="form-label">Image Preview</label>
                      <div className="d-flex flex-wrap gap-3">
                        {selectedImages.map((image, index) => (
                          <div
                            key={index}
                            className="position-relative"
                            style={{ maxWidth: '300px' }}
                          >
                            <img
                              src={image}
                              alt={`Room preview ${index + 1}`}
                              className="img-fluid rounded"
                              style={{ width: '100%', height: 'auto' }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                              onClick={() => removeImage(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Row>

                <Button
                  variant="primary"
                  onClick={handleSaveChanges}
                  
                >
                  Save Changes
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </header>
    </Container>
    );
};

export default ViewDestination;
