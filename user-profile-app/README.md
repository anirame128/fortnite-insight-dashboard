# README.md

## Dark Mode Toggle Feature

### Overview
The dark mode toggle feature allows users to switch between light and dark themes seamlessly. This feature enhances user experience by providing a visually comfortable interface based on user preference.

### How to Use
1. **Toggle Button**: The dark mode can be toggled using the `ThemeToggle` component, which is typically placed in the header or settings area of the application.
2. **Automatic Theme Persistence**: The user's theme preference is saved in `localStorage`, ensuring that the selected theme persists across sessions.

### Implementation Details
- **Theme Management**: The theme is managed through a utility function that reads from and writes to `localStorage`. The current theme is applied immediately upon toggling.
- **Icons**: The toggle button uses `SunIcon` for light mode and `MoonIcon` for dark mode, providing a clear visual indication of the current theme.
- **CSS Variables**: The application utilizes CSS variables for theme colors, allowing for easy adjustments and consistent styling across components.

### Code Structure
- **ThemeToggle Component**: Located in `src/components/ThemeToggle.tsx`, this component handles the theme switching logic.
- **Icons**: The icons for the toggle are defined in `src/components/icons/SunIcon.tsx` and `src/components/icons/MoonIcon.tsx`.
- **Utility Functions**: The theme persistence logic is encapsulated in `src/utils/theme.ts`, which includes functions for getting and setting the theme.

### Testing
Unit tests for the `ThemeToggle` component are located in `src/tests/ThemeToggle.test.tsx`. These tests ensure that the component correctly toggles themes and persists the user's preference.

### Accessibility
The toggle button is designed to be accessible, with appropriate ARIA labels and keyboard navigation support.

### Performance Considerations
The implementation is optimized for performance, ensuring minimal re-renders and efficient state management.

### Security
All user inputs are validated and sanitized to prevent potential security vulnerabilities.

### Example Usage

import ThemeToggle from '@/components/ThemeToggle';

function App() {
    return (
        <div>
            <ThemeToggle />
            {/* Other components */}
        </div>
    );
}


### Conclusion
The dark mode toggle feature enhances user experience by providing a customizable interface. Follow the instructions above to integrate and utilize this feature effectively.