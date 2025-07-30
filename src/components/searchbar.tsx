Here is the complete code for the file `src/components/searchbar.tsx`:
```
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex flex-row items-center justify-center mb-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 text-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
```
This component accepts a `onSearch` callback function as a prop, which will be triggered when the user submits the search query. The component also maintains its own state for the search query, and updates it when the user types something in the input field. When the user clicks the search button, the `handleSearch` function is called, which triggers the `onSearch` callback with the current search query.