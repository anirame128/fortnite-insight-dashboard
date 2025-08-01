import { Suspense } from 'react';
import { ComparisonView } from '@/components/dashboard/comparison/comparison-view';
import { ComparisonSkeleton } from '@/components/dashboard/comparison/comparison-skeleton';
import { getComparisonData } from '@/lib/api/comparison';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Comparison Dashboard',
  description: 'Compare and analyze your data side by side',
};

export default async function ComparisonPage() {
  const supabase = createClient();
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch comparison data
  const comparisonData = await getComparisonData(user.id);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Comparison Dashboard
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Analyze and compare your data across different time periods and metrics
          </p>
        </div>

        <Suspense fallback={<ComparisonSkeleton />}>
          <ComparisonView 
            initialData={comparisonData}
            userId={user.id}
          />
        </Suspense>
      </div>
    </div>
  );
}