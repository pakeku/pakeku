import { AuthAccessDenied, AuthProfilePage } from 'byte-wise.react/src/auth';

export const routes = [
  {
    path: '/auth-access-denied',
    component: AuthAccessDenied,
  },
  {
    path: '/',
    component: AuthProfilePage,
  },
];
