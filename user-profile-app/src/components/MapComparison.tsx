'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Maximize2, Minimize2 } from 'lucide-react';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface MapComparisonProps {
  leftMapTitle?: string;
  rightMapTitle?: string;
  leftMapCenter?: [number, number];
  rightMapCenter?: [number, number];
  leftMapZoom?: number;
  rightMapZoom?: number;
}

export default function MapComparison({
  leftMapTitle = 'Before',
  rightMapTitle = 'After',
  leftMapCenter = [40.7128, -74.0060],
  rightMapCenter = [40.7128, -74.0060],
  leftMapZoom = 13,
  rightMapZoom = 13,
}: MapComparisonProps) {
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[var(--foreground)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const mapHeight = isFullscreen ? 'h-screen' : 'h-[600px]';

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[var(--background)] border-b border-[var(--border)]">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Map Comparison</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--accent)] transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${mapHeight}`}>
        {/* Left Map */}
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 bg-[var(--background)] px-3 py-1 rounded-md shadow-lg">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">{leftMapTitle}</h2>
          </div>
          <MapContainer
            center={leftMapCenter}
            zoom={leftMapZoom}
            className="h-full w-full"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <TileLayer
              url={
                theme === 'dark'
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              }
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={leftMapCenter}>
              <Popup>
                <div className="text-[var(--foreground)]">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  {leftMapTitle}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Right Map */}
        <div className="relative">
          <div className="absolute top-4 left-4 z-10 bg-[var(--background)] px-3 py-1 rounded-md shadow-lg">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">{rightMapTitle}</h2>
          </div>
          <MapContainer
            center={rightMapCenter}
            zoom={rightMapZoom}
            className="h-full w-full"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <TileLayer
              url={
                theme === 'dark'
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              }
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={rightMapCenter}>
              <Popup>
                <div className="text-[var(--foreground)]">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  {rightMapTitle}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
        <div className="w-1 h-96 bg-[var(--border)] rounded-full" />
      </div>
    </div>
  );
}