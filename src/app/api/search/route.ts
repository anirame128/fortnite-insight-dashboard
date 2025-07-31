import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
  }

  try {
    const encodedQuery = encodeURIComponent(query)
    const response = await fetch(`https://fortnite.gg/search?q=${encodedQuery}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch search results (${response.status})`)
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[search API] Error fetching search results:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch search results' },
      { status: 500 }
    )
  }
}