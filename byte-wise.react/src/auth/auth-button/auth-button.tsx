import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function AuthButton() {
  const { isAuthenticated, loginWithRedirect, logout, isLoading } =
    useAuth0();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: '/',
        },
        authorizationParams: {
          prompt: 'login',
        },
      });
    } catch (err) {
      handleError(err, 'Error logging in');
    }
  };

  const handleLogout = () => {
    try {
      logout();
      navigate('/');
    } catch (err) {
      handleError(err, 'Error logging out');
    }
  };

  const handleError = (err: any, message: any) => {
    const errorMessage = err instanceof Error ? err.message : String(err);
    toast.error(`${message}: ${errorMessage}`);
  };

  return isLoading ? (
    <button disabled>Loading...</button>
  ) : isAuthenticated ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
