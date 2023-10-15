import { render } from '@testing-library/react';

import AuthAccessDenied from './auth-access-denied';

describe('AuthAccessDenied', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthAccessDenied />);
    expect(baseElement).toBeTruthy();
  });
});
