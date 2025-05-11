"use client"

import { useState } from "react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Supabase will have the access token in the URL fragment after the user clicks the email link
      // The supabase-js client will pick it up automatically
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setMessage(error.message || "Failed to reset password.");
      } else {
        setMessage("Password reset successful! You can now sign in.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${montserrat.variable} font-sans flex items-center justify-center min-h-screen bg-black`}> 
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700"
      >
        <h2 className="text-center text-3xl font-extrabold text-white mb-6">
          Reset your password
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter your new password below.
        </p>
        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              /success|reset/i.test(message)
                ? "bg-green-800 text-green-200"
                : "bg-red-800 text-red-200"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold shadow-lg hover:from-purple-500 hover:to-indigo-500 transition"
          >
            {loading ? "Resetting…" : "Reset password"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          <Link href="/login" className="text-purple-400 hover:text-purple-300">
            Back to sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
} 