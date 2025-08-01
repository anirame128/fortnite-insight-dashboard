'use client';

import { redirect } from 'next/navigation';
import CreativeMapsButton from './components/CreativeMapsButton';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <CreativeMapsButton />
      {/* Other components and content */}
    </div>
  );
}