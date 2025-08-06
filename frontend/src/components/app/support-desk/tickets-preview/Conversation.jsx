import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Avatar from 'components/common/Avatar';
import Flex from 'components/common/Flex';
import IconButton from 'components/common/IconButton';
// import { messages } from 'data/support-desk/ticketsPreviewData';
import axiosInstance from 'helpers/axios';
import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Compose from 'components/app/email/compose/Compose';
import paths from 'routes/paths';
import { useAuth } from 'providers/AuthProvider';
import DOMPurify from 'dompurify';


const File = ({ icon, title, action, actionIcon, className }) => {
  return (
    <div
      className={classNames(
        'border p-2 rounded-3 d-flex bg-white dark__bg-1000 fs-10',
        className
      )}
    >
      <FontAwesomeIcon icon={icon} className="fs-8" />
      <span className="ms-2 me-3">{title}</span>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip style={{ position: 'fixed' }}>{action}</Tooltip>}
      >
        <a href="#!" className="text-300 ms-auto">
          <FontAwesomeIcon icon={actionIcon} />
        </a>
      </OverlayTrigger>
    </div>
  );
};

File.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  actionIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
  className: PropTypes.string
};

function MessageRenderer(message) {
  const isHtml = message?.isHtml; // flag to check if message is HTML
  console.log(message)

  if (isHtml) {
    const sanitizedHtml = DOMPurify.sanitize(message.message);

    return (
      <p dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    );
  }

  return <p>{message.message}</p>; // Plain text rendering
}

const Mail = ({ message, index, ticketId, messageLength }) => {
  return (
    <div>
      {/* mail header */}
      <div className="d-md-flex d-xl-inline-block d-xxl-flex align-items-center justify-content-between mb-x1">
        <Flex alignItems="center" className="gap-2">
          <Link to={paths.contactDetails}>
            <Avatar src={message.img} size="2xl" />
          </Link>
          <p className="mb-0">
            <Link
              to={`${paths.contactDetails}/${ticketId}`}
              className="fw-semibold mb-0 text-800"
            >
              {message.senderType.charAt(0).toUpperCase() + message.senderType.slice(1,)}
            </Link>
            <span className="fs-11 text-800 fw-normal mx-2">
              {message.messageType.charAt(0).toUpperCase() + message.messageType.slice(1,)}
            </span>
            {/* <a
              className="mb-0 fs-10 d-block text-500"
              href={`mailto:${message.email}`}
            >
              {message.email}
            </a> */}
          </p>
        </Flex>
        <p className="mb-0 fs-11 fs-sm-10 fw-semibold mt-2 mt-md-0 mt-xl-2 mt-xxl-0 ms-5">
          {new Date(message.timestamp).toLocaleDateString()}
          <span className="mx-1">|</span>
          <span className="fst-italic">{new Date(message.timestamp).toLocaleTimeString()}</span>
          <FontAwesomeIcon icon="star" className="ms-2 text-warning" />
        </p>
      </div>
      {/* mail body */}
      <div
        className={
          index !== messageLength - 1
            ? 'mb-5 pb-5 border-bottom'
            : ''
        }
      >
        {/* <h6 className="mb-3 fw-semibold text-1000">{message.subject}</h6> */}
        {/* <p>{message.salutation}</p> */}
        {MessageRenderer(message)}
        {/* <p>{message.conclusion}</p> */}
        {/* <p className="mb-0">{message.closing}</p> */}
        {/* <p className="mb-0">{message.senderType}</p> */}
        {message.attachments.length > 0 && (
          <div className="p-x1 bg-body-tertiary rounded-3 mt-3">
            <div className="d-inline-flex flex-column">
              <File
                title="broken_tv_solve.jpg (873kb)"
                icon={['far', 'image']}
                action="Download"
                actionIcon="arrow-down"
                className="mb-2"
              />
              <File
                title="broken_tv_solve.zip (342kb)"
                icon="file-archive"
                action="Download"
                actionIcon="arrow-down"
              />
            </div>
            <hr className="my-x1" />
            <Row className="flex-between-center gx-4 gy-2">
              <Col xs="auto">
                <p className="fs-10 text-1000 mb-sm-0 font-sans-serif fw-medium mb-0">
                  <FontAwesomeIcon icon="link" className="me-2" />2 files
                  attached
                </p>
              </Col>
              <Col xs="auto">
                <IconButton
                  icon="file-download"
                  variant="falcon-default"
                  size="sm"
                >
                  <span className="ms-1">Download all</span>
                </IconButton>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

Mail.propTypes = {
  message: PropTypes.shape({
    img: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    salutation: PropTypes.string.isRequired,
    conclusion: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    closing: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    attached: PropTypes.bool.isRequired
  }),
  index: PropTypes.number
};

const Conversation = () => {
  const { ticketId } = useParams()
  const { token } = useAuth()
  const [showForm, setShowForm] = useState(false);
  const [messages, setMessages] = useState([])

  const fetchTicketMessages = async () => {
    const response = await axiosInstance.get(`/tickets/messages/${ticketId}`, { headers: { 'Authorization': `Bearer ${token}` } })
    console.log(response.data)
    setMessages(response.data?.messages || [])
  }

  useEffect(() => {
    fetchTicketMessages()
  }, [])
  return (
    <Card className="mt-3">
      <Card.Header className="bg-body-tertiary">
        <h5 className="mb-0">
          <FontAwesomeIcon icon="envelope" className="me-2" />
          Conversation Log
        </h5>
      </Card.Header>
      <Card.Body>
        {messages.map((message, index) => (
          <Mail key={index} message={message} index={index} ticketId={ticketId} messageLength={message.length} />
        ))}
      </Card.Body>
      {showForm && (
        <Compose
          setShowForm={setShowForm}
          title="Reply"
          bodyClassName="shadow-none"
          ticketId={ticketId}
        />
      )}
      {!showForm && (
        <Card.Footer className="bg-body-tertiary">
          <IconButton
            size="sm"
            variant="falcon-default"
            icon="reply"
            onClick={() => setShowForm(true)}
          >
            <span className="d-none d-sm-inline-block ms-1">Reply</span>
          </IconButton>
          <IconButton
            size="sm"
            variant="falcon-default"
            icon="location-arrow"
            className="mx-2"
            onClick={() => setShowForm(true)}
          >
            <span className="d-none d-sm-inline-block ms-1">Forward</span>
          </IconButton>
          <IconButton
            size="sm"
            variant="falcon-default"
            icon="file-alt"
            onClick={() => setShowForm(true)}
          >
            <span className="d-none d-sm-inline-block ms-1">Add Note</span>
          </IconButton>
        </Card.Footer>
      )}
    </Card>
  );
};

export default Conversation;
