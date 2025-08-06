import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import IconButton from 'components/common/IconButton';
import FalconCardFooterLink from 'components/common/FalconCardFooterLink';
import paths from 'routes/paths';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubtleBadge from 'components/common/SubtleBadge';
import GreetingsDate from 'components/dashboards/crm/greetings/GreetingsDate';
import {
  faExternalLinkAlt,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

const columns = [
  {
    accessorKey: 'ticketNo',
    header: 'Ticket No.',
    meta: {
      headerProps: { className: 'fw-medium text-900' },
      cellProps: {
        className: 'white-space-nowrap',
        style: { maxWidth: '23rem' }
      }
    },
    cell: ({ row: { original } }) => {
      const { ticketNo } = original;
      return <Link to={paths.contactDetails}>{ticketNo}</Link>;
    }
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    meta: {
      headerProps: { className: 'fw-medium text-900' },
      cellProps: { className: 'text-start' }
    }
  },
  {
    accessorKey: 'agentName',
    header: 'Agent Name',
    meta: {
      headerProps: { className: 'fw-medium text-900' },
      cellProps: { className: 'text-start' }
    }
  },
  {
    accessorKey: 'complaintType',
    header: 'Complaint Type',
    meta: {
      headerProps: { className: 'fw-medium text-900' },
      cellProps: { className: 'text-start' }
    }
  },
  {
    accessorKey: 'breachTime',
    header: 'Breach Time',
    meta: {
      headerProps: { className: 'fw-medium text-900 text-center' },
      cellProps: { className: 'text-center' }
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      headerProps: { className: 'text-center text-900' },
      cellProps: { className: 'fs-9' }
    },
    cell: ({ row: { original } }) => {
      const { status } = original;
      if (!status) {
        return <span>-</span>;
      }
      return (
        <SubtleBadge pill bg={status.type} className="d-block">
          {status.content}
          <FontAwesomeIcon
            icon={status.icon}
            transform="shrink-2"
            className="ms-1"
          />
        </SubtleBadge>
      );
    }
  },
  {
    accessorKey: 'slaType',
    header: 'SLA Type',
    meta: {
      headerProps: {
        className: 'fw-medium text-900'
      }
    },
  },
  {
    accessorKey: 'targetTime',
    header: 'Target Time',
    meta: {
      headerProps: {
        className: 'fw-medium text-center text-900'
      },
      cellProps: {
        className: 'text-center'
      }
    },
  },
  {
    accessorKey: 'actualTime',
    header: 'Actual Time',
    meta: {
      headerProps: {
        className: 'fw-medium text-center text-900'
      },
      cellProps: {
        className: 'text-center'
      }
    },
  },
  {
    accessorKey: 'breached',
    header: 'Breached?',
    meta: {
      headerProps: {
        className: 'fw-medium text-center text-900'
      },
      cellProps: {
        className: 'text-center d-flex align-items-center justify-content-center gap-1'
      }
    },
    cell: ({ row: { original } }) => {
      const breachedValue = original.breached;
      const breached =
        typeof breachedValue === 'string' && breachedValue.toLowerCase() === 'yes';
      return (
        <span>
          {breached ? '❌' : '✅'} {breached ? 'Yes' : 'No'}
        </span>
      );
    }
  },
  {
    accessorKey: 'date',
    header: 'Date',
    meta: {
      headerProps: {
        className: 'fw-medium text-center text-900'
      },
      cellProps: {
        className: 'text-center'
      }
    },
  },
  // {
  //   accessorKey: 'none',
  //   header: '',
  //   enableSorting: false,
  //   meta: {
  //     cellProps: {
  //       className: 'text-end'
  //     }
  //   },
  //   cell: () => {
  //     return (
  //       <CardDropdown drop="start">
  //         <div className="py-2">
  //           <Dropdown.Item href="#!">View</Dropdown.Item>
  //           <Dropdown.Item href="#!">Edit</Dropdown.Item>
  //           <Dropdown.Item href="#!">Refund</Dropdown.Item>
  //           <Dropdown.Divider as="div" />
  //           <Dropdown.Item href="#!" className="text-warning">
  //             Archive
  //           </Dropdown.Item>
  //           <Dropdown.Item href="#!" className="text-danger">
  //             Delete
  //           </Dropdown.Item>
  //         </div>
  //       </CardDropdown>
  //     );
  //   }
  // }
];

const EnrolledCourses = ({ data, perPage = 6 }) => {
  const table = useAdvanceTable({
    data,
    columns,
    sortable: true,
    pagination: true,
    perPage
  });

  return (
    <AdvanceTableProvider {...table}>
      <Card className="h-100">
        <div className="d-lg-flex justify-content-between my-3">
          <Row className="w-100 gx-3 align-items-center px-x1">
            <Col xs="auto">
              <h6 className="text-900 mb-0">SLA Compliance Breakdown</h6>
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
            headerClassName="bg-body-tertiary fw-medium font-sans-serif white-space-nowrap"
            rowClassName="btn-reveal-trigger align-middle white-space-nowrap"
            tableProps={{
              className: 'fs-10 mb-0 overflow-hidden fw-semibold'
            }}
          />
        </Card.Body>
        <FalconCardFooterLink title="Show all compliance" size="sm" />
      </Card>
    </AdvanceTableProvider>
  );
};

EnrolledCourses.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ticketNo: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      agentName: PropTypes.string.isRequired,
      complaintType: PropTypes.string.isRequired,
      breachTime: PropTypes.string.isRequired,
      status: PropTypes.shape({
        type: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        icon: PropTypes.object.isRequired
      }).isRequired,
      slaType: PropTypes.string.isRequired,
      targetTime: PropTypes.string.isRequired,
      actualTime: PropTypes.string.isRequired,
      breached: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })
  ).isRequired,
  perPage: PropTypes.number
};

export default EnrolledCourses;
