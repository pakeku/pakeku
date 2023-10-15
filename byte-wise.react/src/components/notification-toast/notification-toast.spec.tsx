import { render } from '@testing-library/react';

import NotificationToast from './notification-toast';

describe('NotificationToast', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationToast />);
    expect(baseElement).toBeTruthy();
  });
});
