import React, { useState } from 'react';
import { Table, Pagination, Card, Col, Row, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GreetingsDate from 'components/dashboards/crm/greetings/GreetingsDate';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import IconButton from 'components/common/IconButton';
import { faComments, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const TableRow = ({ data }) => (
  <tr className="align-middle white-space-nowrap">
    <td className="fs-10">{data.agentName}</td>
    <td className="fs-10">{data.date}</td>
    <td className="text-center fs-10">
      {data.waitingCalls}
    </td>
    <td className="text-center fs-10">
      {data.avgCallTime}
    </td>
    <td className="text-center fs-10">
      {data.avgWaitingTime}
    </td>
    <td className="text-center fs-10">
      {data.abandonedCalls}
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

const Backgrounds = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const callStatsData = [
    {
      date: 'May 1',
      agentName: 'Raj Kumar',
      waitingCalls: 50,
      avgCallTime: '4m 10s',
      avgWaitingTime: '2m 30s',
      abandonedCalls: 15,
      mode: 'Chat'
    },
    {
      date: 'May 2',
      agentName: 'Neha Sahu',
      waitingCalls: 40,
      avgCallTime: '3m 50s',
      avgWaitingTime: '2m 20s',
      abandonedCalls: 20,
      mode: 'Email'
    },
    {
      date: 'May 3',
      agentName: 'Kumar Ravi',
      waitingCalls: 55,
      avgCallTime: '4m 25s',
      avgWaitingTime: '2m 45s',
      abandonedCalls: 18,
      mode: 'IVR'
    },
    {
      date: 'May 4',
      agentName: 'Payal Singh',
      waitingCalls: 35,
      avgCallTime: '3m 30s',
      avgWaitingTime: '2m 10s',
      abandonedCalls: 12,
      mode: 'Chat'
    },
    {
      date: 'May 5',
      agentName: 'Minakshi Sen',
      waitingCalls: 48,
      avgCallTime: '4m 00s',
      avgWaitingTime: '2m 50s',
      abandonedCalls: 19,
      mode: 'Email'
    },
    {
      date: 'May 6',
      agentName: 'Raj Kumar',
      waitingCalls: 52,
      avgCallTime: '4m 15s',
      avgWaitingTime: '2m 35s',
      abandonedCalls: 16,
      mode: 'IVR'
    },
    {
      date: 'May 7',
      agentName: 'Neha Sahu',
      waitingCalls: 42,
      avgCallTime: '3m 55s',
      avgWaitingTime: '2m 25s',
      abandonedCalls: 21,
      mode: 'Chat'
    },
    {
      date: 'May 8',
      agentName: 'Kumar Ravi',
      waitingCalls: 58,
      avgCallTime: '4m 35s',
      avgWaitingTime: '2m 55s',
      abandonedCalls: 22,
      mode: 'Chat'
    },
    {
      date: 'May 9',
      agentName: 'Payal Singh',
      waitingCalls: 37,
      avgCallTime: '3m 40s',
      avgWaitingTime: '2m 20s',
      abandonedCalls: 14,
      mode: 'Chat'
    },
    {
      date: 'May 10',
      agentName: 'Minakshi Sen',
      waitingCalls: 45,
      avgCallTime: '4m 05s',
      avgWaitingTime: '2m 40s',
      abandonedCalls: 17,
      mode: 'Chat'
    }
  ];


  const totalPages = Math.ceil(callStatsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = callStatsData.slice(startIndex, startIndex + itemsPerPage);

  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Card className="h-100">
      <div className="d-lg-flex justify-content-between my-3">
        <Row className="w-100 gx-3 align-items-center px-x1">
          <Col xs="auto">
            <h6 className="text-900 mb-0">Queue Analysis</h6>
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
      </div>

      <Card.Body className="p-0">
        <Table responsive striped hover>
          <thead className="bg-200 text-nowrap align-middle">
            <tr>
              <th className="fs-10">Agent Name</th>
              <th className="fs-10">Date</th>
              <th className="text-center fs-10">Waiting Calls</th>
              <th className="text-center fs-10">Avg. Call Time</th>
              <th className="text-center fs-10">Avg. Waiting Time</th>
              <th className="text-center fs-10">Abandoned Calls</th>
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

export default Backgrounds;
