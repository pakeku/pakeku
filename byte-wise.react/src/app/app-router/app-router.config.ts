import { AuthAccessDenied } from 'byte-wise.react/src/auth';
import { ProfilePage } from 'byte-wise.react/src/pages/profile-page/profile-page';
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
