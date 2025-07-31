import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import HomeContent from '@/components/HomeContent'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: { theme } } = await supabase
      .from('profiles')
      .select('theme')
      .eq('id', user.id)
      .single()

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
    redirect('/dashboard')
  }

  return <HomeContent />
}