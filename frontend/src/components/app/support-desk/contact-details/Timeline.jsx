import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import { timeline } from 'data/support-desk/contactDetailsData';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import paths from 'routes/paths';
import axiosInstance from 'helpers/axios';
import { useAuth } from 'providers/AuthProvider';
import DOMPurify from 'dompurify';


function MessageRenderer(message) {
  const isHtml = message?.isHtml; // flag to check if message is HTML
  console.log(message)

  if (isHtml) {
    const sanitizedHtml = DOMPurify.sanitize(message.message);

    return (
      <p className="text-800 fs-15 mb-0" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    );
  }

  return <p className="text-800 fs-15 mb-0">{message.message}</p>; // Plain text rendering
}

const Timeline = () => {
  const { ticketId } = useParams()
  const { token } = useAuth()

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
    <div className="timeline-vertical py-0">
      {messages.map((item, index) => {
        const {
          message,
          _id,
          senderType,
          time,
          timestamp,
          icon,
          year,
          day,
          sender,
          direction
        } = item;

        const iconColor = senderType === 'customer' ? 'text-secondary' : 'text-primary';

        return (
          <Row key={_id.toString()} className="timeline-item align-items-start position-relative">
            <Col
              lg={1}
              className="text-center position-relative d-flex flex-column align-items-center"
            >
              <div className={`timeline-icon icon-item icon-item-lg ${iconColor} border-300 mb-3`}>
                <FontAwesomeIcon icon={'envelope'} className="fs-6" />
              </div>

              {index !== messages.length - 1 && (
                <div
                  className="border-start border-2 flex-grow-1"
                  style={{ width: '2px', borderColor: '#dee2e6' }}
                />
              )}
            </Col>

            <Col lg={11}>
              <Row>
                <Col lg={12} className="ps-0">
                  <Link to={`${paths.ticketsPreview}/${ticketId}`}>
                    <div className="timeline-item-content arrow-bg-white">
                      <div className="timeline-item-card bg-white dark__bg-1100 py-3 pt-4 px-3">
                        <Flex wrap="wrap" alignItems="center" className="mb-2">
                          <p className="text-700 fs-10 me-3 mb-0 lh-base">
                            {new Date(timestamp).toLocaleDateString()}
                          </p>
                          <p className="text-700 fs-10 me-3 mb-0 lh-base">
                            <FontAwesomeIcon icon={['far', 'clock']} className="me-1" />
                            {new Date(timestamp).toLocaleTimeString()}
                          </p>
                          <p className="text-primary fs-10 mb-0 ms-auto">
                            From: <strong>{senderType.charAt(0).toUpperCase() + senderType.slice(1,)}</strong>
                          </p>
                        </Flex>
                        {MessageRenderer(item)}
                      </div>
                    </div>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default Timeline;
