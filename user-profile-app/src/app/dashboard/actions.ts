import { NextResponse } from 'next/server'

export async function updateProfile(profile: any) {
  // existing code...
}

export async function logout() {
  // existing code...
}

export async function searchFortniteMaps(searchQuery: string) {
  try {
    const response = await fetch(`/api/fortnite?search=${encodeURIComponent(searchQuery)}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch Fortnite maps: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error searching Fortnite maps:', error)
    return []
  }
}