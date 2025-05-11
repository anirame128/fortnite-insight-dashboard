'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { updateProfile } from '../actions'
import { Edit2, Check, X, User2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400','700'],
  variable: '--font-sans',
  display: 'swap'
})

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

interface Profile {
  id: string
  display_name: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export default function ProfileClient({
  initialProfile,
}: {
  initialProfile: Profile | null
}) {
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
      toast.success('Profile updated successfully!')
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update profile'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return (
      <p className={`${montserrat.variable} font-sans text-gray-400`}>
        Loading profile...
      </p>
    )
  }

  return (
    <motion.div
      className={`${montserrat.variable} font-sans relative max-w-xl mx-auto p-8 bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-800 mt-10 mb-10`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.4 }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg mb-2 border-4 border-gray-800">
          <User2 className="w-12 h-12 text-white/80" />
        </div>
        <span className="text-lg font-semibold text-white drop-shadow">{profile.display_name ?? 'Your Name'}</span>
        <span className="text-xs text-gray-400">Member since {new Date(profile.created_at).toLocaleDateString()}</span>
      </div>

      {error && (
        <motion.div
          className="mb-4 p-3 bg-red-800 text-red-200 rounded-lg border border-red-700"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      <motion.h2
        className="text-3xl font-extrabold text-white mb-8 border-b border-gray-800 pb-3 text-center tracking-tight"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Your Profile
      </motion.h2>

      {isEditing ? (
        <motion.form
          onSubmit={onSubmit}
          className="space-y-8 bg-gray-800/60 p-6 rounded-2xl border border-gray-700 shadow-md animate-fadeIn"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div>
            <label
              htmlFor="display_name"
              className="block mb-1 text-indigo-400 font-semibold tracking-wide"
            >
              Display Name
            </label>
            <input
              id="display_name"
              name="display_name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-lg"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block mb-1 text-indigo-400 font-semibold tracking-wide"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition min-h-[80px] text-base"
            />
            <p className={`text-xs mt-1 text-right font-mono ${bio.length > 180 ? 'text-red-400' : 'text-gray-400'}`}>
              {bio.length}/200
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-full font-semibold shadow transition disabled:opacity-50"
            >
              <Check className="w-5 h-5 mr-2" />
              {loading ? 'Saving…' : 'Save'}
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
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          className="space-y-8 animate-fadeIn"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="bg-gray-800/60 rounded-xl p-5 border border-gray-700 shadow flex flex-col gap-2">
            <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Display Name</h3>
            <p className="mt-1 text-white text-xl font-bold">
              {profile.display_name ?? 'Not set'}
            </p>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-5 border border-gray-700 shadow flex flex-col gap-2">
            <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Bio</h3>
            <p className="mt-1 text-white whitespace-pre-line text-base">
              {profile.bio ?? 'No bio yet'}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-full font-semibold shadow transition mt-2"
            aria-label="Edit Profile"
          >
            <Edit2 className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
