import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = await createClient()
        const {error} = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            const { data: { user }} = await supabase.auth.getUser()

            if (user) {
                const {error: profileError} = await supabase
                .from('profiles')
                .insert({
                    id: user.id,
                    display_name: null,
                    bio: null
                }).select().single()

                if (profileError && profileError.code !== '23505') {
                    console.error('Error creating profile', profileError)
                }
            }

            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
}
    
    