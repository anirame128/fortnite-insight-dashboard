'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import HomeContent from '@/components/HomeContent'
import { Moon, Sun } from 'lucide-react'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return <HomeComponent />
}

function HomeComponent() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode))
      document.documentElement.classList.toggle('dark', JSON.parse(savedMode))
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode
      localStorage.setItem('darkMode', JSON.stringify(newMode))
      document.documentElement.classList.toggle('dark', newMode)
      return newMode
    })
  }

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl">Home</h1>
      <button onClick={toggleDarkMode} className="p-2 rounded">
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  )
}