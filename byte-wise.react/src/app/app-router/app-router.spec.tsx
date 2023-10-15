import { render } from '@testing-library/react';

import AppRouter from './app-router';

describe('AppRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppRouter />);
    expect(baseElement).toBeTruthy();
  });
});
