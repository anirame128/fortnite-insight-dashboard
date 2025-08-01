'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import HomeContent from '@/components/HomeContent';
import { Sun, Moon } from 'lucide-react';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-xl">Home</h1>
        <button onClick={toggleDarkMode} className="p-2 rounded">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>
      <HomeContent />
    </div>
  );
}