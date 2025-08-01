import React from 'react';
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
  historicalData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  map1Data: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  };
  map2Data: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  };
}

const LineChart: React.FC<LineChartProps> = ({
  historicalData,
  map1Data,
  map2Data,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Historical Data',
      },
    },
  };

  const data = {
    labels: historicalData.labels,
    datasets: [
      {
        ...map1Data,
        label: `${map1Data.label} Map 1`,
      },
      {
        ...map2Data,
        label: `${map2Data.label} Map 2`,
      },
      ...historicalData.datasets,
    ],
  };

  return (
    <div className="w-full h-96 bg-[var(--background)]">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;