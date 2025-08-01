// src/app/dashboard/settings/successNotification.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import SuccessNotification from '../components/SuccessNotification'; // Adjust the import path as necessary

describe('SuccessNotification', () => {
    it('renders the success message correctly', () => {
        const message = "Settings updated successfully!";
        render(<SuccessNotification message={message} />);

        const notificationElement = screen.getByText(message);
        expect(notificationElement).toBeInTheDocument();
        expect(notificationElement).toHaveClass('success-notification'); // Adjust class name as necessary
    });

    it('does not render when message is empty', () => {
        render(<SuccessNotification message="" />);

        const notificationElement = screen.queryByText(/settings updated successfully/i);
        expect(notificationElement).not.toBeInTheDocument();
    });

    it('renders with correct accessibility attributes', () => {
        const message = "Settings updated successfully!";
        render(<SuccessNotification message={message} />);

        const notificationElement = screen.getByText(message);
        expect(notificationElement).toHaveAttribute('role', 'alert');
    });
});