// src/app/dashboard/settings/tests/SettingsSuccessNotification.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsSuccessNotification from '../SettingsSuccessNotification';

describe('SettingsSuccessNotification', () => {
  it('displays the success message when provided', () => {
    const message = 'Settings updated successfully!';
    render(<SettingsSuccessNotification message={message} />);

    const notification = screen.getByRole('alert');
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent(message);
  });

  it('does not render when no message is provided', () => {
    render(<SettingsSuccessNotification message={undefined} />);

    const notification = screen.queryByRole('alert');
    expect(notification).not.toBeInTheDocument();
  });

  it('renders with correct accessibility attributes', () => {
    const message = 'Settings updated successfully!';
    render(<SettingsSuccessNotification message={message} />);

    const notification = screen.getByRole('alert');
    expect(notification).toHaveAttribute('role', 'alert');
    expect(notification).toHaveAttribute('aria-live', 'assertive');
  });
});