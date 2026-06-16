"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [status, setStatus]   = useState<"verifying" | "ready" | "invalid" | "success">("verifying");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setStatus("invalid");
      return;
    }
    const supabase = createClient();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setStatus("ready");
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus("ready");
    });

    const timeout = setTimeout(() => {
      setStatus((s) => (s === "verifying" ? "invalid" : s));
    }, 4000);

    return () => { listener.subscription.unsubscribe(); clearTimeout(timeout); };
  }, []);

  function validate() {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setStatus("success");
    setTimeout(() => router.push("/profile"), 1800);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
            GeoVision<span className="text-blue-600">Pro</span>
          </span>
        </Link>
        <Link href="/login" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft size={15} /> Back to Sign In
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 p-8 md:p-10">

          {status === "verifying" && (
            <div className="text-center py-6">
              <Loader2 size={28} className="animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Verifying your reset link…</p>
            </div>
          )}

          {status === "invalid" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                <AlertCircle size={28} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Link expired or invalid</h2>
              <p className="text-slate-500 text-sm mb-6">Password reset links expire after a short time. Request a new one.</p>
              <Link href="/forgot-password" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all">
                Request New Link
              </Link>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <ShieldCheck size={28} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Password updated!</h2>
              <p className="text-slate-500 text-sm">Taking you to your profile…</p>
            </div>
          )}

          {status === "ready" && (
            <>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Set a new password</h1>
              <p className="text-slate-500 text-sm mb-7">Choose a strong password you haven&apos;t used before.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && (
                  <p className="px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                    {error}
                  </p>
                )}
                <div>
                  <label htmlFor="new-password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    New Password<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showPass ? "text" : "password"}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      placeholder="Minimum 6 characters"
                      className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                    />
                    <button type="button" onClick={() => setShowPass((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Confirm Password<span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    id="confirm-password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                    placeholder="Re-enter your new password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-3 focus:ring-blue-100 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5 disabled:translate-y-0"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Update Password
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <footer className="py-5 text-center text-xs text-slate-400">
        &copy; 2025 GeoVision Pro
      </footer>
    </div>
  );
}
