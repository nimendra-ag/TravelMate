import React from 'react';
import { Card, Button, Row, Col, Image } from 'react-bootstrap';
import contactIcon from '../../assets/phone-call.png';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';
import './GuideCard.css';

const GuideCard = ({ id, name, description, area, languages, chargesPerDay, profileImg }) => {
  const navigate = useNavigate();

  return (
    <Card className="guide-card">
      <div className="guide-card-header">
        <div className="profile-image-container">
          <Image 
            src={profileImg || "https://picsum.photos/150"}
            roundedCircle 
            className="profile-image"
          />
        </div>
        <div className="price-badge">
          {chargesPerDay} LKR<span className="per-day">/day</span>
        </div>
      </div>

      <Card.Body className="guide-card-body">
        <Card.Title className="guide-name">{name}</Card.Title>
        
        <Card.Text className="guide-description">
          {description}
        </Card.Text>

        <div className="guide-details">
          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <span>{area}</span>
          </div>
          <div className="detail-item">
            <FaLanguage className="detail-icon" />
            <span>{languages}</span>
          </div>
        </div>

        <Button
          className="contact-button"
          onClick={() => navigate(`/guide/${id}`)}
        >
          Contact Now
          <Image 
            src={contactIcon} 
            alt="contact"
            className="contact-icon"
          />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GuideCard;
