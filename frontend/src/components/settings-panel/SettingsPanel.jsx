import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Offcanvas, Button, ButtonGroup, Form } from 'react-bootstrap';
import defaultModeImg from 'assets/img/generic/falcon-mode-default.jpg';
import darkModeImg from 'assets/img/generic/falcon-mode-dark.jpg';
import autoModeImg from 'assets/img/generic/falcon-mode-auto.jpg';
import invertedImg from 'assets/img/generic/inverted.png';
import cardImg from 'assets/img/generic/card.png';
import vibrantImg from 'assets/img/generic/vibrant.png';
import transparentImg from 'assets/img/generic/default.png';
import leftArrowFromLeft from 'assets/img/icons/left-arrow-from-left.svg';
import arrowsH from 'assets/img/icons/arrows-h.svg';
import paragraph from 'assets/img/icons/paragraph.svg';
import settings from 'assets/img/icons/spot-illustrations/settings.png';
import Flex from 'components/common/Flex';
import RadioItem from './RadioItem';
import SubtleBadge from 'components/common/SubtleBadge';
import { useAppContext } from 'providers/AppProvider';
import { useLocation } from 'react-router-dom';


const SettingsPanel = () => {
  const { pathname } = useLocation();
  const {
    config: {
      isFluid,
      isRTL,
      theme,
      navbarPosition,
      navbarStyle,
      showSettingPanel,
      disabledNavbarPosition
    },
    setConfig,
    changeTheme,
    configDispatch
  } = useAppContext();

  const [navbars] = useState([
    { name: 'transparent', image: transparentImg },
    { name: 'inverted', image: invertedImg },
    { name: 'card', image: cardImg },
    { name: 'vibrant', image: vibrantImg }
  ]);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: input, timestamp: time }]);
    setInput('');
    setTimeout(() => {
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm just a demo bot!", timestamp: botTime }]);
    }, 500);
  };

  const [selectedLanguage, setSelectedLanguage] = useState('');

  return (
    <Offcanvas
      show={showSettingPanel}
      onHide={() => setConfig('showSettingPanel', false)}
      placement="end"
      style={{ maxWidth: '22rem', height: '60vh', top: '31vh' }}
      className="border-0"
    >
      <Offcanvas.Header closeButton closeVariant="white" className="bg-shape settings-panel-header">
        <Offcanvas.Title as="div" className="py-1 z-1 light w-100">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="text-white mb-0">
              <FontAwesomeIcon icon="user-circle" className="me-2 fs-6" /> Chat Assistant
            </h5>
          </div>
          <Form.Group className="mb-0">
            <Form.Select
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              className="form-select-sm"
            >
              <option value="">Select Language</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="or">Odia</option>
              <option value="as">Assamese</option>
            </Form.Select>
          </Form.Group>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="scrollbar">
        <div
          style={{
            height: '355px',
            overflowY: 'auto',
            border: '1px solid #dee2e6',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#f8f9fa'
          }}
        >
          {messages.map((msg, i) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={i} className={`mb-2 text-${isUser ? 'end' : 'start'}`}>
                <div
                  className="d-inline-block text-start"
                  style={{
                    fontSize: '14px',
                    color: isUser ? '#fff' : '#000',
                    backgroundColor: isUser ? '#2C7BE5' : '#EDF2F9',
                    padding: '5px 12px',
                    borderRadius: '0.5rem',
                    maxWidth: '75%',
                    display: 'inline-block'
                  }}
                >
                  {msg.text}
                  <div className="small mt-1" style={{ color: isUser ? '#ccc' : '#ccc' }}>
                  </div>
                </div>
                <div className="small text-muted mt-1">{msg.timestamp}</div>
              </div>
            );
          })}

        </div>
        <Form
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Form.Group className="d-flex gap-2">
            <Form.Control
              type="text"
              value={input}
              placeholder="Type a message..."
              onChange={e => setInput(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form.Group>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SettingsPanel;
