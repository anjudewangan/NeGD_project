import React from 'react';
import { Card } from 'react-bootstrap';
import IconButton from 'components/common/IconButton';
import { Link } from 'react-router-dom';
import paths from 'routes/paths';
import { useSocket } from 'providers/SocketProvider';

const PageHeader = () => {
  const {callState} = useSocket()
  const caller = callState.activeCall?.client || "No Active Calls"
  return (
    <Card className="my-3">
      <Card.Body className="d-flex gap-2 flex-wrap flex-between-center">
        <div>
          <h6 className="text-primary">Agent</h6>
          <h5 className="mb-0">{JSON.stringify(callState.activeCall)}</h5>
        </div>
        <div>
          <IconButton
            as={Link} 
            to="/user/profile"
            variant="primary"
            size="md"
            icon="user"
            iconClassName="me-sm-1"
            className="me-2"
          >
            <span className="d-none d-sm-inline-block"> Profile</span>
          </IconButton>

          <IconButton
            as={Link}
            to="/documentation/design-file"
            variant="falcon-default"
            size="md"
            icon="calendar-alt"
            iconClassName="me-sm-1"
          >
            <span className="d-none d-sm-inline-block"> Attendance</span>
          </IconButton>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PageHeader;
