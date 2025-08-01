import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function updateUserSettings(userId: string, settings: object) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}