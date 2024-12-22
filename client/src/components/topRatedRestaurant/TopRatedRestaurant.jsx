import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Carousel, Card, ProgressBar, Collapse } from "react-bootstrap";
import './TopRatedRestaurant.css';


const TopRatedRestaurant = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
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
                            <h2>Restaurant Name</h2>
                            <p>
                                <strong>Location:</strong> 123 Main St, City, Country
                            </p>
                            <p>
                                A delightful restaurant offering a variety of dishes to satisfy your
                                taste buds. Known for its excellent service and vibrant atmosphere.
                            </p>
                        </Col>
                        <Col md={3}>
                            <h4>Ratings</h4>
                            <p>Food: <ProgressBar now={90} label="9.0" /></p>
                            <p>Service: <ProgressBar now={85} label="8.5" /></p>
                            <p>Value: <ProgressBar now={80} label="8.0" /></p>
                            <p>Atmosphere: <ProgressBar now={75} label="7.5" /></p>
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
        </>
    );
};

export default TopRatedRestaurant;
