// src/components/charts/LineChart.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: any;
  options: any;
  showForecasts?: boolean;
  showTrendIndicators?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  options,
  showForecasts = false,
  showTrendIndicators = false,
}) => {
  const [theme, setTheme] = useState('light'); // Safe default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  // Don't render until mounted
  if (!mounted) return <div className="w-6 h-6" />;

  const chartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        ...options.plugins?.legend,
        display: showTrendIndicators,
      },
    },
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset: any) => {
      if (showForecasts) {
        return {
          ...dataset,
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
        };
      }
      return dataset;
    }),
  };

  return (
    <div
      className={`bg-[var(--background)] ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default LineChart;