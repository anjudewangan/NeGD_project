import React, { useState } from 'react';
import { Table, Pagination, Card, Col, Row, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faComments,
  faEnvelope,
  faExternalLinkAlt,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

import GreetingsDate from 'components/dashboards/crm/greetings/GreetingsDate';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import IconButton from 'components/common/IconButton';
import paths from 'routes/paths';

const TableRow = ({ data }) => (
  <tr className="align-middle white-space-nowrap">
    <td className="text-center fs-10">
      <Link to={paths.contactDetails}>{data.ticketNo}</Link>
    </td>
    <td className="text-center fs-10">{data.agentName}</td>
    <td className="text-center fs-10">{data.date}</td>

    <td className="text-center fs-10">
      {data.totalInboundCalls}
    </td>
    <td className="text-center fs-10">
      {data.divertedToAgent}
    </td>
    <td className="text-center fs-10">
      {data.droppedAtIVRS}
    </td>
    <td className="text-center fs-10">
      {data.resolvedViaIVRS}
    </td>
    <td className="text-center fs-10">
      {data.avgIVRSTime}
    </td>
    <td className="text-center fs-10">
      {data.avgWaitTime}
    </td>
    <td className="text-center fs-10">
      {data.peakHour}
    </td>
    <td className="text-center fs-10">
      {data.mode === 'Chat' && (
        <>
          <FontAwesomeIcon icon={faComments} className="me-1 text-info" />
        </>
      )}
      {data.mode === 'Email' && (
        <>
          <FontAwesomeIcon icon={faEnvelope} className="me-1 text-danger" />
        </>
      )}
      {data.mode === 'IVR' && (
        <>
          <FontAwesomeIcon icon={faPhone} className="me-1 text-success" />
        </>
      )}
    </td>
  </tr>
);

const ResponsiveTableExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const callStatsData = [
    {
      date: 'May 1',
      agentName: 'Raj Kumar',
      ticketNo: 'TK-1001',
      totalInboundCalls: 420,
      divertedToAgent: 300,
      droppedAtIVRS: 90,
      resolvedViaIVRS: 30,
      avgIVRSTime: '1m 20s',
      avgWaitTime: '3m 10s',
      peakHour: '11:00 AM – 02:00 PM',
      mode: 'Chat'
    },
    {
      date: 'May 2',
      agentName: 'Neha Sahu',
      ticketNo: 'TK-1002',
      totalInboundCalls: 460,
      divertedToAgent: 320,
      droppedAtIVRS: 100,
      resolvedViaIVRS: 40,
      avgIVRSTime: '1m 40s',
      avgWaitTime: '3m 05s',
      peakHour: '10:00 AM – 11:00 AM',
      mode: 'Email'
    },
    {
      date: 'May 3',
      agentName: 'Kumar Ravi',
      ticketNo: 'TK-1003',
      totalInboundCalls: 395,
      divertedToAgent: 280,
      droppedAtIVRS: 85,
      resolvedViaIVRS: 30,
      avgIVRSTime: '1m 25s',
      avgWaitTime: '3m 12s',
      peakHour: '2:00 PM – 3:00 PM',
      mode: 'IVR'
    },
    {
      date: 'May 4',
      agentName: 'Payal Singh',
      ticketNo: 'TK-1004',
      totalInboundCalls: 410,
      divertedToAgent: 290,
      droppedAtIVRS: 90,
      resolvedViaIVRS: 30,
      avgIVRSTime: '1m 30s',
      avgWaitTime: '3m 20s',
      peakHour: '11:00 AM – 02:00 PM',
      mode: 'Chat'
    },
    {
      date: 'May 5',
      agentName: 'Minakshi Sen',
      ticketNo: 'TK-1005',
      totalInboundCalls: 475,
      divertedToAgent: 335,
      droppedAtIVRS: 105,
      resolvedViaIVRS: 35,
      avgIVRSTime: '1m 35s',
      avgWaitTime: '3m 15s',
      peakHour: '11:00 AM – 02:00 PM',
      mode: 'Email'
    },
    {
      date: 'May 6',
      agentName: 'Raj Kumar',
      ticketNo: 'TK-1006',
      totalInboundCalls: 440,
      divertedToAgent: 310,
      droppedAtIVRS: 95,
      resolvedViaIVRS: 35,
      avgIVRSTime: '1m 45s',
      avgWaitTime: '3m 10s',
      peakHour: '12:00 PM – 1:00 PM',
      mode: 'IVR'
    },
    {
      date: 'May 7',
      agentName: 'Neha Sahu',
      ticketNo: 'TK-1007',
      totalInboundCalls: 460,
      divertedToAgent: 325,
      droppedAtIVRS: 100,
      resolvedViaIVRS: 35,
      avgIVRSTime: '1m 50s',
      avgWaitTime: '3m 05s',
      peakHour: '2:00 PM – 3:00 PM',
      mode: 'Chat'
    },
    {
      date: 'May 8',
      agentName: 'Kumar Ravi',
      ticketNo: 'TK-1008',
      totalInboundCalls: 430,
      divertedToAgent: 305,
      droppedAtIVRS: 90,
      resolvedViaIVRS: 35,
      avgIVRSTime: '1m 20s',
      avgWaitTime: '3m 00s',
      peakHour: '11:00 AM – 02:00 PM',
      mode: 'Email'
    }
  ];

  const totalPages = Math.ceil(callStatsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = callStatsData.slice(startIndex, startIndex + itemsPerPage);

  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Card className="h-100">
      <div className="d-lg-flex justify-content-between my-3">
        <Row className="w-100 gx-3 align-items-center px-x1">
          <Col xs="auto">
            <h6 className="text-900 mb-0">Call Volume Trend</h6>
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
        <Table responsive striped hover>
          <thead className="bg-200 text-nowrap align-middle">
            <tr>
              <th className="text-center fs-10">Ticket No.</th>
              <th className="text-center fs-10">Agent Name</th>
              <th className="text-center fs-10">Date</th>
              <th className="text-center fs-10">Total Inbound Calls</th>
              <th className="text-center fs-10">Diverted to Agent</th>
              <th className="text-center fs-10">Dropped at IVRS</th>
              <th className="text-center fs-10">Resolved via IVRS</th>
              <th className="text-center fs-10">Avg. IVRS Time</th>
              <th className="text-center fs-10">Avg. Wait Time</th>
              <th className="text-center fs-10">Peak Hour</th>
              <th className="text-center fs-10">Mode</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <TableRow data={item} key={index} />
            ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center my-3">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          />
          {paginationItems}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          />
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default ResponsiveTableExample;
