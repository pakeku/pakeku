import React, { ComponentType, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface AuthenticationGuardProps {
  component: ComponentType;
  requiredPermissions?: string[];
  unauthorizedRedirect?: string;
  loadingComponent?: ReactNode;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component: Component,
  requiredPermissions,
  unauthorizedRedirect = '/access-denied',
  loadingComponent = <div>Loading...</div>,
}) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [hasRequiredPermissions, setHasRequiredPermissions] = useState<
    boolean | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermissions = async () => {
      if (isLoading) {
        return;
      }

      if (!isAuthenticated) {
        // User is not authenticated, redirect to login or home page
        navigate('/');
        return;
      }

      if (!requiredPermissions || requiredPermissions.length === 0) {
        setHasRequiredPermissions(true);
        return;
      }

      try {
        const accessToken = await getAccessTokenSilently();

        if (!accessToken) {
          setHasRequiredPermissions(false);
          return;
        }

        const decodedToken: any = jwtDecode(accessToken);
        const userPermissions = decodedToken.permissions || [];
        const hasPermissions = requiredPermissions.every((permission) =>
          userPermissions.includes(permission)
        );
        setHasRequiredPermissions(hasPermissions);
      } catch (error) {
        // Handle errors, you can log or display an error message
        console.error('Error while checking permissions:', error);
        setHasRequiredPermissions(false);
      }
    };

    checkPermissions();
  }, [isAuthenticated, isLoading, getAccessTokenSilently, requiredPermissions, navigate]);

  if (isLoading) {
    return loadingComponent; // Show loading component
  }

  if (hasRequiredPermissions === false) {
    // User doesn't have the required permissions
    navigate(unauthorizedRedirect);
    return null; // You can also return a custom unauthorized component here
  }

  return <Component />; // User has the required permissions, render the component
};
