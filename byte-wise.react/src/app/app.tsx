import { Route, Routes, Link } from 'react-router-dom';

// auth
import {
  Auth0ProviderWithNavigate,
  AuthButton,
  AuthenticationGuard,
  AuthAccessDenied,
  AuthProfilePage,
} from '../auth';

// notifications
import { NotificationToastProvider } from '../components';
import Button  from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export const Hello: React.FC = () => {
  return (
    <div>
      <Container>
        
      <Button variant='primary'>Hello World</Button>
      </Container>
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
              <Route path="/access-denied" element={<AuthAccessDenied />} />
              <Route path="/profile" element={<AuthProfilePage />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </div>
        </NotificationToastProvider>
      </Auth0ProviderWithNavigate>
    </>
  );
}

export default App;
