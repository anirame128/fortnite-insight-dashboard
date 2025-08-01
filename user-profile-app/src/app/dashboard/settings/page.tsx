<think>
Okay, I need to create a new settings page for a user profile in a Next.js app using App Router, Tailwind CSS v4, and React with SSR support. The file should be at `user-profile-app/src/app/dashboard/settings/page.tsx`. 

First, I'll start by setting up the basic structure of the page component. I'll import React and useState since I'll need state management for the form. I'll also need to use useEffect for handling side effects, like fetching initial data or updating the theme.

Since the app supports SSR, I should ensure that any client-side specific code is properly handled. I'll include 'use client' at the top to indicate this is a client component. 

Next, I'll set up the state variables for the form. I'll need username, email, bio, and theme. I'll initialize these states with default values, but in a real app, I might fetch this data from an API or a context provider.

For the form submission, I'll create a handleSubmit function that prevents the default action and logs the form data. Here, I'd typically send this data to an API endpoint, but for now, it's just a placeholder.

I'll structure the form with appropriate form groups for each input. Each input will have an onChange handler to update the state. I'll use Tailwind CSS classes for styling, ensuring that the dark mode is handled with CSS variables as per the guidelines. 

I'll include a dropdown for selecting the theme. The selected theme will be stored in state, and I'll update localStorage so the theme persists across sessions. 

I'll make sure the form is accessible by adding proper labels and using semantic HTML elements. I'll also handle validation by adding the 'required' attribute to necessary fields, though more robust validation might be needed later.

Finally, I'll structure the layout using Tailwind classes to ensure it looks good on all screen sizes. I'll use a responsive container and appropriate spacing to make the form user-friendly.

I need to ensure that all imports are correct and that I'm following the project's conventions. I'll avoid using the 'dark:' prefix in Tailwind classes and instead rely on CSS variables for theming. 

I'll also check that I'm not accessing any browser APIs outside of useEffect and that the component is properly exported as a default function. 

After writing the code, I'll review it to make sure it meets all the requirements and follows best practices for React, TypeScript, and Tailwind CSS v4.
</think>


'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select } from '@/components/ui';

interface SettingsPageProps {
  // Add any props needed
}

export default function SettingsPage({}: SettingsPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log({ username, email, bio, theme });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Form onSubmit={handleSubmit} className="space-y-6">
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="bio">Bio</Form.Label>
          <Input
            as="textarea"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio"
            className="w-full h-24"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="theme">Theme</Form.Label>
          <Select
            id="theme"
            value={theme}
            onChange={(e) => {
              const newTheme = e.target.value;
              setTheme(newTheme);
              localStorage.setItem('theme', newTheme);
            }}
            className="w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </Form.Group>

        <Button type="submit" className="w-full bg-blue-600 text-white py-2 px-4">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}