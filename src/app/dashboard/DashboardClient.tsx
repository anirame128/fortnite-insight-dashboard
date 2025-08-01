'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { updateProfile } from './actions'
import { Edit2, Check, X } from 'lucide-react'
import SettingsForm from './settings/SettingsForm' // Import the new SettingsForm component

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
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleProfileUpdate = async (data: { display_name: string; bio: string }) => {
    setLoading(true)
    setError(null)
    try {
      await updateProfile(data)
      setProfile({ ...profile!, display_name: data.display_name, bio: data.bio })
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
        <SettingsForm
          initialValues={{ display_name: profile.display_name ?? '', bio: profile.bio ?? '' }}
          onSubmit={handleProfileUpdate}
          loading={loading}
          onCancel={() => setIsEditing(false)}
        />
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