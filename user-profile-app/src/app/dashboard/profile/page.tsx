import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Try to fetch the profile
  let { data: profile } = await supabase
    .from('profiles')
    .select('id, display_name, bio, created_at, updated_at')
    .eq('id', user.id)
    .single()

  // If profile doesn't exist, create it and fetch again
  if (!profile) {
    await supabase.from('profiles').insert({
      id: user.id,
      display_name: null,
      bio: null,
    })
    // Fetch the profile again
    const { data: newProfile } = await supabase
      .from('profiles')
      .select('id, display_name, bio, created_at, updated_at')
      .eq('id', user.id)
      .single()
    profile = newProfile
  }

  return <ProfileClient initialProfile={profile} />
} 