import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faClock,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team1 from 'assets/img/team/1.jpg';
import Avatar from 'components/common/Avatar';
import paths from 'routes/paths';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


const ProfileDropdown = () => {
  const [status, setStatus] = useState('online');
  const [breakReason, setBreakReason] = useState('');
  const [showBreakMenu, setShowBreakMenu] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'green';
      case 'offline': return 'gray';
      case 'break': return 'orange';
      default: return 'gray';
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (newStatus !== 'break') {
      setBreakReason('');
      setShowBreakMenu(false);
    }
  };

  const handleBreakReasonSelect = (reason) => {
    setBreakReason(reason);
    setShowBreakMenu(false);
  };

  return (
    <Dropdown navbar as="li">
      <Dropdown.Toggle
        bsPrefix="toggle"
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Avatar src={team1} />
          <span
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '12px',
              height: '12px',
              backgroundColor: getStatusColor(status),
              borderRadius: '50%',
              border: '2px solid white'
            }}
            title={status.charAt(0).toUpperCase() + status.slice(1)}
          />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Header>Status</Dropdown.Header>

          <Dropdown.Item onClick={() => handleStatusChange('online')}>
            <FontAwesomeIcon icon={faCircle} className="me-2 text-success" />
            Online
          </Dropdown.Item>

          <Dropdown.Item onClick={() => handleStatusChange('offline')}>
            <FontAwesomeIcon icon={faCircle} className="me-2 text-secondary" />
            Offline
          </Dropdown.Item>

          <div
            className="dropdown-item d-flex align-items-center"
            onClick={() => {
              handleStatusChange('break');
              setShowBreakMenu(!showBreakMenu);
            }}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faClock} className="me-2 text-warning" />
            Break
            <FontAwesomeIcon
              icon={showBreakMenu ? faChevronUp : faChevronDown}
              className="ms-auto text-400"
            />
          </div>


          {showBreakMenu && (
            <div className="ps-4">
              <Dropdown.Item onClick={() => handleBreakReasonSelect('Tea/Coffee Break')}>Tea/Coffee Break</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBreakReasonSelect('Lunch')}>Lunch</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBreakReasonSelect('After-Call Reset')}>After-Call Reset</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBreakReasonSelect('Screen Fatigue')}>Screen Fatigue</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBreakReasonSelect('Wellness Break')}>Wellness Break</Dropdown.Item>
              <Dropdown.Item onClick={() => handleBreakReasonSelect('Personal Time')}>Personal Time</Dropdown.Item>
            </div>
          )}

          {status === 'break' && breakReason && (
            <div className="px-3 text-muted small">
              Reason: <strong>{breakReason}</strong>
            </div>
          )}

          <Dropdown.Divider />

          <Dropdown.Item as={Link} to={paths.designFile}>Attendance</Dropdown.Item>
          <Dropdown.Item as={Link} to={paths.calendar}>Shift Calendar</Dropdown.Item>
          <Dropdown.Item href="#!">Time Clock</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to={paths.userSettings}>Settings</Dropdown.Item>
          <Dropdown.Item as={Link} to={paths.cardLogout}>Logout</Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
