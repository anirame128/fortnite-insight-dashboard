// src/utils/theme.ts

const THEME_KEY = 'user-theme';

export const getTheme = (): 'light' | 'dark' => {
    const theme = localStorage.getItem(THEME_KEY);
    return (theme === 'dark' ? 'dark' : 'light');
};

export const setTheme = (theme: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
};