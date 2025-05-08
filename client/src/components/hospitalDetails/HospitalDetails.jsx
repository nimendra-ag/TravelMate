import React from 'react'
import { Row } from 'react-bootstrap'

const HospitalDetails = ({id,type, name, address, contactNumber, email, website, image, category, nearestCity, distanceFromNearestCity, description}) => {
  return (
    <div className="hospital-main-section">
          <div className="hospital-details pt-5">
            <h1>{name}</h1>
          </div>
          <Container className="py-3 border-bottom">
            <Row className="align-items-center">
              <Col md="6" className="d-flex align-items-center">
                <h4 className="mb-0">{category}</h4>
              </Col>
              <Col md="6" className="text-md-end text-muted">
    
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md="6" className="d-flex align-items-center">
                <h4 className="mb-0">{image}</h4>
              </Col>
              <Col md="6" className="text-md-end text-muted">
    
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md="6" className="d-flex align-items-center">
                <h4 className="mb-0">{description}</h4>
              </Col>
              <Col md="6" className="text-md-end text-muted">
    
              </Col>
            </Row>
    
            <Row className="align-items-center mt-2">
              
              <Col md="6" className="text-md-end text-muted">
                <FaLaptop  className="me-2 text-dark" />
                <a href={website} className="text-decoration-none text-dark">Visit Out Website</a> <br />
                <a href={`tel:${contactNumber}`} className="text-decoration-none">{contactNumber}</a> | <a href="https://maps.google.com/?q=Carrer Nou de Sant Francesc, 7, 08002 Barcelona Spain" className="text-decoration-none">
                  {address}
                </a>
              </Col>
            </Row>
            <Row>
            <Col md="6" className="d-flex align-items-center">
                <h4 className="mb-0">{nearestCity}</h4>
              </Col>
              <Col md="6" className="d-flex align-items-center">
                <h4 className="mb-0">{distanceFromNearestCity}</h4>
              </Col>
            </Row>
            <hr style={{ border: '2px solid #00AA6C', marginTop: '1rem' }} />
    
          </Container>
          
          <RestaurantDetails 
          id={id}
          />
        </div>
  )
}

export default HospitalDetails