'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js';

export type SignupResponse =
  | { status: 'error';     message: string }
  | { status: 'success' }

export async function signup(formData: FormData): Promise<SignupResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  )
  
  const { data: { users }, error: listErr } =
    await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 })
  if (listErr) {
    return { status: 'error', message: listErr.message }
  }
  if (users.some(u => u.email === email)) {
    return { status: 'error', message: 'An account with this email already exists.' }
  }
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const supabase = await createClient()
  const { error: signUpErr } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_URL}/login`
    }
  })

  if (signUpErr) {
    return { status: 'error', message: signUpErr.message }
  }

  revalidatePath('/', 'layout')
  return { status: 'success' }
}