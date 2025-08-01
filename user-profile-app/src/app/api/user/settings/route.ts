// src/app/api/user/settings/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define the schema for user settings validation
const userSettingsSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  bio: z.string().max(250).optional(),
});

// API route handler for updating user settings
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the incoming data
    const validatedData = userSettingsSchema.parse(body);

    // Here you would typically call your service to update the user settings
    // For example: await updateUserSettings(validatedData);

    return NextResponse.json({ message: 'User settings updated successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }

    console.error('Error updating user settings:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}