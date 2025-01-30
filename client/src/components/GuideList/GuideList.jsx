import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GuideCard from '../GuideCard/GuideCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GuideList.css';
import { ClientContext } from '../../context/ClientContext';

const GuideList = () => {
  const {allGuides} = useContext(ClientContext);

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

          {allGuides.map((guide) => (
            <SwiperSlide key={guide.id}>
              <GuideCard
                name={guide.name}
                description={guide.description}
                area={guide.area[0]}
                languages={guide.languages[0]}
                chargesPerDay={guide.chargesPerDay}
                profileImg='https://picsum.photos/150'
                id = {guide.id}
                image = {guide.images[0]}
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </Container>
    </div>
  );
};

export default GuideList;
