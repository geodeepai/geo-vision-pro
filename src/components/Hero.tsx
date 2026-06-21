"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye, EyeOff, ArrowRight, Satellite, Map,
  BrainCircuit, TrendingUp, LayoutDashboard, LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/AuthProvider";

/* ── Left-side data ──────────────────────────────────────────────────── */
const FEATURES = [
  { Icon: Satellite,    color: "#2563eb", text: "Satellite & Remote Sensing Analytics" },
  { Icon: Map,          color: "#059669", text: "GIS Mapping & Spatial Intelligence" },
  { Icon: BrainCircuit, color: "#7c3aed", text: "AI-Powered Geospatial Processing" },
  { Icon: TrendingUp,   color: "#d97706", text: "LULC Change Detection & Monitoring" },
];

const STATS = [
  { value: "500+",  label: "Projects" },
  { value: "92.4%", label: "Accuracy" },
  { value: "15+",   label: "Years" },
  { value: "12+",   label: "States" },
];

const MARQUEE_ITEMS = [
  "Remote Sensing", "GIS Analytics", "Drone Mapping", "AI Geo-Analytics",
  "LULC Analysis", "Google Earth Engine", "Sentinel-2", "LiDAR",
  "ArcGIS Pro", "UAV Surveys", "STAAD Pro", "Structural Engineering",
];

/* ── Google icon SVG ─────────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"/>
    </svg>
  );
}

/* ── Marquee ─────────────────────────────────────────────────────────── */
function MarqueeStrip() {
  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "var(--section-alt)",
        borderTop: "1px solid var(--divider)",
        maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)",
        WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)",
      }}
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--muted)" }}>
            <span className="text-blue-400 opacity-60" style={{ fontSize: 8 }}>✦</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Login / Welcome panel ───────────────────────────────────────────── */
