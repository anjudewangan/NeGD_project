import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/common/IconButton';
import {
  faExternalLinkAlt,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

const columns = [
  {
    accessorKey: 'agentName',
    header: 'Agent Name',
    meta: {
      headerProps: { className: 'fw-medium text-900' },
      cellProps: { className: 'text-900' }
    }
  },
  {
    accessorKey: 'agentId',
    header: 'Agent ID',
    meta: {
      headerProps: { className: 'fw-medium text-900' },
      cellProps: { className: 'text-900' }
    }
  },
  ...[1, 2, 3, 4, 5, 6, 7].map(day => ({
    accessorKey: `day${day}`,
    header: `Day ${day}`,
    cell: ({ row }) => {
      const login = row.original[`day${day}Login`];
      const logout = row.original[`day${day}Logout`];
      return (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
          <span style={{ fontWeight: '600', color: '#2a9d8f' }}>Login: {login || '-'}</span>
          <span style={{ fontWeight: '600', color: '#e76f51' }}>Logout: {logout || '-'}</span>
        </div>
      );
    },
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  })),
];

const Buttons = ({ tableData, perPage = 8 }) => {
  const table = useAdvanceTable({
    data: tableData,
    columns,
    sortable: true,
    pagination: true,
    perPage
  });

  return (
    <AdvanceTableProvider {...table}>
      <Card className="h-100 mt-3">
        <div className="d-lg-flex justify-content-between my-3">
          <Row className="w-100 gx-3 align-items-center px-x1">
            <Col xs="auto">
              <h6 className="text-900 mb-0">Agent Performance in Last Week</h6>
            </Col>
            <Col xs="auto">
              <AdvanceTableSearchBox className="input-search-width" placeholder="Search" />
            </Col>

            <Col className="d-flex justify-content-end ms-auto" md="auto">
              <IconButton
                variant="falcon-default"
                size="sm"
                icon={faExternalLinkAlt}
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
                  <FontAwesomeIcon icon={faEllipsisH} className="fs-11" />
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
        </div>

        <Card.Body className="p-0">
          <AdvanceTable
            headerClassName="bg-200 text-nowrap align-middle"
            rowClassName="align-middle white-space-nowrap"
            tableProps={{
              className: 'fs-10 mb-0 overflow-hidden'
            }}
          />
        </Card.Body>
        <Card.Footer>
          <AdvanceTableFooter rowInfo navButtons />
        </Card.Footer>
      </Card>
    </AdvanceTableProvider>
  );
};

Buttons.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      ticketId: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      agentName: PropTypes.string.isRequired,
      complaintType: PropTypes.string.isRequired,
      breachTime: PropTypes.string.isRequired,
      status: PropTypes.shape({
        type: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        icon: PropTypes.any.isRequired
      }).isRequired,

    })
  ).isRequired,
  perPage: PropTypes.number
};

export default Buttons;
