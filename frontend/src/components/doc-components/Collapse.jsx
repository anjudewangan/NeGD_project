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
  ToastContainer,
  Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faCommentAlt,
  faHandsHelping,
  faUserCheck
} from '@fortawesome/free-solid-svg-icons';
import AdvanceTableSearchBox from 'components/common/advance-table/AdvanceTableSearchBox';
import IconButton from 'components/common/IconButton';
import {
  saleItems,
} from 'data/dashboard/ecom';
import EcomStat from 'components/dashboards/e-commerce/EcomStat';
import chatIcon from 'assets/img/chat/chat.png';

const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'active': return 'success';
    case 'typing': return 'info';
    case 'idle': return 'warning';
    case 'waiting': return 'info';
    case 'on hold': return 'warning';
    case 'transferred': return 'primary';
    case 'queued': return 'dark';
    case 'disconnected': return 'danger';
    default: return 'muted';
  }
};

const getPriorityBadgeVariant = (priority) => {
  switch (priority.toLowerCase()) {
    case 'high': return 'danger';
    case 'medium': return 'primary';
    case 'low': return 'success';
    default: return 'light';
  }
};

const userPermissions = {
  canView: true,
  canTransfer: true,
  canEnd: true,
};

const TableRow = ({ data, onView }) => (
  <tr className="align-middle white-space-nowrap">
    <td className="fs-10">{data.agentId}</td>
    <td className="fs-10">{data.agentName}</td>
    <td className="fs-10">{data.customerName}</td>
    <td className="fs-10">{data.language}</td>
    <td className="fs-10">
      <Badge bg={getStatusBadgeVariant(data.status)} className="text-uppercase">
        {data.status}
      </Badge>
    </td>
    <td className="fs-10">{data.duration}</td>
    <td className="fs-10 text-center">{data.unreadMessages}</td>
    <td
      className="fs-10 text-truncate"
      style={{ maxWidth: '180px' }}
      title={data.lastMessagePreview}
    >
      "{data.lastMessagePreview}"
    </td>
    <td className="fs-10">
      <Badge bg={getPriorityBadgeVariant(data.priority)} className="text-uppercase">
        {data.priority}
      </Badge>
    </td>
    <td className="text-center fs-10">
      <ButtonGroup size="sm">
        {userPermissions.canView && (
          <Button variant="outline-primary" title="View details" onClick={() => onView(data.agentId)}>
            View
          </Button>
        )}
      </ButtonGroup>
    </td>
  </tr>
);

