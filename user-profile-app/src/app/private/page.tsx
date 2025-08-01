<think>
Okay, I need to help the user by adding proper authentication state handling to their Next.js page. Let me look at the original code they provided. 

The original code is an async function component that uses Supabase to get the user data. If there's an error or no user, it redirects to the login page. Then it displays a welcome message with the user's email. 

But the user wants to add proper authentication state handling. So, I should think about how to improve this. 

First, I notice that the current code doesn't handle the case where the user data is still loading. It just redirects immediately if there's an error or no user. But in reality, the data might be fetching, so we should add a loading state to prevent premature redirects.

Next, the code doesn't handle the authentication state beyond the initial check. Maybe it's better to set up an effect that listens for auth state changes. That way, if the user logs out or their session expires, the page can redirect them back to the login page.

I should also consider using a state management approach. Maybe using a useState hook to manage the user and error states. This will help in rendering the UI based on the current state—loading, logged in, or error.

Another thing is error handling. The current code checks for error or no user, but it might be better to handle specific error cases, like if the user is null or undefined. Also, providing a user-friendly message when there's an error.

I should also think about the user experience. While the data is being fetched, the page should display a loading indicator. Once the user is authenticated, it shows the welcome message. If there's an error, it shows an error message and maybe a link to login again.

Putting this together, I'll structure the component with useState for user and error, useEffect to handle the auth state, and a loading state. I'll also add conditional rendering based on these states.

I'll make sure to import necessary hooks from React and use the createClient function from the utils. Also, I'll ensure that the component is properly typed with TypeScript, using NextPage for the function type.

Finally, I'll test the component to make sure it handles all states correctly: loading, authenticated, and error. This should provide a robust authentication state handling for the private page.
</think>


import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'

export default function PrivatePage() {
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()
        
        const getUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser()
                if (error || !data?.user) {
                    redirect('/login')
                }
                setUser(data.user)
                setError(null)
            } catch (error) {
                setError(error)
                redirect('/login')
            } finally {
                setLoading(false)
            }
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                redirect('/login')
            }
        })

        return () => subscription?.unsubscribe()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Private Page</h1>
            <p>Welcome {user?.email}</p>
        </div>
    )
}