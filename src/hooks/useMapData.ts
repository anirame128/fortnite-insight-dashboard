'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface MapData {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  layers: Array<{
    id: string;
    type: 'tile' | 'vector' | 'geojson';
    url?: string;
    data?: any;
    style?: Record<string, any>;
  }>;
  lastModified: string;
}

interface UseMapDataOptions {
  mapId?: string;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

const MAP_DATA_CACHE_KEY = 'map-data-cache';
const MAP_DATA_STORAGE_KEY = 'map-data-storage';

// SSR-safe localStorage access
const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setLocalStorageItem = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in SSR
  }
};

async function fetchMapData(mapId: string): Promise<MapData> {
  const response = await fetch(`/api/maps/${mapId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch map data: ${response.statusText}`);
  }
  return response.json();
}

export function useMapData({ mapId, enabled = true, staleTime = 5 * 60 * 1000, cacheTime = 10 * 60 * 1000 }: UseMapDataOptions = {}) {
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [localCache, setLocalCache] = useState<Record<string, MapData>>({});

  // Ensure client-side only operations
  useEffect(() => {
    setMounted(true);
    const cached = getLocalStorageItem<Record<string, MapData>>(MAP_DATA_STORAGE_KEY, {});
    setLocalCache(cached);
  }, []);

  const queryKey = ['map-data', mapId];

  const query = useQuery({
    queryKey,
    queryFn: () => mapId ? fetchMapData(mapId) : Promise.reject(new Error('No map ID provided')),
    enabled: enabled && !!mapId && mounted,
    staleTime,
    cacheTime,
    initialData: () => {
      if (!mounted || !mapId) return undefined;
      return localCache[mapId];
    },
  });

  // Update local storage when data changes
  useEffect(() => {
    if (!mounted || !query.data || !mapId) return;

    const newCache = {
      ...localCache,
      [mapId]: query.data,
    };

    setLocalCache(newCache);
    setLocalStorageItem(MAP_DATA_STORAGE_KEY, newCache);
  }, [query.data, mapId, mounted, localCache]);

  const invalidateMapData = useCallback(() => {
    if (mapId) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [queryClient, queryKey, mapId]);

  const prefetchMapData = useCallback(async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['map-data', id],
      queryFn: () => fetchMapData(id),
      staleTime,
      cacheTime,
    });
  }, [queryClient, staleTime, cacheTime]);

  const getCachedMapData = useCallback((id: string) => {
    if (!mounted) return undefined;
    return localCache[id] || queryClient.getQueryData(['map-data', id]);
  }, [mounted, localCache, queryClient]);

  return {
    mapData: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    invalidateMapData,
    prefetchMapData,
    getCachedMapData,
  };
}