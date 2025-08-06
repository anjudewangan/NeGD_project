import FalconCardHeader from 'components/common/FalconCardHeader';
import FalconLink from 'components/common/FalconLink';
import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import UsersAtTimeChart from './UsersAtTimeChart';

const UsersAtTime = () => {
  return (
    <Card className="mt-3">
      <FalconCardHeader
        title="Active Users at a Time"
        titleTag="h6"
        className="py-3"
        light
      />
      <Card.Body className="pb-0">
        <UsersAtTimeChart />
      </Card.Body>
    </Card>
  );
};

export default UsersAtTime;
