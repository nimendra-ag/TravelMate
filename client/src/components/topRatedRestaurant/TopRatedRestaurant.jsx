import React, { useContext } from 'react';
import { useState } from 'react';
import { Container, Row, Col, Carousel, Card, ProgressBar, Collapse } from "react-bootstrap";
import './TopRatedRestaurant.css';
import { ClientContext } from '../../context/ClientContext';


const TopRatedRestaurant = () => {
    const { allRestaurants } = useContext(ClientContext);
    const { allRestaurantReviews } = useContext(ClientContext);
    const randomRestaurant = allRestaurants[Math.floor(Math.random() * allRestaurants.length)];
    const randomRestaurantId = randomRestaurant ? randomRestaurant.id : 0;
    console.log("random restauran id", randomRestaurantId, randomRestaurant);
    const restaurantReviews = allRestaurantReviews.filter(review => review.restaurantId === randomRestaurantId);
    console.log("random restaurant reviews", restaurantReviews);


    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return 0; // Avoid division by zero
        const totalOverallRating = reviews.reduce((sum, review) => sum + review.overallRating, 0);
        const totalFoodRating = reviews.reduce((sum, review) => sum + review.foodRating, 0);
        const totalServiceRating = reviews.reduce((sum, review) => sum + review.serviceRating, 0);
        const totalValueRating = reviews.reduce((sum, review) => sum + review.valueRating, 0);
        const totalAtmosphereRating = reviews.reduce((sum, review) => sum + review.atmosphereRating, 0);
        const averageRatings = {"overall": (totalOverallRating / reviews.length).toFixed(2), "food": (totalFoodRating / reviews.length).toFixed(2), "service": (totalServiceRating / reviews.length).toFixed(2), "value" : (totalValueRating / reviews.length).toFixed(2), "atmosphere": (totalAtmosphereRating / reviews.length).toFixed(2)};
        return averageRatings;
    };

    const averageRatings = calculateAverageRating(restaurantReviews);
    console.log("Average Overall Rating:", averageRatings);

    const [open, setOpen] = useState(false);
    return (
        <> {randomRestaurant ? <>
            <div className="bg-light">
                <Container>
                    {/* Carousel Section */}
                    <Row className="mb-4">
                        <Col>
                            <Carousel className="mx-auto w-75" indicators={false}>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 rounded-2"
                                        src="https://picsum.photos/1920/1080"
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 rounded-2"
                                        src="https://picsum.photos/1920/1080"
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 rounded-2"
                                        src="https://picsum.photos/1920/1080"
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>

                    {/* Details Section */}
                    <Row className="mb-4">
                        <Col md={8}>
                            <h2>{randomRestaurant.restaurantName}</h2>
                            <p>
                                <strong>Location:</strong> {randomRestaurant.address}
                            </p>
                            <Col md={4}>
                                <p>{restaurantReviews.length} Ratings</p>
                                <p>Overall Rating: <ProgressBar now={averageRatings['food']*(100/5)} label={averageRatings['food']} /></p></Col>

                            <p>
                                {randomRestaurant.description}
                            </p>
                        </Col>
                        <Col md={3}>
                            <h4>Ratings</h4>
                            <p>Food: <ProgressBar now={averageRatings['food']*(100/5)} label={averageRatings['food']} /></p>
                            <p>Service: <ProgressBar now={averageRatings['service']*(100/5)} label={averageRatings['service']} /></p>
                            <p>Value: <ProgressBar now={averageRatings['value']*(100/5)} label={averageRatings['value']} /></p>
                            <p>Atmosphere: <ProgressBar now={averageRatings['atmosphere']*(100/5)} label={averageRatings['atmosphere']} /></p>
                        </Col>
                    </Row>

                    {/* Reviews Section */}
                    <Row>
                        <Col>
                            <h3>Customer Reviews</h3>
                            <Row>
                                <Col md={4}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>John Doe</Card.Title>
                                            <Card.Text>
                                                "Amazing food and great service! Will definitely visit again."
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Jane Smith</Card.Title>
                                            <Card.Text>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita laboriosam qui facilis eum nostrum quaerat neque magnam culpa, rem ex!
                                                    <br />
                                                    {!open && ( // Conditionally render "Read More" only if `open` is false
                                                        <span
                                                            onClick={() => setOpen(true)}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={open}
                                                            className="text-decoration-underline"
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            Read More
                                                        </span>
                                                    )}
                                                </p>


                                                <Collapse in={open}>
                                                    <div id="example-collapse-text">
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                                        labore wes anderson cred nesciunt sapiente ea proident.
                                                    </div>
                                                </Collapse>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Michael Lee</Card.Title>
                                            <Card.Text>
                                                <p>"The food was decent, but the service could be better."</p>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </> : <></>}

        </>
    );
};

export default TopRatedRestaurant;
