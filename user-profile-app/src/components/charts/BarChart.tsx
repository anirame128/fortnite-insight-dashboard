import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem
} from 'chart.js'
import { useRef } from 'react'

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: (number | null)[]
      backgroundColor?: string
      borderColor?: string
      borderWidth?: number
      barPercentage?: number
      categoryPercentage?: number
    }[]
  }
  histTimestamps: number[]
  histData: number[]
  forecastData: {
    forecastLabels: string[]
    forecastData: number[]
    forecastTimestamps: number[]
  } | null
  calculatePercentageChange: (current: number, previous: number) => number
  determineTrend: (current: number, previous: number) => string
  calculateMovingAverage: (data: number[], index: number, window?: number) => number
  formatPercentage: (value: number) => string
}

export function BarChart({
  data,
  histTimestamps,
  histData,
  forecastData,
  calculatePercentageChange,
  determineTrend,
  calculateMovingAverage,
  formatPercentage
}: BarChartProps) {
  const chartRef = useRef<ChartJS<'bar'>>(null)

  const tooltipCallbacks = {
    title: (ctx: TooltipItem<'bar'>[]) => {
      const idx = ctx[0].dataIndex
      const date = new Date([...histTimestamps, ...(forecastData?.forecastTimestamps || [])][idx])
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    },
    label: (ctx: TooltipItem<'bar'>) => {
      const idx = ctx.dataIndex
      const value = ctx.raw as number | null
      const dataset = ctx.dataset.label
      
      if (value === null) return undefined

      if (dataset === 'Forecast') {
        return `Forecast: ${value.toLocaleString()} players`
      }

      const prevValue = idx > 0 ? histData[idx - 1] : null
      const pctChange = prevValue ? calculatePercentageChange(value, prevValue) : 0
      const trend = prevValue ? determineTrend(value, prevValue) : ''
      const movingAvg = calculateMovingAverage(histData, idx)
      
      return [
        `${dataset}: ${value.toLocaleString()} players`,
        `Change: ${trend} ${formatPercentage(pctChange)}`,
        `7-day Avg: ${Math.round(movingAvg).toLocaleString()} players`
      ]
    }
  }

  return (
    <Bar
      ref={chartRef}
      data={data}
      options={{
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        layout: {
          padding: { top: 10, right: 10, bottom: 10, left: 10 }
        },
        scales: {
          x: {
            title: { display: true, text: 'Date', color: '#fff', font: { size: 12 } },
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { 
              color: 'rgba(255,255,255,0.7)',
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            title: { display: true, text: 'Peak Players', color: '#fff', font: { size: 12 } },
            beginAtZero: true,
            grid: { color: 'rgba(255,255,255,0.1)' },
            ticks: { color: 'rgba(255,255,255,0.7)' }
          }
        },
        plugins: {
          legend: { 
            labels: { 
              color: '#fff',
              usePointStyle: true,
              pointStyle: 'circle'
            } 
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 12,
            callbacks: tooltipCallbacks
          }
        }
      }}
    />
  )
} 