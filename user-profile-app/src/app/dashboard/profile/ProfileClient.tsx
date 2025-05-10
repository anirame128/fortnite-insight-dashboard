'use client'

import { useState } from 'react'
import { updateProfile } from '../actions'

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
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!profile) return <p>Loading profile...</p>

  return (
    <div className="space-y-6">
      {error && <div className="bg-red-900/80 p-4 text-red-200 rounded-lg border border-red-700">{error}</div>}

      {isEditing ? (
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="display_name" className="block mb-1 text-white/70 font-medium">Display Name</label>
            <input
              name="display_name"
              id="display_name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1 text-white/70 font-medium">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={200}
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{bio.length}/200</p>
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="flex-1 bg-white text-black px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setDisplayName(profile.display_name ?? '')
                setBio(profile.bio ?? '')
              }}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white/80">Display Name</h3>
            <p className="mt-1 text-white/90 text-xl font-mono">{profile.display_name ?? 'Not set'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white/80">Bio</h3>
            <p className="mt-1 text-white/90 font-mono whitespace-pre-line">{profile.bio ?? 'No bio yet'}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-white text-black px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  )
} 