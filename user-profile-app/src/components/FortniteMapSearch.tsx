import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface FortniteMapLocation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  coordinates: {
    x: number;
    y: number;
  };
  type: string;
  rarity: string;
}

interface SearchResponse {
  results: FortniteMapLocation[];
  total: number;
  query: string;
}

interface FortniteMapSearchProps {
  onLocationSelect?: (location: FortniteMapLocation) => void;
  placeholder?: string;
  debounceMs?: number;
}

const FortniteMapSearch: React.FC<FortniteMapSearchProps> = ({
  onLocationSelect,
  placeholder = "Search Fortnite locations...",
  debounceMs = 300
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FortniteMapLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchQuery: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          if (!searchQuery.trim()) {
            setResults([]);
            setHasSearched(false);
            return;
          }

          setLoading(true);
          setError(null);
          setHasSearched(true);

          try {
            const response = await axios.get<SearchResponse>('/api/fortnite', {
              params: { q: searchQuery }
            });
            setResults(response.data.results);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setResults([]);
          } finally {
            setLoading(false);
          }
        }, debounceMs);
      };
    })(),
    [debounceMs]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleLocationClick = (location: FortniteMapLocation) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  return (
    <div className="fortnite-map-search">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
        />
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Searching locations...</span>
        </div>
      )}

      {error && (
        <div className="error-container">
          <span className="error-message">{error}</span>
        </div>
      )}

      {!loading && !error && hasSearched && results.length === 0 && query && (
        <div className="no-results">
          <span>No locations found for "{query}"</span>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="results-grid">
          {results.map((location) => (
            <div
              key={location.id}
              className="location-card"
              onClick={() => handleLocationClick(location)}
            >
              <img
                src={location.imageUrl}
                alt={location.name}
                className="location-image"
              />
              <div className="location-info">
                <h3 className="location-name">{location.name}</h3>
                <p className="location-description">{location.description}</p>
                <div className="location-meta">
                  <span className={`type-badge ${location.type}`}>
                    {location.type}
                  </span>
                  <span className={`rarity-badge ${location.rarity}`}>
                    {location.rarity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FortniteMapSearch;