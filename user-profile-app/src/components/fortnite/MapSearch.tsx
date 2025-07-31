import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface FortniteMap {
  name: string;
  code: string;
  description: string;
  creator: string;
  tags: string[];
  maxPlayers: number;
  releaseDate: string;
}

interface MapSearchProps {
  onMapSelect?: (map: FortniteMap) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ onMapSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FortniteMap[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const searchMaps = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<FortniteMap[]>(
          `/api/fortnite/route.ts?q=${encodeURIComponent(searchQuery)}`
        );
        setResults(response.data);
      } catch (err) {
        setError('Failed to fetch maps');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchMaps(query);
  }, [query, searchMaps]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleMapClick = (map: FortniteMap) => {
    if (onMapSelect) {
      onMapSelect(map);
    }
  };

  return (
    <div className="map-search">
      <div className="search-input">
        <input
          type="text"
          placeholder="Search Fortnite maps..."
          value={query}
          onChange={handleInputChange}
          className="search-field"
        />
      </div>

      {loading && <div className="loading">Searching maps...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && results.length > 0 && (
        <div className="results">
          {results.map((map) => (
            <div
              key={map.code}
              className="map-item"
              onClick={() => handleMapClick(map)}
            >
              <h3>{map.name}</h3>
              <p className="code">Code: {map.code}</p>
              <p className="description">{map.description}</p>
              <div className="details">
                <span>Creator: {map.creator}</span>
                <span>Max Players: {map.maxPlayers}</span>
                <span>Released: {new Date(map.releaseDate).toLocaleDateString()}</span>
              </div>
              <div className="tags">
                {map.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && query && results.length === 0 && (
        <div className="no-results">No maps found for "{query}"</div>
      )}
    </div>
  );
};

export default MapSearch;