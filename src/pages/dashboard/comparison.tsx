import { useState, useEffect } from 'react';
import MapComparison from '@/components/MapComparison';
import { useRouter } from 'next/router';
import { useTheme } from '@/hooks/useTheme';

const DashboardComparison = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <div className={`bg-[var(--background)]`}>
      <MapComparison />
    </div>
  );
};

export default DashboardComparison;