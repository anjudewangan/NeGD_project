import React, { useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import {
  faCheck,
  faShare,
  faRedo,
  faStream,
  faClock,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { SiX } from 'react-icons/si';

import team13 from 'assets/img/team/13.jpg';
import team2 from 'assets/img/team/2.jpg';
import team3 from 'assets/img/team/3.jpg';
import team4 from 'assets/img/team/4.jpg';

import Avatar from 'components/common/Avatar';
import IconButton from 'components/common/IconButton';
import SubtleBadge from 'components/common/SubtleBadge';
import TicketFormPanel from 'components/doc-components/FormValidation';
import { useSocket } from 'providers/SocketProvider';

library.add(faFacebook, faGoogle, faCheck, faShare, faRedo, faStream, faClock, faUser);

const Configuration = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const { callState } = useSocket();
  const caller = callState?.activeCall?.client || "No Active Call";
  const ivrLanguage = callState?.activeCall?.queueName;

  const TableRow = ({ data }) => (
    <tr className="align-middle">
      <td className="text-nowrap">
        <div className="d-flex align-items-center">
          <Avatar src={data.avatar} size="l" name={data.name} />
          <div className="ms-2">{data.name}</div>
        </div>
      </td>
      <td className="text-nowrap">{data.date}</td>
      <td className="text-nowrap">{data.ticketNo}</td>
      <td className="text-nowrap">
        <SubtleBadge pill bg={data.status.type}>
          {data.status.title}
          <FontAwesomeIcon icon={data.status.icon} className="ms-2" />
        </SubtleBadge>
      </td>
      <td className="text-nowrap">{data.mode}</td>
    </tr>
  );

  const PreviousTicketsTable = () => {
    const customers = [
      {
        name: 'Raj Kumar',
        avatar: team4,
        date: '2025-05-16',
        ticketNo: 'TK-1001',
        status: { title: 'Closed', type: 'success', icon: 'check' },
        mode: 'Chat'
      },
      {
        name: 'Neha Sahu',
        avatar: team13,
        date: '2025-05-10',
        ticketNo: 'TK-1002',
        status: { title: 'Escalated', type: 'info', icon: 'share' },
        mode: 'Email'
      },
      {
        name: 'Kumar Ravi',
        avatar: null,
        date: '2025-05-14',
        ticketNo: 'TK-1003',
        status: { title: 'New', type: 'primary', icon: 'redo' },
        mode: 'Phone'
      },
      {
        name: 'Payal Singh',
        avatar: team2,
        date: '2025-05-12',
        ticketNo: 'TK-1004',
        status: { title: 'Open', type: 'danger', icon: 'stream' },
        mode: 'Chat'
      },
      {
        name: 'Minakshi Sen',
        avatar: team3,
        date: '2025-05-11',
        ticketNo: 'TK-1005',
        status: { title: 'Pending', type: 'warning', icon: 'clock' },
        mode: 'Email'
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
            <th scope="col">Mode</th>
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

  const linkedAccounts = {
    facebook: 'No',
    twitter: 'No',
    google: 'Yes'
  };


  return (
    <>
      <Card className="mb-3">
        <Card.Body className="d-flex gap-2 flex-wrap flex-between-center">
          <div>
            <h6 className="text-primary">Caller</h6>
            {showDetails && <h5 className="mb-1">Neha Sharma</h5>}
            <h5 className="mb-0">{caller}</h5>
            {ivrLanguage && <h5 className="mb-0">IVR Language: {ivrLanguage}</h5>}
          </div>
          <IconButton
            variant="primary"
            size="md"
            icon="user"
            iconClassName="me-sm-1"
            className="me-2"
            onClick={() => setShowDetails(!showDetails)}
          >
            <span className="d-none d-sm-inline-block">Fetch Details</span>
          </IconButton>
        </Card.Body>
      </Card>

      {showDetails && (
        <>
          <Row>
            <Col md={6}>
              <Row className="g-3 mb-3">
                <Col md={6}>
                  <Card className="shadow-sm text-center p-4 caller-card d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={['fa', 'user-circle']} size="5x" className="text-primary mb-3" />
                    <h5 className="mb-1">Neha Sharma</h5>
                    <div className="w-100">
                      {[
                        ['Mobile', '+91 9988770021'],
                        ['Email', 'ne3@gmail.com'],
                        ['DOB', '01-01-1999'],
                        ['Gender', 'Female'],
                        ['Language', 'Marathi'],
                        ['Address', 'H No 01, MH Colony']
                      ].map(([label, value]) => (
                        <Row className="mb-2" key={label}>
                          <Col xs={5} className="text-muted small text-end">{label}:</Col>
                          <Col xs={7}><h6 className="mb-0 text-start">{value}</h6></Col>
                        </Row>
                      ))}
                    </div>

                    <h6 className="text-center mb-3 device-linked-header">Device Linked</h6>
                    <Row className="text-center small">
                      <Col xs={12}>
                        <Row>
                          <Col md={4} className="d-flex flex-column align-items-center">
                            <FontAwesomeIcon
                              icon={['fab', 'facebook']}
                              size="2x"
                              style={{ color: linkedAccounts.facebook === 'Yes' ? '#1877F2' : '#6c757d' }}
                              className="mb-1"
                            />
                            <div>{linkedAccounts.facebook}</div>
                          </Col>
                          <Col md={4} className="d-flex flex-column align-items-center">
                            <SiX
                              size={25}
                              style={{ color: linkedAccounts.twitter === 'Yes' ? '#000000' : '#6c757d' }}
                              className="mb-1"
                            />
                            <div>{linkedAccounts.twitter}</div>
                          </Col>
                          <Col md={4} className="d-flex flex-column align-items-center">
                            <FontAwesomeIcon
                              icon={['fab', 'google']}
                              size="2x"
                              style={{ color: linkedAccounts.google === 'Yes' ? '#DB4437' : '#6c757d' }}
                              className="mb-1"
                            />
                            <div>{linkedAccounts.google}</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="shadow-sm p-4 caller-card">
                    <h5 className="mb-3 text-center">Caller Details</h5>
                    <hr className="mb-4" />
                    <Row className="mb-3 text-center">
                      {[
                        ['5', 'Qualification'],
                        ['18', 'Occupation'],
                        ['Verified', 'Aadhar Status'],
                        ['Chhattisgarh', 'State'],
                        ['Raipur', 'District'],
                        ['Android', 'Platform'],
                        ['Android 13', 'OS'],
                        ['3.1.2', 'App Version'],
                        ['Samsung Galaxy M32', 'Mobile Handset']
                      ].map(([value, label], idx) => (
                        <Col
                          xs={idx === 8 ? 12 : 6}
                          className={
                            idx === 8
                              ? 'my-3 device-linked-header'
                              : idx >= 2 && idx < 8
                                ? 'mt-3'
                                : ''
                          }
                          key={label}
                        >
                          <h6 className="mb-0">{value}</h6>
                          <small className="text-muted">{label}</small>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>

              </Row>

              <style jsx="true">{`
                .caller-card {
                  border-radius: 0.375rem;
                  background: #ffffff;
                }
                h5, h6 {
                  font-weight: 600;
                }
                .text-muted {
                  font-size: 0.85rem;
                  color: #6c757d !important;
                }
                .btn-primary {
                  border-radius: 12px;
                  padding: 6px 16px;
                }
                .device-linked-header {
                  border-top: 1px solid #dee2e6;
                  padding-top: 10px;
                  margin-top: 10px;
                  width: 100%;
                }
              `}</style>

              <Row>
                <Col md={12}>
                  <Card className="shadow-sm mb-3">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Previous Tickets</h5>
                    </Card.Header>
                    <Card.Body>
                      <PreviousTicketsTable />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>

            <TicketFormPanel
              showTicketForm={showTicketForm}
              setShowTicketForm={setShowTicketForm}
            />
          </Row>
        </>
      )}
    </>
  );
};

export default Configuration;
