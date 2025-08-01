// user-profile-app/src/components/charts/BarChart.tsx
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
import { useRouter } from 'next/router';
import { fetchDailyGainLoss, fetchHistoricalData } from '@/lib/api';
import { useTheme } from '@/lib/hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [dailyGainLoss, setDailyGainLoss] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchDailyData = async () => {
      const data = await fetchDailyGainLoss();
      setDailyGainLoss(data);
    };
    const fetchHistorical = async () => {
      const data = await fetchHistoricalData();
      setHistoricalData(data);
    };
    fetchDailyData();
    fetchHistorical();
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const data = {
    labels: dailyGainLoss.map((item) => item.date),
    datasets: [
      {
        label: 'Daily Gain/Loss',
        data: dailyGainLoss.map((item) => item.percentage),
        borderColor: theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      },
      {
        label: 'Historical Data',
        data: historicalData.map((item) => item.percentage),
        borderColor: theme === 'dark' ? 'rgb(255, 0, 0)' : 'rgb(0, 0, 255)',
        backgroundColor: theme === 'dark' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-[var(--background)] p-4 rounded-lg shadow-lg">
      <Line options={options} data={data} />
    </div>
  );
};

export default BarChart;