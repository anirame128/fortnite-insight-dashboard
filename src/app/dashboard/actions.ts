import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const updateProfile = async (userData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  try {
    setLoading(true);
    const response = await axios.post('/api/user/settings', userData);
    toast.success('Profile updated successfully!');
    return response.data;
  } catch (err) {
    setError(err);
    toast.error('Failed to update profile. Please try again.');
    throw err; // Rethrow to allow further handling if needed
  } finally {
    setLoading(false);
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get('/api/user/profile');
    return response.data;
  } catch (err) {
    toast.error('Failed to fetch user profile.');
    throw err; // Rethrow to allow further handling if needed
  }
};

// Additional actions related to settings can be added here