import { AuthAccessDenied } from 'byte-wise.react/src/auth';
import { ProfilePage, UnauthorizedPage } from 'byte-wise.react/src/pages';

export const routes = [
  {
    path: '/auth-access-denied',
    component: AuthAccessDenied,
  },
  {
    path: '/',
    component: ProfilePage,
  },
];
