import React, { useState, useEffect } from 'react';

interface ThemeToggleProps {
  children: React.ReactNode;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center">
      <label className="mr-2" htmlFor="theme-toggle">
        {children}
      </label>
      <input
        id="theme-toggle"
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className="dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default ThemeToggle;