import React from 'react';
import IconButton from 'components/common/IconButton';
import { Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import { useAdvanceTableContext } from 'providers/AdvanceTableProvider';
import GreetingsDate from 'components/dashboards/crm/greetings/GreetingsDate';

const CustomersTableHeader = () => {
  const { getSelectedRowModel } = useAdvanceTableContext();

  return (
    <>
      <Row className="flex-between-center mb-3">
        <Col xs={4} sm="auto" className="d-flex align-items-center pe-0">
          <h5 className="fs-9 mb-0 text-nowrap py-2 py-xl-0">Outbound Calls</h5>
        </Col>
        <Col xs={8} sm="auto" className="ms-auto text-end ps-0">
          {getSelectedRowModel().rows.length > 0 ? (
            <div className="d-flex">
              <Form.Select size="sm" aria-label="Bulk actions">
                <option>Bulk Actions</option>
                <option value="refund">Refund</option>
                <option value="delete">Delete</option>
                <option value="archive">Archive</option>
              </Form.Select>
              <Button
                type="button"
                variant="falcon-default"
                size="sm"
                className="ms-2"
              >
                Apply
              </Button>
            </div>
          ) : (
            <div id="orders-actions">
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="filter"
                transform="shrink-3"
                className="me-2"
              >
                <span className="d-none d-sm-inline-block ms-1">Filter</span>
              </IconButton>
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="external-link-alt"
                transform="shrink-3"
              >
                <span className="d-none d-sm-inline-block ms-1">Export</span>
              </IconButton>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Control size="sm" type="text" placeholder="Search by Caller or Ticket No." />
        </Col>
        <Col md={4}>
          <Form.Select size="sm">
            <option value="">Status</option>
            <option value="closed">Closed</option>
            <option value="escalated">Escalated</option>
            <option value="pending">Pending</option>
          </Form.Select>
        </Col>
        <Col md={4}>
         <GreetingsDate />
        </Col>
      </Row>
    </>
  );
};

export default CustomersTableHeader;
