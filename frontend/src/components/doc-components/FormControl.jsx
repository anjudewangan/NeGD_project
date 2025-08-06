import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FalconComponentCard from 'components/common/FalconComponentCard';
import team13 from 'assets/img/team/13.jpg';
import team2 from 'assets/img/team/2.jpg';
import team3 from 'assets/img/team/3.jpg';
import team4 from 'assets/img/team/4.jpg';
import Avatar from 'components/common/Avatar';
import SubtleBadge from 'components/common/SubtleBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormControl = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    ivrLanguage: '',
    location: '',
    applicationName: '',
    applicationVersion: '',
    serviceDepartment: '',
    transactionId: '',
    errorDateTime: '',
    errorMessage: '',
    issueDescription: '',
    stepsToReproduce: '',
    attachments: null,
    queryType: '',
    priority: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleWrapUp = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.mobileNumber.trim()) validationErrors.mobileNumber = 'Mobile number is required';
    if (!formData.issueDescription.trim()) validationErrors.issueDescription = 'Issue description is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    navigate('/forms/wizard');
  };


  const responsiveTableCode = `const TableRow = ({ data }) => (
  <tr className="align-middle">
    <td className="text-nowrap">
      <div className="d-flex align-items-center">
        <Avatar src={data.avatar} size="l" name={data.name} />
        <div className="ms-2">{data.name}</div>
      </div>
    </td>
    <td className="text-nowrap">{data.date}</td>
    <td className="text-nowrap">{data.ticketNo}</td> {/* New Ticket No. column */}
    <td>
      <SubtleBadge pill bg={data.status.type}>
        {data.status.title}
        <FontAwesomeIcon icon={data.status.icon} className="ms-2" />
      </SubtleBadge>
    </td>
  </tr>
);

const ResponsiveTableExample = () => {
  const customers = [
    {
      name: 'Raj Kumar',
      avatar: team4,
      date: '2025-05-16',
      ticketNo: 'TK-1001',
      status: { title: 'Closed', type: 'success', icon: 'check' }
    },
    {
      name: 'Neha Sahu',
      avatar: team13,
      date: '2025-05-10',
      ticketNo: 'TK-1002',
      status: { title: 'Escalated', type: 'info', icon: 'share' }
    },
    {
      name: 'Kumar Ravi',
      avatar: null,
      date: '2025-05-14',
      ticketNo: 'TK-1003',
      status: { title: 'New', type: 'primary', icon: 'redo' }
    },
    {
      name: 'Payal Singh',
      avatar: team2,
      date: '2025-05-12',
      ticketNo: 'TK-1004',
      status: { title: 'Open', type: 'danger', icon: 'stream' }
    },
    {
      name: 'Minakshi Sen',
      avatar: team3,
      date: '2025-05-11',
      ticketNo: 'TK-1005',
      status: { title: 'Pending', type: 'warning', icon: 'clock' }
    }
  ];

  return (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Ticket No.</th> 
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <TableRow data={customer} key={customer.ticketNo} />
        ))}
      </tbody>
    </Table>
  );
};

render(<ResponsiveTableExample />);

`;

  return (
    <Row>
      <Col md={6}>
        <FalconComponentCard>
          <FalconComponentCard.Header title="New Ticket" light={false} />
          <FalconComponentCard.Body>
            <Form onSubmit={handleWrapUp}>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Mobile Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobileNumber"
                      placeholder="Enter mobile number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.mobileNumber}
                    />
                    <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Caller Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter caller name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>IVR Language</Form.Label>
                    <Form.Select name="ivrLanguage" value={formData.ivrLanguage} onChange={handleChange}>
                      <option>Select Language</option>
                      <option>Hindi</option>
                      <option>English</option>
                      <option>Marathi</option>
                      <option>Telugu</option>
                      <option>Tamil</option>
                      <option>Malayalam</option>
                      <option>Odia</option>
                      <option>Bengali</option>
                      <option>Kannada</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Application Name</Form.Label>
                    <Form.Select name="applicationName" value={formData.applicationName} onChange={handleChange}>
                      <option>Select Application</option>
                      <option>App1</option>
                      <option>App2</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Application Version</Form.Label>
                    <Form.Control
                      type="text"
                      name="applicationVersion"
                      placeholder="Enter version"
                      value={formData.applicationVersion}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Service/Department</Form.Label>
                    <Form.Select name="serviceDepartment" value={formData.serviceDepartment} onChange={handleChange}>
                      <option>Select Department</option>
                      <option>Support</option>
                      <option>IT</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Transaction ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="transactionId"
                      placeholder="Enter transaction ID"
                      value={formData.transactionId}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Date and Time of Error</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="errorDateTime"
                      value={formData.errorDateTime}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Error Message</Form.Label>
                    <Form.Control
                      type="text"
                      name="errorMessage"
                      placeholder="Enter error message"
                      value={formData.errorMessage}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Detailed Description of Issue *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="issueDescription"
                  placeholder="Describe the issue in detail"
                  value={formData.issueDescription}
                  onChange={handleChange}
                  isInvalid={!!errors.issueDescription}
                />
                <Form.Control.Feedback type="invalid">{errors.issueDescription}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Steps to Reproduce</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="stepsToReproduce"
                  placeholder="Steps to reproduce the issue"
                  value={formData.stepsToReproduce}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Attachments</Form.Label>
                <Form.Control
                  type="file"
                  name="attachments"
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-5">
                <Col>
                  <Form.Group>
                    <Form.Label>Query Type</Form.Label>
                    <Form.Select name="queryType" value={formData.queryType} onChange={handleChange}>
                      <option>Select Query Type</option>
                      <option>General</option>
                      <option>Technical</option>
                      <option>Billing</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
                      <option>Select Priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-center align-items-center">
                <Button className="mx-3" type="submit">Submit Ticket</Button>
                <Button type="button" variant="secondary">Cancel</Button>
              </div>
            </Form>
          </FalconComponentCard.Body>
        </FalconComponentCard>
      </Col>

      <Col md={6}>
        <FalconComponentCard className="mb-0">
          <FalconComponentCard.Header
            title="Previous Tickets"
            className="border-bottom"
          >
          </FalconComponentCard.Header>
          <FalconComponentCard.Body
            code={responsiveTableCode}
            language="jsx"
            scope={{
              team3,
              team4,
              team2,
              team13,
              Avatar,
              FontAwesomeIcon,
              SubtleBadge
            }}
            noLight
            className="py-0"
            noInline
          />
        </FalconComponentCard>
      </Col>
    </Row>
  );
};

export default FormControl;
