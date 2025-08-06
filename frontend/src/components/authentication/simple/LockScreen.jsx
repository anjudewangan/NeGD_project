import React from 'react';
import LockScreenForm from 'components/authentication/LockScreenForm';

const LockScreen = () => {
  return (
    <div className="text-center">
      <h4 className="mb-3">
        Welcome to <br /> DigiLocker/EntityLocker Support
      </h4>
      <p className="text-start">
        In process of our continued efforts to improve the user experience, all your past conversations will be available for your reference in "check ticket status".
      </p>
      <p className="text-start">
        Onwards we will encourage you to use our ticket system only. Assure your best of co-operation.
      </p>
      <p className="text-start">DigiLocker Support, <br /> Government of India</p>

      <LockScreenForm className="mt-4 mx-sm-4" type="simple" />

    </div>
  );
};

export default LockScreen;
