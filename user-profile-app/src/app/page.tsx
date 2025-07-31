<think>
Okay, let's tackle this task. The user wants to update the page component to use dark mode variants for UI elements. The current code is in a Next.js page using TypeScript. 

First, I need to figure out how dark mode is usually handled in Next.js with Supabase. Maybe they're using a theme provider or some state management. Since the existing code checks the user and redirects, maybe the HomeContent component has UI elements that need to adapt.

The task mentions using dark mode variants. So, perhaps the HomeContent component uses a UI library like Tailwind CSS or something else. If Tailwind is used, maybe they have a dark mode class applied conditionally. But how to integrate that here?

Wait, the current code doesn't seem to handle theme state. Maybe there's a way to get the theme from Supabase auth metadata? Or perhaps there's a custom solution. Since the user mentions "dark mode variants for any UI elements," maybe the HomeContent component needs to receive a prop indicating the theme.

Alternatively, maybe the app uses Next.js' built-in dark mode support or a context provider. Since the user didn't mention existing code for that, perhaps I need to add a theme toggle or pass a theme prop.

Wait, the task says to "use the dark mode variants for any UI elements that should change appearance based on the theme." So maybe the existing HomeContent component is using a UI library that supports variants, and the page needs to pass down the theme preference.

But how to determine the current theme? If the app uses a global context, maybe I can access it. However, since this is an async component, using React context directly isn't possible. Maybe the theme is stored in the browser's localStorage or a cookie, but in an async server component, accessing that might not be straightforward.

Alternatively, maybe the Supabase user has a metadata field indicating their theme preference. The current code checks the user, so perhaps we can fetch the user's metadata and determine the theme from there.

Looking at the existing code: the Home function is async, creates a Supabase client, checks the user. If the user exists, redirect. Otherwise, render HomeContent.

So, perhaps we can fetch the user's metadata here. Let me check the Supabase auth.getUser() response. The data includes the user object, which has user_metadata. If the app stores the theme preference there, we can use that.

So, modifying the code to get the user's metadata (if they are logged in?), but wait, in the current code, if the user is logged in, they are redirected to /dashboard. So in the Home component, the user is not logged in. Therefore, maybe the dark mode here is for the guest view, and perhaps the theme is determined by the browser's preference or a cookie.

Hmm. Maybe the HomeContent component is using a UI library that automatically adapts to the system's dark mode. But the task says to "use the dark mode variants," which might imply that the component needs to be told explicitly.

Alternatively, maybe the app uses a global state or a provider that's not shown here. Since the user hasn't provided that info, perhaps the correct approach is to pass a dark mode prop based on some condition.

Wait, but the task says to update the page component. The page component is the one rendering HomeContent. So perhaps the HomeContent component expects a 'dark' prop or something similar. Let me check the existing HomeContent. Since I can't see it, I have to assume.

Assuming that HomeContent has elements that need to switch between light and dark themes, maybe the page component should pass a 'dark' prop based on some logic.

But how to determine that in the server component? If it's based on the system's preference, we can't do that server-side directly. Unless we use a cookie or a server action.

Alternatively, maybe the app uses a client-side theme toggle. But since this is a server component, integrating that might require a client component.

Wait, the current page is an async server component. If the dark mode is determined on the client side, then passing it down from server might not be straightforward. This is getting complicated.

Alternatively, maybe the task is simpler. The user might be using a UI library where components have a variant prop, like 'dark' or 'light'. For example, if HomeContent uses buttons or cards that need to switch, the page can pass a 'variant' prop.

But how to know when to use dark? Maybe the app has a default dark mode when not logged in. But that's an assumption.

Alternatively, perhaps the task is expecting to use the system's color scheme. In that case, the server can't know that, but we can inject a script to set a class on the document, but that's client-side.

Hmm. The user might be expecting a solution that uses a theme provider or something. But given the current code, maybe the correct approach is to add a 'dark' class to the body or something, but in Next.js, that's handled by the app directory's layout.

Wait, the file is page.tsx in the app directory. If the app uses the new Next.js 13+ app directory, maybe the layout has a theme provider. But without seeing that, perhaps the task is to modify the HomeContent to use dark mode variants based on some condition.

Alternatively, perhaps the task is to use Tailwind's dark mode classes. If the app is set up for Tailwind with dark mode, then adding the 'dark' class to the body would suffice. But since this is a server component, maybe the HomeContent is a client component that uses the useTheme hook.

But the current code doesn't show any of that. Maybe the task is to add a prop to HomeContent to indicate dark mode. For example, if the user is not logged in, maybe the default is dark mode, or based on some logic.

Wait, the original code redirects to /dashboard if the user is logged in. So the Home page is for unauthenticated users. Maybe the app wants the unauthenticated UI to use dark mode by default. So, in the return statement, when rendering HomeContent, pass a prop like dark={true} or dark={someCondition}.

But how to determine that condition? If the task is to just apply dark mode variants, maybe the answer is to pass a dark prop to HomeContent. For example:

return <HomeContent dark />

But that's assuming that HomeContent has a 'dark' prop that changes its appearance. However, without knowing the actual implementation of HomeContent, this is speculative.

Alternatively, maybe the HomeContent component is using a UI library's components that have dark variants, and the page needs to set the theme context. But again, without knowing the setup, it's hard.

Given the task's ambiguity, the best approach is to modify the HomeContent rendering to include a dark mode variant. For example, if using a component library that supports it, or adding a class.

Since the user says "dark mode variants for any UI elements," perhaps the correct code is to pass a dark prop to HomeContent. Let me proceed with that.

So, modifying the return statement from:

return <HomeContent />

to something like:

return <HomeContent isDarkMode />

Assuming that HomeContent uses that prop to apply dark styles. But how to determine isDarkMode? If the task doesn't specify, maybe it's a static change. However, that's not dynamic. Alternatively, maybe the app has a default dark mode for the home page.

Alternatively, perhaps the task expects using the system's preference. Since the server can't read that, but the client can, maybe the HomeContent component itself checks the system's preference. But the task says to update the page component, so maybe the page needs to pass a prop based on some server-side logic.

But without more info, perhaps the answer is to add a dark prop to HomeContent. Let me check the original code again.

Original code:

return <HomeContent />

So, modifying that to pass a dark prop. But how to determine the value? If the task says to "use dark mode variants," maybe the answer is to set it to true. For example:

return <HomeContent darkMode={true} />

But again, this depends on how HomeContent is implemented. Since the user hasn't provided that, I have to assume that HomeContent expects a prop to enable dark mode.

Alternatively, maybe the app uses a theme provider in a parent component, and this page doesn't need changes. But the task says to update the page component.

Another possibility: the user wants to use the Supabase user's metadata to determine the theme. But since in this component, the user is not logged in (because if they were, they'd be redirected), maybe that's not applicable.

Hmm. Given all this, perhaps the correct answer is to add a dark prop to HomeContent, assuming that the component uses it. For example:

return <HomeContent isDark />

But the exact prop name depends on the component's design. Alternatively, maybe the component uses a className with dark mode Tailwind classes.

Alternatively, maybe the task is to apply a dark class to the body or html element. But in Next.js app directory, that's handled in the layout.

Given the uncertainty, I'll proceed with adding a prop to HomeContent to enable dark mode, as that's the most straightforward way the page component can influence the UI's theme.
</think>

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import HomeContent from '@/components/HomeContent'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return <HomeContent isDarkMode />
}