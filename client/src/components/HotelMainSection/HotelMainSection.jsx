import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const HotelMainSection = () => {
    return (
        <Container className="mt-5">
          <Row>
            {/* Left Column - Hotel Description */}
            <Col xs={12} md={7}>
              <h1 className="display-4">Cinnamon Life at City of Dreams</h1>
              <h5 className="mt-3 mb-3">About</h5>
              <p className="text-muted">
                Welcome to Cinnamon Life Hotel, your gateway to luxury and unforgettable experiences in the heart of Colombo. As part of the prestigious Cinnamon Life complex, our hotel offers a unique blend of elegance, comfort, and world-class amenities.
                <br/><br/>
                Discover beautifully designed rooms and suites that provide panoramic views of the city, along with top-tier services to ensure an exceptional stay. Whether you're visiting for business or leisure, our hotel is the perfect destination, offering gourmet dining, a stunning rooftop pool, a state-of-the-art fitness center, and versatile event spaces.
              </p>
    
              <div className="mt-4">
                <p className="d-flex align-items-center">
                  <FaClock className="me-2" /> Duration: More than 3 hours
                </p>
                <p className="d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2" /> Distance from Colombo: About 175 km
                </p>
              </div>
    
              <Button variant="warning" size="lg" className="mt-4">Book Now</Button>
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