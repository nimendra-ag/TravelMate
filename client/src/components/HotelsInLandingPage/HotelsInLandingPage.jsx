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
  const { allAccommodations } = useContext(ClientContext);

  return (
    <div className="hotels-section" >
    <Container style={{ padding: '2rem' }}>
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
        {allAccommodations.map((accommodation) => (
          <SwiperSlide key={accommodation.id}>
            <HotelCard
              name={accommodation.name}
              description={accommodation.minidescription}
              price={accommodation.perPerson_price}
              imageSrc={accommodation.cardImage}
              id={accommodation.id}
              minidescription={accommodation.minidescription}
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </Container>
    </div>
  );
};

export default HotelsInLandingPage;
