import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CrmStats from './CrmStats';
import DealForecastBar from './DealForecastBar';
import DealStorageFunnel from './deal-storage-funnel/DealStorageFunnel';
import MostLeads from './most-leads/MostLeads';
import Revenue from './revenue/Revenue';
import DealVsGoal from './deal-vs-goal/DealVsGoal';
import DealForeCast from './deal-forecast/DealForeCast';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';
import LocationBySession from './LocationBySession/LocationBySession';
import LocationBySessionTable from './LocationBySession/LocationBySessionTable';
import { locationBySessionTableData } from 'data/dashboard/crm';
import AvgCallDuration from './avg-call-duration/AvgCallDuration';
import LeadConversation from './lead-conversation/LeadConversation';
import ToDoList from './ToDoList';
import RecentLeads from './recent-leads/RecentLeads';
import Greetings from './greetings/Greetings';

const Crm = () => {
  return (
    <>
      <Greetings />
      <Row className="g-3 mb-3">
        <Col xxl={9}>
          <CrmStats />
          <Revenue />
        </Col>
        <Col xxl={3}>
          <MostLeads />
        </Col>
        <Col md={12} xxl={8}>
          <DealForecastBar />
        </Col>
        <Col xxl={4}>
          <DealStorageFunnel />
        </Col>
        <Col xxl={6}>
          <DealVsGoal />
        </Col>
        <Col xxl={6}>
          <DealForeCast />
        </Col>
      </Row>
      <Row className="g-3 mb-3">
        <Col lg={6}>
          <LocationBySession />
        </Col>
        <Col lg={6}>
          <Card className="h-100">
            <FalconCardHeader
              title="State-wise Table View"
              titleTag="h6"
              light
            />
            <Card.Body className="position-relative pb-0 pt-0">
              <LocationBySessionTable data={locationBySessionTableData} />
            </Card.Body>
            <Card.Footer className="text-end py-1 px-x1">
              <p className="mb-0 fs-10">
                <span className="d-none d-sm-inline-block me-2">1 to 5 of 15</span>
                <span className="d-none d-sm-inline-block me-2">&mdash;</span>
                <Button variant="link" size="sm" className="px-0">
                  View All
                  <FontAwesomeIcon icon="chevron-right" className="ms-1 fs-11" />
                </Button>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row >
      <Row className="g-3">
        <Col lg={6}>
          {/* <ToDoList /> */}
          <Row className="g-3">
            <Col xs={12}>
              <AvgCallDuration />
            </Col>
            <Col xs={12}>
              <LeadConversation />
            </Col>
          </Row>
        </Col>
        <Col lg={6}>
          <RecentLeads />
        </Col>
      </Row>
    </>
  );
};

export default Crm;
