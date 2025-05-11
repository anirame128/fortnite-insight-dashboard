'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export type LoginResponse = 
    | { status: 'error'; message: string }
    | { status: 'success'}

export async function login(formData: FormData): Promise<LoginResponse> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: { users }, error: listErr } =
        await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 })
    if (listErr) {
        return { status: 'error', message: 'Server error' }
    }

    const user = users.find(user => user.email === email)
    if (!user) {
        return { status: 'error', message: 'Email does not exist' }
    }
    if (!user.email_confirmed_at) {
        return { status: 'error', message: 'Please verify your email before logging in. Check your inbox for a confirmation link.' }
    }

    const supabase = await createClient()
    const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (signInErr) {
        // wrong password or other auth error
        return { status: 'error', message: 'Email/password is incorrect.' }
    }

    // 3) Success → revalidate and tell client to navigate
    revalidatePath('/', 'layout')
    return { status: 'success' }
}

