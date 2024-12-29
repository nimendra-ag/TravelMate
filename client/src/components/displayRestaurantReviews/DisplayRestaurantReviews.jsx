import React, { useContext } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ClientContext } from '../../context/ClientContext';

const ReviewCard = ({userName, title, body, familyType, visitDate}) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <img
            src="https://via.placeholder.com/50"
            alt="User Avatar"
            className="rounded-circle me-3"
          />
          <div>
            <h6 className="mb-0">{userName}</h6>
            <small className="text-muted">from Australia</small>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-success">&#9733;</span> // Star icons
          ))}
        </div>
        <h5>{title}</h5>
        <small className="text-muted">{visitDate} • {familyType}</small>
        <p className="mt-3">
          {body}
        </p>
        {/* <small className="text-muted d-block mt-3">
          Written December 28, 2024
        </small> */}
        <small className="text-muted">
          This review is the subjective opinion of a TravelMate member and not of TravelMate LLC.
        </small>
      </Card.Body>
    </Card>
  );
};

const DisplayRestaurantReviews = ({ id }) => {

  const {allRestaurantReviews} = useContext(ClientContext);
  const restaurantReviews = allRestaurantReviews.filter((review)=> review.restaurantId === parseInt(id));

  return (
    <>
      <Container>
        <div style={{
          backgroundColor: '#f8f9fa',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
        className='p-4'
        >
          <div
            className="d-flex justify-content-between align-items-center p-4"
          >
            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-4 fw-bold">Reviews</h5>
              <div className="d-flex align-items-center">
                <h4 className="mb-0 me-2 text-warning fw-bold">5.0</h4>
                <div className="d-flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className="text-success"
                      style={{ fontSize: '1.2rem', marginRight: '2px' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ms-3 text-muted fw-medium" style={{ fontSize: '1rem' }}>
                  9,301 reviews
                </span>
              </div>
            </div>
            <div className="d-flex">
              <Link to={`/review/restaurants/${id}`} style={{ textDecoration: 'none' }}>
                <Button
                  variant="dark"
                  className="me-2 rounded-pill px-4 py-2 fw-bold"
                  style={{ fontSize: '0.9rem' }}
                >
                  Write a Review
                </Button></Link>
            </div>
          </div>
          
          {restaurantReviews.map((review) => {
            return (
              <ReviewCard
              userName={review.userName}
              title={review.reviewTitle}
              body={review.reviewBody}
              familyType={review.familyType}
              visitDate={review.visitDate}
              />
            )
          })}
        </div>
      </Container>

    </>
  )
}

export default DisplayRestaurantReviews