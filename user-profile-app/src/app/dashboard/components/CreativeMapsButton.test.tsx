// src/app/dashboard/components/CreativeMapsButton.test.tsx

import { render, screen } from '@testing-library/react';
import CreativeMapsButton from './CreativeMapsButton';

describe('CreativeMapsButton', () => {
  test('renders correctly', () => {
    render(<CreativeMapsButton />);
    
    const button = screen.getByRole('link', { name: /creative maps/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', 'https://fortnite.gg/creative');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('opens the link in a new tab', () => {
    render(<CreativeMapsButton />);
    
    const button = screen.getByRole('link', { name: /creative maps/i });
    expect(button).toHaveAttribute('target', '_blank');
  });
});