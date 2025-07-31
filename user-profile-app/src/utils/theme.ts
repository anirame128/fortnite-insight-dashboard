<think>
Okay, let me see. The user wants me to modify the theme.ts file to handle theme switching and persistence. The current content is empty, so I need to create the necessary functions from scratch.

First, I need to figure out the structure. The task mentions using localStorage to persist the theme. So the plan is to have functions that can set, toggle, and initialize the theme based on user preference or system settings.

The initTheme function should check localStorage first. If there's a saved theme, apply it. If not, check the system's preferred color scheme. That makes sense because users might have a system-wide dark mode setting.

Next, the setTheme function will apply the theme by adding the appropriate class to the HTML element. I'll need to make sure that when setting a theme, the opposite class is removed. For example, adding 'dark' and removing 'light' when switching to dark mode.

The toggleTheme function should switch between light and dark themes. To do that, I'll need a helper function to determine the current theme by checking the HTML element's classes. That helper function, getCurrentTheme, will return 'light' or 'dark' based on the presence of the respective class.

I should also consider TypeScript types. The theme can only be 'light' or 'dark', so using a union type there. The localStorage.getItem might return a string or null, so I'll cast it appropriately.

Wait, in the initTheme function, when getting the saved theme, I need to handle the case where it's null. If it's not saved, fall back to the system preference. That's covered in the else clause.

Testing edge cases: What if the user has both classes applied? The helper function will default to 'light' if 'dark' isn't present. But since the setTheme function ensures only one class is applied, this shouldn't happen during normal operation.

Also, when setting the theme, the localStorage is updated. That way, on page reload, the initTheme function can retrieve the saved preference.

Putting it all together, the functions should be exported so other parts of the app can use them. The helper function getCurrentTheme is internal, so it's not exported.

I think that's all. Let me write the code accordingly.
</think>

```ts
export function initTheme() {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(systemPrefersDark ? 'dark' : 'light');
  }
}

export function setTheme(theme: 'light' | 'dark'): void {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
  } else {
    html.classList.add('light');
    html.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
}

export function toggleTheme(): void {
  const currentTheme = getCurrentTheme();
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function getCurrentTheme(): 'light' | 'dark' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
```