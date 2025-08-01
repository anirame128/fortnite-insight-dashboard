// src/tests/ThemeToggle.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';
import { getTheme, setTheme } from '../utils/theme';

jest.mock('../utils/theme', () => ({
  getTheme: jest.fn(),
  setTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with the correct initial theme', () => {
    (getTheme as jest.Mock).mockReturnValue('light');
    render(<ThemeToggle />);
    
    expect(screen.getByRole('button')).toHaveTextContent('Switch to Dark Mode');
  });

  test('toggles to dark mode and persists preference', () => {
    (getTheme as jest.Mock).mockReturnValue('light');
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith('dark');
    expect(button).toHaveTextContent('Switch to Light Mode');
  });

  test('toggles to light mode and persists preference', () => {
    (getTheme as jest.Mock).mockReturnValue('dark');
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith('light');
    expect(button).toHaveTextContent('Switch to Dark Mode');
  });
});