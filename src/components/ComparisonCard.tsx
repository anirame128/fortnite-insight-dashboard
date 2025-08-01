'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapCode } from '@/types/map';
import { formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ComparisonCardProps {
  mapCode: MapCode;
  stats: {
    winRate: number;
    pickRate: number;
    avgScore: number;
    trend: 'up' | 'down' | 'stable';
    trendValue: number;
  };
}

export default function ComparisonCard({ mapCode, stats }: ComparisonCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-64 bg-[var(--muted)] rounded-lg animate-pulse" />;
  }

  const TrendIcon = stats.trend === 'up' ? TrendingUp : 
                    stats.trend === 'down' ? TrendingDown : Minus;
  
  const trendColor = stats.trend === 'up' ? 'text-[var(--success)]' :
                    stats.trend === 'down' ? 'text-[var(--destructive)]' : 'text-[var(--muted-foreground)]';

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            {mapCode.name}
          </h3>
          <p className="text-sm text-[var(--muted-foreground)]">
            {mapCode.code}
          </p>
        </div>
        <div className="relative w-16 h-16">
          <Image
            src={`/maps/${mapCode.code.toLowerCase()}.png`}
            alt={mapCode.name}
            fill
            className="object-cover rounded"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--muted-foreground)]">Win Rate</span>
          <span className="font-medium text-[var(--foreground)]">
            {(stats.winRate * 100).toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--muted-foreground)]">Pick Rate</span>
          <span className="font-medium text-[var(--foreground)]">
            {(stats.pickRate * 100).toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--muted-foreground)]">Avg Score</span>
          <span className="font-medium text-[var(--foreground)]">
            {formatNumber(stats.avgScore)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-[var(--border)]">
          <span className="text-sm text-[var(--muted-foreground)]">Trend</span>
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-medium">
              {stats.trendValue > 0 ? '+' : ''}{stats.trendValue}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}