import React from 'react';
import { Card, Badge, Button, Carousel } from 'react-bootstrap';
import { FaHeart, FaStar } from 'react-icons/fa';

const DestinationCardComponent = ({ images, title, reviewCount, category, year }) => {
  return (
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
        <Badge
          pill
          variant="success"
          className="position-absolute top-0 start-0 m-2"
          style={{ fontSize: '0.8em' }}
        >
          {year}
        </Badge>
        <Button
          variant="light"
          className="position-absolute top-0 end-0 m-2 p-2 rounded-circle"
          style={{ border: 'none' }}
        >
          <FaHeart color="black" />
        </Button>
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
  )
}

export default DestinationCardComponent