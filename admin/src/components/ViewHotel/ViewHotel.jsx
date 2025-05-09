import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import AdminLogo from "../../assets/TravelMateAdminLogo.png";

const ViewHotel = () => {

  const { id } = useParams(); // Extract the id from the URL
  const navigate = useNavigate();
  const [cardImage, setCardImage] = useState(null);
  const [accommodationDetails, setAccommodationDetails] = useState({
    name: "",
    category: "",
    address: "",
    contactNumber: "",
    distance_from_city: "",
    perPerson_price: "",
    description: "",
    image: "",
    images: [], // Initialize images as an empty array
  });

  // Fetch accommodation details when the component mounts
  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/travelmate/viewAccommodation/${id}`
        );

        if (response.data.success) {
          // console.log("======================================");

          // console.log(response.data.data);
          // console.log("======================================");


          setAccommodationDetails(response.data.data);
          setCardImage(response.data.data.cardImage);
        } else {
          alert(response.data.message || "Failed to fetch accommodation details.");
        }
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };

    fetchAccommodationDetails();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccommodationDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    try {
      console.log("accommodationDetails", accommodationDetails);
      console.log("accommodationDetails", accommodationDetails.images);


      const uploadedImages = await uploadImagesToCloudinary(accommodationDetails.images);

      accommodationDetails.images = uploadedImages;

      console.log("accommodationDetails", accommodationDetails);

      const response = await axios.put(
        `http://localhost:3000/travelmate/updateAccommodation/${id}`,
        accommodationDetails
      );

      if (response.data.success) {
        alert("Accommodation details updated successfully!");
        navigate("/hotel-data-table"); // Navigate back to the admin accommodations page
      } else {
        alert(response.data.message || "Failed to update accommodation details.");
      }
    } catch (error) {
      console.error("Error updating accommodation details:", error);
      alert("An error occurred while saving changes.");
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setSelectedImages(prevImages => [...prevImages, ...newPreviewUrls]);
    setAccommodationDetails(prev => ({
      ...prev,
      images: [...(prev.images || []), ...newFiles]
    }));
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setAccommodationDetails(prevState => ({
      ...prevState,
      images: prevState?.images?.filter((_, index) => index !== indexToRemove)
    }));
  };


  const axiosCloudinary = axios.create();

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
    <div style={{ marginTop: "550px" }}>
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
                Edit Accommodation Details
              </h2>

              <Container style={{ maxWidth: "100%" }}>
                <Form>
                  <Row>
                    <Col md="6">
                      <Form.Group
                        controlId="formAccommodationName"
                        className="mb-3"
                      >
                        <Form.Label>Accommodation Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Accommodation Name"
                          name="name"
                          value={accommodationDetails.name}
                          onChange={handleChange}
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
                          type="text"
                          placeholder="Category"
                          name="category"
                          value={accommodationDetails.category}
                          onChange={handleChange}
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
                      <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Address"
                          name="address"
                          value={accommodationDetails.address}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            borderWidth: "2px",
                            resize: "none",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group
                        controlId="formContactNumber"
                        className="mb-3"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Contact Number"
                          name="contactNumber"
                          value={accommodationDetails.contactNumber}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group
                        controlId="formDistanceFromMainCity"
                        className="mb-3"
                      >
                        <Form.Label>Distance from Main City (KM)</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Distance"
                          name="distance_from_city"
                          value={accommodationDetails.distance_from_city}
                          onChange={handleChange}
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
                        <Form.Control
                          type="text"
                          placeholder="Price"
                          name="perPerson_price"
                          value={accommodationDetails.perPerson_price}
                          onChange={handleChange}
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
                          placeholder="Description"
                          name="description"
                          value={accommodationDetails.description}
                          onChange={handleChange}
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
                      <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <div>
                          <img
                            src={cardImage || accommodationDetails.image}
                            alt="Accommodation"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      </Form.Group>
                    </Col>


                  </Row>


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

                  <div className="mb-4">
                    <label className="form-label">Room Images</label>
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

                  <Button
                    variant="primary"
                    onClick={handleSaveChanges}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                  >
                    Save Changes
                  </Button>




                  <Button className="mx-4"
                    variant="primary"
                    onClick={() => navigate("/manage-rooms", { state: { accommodationDetails } })}
                    style={{
                      borderRadius: "10px",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                  >
                    Manage Rooms
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

export default ViewHotel;





