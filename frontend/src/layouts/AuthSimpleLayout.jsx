import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Logo from 'components/common/Logo';
import Section from 'components/common/Section';
import { Outlet } from 'react-router-dom';
import DigiLockerLogo from 'assets/img/logos/digilocker.png'

const AuthSimpleLayout = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center min-vh-100 py-6">
        <Col sm={10} md={7} lg={7} xl={7} className="col-xxl-7">
          <div className="text-center mb-4">
            <img
              src={DigiLockerLogo}
              alt="DigiLocker Logo"
              style={{ maxWidth: '200px' }}
            />
          </div>
          <Card>
            <Card.Body className="p-4 p-sm-4">
              <Outlet />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Section>
  );
};

export default AuthSimpleLayout;
