<think>
Okay, I need to modify the `src/app/dashboard/page.tsx` file by adding a search bar component and implementing the search functionality. Let me think about how to approach this.

First, I should look at the existing code to understand what's already there. The current page probably has some layout or components, maybe importing from other files. I remember that the project uses Next.js, React, and Tailwind CSS, so I'll need to structure the code accordingly.

I need to add a search bar. That means I'll likely create a form with an input field and a submit button. The input should capture the user's search term, and on submission, it should trigger an API call to fetch data based on that term.

Looking at the existing API routes, there's a `/api/fortnite` endpoint that accepts a code as a query parameter. So, the search functionality should probably call this endpoint with the user's input.

I should import any necessary components or utilities. Since the project uses Supabase, I might need to create a client instance to handle the API call. Also, I'll need to manage the state for the search term, loading state, and any errors that occur during the API call.

I'll structure the page component as a function component using TypeScript. I'll set up state variables for `searchTerm`, `isLoading`, and `error`. When the form is submitted, I'll handle it by preventing the default action, checking if the term is valid, and then making the API call.

For the API call, I'll use `fetch` to hit the `/api/fortnite` endpoint with the search term as a query parameter. I'll handle any errors and update the state accordingly. If the response is successful, I'll process the data, maybe storing it in another state variable to display later.

I should also consider adding a loading indicator, like a spinner, when the request is in progress. This improves the user experience by providing feedback.

Looking at the existing components, there's a `HomeContent` component with a search input and button. I might need to reuse that or create a similar form here. Alternatively, I can create a new form that fits the dashboard layout.

I'll make sure to follow the project's coding conventions, such as using Tailwind classes for styling and proper TypeScript annotations. I'll also handle any edge cases, like if the search term is empty or if the API returns an error.

Finally, I'll test the component to ensure that the search functionality works as expected, including handling loading states and displaying errors appropriately.
</think>

import { type NextPage } from 'next'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/app/dashboard/layout'
import { NextResponse } from 'next/server'

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setError('Please enter a valid search term')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/fortnite?code=${encodeURIComponent(searchTerm)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      
      // Handle the data here (e.g., display results)
      console.log('Search results:', data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to perform search')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <form onSubmit={handleSearch} className="w-full max-w-md space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Fortnite island code..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </form>
      </div>
    </DashboardLayout>
  )
}