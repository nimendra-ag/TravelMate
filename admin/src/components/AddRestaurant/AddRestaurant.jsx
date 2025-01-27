import React, { useState } from "react";
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

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
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

  const categoryOptions = [
    { value: "Seafood", label: "Seafood" },
    { value: "Spicy", label: "Spicy" },
    { value: "vegetarian and vegan ", label: "vegetarian and vegan " },
    { value: "Village Flavor", label: "Village Flavor" },
    { value: "Sweet", label: "Sweet" },
    { value: "Street Food", label: "Street Food" },
    { value: "tea culture ", label: "tea culture " },
  ];

  const priceRangeOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const mainCategoryOptions = [
    { value: "DateNight", label: "DateNight" },
    { value: "Fine Dining", label: "Fine Dining" },
    { value: "Vegan & Veg", label: "Vegan & Veg" },
    { value: "Casual Dining", label: "Casual Dining" },
    { value: "Outside", label: "Outside" },
  ];

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!restaurantDetails.name.trim()) {
      tempErrors.name = "Restaurant name is required";
      isValid = false;
    }

    if (!restaurantDetails.website.trim()) {
      tempErrors.website = "Website URL is required";
      isValid = false;
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(restaurantDetails.website)) {
      tempErrors.website = "Please enter a valid URL";
      isValid = false;
    }

    if (!restaurantDetails.openingHours[0].startTime || !restaurantDetails.openingHours[0].endTime) {
      tempErrors.openingHours = "Opening hours are required";
      isValid = false;
    }

    if (restaurantDetails.category.length === 0) {
      tempErrors.category = "Please select at least one category";
      isValid = false;
    }

    if (restaurantDetails.priceRange.length === 0) {
      tempErrors.priceRange = "Please select price range";
      isValid = false;
    }

    if (!restaurantDetails.mainCategory) {
      tempErrors.mainCategory = "Main category is required";
      isValid = false;
    }

    if (!restaurantDetails.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(restaurantDetails.contactNumber)) {
      tempErrors.contactNumber = "Contact number must be 10 digits";
      isValid = false;
    }

    if (!restaurantDetails.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(restaurantDetails.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!restaurantDetails.address.trim()) {
      tempErrors.address = "Address is required";
      isValid = false;
    }

    if (!restaurantDetails.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleMultiSelectChange = (selectedOptions, action) => {
    setRestaurantDetails({
      ...restaurantDetails,
      [action.name]: selectedOptions.map((option) => option.value),
    });
    if (errors[action.name]) {
      setErrors({
        ...errors,
        [action.name]: "",
      });
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setRestaurantDetails({
      ...restaurantDetails,
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
    const updatedOpeningHours = [...restaurantDetails.openingHours];
    updatedOpeningHours[index][timeType] = e.target.value;
    setRestaurantDetails({
      ...restaurantDetails,
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
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-restaurant",
        restaurantDetails
      );

      if (response.data.success) {
        alert("Restaurant added successfully!");
        setRestaurantDetails({
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
        window.location.reload();
      }
    } catch (error) {
      console.log("Error adding restaurant", error);
    }
  };

  return (
    <div className="AddRestaurant" style={{marginTop:'200px'}}>
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
                    <Col md="6">
                      <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the new restaurant"
                          name="name"
                          value={restaurantDetails.name}
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
                        <Form.Label>Website url</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter website url"
                          name="website"
                          value={restaurantDetails.website}
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
                    {restaurantDetails.openingHours.map((day, index) => (
                      <Col md="6" key={index} className="mb-3">
                        <Form.Group controlId={`formOpeningHours-${index}`}>
                          <Form.Label>Opening hours</Form.Label>
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
                            restaurantDetails.category.includes(option.value)
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
                      <Form.Group controlId="formPriceRange" className="mb-3">
                        <Form.Label>Price Range</Form.Label>
                        <Select
                          isMulti
                          name="priceRange"
                          options={priceRangeOptions}
                          value={priceRangeOptions.filter((option) =>
                            restaurantDetails.priceRange.includes(option.value)
                          )}
                          onChange={handleMultiSelectChange}
                          className={errors.priceRange ? 'is-invalid' : ''}
                        />
                        {errors.priceRange && (
                          <div className="invalid-feedback d-block">{errors.priceRange}</div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group controlId="formMainCategory" className="mb-3">
                        <Form.Label>Main Category</Form.Label>
                        <Select
                          name="mainCategory"
                          options={mainCategoryOptions}
                          value={mainCategoryOptions.find(
                            (option) => option.value === restaurantDetails.mainCategory
                          )}
                          onChange={(selectedOption) =>
                            setRestaurantDetails({
                              ...restaurantDetails,
                              mainCategory: selectedOption ? selectedOption.value : "",
                            })
                          }
                          isClearable
                          className={errors.mainCategory ? 'is-invalid' : ''}
                        />
                        {errors.mainCategory && (
                          <div className="invalid-feedback d-block">{errors.mainCategory}</div>
                        )}
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
                          value={restaurantDetails.contactNumber}
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
                      <Form.Group controlId="email" className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter email address"
                          name="email"
                          value={restaurantDetails.email}
                          onChange={changeHandler}
                          isInvalid={!!errors.email}
                          style={{
                            borderRadius: "10px",
                            height: "50px",
                            borderWidth: "2px",
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group controlId="formAddress" className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter address"
                          name="address"
                          value={restaurantDetails.address}
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

                    <Col md="12">
                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={10}
                          placeholder="Enter a brief description about the restaurant"
                          name="description"
                          value={restaurantDetails.description}
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

