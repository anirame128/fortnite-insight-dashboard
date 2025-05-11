'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState, useMemo, useEffect } from 'react'
import { Search, Loader2, BarChart3, BarChart2, ChevronDown } from 'lucide-react'
import { holtWintersForecast } from '@/utils/forecast'
import { toast } from 'react-hot-toast'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { ScriptableContext } from 'chart.js'

// Helper function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number): number => {
  if (!previous) return 0
  return ((current - previous) / previous) * 100
}

// Helper function to format percentage
const formatPercentage = (value: number): string => {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

// Helper function to calculate moving average
const calculateMovingAverage = (data: number[], index: number, window: number = 7): number => {
  const start = Math.max(0, index - window + 1)
  const values = data.slice(start, index + 1)
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

// Helper function to determine trend
const determineTrend = (current: number, previous: number): string => {
  const change = current - previous
  if (change > 0) return '↑'
  if (change < 0) return '↓'
  return '→'
}

const montserrat = Montserrat({
  subsets: ['latin'],
  weight:  ['400','700'],
  variable:'--font-sans',
  display: 'swap'
})

const fadeInUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface StatsResponse {
  currentPlayers: number
  labels: string[]        // newest→oldest
  dailyHistory: number[]  // newest→oldest
  timestamps: number[]    // ms of each sample
  error?: string
}

export default function FortniteStatsPage() {
  const [code,    setCode]  = useState('')
  const [stats,   setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError] = useState<string | null>(null)
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Load saved map code on component mount
  useEffect(() => {
    const savedCode = localStorage.getItem('fortniteMapCode')
    if (savedCode) {
      setCode(savedCode)
      // Automatically fetch stats if we have a saved code
      fetchStatsWithCode(savedCode)
    }
  }, [])

  const fetchStatsWithCode = async (mapCode: string) => {
    setError(null)
    setStats(null)
    setLoading(true)
    
    // Validate map code format
    if (!/^\d{4}-\d{4}-\d{4}$/.test(mapCode)) {
      toast.error('Invalid map code format. Use XXXX-XXXX-XXXX')
      setLoading(false)
      return
    }

    try {
      const res  = await fetch(`/api/fortnite?code=${encodeURIComponent(mapCode)}`)
      const json = (await res.json()) as StatsResponse
      if (!res.ok || json.error) {
        throw new Error(json.error || `HTTP ${res.status}`)
      }
      setStats(json)
      toast.success('Stats loaded successfully!')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save the code to localStorage
    localStorage.setItem('fortniteMapCode', code)
    await fetchStatsWithCode(code)
  }

  // Prepare historical and forecast data
  const histLabels = useMemo(
    () => stats ? stats.labels.map(l => l.split(', ')[1] || l) : [],
    [stats]
  )
  const histData = useMemo(
    () => stats ? stats.dailyHistory : [],
    [stats]
  )
  const histTimestamps = useMemo(
    () => stats ? stats.timestamps : [],
    [stats]
  )

  // Generate forecast data
  const forecastData = useMemo(() => {
    if (!stats) return null
    return holtWintersForecast(stats.dailyHistory, stats.timestamps)
  }, [stats])

  // Prepare data for both chart types
  const chartData = useMemo(() => {
    if (!stats || !forecastData) return {
      labels: [],
      datasets: []
    }

    const labels = [...histLabels, ...forecastData.forecastLabels]
    const historicalData = histData
    const forecastDataPoints = [...Array(histData.length - 1).fill(null), histData[histData.length - 1], ...forecastData.forecastData.slice(1)]

    return {
      labels,
      datasets: [
        {
          label: 'Peak Players',
          data: historicalData,
          tension: 0.3,
          fill: 'start',
          backgroundColor: 'rgba(255,255,255,0.05)',
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHitRadius: 30,
          spanGaps: true,
          borderWidth: 3,
          borderColor: (ctx: ScriptableContext<'line'>) => {
            const chart = ctx.chart
            const {ctx: canvas, chartArea} = chart
            if (!chartArea) return '#a78bfa'
            const gradient = canvas.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
            gradient.addColorStop(0, '#4f46e5')
            gradient.addColorStop(1, '#a21caf')
            return gradient
          }
        },
        {
          label: 'Forecast',
          data: forecastDataPoints,
          tension: 0.3,
          borderDash: [5, 5],
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.5)',
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHitRadius: 30,
          spanGaps: true
        }
      ]
    }
  }, [stats, histLabels, histData, forecastData])

  // Prepare bar chart data
  const barChartData = useMemo(() => {
    if (!stats || !forecastData) return {
      labels: [],
      datasets: []
    }

    const labels = [...histLabels, ...forecastData.forecastLabels]
    const historicalData = histData
    const forecastDataPoints = [...Array(histData.length - 1).fill(null), histData[histData.length - 1], ...forecastData.forecastData.slice(1)]

    return {
      labels,
      datasets: [
        {
          label: 'Peak Players',
          data: historicalData,
          backgroundColor: 'rgba(79, 70, 229, 0.6)',
          borderColor: 'rgba(79, 70, 229, 1)',
          borderWidth: 1,
          barPercentage: 0.8,
          categoryPercentage: 0.9
        },
        {
          label: 'Forecast',
          data: forecastDataPoints,
          backgroundColor: 'rgba(162, 28, 175, 0.6)',
          borderColor: 'rgba(162, 28, 175, 1)',
          borderWidth: 1,
          barPercentage: 0.8,
          categoryPercentage: 0.9
        }
      ]
    }
  }, [stats, histLabels, histData, forecastData])

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
          disabled={loading}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={!code || loading}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 rounded-r-lg text-white font-semibold shadow
                     hover:from-indigo-500 hover:to-purple-500 transition disabled:opacity-50 flex items-center justify-center"
        >
          {loading
            ? <Loader2 className="animate-spin h-5 w-5"/>
            : 'Fetch'
          }
        </button>
      </motion.form>

      {/* Error */}
      {error && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.3 }}
          className="max-w-lg mx-auto bg-red-800 text-red-200 p-4 rounded-lg border border-red-700 flex items-center"
        >
          {error}
        </motion.div>
      )}

      {/* Chart Type Selector */}
      {stats && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto flex justify-center"
        >
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 transition flex items-center gap-2"
            >
              {chartType === 'line' ? (
                <>
                  <BarChart3 className="inline-block" />
                  Line Chart
                </>
              ) : (
                <>
                  <BarChart2 className="inline-block" />
                  Bar Chart
                </>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-10">
                <button
                  onClick={() => {
                    setChartType('line')
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center gap-2 ${
                    chartType === 'line' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <BarChart3 className="inline-block" />
                  Line Chart
                </button>
                <button
                  onClick={() => {
                    setChartType('bar')
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center gap-2 ${
                    chartType === 'bar' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <BarChart2 className="inline-block" />
                  Bar Chart
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Chart */}
      <div className="space-y-10 w-full max-w-4xl mx-auto my-8">
        {/* Current Players */}
        {stats && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.4 }}
            className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-700 shadow-lg text-center"
          >
            <h3 className="text-lg font-semibold text-gray-200">
              Players Right Now
            </h3>
            <p className="text-4xl font-bold text-white mt-2 drop-shadow-md">
              {stats.currentPlayers.toLocaleString()}
            </p>
          </motion.div>
        )}

        {/* Dynamic Chart */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="p-8 bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl"
        >
          <h4 className="text-xl font-semibold text-gray-200 mb-6">
            Last 30 Days & Forecast
          </h4>
          <div className="relative h-72 sm:h-96">
            {(!code && !stats) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <BarChart3 className="h-12 w-12 mb-3 text-indigo-400" />
                <span className="text-lg font-semibold text-gray-400">Enter a map code to see stats</span>
              </div>
            ) : loading || !stats ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-gray-500"/>
              </div>
            ) : (
              chartType === 'line' ? (
                <LineChart
                  data={chartData}
                  histTimestamps={histTimestamps}
                  histData={histData}
                  forecastData={forecastData}
                  calculatePercentageChange={calculatePercentageChange}
                  determineTrend={determineTrend}
                  calculateMovingAverage={calculateMovingAverage}
                  formatPercentage={formatPercentage}
                />
              ) : (
                <BarChart
                  data={barChartData}
                  histTimestamps={histTimestamps}
                  histData={histData}
                  forecastData={forecastData}
                  calculatePercentageChange={calculatePercentageChange}
                  determineTrend={determineTrend}
                  calculateMovingAverage={calculateMovingAverage}
                  formatPercentage={formatPercentage}
                />
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
