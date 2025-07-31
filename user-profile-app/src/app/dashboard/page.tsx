```tsx
import React, { useState } from 'react';
import DashboardClient from '../DashboardClient';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/dashboard?search=${searchTerm}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for Fortnite maps"
        />
        <button type="submit">Search</button>
      </form>
      <DashboardClient />
    </div>
  );
}
```