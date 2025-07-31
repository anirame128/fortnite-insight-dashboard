import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { fetch } from '../../utils/fetch'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const router = useRouter()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (query.trim() === '') return
    try {
      const response = await fetch('/api/fortnite', {
        method: 'GET',
        params: { code: query },
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleResultClick = (result) => {
    router.push(`/dashboard/${result.id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSearch} className="flex flex-col items-center justify-center">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a Fortnite map code"
          className="w-full max-w-md p-2 pl-10 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          type="submit"
          className="w-full max-w-md p-2 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Search
        </button>
      </form>
      {results.length > 0 && (
        <div className="flex flex-col items-center justify-center mt-4">
          <h2 className="text-lg font-bold text-gray-900">Search Results:</h2>
          <ul>
            {results.map((result) => (
              <li key={result.id} onClick={() => handleResultClick(result)} className="py-2 cursor-pointer">
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar