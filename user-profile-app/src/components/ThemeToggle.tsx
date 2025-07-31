import React, { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, []);

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;