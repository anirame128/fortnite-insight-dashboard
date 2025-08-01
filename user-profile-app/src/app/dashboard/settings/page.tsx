import React, { useEffect, useState } from 'react';
import SettingsForm from '@/components/SettingsForm';

const SettingsPage = () => {
  const [theme, setTheme] = useState('light'); // Safe default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <div className={`bg-[var(--background)] text-[var(--foreground)]`}>
      <h1 className="text-2xl font-bold">Settings</h1>
      <SettingsForm theme={theme} />
    </div>
  );
};

export default SettingsPage;