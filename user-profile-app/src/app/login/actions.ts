'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
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

    if(!users.some(user => user.email === email)) {
        return { status: 'error', message: 'Email does not exist' }
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

