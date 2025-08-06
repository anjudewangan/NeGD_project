import React, { useState } from 'react';
import {
  Table,
  Card,
  Col,
  Row,
  Dropdown,
  Form,
  Button,
  ButtonGroup,
  Badge,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import IconButton from 'components/common/IconButton';
import {
  activeUser,
} from 'data/dashboard/saas';
import SaasActiveUser from 'components/dashboards/saas/SaasActiveUser';
import SaasRevenue from 'components/dashboards/saas/SaasRevenue';
import SaasConversion from 'components/dashboards/saas/SaasConversion';

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case 'ringing': return 'info';
    case 'in call': return 'success';
    case 'on hold': return 'warning';
    case 'transferred': return 'primary';
    default: return 'light';
  }
};

const userPermissions = {
  canListen: true,
  canWhisper: true,
  canBargeIn: true,
};

const TableRow = ({ data, onListen, onWhisper, onBargeIn }) => (
  <tr className="align-middle white-space-nowrap">
    <td className="fs-10">{data.agentName}</td>
    <td className="text-center fs-10">{data.agentId}</td>
    <td className="text-center fs-10">{data.language}</td>
    <td className="text-center fs-10">
      <Badge bg={getStatusBadgeVariant(data.callStatus)} className="text-uppercase">
        {data.callStatus}
      </Badge>
    </td>
    <td className="text-center fs-10">{data.phoneNumber}</td>
    <td className="text-center fs-10">{data.callDuration}</td>
    <td className="text-center fs-10">{data.callType}</td>
    <td className="text-center fs-10">{data.department}</td>
    <td className="text-center fs-10">
      <ButtonGroup size="sm">
        {userPermissions.canListen && (
          <Button variant="outline-primary" title="Listen – One-way audio monitoring" onClick={() => onListen(data.callId)}>Listen</Button>
        )}
        {userPermissions.canWhisper && (
          <Button variant="outline-warning" title="Whisper – Talk to agent without caller hearing" onClick={() => onWhisper(data.callId)}>Whisper</Button>
        )}
        {userPermissions.canBargeIn && (
          <Button variant="outline-danger" title="Barge-In – Join the call, 3-way audio" onClick={() => onBargeIn(data.callId)}>Barge-In</Button>
        )}
      </ButtonGroup>
    </td>
  </tr>
);


