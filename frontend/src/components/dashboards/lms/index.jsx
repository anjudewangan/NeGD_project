import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  lmsStatistics,
  avgEnrollments,
  topCourses,
  courseEnrollments,
  marketingExpensesData
} from 'data/dashboard/lms';
import { countryData } from 'data/countryData';

import LmsStats from './lms-stats/LmsStats';
import TrendingKeywords from './trending-keywords/TrendingKeywords';
import AverageEnrollment from './average-enrollment/AverageEnrollment';
import TopCourses from './top-courses/TopCourses';
import UsersLocation from './users-location/UsersLocation';
import MarketingExpenses from './marketing-expenses/MarketingExpenses';
import CourseEnrollments from './course-enrollments/CourseEnrollments';
import WeeklyGoals from './weekly-goals/WeeklyGoals';
import LmsRevenue from './monthly-targets/LmsRevenue';
import LmsVisitor from './monthly-targets/LmsVisitor';
import Greetings from '../support-desk/Greetings';
import {
  enrolledCoursesData
} from 'data/elearning/studentOverview';
import EnrolledCourses from 'components/app/e-learning/student-overview/EnrolledCourses';
import { topPagesTableData, intelligence } from 'data/dashboard/analytics';
import TopPages from 'components/dashboards/analytics/top-pages/TopPages';

const Lms = () => {
  return (
    <>
      {/* <Greetings /> */}
      <LmsStats data={lmsStatistics} />
      <Row className="g-3 mb-3">
        <Col xxl={4}>
          <TrendingKeywords />
        </Col>
        <Col xxl={8}>
          <Row className="g-3 h-100">
            <Col md={6}>
              <LmsRevenue />
            </Col>
            <Col md={6}>
              <LmsVisitor />
            </Col>
            <Col>
              <AverageEnrollment data={avgEnrollments} />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <TopCourses tableData={topCourses} className="mb-3" /> */}
      {/* <Row className="g-3 mb-3">
        <Col lg={6} xxl={7}>
          <UsersLocation mapData={countryData} />
        </Col>
        <Col lg={6} xxl={5}>
          <MarketingExpenses listData={marketingExpensesData} />
        </Col>
      </Row> */}
      <Row className="g-3 mb-3">
        <Col lg={6} xxl={5}>
          <WeeklyGoals />
        </Col>
        <Col lg={6} xxl={7}>
          <CourseEnrollments data={courseEnrollments} />
        </Col>
      </Row>
      <Row className="g-3">
        {/* <Col lg={6} xxl={6}>
          <TopPages tableData={topPagesTableData} perPage={6} />
        </Col> */}
        <Col lg={12} xxl={12}>
          <EnrolledCourses data={enrolledCoursesData} />
        </Col>
      </Row>
    </>
  );
};

export default Lms;
