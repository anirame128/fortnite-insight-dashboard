import { useState, useEffect } from 'react'
import { BarChart } from '@/components/charts/BarChart'
import { LineChart } from '@/components/charts/LineChart'

export default function DashboardPage() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          const response = await fetch(`/api/fortnite?search=${encodeURIComponent(searchTerm)}`)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          setSearchResults(data)
          setError(null)
        } catch (error) {
          setError(error.message)
          setSearchResults([])
        }
      }
    }
    fetchSearchResults()
  }, [searchTerm])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for Fortnite map codes"
        className="w-full p-2 mb-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        searchResults.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Search Results:</h2>
            <ul>
              {searchResults.map((result: any) => (
                <li key={result.code}>
                  <a href={`/dashboard/fortnite?code=${result.code}`} className="text-blue-500 hover:text-blue-700">
                    {result.name} ({result.code})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
      <BarChart />
      <LineChart />
    </div>
  )
}