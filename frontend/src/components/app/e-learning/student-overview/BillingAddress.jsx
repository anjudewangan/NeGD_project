import React from 'react';
import PropTypes from 'prop-types';
import CardDropdown from 'components/common/CardDropdown';
import FalconCardHeader from 'components/common/FalconCardHeader';
import GoogleMap from 'components/map/GoogleMap';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from 'providers/AppProvider';

const MapDark = () => {
  return (
    <GoogleMap
      initialCenter={{
       lat: 19.06885449771911,
        lng: 72.87068628236712
      }}
      mapStyle="Cobalt"
      className="rounded-soft position-relative"
      style={{ minHeight: '18.75rem' }}
    >
      <h5 className="text-700">Excellent Street</h5>
      <p className="fs-10 mb-0">
        987, Apartment 6, Excellent Street, Good Area, Clean City 5434, Mumbai
      </p>
    </GoogleMap>
  );
};
const MapLight = () => {
  return (
    <GoogleMap
      initialCenter={{
       lat: 19.06885449771911,
        lng: 72.87068628236712
      }}
      mapStyle="Default"
      className="rounded-soft position-relative"
      style={{ minHeight: '18.75rem' }}
    >
      <h5 className="text-700">Excellent Street</h5>
      <p className="fs-10 mb-0">
        987, Apartment 6, Excellent Street, Good Area, Clean City 5434, Mumbai
      </p>
    </GoogleMap>
  );
};

const BillingAddress = () => {
  const {
    config: { isDark }
  } = useAppContext();
  return (
    <Card className="h-100">
      <FalconCardHeader
        light
        title="Caller Information"
        titleTag="h6"
        className="py-2"
        endEl={<CardDropdown />}
      />
      <Card.Body className="p-0">
        <Row className="g-0 h-100">
          <Col xs={12}>{isDark ? <MapDark /> : <MapLight />}</Col>
          <Col xs={12} className="p-x1 flex-1">
            <Table
              borderless
              className="fw-medium font-sans-serif fs-10 h-100 mb-0"
            >
              <tbody>
                <tr className="hover-actions-trigger">
                  <td className="p-1" style={{ width: '35%' }}>
                    Name:
                  </td>
                  <td className="p-1 text-600">
                    Neha Sharma
                    <HoverActionsBtn />
                  </td>
                </tr>
                <tr className="hover-actions-trigger">
                  <td className="p-1" style={{ width: '35%' }}>
                    Address:
                  </td>
                  <td className="p-1 text-600">
                    987, Apartment 6, Excellent Street, Good Area, Clean City
                    5434, Mumbai.
                    <HoverActionsBtn />
                  </td>
                </tr>
                <tr className="hover-actions-trigger">
                  <td className="p-1" style={{ width: '35%' }}>
                    Email:
                  </td>
                  <td className="p-1 text-600">
                    <a
                      href="mailto:nehasharma123@gmail.com"
                      className="text-600 text-decoration-none"
                    >
                      nehasharma123@gmail.com
                    </a>
                    <HoverActionsBtn />
                  </td>
                </tr>
                <tr className="hover-actions-trigger">
                  <td className="p-1" style={{ width: '35%' }}>
                    Mobile No:
                  </td>
                  <td className="p-1 text-600">
                    <a
                      href="tel:+12025550110"
                      className="text-600 text-decoration-none"
                    >
                      +91 8899550127
                    </a>
                    <HoverActionsBtn />
                  </td>
                </tr>
                <tr className="hover-actions-trigger">
                  <td className="p-1" style={{ width: '35%' }}>
                    Language:
                  </td>
                  <td className="p-1 text-600">
                    English
                    <HoverActionsBtn />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const HoverActionsBtn = ({ to = '#!', icon = 'pencil-alt' }) => (
  <Button
    as={Link}
    variant="link"
    to={to}
    type="button"
    size="sm"
    className="hover-actions p-0"
  >
    <FontAwesomeIcon icon={icon} transform="up-4" className="ms-2 fs-11" />
  </Button>
);

HoverActionsBtn.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string
};

export default BillingAddress;
