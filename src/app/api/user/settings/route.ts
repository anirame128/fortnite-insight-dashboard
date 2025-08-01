// src/app/api/user/settings/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { authenticateUser } from '../../../utils/auth'; // Adjust the import path as necessary
import { updateUserProfile } from '../../../services/userService'; // Adjust the import path as necessary

const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  bio: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const parsedData = userProfileSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ errors: parsedData.error.errors });
    }

    const { name, email, bio } = parsedData.data;
    const updatedUser = await updateUserProfile(user.id, { name, email, bio });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}