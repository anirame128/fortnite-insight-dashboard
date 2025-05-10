'use client'

import { useState } from 'react'
import { signup, SignupResponse} from './actions'

export default function SignUpPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
      setMessage('✅ Check your email to confirm your account.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white/90 tracking-tight border-b border-gray-800 pb-2">
          Create your account
        </h2>

        {message && (
          <div
            className={[
              'mb-4 p-2 rounded',
              message.startsWith('✅')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700',
            ].join(' ')}
          >
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/70">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/70">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition"
            />
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-white text-black rounded-lg font-semibold shadow hover:bg-gray-200 transition"
            >
              {loading ? 'Signing up…' : 'Sign up'}
            </button>

            <a
              href="/login"
              className="w-full block text-center py-2 border border-gray-700 rounded-lg text-white/70 hover:bg-gray-800 transition"
            >
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
