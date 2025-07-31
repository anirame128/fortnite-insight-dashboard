import { useState } from 'react';
import DashboardClient from './DashboardClient';
import SearchBar from '../components/SearchBar';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <DashboardClient searchQuery={searchQuery} />
    </div>
  );
}