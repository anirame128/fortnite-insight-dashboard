'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js';

export type SignupResponse =
  | { status: 'error';     message: string }
  | { status: 'success';   message?: string }

export async function signup(formData: FormData): Promise<SignupResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Basic validation
  if (!email || !password) {
    return { status: 'error', message: 'Email and password are required.' }
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  // Password strength validation
  if (password.length < 8) {
    return { status: 'error', message: 'Password must be at least 8 characters long.' }
  }

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  )
  
  try {
    const { data: { users }, error: listErr } =
      await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 })
    if (listErr) {
      console.error('Error listing users:', listErr)
      return { status: 'error', message: 'Server error. Please try again later.' }
    }
    if (users.some(u => u.email === email)) {
      return { status: 'error', message: 'An account with this email already exists.' }
    }

    const supabase = await createClient()
    const { error: signUpErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/login`,
        data: {
          email_confirmed: false
        }
      }
    })

    if (signUpErr) {
      console.error('Signup error:', signUpErr)
      if (signUpErr.message.includes('rate limit')) {
        return { status: 'error', message: 'Too many signup attempts. Please try again later.' }
      }
      return { status: 'error', message: 'Failed to create account. Please try again.' }
    }

    revalidatePath('/', 'layout')
    return { 
      status: 'success',
      message: 'Please check your email to verify your account before signing in.'
    }
  } catch (error) {
    console.error('Unexpected error during signup:', error)
    return { status: 'error', message: 'An unexpected error occurred. Please try again.' }
  }
}