import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from 'routes/paths';

const loginPaths = {
  simple: paths.simpleLogin,
  split: paths.splitLogin,
  card: paths.cardLogin
};

const Logout = ({ layout = 'simple', titleTag: TitleTag = 'h4' }) => {
  const [ticketVisible, setTicketVisible] = useState(true);

  const handleClose = () => {
    setTicketVisible(false);
  };

  return (
    <div className="text-center">
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

      <TitleTag className="mt-2">Welcome to the Support Center</TitleTag>

      <p className="text-muted text-start">
        You can see you all the tickets (open/closed) here 
        and if required you can also generate new support 
        ticket by clicking on 'Create New Ticket'.
      </p>

      {ticketVisible && (
        <Card className="mb-3 text-start" style={{ border: '1px solid #e0e0e0' }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center fw-bold">
              <span>Ticket # 357381</span>
              <span className="badge bg-warning text-dark">New</span>
            </div>
            <div className="text-muted small">
              Sign In / OTP related issues / Don't have old mobile number
            </div>
            <div className="text-muted small mt-2">Last updated on 22-05-2025</div>
          </Card.Body>
        </Card>
      )}

      <Button
        as={Link}
        to="/support/digilocker/create-new-ticket" 
        className="w-100"
        style={{ backgroundColor: '#0d6efd', borderColor: '#0d6efd' }}
      >
        Create New Ticket
      </Button>

    </div>
  );
};

Logout.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

export default Logout;
