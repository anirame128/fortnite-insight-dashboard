'use server'

import { createClient } from '@/utils/supabase/server'

export type ForgotPasswordResponse =
  | { status: 'success'; message?: string }
  | { status: 'error'; message: string }

export async function sendResetPassword(email: string): Promise<ForgotPasswordResponse> {
  if (!email) {
    return { status: 'error', message: 'Email is required.' }
  }
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    })
    if (error) {
      if (error.message.toLowerCase().includes('user not found')) {
        return { status: 'error', message: 'No account found with that email.' }
      }
      return { status: 'error', message: error.message || 'Error sending recovery email' }
    }
    return { status: 'success', message: 'Check your email for a password reset link.' }
  } catch {
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
} 