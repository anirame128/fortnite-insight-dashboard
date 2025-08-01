import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import HomeContent from '@/components/HomeContent'
import { ThemeToggle } from '@/components/ThemeToggle'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <header>
        <ThemeToggle />
      </header>
      <HomeContent />
    </>
  )
}