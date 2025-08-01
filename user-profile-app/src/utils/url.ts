import { ReadonlyURLSearchParams } from 'next/navigation'

export type UrlParams = Record<string, string | number | boolean | null | undefined>

/**
 * Safely parses URL search parameters into an object
 * @param searchParams - URL search parameters from Next.js
 * @returns Object with parsed parameters
 */
export function parseUrlParams(searchParams: ReadonlyURLSearchParams | null): UrlParams {
  const params: UrlParams = {}
  
  if (!searchParams) return params
  
  searchParams.forEach((value, key) => {
    // Handle boolean values
    if (value === 'true') {
      params[key] = true
    } else if (value === 'false') {
      params[key] = false
    }
    // Handle numeric values
    else if (!isNaN(Number(value)) && value !== '') {
      params[key] = Number(value)
    }
    // Handle empty strings as null
    else if (value === '') {
      params[key] = null
    }
    // Handle regular strings
    else {
      params[key] = decodeURIComponent(value)
    }
  })
  
  return params
}

/**
 * Builds a URL search string from parameters
 * @param params - Object containing URL parameters
 * @returns URL search string (without leading '?')
 */
export function buildUrlParams(params: UrlParams): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      // Skip null and undefined values
      return
    }
    
    const stringValue = String(value)
    searchParams.set(key, encodeURIComponent(stringValue))
  })
  
  return searchParams.toString()
}

/**
 * Updates URL parameters while preserving existing ones
 * @param currentParams - Current URL parameters
 * @param updates - Parameters to update or add
 * @returns New URL search string
 */
export function updateUrlParams(
  currentParams: ReadonlyURLSearchParams | null,
  updates: UrlParams
): string {
  const params = new URLSearchParams(currentParams?.toString())
  
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      params.delete(key)
    } else {
      params.set(key, String(value))
    }
  })
  
  return params.toString()
}

/**
 * Creates a shareable URL with encoded parameters
 * @param baseUrl - Base URL (defaults to current origin)
 * @param params - Parameters to include
 * @returns Complete shareable URL
 */
export function createShareableUrl(params: UrlParams, baseUrl?: string): string {
  const url = new URL(baseUrl || window?.location?.origin || 'http://localhost:3000')
  url.search = buildUrlParams(params)
  return url.toString()
}

/**
 * Copies a URL to clipboard with fallback
 * @param url - URL to copy
 * @returns Promise that resolves when copied
 */
export async function copyToClipboard(url: string): Promise<void> {
  if (typeof window === 'undefined') {
    throw new Error('Cannot access clipboard in SSR')
  }
  
  try {
    await navigator.clipboard.writeText(url)
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = url
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

/**
 * Removes sensitive parameters from URL
 * @param searchParams - Current URL parameters
 * @param sensitiveKeys - Array of keys to remove
 * @returns Cleaned URL search string
 */
export function sanitizeUrlParams(
  searchParams: ReadonlyURLSearchParams | null,
  sensitiveKeys: string[] = ['token', 'key', 'secret', 'password']
): string {
  const params = new URLSearchParams(searchParams?.toString())
  
  sensitiveKeys.forEach(key => {
    params.delete(key)
  })
  
  return params.toString()
}

/**
 * Validates if a URL is safe to redirect to (prevents open redirect)
 * @param url - URL to validate
 * @returns Boolean indicating if URL is safe
 */
export function isSafeRedirectUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : ''
    
    // Allow relative URLs
    if (url.startsWith('/')) return true
    
    // Allow same origin
    return parsedUrl.origin === currentOrigin
  } catch {
    // Invalid URL
    return false
  }
}