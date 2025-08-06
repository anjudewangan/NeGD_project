import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const LoginForm = () => {
    const [formData, setFormData] = useState({
      fullName: 'Abbas Vora',
      mobileNumber: '7046545652',
      issue: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === 'mobileNumber') {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 10) {
          setFormData((prev) => ({ ...prev, [name]: numericValue }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">{formData.fullName}</Form.Label>
          <div className="text-muted small">Your Full Name</div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            inputMode="numeric"
            pattern="\d{10}"
            placeholder="Enter Your Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Enter Your Mobile Number for communication
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Need Help*</Form.Label>
          <Form.Select
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            required
          >
            <option value="">— Select —</option>
            <option value="otp">Sign In / OTP issues</option>
            <option value="mobile-change">Change old mobile number</option>
            <option value="account-locked">Account locked</option>
          </Form.Select>
        </Form.Group>

        <Button
          as={Link}
          to="/support/digilocker/tickets"
          className="w-100"
          style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
        >
          Submit
        </Button>
      </Form>
    );
  };

  return (
    <>
      <div className="text-end">
        <Button
          variant="link"
          size="sm"
          className="p-2 text-decoration-none badge bg-light text-dark"
          onClick={handleClose}
        >
          Close X
        </Button>
      </div>
      <h5>Open a New Ticket</h5>
      <p className="fs-10 text-600 mb-3">
        Please fill in the form below to open a new ticket.
      </p>
      <LoginForm />
    </>
  );
};

export default Login;
