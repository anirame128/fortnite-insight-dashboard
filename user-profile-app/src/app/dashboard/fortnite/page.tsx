'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState, useMemo, useEffect } from 'react'
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
import { Search } from 'lucide-react'
import { holtWinters } from '@/utils/holtwinters'

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-sans',
  display: 'swap'
})

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface StatsResponse {
  currentPlayers: number
  labels: string[]       // newest→oldest from API
  dailyHistory: number[] // newest→oldest
  error?: string
}

export default function FortniteStatsPage() {
  const [code, setCode]       = useState('')
  const [stats, setStats]     = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string|null>(null)
  const [failCount, setFailCount] = useState(0)
  const [cooldown, setCooldown]   = useState(0)


  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(c => {
        if (c <= 1) {
          clearInterval(timer)
          setFailCount(0)   // reset after cooldown
          return 0
        }
        return c - 1
      }), 1000)
      return () => clearInterval(timer)
    }
  }, [cooldown])

  const fetchStats = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cooldown > 0) return                    // blocked by cooldown
    setError(null)
    setStats(null)
    setLoading(true)

    try {
      const res  = await fetch(`/api/fortnite?code=${encodeURIComponent(code)}`)
      const json = await res.json() as StatsResponse

      if (!res.ok || json.error) {
        throw new Error(json.error || `HTTP ${res.status}`)
      }
      setStats(json)
    } catch (err: any) {
      setFailCount(f => f + 1)
      if (failCount + 1 >= 3) {
        // after 3 quick fails, start a 30s cooldown
        setError('Multiple failed attempts. Please wait 30 s before retrying.')
        setCooldown(30)
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  // Prepare historical data
  const histLabels = useMemo(
    () => stats
      ? [...stats.labels].reverse().map(l => l.split(', ')[1] || l)
      : [],
    [stats]
  )
  const histData = useMemo(
    () => stats ? [...stats.dailyHistory].reverse() : [],
    [stats]
  )

  // Forecast
  const { fitted, forecast } = useMemo(
    () => holtWinters(histData, 7, 0.2, 0.1, 0.05, 30),
    [histData]
  )
  const lastDate = histLabels.length
    ? new Date(histLabels[histLabels.length - 1])
    : new Date()
  const forecastLabels = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(lastDate)
      d.setDate(d.getDate() + i + 1)
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    })
  }, [lastDate])

  const combinedLabels = [...histLabels, ...forecastLabels]
  const combinedData   = [...fitted, ...forecast]
  const histLen        = fitted.length

  return (
    <div className={`${montserrat.variable} font-sans p-6 space-y-8`}>
      {/* Search Form */}
      <motion.form
        onSubmit={fetchStats}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4 }}
        className="relative max-w-lg mx-auto flex"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Map code e.g. 6155-1398-4059"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={!code || loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 rounded-r-lg text-white font-semibold shadow hover:from-indigo-500 hover:to-purple-500 transition disabled:opacity-50"
        >
          {loading ? 'Loading…' : 'Fetch'}
        </button>
      </motion.form>

      {/* Error Message */}
      {error && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto bg-red-800 text-red-200 p-4 rounded-lg border border-red-700"
        >
          {error}
        </motion.div>
      )}

      {/* Stats Display */}
      {stats && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Current Players */}
          <div className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-200">Players Right Now</h3>
            <p className="text-4xl font-bold text-white mt-2 drop-shadow-md">
              {stats.currentPlayers.toLocaleString()}
            </p>
          </div>

          {/* Chart Card */}
          <div className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg">
            <h4 className="text-lg font-medium text-gray-200 mb-4">
              Last 30 Days & Next 30-Day Forecast
            </h4>
            <div className="h-64">
              <Line
                data={{
                  labels: combinedLabels,
                  datasets: [
                    {
                      label: 'Peak Players',
                      data: combinedData,
                      tension: 0.4,
                      fill: false,
                      pointRadius: 2,
                      spanGaps: true,
                      segment: {
                        borderColor: ctx =>
                          ctx.p0DataIndex < histLen - 1
                            ? '#fff'
                            : 'rgba(255,255,255,0.5)',
                        borderDash: ctx =>
                          ctx.p0DataIndex < histLen - 1 ? [] : [5, 5]
                      }
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid:  { color: 'rgba(255,255,255,0.1)' },
                      ticks: { color: 'rgba(255,255,255,0.7)' }
                    },
                    y: {
                      beginAtZero: true,
                      grid:        { color: 'rgba(255,255,255,0.1)' },
                      ticks:       { color: 'rgba(255,255,255,0.7)' }
                    }
                  },
                  plugins: {
                    legend:  { labels: { color: '#fff' } },
                    tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      titleColor:      '#fff',
                      bodyColor:       '#fff',
                      borderColor:     'rgba(255,255,255,0.1)',
                      borderWidth:     1
                    }
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}