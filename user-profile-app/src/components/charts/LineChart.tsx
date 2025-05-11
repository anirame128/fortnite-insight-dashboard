import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Plugin,
  TooltipItem,
  ScriptableContext
} from 'chart.js'
import { useRef } from 'react'

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Custom plugin: vertical crosshair line
const Crosshair: Plugin<'line'> = {
  id: 'crosshair',
  afterDraw: (chart) => {
    const {ctx, tooltip} = chart
    if (!tooltip || !tooltip.getActiveElements().length) return
    const x = tooltip.getActiveElements()[0].element.x
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x, chart.chartArea.top)
    ctx.lineTo(x, chart.chartArea.bottom)
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'
    ctx.stroke()
    ctx.restore()
  }
}

interface LineChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: (number | null)[]
      tension?: number
      fill?: string | boolean
      backgroundColor?: string
      pointRadius?: number
      pointHoverRadius?: number
      pointHitRadius?: number
      spanGaps?: boolean
      borderWidth?: number
      borderColor?: string | ((ctx: ScriptableContext<'line'>) => string | CanvasGradient)
      borderDash?: number[]
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

export function LineChart({
  data,
  histTimestamps,
  histData,
  forecastData,
  calculatePercentageChange,
  determineTrend,
  calculateMovingAverage,
  formatPercentage
}: LineChartProps) {
  const chartRef = useRef<ChartJS<'line'>>(null)

  const tooltipCallbacks = {
    title: (ctx: TooltipItem<'line'>[]) => {
      const idx = ctx[0].dataIndex
      const date = new Date([...histTimestamps, ...(forecastData?.forecastTimestamps || [])][idx])
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    },
    label: (ctx: TooltipItem<'line'>) => {
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
    <Line
      ref={chartRef}
      plugins={[Crosshair]}
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
            ticks: { color: 'rgba(255,255,255,0.7)' }
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