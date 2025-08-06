import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Form, Nav, Row, Tab } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import RevenueChart from './RevenueChart';
import { revenueChartData } from 'data/dashboard/crm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardDropdown from 'components/common/CardDropdown';

const NavItem = ({ item }) => {
  return (
    <Nav.Item as="li">
      <Nav.Link
        className="mb-0 py-3 cursor-pointer"
        eventKey={item.toLowerCase()}
      >
        {item}
      </Nav.Link>
    </Nav.Item>
  );
};

const Revenue = () => {
  const [navItems] = useState(['Day', 'Week', 'Month', 'Year']);
  return (
    <Card className="mt-3">
      <Tab.Container id="audience-tab" defaultActiveKey="week">
        <Card.Header
          as={Flex}
          justifyContent="between"
          alignItems="center"
          className="ps-0 py-0 border-bottom"
        >
          <Nav
            as="ul"
            className="nav-tabs border-0 flex-nowrap chart-tab tab-active-caret"
          >
            {navItems.map(item => (
              <NavItem item={item} key={item} />
            ))}
          </Nav>
          <CardDropdown />
        </Card.Header>

        <Card.Body>
          <Row className="g-1">
            <Col xxl={3}>
              <Row className="g-0 my-2">
                <Col md={6} xxl={12}>
                  <div className="border-xxl-bottom border-xxl-200 mb-2">
                    <h2 className="text-primary">1,000</h2>
                    <p className="fs-11 text-500 fw-semibold mb-0">
                      <FontAwesomeIcon
                        icon="circle"
                        className="text-primary me-2"
                      />
                      Total Calls
                    </p>
                    <p className="fs-11 text-500 fw-semibold">
                      <FontAwesomeIcon
                        icon="circle"
                        className="text-warning me-2"
                      />
                      Inbound Calls
                    </p>
                  </div>
                  <Form.Check
                    inline
                    type="radio"
                    id="inbound"
                    label="Inbound"
                    name="bound"
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="outbound"
                    label="Outbound"
                    defaultChecked
                    name="bound"
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="missed"
                    label="Missed"
                    name="bound"
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="diverted"
                    label="Diverted"
                    name="bound"
                  />
                </Col>
                <Col md={6} xxl={12} className="py-2">
                  <Row className="mx-0">
                    <Col xs={6} className="border-end border-bottom py-3">
                      <h5 className="fw-normal text-600">500</h5>
                      <h6 className="text-500 mb-0">Inbound</h6>
                    </Col>
                    <Col xs={6} className="border-bottom py-3">
                      <h5 className="fw-normal text-600">400</h5>
                      <h6 className="text-500 mb-0">Outbound</h6>
                    </Col>
                    <Col xs={6} className="border-end py-3">
                      <h5 className="fw-normal text-600">100</h5>
                      <h6 className="text-500 mb-0">Missed</h6>
                    </Col>
                    <Col xs={6} className="py-3">
                      <h5 className="fw-normal text-600">150</h5>
                      <h6 className="text-500 mb-0">Diverted </h6>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xxl={9}>
              <Tab.Content>
                <Tab.Pane unmountOnExit eventKey="day">
                  <RevenueChart data={revenueChartData.dataset.revenue} />
                </Tab.Pane>
                <Tab.Pane unmountOnExit eventKey="week">
                  <RevenueChart data={revenueChartData.dataset.users} />
                </Tab.Pane>
                <Tab.Pane unmountOnExit eventKey="month">
                  <RevenueChart data={revenueChartData.dataset.deals} />
                </Tab.Pane>
                <Tab.Pane unmountOnExit eventKey="year">
                  <RevenueChart data={revenueChartData.dataset.profit} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
};

NavItem.propTypes = {
  item: PropTypes.string.isRequired
};

export default Revenue;
