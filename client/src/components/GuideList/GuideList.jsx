import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GuideCard from '../GuideCard/GuideCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GuideList.css';

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
    <div className="guides-section">
      <Container>
        <Row>
          <Col>
            <h2 className="guides-heading" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Guides
            </h2>
          </Col>
        </Row>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 3000 }}
          // pagination={{ clickable: true }}
          style={{ paddingBottom: '2rem' }}
        >

          {guides.map((guide) => (
            <SwiperSlide key={guide.id}>
              <GuideCard
                name={guide.name}
                age={guide.age}
                description={guide.description}
                area={guide.area}
                languages={guide.languages}
                chargesPerDay={guide.chargesPerDay}
                profileImg={guide.profileImg}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </Container>
    </div>
  );
};

export default GuideList;
