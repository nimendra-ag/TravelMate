import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ReviewRestaurant = () => {
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const maxTitleLength = 120;
    const maxBodyLength = 1000;

    const [selectedFamilyTypeOption, setSelectedFamilyTypeOption] = useState("");

    const handleFamilyTypeOptionClick = (option) => {
        setSelectedFamilyTypeOption(option);
    };

    const handleMouseEnter = (index) => {
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleRatingClick = (index) => {
        setRating(index);
    };

    return (
        <Container className="my-4">
            <Row>
                {/* Left Column */}
                <Col md={4}>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="https://picsum.photos/300" // Replace with an actual image URL
                            alt="Cafe Chill"
                        />
                        <Card.Body>
                            <Card.Title>Cafe Chill</Card.Title>
                            <Card.Text>Wellawaya Road, Ella, Sri Lanka</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Column */}
                <Col md={8}>
                    <Form>
                        {/* Rating Section */}
                        <Form.Group>
                            <Form.Label>How would you rate your experience?</Form.Label>
                            <div className="d-flex gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className="rating-circle"
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            borderRadius: "50%",
                                            backgroundColor:
                                                (hoverRating || rating) > index
                                                    ? "green"
                                                    : "transparent",
                                            border: "2px solid green",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={() => handleMouseEnter(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleRatingClick(index + 1)}
                                    />
                                ))}
                            </div>
                            <div className="mt-2">
                                {rating > 0 && <span>You rated: {rating}/5</span>}
                            </div>
                        </Form.Group>

                        {/* Dropdowns */}
                        <Row className="mt-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>When did you go?</Form.Label>
                                    <Form.Select>
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
                                            <Button
                                                key={option}
                                                variant={selectedFamilyTypeOption === option ? "primary" : "outline-primary"}
                                                onClick={() => handleFamilyTypeOptionClick(option)}
                                            >
                                                {option}
                                            </Button>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Review Text Area */}
                        <Form.Group className="mt-3">
                            <Form.Label>What were you here for?</Form.Label>
                            <Form.Select>
                                <option>Select one</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Casual Outing</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Review Title */}
                        <Form.Group className="mt-3">
                            <Form.Label>
                                Title your review{" "}
                                <span className="text-muted">
                                    ({reviewTitle.length}/{maxTitleLength})
                                </span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Give us the gist of your experience"
                                maxLength={maxTitleLength}
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                            />
                        </Form.Group>

                        {/* Review Text Block */}
                        <Form.Group className="mt-3">
                            <Form.Label>
                                Write your review{" "}
                                <span className="text-muted">
                                    ({reviewBody.length}/{maxBodyLength})
                                </span>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="This spot is great for a casual night out..."
                                maxLength={maxBodyLength}
                                value={reviewBody}
                                onChange={(e) => setReviewBody(e.target.value)}
                            />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="mt-4">
                            Submit Review
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ReviewRestaurant;
