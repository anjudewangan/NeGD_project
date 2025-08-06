import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import classNames from 'classnames';

const LockScreenForm = ({ type, ...rest }) => {
  const [email, setEmail] = useState('');
  const allowedEmail = 'support123@gmail.com';
  const redirectUrl = '/support/digilocker/ticket';

  const handleSubmit = e => {
    e.preventDefault();
    if (email.toLowerCase() === allowedEmail) {
      toast.success('Redirecting to Support Center...', {
        theme: 'colored'
      });
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1500);
    } else {
      toast.error('Invalid email address', {
        theme: 'colored'
      });
    }
  };

  return (
    <Row
      {...rest}
      as={Form}
      className={classNames('gx-2 mt-4', {
        'mx-sm-4 mb-2': type === 'simple'
      })}
      onSubmit={handleSubmit}
    >
      <Col>
        <Form.Control
          placeholder="Enter your email"
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </Col>
      <Col xs={type === 'simple' ? 'auto' : 4}>
        <Button
          variant="primary"
          type="submit"
          disabled={!email}
          className={classNames({ 'w-100': type !== 'simple' })}
        >
          Submit
        </Button>
      </Col>
    </Row>
  );
};

LockScreenForm.propTypes = {
  type: PropTypes.oneOf(['simple', 'split', 'card'])
};

export default LockScreenForm;
