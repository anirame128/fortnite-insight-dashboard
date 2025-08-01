/**
 * Utility functions for map code validation and URL handling
 * Used for validating and processing map codes in the application
 */

import { z } from 'zod';

// Map code validation schema
const mapCodeSchema = z.object({
  code: z.string().min(1).max(50).regex(/^[A-Za-z0-9_-]+$/),
  version: z.number().int().min(1).optional(),
  region: z.enum(['us', 'eu', 'asia', 'global']).optional(),
});

// URL parameter validation schema
const urlParamsSchema = z.object({
  map: z.string().optional(),
  mode: z.enum(['view', 'edit', 'share']).optional(),
  theme: z.enum(['light', 'dark', 'auto']).optional(),
});

export type MapCode = z.infer<typeof mapCodeSchema>;
export type UrlParams = z.infer<typeof urlParamsSchema>;

/**
 * Validates a map code string
 * @param code - The map code to validate
 * @returns Validated map code object or null if invalid
 */
export function validateMapCode(code: unknown): MapCode | null {
  try {
    const result = mapCodeSchema.parse({ code });
    return result;
  } catch {
    return null;
  }
}

/**
 * Parses URL parameters for map-related routes
 * @param searchParams - URL search parameters
 * @returns Parsed and validated URL parameters
 */
export function parseUrlParams(searchParams: URLSearchParams): UrlParams {
  const params = Object.fromEntries(searchParams.entries());
  
  try {
    return urlParamsSchema.parse(params);
  } catch {
    return {};
  }
}

/**
 * Creates a shareable URL for a map code
 * @param mapCode - The validated map code
 * @param options - Additional URL options
 * @returns Complete shareable URL
 */
export function createShareableUrl(
  mapCode: MapCode,
  options: {
    mode?: 'view' | 'edit' | 'share';
    theme?: 'light' | 'dark' | 'auto';
    baseUrl?: string;
  } = {}
): string {
  const { mode = 'view', theme = 'auto', baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '' } = options;
  
  const url = new URL(`/map/${mapCode.code}`, baseUrl);
  
  if (mode !== 'view') {
    url.searchParams.set('mode', mode);
  }
  
  if (theme !== 'auto') {
    url.searchParams.set('theme', theme);
  }
  
  if (mapCode.version) {
    url.searchParams.set('v', mapCode.version.toString());
  }
  
  if (mapCode.region && mapCode.region !== 'global') {
    url.searchParams.set('region', mapCode.region);
  }
  
  return url.toString();
}

/**
 * Extracts map code from a URL path
 * @param pathname - The URL pathname
 * @returns Extracted map code or null if not found
 */
export function extractMapCodeFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/map\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Normalizes a map code for consistent storage
 * @param code - Raw map code input
 * @returns Normalized map code
 */
export function normalizeMapCode(code: string): string {
  return code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
}

/**
 * Checks if a map code format is valid without full validation
 * @param code - Map code to check
 * @returns Boolean indicating if format is valid
 */
export function isValidMapCodeFormat(code: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(code) && code.length >= 1 && code.length <= 50;
}

/**
 * Generates a random map code
 * @param length - Length of the generated code (default: 8)
 * @returns Random map code
 */
export function generateRandomMapCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Validates and formats a map code for display
 * @param code - Raw map code
 * @returns Formatted code or error message
 */
export function formatMapCodeForDisplay(code: string): { valid: boolean; formatted: string; error?: string } {
  const normalized = normalizeMapCode(code);
  
  if (!normalized) {
    return { valid: false, formatted: '', error: 'Map code cannot be empty' };
  }
  
  if (!isValidMapCodeFormat(normalized)) {
    return { valid: false, formatted: normalized, error: 'Invalid characters in map code' };
  }
  
  const validated = validateMapCode(normalized);
  if (!validated) {
    return { valid: false, formatted: normalized, error: 'Invalid map code format' };
  }
  
  return { valid: true, formatted: normalized };
}