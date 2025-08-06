import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
import AdvanceTable from 'components/common/advance-table/AdvanceTable';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import AdvanceTableFooter from 'components/common/advance-table/AdvanceTableFooter';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GreetingsDate from 'components/dashboards/crm/greetings/GreetingsDate';
import IconButton from 'components/common/IconButton';
import {
  faExternalLinkAlt,
  faEllipsisH,
  faClock,
  faPhone,
  faPauseCircle,
  faHourglassHalf,
  faBan,
  faHandPaper
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
  {
    accessorKey: 'AvgWorkHour',
    header: <span title="Average Worked Hours">AWH</span>,
    cell: ({ getValue }) => (
      <>
        <FontAwesomeIcon icon={faClock} className="me-1 text-success" />
        <span title="Average Worked Hours">{getValue()}</span>
      </>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'asa',
    header: <span title="Average Speed of Answer">ASA</span>,
    cell: ({ getValue }) => (
      <>
        <FontAwesomeIcon icon={faHourglassHalf} className="me-1 text-warning" />
        <span title="Average Speed of Answer (sec)">{getValue()}</span>
      </>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'talkTime',
    header: <span title="Average Talk Time">ATT</span>,
    cell: ({ getValue }) => (
      <>
        <FontAwesomeIcon icon={faPhone} className="me-1 text-primary" />
        <span title="Average Talk Time">{getValue()}</span>
      </>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'handlingTime',
    header: <span title="Average Handling Time">AHT</span>,
    cell: ({ getValue }) => (
      <>
        <FontAwesomeIcon icon={faClock} className="me-1 text-info" />
        <span title="Average Handling Time">{getValue()}</span>
      </>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'holdTime',
    header: <span title="Average Hold Time">AHT</span>,
    cell: ({ getValue }) => (
      <>
        <FontAwesomeIcon icon={faPauseCircle} className="me-1 text-secondary" />
        <span title="Average Hold Time">{getValue()}</span>
      </>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'wrapUpTime',
    header: <span title="Average Wrap-Up Time">AWT</span>,
    cell: ({ getValue }) => (
      <span title="Average Wrap-Up Time">{getValue()}</span>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'droppedBefore',
    header: <span title="Dropped Before Pickup">DBP</span>,
    cell: ({ getValue }) => (
      <>
        <FontAwesomeIcon icon={faHandPaper} className="me-1 text-warning" />
        <span title="Dropped Before Pickup">{getValue()}</span>
      </>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'droppedAfter',
    header: <span title="Dropped After Pickup">DAP</span>,
    cell: ({ getValue }) => (
      <>
        <FontAwesomeIcon icon={faBan} className="me-1 text-danger" />
        <span title="Dropped After Pickup">{getValue()}</span>
      </>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'idleTime',
    header: <span title="Idle Time">Idle Time</span>,
    cell: ({ getValue }) => (
      <span title="Idle Time (minutes)">{getValue()}</span>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  },
  {
    accessorKey: 'noAnswer',
    header: <span title="No Answer">No Answer</span>,
    cell: ({ getValue }) => (
      <span title="No Answer">{getValue()}</span>
    ),
    meta: {
      headerProps: { className: 'text-center fw-medium text-900' },
      cellProps: { className: 'text-center text-900' }
    }
  }
];

const TopPages = ({ tableData, perPage = 8 }) => {
  const table = useAdvanceTable({
    data: tableData,
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
              <h6 className="text-900 mb-0">Agent Performance</h6>
            </Col>
            <Col xs="auto">
              <AdvanceTableSearchBox className="input-search-width" placeholder="Search" />
            </Col>
            {/* <Col xs="auto">
              <h6 className="text-700 mb-0 text-center">Showing Data For:</h6>
            </Col>
            <Col md="auto">
              <GreetingsDate />
            </Col> */}

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

TopPages.propTypes = {
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

export default TopPages;
