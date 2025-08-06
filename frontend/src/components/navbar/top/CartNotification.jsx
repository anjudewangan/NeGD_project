import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import paths from 'routes/paths';

const ResourcesDropdown = () => {
  return (
    <Nav.Item as="li" className="d-none d-sm-block">
      <NavDropdown
        title={<FontAwesomeIcon icon={faInfoCircle} className="" />}
        id="resources-dropdown"
        align="end"
      >
        <NavDropdown.Item as={Link} to={paths.migration}>
          Knowledge Base
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={paths.faq}>
          Support
        </NavDropdown.Item>
      </NavDropdown>
    </Nav.Item>
  );
};

export default ResourcesDropdown;
