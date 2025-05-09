import React, { useState } from 'react';
import { Nav, Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import TopNavbar from '../TopNavbar/TopNavbar';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Top Navbar (shown for all devices) */}
      <TopNavbar />

      {/* Mobile Menu Button */}
      <div className="d-lg-none p-2">
        <Button variant="primary" onClick={handleShow}>
          ☰ Menu
        </Button>
      </div>

      {/* Offcanvas Sidebar for Mobile */}
      <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <SidebarLinks handleClose={handleClose} />
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar for Desktop */}
      <div 
        className="d-none d-lg-block" 
        style={{ 
          backgroundColor: '#b0c4de', 
          width: '250px', 
          height: '100vh', 
          position: 'fixed',
          overflowY: 'auto' 
        }}
      >
        <Nav className="flex-column p-4">
          <div style={{ marginTop: '80px' }}></div>
          <SidebarLinks />
        </Nav>
      </div>
    </>
  );
};

const SidebarLinks = ({ handleClose }) => (
  <>
    <Link to="/hotels" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Hotels</p></div>
    </Link>
    <Link to="/guides" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Guides</p></div>
    </Link>
    <Link to="/destinations" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Destinations</p></div>
    </Link>
    <Link to="/restaurants" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Restaurants</p></div>
    </Link>
    <Link to="/transportmodes" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Transport Modes</p></div>
    </Link>
    <Link to="/add-hospital" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Add Hospital</p></div>
    </Link>
    <Link to="/manage-hotel-bookings" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Hotel Bookings</p></div>
    </Link>
    <Link to="/manage-guide-bookings" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Guide Bookings</p></div>
    </Link>
    <Link to="/manage-transport-bookings" style={{ textDecoration: 'none' }} onClick={handleClose}>
      <div className="sidebar-item"><p>Manage Transport Bookings</p></div>
    </Link>
  </>
);

export default Sidebar;
