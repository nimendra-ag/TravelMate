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
import { useNavigate } from 'react-router-dom';

const HotelsInLandingPage = () => {
  const navigator = useNavigate();
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
              price={accommodation.perPerson_price}
              imageSrc={accommodation.image}
              id={accommodation.id}
              minidescription={accommodation.minidescription}
            />
          </SwiperSlide>
        ))}
      </Swiper>


      <button className="view-all-button view-btn  " onClick={()=>{navigator("/allhotels")}}>Book a Hotel</button>

    </Container>
    </div>
  );
};

export default HotelsInLandingPage;