const Collapse = () => {
  const [toast, setToast] = useState({ show: false, message: '', bg: 'info' });
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const showToast = (message, bg = 'info') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleView = (agentId) => {
    const chat = chatData.find(chat => chat.agentId === agentId);
    setSelectedChat(chat);
    setShowModal(true);
    setMessageInput('');
  };

  const chatData = [
    {
      agentId: 'A7890',
      customerName: 'Ravi Kumar',
      agentName: 'Priya S.',
      language: 'Hindi',
      status: 'Active',
      moveStatus: 'Transferred',
      startTime: '10:23 AM',
      duration: '12m',
      unreadMessages: 2,
      lastMessagePreview: 'Mujhe apne account mein madad chahiye...',
      priority: 'High',
      messages: [
        { sender: 'customer', text: 'Mujhe apne account mein madad chahiye...', time: '10:22 AM' },
        { sender: 'agent', text: 'Jarur, main madad karta hoon.', time: '10:23 AM' },
        { sender: 'customer', text: 'Shukriya!', time: '10:24 AM' }
      ]
    },
    {
      agentId: 'B4567',
      customerName: 'Anita Sharma',
      agentName: 'Raj P.',
      language: 'English',
      status: 'Typing',
      moveStatus: 'Waiting',
      startTime: '11:15 AM',
      duration: '5m',
      unreadMessages: 0,
      lastMessagePreview: 'Please hold on, I am checking...',
      priority: 'Medium',
      messages: [
        { sender: 'customer', text: 'Can you check my order status?', time: '11:14 AM' },
        { sender: 'agent', text: 'Please hold on, I am checking...', time: '11:15 AM' }
      ]
    },
    {
      agentId: 'C1234',
      customerName: 'Mohamed Ali',
      agentName: 'Sara L.',
      language: 'Telugu',
      status: 'Idle',
      moveStatus: 'On Hold',
      startTime: '9:00 AM',
      duration: '20m',
      unreadMessages: 3,
      lastMessagePreview: 'Waiting for your response.',
      priority: 'Low',
      messages: [
        { sender: 'customer', text: 'Hello, I need help with payment.', time: '9:05 AM' },
        { sender: 'agent', text: 'I am here to assist you.', time: '9:10 AM' },
        { sender: 'customer', text: 'Waiting for your response.', time: '9:15 AM' }
      ]
    },
    {
      agentId: 'D7891',
      customerName: 'Emily Johnson',
      agentName: 'Mark T.',
      language: 'English',
      status: 'Disconnected',
      moveStatus: 'Transferred',
      startTime: '8:45 AM',
      duration: '8m',
      unreadMessages: 1,
      lastMessagePreview: 'Thank you for your help!',
      priority: 'High',
      messages: [
        { sender: 'customer', text: 'My app is crashing frequently.', time: '8:40 AM' },
        { sender: 'agent', text: 'Please reinstall the app.', time: '8:42 AM' },
        { sender: 'customer', text: 'Thank you for your help!', time: '8:43 AM' }
      ]
    },
    {
      agentId: 'E5678',
      customerName: 'Carlos Mendez',
      agentName: 'Lisa W.',
      language: 'Tamil',
      status: 'Queued',
      moveStatus: 'Queued',
      startTime: '12:00 PM',
      duration: '0m',
      unreadMessages: 0,
      lastMessagePreview: '',
      priority: 'Medium',
      messages: []
    }
  ];


  return (
    <>
      <Row>
        <Col xxl={12} xl={12}>
          <EcomStat data={saleItems} />
        </Col>
      </Row>
      <Card className="h-100">
        <div className="d-lg-flex justify-content-between my-3">
          <Row className="w-100 gx-3 align-items-center px-x1">
            <Col xs="auto"><h6 className="text-900 mb-0">Live Chats</h6></Col>
            <Col xs="auto"><AdvanceTableSearchBox className="input-search-width" placeholder="Search" /></Col>
            <Col md="auto">
              <Form.Select size="sm">
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Typing">Typing</option>
                <option value="Idle">Idle</option>
                <option value="Waiting">Waiting</option>
                <option value="On Hold">On Hold</option>
                <option value="Transferred">Transferred</option>
                <option value="Queued">Queued</option>
                <option value="Disconnected">Disconnected</option>
              </Form.Select>
            </Col>
            <Col md="auto">
              <Form.Select size="sm">
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
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
                <th className="fs-10">Agent ID</th>
                <th className="fs-10">Agent Name</th>
                <th className="fs-10">Customer Name</th>
                <th className="fs-10">Language</th>
                <th className="fs-10">Status</th>
                <th className="fs-10">Duration</th>
                <th className="fs-10 text-center">Unread Messages</th>
                <th className="fs-10">Last Message Preview</th>
                <th className="fs-10">Priority</th>
                <th className="fs-10 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chatData.map((item, idx) => (
                <TableRow key={idx} data={item} onView={handleView} />
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

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <Modal.Title>
                {selectedChat?.customerName}
                {selectedChat?.agentName && selectedChat?.agentId && (
                  <span className="ms-2 text-secondary fs-9">
                    – {selectedChat.agentName} ({selectedChat.agentId})
                  </span>
                )}
              </Modal.Title>

              <div>
                <Badge
                  bg={getStatusBadgeVariant(selectedChat?.status || '')}
                  className="text-uppercase fs-11"
                >
                  {selectedChat?.status}
                </Badge>
              </div>
            </div>

            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="outline-info" size="sm">
                <img
                  src={chatIcon}
                  style={{ width: '33px', height: '33px' }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className='p-0'>
                <Dropdown.Item>
                  <Button size="sm" variant="" className="d-flex align-items-center gap-2 w-100">
                    <FontAwesomeIcon icon={faCommentAlt} /> Whisper
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button size="sm" variant="" className="d-flex align-items-center gap-2 w-100">
                    <FontAwesomeIcon icon={faHandsHelping} /> Assist
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button size="sm" variant="" className="d-flex align-items-center gap-2 w-100">
                    <FontAwesomeIcon icon={faUserCheck} /> Barge-In
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div className="chat-box px-3">
            {selectedChat?.messages?.map((msg, index) => (
              <div
                key={index}
                className={`d-flex flex-column mb-3 ${msg.sender === 'agent' ? 'align-items-end' : 'align-items-start'}`}
                style={{ maxWidth: '100%' }}
              >
                <div
                  className={`p-2 rounded shadow-sm ${msg.sender === 'agent' ? 'bg-primary text-white' : 'bg-light text-dark'
                    }`}
                  style={{ width: '40%' }}
                >
                  <div className="small">{msg.text}</div>
                </div>
                <div className="text-muted small mt-1 text-end">{msg.time}</div>
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Form
            className="w-100 d-flex"
            onSubmit={(e) => {
              e.preventDefault();
              if (messageInput.trim()) {
                const newMessage = {
                  sender: 'agent',
                  text: messageInput.trim(),
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                setSelectedChat(prev => ({
                  ...prev,
                  messages: [...(prev.messages || []), newMessage]
                }));

                setMessageInput('');
                showToast(`Message sent: ${messageInput}`, 'success');
              }
            }}
          >
            <Form.Control
              type="text"
              placeholder="Type your message..."
              className="me-2"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
            />
            <Button type="submit" variant="primary" disabled={!messageInput.trim()}>
              Send
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Collapse;
