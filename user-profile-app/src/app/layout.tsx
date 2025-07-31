```tsx
import { metadata, default as NextLayout } from 'next';
import SearchBar from '../components/SearchBar';

export function metadata() {
  return {
    title: 'Dashboard',
    description: 'User dashboard'
  }
}

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">User Profile App</h1>
          <SearchBar />
        </nav>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
}
```