// src/app/dashboard/fortnite/page.tsx
'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface StatsResponse {
  currentPlayers: number
  dailyHistory: number[]
  error?: string
}

export default function FortniteStats() {
  const [code, setCode] = useState('')
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setStats(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/fortnite?code=${encodeURIComponent(code)}`)
      const json = (await res.json()) as StatsResponse
      if (!res.ok || json.error) {
        throw new Error(json.error || `HTTP ${res.status}`)
      }
      setStats(json)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // build labels like ["30d ago", "29d ago", …, "1d ago"]
  const labels = stats
    ? stats.dailyHistory.map((_, i) => `${stats.dailyHistory.length - i}d ago`)
    : []

  return (
    <div className="space-y-6">
      <form onSubmit={fetchStats} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter map code (e.g. 6155-1398-4059)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition"
        />
        <button
          type="submit"
          disabled={!code || loading}
          className="bg-white text-black px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? 'Loading…' : 'Fetch Stats'}
        </button>
      </form>

      {error && (
        <div className="bg-red-900/80 p-4 text-red-200 rounded-lg border border-red-700">
          Error: {error}
        </div>
      )}

      {stats && (
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 space-y-6">
          {/* Players Right Now */}
          <div>
            <h3 className="text-xl font-semibold text-white/90">
              Players Right Now
            </h3>
            <p className="text-3xl font-bold mt-2">
              {stats.currentPlayers.toLocaleString()}
            </p>
          </div>

          {/* 30-day Peak History Chart */}
          <div>
            <h4 className="text-lg font-medium text-white/80 mb-2">
              Last 30 Days: Peak Player Counts
            </h4>
            <div className="h-64">
              <Line
                data={{
                  labels,
                  datasets: [
                    {
                      label: 'Peak Players',
                      data: stats.dailyHistory,
                      tension: 0.4,
                      fill: true,
                      borderColor: 'rgba(99, 210, 255, 0.8)',
                      backgroundColor: 'rgba(99, 210, 255, 0.3)',
                      pointRadius: 3
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: { color: 'rgba(255,255,255,0.1)' },
                      ticks: { color: 'rgba(255,255,255,0.7)' }
                    },
                    y: {
                      beginAtZero: true,
                      grid: { color: 'rgba(255,255,255,0.1)' },
                      ticks: { color: 'rgba(255,255,255,0.7)' }
                    }
                  },
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      titleColor: '#fff',
                      bodyColor: '#fff',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderWidth: 1
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
