// user-profile-app/src/app/api/user/settings/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { updateUserProfile } from '@/lib/db'; // Adjust the import path according to your project structure

const userProfileSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = userProfileSchema.parse(body);

    // Assuming updateUserProfile is a function that updates the user profile in the database
    await updateUserProfile(validatedData);

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}