"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, LogIn, LogOut, UserCircle2, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import {
  IconNews,
  IconArticle,
  IconVideo,
  IconHeadphones,
  IconPencil,
  IconMail,
  IconShare,
  IconPhoto,
  IconCalendarEvent,
  IconMapPin,
  IconHeartHandshake,
} from "@tabler/icons-react";

/* ── Data ────────────────────────────────────────────────────────── */
const SERVICE_LINKS = [
  { label: "Remote Sensing Consultancy",    href: "/consultancy" },
  { label: "LULC Analysis & Mapping",       href: "/lulc" },
  { label: "GIS & Spatial Analysis",        href: "/gis" },
  { label: "Drone & UAV Mapping",           href: "/drone" },
  { label: "AI-Powered Geo-Analytics",      href: "/ai-geo" },
  { label: "Structural & Civil Consulting", href: "/structural" },
];

const NEWS_LINKS = [
  { label: "Press Releases",        href: "/news#press-releases",    icon: IconNews,           desc: "Official announcements & media" },
  { label: "Recently Published",    href: "/news#recently-published", icon: IconArticle,        desc: "Latest research & articles" },
  { label: "GeoVision Video Series", href: "/news#videos",           icon: IconVideo,          desc: "Tutorials & case studies" },
  { label: "Podcasts & Webinars",   href: "/news#podcasts",          icon: IconHeadphones,     desc: "Expert talks & live sessions" },
  { label: "GIS Blogs",             href: "/news#blogs",             icon: IconPencil,         desc: "In-depth GIS & RS insights" },
  { label: "Newsletters",           href: "/news#newsletters",       icon: IconMail,           desc: "Monthly digest & updates" },
  { label: "Social Media",          href: "/news#social",            icon: IconShare,          desc: "Follow us across platforms" },
  { label: "Media Resources",       href: "/news#media",             icon: IconPhoto,          desc: "Press kit, logos & imagery" },
  { label: "Events & Conferences",  href: "/news#events",            icon: IconCalendarEvent,  desc: "Upcoming & past events" },
  { label: "Field Survey Updates",  href: "/news#field-updates",     icon: IconMapPin,         desc: "On-ground project reports" },
  { label: "Partner Program",       href: "/news#partners",          icon: IconHeartHandshake, desc: "Collaborate & grow with us" },
];

const LEARN_LINKS = [
  { label: "GeoVisionPro Academy", href: "/learn/academy" },
  { label: "Tutorials",            href: "/learn/tutorials" },
  { label: "Events",               href: "/learn/events" },
];

