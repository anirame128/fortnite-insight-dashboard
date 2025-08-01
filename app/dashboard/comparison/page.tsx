import { Metadata } from 'next';
import MapComparison from '@/components/dashboard/MapComparison';

export const metadata: Metadata = {
  title: 'Map Comparison - Dashboard',
  description: 'Compare different map versions and configurations side by side',
};

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <MapComparison />
    </div>
  );
}