'use client'

import { useState, useEffect } from 'react'

export default function LoadingSkeleton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="w-full h-screen" />
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header Skeleton */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-[var(--skeleton-bg)] animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-48 bg-[var(--skeleton-bg)] rounded animate-pulse" />
          <div className="h-4 w-32 bg-[var(--skeleton-bg)] rounded animate-pulse" />
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-[var(--skeleton-bg)]/50 animate-pulse">
            <div className="h-4 w-16 bg-[var(--skeleton-bg)] rounded mb-2" />
            <div className="h-6 w-12 bg-[var(--skeleton-bg)] rounded" />
          </div>
        ))}
      </div>

      {/* Bio Section Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-[var(--skeleton-bg)] rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-[var(--skeleton-bg)] rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-[var(--skeleton-bg)] rounded animate-pulse" />
      </div>

      {/* Posts Section Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-24 bg-[var(--skeleton-bg)] rounded animate-pulse" />
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-[var(--skeleton-bg)]/50 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-[var(--skeleton-bg)]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-[var(--skeleton-bg)] rounded" />
                  <div className="h-3 w-24 bg-[var(--skeleton-bg)] rounded" />
                  <div className="space-y-1 pt-2">
                    <div className="h-3 w-full bg-[var(--skeleton-bg)] rounded" />
                    <div className="h-3 w-5/6 bg-[var(--skeleton-bg)] rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        :root {
          --skeleton-bg: #e5e7eb;
        }
        .dark {
          --skeleton-bg: #374151;
        }
      `}</style>
    </div>
  )
}