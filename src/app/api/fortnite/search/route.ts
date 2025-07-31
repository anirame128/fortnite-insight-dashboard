<think>
Okay, I need to create a new API route for searching Fortnite maps by name. Let me think about how to approach this.

First, I'll look at the existing API route in `route.ts` to see the structure. It uses a GET function and handles errors, so I'll follow that pattern.

The new route should accept a `name` query parameter. I'll need to validate that it's provided and not empty. If not, return a 400 error.

Next, I'll fetch the search results from the Fortnite.gg API. The URL is `https://fortnite.gg/api/search/creativemaps` with the name parameter. I'll set the User-Agent header as before.

If the response isn't ok, I'll throw an error. Then, I'll parse the JSON response. If there's no data or an error in the response, I'll return an appropriate error.

The response should include the status, data, and total. I'll structure it similarly to the existing route.

I'll also add try-catch to handle any exceptions and log errors. For each item in the data, I'll extract specific fields like id, code, name, description, etc., to match the expected output.

I need to make sure all variables are properly declared and handle null/undefined values. Also, use proper TypeScript types for the response.

I should test the regex for extracting the internal map ID, but since the existing code does that, I'll assume it's correct.

Finally, I'll ensure the code follows the project's conventions and integrates smoothly with existing components.
</think>

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const name = new URL(request.url).searchParams.get('name')
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Map name is required' }, { status: 400 })
  }

  try {
    const searchRes = await fetch(
      `https://fortnite.gg/api/search/creativemaps?name=${encodeURIComponent(name)}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    )
    if (!searchRes.ok) {
      throw new Error(`Search API returned ${searchRes.status}`)
    }

    const searchData = await searchRes.json()
    if (!searchData || searchData.error) {
      return NextResponse.json(
        { error: 'Failed to retrieve search results' },
        { status: 500 }
      )
    }

    const results = searchData.data.map((item: any) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      description: item.description,
      likes: item.likes,
      favorites: item.favorites,
      views: item.views,
      author: item.author,
      image: item.image,
      lastUpdated: item.last_updated
    }))

    return NextResponse.json({
      status: 'success',
      data: results,
      total: results.length
    })
  } catch (err: unknown) {
    console.error('[fortnite search API] Error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to search maps' },
      { status: 500 }
    )
  }
}