function LoginPanel() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [error,    setError]    = useState("");
  const [focusEl,  setFocusEl]  = useState<"email"|"pw"|null>(null);

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const sb = createClient();
      const { error: err } = await sb.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); setLoading(false); }
      else { router.push("/profile"); router.refresh(); }
    } catch { setError("Unable to connect. Please try again."); setLoading(false); }
  }

  async function handleGoogle() {
    setGLoading(true);
    try {
      const sb = createClient();
      await sb.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/profile` },
      });
    } catch { setGLoading(false); }
  }

  async function handleSignOut() {
    const sb = createClient();
    await sb.auth.signOut();
    router.refresh();
  }

  /* Loading skeleton */
  if (authLoading) {
    return (
      <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
        {[44, 28, 52, 52, 44].map((h, i) => (
          <div key={i} className="rounded-xl animate-pulse" style={{ height: h, background: "var(--section-alt)" }} />
        ))}
      </div>
    );
  }

  /* Already logged in */
  if (user) {
    const initials = (user.user_metadata?.full_name as string)
      ? (user.user_metadata.full_name as string).split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
      : (user.email?.[0] ?? "U").toUpperCase();

    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl p-8 flex flex-col items-center text-center gap-5"
        style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "0 8px 40px rgba(15,23,42,0.08)" }}
      >
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
          {initials}
        </div>
        <div>
          <p className="font-black text-lg" style={{ color: "var(--heading)" }}>
            {(user.user_metadata?.full_name as string) || "Welcome back!"}
          </p>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{user.email}</p>
        </div>
        <div
          className="w-full h-px"
          style={{ background: "var(--divider)" }}
        />
        <p className="text-sm leading-relaxed" style={{ color: "var(--body-text)" }}>
          You&apos;re signed in. Head to your dashboard to access your projects, courses, and geospatial tools.
        </p>
        <Link
          href="/profile"
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 6px 20px rgba(37,99,235,0.30)" }}
        >
          <LayoutDashboard size={16} /> Go to Dashboard
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
          style={{ background: "var(--section-alt)", color: "var(--body-text)", border: "1px solid var(--card-border)" }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </motion.div>
    );
  }

  /* Login form */
  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px 11px 42px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 500,
    outline: "none",
    background: "var(--section-alt)",
    color: "var(--heading)",
    transition: "border-color 0.18s",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "0 8px 48px rgba(15,23,42,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
        padding: "clamp(1.5rem,4vw,2.5rem)",
      }}
    >
      {/* Header */}
      <div className="mb-7">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm" style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
            <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
        </div>
        <h2 className="text-2xl font-black" style={{ color: "var(--heading)" }}>Welcome back</h2>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Sign in to your GeoVisionPro account</p>
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogle}
        disabled={gLoading}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 mb-5 disabled:opacity-60"
        style={{
          background: "var(--section-bg)",
          border: "1.5px solid var(--card-border)",
          color: "var(--heading)",
          boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
        }}
      >
        {gLoading ? <span className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" /> : <GoogleIcon />}
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
        <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--muted)" }}>or</span>
        <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
      </div>

      <form onSubmit={handleSignIn} className="flex flex-col gap-4">

        {/* Email */}
        <div>
          <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--body-text)" }}>
            Email address
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--muted)" }}>
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <input
              type="email"
              value={email}
              required
              placeholder="you@company.com"
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusEl("email")}
              onBlur={() => setFocusEl(null)}
              style={{ ...inputBase, border: `1.5px solid ${focusEl === "email" ? "#2563eb" : "var(--card-border)"}`, boxShadow: focusEl === "email" ? "0 0 0 3px rgba(37,99,235,0.10)" : "none" }}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: "var(--body-text)" }}>
            Password
          </label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--muted)" }}>
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              required
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusEl("pw")}
              onBlur={() => setFocusEl(null)}
              style={{ ...inputBase, paddingRight: 44, border: `1.5px solid ${focusEl === "pw" ? "#2563eb" : "var(--card-border)"}`, boxShadow: focusEl === "pw" ? "0 0 0 3px rgba(37,99,235,0.10)" : "none" }}
            />
            <button
              type="button"
              onClick={() => setShowPw(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
              style={{ color: "var(--muted)" }}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="w-3.5 h-3.5 rounded accent-blue-600"
            />
            <span className="text-xs font-medium" style={{ color: "var(--body-text)" }}>Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            Forgot password?
          </Link>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl px-4 py-3 text-sm font-medium"
              style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg,#2563eb,#4f46e5)",
            boxShadow: "0 6px 20px rgba(37,99,235,0.32)",
          }}
        >
          {loading
            ? <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Signing in…</>
            : <><span>Sign In</span><ArrowRight size={15} /></>
          }
        </button>
      </form>

      {/* Sign up */}
      <p className="text-center text-sm mt-5" style={{ color: "var(--muted)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Create one →
        </Link>
      </p>
    </motion.div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      aria-label="GeoVisionPro hero"
      className="relative flex flex-col"
      style={{ background: "var(--section-bg)" }}
    >
      {/* Subtle background decorations */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%)", filter: "blur(60px)", transform: "translate(-30%,-30%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)", filter: "blur(60px)", transform: "translate(30%,30%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle,rgba(37,99,235,0.045) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 pt-20 sm:pt-24 lg:pt-28 pb-12 min-h-[100svh] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── LEFT: Marketing ─────────────────────────────────────────── */}
        <motion.div
          className="order-2 lg:order-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7 w-fit" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-blue-700">
              Trusted by 120+ Organizations
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-[1.06] tracking-tight mb-5"
            style={{ fontSize: "clamp(2rem,4.5vw,4rem)", color: "var(--heading)" }}
          >
            Your Geospatial
            <br />
            <span style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Intelligence
            </span>
            <br />
            Platform
          </h1>

          {/* Sub */}
          <p className="text-base lg:text-lg leading-relaxed mb-9 max-w-md" style={{ color: "var(--body-text)" }}>
            AI-powered remote sensing, GIS analytics, and geospatial consultancy — transforming satellite data into strategic decisions.
          </p>

          {/* Feature list */}
          <ul className="flex flex-col gap-3.5 mb-10">
            {FEATURES.map(({ Icon, color, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: "var(--body-text)" }}>{text}</span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-6" style={{ borderTop: "1px solid var(--divider)" }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-black leading-none text-blue-600">{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Login ─────────────────────────────────────────────── */}
        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
        >
          {/* Offset glow decoration */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl pointer-events-none" style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.07),rgba(124,58,237,0.05))", filter: "blur(20px)" }} />
            <div className="relative">
              <LoginPanel />
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Tech marquee ──────────────────────────────────────────────── */}
      <MarqueeStrip />
    </section>
  );
}
