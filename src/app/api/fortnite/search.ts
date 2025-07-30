Here is the complete code for the file `src/app/api/fortnite/search.ts`:
```
import { NextResponse } from 'next/server'

interface SearchQuery {
  query: string
}

interface FortniteMap {
  id: string
  name: string
  code: string
}

const searchMaps = async (query: string): Promise<FortniteMap[]> => {
  // TO DO: implement search logic to fetch maps from Fortnite API or database
  // For now, return a dummy list of maps
  return [
    { id: '1', name: 'Map 1', code: 'MAP1' },
    { id: '2', name: 'Map 2', code: 'MAP2' },
    { id: '3', name: 'Map 3', code: 'MAP3' },
  ]
}

export async function GET(request: Request) {
  const { query } = request.url.searchParams
  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 })
  }

  try {
    const maps = await searchMaps(query)
    return NextResponse.json(maps)
  } catch (error) {
    console.error('Error searching for maps:', error)
    return NextResponse.json({ error: 'Failed to search for maps' }, { status: 500 })
  }
}
```
This code defines an API route that accepts a search query as a URL parameter and returns a list of Fortnite maps that match the search query. The `searchMaps` function is a placeholder for the actual search logic, which you will need to implement to fetch maps from the Fortnite API or a database.

Note that this code assumes that the search query is a string, and that the Fortnite maps are represented as objects with `id`, `name`, and `code` properties. You may need to adjust the code to fit your specific use case.