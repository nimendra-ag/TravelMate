import React from 'react'
import DestinationCardComponent from '../destinationCardComponent/DestinationCardComponent';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './DestinationsInHomePage.css'

const DestinationsInHomePage = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2 className="destinationsinhome-heading text-start" style={{ marginBottom: '1.5rem' }}>
                            Discover Destinations for Every Adventure
                        </h2>
                        <h6 style={{ marginBottom: '1.5rem' }}>
                            Explore breathtaking locations and hidden gems, curated to make your travels unforgettable.                    </h6>
                    </Col>
                </Row>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    modules={[Autoplay]}
                    Navigation
                    loop={true}
                    autoplay={{ delay: 4000 }}
                    // pagination={{ clickable: true }}
                    style={{ paddingBottom: '2rem' }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }}>

                    {/* <Row> */}
                    {/* <div className="d-flex justify-content-center gap-3"> */}

                    <SwiperSlide>
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=1',
                                'https://picsum.photos/288/200?random=2',
                                'https://picsum.photos/288/200?random=3'
                            ]}
                            title="Sigiriya The Ancient Rock Fortress"
                            reviewCount="11,738"
                            category="Ancient Ruins, Points of Interest & Landmarks"
                            city="Sigiriya"
                        /></SwiperSlide>

                    <SwiperSlide>
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=4',
                                'https://picsum.photos/288/200?random=2',
                                'https://picsum.photos/288/200?random=5'
                            ]}
                            title="Pidurangala Rock"
                            reviewCount="2,555"
                            category="Points of Interest & Landmarks"
                            city="Sigiriya"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=2',
                                'https://picsum.photos/288/200?random=2',
                                'https://picsum.photos/288/200?random=6'
                            ]}
                            title="Kaludiya Pokuna"
                            reviewCount="30"
                            category="Historic Sites, Points of Interest & Landmarks"
                            city="Sigiriya"
                        />
                    </SwiperSlide>


                    <SwiperSlide>
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=6',
                                'https://picsum.photos/288/200?random=7',
                                'https://picsum.photos/288/200?random=8'
                            ]}
                            title="Kaludiya Pokuna"
                            reviewCount="30"
                            category="Historic Sites, Points of Interest & Landmarks"
                            city="Sigiriya"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=6',
                                'https://picsum.photos/288/200?random=7',
                                'https://picsum.photos/288/200?random=8'
                            ]}
                            title="Kaludiya Pokuna"
                            reviewCount="30"
                            category="Historic Sites, Points of Interest & Landmarks"
                            city="Sigiriya"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=6',
                                'https://picsum.photos/288/200?random=7',
                                'https://picsum.photos/288/200?random=8'
                            ]}
                            title="Kaludiya Pokuna"
                            reviewCount="30"
                            category="Historic Sites, Points of Interest & Landmarks"
                            city="Sigiriya"
                        />

                    </SwiperSlide>
                    <SwiperSlide>

                        <DestinationCardComponent
                            images={[
                                'https://picsum.photos/288/200?random=6',
                                'https://picsum.photos/288/200?random=7',
                                'https://picsum.photos/288/200?random=8'
                            ]}
                            title="Kaludiya Pokuna"
                            reviewCount="30"
                            category="Historic Sites, Points of Interest & Landmarks"
                            city="Sigiriya"
                        />
                    </SwiperSlide>
                    {/* </div> */}
                    {/* </Row> */}

                </Swiper>
                {/* <Row>
                    <div className="d-flex justify-content-center gap-3">
                        
                    </div>
                </Row> */}
            </Container>

        </>
    );
}

export default DestinationsInHomePage