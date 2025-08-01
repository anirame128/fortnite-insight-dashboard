// src/hooks/useMapComparison.ts
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapComparisonData } from '@/types/mapComparison';

const useMapComparison = () => {
  const [mapComparisonData, setMapComparisonData] = useState<MapComparisonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMapComparisonData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/map-comparison');
      setMapComparisonData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapComparisonData();
  }, []);

  return { mapComparisonData, error, loading };
};

export default useMapComparison;



// src/types/mapComparison.ts
interface MapComparisonData {
  // Define the structure of the map comparison data
  id: number;
  name: string;
  description: string;
  // Add other properties as needed
}

export { MapComparisonData };



// src/components/MapComparison.tsx
import useMapComparison from '@/hooks/useMapComparison';

const MapComparison = () => {
  const { mapComparisonData, error, loading } = useMapComparison();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mapComparisonData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>{mapComparisonData.name}</h1>
      <p>{mapComparisonData.description}</p>
      {/* Add other components or elements as needed */}
    </div>
  );
};

export default MapComparison;



/* src/globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

/* Use semantic class names like bg-[var(--background)] or custom CSS variables */



// src/layout.tsx
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Safe default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  // Don't render until mounted
  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <html className={theme}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const stored = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = stored || (prefersDark ? 'dark' : 'light');
              document.documentElement.classList.toggle('dark', theme === 'dark');
            })();
          `,
        }}
      />
      {children}
    </html>
  );
};

export default Layout;