<think>
Okay, I need to create a reusable SearchBar component in React with TypeScript. The user wants it to emit search queries. Let me think about how to approach this.

First, the component should have an input field where users can type their queries. I'll use the input element with type text. Then, I need a button to trigger the search. Alternatively, the search should trigger on Enter key press.

I'll use React's useState hook to manage the search term state. When the user types, onChange updates the state. When the button is clicked or Enter is pressed, the handleSearch function is called.

I need to emit the search query. Since this is a reusable component, it's best to pass a callback function as a prop. So, I'll define an interface SearchBarProps with a callback function onSearch.

Next, I should handle the API call. The callback should be async and try to fetch data. I'll use fetch with the base URL and params. I'll include error handling, checking if the response is ok. If not, throw an error.

I should also validate the searchTerm before making the API call. If it's empty, maybe log a message and return early.

Styling-wise, I'll use Tailwind CSS classes to make it look clean. The input should have padding, rounded corners, and focus styles. The button should have a background color that changes on hover.

Accessibility is important, so I'll add labels and aria attributes. The form should prevent default action to handle the submission correctly.

I'll structure the component with a form containing the input and button. The form's onSubmit will call handleSearch.

Testing edge cases: What if the API returns an error? I'll include error handling in the try-catch block and log it. Also, ensure that the searchTerm is trimmed to avoid whitespace issues.

Finally, I'll make sure the component is properly typed with TypeScript, including the interface for props and function parameters.
</think>

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!searchTerm.trim()) return

    try {
      await onSearch(encodeURIComponent(searchTerm.trim()))
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search input"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search button"
      >
        Search
      </button>
    </form>
  )
}