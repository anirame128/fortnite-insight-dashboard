import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MapComparison from '@/components/MapComparison';
import { saveComparisonToLocalStorage, getComparisonFromLocalStorage } from '@/utils/localStorage';

const ComparisonPage = () => {
  const router = useRouter();
  const [theme, setTheme] = useState('light'); // Safe default
  const [mounted, setMounted] = useState(false);
  const [mapComparison, setMapComparison] = useState(getComparisonFromLocalStorage() || {});
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  const handleSwapMaps = () => {
    // Implement swap maps logic
    setMapComparison((prevComparison) => ({ ...prevComparison, maps: prevComparison.maps.reverse() }));
  };

  const handleClearAll = () => {
    // Implement clear all logic
    setMapComparison({});
    saveComparisonToLocalStorage({});
  };

  const handleSaveComparison = () => {
    // Implement save comparison logic
    saveComparisonToLocalStorage(mapComparison);
  };

  const handleShareComparison = () => {
    // Implement share comparison logic
    const url = `${window.location.href}?comparison=${JSON.stringify(mapComparison)}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="bg-[var(--background)] p-4">
      <h1 className="text-[var(--foreground)] text-2xl mb-4">Map Comparison</h1>
      <MapComparison mapComparison={mapComparison} />
      <div className="flex justify-between mt-4">
        <button
          className="bg-[var(--background)] hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] px-4 py-2 rounded"
          onClick={handleSwapMaps}
        >
          Swap Maps
        </button>
        <button
          className="bg-[var(--background)] hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] px-4 py-2 rounded"
          onClick={handleClearAll}
        >
          Clear All
        </button>
        <button
          className="bg-[var(--background)] hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] px-4 py-2 rounded"
          onClick={handleSaveComparison}
        >
          Save Comparison
        </button>
        <button
          className="bg-[var(--background)] hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-[var(--background)] px-4 py-2 rounded"
          onClick={handleShareComparison}
        >
          Share Comparison
        </button>
      </div>
      {error && <p className="text-[var(--foreground)] mt-4">{error.message}</p>}
    </div>
  );
};

export default ComparisonPage;