
import logo from '../../assets/TravalMateLogo2.png';
import { Link } from 'react-router-dom';

import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaHeart, FaStar } from 'react-icons/fa';

const RestaurantCard = ({id, type, name, address, category, contactNumber, description, email, website, openingHours, priceRange, rating}) => {
  return (
    <Link to={`/restaurants/${id}`} style={{ textDecoration: 'none' }}>
    <Card style={{ width: '18rem', border: 'none' }} className="my-3">
      <div style={{ position: 'relative' }}>
      <Card.Img
            variant="top"
            src="https://picsum.photos/286/180"
            alt="Restaurant Image"
            style={{
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', 
              borderRadius: '5px', 
            }}
          />        <Button
          variant="light"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            borderRadius: '20%',
            padding: '4px',

          }}
        >
          <FaHeart style={{ color: 'black' }} />
        </Button>
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="d-flex align-items-center mb-2">
          <FaStar style={{ color: 'green' }} />
          <FaStar style={{ color: 'green' }} />
          <FaStar style={{ color: 'green' }} />
          <FaStar style={{ color: 'green' }} />
          <FaStar style={{ color: 'green' }} />
          <Badge bg="light" text="dark" className="ms-2">
            {rating}
          </Badge>
        </div>
        <Card.Text>{address}</Card.Text>
      </Card.Body>
    </Card>
    </Link>
  );
};

export default RestaurantCard;
