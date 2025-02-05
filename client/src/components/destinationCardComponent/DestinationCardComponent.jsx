import React from 'react';
import { Card, Badge, Button, Carousel } from 'react-bootstrap';
import { FaHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DestinationCardComponent = ({ id=1, images, title, reviewCount, category, year }) => {
  return (
    <Link to={`/destinations/${id}`} style={{ textDecoration: 'none' }}>
      <Card style={{ width: '18rem', borderRadius: '10px', overflow: 'hidden' }} className="shadow-sm mb-4 d-flex">
        <div className="position-relative">
          <Carousel indicators={true} controls={false}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <Card.Img
                  variant="top"
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>


        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="d-flex align-items-center mb-2">
            <FaStar color="green" />
            <span className="ms-1">{reviewCount}</span>
          </div>
          <Card.Text className="text-muted" style={{ fontSize: '0.9em' }}>
            {category}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default DestinationCardComponent