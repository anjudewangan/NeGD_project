import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/authentication/LoginForm';

import AuthCardLayout from 'layouts/AuthCardLayout';
import paths from 'routes/paths';
import digilocker from 'assets/img/logos/digilocker.png';
import umang from 'assets/img/logos/umang.png';
import aikosh from 'assets/img/logos/ai-kosh.png';

const Login = () => {
  return (
    <AuthCardLayout
      leftSideContent={
        <p className="text-white">
          Don't have an account?
          <br />
          <Link
            className="text-white text-decoration-underline"
            to={paths.cardRegister}
          >
            Get started!
          </Link>
        </p>
      }
    >
      <h3>Account Login</h3>
      <LoginForm layout="card" hasLabel />
      <div className='pt-6 d-flex justify-content-center align-items-center'>
        <img
          src={digilocker}
          alt="Digilocker Logo"
          width="120"
          className='mt-2'
        />
        <img
          src={umang}
          alt="Umang"
          width="100 Logo"
        />
        <img
          src={aikosh}
          alt="AIKosh"
          width="80 Logo"
        />
      </div>
    </AuthCardLayout>
  );
};

export default Login;
