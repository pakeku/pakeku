import { render } from '@testing-library/react';

import AuthUserProfile from './auth-user-profile';

describe('AuthUserProfile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthUserProfile />);
    expect(baseElement).toBeTruthy();
  });
});
