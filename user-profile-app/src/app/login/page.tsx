'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, type LoginResponse } from './actions'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    let result: LoginResponse
    try {
      result = await login(formData)
    } catch {
      const errorMessage = 'Something went wrong. Please try again.'
      setMessage(errorMessage)
      toast.error(errorMessage)
      setLoading(false)
      return
    }

    setLoading(false)
    if (result.status === 'error') {
      setMessage(result.message)
      toast.error(result.message)
    } else {
      toast.success('Login successful!')
      router.push('/dashboard')
    }
  }

  return (
    <div className={`${montserrat.variable} font-sans relative flex items-center justify-center min-h-screen bg-black overflow-hidden`}> 
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 to-black/80" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 className="text-center text-3xl font-extrabold text-white mb-6">
          Sign in to your account
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message === 'Signed in successfully'
                ? 'bg-green-800 text-green-200'
                : 'bg-red-800 text-red-200'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-between">
            <Link href="/forgot-password" className="block w-full text-sm text-purple-400 hover:text-purple-300 text-right mb-2">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 transition"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
