import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router

export const AuthAccessDenied: React.FC = () => {
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center vh-100'>
      <div>
        <h1>Access Denied</h1>
        <p>You do not have the required permissions to access this page.</p>
        <Link to="/">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default AuthAccessDenied;
