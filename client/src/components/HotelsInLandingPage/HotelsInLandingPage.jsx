import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HotelCard from '../HotelCard/HotelCard'

const HotelsInLandingPage = () => {
    const hotelData = [
      {
        id: 1,
        name: 'Hotel One',
        description: 'Description: Line1\nLine2',
        price: 'From 4000 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
      {
        id: 2,
        name: 'Hotel Two',
        description: 'Description: Line1\nLine2',
        price: 'From 4500 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
      {
        id: 3,
        name: 'Hotel Two',
        description: 'Description: Line1\nLine2',
        price: 'From 4500 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
      {
        id: 4,
        name: 'Hotel Two',
        description: 'Description: Line1\nLine2',
        price: 'From 4500 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
      {
        id: 5,
        name: 'Hotel Two',
        description: 'Description: Line1\nLine2',
        price: 'From 4500 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
      {
        id: 6,
        name: 'Hotel Two',
        description: 'Description: Line1\nLine2',
        price: 'From 4500 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
      {
        id: 7,
        name: 'Hotel Two',
        description: 'Description: Line1\nLine2',
        price: 'From 4500 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
      {
        id: 8,
        name: 'Hotel Two',
        description: 'Description: Line1\nLine2',
        price: 'From 4500 LKR',
        imageSrc: 'https://picsum.photos/400/200', 
      },
 
    ];
  
    return (
      <Container>
        <Row className="gy-4">
          {hotelData.map((hotel) => (
            <Col key={hotel.id} xs={12} md={6} lg={4}>
              <HotelCard
                name={hotel.name}
                description={hotel.description}
                price={hotel.price}
                imageSrc={hotel.imageSrc}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  

export default HotelsInLandingPage