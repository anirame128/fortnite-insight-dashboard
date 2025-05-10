'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from './actions'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black text-white rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 shadow"
              >
                Logout
              </button>
            </div>
            
            {/* Navigation */}
            <nav className="mt-6 flex gap-4">
              <Link
                href="/dashboard/profile"
                className={`px-4 py-2 rounded-lg transition ${
                  pathname === '/dashboard/profile'
                    ? 'bg-white text-black'
                    : 'hover:bg-gray-800'
                }`}
              >
                Profile
              </Link>
              <Link
                href="/dashboard/fortnite"
                className={`px-4 py-2 rounded-lg transition ${
                  pathname === '/dashboard/fortnite'
                    ? 'bg-white text-black'
                    : 'hover:bg-gray-800'
                }`}
              >
                Fortnite Stats
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 