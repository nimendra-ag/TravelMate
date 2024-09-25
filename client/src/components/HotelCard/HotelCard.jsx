import React from 'react';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import logo from '../../assets/TravalMateLogo2.png';

const HotelCard = ({ name, description, price, imageSrc }) => {
  return (
    <Card style={{ width: '25rem', borderRadius: '10px', overflow: 'hidden', boxShadow: '1px 1px 0px 1px rgba(0, 0, 0, .2' }}>
      <Card.Img 
        variant="top" 
        src={imageSrc || "https://picsum.photos/400/200"} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Card.Text>
        
        <Row className="align-items-center mt-4">
          <Col xs={6}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>••••</div>
              <div style={{ fontSize: '0.9rem' }}>Price</div>
            </div>
          </Col>
          <Col xs={6} className="text-end" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            {price}
          </Col>
        </Row>

        <Button
          variant="info"
          className="mt-4"
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
            width: '235px',
            height: '49px',
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
  );
};

export default HotelCard;
