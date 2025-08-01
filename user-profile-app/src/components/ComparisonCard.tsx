'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ComparisonData {
  label: string
  value: number
}

interface ComparisonCardProps {
  title: string
  description?: string
  data: ComparisonData[]
  color?: string
  unit?: string
}

export default function ComparisonCard({
  title,
  description,
  data,
  color = '#3b82f6',
  unit = ''
}: ComparisonCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 animate-pulse">
        <div className="h-6 w-32 rounded bg-[var(--muted)] mb-2" />
        <div className="h-4 w-48 rounded bg-[var(--muted)] mb-4" />
        <div className="h-64 w-full rounded bg-[var(--muted)]" />
      </div>
    )
  }

  const formatValue = (value: number) => `${value}${unit}`

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--foreground)]">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{description}</p>
        )}
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border)"
              opacity={0.5}
            />
            <XAxis 
              dataKey="label" 
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
              tickFormatter={formatValue}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
              itemStyle={{ color: 'var(--foreground)' }}
              formatter={(value: number) => [formatValue(value), '']}
            />
            <Bar 
              dataKey="value" 
              fill={color}
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}