import React from 'react';

export const AuthAccessDenied: React.FC = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have the required permissions to access this page.</p>
      <p>403 Forbidden</p>
    </div>
  );
};

export default AuthAccessDenied;
