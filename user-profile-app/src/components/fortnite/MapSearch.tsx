import React, { useState, useEffect, useCallback } from 'react';
import { Search, Loader2, AlertCircle, MapPin } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
  };
  type: string;
}

interface MapSearchProps {
  onLocationSelect?: (location: MapLocation) => void;
  placeholder?: string;
}

const MapSearch: React.FC<MapSearchProps> = ({ 
  onLocationSelect,
  placeholder = "Search Fortnite locations..."
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const searchLocations = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://fortnite-api.com/v1/map/search?name=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 200 || !data.data) {
        throw new Error('Invalid response format');
      }

      setResults(Array.isArray(data.data) ? data.data : [data.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search locations');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchLocations(debouncedQuery);
  }, [debouncedQuery, searchLocations]);

  const handleLocationClick = (location: MapLocation) => {
    onLocationSelect?.(location);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
        )}
      </div>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {debouncedQuery && !loading && !error && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
          {results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No locations found for "{debouncedQuery}"
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {results.map((location) => (
                <li key={location.id}>
                  <button
                    type="button"
                    onClick={() => handleLocationClick(location)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">{location.name}</div>
                        <div className="text-sm text-gray-500">{location.description}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Type: {location.type} • Coordinates: ({location.coordinates.x}, {location.coordinates.y})
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MapSearch;