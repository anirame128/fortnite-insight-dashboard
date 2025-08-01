import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function fetchUserSettings(userId: string) {
  const client = createClient();
  try {
    const { data, error } = await client
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching user settings:', error);
    throw new Error('Could not fetch user settings');
  }
}

export async function updateUserSettings(userId: string, settings: object) {
  const client = createClient();
  try {
    const { data, error } = await client
      .from('user_settings')
      .update(settings)
      .eq('user_id', userId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw new Error('Could not update user settings');
  }
}