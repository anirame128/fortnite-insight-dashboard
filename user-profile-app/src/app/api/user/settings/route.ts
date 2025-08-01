import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const userSettingsSchema = z.object({
  theme: z.enum(['light', 'dark']),
  notifications: z.boolean(),
});

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = userSettingsSchema.parse(data);

    // In a real application, you would update the user settings in your database here
    // For this example, we'll just return the validated data
    return NextResponse.json(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}