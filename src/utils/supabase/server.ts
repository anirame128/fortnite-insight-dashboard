// src/utils/supabase/server.ts

import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define input schema for user settings
const userSettingsSchema = z.object({
  userId: z.string().uuid(),
  settings: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
    language: z.string().min(2).max(5),
  }),
});

// API handler for updating user settings
export const updateUserSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate input
    const parsedData = userSettingsSchema.parse(req.body);
    const { userId, settings } = parsedData;

    // Check user authentication
    const { data: user, error: userError } = await supabase.auth.api.getUserById(userId);
    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Update user settings in the database
    const { error: updateError } = await supabase
      .from('user_settings')
      .upsert({ user_id: userId, ...settings });

    if (updateError) {
      throw updateError;
    }

    return res.status(200).json({ message: 'Settings updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Error updating user settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};