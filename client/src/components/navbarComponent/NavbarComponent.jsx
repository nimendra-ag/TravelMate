import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../assets/TravalMate Logo.png';
import './NavbarComponent.css';
import SigninModal from '../signinModal/SigninModal';

const NavbarComponent = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="custom-navbar" fixed="top">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src={logo}
                        alt="Travel Mate Logo"
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    Travel Mate
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#" className="nav-item">Explore</Nav.Link>
                        <Nav.Link href="#" className="nav-item">Packages</Nav.Link>
                        <Nav.Link href="#" className="nav-item">Services</Nav.Link>
                        <Nav.Link href="/details" className="nav-item">More</Nav.Link>
                        {localStorage.getItem("user") ? (
                            <Nav.Link href="/mybookings" className="nav-item">My Bookings</Nav.Link>
                        ) : null}
                        <SigninModal/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
