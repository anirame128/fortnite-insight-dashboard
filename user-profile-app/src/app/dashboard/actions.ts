```typescript
import { fetch } from 'node-fetch';

export async function updateProfile(profileData: any) {
    // existing implementation
}

export async function logout() {
    // existing implementation
}

export async function handleSearchFormSubmission(searchQuery: string) {
    try {
        const response = await fetch(`/api/fortnite?code=${searchQuery}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching Fortnite API:', error);
        throw error;
    }
}
```