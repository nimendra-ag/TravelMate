import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GuideCard from '../GuideCard/GuideCard';

const GuideList = () => {
  const guides = [
    {
      id: 1,
      name: 'Nimendra Gunawardana',
      age: 26,
      description: 'Short Description about experience',
      area: 'UHDIJ',
      languages: 'UHDIJ',
      chargesPerDay: '5000',
      profileImg: 'https://picsum.photos/150', 
    },
    {
      id: 2,
      name: 'Nimendra Gunawardana',
      age: 26,
      description: 'Short Description about experience',
      area: 'UHDIJ',
      languages: 'UHDIJ',
      chargesPerDay: '5000',
      profileImg: 'https://picsum.photos/150', 
    },
    {
      id: 3,
      name: 'Nimendra Gunawardana',
      age: 26,
      description: 'Short Description about experience',
      area: 'UHDIJ',
      languages: 'UHDIJ',
      chargesPerDay: '5000',
      profileImg: 'https://picsum.photos/150', 
    },
    {
      id: 4,
      name: 'Nimendra Gunawardana',
      age: 26,
      description: 'Short Description about experience',
      area: 'UHDIJ',
      languages: 'UHDIJ',
      chargesPerDay: '5000',
      profileImg: 'https://picsum.photos/150', 
    },
    {
      id: 5,
      name: 'Nimendra Gunawardana',
      age: 26,
      description: 'Short Description about experience',
      area: 'UHDIJ',
      languages: 'UHDIJ',
      chargesPerDay: '5000',
      profileImg: 'https://picsum.photos/150',
    },
    {
        id: 6,
        name: 'Nimendra Gunawardana',
        age: 26,
        description: 'Short Description about experience',
        area: 'UHDIJ',
        languages: 'UHDIJ',
        chargesPerDay: '5000',
        profileImg: 'https://picsum.photos/150', 
      }
  ];

  return (
    <Container>
      <Row className="gy-4">
        {guides.map((guide) => (
          <Col key={guide.id} xs={12} sm={6} md={6} lg={4}>
            <GuideCard
              name={guide.name}
              age={guide.age}
              description={guide.description}
              area={guide.area}
              languages={guide.languages}
              chargesPerDay={guide.chargesPerDay}
              profileImg={guide.profileImg}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GuideList;
