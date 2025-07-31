// user-profile-app/src/utils/theme.ts
interface Theme {
  dark: boolean;
}

const THEME_STORAGE_KEY = 'theme';

const getThemeFromStorage = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme) {
    return JSON.parse(storedTheme);
  }
  return { dark: false };
};

const setThemeInStorage = (theme: Theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
};

const applyTheme = (theme: Theme) => {
  const rootElement = document.documentElement;
  if (theme.dark) {
    rootElement.classList.add('dark');
  } else {
    rootElement.classList.remove('dark');
  }
};

const toggleTheme = () => {
  const currentTheme = getThemeFromStorage();
  const newTheme: Theme = { dark: !currentTheme.dark };
  setThemeInStorage(newTheme);
  applyTheme(newTheme);
};

const initTheme = () => {
  const theme = getThemeFromStorage();
  applyTheme(theme);
};

export { initTheme, toggleTheme };