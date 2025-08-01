'use client'

import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:contact@example.com',
      icon: Mail,
    },
  ]

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
                aria-label={link.name}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}