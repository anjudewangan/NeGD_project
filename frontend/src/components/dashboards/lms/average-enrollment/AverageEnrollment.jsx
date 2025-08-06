import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row } from 'react-bootstrap';
import CardDropdown from 'components/common/CardDropdown';
import Flex from 'components/common/Flex';
import AverageEnrollmentChart from './AverageEnrollmentChart';

const AverageEnrollment = ({ data }) => {
  const chartRef = useRef(null);

  const handleLegendToggle = (event, name) => {
    chartRef.current.getEchartsInstance().dispatchAction({
      type: 'legendToggleSelect',
      name
    });
    event.target.closest('button').classList.toggle('opacity-50');
  };

  return (
    <Card>
      <Card.Header>
        <Row className="flex-between-center g-0">
          <Col xs="auto">
            <h6 className="mb-0">SLA Trends Over Time</h6>
          </Col>
          <Col md="auto" className="order-1 order-md-0">
            <Flex className="flex-wrap gap-md-2">
              <Button
                variant="text"
                size="sm"
                className="d-flex align-items-center p-0 shadow-none"
                onClick={event => handleLegendToggle(event, 'SLA Response Time Trend')}
              >
                <FontAwesomeIcon
                  icon="circle"
                  className="text-primary fs-11 me-1"
                  transform="shrink-3"
                />
                <small className="text-600">SLA Response Time Trend</small>
              </Button>
              <Button
                variant="text"
                size="sm"
                className="d-flex align-items-center p-0 shadow-none ms-2"
                onClick={event =>
                  handleLegendToggle(event, 'Abandon Rate Trend')
                }
              >
                <FontAwesomeIcon
                  icon="circle"
                  className="text-warning fs-11 me-1"
                  transform="shrink-3"
                />
                <small className="text-600">Abandon Rate Trend</small>
              </Button>
            </Flex>
          </Col>
          <Col xs="auto">
            <CardDropdown />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="pb-0">
        <AverageEnrollmentChart
          data={data}
          ref={chartRef}
          style={{ 'min-height': '18.625rem', width: '100%' }}
        />
      </Card.Body>
    </Card>
  );
};

AverageEnrollment.propTypes = {
  data: PropTypes.shape({
    onSaleCourse: PropTypes.array,
    regularPaidCourse: PropTypes.array
  })
};

export default AverageEnrollment;
