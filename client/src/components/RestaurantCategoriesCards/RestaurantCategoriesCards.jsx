import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import RestaurantCategoryCard from '../RestaurantCategoryCard/RestaurantCategoryCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const RestaurantCategoriesCards = () => {

    let categories = ["DateNight", "Fine Dining", "Casual Dining", "Vegan & Veg", "Outside"];

    return (
        <Container style={{ padding: '2rem' }}>
            <Row>
                <Col>
                    <h2 className="restaurants-heading" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        Restaurant Categories
                    </h2>
                    <p>
                        some sentence
                    </p>
                </Col>
            </Row>

            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                modules={[Autoplay, Pagination]}
                loop={true}
                autoplay={{ delay: 4000 }}
                // pagination={{ clickable: true }}
                style={{ paddingBottom: '2rem' }}
            >
                {categories.map((category) => (
                    <SwiperSlide>
                        <RestaurantCategoryCard />
                    </SwiperSlide>
                ))}


            </Swiper>

        </Container>
        // <RestaurantCategoryCard/>
    )
}

export default RestaurantCategoriesCards