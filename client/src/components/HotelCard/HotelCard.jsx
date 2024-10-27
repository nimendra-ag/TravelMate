import React from 'react';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import logo from '../../assets/TravalMateLogo2.png';
import { Link } from 'react-router-dom';

const HotelCard = ({ name, description, price, imageSrc, id, minidescription }) => {
  return (
    <Link to={`/accommodations/${id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '22rem', boxShadow: '1px 1px 0px 1px rgba(0, 0, 0, .2)' }}>
        <Card.Img variant="top" src={imageSrc} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
            <br />
            {minidescription}
          </Card.Text>

          <Row className="align-items-center mt-4">
            <Col xs={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>•••••</div>
              </div>
            </Col>
            <Col xs={6} className="text-end" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            From {price} LKR
            </Col>
          </Row>
          <Button
            variant="info"
            className="mt-4 mb-3"
            style={{
              backgroundColor: '#C1EAF8',
              border: 'none',
              color: '#007bff',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '30px',
              padding: '10px 0',
              width: '230px',
              height: '46px',
              margin: '0 auto',
            }}
          >
            Discover More
            <Image
              src={logo}
              alt="logo"
              style={{ marginLeft: '10px', width: '25px', height: '25px' }}
            />
          </Button>
        </Card.Body>
      </Card>
    </Link>

  );
};

export default HotelCard;
