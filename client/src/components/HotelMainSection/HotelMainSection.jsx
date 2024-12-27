import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import SigninModal from '../signinModal/SigninModal';
import { Navigate, useNavigate } from 'react-router-dom';

const HotelMainSection = ({ name, description, distance_from_city,id }) => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5">
      <Row>
        {/* Left Column - Hotel Description */}
        <Col xs={12} md={7}>
          <h1 className="display-4">{name}</h1>
          <h5 className="mt-3 mb-3">About</h5>
          <p className="text-muted">
            {description}
          </p>

          <div className="mt-4">
            <p className="d-flex align-items-center">
              <FaClock className="me-2" /> Duration: More than 3 hours
            </p>
            <p className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" /> Distance from Colombo: About {distance_from_city} km
            </p>
          </div>

          {localStorage.getItem("auth-token") ? (

            <Button variant="warning" size="lg" className="mt-4" onClick={()=>navigate(`/bookHotel/${id}`)}>Book Now</Button>



          ) : (
            <>
<p className="" style={{ color: 'red', fontWeight: 'bold' }}>Login or Signup to Book the hotel</p>
</>
          )}

        </Col>

        {/* Right Column - Hotel Images */}
        <Col xs={12} md={5} className="mt-4 mt-md-0">
          {/* Main image */}
          <Image
            src="https://picsum.photos/500/350"
            alt="Cinnamon Life Hotel"
            fluid
            rounded
            className="mb-3"
            style={{ width: '100%', height: 'auto', maxHeight: '350px' }}
          />

          {/* Thumbnail images */}
          <Row>
            <Col xs={4}>
              <Image
                src="https://picsum.photos/200/100"
                alt="Hotel View 1"
                fluid
                rounded
                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={4}>
              <Image
                src="https://picsum.photos/201/100"
                alt="Hotel View 2"
                fluid
                rounded
                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={4}>
              <Image
                src="https://picsum.photos/202/100"
                alt="Hotel View 3"
                fluid
                rounded
                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
              />
            </Col>
          </Row>

          <Button variant="light" className="mt-2">See More +</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HotelMainSection