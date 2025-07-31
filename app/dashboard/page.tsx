import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeContent from '../components/HomeContent';

export default function DashboardPage() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        try {
          const response = await fetch(`/api/fortnite?search=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <HomeContent
        search_input={
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for Fortnite maps"
          />
        }
        button={
          <button onClick={() => handleSearch(searchQuery)}>Search</button>
        }
        form={
          <form>
            <label>Search for Fortnite maps:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        }
      />
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.code}>{result.code}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}