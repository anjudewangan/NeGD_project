import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Tab, Nav, Form, Dropdown } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopCoursesTable from './TopCoursesTable';
import FalconLink from 'components/common/FalconLink';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';
import IconButton from 'components/common/IconButton';
import GreetingsDate from 'components/dashboards/crm/greetings/GreetingsDate';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';

const TabTitle = ({ title, icon }) => (
  <Flex className="p-3 ps-2 text-start cursor-pointer gap-1">
    <Flex className="flex-column flex-between-center">
      <FontAwesomeIcon icon={icon} className="fs-7 mt-auto" />
    </Flex>
    <div className="ms-2">
      <h6 className="text-900 fs-9 text-nowrap mb-1">{title}</h6>
    </div>
  </Flex>
);


const TopCourses = ({ tableData, className }) => {
  return (
    <Card className={classNames(className, 'overflow-hidden')}>
      <Row className="w-100 gx-3 align-items-center px-x1 mt-3">
        <Col xs="auto">
          <h6 className="text-900 mb-0">Agent Performance</h6>
        </Col>
        <Col xs="auto">
          <AdvanceTableSearchBox className="input-search-width" placeholder="Search" />
        </Col>
        <Col xs="auto">
          <h6 className="text-700 mb-0 text-center">Showing Data For:</h6>
        </Col>
        <Col md="auto">
          <GreetingsDate />
        </Col>

        <Col className="d-flex justify-content-end ms-auto" md="auto">
          <IconButton
            variant="falcon-default"
            size="sm"
            icon="external-link-alt"
            transform="shrink-3"
            className="mx-2"
            iconAlign="middle"
          >
            <span className="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">
              Export
            </span>
          </IconButton>
          <Dropdown align="end" className="btn-reveal-trigger d-inline-block">
            <Dropdown.Toggle split variant="falcon-default" size="sm">
              <FontAwesomeIcon icon="ellipsis-h" className="fs-11" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="border py-0">
              <div className="py-2">
                <Dropdown.Item>View</Dropdown.Item>
                <Dropdown.Item>Export</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">Remove</Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      
      <Tab.Container id="top-course-tab" defaultActiveKey="ivr">
        <SimpleBar>
          <Card.Header className="p-0">
            <Nav className="nav-tabs top-courses-tab border-0 flex-nowrap">
              <Nav.Item>
                <Nav.Link className="mb-0" eventKey="ivr">
                  <TabTitle title="IVR" icon="phone" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="mb-0" eventKey="email">
                  <TabTitle title="Email" icon="envelope" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="mb-0" eventKey="chat">
                  <TabTitle title="Chat" icon="comments" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
        </SimpleBar>

        <Card.Body className="p-0">
          <Tab.Content>
            <Tab.Pane unmountOnExit eventKey="ivr">
              <TopCoursesTable tableData={tableData.slice(0, 5)} />
            </Tab.Pane>
            <Tab.Pane unmountOnExit eventKey="email">
              <TopCoursesTable tableData={tableData.slice(5, 10)} />
            </Tab.Pane>
            <Tab.Pane unmountOnExit eventKey="chat">
              <TopCoursesTable tableData={tableData.slice(10, 15)} />
            </Tab.Pane>
          </Tab.Content>
        </Card.Body>
      </Tab.Container>

      <Card.Footer className="bg-body-tertiary py-2">
        <Row className="g-0 flex-between-center">
          <Col xs="auto">
            <Form.Select size="sm" className="me-2">
              <option>Last 7 days</option>
              <option>Last Month</option>
              <option>Last Year</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <FalconLink title="All Performance" className="px-0 fw-medium" />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

TabTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

TopCourses.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
};

export default TopCourses;
