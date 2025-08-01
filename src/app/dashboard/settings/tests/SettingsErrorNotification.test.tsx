// src/app/dashboard/settings/tests/SettingsErrorNotification.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsErrorNotification from '../SettingsErrorNotification';

describe('SettingsErrorNotification', () => {
  it('renders the error message correctly', () => {
    const errorMessage = 'Failed to update settings. Please try again.';
    
    render(<SettingsErrorNotification message={errorMessage} />);

    const notification = screen.getByRole('alert');
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent(errorMessage);
  });

  it('does not render when there is no error message', () => {
    render(<SettingsErrorNotification message="" />);

    const notification = screen.queryByRole('alert');
    expect(notification).not.toBeInTheDocument();
  });

  it('renders with appropriate styles', () => {
    const errorMessage = 'An unexpected error occurred.';
    
    const { container } = render(<SettingsErrorNotification message={errorMessage} />);
    
    expect(container.firstChild).toHaveClass('error-notification'); // Assuming 'error-notification' is a defined class
  });
});