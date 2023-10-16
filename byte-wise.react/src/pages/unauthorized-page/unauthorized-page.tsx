import React from 'react';
import { Link } from 'react-router-dom';

export interface UnauthorizedPageProps {}

export function UnauthorizedPage(props: UnauthorizedPageProps) {
  return (
    <div className="container">
      <h1>Unauthorized 403 Forbidden</h1>
      <p>If you think this is a mistake, please contact the administrator.</p>
      <Link to="/">Go to the main page</Link>
    </div>
  );
}

export default UnauthorizedPage;
