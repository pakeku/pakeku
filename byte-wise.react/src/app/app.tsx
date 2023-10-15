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
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './app-router/app-router';

export const Hello: React.FC = () => {
  return (
    <div>
      <Container>
        <Button variant="primary">Hello World</Button>
      </Container>
    </div>
  );
};
export const AuthenticatedPage = () => {
  return <div>Authenticated Page</div>;
};
import { routes } from './app-router/app-router.config';

export function App() {
  return (
    <>
      <Auth0ProviderWithNavigate>
        <NotificationToastProvider>
          <AppRouter routes={routes} />
        </NotificationToastProvider>
      </Auth0ProviderWithNavigate>
    </>
  );
}

export default App;
