import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/TravelMateAdminLogo.png'

const TopNavbar = () => {
  return (
    <Navbar bg="info" variant="dark" className="py-3 fixed-top" >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          {/* Replace this with your logo image */}
          <img
            src={logo} // Your logo image path
            alt="Travel Mate Logo"
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
          />
          <span>TRAVEL MATE</span>
        </Navbar.Brand>
        <Navbar.Text className="mx-auto text-light fw-bold fs-5">ADMIN DASHBOARD</Navbar.Text>
        <Button as={Link} to="/signin" variant="dark">
          Sign in
        </Button>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
