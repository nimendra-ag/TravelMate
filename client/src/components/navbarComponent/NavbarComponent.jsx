import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
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
                <Navbar.Brand href="#" className="brand-logo">
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
                        <SigninModal />
                        {/* <Button
                            className="cta-btn"
                            style={{
                                marginLeft: '20px',
                                padding: '5px 15px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: '#3b82f6',
                                color: '#fff',
                                fontWeight: '600',
                                transition: 'transform 0.3s ease, background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                        >
                            Get Started
                        </Button> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
