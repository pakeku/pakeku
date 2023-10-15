// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
// auth
import {
  Auth0ProviderWithNavigate,
  AuthButton,
  AuthenticationGuard,
} from '../auth';
import AccessDenied from '../auth/auth-access-denied/auth-access-denied';

// notifications
import { NotificationToastProvider } from '../components';

export const Hello: React.FC = () => {
  return (
    <div>
      <h1>Hello World Page</h1>
    </div>
  );
};
export const AuthenticatedPage = () => {
  return <div>Authenticated Page</div>;
};

export function App() {
  return (
    <>
      <Auth0ProviderWithNavigate>
        <NotificationToastProvider>
          <div>
            <div role="navigation">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/page-2">Page 2</Link>
                </li>
                <li>
                  <AuthButton />
                </li>
              </ul>
            </div>
            <Routes>
              <Route
                path="/"
                element={<AuthenticationGuard component={Hello} />}
              />
              <Route
                path="/page-2"
                element={<AuthenticationGuard component={AuthenticatedPage} />}
              />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
        </NotificationToastProvider>
      </Auth0ProviderWithNavigate>
    </>
  );
}

export default App;
