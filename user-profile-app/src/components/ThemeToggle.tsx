// src/components/ThemeToggle.tsx

'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { getTheme, setTheme } from '@/utils/theme';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(getTheme() === 'dark');

  useEffect(() => {
    setTheme(isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
    </button>
  );
};

export default ThemeToggle;