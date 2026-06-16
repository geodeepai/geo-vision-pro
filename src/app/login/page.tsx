"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import AuthPanel from "@/components/AuthPanel";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [errors, setErrors]       = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) {
      e.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!password) {
      e.password = "Password is required.";
    } else if (password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setErrors({ form: "Sign-in isn't configured yet. Please contact the site admin." });
      return;
    }
    setErrors({});
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErrors({ form: error.message });
      return;
    }
    setSubmitted(true);
    const redirect = searchParams.get("redirect");
    router.push(redirect || "/profile");
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr]">

      {/* ── Left decorative panel ───────────────────────────────────────── */}
      <AuthPanel />

      {/* ── Right: form panel ───────────────────────────────────────────── */}
      <div className="flex flex-col bg-white min-h-screen">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">GeoVision<span className="text-blue-600">Pro</span></span>
          </Link>
          <Link
            href="/"
            className="hidden lg:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to site
          </Link>
          <span className="text-sm text-slate-500">
            New here?{" "}
            <Link href="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Create an account
            </Link>
          </span>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">

            {submitted ? (
              /* ── Success state ──────────────────────────────────────── */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back!</h2>
                <p className="text-slate-500 mb-6">You have signed in successfully.</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all"
                >
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              /* ── Sign in form ────────────────────────────────────────── */
              <>
                {/* Heading */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 mb-1">Sign In</h1>
                  <p className="text-slate-500 text-sm mt-2">Already have an account?</p>
                  <p className="text-slate-400 text-sm">
                    Enter your email address and password{" "}
                    <span className="text-slate-500">(Credentials are case sensitive).</span>
                  </p>
                </div>

                {/* Required note */}
                <p className="text-xs text-slate-400 mb-6">
                  <span className="text-red-500 font-semibold">*</span> indicates a required field.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {errors.form && (
                    <p className="px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                      {errors.form}
                    </p>
                  )}

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Email Address<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm placeholder:text-slate-400 transition-all bg-slate-50 focus:bg-white ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="5" stroke="#ef4444" strokeWidth="1.2" />
                          <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="6" cy="8.5" r="0.6" fill="#ef4444" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                        Password<span className="text-red-500 ml-0.5">*</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPass ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                        placeholder="Enter your password"
                        className={`w-full px-4 py-3 pr-11 rounded-xl border text-slate-800 text-sm placeholder:text-slate-400 transition-all bg-slate-50 focus:bg-white ${
                          errors.password
                            ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-100"
                            : "border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label={showPass ? "Hide password" : "Show password"}
                      >
                        {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="5" stroke="#ef4444" strokeWidth="1.2" />
                          <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="6" cy="8.5" r="0.6" fill="#ef4444" />
                        </svg>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Submit row */}
                  <div className="flex items-center gap-4 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5 disabled:translate-y-0"
                    >
                      {loading && <Loader2 size={15} className="animate-spin" />}
                      Sign In
                    </button>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline underline-offset-2"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400 font-medium">OR</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Register CTA */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-700 mb-4">Not a registered user yet?</p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Create an account
                  </Link>
                </div>

              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>&copy; 2025 GeoVision Pro</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-600 transition-colors">Help</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
