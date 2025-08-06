import React, { useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navItems = [
  {
    id: '1',
    name: 'Getting Started',
    expanded: true,
    children: [
      { id: '2', to: 'contact-support', name: 'How to contact the support team' },
      { id: '3', to: 'support-hours', name: 'Helpdesk working hours and response times' },
      { id: '4', to: 'create-ticket', name: 'How to create a support ticket' },
      { id: '5', to: 'check-ticket-status', name: 'How to check the status of your ticket' },
      { id: '6', to: 'escalate-issue', name: 'Escalating a support issue' }
    ]
  },
  {
    id: '7',
    name: 'Phone System Issues',
    expanded: false,
    children: [
      { id: '8', to: 'no-dial-tone', name: 'Phone not ringing or no dial tone' },
      { id: '9', to: 'reset-voip', name: 'How to reset your VoIP phone' },
      { id: '10', to: 'call-drops', name: 'Common call drop issues and how to fix them' },
      { id: '11', to: 'setup-voicemail', name: 'How to set up voicemail' },
      { id: '12', to: 'transfer-call', name: 'Transferring a call to another agent' },
      { id: '13', to: 'call-forwarding', name: 'How to use call forwarding' }
    ]
  },
  {
    id: '14',
    name: 'Agent Tools & Access',
    expanded: false,
    children: [
      { id: '15', to: 'agent-login', name: 'How to log in to the agent portal' },
      { id: '16', to: 'reset-password', name: 'Resetting your helpdesk or CRM password' },
      { id: '17', to: 'access-call-logs', name: 'How to access call logs and recordings' },
      { id: '18', to: 'agent-dashboard', name: 'Understanding your dashboard and KPIs' },
      { id: '19', to: 'availability-status', name: 'How to update your availability status' }
    ]
  },
  {
    id: '20',
    name: 'Call Handling Procedures',
    expanded: false,
    children: [
      { id: '21', to: 'inbound-calls', name: 'How to handle inbound customer calls' },
      { id: '22', to: 'outbound-calls', name: 'Steps to make an outbound call' },
      { id: '23', to: 'call-disposition', name: 'Call disposition: What it is and how to use it' },
      { id: '24', to: 'hold-transfer', name: 'How to place a caller on hold or transfer' },
      { id: '25', to: 'call-recording', name: 'Recording customer calls (when and how)' }
    ]
  },
  {
    id: '26',
    name: 'CRM & Ticketing',
    expanded: false,
    children: [
      { id: '27', to: 'create-update-ticket', name: 'How to create and update a ticket during a call' },
      { id: '28', to: 'link-ticket-customer', name: 'Linking a ticket to a customer profile' },
      { id: '29', to: 'search-history', name: 'Searching for past customer interactions' },
      { id: '30', to: 'tagging-tickets', name: 'How to tag tickets correctly' },
      { id: '31', to: 'close-ticket', name: 'Closing and resolving a ticket – steps and policy' }
    ]
  },
  {
    id: '32',
    name: 'Policies & Compliance',
    expanded: false,
    children: [
      { id: '33', to: 'recording-policy', name: 'Call recording policy' },
      { id: '34', to: 'data-privacy', name: 'Data privacy and handling customer information' },
      { id: '35', to: 'escalation-rules', name: 'Agent conduct and escalation rules' },
      { id: '36', to: 'shift-policy', name: 'Break and shift policies' },
      { id: '37', to: 'wfh-security', name: 'Work-from-home call center security guidelines' }
    ]
  },
  {
    id: '38',
    name: 'Technical Troubleshooting',
    expanded: false,
    children: [
      { id: '39', to: 'headset-issues', name: 'Microphone or headset not working' },
      { id: '40', to: 'call-quality', name: 'Fixing call quality issues (static, delay)' },
      { id: '41', to: 'browser-support', name: 'Browser compatibility issues with agent tools' },
      { id: '42', to: 'session-timeout', name: 'System timeout or session expired – what to do' },
      { id: '43', to: 'vpn-issues', name: 'VPN or remote access issues' }
    ]
  },
  {
    id: '44',
    name: 'Training & Onboarding',
    expanded: false,
    children: [
      { id: '45', to: 'onboarding-checklist', name: 'New agent onboarding checklist' },
      { id: '46', to: 'call-scripts', name: 'Call scripts and templates' },
      { id: '47', to: 'handling-difficult-calls', name: 'Handling difficult customers professionally' },
      { id: '48', to: 'training-materials', name: 'Accessing training materials and SOPs' },
      { id: '49', to: 'live-help', name: 'Where to get live help during a call' }
    ]
  }
];


const MigrationSidebar = () => {
  return (
    <div className="sticky-sidebar migration-sidebar">
      <Card className="sticky-top font-sans-serif">
        <Card.Header className="border-bottom">
          <h6 className="mb-0 fs-9">HELP TOPICS</h6>
        </Card.Header>
        <Card.Body>
          <div className="scrollbar p-2" style={{ maxHeight: '70vh' }}>
            <ul id="migrationTreeView" className="mb-0 treeview">
              {navItems.map(item =>
                item.children && item.children.length > 0 ? (
                  <MigrationCollapse key={item.id} item={item} />
                ) : (
                  <MigrationNavItem key={item.id} item={item} />
                )
              )}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

const MigrationCollapse = ({ item }) => {
  const [open, setOpen] = useState(item.expanded ?? true);

  const hasVisibleChild = item => {
    if (!item.children) return false;
    return item.children.some(child => {
      if (child.children && child.children.length > 0) {
        return hasVisibleChild(child);
      }
      return true;
    });
  };

  const showBorder = open && hasVisibleChild(item);

  return (
    <li className="treeview-list-item mb-2">
      <div className="toggle-container">
        <a
          className={classNames('collapse-toggle text-nowrap', {
            collapsed: open
          })}
          href="#!"
          onClick={() => setOpen(prev => !prev)}
        >
          <p className="treeview-text">{item.name}</p>
        </a>
      </div>
      <Collapse in={open}>
        <ul
          className={classNames('treeview-list', {
            'collapse-hidden': !open,
            'collapse-show': open,
            'treeview-border': showBorder,
            'treeview-border-transparent': !showBorder
          })}
        >
          {item?.children?.map(subItem =>
            subItem.children && subItem.children.length > 0 ? (
              <MigrationCollapse key={subItem.id} item={subItem} />
            ) : (
              <MigrationNavItem key={subItem.id} item={subItem} />
            )
          )}
        </ul>
      </Collapse>
    </li>
  );
};

const MigrationNavItem = ({ item }) => {
  const { hash } = useLocation();
  return (
    <li className="treeview-list-item mb-2">
      <a
        className={classNames('treeview-item flex-1', {
          active: hash === `#${item.to}`
        })}
        href={`#${item.to}`}
      >
        <p className="treeview-text fw-medium text-nowrap">
          <FontAwesomeIcon icon="hashtag" className="fa-w-14 me-2 fs-11" />
          {item.name}
        </p>
      </a>
    </li>
  );
};

MigrationCollapse.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
    children: PropTypes.array
  }).isRequired
};

MigrationNavItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default MigrationSidebar;
