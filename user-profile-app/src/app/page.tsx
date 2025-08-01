import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import HomeContent from '@/components/HomeContent'
import Footer from '@/components/Footer' // Importing the Footer component

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <HomeContent />
      <Footer /> {/* Including the Footer component */}
    </>
  )
}