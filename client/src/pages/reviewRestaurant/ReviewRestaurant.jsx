import React, { useState } from "react"; 
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"; 

const ReviewRestaurant = () => { 
    const [reviewTitle, setReviewTitle] = useState(""); 
    const [reviewBody, setReviewBody] = useState(""); 
    const [overallRating, setOverallRating] = useState(0); 
    const [foodRating, setFoodRating] = useState(0); 
    const [serviceRating, setServiceRating] = useState(0); 
    const [valueRating, setValueRating] = useState(0); 
    const [atmosphereRating, setAtmosphereRating] = useState(0); 
    const [hoverOverallRating, setHoverOverallRating] = useState(0); 
    const [hoverFoodRating, setHoverFoodRating] = useState(0); 
    const [hoverServiceRating, setHoverServiceRating] = useState(0); 
    const [hoverValueRating, setHoverValueRating] = useState(0); 
    const [hoverAtmosphereRating, setHoverAtmosphereRating] = useState(0); 

    const maxTitleLength = 120; 
    const maxBodyLength = 1000; 
    const [selectedFamilyTypeOption, setSelectedFamilyTypeOption] = useState(""); 
    const [selectedVisitDate, setSelectedVisitDate] = useState("January 2024"); // Default value
    const [selectedPurpose, setSelectedPurpose] = useState("Select one"); // Default value

    const handleFamilyTypeOptionClick = (option) => { 
        setSelectedFamilyTypeOption(option); 
    }; 

    // Handle rating hover and click
    const handleMouseEnter = (index, type) => {
        if (type === "overall") setHoverOverallRating(index);
        else if (type === "food") setHoverFoodRating(index);
        else if (type === "service") setHoverServiceRating(index);
        else if (type === "value") setHoverValueRating(index);
        else if (type === "atmosphere") setHoverAtmosphereRating(index);
    };

    const handleMouseLeave = (type) => {
        if (type === "overall") setHoverOverallRating(0);
        else if (type === "food") setHoverFoodRating(0);
        else if (type === "service") setHoverServiceRating(0);
        else if (type === "value") setHoverValueRating(0);
        else if (type === "atmosphere") setHoverAtmosphereRating(0);
    };

    const handleRatingClick = (index, type) => {
        if (type === "overall") setOverallRating(index);
        else if (type === "food") setFoodRating(index);
        else if (type === "service") setServiceRating(index);
        else if (type === "value") setValueRating(index);
        else if (type === "atmosphere") setAtmosphereRating(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Create an object to hold all form data
        const reviewData = {
            title: reviewTitle,
            body: reviewBody,
            overall_rating: overallRating,
            food_rating: foodRating,
            service_rating: serviceRating,
            value_rating: valueRating,
            atmosphere_rating: atmosphereRating,
            family_type: selectedFamilyTypeOption,
            visit_date: selectedVisitDate,
            purpose: selectedPurpose
        };

        // Here you can send reviewData to your server or API
        console.log("Review Submitted:", reviewData);

        // Optionally reset the form fields after submission
        resetForm();
    };

    const resetForm = () => {
        setReviewTitle("");
        setReviewBody("");
        setOverallRating(0);
        setFoodRating(0);
        setServiceRating(0);
        setValueRating(0);
        setAtmosphereRating(0);
        setSelectedFamilyTypeOption("");
        setSelectedVisitDate("January 2024");
        setSelectedPurpose("Select one");
    };

    return ( 
        <Container className="my-4"> 
            <Row> 
                {/* Left Column */} 
                <Col md={4}> 
                    <Card> 
                        <Card.Img variant="top" src="https://picsum.photos/300" alt="Cafe Chill" /> 
                        <Card.Body> 
                            <Card.Title>Cafe Chill</Card.Title> 
                            <Card.Text>Wellawaya Road, Ella, Sri Lanka</Card.Text> 
                        </Card.Body> 
                    </Card> 
                </Col> 

                {/* Right Column */} 
                <Col md={8}> 
                    <Form onSubmit={handleSubmit}> 

                        {/* Overall Rating Section */} 
                        <Form.Group> 
                            <Form.Label>How would you rate your overall experience?</Form.Label> 
                            <div className="d-flex gap-2"> 
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverOverallRating || overallRating) > index ? "green" : "transparent", border: "2px solid green", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "overall")} onMouseLeave={() => handleMouseLeave("overall")} onClick={() => handleRatingClick(index + 1, "overall")} /> 
                                ))} 
                            </div> 
                            <div className="mt-2"> {overallRating > 0 && <span>You rated: {overallRating}/5</span>} </div> 
                        </Form.Group>

                        {/* Food Rating Section */}
                        <Form.Group>
                            <Form.Label>How would you rate the food?</Form.Label>
                            <div className="d-flex gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverFoodRating || foodRating) > index ? "green" : "transparent", border: "2px solid green", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "food")} onMouseLeave={() => handleMouseLeave("food")} onClick={() => handleRatingClick(index + 1, "food")} />
                                ))}
                            </div>
                            <div className="mt-2"> {foodRating > 0 && <span>You rated the food: {foodRating}/5</span>} </div>
                        </Form.Group>

                        {/* Service Rating Section */}
                        <Form.Group>
                            <Form.Label>How would you rate the service?</Form.Label>
                            <div className="d-flex gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverServiceRating || serviceRating) > index ? "green" : "transparent", border: "2px solid green", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "service")} onMouseLeave={() => handleMouseLeave("service")} onClick={() => handleRatingClick(index + 1, "service")} />
                                ))}
                            </div>
                            <div className="mt-2"> {serviceRating > 0 && <span>You rated the service: {serviceRating}/5</span>} </div>
                        </Form.Group>

                        {/* Value Rating Section */}
                        <Form.Group>
                            <Form.Label>How would you rate the value for money?</Form.Label>
                            <div className="d-flex gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverValueRating || valueRating) > index ? "green" : "transparent", border: "2px solid green", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "value")} onMouseLeave={() => handleMouseLeave("value")} onClick={() => handleRatingClick(index + 1, "value")} />
                                ))}
                            </div>
                            <div className="mt-2"> {valueRating > 0 && <span>You rated the value for money: {valueRating}/5</span>} </div>
                        </Form.Group>

                        {/* Atmosphere Rating Section */}
                        <Form.Group>
                            <Form.Label>How would you rate the atmosphere?</Form.Label>
                            <div className="d-flex gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverAtmosphereRating || atmosphereRating) > index ? "green" : "transparent", border: "2px solid green", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "atmosphere")} onMouseLeave={() => handleMouseLeave("atmosphere")} onClick={() => handleRatingClick(index + 1, "atmosphere")} />
                                ))}
                            </div>
                            <div className="mt-2"> {atmosphereRating > 0 && <span>You rated the atmosphere: {atmosphereRating}/5</span>} </div>
                        </Form.Group>

                        {/* Dropdowns for Visit Date and Family Type */} 
                        <Row className="mt-3"> 
                            <Col md={6}> 
                                <Form.Group> 
                                    <Form.Label>When did you go?</Form.Label> 
                                    <Form.Select value={selectedVisitDate} onChange={(e) => setSelectedVisitDate(e.target.value)}>  
                                        <option>January 2024</option>  
                                        <option>February 2024</option>  
                                        <option>March 2024</option>  
                                        <option>April 2024</option>  
                                        <option>May 2024</option>  
                                        <option>June 2024</option>  
                                        <option>July 2024</option>
                                        <option>Auguest 2024</option>
                                        <option>September 2024</option>
                                        <option>October 2024</option>
                                        <option>November 2024</option>
                                        <option>December 2024</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>  
                                <Form.Group>
                                    <Form.Label>Who did you go with?</Form.Label>
                                    <div className="d-flex gap-2">
                                        {["Solo", "Family", "Friends", "Couple", "Business"].map((option) => (
                                            <Button key={option} variant={selectedFamilyTypeOption === option ? "primary" : "outline-primary"} onClick={() => handleFamilyTypeOptionClick(option)}>
                                                {option}
                                            </Button>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Purpose of Visit */}  
                        <Form.Group className="mt-3">  
                            <Form.Label>What were you here for?</Form.Label>
                            <Form.Select value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)}>
                                <option>Select one</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Casual Outing</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Review Title */}  
                        <Form.Group className="mt-3">  
                            <Form.Label> Title your review{" "}   
                                <span className="text-muted"> ({reviewTitle.length}/{maxTitleLength}) </span></Form.Label>
                            <Form.Control type="text" placeholder="Give us the gist of your experience" maxLength={maxTitleLength} value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} />
                        </Form.Group>

                        {/* Review Text Block */}  
                        <Form.Group className="mt-3">  
                            <Form.Label> Write your review{" "}   
                                <span className="text-muted"> ({reviewBody.length}/{maxBodyLength}) </span></Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="This spot is great for a casual night out..." maxLength={maxBodyLength} value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} />
                        </Form.Group>

                        {/* Submit Button */}  
                        <Button variant="primary" type="submit" className="mt-4"> Submit Review </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    ); 
}; 

export default ReviewRestaurant;
