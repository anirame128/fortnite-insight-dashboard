```tsx
import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MapLocation {
  id: string;
  name: string;
  location: {
    x: number;
    y: number;
    z?: number;
  };
  type: string;
  description?: string;
}

interface MapSearchProps {
  onLocationSelect?: (location: MapLocation) => void;
  placeholder?: string;
  className?: string;
}

export function MapSearch({
  onLocationSelect,
  placeholder = 'Search Fortnite locations...',
  className,
}: MapSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MapLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Debounced search
  const debouncedQuery = useDebounce(query, 300);

  const searchLocations = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/fortnite/search?query=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error('Failed to search locations');
      }

      const data = await response.json();
      setResults(data.results || []);
      setShowResults(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    searchLocations(debouncedQuery);
  }, [debouncedQuery, searchLocations]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocations(query);
  };

  const handleLocationClick = (location: MapLocation) => {
    onLocationSelect?.(location);
    setShowResults(false);
    setQuery(location.name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setShowResults(false);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pl-10 pr-4"
            aria-label="Search locations"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Search'
          )}
        </Button>
      </form>

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {!isLoading && !error && results.length === 0 && query && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No locations found
            </div>
          )}

          {!isLoading && !error && results.length > 0 && (
            <ul className="divide-y">
              {results.map((location) => (
                <li key={location.id}>
                  <button
                    type="button"
                    className="w-full px-4 py-3 text-left hover:bg-accent transition-colors"
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {location.type}
                          {location.description && (
                            <span className="ml-2">{location.description}</span>
                          )}
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
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```