<think>
Okay, I need to create a reusable SearchBar component in React with TypeScript. The component should accept a search term and trigger a search on submit. Let me think about how to approach this.

First, I'll start by setting up the component structure. I'll use a functional component with hooks. Since the user might be using Next.js, I'll make sure it's compatible.

I'll need state to manage the search term. Using useState makes sense here. So, I'll import useState from React and set up a state variable, maybe called searchTerm, initialized to an empty string.

Next, the form. I'll create a form element with an onSubmit handler. Inside the form, there should be an input field for the search term and a submit button.

For the input, I'll set its value to the searchTerm state and update the state on change. The onChange handler will update the state with e.target.value.

The form's onSubmit handler will prevent the default action, check if the searchTerm is not empty, and then trigger the search. But wait, how does the search get triggered? The component should accept a callback prop, maybe onSearch, which will be called with the searchTerm.

I should define the props for the component. So, I'll create an interface SearchBarProps with an onSearch function that takes a string and returns void.

Now, I need to make sure that the onSearch prop is optional, but when it's provided, it's called correctly. So, in the handleSubmit function, I'll check if onSearch exists and call it with the searchTerm.

Styling is important too. The user is using Tailwind CSS, so I'll apply appropriate classes. The container div should have flex classes to arrange the input and button side by side. The input should have padding, border, and focus styles. The button should have a background color, hover effect, and disable state when the input is empty.

I should also handle the case where the input is empty. The button should be disabled if searchTerm is empty to prevent unnecessary submissions.

Putting it all together, the component will have a form with an input and a button. The input updates the state, and the form submission triggers the onSearch callback if provided.

I should also make sure that the component is properly typed and follows best practices for React and TypeScript. So, I'll include the necessary imports, define the interface for props, and ensure that all variables are correctly typed.

Finally, I'll test the component in my mind: when the user types something and submits, the onSearch function is called with the correct term. The button is disabled when the input is empty, preventing submission of an empty search.

I think that covers all the requirements. Now, I'll write the code accordingly.
</think>

import { useState } from 'react'

interface SearchBarProps {
  onSearch?: (term: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch?.(searchTerm)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!searchTerm.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Search
      </button>
    </form>
  )
}