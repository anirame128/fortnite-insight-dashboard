import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'

interface FortniteMap {
  code: string
  name: string
}

interface SearchResult {
  maps: FortniteMap[]
}

const DashboardClient = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  const searchFortniteMaps = async (query: string) => {
    try {
      const response = await fetch(`/api/fortnite?search=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setSearchResults(data)
      setError(null)
    } catch (error) {
      setError(error.message)
      setSearchResults(null)
    }
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    searchFortniteMaps(searchQuery)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search Fortnite maps"
        />
        <button type="submit">Search</button>
      </form>
      {searchResults && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.maps.map((map) => (
              <li key={map.code}>{map.name}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default DashboardClient