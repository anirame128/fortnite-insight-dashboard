import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div>
            <h1>Private Page</h1>
            <p>Welcome {data.user.email}</p>
        </div>
    )
}