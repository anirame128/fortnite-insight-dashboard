'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, BarChart, LogOut } from 'lucide-react'
import { logout } from './actions'
import { toast } from 'react-hot-toast'

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
})

// Motion variants
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Failed to logout. Please try again.')
    }
  }

  const navItems = [
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Stats', href: '/dashboard/fortnite', icon: BarChart },
  ]

  return (
    <div className={`${montserrat.variable} font-sans flex bg-gray-900 min-h-screen`}>      
      {/* Sidebar */}
      <aside className="w-64 bg-black/80 backdrop-blur-md p-6 flex flex-col">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white">Fortnite Insights</h1>
        </motion.div>
        <nav className="flex-1 space-y-4">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg transition w-full bg-red-600 hover:bg-red-500 text-white"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto p-8">        
          {children}
        </main>
        <footer className="bg-black/80 text-gray-500 text-center py-4 border-t border-gray-800">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © 2025 Fortnite Insights. All rights reserved.
          </motion.p>
        </footer>
      </div>
    </div>
  )
}
