<think>
Okay, I need to apply dark mode classes to the login page to keep the app consistent. Let me look at the existing code.

First, the current file is a Next.js page using TypeScript and React. It uses Tailwind CSS for styling. The dark mode probably involves adding the 'dark' class or using dark mode utilities. But since the app might already be set up for dark mode, maybe I just need to ensure that the classes are compatible.

Looking at the existing classes, the background is set to 'bg-black' and there's a gradient from 'from-gray-900 to-black/80'. Maybe in dark mode, those colors are already handled. But perhaps I need to add the 'dark' class to elements so that Tailwind's dark mode applies. Wait, if the app uses a provider or a config for dark mode, maybe I don't need to add the 'dark' class manually. Let me think.

Wait, the current code has a div with 'bg-black' and 'bg-gray-900/70' for the form. Maybe the dark mode is already handled via Tailwind's class-based approach. But if the app uses a dark mode class like 'dark', then I should add that to the root elements. However, the existing code doesn't have any dark classes. So perhaps the task is to make sure that the login page uses the same dark mode classes as the rest of the app.

Looking at the current div structure, the main container has 'bg-black', and the form has 'bg-gray-900/70'. To make it consistent, maybe I should ensure that the background and text colors use Tailwind's dark mode classes. But if the app is already in dark mode, maybe the existing classes are sufficient. Alternatively, maybe the app uses a dark mode plugin, so the existing classes are correct.

Wait, the task says "apply the dark mode classes to the login page". So perhaps the rest of the app uses dark mode, and the login page needs to be adjusted to match. Let me check the existing classes again.

The main div has 'bg-black', which is a solid black. Maybe in dark mode, that's fine. The form has 'bg-gray-900/70' with a backdrop blur. The text is white. The button uses purple and indigo colors. The links are purple. Maybe the existing code is already dark-themed, but perhaps there are elements that need adjustment.

Wait, maybe the task is to ensure that when dark mode is toggled, the login page adjusts accordingly. If the app uses Tailwind's dark mode, then adding the 'dark' class to the root element would apply the dark styles. But in the current code, there's no 'dark' class. Let me check the Tailwind configuration. Since I don't have that, I'll assume that the app uses class-based dark mode, so I need to add 'dark:' prefixes to relevant classes.

But looking at the current code, maybe the app is already in dark mode, so the existing classes are correct. However, perhaps some elements need to be adjusted. For example, the input fields have 'bg-gray-800'—maybe in dark mode, that's correct. The border is 'gray-700', which is a dark color. The placeholder is gray-500. The focus ring uses purple-600, which is a color that works in dark mode.

Alternatively, maybe the task is to make sure that the login page uses the same dark mode as other pages. Since the current code already uses dark colors, perhaps there's nothing to change. But maybe there are some elements that need to be adjusted for better contrast or consistency.

Wait, the task says "apply the dark mode classes to the login page to maintain consistency across the application." So perhaps other pages use Tailwind's dark mode, and the login page needs to be updated to use the same approach. For example, if other pages use the 'dark' class and dark mode utilities, the login page should do the same.

Looking at the current code, the main container has a fixed 'bg-black', but maybe in dark mode, that's handled via a class. However, if the app is using a dark mode provider, perhaps the 'dark' class is already applied to the HTML body, and the login page should use Tailwind's dark utilities.

But without knowing the exact setup, maybe the solution is to add the 'dark' class to the main container and use dark-specific classes where necessary. However, the current code doesn't have any dark classes. Let me think again.

Alternatively, maybe the existing code is already dark-themed, and the task is to ensure that when dark mode is enabled, the login page adjusts. If the app uses Tailwind's dark mode with the 'class' strategy, then adding the 'dark' class to the root element would apply the dark styles. But in the current code, there's no 'dark' class. So perhaps the solution is to add the 'dark' class to the main div and adjust the classes accordingly.

Wait, the current code has a div with 'bg-black' and a gradient from 'from-gray-900 to-black/80'. These are dark colors. The text is white. The inputs have 'text-white' and 'placeholder-gray-500'. The buttons use purple and indigo colors. So the page is already styled for dark mode. Maybe the task is to ensure that the dark mode is applied via Tailwind's dark mode classes, so that when the app's dark mode is toggled, the login page responds accordingly.

In that case, perhaps the existing code uses hardcoded light colors, and needs to be updated to use Tailwind's dark mode classes. For example, instead of 'bg-black', use 'bg-gray-900' and then apply 'dark:bg-gray-800' if needed. Wait, but that's not clear. Alternatively, maybe the existing code is already correct, and the task is to apply the same dark mode classes as other pages.

