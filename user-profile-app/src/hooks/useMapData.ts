'use client';

import { useState, useEffect, useCallback } from 'react';

interface MapData {
  id: string;
  name: string;
  coordinates: [number, number];
  description?: string;
  metadata?: Record<string, unknown>;
}

interface UseMapDataOptions {
  refreshInterval?: number;
  retryCount?: number;
  retryDelay?: number;
}

interface UseMapDataReturn {
  data: MapData[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  invalidate: () => void;
}

export default function useMapData(
  endpoint: string,
  options: UseMapDataOptions = {}
): UseMapDataReturn {
  const {
    refreshInterval = 0,
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState<MapData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!Array.isArray(result)) {
        throw new Error('Invalid response format: expected array');
      }

      // Validate each item has required fields
      const validatedData = result.map((item: unknown): MapData => {
        if (
          typeof item === 'object' &&
          item !== null &&
          'id' in item &&
          'name' in item &&
          'coordinates' in item
        ) {
          return item as MapData;
        }
        throw new Error('Invalid map data format');
      });

      setData(validatedData);
      setRetryAttempt(0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      
      if (retryAttempt < retryCount) {
        setTimeout(() => {
          setRetryAttempt(prev => prev + 1);
          fetchData();
        }, retryDelay * Math.pow(2, retryAttempt));
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, retryAttempt, retryCount, retryDelay]);

  const refetch = useCallback(async () => {
    setRetryAttempt(0);
    await fetchData();
  }, [fetchData]);

  const invalidate = useCallback(() => {
    setData(null);
    setError(null);
    setRetryAttempt(0);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    refetch,
    invalidate,
  };
}