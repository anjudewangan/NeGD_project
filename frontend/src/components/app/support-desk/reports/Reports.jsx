import React from 'react';
import DistributionOfPerformance from './distribution-of-performance/DistributionOfPerformance';
import Greetings from './greetings/Greetings';
import IndepthHelpDesk from './IndepthHelpDesk';
import ReceivedTickets from './received-tickets/ReceivedTickets';
import SatisfactionSurvey from './satisfaction-survey/SatisfactionSurvey';
import SurveyResult from './SurveyResult';
import TicketVolume from './ticket-volume/TicketVolume';
import TopCustomers from './top-customers/TopCustomers';
import Spendings from 'components/app/e-learning/student-overview/Spendings';
import StudentInfo from 'components/app/e-learning/student-overview/StudentInfo';
import TimeOnSite from 'components/app/e-learning/student-overview/TimeOnSite';
import {
  assignmentScores,
  spendingsData,
  timeOnSiteData,
} from 'data/elearning/studentOverview';
import AssignmentScores from 'components/app/e-learning/student-overview/AssignmentScores';
import BrowsedCourses from 'components/app/e-learning/student-overview/BrowsedCourses';
import { Col, Row } from 'react-bootstrap';
import PageHeader from 'components/app/e-learning/student-overview/PageHeader';

const Reports = () => {
  return (
    <>
      <Greetings />
      <PageHeader />
      <Row className="g-3 mb-3">
        <Col xxl={6}>
          <Row className="g-3">
            <Col xs={12}>
              <StudentInfo />
            </Col>
            <Col md={6}>
              <Spendings data={spendingsData} />
            </Col>
            <Col md={6}>
              <TimeOnSite data={timeOnSiteData} />
            </Col>
          </Row>
        </Col>
        <Col xxl={6}>
          <AssignmentScores scoresData={assignmentScores} />
        </Col>
      </Row>
      <IndepthHelpDesk />
      <DistributionOfPerformance />
      {/* <SurveyResult />
      <SatisfactionSurvey /> */}
      {/* <TopCustomers /> */}
      {/* <ReceivedTickets /> */}
      <TicketVolume />
    </>
  );
};

export default Reports;
