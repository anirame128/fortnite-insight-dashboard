// src/app/api/user/settings/route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { validateUserSettings } from '../../../utils/validation';
import { updateUserSettings } from '../../../services/userService';
import { authenticateUser } from '../../../middleware/auth';
import { UserSettings } from '../../../types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Authenticate user
    const user = await authenticateUser(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate user settings
    const settings: UserSettings = req.body;
    const validationErrors = validateUserSettings(settings);
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: 'Validation Error', errors: validationErrors });
    }

    // Update user settings
    const updatedSettings = await updateUserSettings(user.id, settings);
    return res.status(200).json({ message: 'Settings updated successfully', data: updatedSettings });
  } catch (error) {
    console.error('Error updating user settings:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}