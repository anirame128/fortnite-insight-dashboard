<think>
Okay, I need to add a new settings navigation item to the existing Next.js app. Let me look at the original code to see where to make changes.

First, I see that the navItems array is defined with two objects: Profile and Stats. I'll add a new object for Settings. The href should be '/dashboard/settings', and I'll need an appropriate icon. The original code uses Lucide icons, so I'll check if there's a suitable one for settings. I think Settings icon from Lucide-react would work.

Next, I'll import the Settings icon. In the import statement, I'll add it alongside the others. So, I'll modify the import line to include Settings from 'lucide-react'.

Now, I'll update the navItems array by adding a new object with name 'Settings', href '/dashboard/settings', and icon Settings.

I should check if the href path is correct. Since the app uses Next.js App Router, the settings page should be located under dashboard/settings. I assume that the page exists or will be created, so the link should work.

Looking at the existing code, the navigation items are rendered using a map function. Each item is a Link component. The new Settings item will follow the same pattern, so no changes are needed there beyond adding the new object to navItems.

I also need to ensure that the icon is correctly displayed. The existing icons have a className of 'w-5 h-5', so I'll apply the same to the Settings icon.

I should review the code for any potential issues, like duplicate keys or incorrect imports. The key for the new Link will be 'Settings', which is unique.

Finally, I'll make sure that the code is formatted correctly and that all commas and brackets are properly placed to avoid syntax errors.
</think>


'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User, BarChart, LogOut, Settings } from 'lucide-react'
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
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
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