'use client'

import { Montserrat } from 'next/font/google'
import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { Menu, X, TrendingUp, Clock, Bell, User, ArrowUp } from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}
const cardHover = {
  hover: { scale: 1.05, boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }
}

export default function HomeContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const heroY = useTransform(scrollY, [0, 300], [0, 50])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`${montserrat.variable} font-sans bg-black text-white flex flex-col overflow-hidden`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-purple-500 to-indigo-500 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <header className={`sticky top-0 z-40 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-black/80 backdrop-blur-md'}`}>
        <div className="flex items-center justify-between px-6 py-4">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200"
          >
            Fortnite Insights
          </motion.h2>
          <nav className="hidden md:flex space-x-6">
            {['Features', 'Testimonials', 'Contact'].map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="relative font-medium text-gray-300 hover:text-white transition"
              >
                {link}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          <div className="hidden md:flex space-x-4">
            <motion.a
              href="/login"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="px-5 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition"
            >
              Log In
            </motion.a>
            <motion.a
              href="/signup"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.7 }}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-full font-semibold transition"
            >
              Sign Up
            </motion.a>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-black/95 backdrop-blur-md px-6 py-4 md:hidden"
        >
          <div className="flex flex-col space-y-3">
            {['Features', 'Testimonials', 'Contact'].map(link => (
              <button
                key={link}
                onClick={() => { scrollTo(link.toLowerCase()); setIsMenuOpen(false) }}
                className="text-gray-300 hover:text-white py-2 text-left"
              >
                {link}
              </button>
            ))}
            <a href="/signup" className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-center font-semibold">
              Sign Up
            </a>
          </div>
        </motion.nav>
      )}

      {/* Hero */}
      <motion.main
        style={{ y: heroY }}
        className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24 min-h-screen"
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-800 opacity-20 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-800 opacity-15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="relative text-6xl md:text-8xl font-extrabold mb-6 leading-tight"
        >
          Personal Fortnite Map Dashboard
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.9 }}
          className="relative max-w-3xl text-gray-300 text-lg mb-10"
        >
          Customize your profile, enter any creative map code, and unlock real-time & historical player stats with 30-day forecasts—all in one sleek interface.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1.0 }}
          className="relative flex flex-col sm:flex-row gap-6"
        >
          <a
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-semibold shadow-xl hover:from-purple-500 hover:to-indigo-500 transition"
          >
            Get Started
          </a>
          <button
            onClick={() => scrollTo('features')}
            className="px-8 py-4 border-2 border-indigo-500 rounded-full font-semibold text-indigo-300 hover:bg-indigo-500/20 transition"
          >
            Learn More
          </button>
        </motion.div>
      </motion.main>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-14"
        >
          Features at a Glance
        </motion.h2>
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div variants={cardHover} whileHover="hover" className="p-8 bg-gray-800/70 rounded-2xl backdrop-blur-sm">
            <User className="w-14 h-14 mx-auto text-purple-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Profile Management</h3>
            <p className="text-gray-400">Seamlessly update your display name and bio within your personal dashboard.</p>
          </motion.div>
          <motion.div variants={cardHover} whileHover="hover" className="p-8 bg-gray-800/70 rounded-2xl backdrop-blur-sm">
            <TrendingUp className="w-14 h-14 mx-auto text-indigo-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Live Map Insights</h3>
            <p className="text-gray-400">Input any Fortnite creative code to view live & historical player statistics.</p>
          </motion.div>
          <motion.div variants={cardHover} whileHover="hover" className="p-8 bg-gray-800/70 rounded-2xl backdrop-blur-sm">
            <Clock className="w-14 h-14 mx-auto text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">30-Day Forecasts</h3>
            <p className="text-gray-400">Leverage clear, easy-to-read projections of player trends for the next month.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-black">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.6 }} className="text-4xl font-bold text-center mb-14">
          What Players Say
        </motion.h2>
        <motion.div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}>
          {[
            { name: 'Alex G.', quote: 'This dashboard revolutionized how I track my favorite maps — the forecasts are spot on!' },
            { name: 'Jamie L.', quote: 'Instant insights and easy profile management make this tool a must-have for any creator.' }
          ].map((t, i) => (
            <motion.div variants={fadeInUp} key={i} className="p-8 bg-gray-800/60 rounded-2xl backdrop-blur-sm">
              <p className="italic text-gray-300 mb-4">“{t.quote}”</p>
              <p className="font-semibold text-white">— {t.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-t from-gray-900 to-black text-center">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.6 }} className="text-4xl font-bold mb-6">
          Ready to Dominate?
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" variants={fadeInUp} transition={{ duration: 0.8 }} className="text-gray-400 mb-8">
          Join thousands of players leveraging real-time data and forecasts to stay ahead in Fortnite creative.
        </motion.p>
        <motion.a
          href="/signup"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 1.0 }}
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-bold shadow-xl hover:from-purple-500 hover:to-indigo-500 transition"
        >
          Create Free Account
        </motion.a>
      </section>

      {/* Scroll To Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 transition"
      >
        <ArrowUp size={20} className="text-white" />
      </button>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 bg-black/90">
        <p>© 2025 Fortnite Insights. All rights reserved.</p>
      </footer>
    </div>
  )
}