Wait, perhaps the rest of the app uses Tailwind's dark mode, so the login page should use the 'dark' class and dark utilities. For example, if the app's body has a 'dark' class, then the login page should use classes like 'dark:bg-gray-800' instead of fixed 'bg-black'.

But in the current code, the main div has a fixed 'bg-black', which might not adapt if the dark mode is toggled. So to make it consistent, maybe replace some of the hardcoded colors with Tailwind's dark mode classes.

For example, change 'bg-black' to 'bg-white dark:bg-gray-900' if the app toggles between light and dark mode. But the task says "apply the dark mode classes to the login page to maintain consistency across the application." So perhaps the app is already in dark mode, and the login page needs to use the same dark classes.

But the current code already uses dark colors. Maybe the task is to ensure that the dark mode is applied via Tailwind's dark mode, so that when the app's dark mode is enabled, the login page is styled correctly. For example, using 'dark:bg-gray-900' instead of 'bg-black' if the app uses the class strategy for dark mode.

But without knowing the Tailwind config, it's hard to be precise. However, given the task, I'll assume that the app uses Tailwind's dark mode with the 'class' strategy, and the login page needs to have the 'dark' class applied where necessary.

Looking at the current code, the main container is:

<div className={`${montserrat.variable} font-sans relative flex items-center justify-center min-h-screen bg-black overflow-hidden`}> 

Maybe this should have 'bg-gray-50 dark:bg-gray-900' if the app toggles between light and dark. But the task says to apply dark mode classes to maintain consistency. If the rest of the app is dark, perhaps the login page should use dark mode classes.

Alternatively, maybe the existing code is correct, and the task is to add the 'dark' class to the main container. But the current code doesn't have that. Let me think again.

The task says "apply the dark mode classes to the login page to maintain consistency across the application." So perhaps other pages use Tailwind's dark mode, and the login page needs to be updated to use the same approach. For example, adding the 'dark' class to the body or using dark-specific classes.

But in the current code, there's no 'dark' class. So maybe the solution is to add the 'dark' class to the main container and adjust the classes accordingly. However, the current code uses 'bg-black', which is a dark color. If the app uses a dark mode provider, then maybe the 'dark' class is already applied to the HTML, and the login page should use Tailwind's dark utilities.

Alternatively, perhaps the login page should use the same dark mode classes as other components. For example, using 'bg-gray-900' instead of 'bg-black' to match other dark-themed components.

But without more context, I'll proceed to adjust the code to use Tailwind's dark mode classes where applicable. For example, changing 'bg-black' to 'dark:bg-gray-900' if the app uses the class strategy. However, since the current code is already using dark colors, maybe the task is to ensure that the dark mode is applied via the 'dark' class.

Wait, perhaps the existing code is already in dark mode, but some elements need to be adjusted. For example, the input fields have 'bg-gray-800'—maybe in dark mode, that's correct. The button uses a gradient from purple-600 to indigo-600, which should be fine.

Alternatively, maybe the task is to add the 'dark' class to the main container and use dark mode classes for background and text. For example:

Change 'bg-black' to 'bg-white dark:bg-gray-900' if the app supports both light and dark modes. But if the app is strictly dark mode, then 'bg-black' is fine.

Given the ambiguity, I'll assume that the app uses Tailwind's dark mode with the 'class' strategy and that the login page should use the 'dark' class. Therefore, I'll modify the main container's background to use dark mode classes.

Original line:

<div className={`${montserrat.variable} font-sans relative flex items-center justify-center min-h-screen bg-black overflow-hidden`}> 

Change to:

<div className={`${montserrat.variable} font-sans relative flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden`}> 

But if the app is strictly dark, maybe it's better to use 'dark:bg-gray-900' but have the default as 'bg-gray-900'? Or maybe the app is already in dark mode, so the 'dark' class is applied elsewhere, and the login page should use dark-specific classes.

Alternatively, maybe the existing code is correct, and the task is to ensure that the dark mode classes are applied consistently. For example, the form's background is 'bg-gray-900/70', which is already dark. The text is white. The links are purple-400, which is a dark-friendly color.

Perhaps the only change needed is to add the 'dark' class to the main container if it's missing. But since the current code uses 'bg-black', which is a dark color, maybe the task is already done. However, the task says to apply dark mode classes, so maybe the existing code is not using Tailwind's dark mode and needs to be adjusted.

Another possibility: the app uses a dark mode provider, and the login page should use the 'dark' class on the main container. For example, adding 'dark' to the div's class.

But the current code doesn't have that. So perhaps adding the 'dark' class to the main container. However, that would apply dark styles if the app's dark mode is enabled.

