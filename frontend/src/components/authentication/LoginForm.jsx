import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'react-feather';
import paths from 'routes/paths';
import { useAuth } from 'providers/AuthProvider';
import axiosInstance from 'helpers/axios';

const forgotPasswordPaths = {
  simple: paths.simpleForgotPassword,
  split: paths.splitForgotPassword,
  card: paths.cardForgotPassword
};

const USERS = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin',
    token: 'admin-token'
  },
  {
    username: 'test',
    password: 'test123',
    role: 'test',
    name: 'Test User',
    token: 'test-token'
  }
];

const LoginForm = ({ hasLabel = false, layout = 'simple' }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = USERS.find(
      (u) => u.username === formData.username && u.password === formData.password
    );

    const response = await axiosInstance.post("/auth/login", { username: formData.username, password: formData.password })

    if (response.status == 200) {
      dispatch({ type: 'LOGIN', payload: { token: response.data.token, user: response.data.agent } });
      toast.success(`Logged in as ${formData.username}`, { theme: 'colored' });

      if (response.data.agent.role === 'admin') {
        navigate('/dashboard', { replace: true });
      } else if (response.data.role === 'caller') {
        navigate(paths.supportDesk, { replace: true });
      } else {
        navigate(paths.supportDesk, { replace: true });
      }

      setFormData({ username: '', password: '', remember: false });
    } else {
      toast.error('Invalid username or password', { theme: 'colored' });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Username</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Username' : ''}
          value={formData.username}
          name="username"
          onChange={handleFieldChange}
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 position-relative">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type={showPassword ? 'text' : 'password'}
          required
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            top: hasLabel ? '38px' : '10px',
            right: '10px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </Form.Group>

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleFieldChange}
            />
            <Form.Check.Label className="mb-0 text-700">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>
        <Col xs="auto">
          <Link className="fs-10 mb-0" to={forgotPasswordPaths[layout]}>
            Forgot Password?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.username || !formData.password}
        >
          Log in
        </Button>
      </Form.Group>
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

export default LoginForm;
