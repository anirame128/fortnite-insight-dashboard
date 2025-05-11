'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { updateProfile } from './actions'
import { Edit2, Check, X } from 'lucide-react'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400','700'], variable: '--font-sans', display: 'swap' })

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

interface Profile {
  id: string
  display_name: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export default function DashboardClient({ initialProfile }: { initialProfile: Profile | null }) {
  const [profile, setProfile] = useState(initialProfile)
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await updateProfile({ display_name: displayName, bio })
      setProfile({ ...profile!, display_name: displayName, bio })
      setIsEditing(false)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return <p className="text-gray-400">Loading profile...</p>
  }

  return (
    <div className={`${montserrat.variable} font-sans relative max-w-xl mx-auto p-6 bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-800`}>      
      {error && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-4 p-3 bg-red-800 text-red-200 rounded-lg border border-red-700"
        >
          {error}
        </motion.div>
      )}

      <motion.h2
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2"
      >
        Profile Dashboard
      </motion.h2>

      {isEditing ? (
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={onSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="display_name" className="block mb-1 text-gray-400 font-medium">Display Name</label>
            <input
              id="display_name"
              name="display_name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1 text-gray-400 font-medium">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <p className="text-xs text-gray-500 mt-1 text-right">{bio.length}/200</p>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold shadow transition"
            >
              <Check className="w-5 h-5 mr-2" />
              <span>{loading ? 'Saving…' : 'Save'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setDisplayName(profile.display_name ?? '')
                setBio(profile.bio ?? '')
              }}
              className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-semibold shadow transition"
            >
              <X className="w-5 h-5 mr-2" />
              <span>Cancel</span>
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-gray-400 font-medium">Display Name</h3>
            <p className="mt-1 text-white text-xl">{profile.display_name ?? 'Not set'}</p>
          </div>
          <div>
            <h3 className="text-gray-400 font-medium">Bio</h3>
            <p className="mt-1 text-white whitespace-pre-line">{profile.bio ?? 'No bio yet'}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-semibold shadow transition"
          >
            <Edit2 className="w-5 h-5 mr-2" />
            <span>Edit Profile</span>
          </button>
        </motion.div>
      )}
    </div>
  )
}
