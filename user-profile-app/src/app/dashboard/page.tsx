import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const userPrefersDarkMode = localStorage.getItem('darkMode')
    if (userPrefersDarkMode === 'true') {
      setDarkMode(true)
    }
  }, [])

  if (darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  redirect('/dashboard/profile')
}