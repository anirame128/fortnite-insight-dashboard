'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Comparison {
  id: string;
  name: string;
  items: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseComparisonStorageReturn {
  comparisons: Comparison[];
  isLoading: boolean;
  addComparison: (name: string, items: string[]) => Promise<void>;
  updateComparison: (id: string, updates: Partial<Omit<Comparison, 'id'>>) => Promise<void>;
  deleteComparison: (id: string) => Promise<void>;
  getComparison: (id: string) => Comparison | undefined;
}

const STORAGE_KEY = 'user-comparisons';

export default function useComparisonStorage(): UseComparisonStorageReturn {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadComparisons();
  }, []);

  const loadComparisons = useCallback(async () => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Comparison[];
        setComparisons(parsed);
      }
    } catch (error) {
      console.error('Failed to load comparisons:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveComparisons = useCallback(async (newComparisons: Comparison[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newComparisons));
      setComparisons(newComparisons);
    } catch (error) {
      console.error('Failed to save comparisons:', error);
    }
  }, []);

  const addComparison = useCallback(
    async (name: string, items: string[]) => {
      const newComparison: Comparison = {
        id: crypto.randomUUID(),
        name,
        items,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveComparisons([...comparisons, newComparison]);
    },
    [comparisons, saveComparisons]
  );

  const updateComparison = useCallback(
    async (id: string, updates: Partial<Omit<Comparison, 'id'>>) => {
      const updated = comparisons.map((comparison) =>
        comparison.id === id
          ? { ...comparison, ...updates, updatedAt: new Date().toISOString() }
          : comparison
      );
      await saveComparisons(updated);
    },
    [comparisons, saveComparisons]
  );

  const deleteComparison = useCallback(
    async (id: string) => {
      const filtered = comparisons.filter((comparison) => comparison.id !== id);
      await saveComparisons(filtered);
    },
    [comparisons, saveComparisons]
  );

  const getComparison = useCallback(
    (id: string) => {
      return comparisons.find((comparison) => comparison.id === id);
    },
    [comparisons]
  );

  if (!mounted) {
    return {
      comparisons: [],
      isLoading: true,
      addComparison: async () => {},
      updateComparison: async () => {},
      deleteComparison: async () => {},
      getComparison: () => undefined,
    };
  }

  return {
    comparisons,
    isLoading,
    addComparison,
    updateComparison,
    deleteComparison,
    getComparison,
  };
}