// src/app/api/user/settings/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { authenticateUser } from '../../../lib/auth'; // Adjust the import path as necessary
import { updateUserProfile } from '../../../lib/user'; // Adjust the import path as necessary

const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req); // Ensure user is authenticated
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const parsedData = userProfileSchema.parse(req.body); // Validate input

    const updatedUser = await updateUserProfile(user.id, parsedData); // Update user profile

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    
    console.error('Error updating user profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}