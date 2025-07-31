// user-profile-app/src/utils/theme.ts

interface Theme {
  name: string;
  class: string;
}

const themes: Theme[] = [
  { name: 'light', class: 'light' },
  { name: 'dark', class: 'dark' },
];

let currentTheme: Theme | null = null;

function getThemeClass(theme: Theme) {
  return theme.class;
}

function setTheme(theme: Theme) {
  localStorage.setItem('theme', JSON.stringify(theme));
  document.documentElement.classList.replace(...document.documentElement.classList, theme.class);
}

function toggleTheme() {
  const currentIndex = themes.findIndex((theme) => theme.name === currentTheme?.name);
  const nextIndex = (currentIndex + 1) % themes.length;
  currentTheme = themes[nextIndex];
  setTheme(currentTheme);
}

function switchTheme(themeName: string) {
  const theme = themes.find((t) => t.name === themeName);
  if (theme) {
    setTheme(theme);
    currentTheme = theme;
  } else {
    console.error(`Theme not found: ${themeName}`);
  }
}

function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    currentTheme = JSON.parse(storedTheme);
    setTheme(currentTheme);
  } else {
    currentTheme = themes[0];
    setTheme(currentTheme);
  }
}

initTheme();

export { themes, getThemeClass, setTheme, toggleTheme, switchTheme, currentTheme };