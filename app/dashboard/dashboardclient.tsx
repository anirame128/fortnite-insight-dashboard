import { useState } from 'react'
import { SearchInput } from '@/components/SearchInput'
import { useDashboard } from './useDashboard'
import { SearchBar } from '@/components/SearchBar'

export default function DashboardClient() {
  const { searchFortniteMaps } = useDashboard()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (query: string) => {
    try {
      const results = await searchFortniteMaps(query)
      console.log(results)
      // Handle search results
    } catch (error) {
      console.error(error)
      // Handle search error
    }
  }

  return (
    <div>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(searchQuery)
        }}
      />
    </div>
  )
}