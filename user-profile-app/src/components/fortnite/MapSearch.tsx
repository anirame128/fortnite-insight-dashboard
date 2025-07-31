import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, MapPin, Loader2, AlertCircle } from 'lucide-react';

interface MapResult {
  code: string;
  name: string;
  description: string;
  imageUrl?: string;
  creator: string;
  tags: string[];
}

interface MapSearchProps {
  onMapSelect?: (map: MapResult) => void;
  showManualEntry?: boolean;
}

export function MapSearch({ onMapSelect, showManualEntry = true }: MapSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<MapResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [manualError, setManualError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(searchQuery, 500);

  const searchMaps = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/fortnite/maps/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to search maps');
      }

      const data = await response.json();
      setResults(data.maps || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    searchMaps(debouncedQuery);
  }, [debouncedQuery, searchMaps]);

  const handleManualSubmit = async () => {
    if (!manualCode.trim()) {
      setManualError('Please enter a map code');
      return;
    }

    setManualError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/fortnite/maps/${manualCode}`);
      if (!response.ok) {
        throw new Error('Invalid map code');
      }

      const data = await response.json();
      if (onMapSelect) {
        onMapSelect(data);
      }
    } catch (err) {
      setManualError(err instanceof Error ? err.message : 'Invalid map code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for creative maps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && results.length > 0 && (
          <div className="space-y-3">
            {results.map((map) => (
              <Card
                key={map.code}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => onMapSelect?.(map)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{map.name}</CardTitle>
                  <CardDescription>{map.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-mono">{map.code}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">by {map.creator}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {map.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-secondary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !error && searchQuery && results.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No maps found for "{searchQuery}"
          </p>
        )}
      </div>

      {showManualEntry && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Enter Map Code Manually</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter map code (e.g., 1234-5678-9012)"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="font-mono"
            />
            <Button
              onClick={handleManualSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Load Map'
              )}
            </Button>
          </div>
          {manualError && (
            <p className="text-sm text-destructive mt-2">{manualError}</p>
          )}
        </div>
      )}
    </div>
  );
}