const NAV_LINKS = [
  { href: "#home",    label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#about",   label: "About" },
  { href: "#contact", label: "Contact" },
];

/* ── Hover-timer helper ──────────────────────────────────────────── */
function useDropdown() {
  const [open, setOpen]   = useState(false);
  const ref               = useRef<HTMLLIElement>(null);
  const timer             = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  const toggle= () => setOpen(p => !p);
  const close = () => setOpen(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return { open, ref, enter, leave, toggle, close };
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [svcMob,     setSvcMob]     = useState(false);
  const [newsMob,    setNewsMob]    = useState(false);
  const [learnMob,   setLearnMob]   = useState(false);

  const svc   = useDropdown();
  const news  = useDropdown();
  const learn = useDropdown();

  const router = useRouter();
  const { user } = useAuth();

  async function handleLogout() {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/login");
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:           "var(--nav-scrolled)",
        borderBottom:         "1px solid var(--nav-border)",
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:            "0 1px 0 var(--nav-border), 0 4px 32px rgba(0,0,0,0.18)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/50">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-bold tracking-tight text-[17px]" style={{ color: "var(--heading)" }}>
            GeoVision<span className="text-blue-500">Pro</span>
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <ul className="hidden lg:flex items-center gap-0.5">

          {/* Services dropdown */}
          <li ref={svc.ref} className="relative">
            <button
              onMouseEnter={svc.enter}
              onMouseLeave={svc.leave}
              onClick={svc.toggle}
              aria-expanded={svc.open}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all font-medium text-[14px]"
              style={{ color: svc.open ? "#2563eb" : "var(--nav-text)", background: svc.open ? "var(--section-alt)" : undefined }}
            >
              Services
              <ChevronDown size={13} className={`transition-transform duration-200 ${svc.open ? "rotate-180" : ""}`} />
            </button>

            {svc.open && (
              <div
                onMouseEnter={svc.enter}
                onMouseLeave={svc.leave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(660px,90vw)] rounded-2xl overflow-hidden"
                style={{
                  background:  "var(--section-bg)",
                  border:      "1px solid var(--card-border)",
                  boxShadow:   "0 24px 64px rgba(0,0,0,0.14)",
                  animation:   "fadeSlideDown 0.18s ease-out forwards",
                }}
              >
                <div className="px-5 py-3 border-b flex items-center justify-between"
                  style={{ borderColor: "var(--card-border)", background: "var(--section-alt)" }}>
                  <div>
                    <p className="text-sm font-black" style={{ color: "var(--heading)" }}>Our Services</p>
                    <p className="text-xs" style={{ color: "var(--body-text)" }}>Click any service to explore full details</p>
                  </div>
                  <Link href="/consultancy" onClick={svc.close}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-px" style={{ background: "var(--card-border)" }}>
                  {SERVICE_LINKS.map(s => (
                    <Link key={s.label} href={s.href} onClick={svc.close}
                      className="flex items-center p-4 transition-all group"
                      style={{ background: "var(--section-bg)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--section-alt)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "var(--section-bg)")}
                    >
                      <p className="font-bold text-[13px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug"
                        style={{ color: "var(--heading)" }}>
                        {s.label}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="px-5 py-2.5 flex items-center gap-2"
                  style={{ background: "var(--section-alt)", borderTop: "1px solid var(--card-border)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs" style={{ color: "var(--body-text)" }}>
                    All services available <span className="font-semibold" style={{ color: "var(--heading)" }}>online & on-site</span> across India
                  </p>
                </div>
              </div>
            )}
          </li>

          {/* News & Updates dropdown */}
          <li ref={news.ref} className="relative">
            <button
              onMouseEnter={news.enter}
              onMouseLeave={news.leave}
              onClick={news.toggle}
              aria-expanded={news.open}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all font-medium text-[14px] whitespace-nowrap"
              style={{ color: news.open ? "#1d9e75" : "var(--nav-text)", background: news.open ? "rgba(29,158,117,0.08)" : undefined }}
            >
              News &amp; Updates
              <ChevronDown size={13} className={`transition-transform duration-200 ${news.open ? "rotate-180" : ""}`} />
            </button>

            {news.open && (
              <div
                onMouseEnter={news.enter}
                onMouseLeave={news.leave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(580px,92vw)] rounded-2xl overflow-hidden"
                style={{
                  background: "#0a1628",
                  border:     "1px solid rgba(29,158,117,0.25)",
                  boxShadow:  "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(29,158,117,0.1)",
                  animation:  "fadeSlideDown 0.18s ease-out forwards",
                }}
              >
                {/* Panel header */}
                <div className="px-5 py-3.5 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(29,158,117,0.18)", background: "rgba(29,158,117,0.07)" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(29,158,117,0.18)", border: "1px solid rgba(29,158,117,0.3)" }}>
                      <IconNews size={15} color="#1d9e75" stroke={1.8} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">News &amp; Updates</p>
                      <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>Stay informed with GeoVision Pro</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                    style={{ background: "rgba(29,158,117,0.15)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.3)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d9e75] animate-pulse inline-block" />
                    Live
                  </span>
                </div>

                {/* 11 items — 2-column grid */}
                <div className="grid grid-cols-2 p-3 gap-1">
                  {NEWS_LINKS.map(({ label, href, icon: Icon, desc }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={news.close}
                      className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150"
                      style={{ background: "transparent" }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(29,158,117,0.09)";
                        e.currentTarget.style.borderColor = "rgba(29,158,117,0.25)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      {/* Icon bubble */}
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onMouseEnter={undefined}
                      >
                        <Icon size={16} color="#1d9e75" stroke={1.6} className="group-hover:scale-110 transition-transform duration-150" />
                      </div>
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold leading-none mb-0.5 transition-colors duration-150 text-white group-hover:text-[#1d9e75]">
                          {label}
                        </p>
                        <p className="text-[10px] leading-snug truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="px-5 py-2.5 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(29,158,117,0.15)", background: "rgba(0,0,0,0.25)" }}>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Fresh content published weekly
                  </p>
                  <Link href="/news/newsletters" onClick={news.close}
                    className="flex items-center gap-1 text-[11px] font-bold transition-colors hover:underline"
                    style={{ color: "#1d9e75" }}>
                    Subscribe <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Learn dropdown */}
          <li ref={learn.ref} className="relative">
            <button
              onMouseEnter={learn.enter}
              onMouseLeave={learn.leave}
              onClick={learn.toggle}
              aria-expanded={learn.open}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all font-medium text-[14px]"
              style={{ color: learn.open ? "#1d9e75" : "var(--nav-text)", background: learn.open ? "rgba(29,158,117,0.08)" : undefined }}
            >
              Learn
              <ChevronDown size={13} className={`transition-transform duration-200 ${learn.open ? "rotate-180" : ""}`} />
            </button>

            {learn.open && (
              <div
                onMouseEnter={learn.enter}
                onMouseLeave={learn.leave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-xl overflow-hidden"
                style={{
                  background: "#0a1628",
                  border:     "1px solid rgba(29,158,117,0.2)",
                  animation:  "fadeSlideDown 0.18s ease-out forwards",
                }}
              >
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(29,158,117,0.15)" }}>
                  <span className="text-sm font-black text-white">Learn</span>
                  <Link
                    href="/learn"
                    onClick={learn.close}
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ background: "#1d9e75" }}
                  >
                    <ArrowRight size={12} color="#fff" />
                  </Link>
                </div>

                {/* Items */}
                <div className="py-1.5">
                  {LEARN_LINKS.map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={learn.close}
                      className="block px-4 py-2.5 text-[13px] font-medium transition-all duration-150 rounded-lg mx-1.5"
                      style={{ color: "#b0c4d8" }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(29,158,117,0.12)";
                        e.currentTarget.style.color = "#5dcaa5";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#b0c4d8";
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* Regular nav links */}
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              {l.href.startsWith("/") && !l.href.startsWith("/#") ? (
                <Link href={l.href}
                  className="px-3 py-2 rounded-lg transition-all font-medium text-[14px] inline-block"
                  style={{ color: "var(--nav-text)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--nav-text-hover)"; e.currentTarget.style.background = "var(--section-alt)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--nav-text)"; e.currentTarget.style.background = ""; }}
                >
                  {l.label}
                </Link>
              ) : (
                <a href={l.href}
                  className="px-3 py-2 rounded-lg transition-all font-medium text-[14px]"
                  style={{ color: "var(--nav-text)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--nav-text-hover)"; e.currentTarget.style.background = "var(--section-alt)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--nav-text)"; e.currentTarget.style.background = ""; }}
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-1.5">
          <ThemeToggle />
          {user ? (
            <>
              <Link href="/profile"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-[14px] transition-all"
                style={{ color: "var(--nav-text)" }}
              >
                <UserCircle2 size={15} /> My Profile
              </Link>
              <button onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-[14px] transition-all"
                style={{ color: "var(--nav-text)" }}
              >
                <LogOut size={15} /> Log Out
              </button>
            </>
          ) : (
            <Link href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-[14px] transition-all"
              style={{ color: "var(--nav-text)" }}
            >
              <LogIn size={15} /> Log In
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="transition-colors"
            style={{ color: "var(--heading)" }}
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden border-b px-6 pb-5 shadow-lg"
          style={{ background: "var(--section-bg)", borderColor: "var(--card-border)" }}>
          <ul className="flex flex-col gap-1 pt-2">

            {/* Services accordion */}
            <li>
              <button
                onClick={() => setSvcMob(p => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all font-medium text-[15px]"
                style={{ color: "var(--body-text)" }}
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${svcMob ? "rotate-180" : ""}`} />
              </button>
              {svcMob && (
                <div className="ml-3 mt-1 mb-2 flex flex-col gap-0.5">
                  {SERVICE_LINKS.map(s => (
                    <Link key={s.label} href={s.href}
                      onClick={() => { setMobileOpen(false); setSvcMob(false); }}
                      className="flex items-center px-3 py-2.5 rounded-xl transition-all font-semibold text-sm hover:text-blue-600 dark:hover:text-blue-400"
                      style={{ color: "var(--heading)" }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* News & Updates accordion */}
            <li>
              <button
                onClick={() => setNewsMob(p => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all font-medium text-[15px]"
                style={{ color: newsMob ? "#1d9e75" : "var(--body-text)" }}
              >
                <span className="flex items-center gap-2">
                  <IconNews size={15} color="#1d9e75" stroke={1.7} />
                  News &amp; Updates
                </span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${newsMob ? "rotate-180" : ""}`}
                  style={{ color: "#1d9e75" }} />
              </button>
              {newsMob && (
                <div className="ml-3 mt-1 mb-2 rounded-xl overflow-hidden"
                  style={{ background: "#0a1628", border: "1px solid rgba(29,158,117,0.22)" }}>
                  {NEWS_LINKS.map(({ label, href, icon: Icon }) => (
                    <Link key={label} href={href}
                      onClick={() => { setMobileOpen(false); setNewsMob(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 transition-all group"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(29,158,117,0.08)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "")}
                    >
                      <Icon size={14} color="#1d9e75" stroke={1.6} className="flex-shrink-0" />
                      <span className="text-sm font-semibold text-white group-hover:text-[#1d9e75] transition-colors">
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Learn accordion */}
            <li>
              <button
                onClick={() => setLearnMob(p => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all font-medium text-[15px]"
                style={{ color: learnMob ? "#1d9e75" : "var(--body-text)" }}
              >
                Learn
                <ChevronDown size={16} className={`transition-transform duration-200 ${learnMob ? "rotate-180" : ""}`}
                  style={{ color: learnMob ? "#1d9e75" : undefined }} />
              </button>
              {learnMob && (
                <div className="ml-3 mt-1 mb-2 rounded-xl overflow-hidden"
                  style={{ background: "#0a1628", border: "1px solid rgba(29,158,117,0.2)" }}>
                  {LEARN_LINKS.map(item => (
                    <Link key={item.label} href={item.href}
                      onClick={() => { setMobileOpen(false); setLearnMob(false); }}
                      className="block px-4 py-2.5 text-sm font-medium transition-all"
                      style={{ color: "#b0c4d8", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(29,158,117,0.1)"; e.currentTarget.style.color = "#5dcaa5"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#b0c4d8"; }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Regular links */}
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg transition-all font-medium text-[15px]"
                  style={{ color: "var(--body-text)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-3 space-y-2">
            {user ? (
              <>
                <Link href="/profile" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-[15px] transition-all"
                  style={{ borderColor: "var(--card-border)", color: "var(--heading)" }}
                >
                  <UserCircle2 size={15} /> My Profile
                </Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-[15px] transition-all w-full"
                  style={{ borderColor: "var(--card-border)", color: "var(--heading)" }}
                >
                  <LogOut size={15} /> Log Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-[15px] transition-all"
                style={{ borderColor: "var(--card-border)", color: "var(--heading)" }}
              >
                <LogIn size={15} /> Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
