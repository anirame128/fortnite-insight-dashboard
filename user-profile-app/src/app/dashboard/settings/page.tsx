'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] p-4">
      <h1 className="text-lg font-bold mb-4">Settings</h1>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={handleThemeChange}
          />
          Dark Mode
        </label>
      </div>
    </div>
  );
}