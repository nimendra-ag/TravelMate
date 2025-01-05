import React from 'react';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import contactIcon from '../../assets/phone-call.png';
import { useNavigate } from 'react-router-dom';

const GuideCard = ({ id, name, description, area, languages, chargesPerDay, profileImg }) => {
  const navigate = useNavigate(); // Changed from navigator = useNavigate()

  return (
    <Card style={{ width: '22rem', borderRadius: '10px', overflow: 'hidden', boxShadow: '1px 1px 0px 1px rgba(0, 0, 0, .2)' }}>
      <Card.Body className="text-center">
        <Image 
          src={profileImg || "https://picsum.photos/150"}
          roundedCircle 
          style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '15px' }} 
        />

        <Card.Title style={{ fontWeight: 'bold' }}>{name}</Card.Title>
        
        <Card.Text style={{ marginTop: '5px', fontSize: '0.85rem', color: '#666' }}>
          {description}
        </Card.Text>

        <Row style={{ textAlign: 'left', marginTop: '10px', fontSize: '0.85rem' }}>
          <Col xs={6}>
            <div><strong>Area</strong> : {area}</div>
            <div><strong>Languages</strong> : {languages}</div>
          </Col>
          <Col xs={6} >
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>Charges per Day</div>
            <div style={{ textAlign: 'right'}}>{chargesPerDay} LKR</div>
          </Col>
        </Row>

        <Button
          variant="info"
          className="mt-5 mb-3"
          onClick={() => {navigate(`/guide/${id}`);
          }} // Fixed syntax error in template literal
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
            width: '150px',
            height: '49px',
            margin: '20px auto 0',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          Contact 
          <Image 
            src={contactIcon} 
            alt="contact-icon"
            style={{ marginLeft: '10px', width: '20px', height: '20px' }}
          />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GuideCard;
