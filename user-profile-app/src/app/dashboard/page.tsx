import { useState } from 'react';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full p-2 pl-10 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-b focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      {/ Rest of the dashboard content /}
    </div>
  );
}