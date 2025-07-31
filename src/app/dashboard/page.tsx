```
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/utils/supabase/client';
import DashboardClient from '@/components/DashboardClient';
import ProfileClient from '@/components/ProfileClient';
import SearchBar from '@/components/SearchBar';
import Layout from '@/components/Layout';

const DashboardPage = () => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, display_name, bio')
          .ilike('display_name', `%${searchQuery}%`);

        if (error) {
          console.error(error);
        } else {
          setSearchResults(data);
        }
      };

      fetchSearchResults();
    }
  }, [searchQuery]);

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(event.currentTarget.searchQuery.value);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <SearchBar onSubmit={handleSearchSubmit} />
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((profile) => (
              <li key={profile.id}>
                <a href={`/dashboard/profile/${profile.id}`}>
                  {profile.display_name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <DashboardClient />
            <ProfileClient />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
```