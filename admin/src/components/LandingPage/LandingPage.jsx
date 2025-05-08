import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/TravelMateAdminLogo.png';

const LandingPage = () => {
  return (
    <div className="landing-page bg-light" style={{ minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <img 
              src={logo} 
              alt="Travel Mate Logo" 
              width="120" 
              height="120" 
              className="mb-4"
            />
            <h1 className="display-4 fw-bold">Travel Mate Admin Portal</h1>
            <p className="lead text-muted">
              Manage your travel business with our comprehensive admin dashboard.
              Control hotels, guides, transportation, destinations, and more.
            </p>
            <div className="mt-4">
              <Button as={Link} to="/login" variant="primary" size="lg" className="me-3">
                Sign In
              </Button>
              <Button as={Link} to="/register" variant="outline-primary" size="lg">
                Register
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-hotel fa-3x text-primary"></i>
                </div>
                <Card.Title>Hotel Management</Card.Title>
                <Card.Text>
                  Add, edit and manage hotel listings, rooms, pricing, and bookings.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-user-tie fa-3x text-primary"></i>
                </div>
                <Card.Title>Guide Management</Card.Title>
                <Card.Text>
                  Manage guides, their schedules, and handle customer bookings.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-chart-line fa-3x text-primary"></i>
                </div>
                <Card.Title>Analytics Dashboard</Card.Title>
                <Card.Text>
                  View detailed analytics about bookings, users, and revenue.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <p className="text-muted">
            © {new Date().getFullYear()} Travel Mate Admin. All rights reserved.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;