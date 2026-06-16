"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import AuthPanel from "@/components/AuthPanel";
import { createClient } from "@/lib/supabase/client";

const interests = [
  "Google Earth Engine (GEE)",
  "ArcGIS Pro & ArcMap",
  "AutoCAD for Civil & Survey",
  "STAAD Pro Structural Analysis",
  "AI & Machine Learning",
  "Remote Sensing Fundamentals",
  "Remote Sensing Consultancy",
  "LULC Analysis & Mapping",
  "Other",
];

type Fields = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  password: string;
  confirm: string;
  agree: boolean;
};
type Errors = Partial<Record<keyof Fields, string>> & { form?: string };

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [f, setF] = useState<Fields>({
    name: "", email: "", phone: "", interest: "", password: "", confirm: "", agree: false,
  });
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors]         = useState<Errors>({});
  const [loading, setLoading]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: (e.target as HTMLInputElement).type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  function validate(): Errors {
    const e: Errors = {};
    if (!f.name.trim())   e.name     = "Full name is required.";
    if (!f.email.trim())  e.email    = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Please enter a valid email.";
    if (!f.interest)      e.interest = "Please select an area of interest.";
    if (!f.password)      e.password = "Password is required.";
    else if (f.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (f.password !== f.confirm)   e.confirm  = "Passwords do not match.";
    if (!f.agree)                   e.agree    = "You must accept the terms to continue.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setErrors({ form: "Account creation isn't configured yet. Please contact the site admin." });
      return;
    }
    setErrors({});
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: f.email,
      password: f.password,
      options: { data: { full_name: f.name, phone: f.phone, interest: f.interest } },
    });
    setLoading(false);
    if (error) {
      setErrors({ form: error.message });
      return;
    }
    if (data.session) {
      router.push(searchParams.get("redirect") || "/profile");
      return;
    }
    setSubmitted(true);
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="#ef4444" strokeWidth="1.2" />
          <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="6" cy="8.5" r="0.6" fill="#ef4444" />
        </svg>
        {errors[k]}
      </p>
    ) : null;

  const inputCls = (k: keyof Fields) =>
    `w-full px-4 py-3 rounded-xl border text-slate-800 text-sm placeholder:text-slate-400 transition-all bg-slate-50 focus:bg-white ${
      errors[k]
        ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-100"
        : "border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
    }`;

  const redirect = searchParams.get("redirect");
  const loginHref = redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login";

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr]">

      <AuthPanel />

      <div className="flex flex-col bg-white min-h-screen">

        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
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
          <Link href="/" className="hidden lg:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={15} /> Back to site
          </Link>
          <span className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link href={loginHref} className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Sign In</Link>
          </span>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-start justify-center px-8 py-10 overflow-y-auto">
          <div className="w-full max-w-md">

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created!</h2>
                <p className="text-slate-500 mb-2">Welcome to GeoVision Pro, {f.name.split(" ")[0]}.</p>
                <p className="text-sm text-slate-400 mb-6">Check your inbox to verify your email address.</p>
                <Link href={loginHref} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all">
                  Sign In Now
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h1 className="text-3xl font-bold text-slate-900 mb-1">Create Account</h1>
                  <p className="text-slate-500 text-sm">Join GeoVision Pro to access all courses and consultancy services.</p>
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  <span className="text-red-500 font-semibold">*</span> indicates a required field.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                  {errors.form && (
                    <p className="px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                      {errors.form}
                    </p>
                  )}

                  {/* Full name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Full Name<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input id="name" type="text" autoComplete="name" value={f.name} onChange={set("name")}
                      placeholder="Your full name" className={inputCls("name")} />
                    {err("name")}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="reg-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Email Address<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input id="reg-email" type="email" autoComplete="email" value={f.email} onChange={set("email")}
                      placeholder="you@example.com" className={inputCls("email")} />
                    {err("email")}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Phone Number
                    </label>
                    <input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")}
                      placeholder="+91 XXXXX XXXXX" className={inputCls("phone")} />
                  </div>

                  {/* Area of interest */}
                  <div>
                    <label htmlFor="interest" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Area of Interest<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <select id="interest" value={f.interest}
                      onChange={(e) => { setF((p) => ({ ...p, interest: e.target.value })); setErrors((p) => ({ ...p, interest: undefined })); }}
                      className={`${inputCls("interest")} appearance-none`}
                    >
                      <option value="">Select a course or service</option>
                      {interests.map((opt) => <option key={opt}>{opt}</option>)}
                    </select>
                    {err("interest")}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="reg-password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Password<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input id="reg-password" type={showPass ? "text" : "password"} autoComplete="new-password"
                        value={f.password} onChange={set("password")} placeholder="Minimum 8 characters"
                        className={`${inputCls("password")} pr-11`} />
                      <button type="button" onClick={() => setShowPass((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {err("password")}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label htmlFor="confirm" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Confirm Password<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <input id="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password"
                        value={f.confirm} onChange={set("confirm")} placeholder="Re-enter your password"
                        className={`${inputCls("confirm")} pr-11`} />
                      <button type="button" onClick={() => setShowConfirm((p) => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {err("confirm")}
                  </div>

                  {/* Terms */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={f.agree}
                        onChange={(e) => { setF((p) => ({ ...p, agree: e.target.checked })); setErrors((p) => ({ ...p, agree: undefined })); }}
                        className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer flex-shrink-0" />
                      <span className="text-sm text-slate-600">
                        I agree to the{" "}
                        <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">Terms of Service</Link>
                        {" "}and{" "}
                        <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline">Privacy Policy</Link>
                      </span>
                    </label>
                    {err("agree")}
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 disabled:opacity-70 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5 disabled:translate-y-0 mt-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Create Account
                  </button>

                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                  Already have an account?{" "}
                  <Link href={loginHref} className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Sign In</Link>
                </p>
              </>
            )}
          </div>
        </div>

        <div className="px-8 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span>&copy; 2025 GeoVision Pro</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
