// src/components/ExternalLinkButton.test.tsx

import { render, screen } from '@testing-library/react';
import ExternalLinkButton from './ExternalLinkButton';

describe('ExternalLinkButton', () => {
  const url = 'https://fortnite.gg/creative';
  const buttonText = 'Creative Maps';

  it('renders correctly', () => {
    render(<ExternalLinkButton href={url}>{buttonText}</ExternalLinkButton>);
    
    const button = screen.getByRole('link', { name: buttonText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', url);
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has the correct styles', () => {
    render(<ExternalLinkButton href={url}>{buttonText}</ExternalLinkButton>);
    
    const button = screen.getByRole('link', { name: buttonText });
    expect(button).toHaveClass('your-tailwind-css-classes'); // Replace with actual classes used
  });
});