const Breadcrumb = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 35;
  const [toast, setToast] = useState({ show: false, message: '', bg: 'info' });

  const showToast = (message, bg = 'info') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleListen = (callId) => showToast(`Listen started for call ID: ${callId}`, 'primary');
  const handleWhisper = (callId) => showToast(`Whisper enabled for call ID: ${callId}`, 'warning');
  const handleBargeIn = (callId) => showToast(`Barge-In started for call ID: ${callId}`, 'danger');

  const callStatsData = [
    { callId: 'c1001', agentId: 'A001', agentName: 'Raj Kumar', language: 'Hindi', callStatus: 'ringing', phoneNumber: '123-456-7890', callDuration: '4m 10s', callType: 'Inbound', department: 'Support' },
    { callId: 'c1002', agentId: 'A002', agentName: 'Neha Sahu', language: 'English', callStatus: 'in call', phoneNumber: '234-567-8901', callDuration: '3m 50s', callType: 'Outbound', department: 'Sales' },
    { callId: 'c1003', agentId: 'A003', agentName: 'Kumar Ravi', language: 'Telugu', callStatus: 'on hold', phoneNumber: '345-678-9012', callDuration: '5m 15s', callType: 'Queue', department: 'Support' },
    { callId: 'c1004', agentId: 'A004', agentName: 'Payal Singh', language: 'Marathi', callStatus: 'transferred', phoneNumber: '456-789-0123', callDuration: '2m 30s', callType: 'Divert', department: 'Tech' },
    { callId: 'c1005', agentId: 'A005', agentName: 'Minakshi Sen', language: 'Tamil', callStatus: 'on hold', phoneNumber: '567-890-1234', callDuration: '4m 05s', callType: 'Inbound', department: 'Support' },
    { callId: 'c1006', agentId: 'A006', agentName: 'Raj Kumar', language: 'Odia', callStatus: 'ringing', phoneNumber: '678-901-2345', callDuration: 'N/A', callType: 'Queue', department: 'Sales' },
    { callId: 'c1007', agentId: 'A007', agentName: 'Neha Sahu', language: 'Hindi', callStatus: 'in call', phoneNumber: '789-012-3456', callDuration: '3m 40s', callType: 'Outbound', department: 'Support' },
    { callId: 'c1008', agentId: 'A008', agentName: 'Kumar Ravi', language: 'English', callStatus: 'ringing', phoneNumber: '890-123-4567', callDuration: '1m 50s', callType: 'Inbound', department: 'Tech' },
    { callId: 'c1009', agentId: 'A009', agentName: 'Reena Das', language: 'Odia', callStatus: 'transferred', phoneNumber: '901-234-5678', callDuration: '5m 20s', callType: 'Divert', department: 'Support' },
    { callId: 'c1010', agentId: 'A010', agentName: 'Arjun Mehta', language: 'Tamil', callStatus: 'in call', phoneNumber: '123-321-4321', callDuration: '2m 15s', callType: 'Outbound', department: 'Sales' },
    { callId: 'c1011', agentId: 'A011', agentName: 'Sneha Iyer', language: 'Marathi', callStatus: 'transferred', phoneNumber: '111-222-3333', callDuration: '3m 30s', callType: 'Inbound', department: 'Tech' },
    { callId: 'c1012', agentId: 'A012', agentName: 'Ravi Naik', language: 'Hindi', callStatus: 'on hold', phoneNumber: '222-333-4444', callDuration: '4m 45s', callType: 'Queue', department: 'Support' },
    { callId: 'c1013', agentId: 'A013', agentName: 'Anita Rao', language: 'Telugu', callStatus: 'in call', phoneNumber: '333-444-5555', callDuration: '6m 05s', callType: 'Inbound', department: 'Sales' },
    { callId: 'c1014', agentId: 'A014', agentName: 'Sandeep Joshi', language: 'English', callStatus: 'ringing', phoneNumber: '444-555-6666', callDuration: '2m 50s', callType: 'Outbound', department: 'Tech' },
    { callId: 'c1015', agentId: 'A015', agentName: 'Meera Nair', language: 'Hindi', callStatus: 'on hold', phoneNumber: '555-666-7777', callDuration: '4m 35s', callType: 'Divert', department: 'Support' },
    { callId: 'c1016', agentId: 'A016', agentName: 'Devansh Roy', language: 'Tamil', callStatus: 'ringing', phoneNumber: '666-777-8888', callDuration: '1m 10s', callType: 'Inbound', department: 'Sales' },
    { callId: 'c1017', agentId: 'A017', agentName: 'Nikita Verma', language: 'English', callStatus: 'in call', phoneNumber: '777-888-9999', callDuration: '4m 00s', callType: 'Queue', department: 'Tech' },
    { callId: 'c1018', agentId: 'A018', agentName: 'Arvind Bhatt', language: 'Telugu', callStatus: 'on hold', phoneNumber: '888-999-0000', callDuration: '5m 25s', callType: 'Outbound', department: 'Support' },
    { callId: 'c1019', agentId: 'A019', agentName: 'Divya Shetty', language: 'Marathi', callStatus: 'transferred', phoneNumber: '999-000-1111', callDuration: '3m 35s', callType: 'Divert', department: 'Sales' },
    { callId: 'c1020', agentId: 'A020', agentName: 'Abhay Rao', language: 'Hindi', callStatus: 'in call', phoneNumber: '000-111-2222', callDuration: '2m 40s', callType: 'Inbound', department: 'Tech' },
    { callId: 'c1021', agentId: 'A021', agentName: 'Farah Khan', language: 'Odia', callStatus: 'ringing', phoneNumber: '321-432-5432', callDuration: '3m 55s', callType: 'Queue', department: 'Support' },
    { callId: 'c1022', agentId: 'A022', agentName: 'Prakash Desai', language: 'Telugu', callStatus: 'on hold', phoneNumber: '432-543-6543', callDuration: '4m 05s', callType: 'Outbound', department: 'Sales' },
    { callId: 'c1023', agentId: 'A023', agentName: 'Lalita Ghosh', language: 'English', callStatus: 'in call', phoneNumber: '543-654-7654', callDuration: '2m 25s', callType: 'Inbound', department: 'Tech' },
    { callId: 'c1024', agentId: 'A024', agentName: 'Harsh Kapoor', language: 'Marathi', callStatus: 'ringing', phoneNumber: '654-765-8765', callDuration: '3m 20s', callType: 'Divert', department: 'Support' },
    { callId: 'c1025', agentId: 'A025', agentName: 'Jaya Mishra', language: 'Hindi', callStatus: 'on hold', phoneNumber: '765-876-9876', callDuration: '4m 15s', callType: 'Queue', department: 'Sales' },
    { callId: 'c1026', agentId: 'A026', agentName: 'Manoj Bhatia', language: 'Tamil', callStatus: 'transferred', phoneNumber: '876-987-0987', callDuration: '3m 45s', callType: 'Outbound', department: 'Tech' },
    { callId: 'c1027', agentId: 'A027', agentName: 'Tina Dutta', language: 'Odia', callStatus: 'ringing', phoneNumber: '987-098-1098', callDuration: '5m 10s', callType: 'Inbound', department: 'Support' },
    { callId: 'c1028', agentId: 'A028', agentName: 'Sameer Joshi', language: 'Telugu', callStatus: 'in call', phoneNumber: '098-109-2109', callDuration: '3m 05s', callType: 'Divert', department: 'Sales' },
    { callId: 'c1029', agentId: 'A029', agentName: 'Pooja Mehra', language: 'Marathi', callStatus: 'on hold', phoneNumber: '109-210-3210', callDuration: '2m 30s', callType: 'Queue', department: 'Tech' },
    { callId: 'c1030', agentId: 'A030', agentName: 'Rohit Nair', language: 'English', callStatus: 'in call', phoneNumber: '210-321-4321', callDuration: '4m 50s', callType: 'Inbound', department: 'Support' },
    { callId: 'c1031', agentId: 'A031', agentName: 'Kavita Rao', language: 'Hindi', callStatus: 'ringing', phoneNumber: '321-432-5432', callDuration: '3m 10s', callType: 'Outbound', department: 'Sales' },
    { callId: 'c1032', agentId: 'A032', agentName: 'Sagar Patil', language: 'Tamil', callStatus: 'transferred', phoneNumber: '432-543-6543', callDuration: '2m 55s', callType: 'Divert', department: 'Tech' },
    { callId: 'c1033', agentId: 'A033', agentName: 'Bhavna Shah', language: 'Odia', callStatus: 'ringing', phoneNumber: '543-654-7654', callDuration: '1m 45s', callType: 'Queue', department: 'Support' },
    { callId: 'c1034', agentId: 'A034', agentName: 'Yogesh Khanna', language: 'Telugu', callStatus: 'in call', phoneNumber: '654-765-8765', callDuration: '3m 35s', callType: 'Inbound', department: 'Sales' },
    { callId: 'c1035', agentId: 'A035', agentName: 'Anjali Das', language: 'English', callStatus: 'on hold', phoneNumber: '765-876-9876', callDuration: '4m 25s', callType: 'Divert', department: 'Tech' },
  ];

  const totalPages = Math.ceil(callStatsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = callStatsData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Row className="g-3 mb-3">
        <Col md={4}>
          <SaasActiveUser data={activeUser} />
        </Col>
        <Col md={4}>
          <SaasRevenue />
        </Col>
        <Col md={4}>
          <SaasConversion />
        </Col>
      </Row>
      <Card className="h-100">
        <div className="d-lg-flex justify-content-between my-3">
          <Row className="w-100 gx-3 align-items-center px-x1">
            <Col xs="auto"><h6 className="text-900 mb-0">Live Calls</h6></Col>
            <Col xs="auto"><AdvanceTableSearchBox className="input-search-width" placeholder="Search" /></Col>
            <Col md="auto">
              <Form.Select size="sm">
                <option value="">Call Status</option>
                <option value="ringing">Ringing</option>
                <option value="in call">In Call</option>
                <option value="on hold">On Hold</option>
                <option value="transferred">Transferred</option>
              </Form.Select>
            </Col>
            <Col md="auto">
              <Form.Select size="sm">
                <option value="">Call Type</option>
                <option value="inbound">Inbound</option>
                <option value="outbound">Outbound</option>
                <option value="queue">Queue</option>
                <option value="diverted">Divert</option>
              </Form.Select>
            </Col>
            <Col className="d-flex justify-content-end ms-auto" md="auto">
              <IconButton variant="falcon-default" size="sm" icon="external-link-alt" transform="shrink-3" className="mx-2" iconAlign="middle">
                <span className="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">Export</span>
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
                <th className="fs-10">Agent Name</th>
                <th className="fs-10 text-center">Agent ID</th>
                <th className="text-center fs-10">Language</th>
                <th className="text-center fs-10">Call Status</th>
                <th className="text-center fs-10">Phone Number</th>
                <th className="text-center fs-10">Call Duration</th>
                <th className="text-center fs-10">Call Type</th>
                <th className="text-center fs-10">Department</th>
                <th className="text-center fs-10">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <TableRow
                  key={index}
                  data={item}
                  onListen={handleListen}
                  onWhisper={handleWhisper}
                  onBargeIn={handleBargeIn}
                />
              ))}
            </tbody>
          </Table>
        </Card.Body>

        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
          <Toast bg={toast.bg} onClose={() => setToast(prev => ({ ...prev, show: false }))} show={toast.show} delay={3000} autohide>
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Card>
    </>
  );
};

export default Breadcrumb;
