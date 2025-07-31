// user-profile-app/src/utils/theme.ts

interface Theme {
  dark: boolean;
}

const THEME_KEY = 'theme';

const getTheme = (): Theme => {
  const theme = localStorage.getItem(THEME_KEY);
  if (theme) {
    return JSON.parse(theme) as Theme;
  }
  return { dark: false };
};

const setTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  applyTheme(theme);
};

const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  if (theme.dark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const toggleTheme = (): void => {
  const currentTheme = getTheme();
  const newTheme = { dark: !currentTheme.dark };
  setTheme(newTheme);
};

export { getTheme, setTheme, applyTheme, toggleTheme };