import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import HotelCard from '../HotelCard/HotelCard';
import "swiper/css/navigation"


const ThingsToDo = () => {

    const hotelData = [
        {
            name: "Ocean View Hotel",
            description: "Beautiful oceanfront hotel with great views.",
            price: "$120 per night"
        },
        {
            name: "Mountain Retreat",
            description: "Cozy mountain lodge with hiking trails nearby.",
            price: "$150 per night"
        },
        {
            name: "City Lights Hotel",
            description: "Downtown hotel with modern amenities and .",
            price: "$200 per night"
        },
        {
            name: "Desert Oasis",
            description: "Luxurious hotel in the middle of the desert.",
            price: "$180 per night"
        },
        {
            name: "Lake House",
            description: "Charming lakeside inn with stunning views.",
            price: "$100 per night"
        }
    ];


    return (
        <div>

            <div



            >


                <h4 style={{ marginLeft: "90px", marginBottom: "50px", color: "#0A2E41", fontWeight: "bold" }}>Things To Do</h4>

                <h5 style={{ color: "#7094A7", marginLeft: "90px", marginBottom: "50px", color: "#0A2E41", fontWeight: "bold" }}>Attractions</h5>

                <div>
                    <Swiper
                        spaceBetween={5}
                        modules={[Navigation]}
                        navigation
                        loop={true}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 1, // Small screens
                            },
                            // when window width is >= 768px
                            850: {
                                slidesPerView: 2, // Medium screens
                            },
                            // when window width is >= 1024px
                            1500: {
                                slidesPerView: 3, // Large screens
                            },
                        }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {hotelData.map((hotel, index) => (
                            <SwiperSlide key={index}>
                                <div className="d-flex justify-content-center">
                                    <HotelCard
                                        name={hotel.name}
                                        description={hotel.description}
                                        price={hotel.price}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>







            </div>

        </div>
    )
}

export default ThingsToDo