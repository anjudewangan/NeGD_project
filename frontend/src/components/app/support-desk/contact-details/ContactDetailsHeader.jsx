import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import IconButton from 'components/common/IconButton';
import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from 'helpers/axios';
import { useAuth } from 'providers/AuthProvider';

const ContactDetailsHeader = ({
  handleShow,
  subject = 'Login - Unable to access DigiLocker account',
  ticketNo = 'TCK-0001',
  priority = { color: 'warning', text: 'High' },
  status = { content: 'Open', type: 'danger' }
}) => {
  const navigate = useNavigate();

  const priorityColor = priority?.color || 'secondary';
  const priorityText = priority?.text || 'No Priority';
  const statusType = status?.type || 'secondary';
  const statusContent = status?.content || 'No Status';
  const [ticketInfo, setTicketInfo] = useState({})
  const { ticketId } = useParams()
  const { token } = useAuth()

  const fetchTicketInfo = async () => {
    const response = await axiosInstance.get(`/tickets/info/${ticketId}`, { headers: { 'Authorization': `Bearer ${token}` } })
    console.log('ticket info', response.data)
    setTicketInfo(response.data)
  }

  useEffect(() => {
    fetchTicketInfo()
  }, [])

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex flex-column flex-md-row flex-between-center gap-2 gap-md-0">
        <div className="d-flex align-items-center gap-2">
          <IconButton
            onClick={() => navigate(-1)}
            variant="falcon-default"
            size="sm"
            icon="arrow-left"
          />
          <div>
            <h5 className="mb-1">
              Issue: {ticketInfo?.subject}  &nbsp;|&nbsp; (<strong>Ticket Number#: {ticketInfo?.ticketId}</strong>)
            </h5>
          </div>
        </div>

        <Flex>
          <div className='me-2'>
            <h5 className="mb-1">
              <Badge bg={priorityColor}>{priorityText}</Badge> &nbsp;|&nbsp;
              <Badge bg={statusType}>{statusContent}</Badge>
            </h5>
          </div>
          <Dropdown align="end" className="btn-reveal-trigger d-inline-block">
            <Dropdown.Toggle split variant="falcon-default" size="sm">
              <FontAwesomeIcon icon="ellipsis-v" className="fs-11" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="border py-0">
              <div className="py-2">
                <Dropdown.Item>View</Dropdown.Item>
                <Dropdown.Item>Update</Dropdown.Item>
                <Dropdown.Item>Export</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">Remove</Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Flex>
      </Card.Header>
    </Card>
  );
};

ContactDetailsHeader.propTypes = {
  handleShow: PropTypes.func,
  subject: PropTypes.string,
  ticketNo: PropTypes.string,
  priority: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string
  }),
  status: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string
  })
};

export default ContactDetailsHeader;
