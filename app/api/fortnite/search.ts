import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const searchQuery = new URL(request.url).searchParams.get('query')
  if (!searchQuery) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
  }

  try {
    const encodedQuery = encodeURIComponent(searchQuery)
    const response = await fetch(`https://fortnite.gg/search?q=${encodedQuery}`)
    if (!response.ok) {
      throw new Error(`Failed to load search results (${response.status})`)
    }
    const html = await response.text()
    const islands = html.match(/\/island\?code=([a-zA-Z0-9]+)/g)
    if (!islands) {
      return NextResponse.json({ results: [] })
    }
    const islandCodes = islands.map(island => island.match(/\/island\?code=([a-zA-Z0-9]+)/)?.[1]).filter(Boolean)
    const results = await Promise.all(islandCodes.map(async code => {
      const islandResponse = await fetch(`https://fortnite.gg/island?code=${code}`)
      if (!islandResponse.ok) {
        return null
      }
      const islandHtml = await islandResponse.text()
      const nameMatch = islandHtml.match(/<title>([^<]+)<\/title>/)
      return {
        code,
        name: nameMatch?.[1].trim() ?? '',
      }
    }))
    return NextResponse.json(results.filter(Boolean))
  } catch (error) {
    console.error('[fortnite API] Error searching for maps:', error)
    return NextResponse.json({ error: 'Failed to search for maps' }, { status: 500 })
  }
}