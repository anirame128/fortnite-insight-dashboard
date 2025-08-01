import { useState, useEffect } from 'react';
import { BarChart as Chart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { classNames } from '@/utils/classNames';
import { useTheme } from '@/hooks/useTheme';
import { getDailyGainLossPercentages, getTrendIndicators } from '@/api/charts';

interface BarChartProps {
  data: any[];
}

const BarChart = ({ data }: BarChartProps) => {
  const [theme, setTheme] = useState('light'); // Safe default
  const [mounted, setMounted] = useState(false);
  const [dailyGainLossPercentages, setDailyGainLossPercentages] = useState([]);
  const [trendIndicators, setTrendIndicators] = useState([]);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
    getDailyGainLossPercentages().then((percentages) => setDailyGainLossPercentages(percentages));
    getTrendIndicators().then((indicators) => setTrendIndicators(indicators));
  }, []);

  if (!mounted) return <div className="w-6 h-6" />;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={classNames('bg-[var(--background)] p-2 text-[var(--foreground)]', 'rounded')}>
          <p className="text-sm">{label}</p>
          <p className="text-sm">{payload[0].value}%</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classNames('bg-[var(--background)] p-4', 'rounded', 'dark:shadow-md')}>
      <Chart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
        {dailyGainLossPercentages.map((percentage, index) => (
          <Bar key={index} dataKey={`percentage${index}`} fill="#82ca9d" />
        ))}
        {trendIndicators.map((indicator, index) => (
          <Bar key={index} dataKey={`indicator${index}`} fill="#ffc107" />
        ))}
      </Chart>
      <div className="mt-4">
        {dailyGainLossPercentages.map((percentage, index) => (
          <p key={index} className={classNames('text-sm', 'text-[var(--foreground)]')}>
            Daily Gain/Loss Percentage {index + 1}: {percentage}%
          </p>
        ))}
        {trendIndicators.map((indicator, index) => (
          <p key={index} className={classNames('text-sm', 'text-[var(--foreground)]')}>
            Trend Indicator {index + 1}: {indicator}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BarChart;