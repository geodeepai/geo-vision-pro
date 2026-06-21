"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail]       = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError("Email address is required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError("Password reset isn't configured yet. Please contact the site admin.");
      return;
    }
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Minimal header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            DeepEarth<span className="text-blue-600">Science</span>
          </span>
        </Link>
        <Link href="/login" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft size={15} />
          Back to Sign In
        </Link>
      </header>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 p-8 md:p-10">

          {sent ? (
            /* ── Success state ───────────────────────────────────────── */
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5">
                <Mail size={28} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox</h2>
              <p className="text-slate-500 text-sm mb-1">We sent a password reset link to</p>
              <p className="text-slate-800 font-semibold text-sm mb-6">{email}</p>
              <p className="text-xs text-slate-400 mb-6">
                Didn&apos;t receive it? Check your spam folder, or{" "}
                <button onClick={() => setSent(false)} className="text-blue-600 hover:underline font-medium">
                  try again
                </button>
                .
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
              >
                <ArrowLeft size={15} /> Back to Sign In
              </Link>
            </div>
          ) : (
            /* ── Request form ────────────────────────────────────────── */
            <>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-slate-900 mb-1">Forgot your password?</h1>
              <p className="text-slate-500 text-sm mb-7">
                No problem. Enter your registered email and we&apos;ll send you a secure link to reset it.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="fp-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email Address<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="fp-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm placeholder:text-slate-400 bg-slate-50 focus:bg-white transition-all ${
                      error
                        ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
                    }`}
                  />
                  {error && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="#ef4444" strokeWidth="1.2" />
                        <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="6" cy="8.5" r="0.6" fill="#ef4444" />
                      </svg>
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5 disabled:translate-y-0"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Send Reset Link
                </button>

              </form>

              <div className="flex items-center gap-4 my-7">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400">OR</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="flex flex-col gap-2.5 text-sm text-center">
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Back to Sign In
                </Link>
                <span className="text-slate-400">
                  No account yet?{" "}
                  <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Create one for free
                  </Link>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="py-5 text-center text-xs text-slate-400">
        &copy; 2025 Deep Earth Science &nbsp;·&nbsp;
        <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy</Link>
        &nbsp;·&nbsp;
        <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms</Link>
      </footer>
    </div>
  );
}
