'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

const UserProfileSettings = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  const handleProfileUpdate = async () => {
    // Simulate a profile update API call
    const response = await fetch('/api/update-profile', {
      method: 'POST',
      body: JSON.stringify({ /* profile data */ }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setProfileUpdated(true);
      toast.success('Profile updated successfully!');
    } else {
      toast.error('Failed to update profile.');
    }
  };

  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <div className={`bg-[var(--background)] text-[var(--foreground)]`}>
      <h1>User Profile Settings</h1>
      <button onClick={handleProfileUpdate} className="btn">
        Update Profile
      </button>
      {profileUpdated && <div className="notification">Profile updated successfully!</div>}
    </div>
  );
};

export default UserProfileSettings;