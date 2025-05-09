import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import TopNavbar from '../TopNavbar/TopNavbar';

const Sidebar = () => {
  return (
    <>
      <TopNavbar/>
      <button className="btn btn-primary d-lg-none" onClick={handleShow}>
        ☰ Menu
      </button>

      <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Link to="/hotels" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Manage Hotels</p>
              </div>
            </Link>
            <Link to="/guides" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Manage Guides</p>
              </div>
            </Link>
            <Link to="/destinations" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Manage Destinations</p>
              </div>
            </Link>
            <Link to="/restaurants" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Manage Restaurants</p>
              </div>
            </Link>
            {/* <Link to="/users" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Manage Users</p>
              </div>
            </Link> */}
            <Link to="/transportmodes" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Manage Transport Modes</p>
              </div>
            </Link>
            <Link to="/manage-hotel-bookings" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Manage Hotel Bookings</p>
              </div>
            </Link>
            <Link to="/manage-guide-bookings" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Guid Bookings</p>
            </div>
          </Link>
          <Link to="/manage-transport-bookings" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Transport Bookings</p>
            </div>
          </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-none d-lg-block" style={{ backgroundColor: '#b0c4de', width: '250px', height: '100vh', position: 'fixed' }}>
      <TopNavbar />
      <div 
        className="d-none d-lg-block h-full" 
        style={{ 
          backgroundColor: '#b0c4de', 
          width: '250px', 
          height: '100vh', 
          position: 'fixed',
          overflowY: 'auto' // Add scrolling capability
        }}
      >
        <Nav className="flex-column p-4">
          <div style={{ marginTop: '80px' }}></div> {/* Spacer for navbar */}
          <Link to="/hotels" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Hotels</p>
            </div>
          </Link>
          <Link to="/guides" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Guides</p>
            </div>
          </Link>
          <Link to="/destinations" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Destinations</p>
            </div>
          </Link>
          <Link to="/restaurants" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Restaurants</p>
            </div>
          </Link>
          {/* <Link to="/users" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Users</p>
            </div>
          </Link> */}
          <Link to="/transportmodes" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Transport Modes</p>
            </div>
          </Link>
          <Link to="/add-hospital" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Add Hospital</p>
            </div>
          </Link>
          <Link to="manage-hotel-bookings" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Hotel Bookings</p>
            </div>
          </Link>
          <Link to="/manage-guide-bookings" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Guide Bookings</p>
            </div>
          </Link>
          <Link to="/manage-transport-bookings" style={{ textDecoration: 'none' }}>
            <div className="sidebar-item">
              <p>Manage Transport Bookings</p>
            </div>
          </Link>
          <div style={{ paddingBottom: '20px' }}></div> {/* Bottom padding for scrolling */}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
