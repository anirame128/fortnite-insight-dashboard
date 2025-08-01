'use client';

import { useState, useEffect } from 'react';
import { MapDisplay } from '@/components/MapDisplay';
import { MapCode } from '@/types/map';
import { cn } from '@/lib/utils';

interface MapComparisonProps {
  leftMap: MapCode;
  rightMap: MapCode;
  onLeftMapChange?: (map: MapCode) => void;
  onRightMapChange?: (map: MapCode) => void;
  className?: string;
}

export default function MapComparison({
  leftMap,
  rightMap,
  onLeftMapChange,
  onRightMapChange,
  className,
}: MapComparisonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn('grid grid-cols-2 gap-4', className)}>
        <div className="aspect-square bg-[var(--muted)] animate-pulse rounded-lg" />
        <div className="aspect-square bg-[var(--muted)] animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      <div className="relative">
        <MapDisplay
          map={leftMap}
          onMapChange={onLeftMapChange}
          className="w-full h-full"
        />
      </div>
      <div className="relative">
        <MapDisplay
          map={rightMap}
          onMapChange={onRightMapChange}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}