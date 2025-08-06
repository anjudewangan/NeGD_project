import React from 'react';
import {
  topCourses,
} from 'data/dashboard/lms';
import TopCourses from 'components/dashboards/lms/top-courses/TopCourses';


const RunningProjects = () => {
  return (
    <TopCourses tableData={topCourses} className="mb-3" />
  );
};


export default RunningProjects;
