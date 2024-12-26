import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "./RestaurantDetails.css"; // Add custom CSS here
import { Link } from "react-router-dom";

const RestaurantDetails = () => {
  // A helper function to render blue dots for ratings
  const renderRatingDots = (rating) => {
    const fullDots = Math.floor(rating);
    const halfDot = rating % 1 !== 0; // Check if there's a half rating
    const maxDots = 5; // Maximum rating

    return (
      <div className="rating-dots d-flex justify-content-end">
        {[...Array(fullDots)].map((_, index) => (
          <span key={`full-${index}`} className="rating-dot full"></span>
        ))}
        {halfDot && <span className="rating-dot half"></span>}
        {[...Array(maxDots - fullDots - (halfDot ? 1 : 0))].map((_, index) => (
          <span key={`empty-${index}`} className="rating-dot empty"></span>
        ))}
      </div>
    );
  };

  return (
    <>
    <Container className="my-4">
      <Row>
        <Col lg={4} md={12} className="mb-3 d-flex">
          <Card className="w-100 h-100">
            <Card.Body>
              <Card.Title>Ratings and Reviews</Card.Title>
              <h4>4.5</h4>
              <p>16,096 reviews</p>
              <p>#2 of 180 Restaurants in Ella</p>
              <p>Travelers' Choice Best of the Best 2024</p>
              <ListGroup className="ratings-list">
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Food
                  {renderRatingDots(4.5)}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Service
                  {renderRatingDots(4)}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Value
                  {renderRatingDots(3.5)}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Atmosphere
                  {renderRatingDots(5)}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        {/* Other Cards */}
        <Col lg={4} md={12} className="mb-3 d-flex">
          <Card className="w-100 h-100">
            <Card.Body>
              <Card.Title>Details</Card.Title>
              <p><strong>Price Range:</strong> $3.00 - $11.00</p>
              <p><strong>Cuisines:</strong> International, Healthy, Sri Lankan</p>
              <p><strong>Special Diets:</strong> Vegetarian Friendly, Vegan Options, Gluten Free</p>
              <a href="#">View all details</a>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={12} className="mb-3 d-flex">
          <Card className="w-100 h-100">
            <Card.Body>
              <Card.Title>Location and Contact</Card.Title>
              <p>Wellawaya Road, Ella 90090, Sri Lanka</p>
              <p><a href="#">Website</a> | <a href="#">Email</a></p>
              <p>Phone: +94 77 180 4020</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Details</Card.Title>
              <Row>
                <Col md={6}>
                  <p><strong>About:</strong></p>
                  <p>
                    Cafe Chill is nestled in the heart of Ella and offers delicious international cuisine.
                    The restaurant presents an ambience that mellows the soul and even offers a chill-out
                    space on the third floor to relax and take in positive Ella vibes.
                  </p>
                </Col>
                <Col md={6}>
                  <p><strong>Meals:</strong> Breakfast, Lunch, Dinner, Brunch, Late Night, Drinks</p>
                  <p><strong>Features:</strong> Takeout, Reservations, Outdoor Seating, Table Service</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
        
    
    </>
  );
};

export default RestaurantDetails;
