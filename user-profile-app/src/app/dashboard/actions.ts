import { NextResponse } from 'next/server'

export async function updateProfile(profile: any) {
  // existing code...
}

export async function logout() {
  // existing code...
}

export async function searchFortniteMaps(query: string) {
  try {
    const response = await fetch(`/api/fortnite?search=${query}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch Fortnite maps: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error searching Fortnite maps:', error)
    return []
  }
}