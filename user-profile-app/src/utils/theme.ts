// src/utils/theme.ts

/**
 * Utility function to handle theme persistence in localStorage.
 * It checks for existing theme preferences and applies them on initial load,
 * as well as updates the preference when the user toggles the theme.
 */

const THEME_KEY = 'user-theme';

/**
 * Get the current theme from localStorage or default to 'light'.
 * @returns {string} The current theme ('light' or 'dark').
 */
export const getCurrentTheme = (): string => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(THEME_KEY) || 'light';
    }
    return 'light'; // Default theme for SSR
};

/**
 * Set the theme in localStorage and apply it to the document.
 * @param {string} theme - The theme to set ('light' or 'dark').
 */
export const setTheme = (theme: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_KEY, theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }
};