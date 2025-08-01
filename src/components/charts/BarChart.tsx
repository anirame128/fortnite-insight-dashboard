// src/components/charts/BarChart.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchPlayerCounts, fetch24HourPeaks } from '@/api/charts';
import { BarChart as Chart } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { css } from '@emotion/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const router = useRouter();
  const [playerCounts, setPlayerCounts] = useState({});
  const [peaks, setPeaks] = useState({});
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const fetchChartsData = async () => {
      const playerCountsResponse = await fetchPlayerCounts();
      const peaksResponse = await fetch24HourPeaks();
      setPlayerCounts(playerCountsResponse);
      setPeaks(peaksResponse);
    };
    fetchChartsData();
  }, [router.query]);

  if (!mounted) return <div className="w-6 h-6" />;

  const chartData = {
    labels: Object.keys(playerCounts),
    datasets: [
      {
        label: 'Current Player Counts',
        data: Object.values(playerCounts),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '24-Hour Peaks',
        data: Object.values(peaks),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Player Counts and 24-Hour Peaks',
      },
    },
  };

  return (
    <div
      className={`bg-[var(--background)] p-4 rounded-lg shadow-lg ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      <canvas
        id="barChart"
        css={css`
          width: 100%;
          height: 400px;
        `}
      />
      {mounted && (
        <Chart
          type="bar"
          data={chartData}
          options={chartOptions}
          id="barChart"
        />
      )}
    </div>
  );
};

export default BarChart;