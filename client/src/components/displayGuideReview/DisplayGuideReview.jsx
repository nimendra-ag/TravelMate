import React, { useContext } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import "./DisplayGuideReview.css";

const ReviewCard = ({ userName, title, body, createdAt, recommendation , country }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <div>
            <h6 className="mb-0">{userName || "Anonymous"}</h6>
            <small className="text-muted">from {country}</small>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <small className="text-muted">
            {createdAt ? new Date(createdAt).toLocaleDateString("en-US") : "N/A"} • {recommendation || "N/A"}
          </small>
        </div>
        <h5>{title || "No Title"}</h5>
        <p className="mt-3">{body || "No review content"}</p>
        <small className="text-muted">
          This review is the subjective opinion of a TravelMate member and not
          of TravelMate LLC.
        </small>
      </Card.Body>
    </Card>
  );
};

const DisplayGuideReview = ({ guidId }) => {
  const { allGuideReviews } = useContext(ClientContext);
  
  // Safely access reviews and filter them
  const guideReviews = allGuideReviews?.reviews?.filter(
    (review) => review?.guideId === parseInt(guidId)
  ) || [];
  
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    
    const totalOverallRating = reviews.reduce(
      (sum, review) => sum + (review?.overallRating || 0),
      0
    );
    
    const averageOverallRating = parseFloat(
      (totalOverallRating / reviews.length).toFixed(2)
    );
    
    return averageOverallRating;
  };
  
  const averageOverallRating = calculateAverageRating(guideReviews);
  
  const renderRatingDots = (rating) => {
    // Ensure rating is a valid number
    if (typeof rating !== "number" || isNaN(rating)) {
      rating = 0;
    }
    
    // Clamp rating between 0 and 5
    rating = Math.max(0, Math.min(rating, 5));
    
    const maxDots = 5;
    const fullDots = Math.floor(rating);
    const halfDot = rating % 1 >= 0.5;
    const emptyDots = maxDots - fullDots - (halfDot ? 1 : 0);
    
    return (
      <div className="rating-dots d-flex justify-content-end align-items-center">
        {/* Full Dots */}
        {Array.from({ length: fullDots }, (_, index) => (
          <span key={`full-${index}`} className="rating-dot full"></span>
        ))}
        
        {/* Half Dot */}
        {halfDot && <span className="rating-dot half"></span>}
        
        {/* Empty Dots */}
        {Array.from({ length: emptyDots }, (_, index) => (
          <span key={`empty-${index}`} className="rating-dot empty"></span>
        ))}
      </div>
    );
  };
  
  // Calculate the total number of reviews safely
  const totalReviews = guideReviews?.length || 0;

  return (
    <>
      <Container>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
          className="p-4"
        >
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-4 fw-bold">Reviews</h5>
              <div className="d-flex align-items-center">
                <h4 className="mb-0 me-2 text-warning fw-bold">
                  {averageOverallRating}
                </h4>
                <div className="d-flex">
                  {renderRatingDots(averageOverallRating)}
                </div>
                <span
                  className="ms-3 text-muted fw-medium"
                  style={{ fontSize: "1rem" }}
                >
                  {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                </span>
              </div>
            </div>
            <div className="d-flex">
              {/* Use Button component with as={Link} to avoid nested <a> tags */}
              <Button
                as={Link}
                to={`/review/guides/${guidId}`}
                variant="dark"
                className="me-2 rounded-pill px-4 py-2 fw-bold"
                style={{ fontSize: "0.9rem" }}
              >
                Write a Review
              </Button>
            </div>
          </div>
          
          {guideReviews.length > 0 ? (
            guideReviews.map((review, id) => (
              <ReviewCard
                key={id}
                userName={review?.userName}
                title={review?.reviewTitle}
                body={review?.reviewBody}
                createdAt={review?.createdAt}
                recommendation={review?.recommendation}
                country={review?.country}
              />
            ))
          ) : (
            <div className="text-center py-4">
              <p>No reviews available for this guide yet.</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default DisplayGuideReview;
