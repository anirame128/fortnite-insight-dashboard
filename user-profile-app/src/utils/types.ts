### `user-profile-app/src/utils/types.ts`

// Define interfaces for comparison data
export interface ComparisonData {
  id: string;
  name: string;
  value: number;
  unit: string;
}

export interface ComparisonItem {
  label: string;
  data: ComparisonData[];
}

export interface ComparisonResult {
  items: ComparisonItem[];
  total: number;
}

This code defines three interfaces: `ComparisonData`, `ComparisonItem`, and `ComparisonResult`. These interfaces provide a structure for comparison data, ensuring proper type management and code readability.

*   `ComparisonData` represents a single data point with an `id`, `name`, `value`, and `unit`.
*   `ComparisonItem` represents a group of comparison data with a `label` and an array of `ComparisonData` objects.
*   `ComparisonResult` represents the result of a comparison with an array of `ComparisonItem` objects and a `total` value.

These interfaces can be used throughout the application to ensure consistency and type safety when working with comparison data.

### Example Usage

// Import the interfaces
import { ComparisonData, ComparisonItem, ComparisonResult } from '@/utils/types';

// Create a sample comparison data object
const comparisonData: ComparisonData = {
  id: '1',
  name: 'Sample Data',
  value: 10,
  unit: 'kg',
};

// Create a sample comparison item object
const comparisonItem: ComparisonItem = {
  label: 'Sample Item',
  data: [comparisonData],
};

// Create a sample comparison result object
const comparisonResult: ComparisonResult = {
  items: [comparisonItem],
  total: 20,
};

This example demonstrates how to create objects that conform to the defined interfaces, ensuring type safety and consistency throughout the application.