import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HotelCard from '../HotelCard/HotelCard';
import { ClientContext } from '../../context/ClientContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HotelsInLandingPage.css';

const HotelsInLandingPage = () => {
  const { allAccomodations } = useContext(ClientContext);

  return (
    <Container fluid className="hotels-section" style={{ padding: '2rem' }}>
      <Row>
        <Col>
          <h2 className="hotels-heading" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            Hotels
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
        {allAccomodations.map((accommodation) => (
          <SwiperSlide key={accommodation.id}>
            <HotelCard
              name={accommodation.hotel_name}
              description={accommodation.description}
              price={accommodation.perPerson_price}
              imageSrc='https://picsum.photos/400/200'
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </Container>
  );
};

export default HotelsInLandingPage;
