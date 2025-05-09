import React, { useContext } from 'react';
import { Navbar, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/TravelMateAdminLogo.png';
import { AuthContext } from '../../context/AuthContext';

const TopNavbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar bg="info" variant="dark" className="py-3 fixed-top">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/admin-pannel"
          className="d-flex align-items-center group"
        >
          <img
            src={logo}
            alt="Travel Mate Logo"
            width="50"
            height="50"
            className="d-inline-block align-top me-2"
          />
          <span className="text-white fw-bold group-hover:underline">
            TRAVEL MATE
          </span>
        </Navbar.Brand>

        <Navbar.Text className="mx-auto text-light fw-bold fs-5">
          ADMIN DASHBOARD
        </Navbar.Text>

        {currentUser ? (
          <NavDropdown
            title={<span className="text-white">{currentUser.fullName}</span>}
            id="admin-nav-dropdown"
            align="end"
          >
            <NavDropdown.Item disabled>{currentUser.email}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>Sign out
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Button as={Link} to="/login" variant="dark">
            Sign in
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
