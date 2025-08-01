// src/components/MapComparison.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { MapChart } from '@/components/MapChart';
import { holtWintersForecast } from '@/utils/holtWintersForecast';
import { getMapData } from '@/api/mapData';

interface MapComparisonProps {
  // Add props if necessary
}

const MapComparison: React.FC<MapComparisonProps> = () => {
  const [mapData, setMapData] = useState([]);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const fetchMapData = async () => {
      const data = await getMapData();
      setMapData(data);
    };
    fetchMapData();
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  const forecast = holtWintersForecast(mapData);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <MapChart data={mapData} forecast={forecast} />
        <MapChart data={mapData} forecast={forecast} />
      </div>
    </div>
  );
};

export default MapComparison;



/* globals.css */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

/* Use semantic class names like bg-[var(--background)] */



// layout.tsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <html className={theme === 'dark' ? 'dark' : ''}>
      <head>
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
      </head>
      <body>{children}</body>
    </html>
  );
};

export default Layout;