Wait, Tailwind's dark mode can be set up with the 'class' strategy, where you add the 'dark' class to the HTML. If the login page is a client component, maybe it's already within a provider that adds the 'dark' class. Therefore, the login page should use Tailwind's dark utilities.

For example, instead of 'bg-black', use 'bg-white dark:bg-gray-900' if the background should be white in light mode and dark in dark mode. But if the app is strictly dark, then 'bg-gray-900' is sufficient.

Since the task is to apply dark mode classes to maintain consistency, and assuming that other pages use Tailwind's dark mode, I'll adjust the login page to use dark mode classes where necessary.

For example, the main container's background should be 'bg-gray-50 dark:bg-gray-900' if it's supposed to adapt to light/dark mode. But if the app is strictly dark, then 'bg-gray-900' is correct.

But the current code uses 'bg-black', which is a solid black. Maybe changing that to 'dark:bg-gray-900' if the app uses dark mode. However, without knowing the exact setup, it's challenging.

Given the ambiguity, I'll proceed to modify the main container's background to use dark mode classes. For example:

Original line:

bg-black

Change to:

bg-gray-900 dark:bg-gray-800

But I'm not sure. Alternatively, if the app is already in dark mode, maybe the existing classes are correct. Perhaps the task is to ensure that the dark mode is applied via Tailwind's dark mode, so adding the 'dark' class to the main container and using dark utilities.

But since the current code doesn't have the 'dark' class, maybe adding it. However, the main container is a div in the page, and if the app's body already has the 'dark' class, then the login page's elements should use Tailwind's dark utilities.

For example, changing 'bg-black' to 'bg-white dark:bg-gray-900' if the app supports both light and dark modes. But if the app is dark-only, then 'bg-gray-900' is sufficient.

Given that the task is to apply dark mode classes, I'll assume that the app uses Tailwind's dark mode with the 'class' strategy and that the login page should use dark utilities. Therefore, I'll adjust the background and other elements accordingly.

For example, the main container's background should be 'bg-white dark:bg-gray-900', but since the current code uses 'bg-black', maybe it's better to use 'bg-gray-900 dark:bg-gray-800' or similar.

But without knowing the exact desired outcome, I'll make the following changes:

1. Change the main container's background to use dark mode classes.
2. Ensure that text colors use dark mode classes where necessary.
3. Check other elements for consistency.

For example:

Original line:

<div className={`${montserrat.variable} font-sans relative flex items-center justify-center min-h-screen bg-black overflow-hidden`}> 

Change to:

<div className={`${montserrat.variable} font-sans relative flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden`}> 

This way, in light mode, it's gray-50, and in dark mode, it's gray-900. But if the app is strictly dark, maybe it's better to use 'bg-gray-900 dark:bg-gray-800' or similar.

However, the current code uses 'bg-black', which is a solid black. Maybe the task is to replace that with a more flexible dark mode class. For example, 'bg-gray-900 dark:bg-gray-800' if it's supposed to adapt. But if the app is dark-only, then 'bg-gray-900' is sufficient.

Alternatively, maybe the existing code is correct, and the task is to add the 'dark' class to the main container. But since the main container is a div inside the page, and assuming that the app's body has the 'dark' class, the login page's elements should use Tailwind's dark utilities.

In conclusion, I'll modify the main container's background to use dark mode classes and adjust other elements as needed. For example:

Change 'bg-black' to 'bg-white dark:bg-gray-900' if the app supports both light and dark modes. But if the app is dark-only, then 'bg-gray-900' is correct.

Given the task's instruction, I'll proceed to adjust the code to use dark mode classes where applicable, ensuring consistency with the rest of the app.
</think>

'use client'

import { Montserrat } from 'next/font/google'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, type LoginResponse } from './actions'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-hot-toast'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function LoginPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    let result: LoginResponse
    try {
      result = await login(formData)
    } catch {
      const errorMessage = 'Something went wrong. Please try again.'
      setMessage(errorMessage)
      toast.error(errorMessage)
      setLoading(false)
      return
    }

    setLoading(false)
    if (result.status === 'error') {
      setMessage(result.message)
      toast.error(result.message)
    } else {
      toast.success('Login successful!')
      router.push('/dashboard')
    }
  }

  return (
    <div className={`${montserrat.variable} font-sans relative flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden`}> 
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Sign in to your account
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message === 'Signed in successfully'
                ? 'bg-green-800 text-green-200'
                : 'bg-red-800 text-red-200'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-between">
            <Link href="/forgot-password" className="block w-full text-sm text-purple-400 hover:text-purple-300 text-right mb-2">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 transition"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}