import React from 'react';
import { Card } from 'react-bootstrap';
import { useAppContext } from 'providers/AppProvider';
import { FaComments } from 'react-icons/fa';

const chatToggleStyle = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  zIndex: 1050,
  cursor: 'pointer',
  borderRadius: '50px',
  backgroundColor: 'white',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.2s',
};

const SettingsToggle = () => {
  const { setConfig } = useAppContext();

  const handleClick = () => {
    setConfig('showSettingPanel', true);
  };

  return (
    <Card style={chatToggleStyle} className="chat-toggle" onClick={handleClick}>
      <Card.Body className="d-flex align-items-center p-2">
        <FaComments size={30} color="#2A7BE4" className="me-1" />
      </Card.Body>
    </Card>
  );
};


export default SettingsToggle;
