import { useState } from 'react';
import { BarChart, LineChart } from '@/components/charts';
import HomeContent from '@/components/HomeContent';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4">
      <HomeContent 
        search_input={
          <input 
            type="search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search..." 
            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" 
          />
        }
        button={
          <button 
            className="ml-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg" 
            onClick={() => console.log('Search clicked')}
          >
            Search
          </button>
        }
      />
      <BarChart />
      <LineChart />
    </div>
  );
}