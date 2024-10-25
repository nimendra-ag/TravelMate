import React, { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary d-lg-none" onClick={handleShow}>
        ☰ Menu
      </button>

      <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Link to="/home" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Home</p>
              </div>
            </Link>
            <Link to="/guides" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Guides</p>
              </div>
            </Link>
            <Link to="/hotels" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Hotels</p>
              </div>
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-none d-lg-block bg-light border-end" style={{ width: '250px', height: '100vh', position: 'fixed' }}>
        <Nav className="flex-column p-3">
          <h4>Menu</h4>
          <Link to="/home" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Home</p>
              </div>
            </Link>
            <Link to="/guides" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Guides</p>
              </div>
            </Link>
            <Link to="/hotels" style={{ textDecoration: 'none' }} onClick={handleClose}>
              <div className="sidebar-item">
                <p>Hotels</p>
              </div>
            </Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
