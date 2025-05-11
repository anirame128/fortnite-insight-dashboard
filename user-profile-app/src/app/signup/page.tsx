'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { signup, type SignupResponse } from './actions'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

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

export default function SignUpPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    let result: SignupResponse
    try {
      result = await signup(formData)
    } catch {
      setMessage('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    setLoading(false)
    if (result.status === 'error') {
      setMessage(result.message)
    } else {
      setMessage(result.message || '✅ Check your email to confirm your account.')
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
          Create your account
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              /check your email|verify your account/i.test(message)
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 transition"
          >
            {loading ? 'Signing up…' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
