import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { holtWintersForecast } from '@/utils/holtWintersForecast';
import { ChartData, ChartOptions } from 'chart.js';

interface LineChartProps {
  data: number[];
  forecastData?: number[];
}

const LineChart: React.FC<LineChartProps> = ({ data, forecastData }) => {
  const [theme, setTheme] = useState('light'); // Safe default
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: data.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Actual Data',
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  if (forecastData) {
    const forecast = holtWintersForecast(data, forecastData);
    setChartData((prevData) => ({
      ...prevData,
      datasets: [
        ...prevData.datasets,
        {
          label: 'Forecast Data',
          data: forecast,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        },
      ],
    }));
  }

  return (
    <div
      className={`bg-[var(--background)] dark:bg-[var(--background)] ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;