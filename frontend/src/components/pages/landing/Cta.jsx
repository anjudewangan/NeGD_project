import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import bg2 from 'assets/img/generic/bg-2.jpg';
import Section from 'components/common/Section';

const Cta = () => (
  <Section
    overlay
    image={bg2}
    position="center top"
    className="bg-dark"
    data-bs-theme="light"
  >
    <Row className="justify-content-center text-center">
      <Col lg={6}>
        <p className="fs-6 fs-sm-5 text-white">
         How can we help you?
        </p>
        <Form>
          <Form.Control
            type="search"
            placeholder="Search Help"
            className="mt-3"
            aria-label="Search"
          />
        </Form>
      </Col>
    </Row>
  </Section>
);

export default Cta;
