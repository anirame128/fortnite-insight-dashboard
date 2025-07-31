import { useState } from 'react';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement search logic here
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
          className="w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-b focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        >
          Search
        </button>
      </form>
      <BarChart />
      <LineChart />
    </div>
  );
}