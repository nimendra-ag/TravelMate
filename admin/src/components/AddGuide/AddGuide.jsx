import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddGuide = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your form submission logic here
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Guide Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            style={{
              borderRadius: '10px',
              marginBottom: '25px',
              width: '463px',
              height: '50px',
              borderWidth: '2px',
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            style={{
              borderRadius: '10px',
              marginBottom: '25px',
              width: '463px',
              height: '50px',
              borderWidth: '2px',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ borderRadius: '10px', width: '463px', height: '50px' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddGuide;
