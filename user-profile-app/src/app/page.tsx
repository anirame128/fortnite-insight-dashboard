import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-extrabold text-white/90 tracking-tight text-center border-b border-gray-800 pb-2 mb-6">
          Welcome to Fortnite Insight Dashboard
        </h1>
        <div className="flex flex-col space-y-4">
          <a
            href="/login"
            className="w-full py-2 px-4 bg-white text-black rounded-lg font-semibold shadow hover:bg-gray-200 transition text-center"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="w-full py-2 px-4 border border-gray-700 rounded-lg text-white/70 hover:bg-gray-800 transition text-center"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}
