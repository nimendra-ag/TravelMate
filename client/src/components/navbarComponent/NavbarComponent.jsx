import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../assets/TravalMate Logo.png';
import './NavbarComponent.css';
import SigninModal from '../signinModal/SigninModal';

const NavbarComponent = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Navbar expand="lg" className={`custom-navbar ${scrolled ? 'scrolled' : ''}`} fixed="top">
            <Container>
                <Navbar.Brand href="/" className="brand-logo">
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
                        {localStorage.getItem("user") && (
                            <Nav.Link href="/mybookings/available" className="nav-item">My Bookings</Nav.Link>
                        )}
                        <SigninModal />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
