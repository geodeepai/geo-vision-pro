"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu, X, LogIn, LogOut, UserCircle2,
  ChevronDown, ArrowRight, Search, Compass,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import {
  IconNews, IconArticle, IconVideo, IconHeadphones,
  IconPencil, IconMail, IconShare, IconPhoto,
  IconCalendarEvent, IconMapPin, IconHeartHandshake,
} from "@tabler/icons-react";

/* ── Palette (always-dark navbar) ─────────────────────────────────── */
const NAV_BG     = "#0c0f16";
const NAV_BORDER = "rgba(255,255,255,0.07)";
const TEXT_HI    = "rgba(255,255,255,0.92)";
const TEXT_MID   = "rgba(255,255,255,0.58)";
const HOVER_BG   = "rgba(255,255,255,0.06)";
const PANEL_BG   = "#111520";
const PANEL_BDR  = "rgba(255,255,255,0.09)";

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
  { label: "Press Releases",        href: "/news#press-releases",     icon: IconNews,           desc: "Official announcements & media" },
  { label: "Recently Published",    href: "/news#recently-published",  icon: IconArticle,        desc: "Latest research & articles" },
  { label: "GeoVision Video Series",href: "/news#videos",             icon: IconVideo,           desc: "Tutorials & case studies" },
  { label: "Podcasts & Webinars",   href: "/news#podcasts",           icon: IconHeadphones,      desc: "Expert talks & live sessions" },
  { label: "GIS Blogs",             href: "/news#blogs",              icon: IconPencil,          desc: "In-depth GIS & RS insights" },
  { label: "Newsletters",           href: "/news#newsletters",        icon: IconMail,            desc: "Monthly digest & updates" },
  { label: "Social Media",          href: "/news#social",             icon: IconShare,           desc: "Follow us across platforms" },
  { label: "Media Resources",       href: "/news#media",              icon: IconPhoto,           desc: "Press kit, logos & imagery" },
  { label: "Events & Conferences",  href: "/news#events",             icon: IconCalendarEvent,   desc: "Upcoming & past events" },
  { label: "Field Survey Updates",  href: "/news#field-updates",      icon: IconMapPin,          desc: "On-ground project reports" },
  { label: "Partner Program",       href: "/news#partners",           icon: IconHeartHandshake,  desc: "Collaborate & grow with us" },
];

const LEARN_LINKS = [
  { label: "GeoVisionPro Academy", href: "/learn/academy" },
  { label: "Tutorials",            href: "/learn/tutorials" },
  { label: "Events",               href: "/learn/events" },
];

const EXPLORE_SECTIONS = [
  { label: "Home",           href: "#home" },
  { label: "Services",       href: "#services" },
  { label: "Courses",        href: "#courses" },
  { label: "About",          href: "#about" },
  { label: "Process",        href: "#process" },
  { label: "Testimonials",   href: "#testimonials" },
  { label: "Contact",        href: "#contact" },
  { label: "Notices",        href: "/notices" },
  { label: "News & Updates", href: "/news" },
];

/* ── Hover-timer dropdown hook ───────────────────────────────────── */
function useDropdown() {
  const [open, setOpen]   = useState(false);
  const ref               = useRef<HTMLLIElement>(null);
  const timer             = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 130); };
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
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [svcMob,      setSvcMob]      = useState(false);
  const [newsMob,     setNewsMob]     = useState(false);
  const [learnMob,    setLearnMob]    = useState(false);
  const [searchVal,   setSearchVal]   = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const svc     = useDropdown();
  const news    = useDropdown();
  const learn   = useDropdown();
  const explore = useDropdown();

  const router = useRouter();
  const { user } = useAuth();

  async function handleLogout() {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/login");
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/news?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
    }
  }

  /* ── Shared dropdown button style ───────────────────────────────── */
  function navBtn(active: boolean) {
    return {
      color: active ? "#fff" : TEXT_HI,
      background: active ? HOVER_BG : "transparent",
    };
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background:           NAV_BG,
        borderBottom:         `1px solid ${NAV_BORDER}`,
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* ── Desktop bar ────────────────────────────────────────────── */}
      <div className="relative h-14 flex items-center px-5 sm:px-8">

        {/* ── LEFT: Explore + Search ─────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 z-10">

          {/* Explore dropdown */}
          <li ref={explore.ref} className="list-none relative">
            <button
              onMouseEnter={explore.enter}
              onMouseLeave={explore.leave}
              onClick={explore.toggle}
              aria-expanded={explore.open}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-[13px] font-bold tracking-wide"
              style={navBtn(explore.open)}
            >
              <Compass size={14} strokeWidth={2} style={{ color: TEXT_MID }} />
              Explore
            </button>

            {explore.open && (
              <div
                onMouseEnter={explore.enter}
                onMouseLeave={explore.leave}
                className="absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden"
                style={{
                  background: PANEL_BG,
                  border:     `1px solid ${PANEL_BDR}`,
                  boxShadow:  "0 20px 60px rgba(0,0,0,0.5)",
                  animation:  "fadeSlideDown 0.15s ease-out forwards",
                }}
              >
                <p className="px-4 pt-3 pb-2 text-[10px] font-black uppercase tracking-widest" style={{ color: TEXT_MID }}>
                  Quick Links
                </p>
                {EXPLORE_SECTIONS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    onClick={explore.close}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors"
                    style={{ color: TEXT_HI }}
                    onMouseEnter={e => (e.currentTarget.style.background = HOVER_BG)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 opacity-60 flex-shrink-0" />
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </li>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: TEXT_MID }}
            />
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              placeholder="Search"
              aria-label="Search site"
              className="h-8 pl-8 pr-3 rounded-lg text-[13px] font-medium outline-none transition-all"
              style={{
                width:       searchFocus ? 200 : 160,
                background:  "rgba(255,255,255,0.06)",
                border:      `1px solid ${searchFocus ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.10)"}`,
                color:       TEXT_HI,
                caretColor:  "#60a5fa",
                transition:  "width 0.25s ease, border-color 0.15s",
              }}
            />
          </form>
        </div>

        {/* ── CENTER: Logo (absolutely centered) ─────────────────── */}
        <a
          href="#home"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10"
          aria-label="GeoVisionPro Home"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 w-[18px] h-[18px]">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-[16px] tracking-tight hidden sm:inline" style={{ color: "#fff" }}>
            GeoVision<span style={{ color: "#60a5fa" }}>Pro</span>
          </span>
        </a>

        {/* ── RIGHT: Nav items ───────────────────────────────────── */}
        <ul className="hidden lg:flex items-center gap-0.5 ml-auto z-10">

          {/* Services ▾ */}
          <li ref={svc.ref} className="relative">
            <button
              onMouseEnter={svc.enter}
              onMouseLeave={svc.leave}
              onClick={svc.toggle}
              aria-expanded={svc.open}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all text-[13.5px] font-semibold"
              style={navBtn(svc.open)}
            >
              Services
              <ChevronDown size={12} className={`transition-transform duration-200 ${svc.open ? "rotate-180" : ""}`} style={{ color: TEXT_MID }} />
            </button>

            {svc.open && (
              <div
                onMouseEnter={svc.enter}
                onMouseLeave={svc.leave}
                className="absolute top-full right-0 mt-2 w-[min(580px,90vw)] rounded-2xl overflow-hidden"
                style={{
                  background: PANEL_BG,
                  border:     `1px solid ${PANEL_BDR}`,
                  boxShadow:  "0 24px 72px rgba(0,0,0,0.55)",
                  animation:  "fadeSlideDown 0.17s ease-out forwards",
                }}
              >
                {/* Header */}
                <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${PANEL_BDR}`, background: "rgba(255,255,255,0.03)" }}>
                  <div>
                    <p className="text-sm font-black" style={{ color: TEXT_HI }}>Our Services</p>
                    <p className="text-[11px] mt-0.5" style={{ color: TEXT_MID }}>Click any service to explore full details</p>
                  </div>
                  <Link href="/consultancy" onClick={svc.close}
                    className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300">
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                {/* Grid */}
                <div className="grid grid-cols-3 gap-px" style={{ background: PANEL_BDR }}>
                  {SERVICE_LINKS.map(s => (
                    <Link key={s.label} href={s.href} onClick={svc.close}
                      className="flex items-start p-4 transition-all group"
                      style={{ background: PANEL_BG }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={e => (e.currentTarget.style.background = PANEL_BG)}
                    >
                      <p className="font-bold text-[12.5px] leading-snug group-hover:text-blue-400 transition-colors" style={{ color: TEXT_HI }}>
                        {s.label}
                      </p>
                    </Link>
                  ))}
                </div>
                {/* Footer */}
                <div className="px-5 py-2.5 flex items-center gap-2" style={{ borderTop: `1px solid ${PANEL_BDR}`, background: "rgba(255,255,255,0.02)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[11px]" style={{ color: TEXT_MID }}>
                    All services available <span style={{ color: TEXT_HI, fontWeight: 600 }}>online & on-site</span> across India
                  </p>
                </div>
              </div>
            )}
          </li>

          {/* News & Updates ▾ */}
          <li ref={news.ref} className="relative">
            <button
              onMouseEnter={news.enter}
              onMouseLeave={news.leave}
              onClick={news.toggle}
              aria-expanded={news.open}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all text-[13.5px] font-semibold whitespace-nowrap"
              style={navBtn(news.open)}
            >
              News &amp; Events
              <ChevronDown size={12} className={`transition-transform duration-200 ${news.open ? "rotate-180" : ""}`} style={{ color: TEXT_MID }} />
            </button>

            {news.open && (
              <div
                onMouseEnter={news.enter}
                onMouseLeave={news.leave}
                className="absolute top-full right-0 mt-2 w-[min(540px,92vw)] rounded-2xl overflow-hidden"
                style={{
                  background: PANEL_BG,
                  border:     `1px solid ${PANEL_BDR}`,
                  boxShadow:  "0 24px 72px rgba(0,0,0,0.55)",
                  animation:  "fadeSlideDown 0.17s ease-out forwards",
                }}
              >
                {/* Panel header */}
                <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderBottom: `1px solid rgba(29,158,117,0.22)`, background: "rgba(29,158,117,0.07)" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(29,158,117,0.20)", border: "1px solid rgba(29,158,117,0.35)" }}>
                      <IconNews size={15} color="#1d9e75" stroke={1.8} />
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: TEXT_HI }}>News &amp; Updates</p>
                      <p className="text-[11px]" style={{ color: TEXT_MID }}>Stay informed with GeoVision Pro</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: "rgba(29,158,117,0.18)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.35)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d9e75] animate-pulse inline-block" />
                    Live
                  </span>
                </div>

                {/* 2-col grid */}
                <div className="grid grid-cols-2 p-3 gap-0.5">
                  {NEWS_LINKS.map(({ label, href, icon: Icon, desc }) => (
                    <Link key={label} href={href} onClick={news.close}
                      className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(29,158,117,0.09)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${PANEL_BDR}` }}>
                        <Icon size={16} color="#1d9e75" stroke={1.6} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-bold leading-none mb-0.5 group-hover:text-[#1d9e75] transition-colors" style={{ color: TEXT_HI }}>
                          {label}
                        </p>
                        <p className="text-[10px] leading-snug truncate" style={{ color: TEXT_MID }}>
                          {desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 py-2.5 flex items-center justify-between" style={{ borderTop: `1px solid rgba(29,158,117,0.15)`, background: "rgba(0,0,0,0.25)" }}>
                  <p className="text-[10px]" style={{ color: TEXT_MID }}>Fresh content published weekly</p>
                  <Link href="/news" onClick={news.close}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#1d9e75] hover:text-emerald-400">
                    Subscribe <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Learn / Multimedia ▾ */}
          <li ref={learn.ref} className="relative">
            <button
              onMouseEnter={learn.enter}
              onMouseLeave={learn.leave}
              onClick={learn.toggle}
              aria-expanded={learn.open}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all text-[13.5px] font-semibold"
              style={navBtn(learn.open)}
            >
              Learn
              <ChevronDown size={12} className={`transition-transform duration-200 ${learn.open ? "rotate-180" : ""}`} style={{ color: TEXT_MID }} />
            </button>

            {learn.open && (
              <div
                onMouseEnter={learn.enter}
                onMouseLeave={learn.leave}
                className="absolute top-full right-0 mt-2 w-52 rounded-xl overflow-hidden"
                style={{
                  background: PANEL_BG,
                  border:     `1px solid ${PANEL_BDR}`,
                  boxShadow:  "0 16px 48px rgba(0,0,0,0.50)",
                  animation:  "fadeSlideDown 0.17s ease-out forwards",
                }}
              >
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${PANEL_BDR}` }}>
                  <span className="text-sm font-black" style={{ color: TEXT_HI }}>Learn</span>
                  <Link href="/learn" onClick={learn.close}
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-[#1d9e75] hover:opacity-90">
                    <ArrowRight size={12} color="#fff" />
                  </Link>
                </div>
                <div className="py-1.5">
                  {LEARN_LINKS.map(item => (
                    <Link key={item.label} href={item.href} onClick={learn.close}
                      className="block px-4 py-2.5 text-[13px] font-medium transition-all rounded-lg mx-1.5"
                      style={{ color: TEXT_HI }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(29,158,117,0.12)"; e.currentTarget.style.color = "#1d9e75"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TEXT_HI; }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>

          {/* GEO+ LIVE badge */}
          <li>
            <Link
              href="/learn/events"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg ml-1 text-[13.5px] font-bold transition-all hover:opacity-85"
            >
              <span style={{ color: TEXT_HI }}>GEO+</span>
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest"
                style={{ border: "1.5px solid #ef4444", color: "#ef4444", lineHeight: 1 }}
              >
                LIVE
              </span>
            </Link>
          </li>

          {/* Divider */}
          <li className="w-px h-5 mx-1" style={{ background: PANEL_BDR }} aria-hidden />

          {/* Theme toggle */}
          <li><ThemeToggle /></li>

          {/* Auth */}
          <li>
            {user ? (
              <div className="flex items-center gap-1">
                <Link href="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all"
                  style={{ color: TEXT_HI }}
                  onMouseEnter={e => (e.currentTarget.style.background = HOVER_BG)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <UserCircle2 size={14} /> Profile
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all"
                  style={{ color: TEXT_MID }}
                  onMouseEnter={e => (e.currentTarget.style.background = HOVER_BG)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <Link href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px] font-bold transition-all ml-1"
                style={{
                  background: "rgba(37,99,235,0.85)",
                  color: "#fff",
                  boxShadow: "0 2px 12px rgba(37,99,235,0.30)",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,99,235,1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,99,235,0.85)")}
              >
                <LogIn size={13} /> Log In
              </Link>
            )}
          </li>
        </ul>

        {/* ── Mobile right actions ───────────────────────────────── */}
        <div className="lg:hidden flex items-center gap-2 ml-auto z-10">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg transition-all"
            style={{ color: TEXT_HI, background: HOVER_BG }}
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t px-5 pb-6 shadow-2xl"
          style={{ background: PANEL_BG, borderColor: PANEL_BDR }}
        >
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="relative mt-4 mb-3">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: TEXT_MID }} />
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Search GeoVisionPro…"
              className="w-full h-10 pl-10 pr-4 rounded-xl text-sm font-medium outline-none"
              style={{
                background: "rgba(255,255,255,0.06)",
                border:     `1px solid ${PANEL_BDR}`,
                color:      TEXT_HI,
              }}
            />
          </form>

          <ul className="flex flex-col gap-0.5">

            {/* Services accordion */}
            <li>
              <button onClick={() => setSvcMob(p => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold"
                style={{ color: TEXT_HI }}
              >
                Services
                <ChevronDown size={15} className={`transition-transform duration-200 ${svcMob ? "rotate-180" : ""}`} style={{ color: TEXT_MID }} />
              </button>
              {svcMob && (
                <div className="ml-3 mt-1 mb-2 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PANEL_BDR}` }}>
                  {SERVICE_LINKS.map(s => (
                    <Link key={s.label} href={s.href}
                      onClick={() => { setMobileOpen(false); setSvcMob(false); }}
                      className="block px-4 py-2.5 text-[13px] font-medium transition-colors hover:text-blue-400"
                      style={{ color: TEXT_HI, borderBottom: `1px solid ${PANEL_BDR}` }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* News accordion */}
            <li>
              <button onClick={() => setNewsMob(p => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold"
                style={{ color: newsMob ? "#1d9e75" : TEXT_HI }}
              >
                <span className="flex items-center gap-2">
                  <IconNews size={14} color="#1d9e75" stroke={1.7} />
                  News &amp; Events
                </span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${newsMob ? "rotate-180" : ""}`} style={{ color: "#1d9e75" }} />
              </button>
              {newsMob && (
                <div className="ml-3 mt-1 mb-2 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PANEL_BDR}` }}>
                  {NEWS_LINKS.map(({ label, href, icon: Icon }) => (
                    <Link key={label} href={href}
                      onClick={() => { setMobileOpen(false); setNewsMob(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors"
                      style={{ borderBottom: `1px solid ${PANEL_BDR}` }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(29,158,117,0.07)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <Icon size={14} color="#1d9e75" stroke={1.6} />
                      <span className="text-[13px] font-medium" style={{ color: TEXT_HI }}>{label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Learn accordion */}
            <li>
              <button onClick={() => setLearnMob(p => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold"
                style={{ color: learnMob ? "#1d9e75" : TEXT_HI }}
              >
                Learn
                <ChevronDown size={15} className={`transition-transform duration-200 ${learnMob ? "rotate-180" : ""}`} style={{ color: learnMob ? "#1d9e75" : TEXT_MID }} />
              </button>
              {learnMob && (
                <div className="ml-3 mt-1 mb-2 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PANEL_BDR}` }}>
                  {LEARN_LINKS.map(item => (
                    <Link key={item.label} href={item.href}
                      onClick={() => { setMobileOpen(false); setLearnMob(false); }}
                      className="block px-4 py-2.5 text-[13px] font-medium transition-colors"
                      style={{ color: TEXT_HI, borderBottom: `1px solid ${PANEL_BDR}` }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#1d9e75"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = TEXT_HI; }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Quick explore links */}
            <li>
              <p className="px-3 pt-3 pb-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: TEXT_MID }}>Quick Links</p>
              <div className="grid grid-cols-3 gap-1.5">
                {EXPLORE_SECTIONS.map(s => (
                  <a key={s.label} href={s.href} onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-lg text-[12px] font-medium text-center transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", color: TEXT_HI, border: `1px solid ${PANEL_BDR}` }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
                    onMouseLeave={e => (e.currentTarget.style.color = TEXT_HI)}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </li>
          </ul>

          {/* Auth buttons */}
          <div className="mt-4 pt-4 space-y-2" style={{ borderTop: `1px solid ${PANEL_BDR}` }}>
            {user ? (
              <>
                <Link href="/profile" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${PANEL_BDR}`, color: TEXT_HI }}
                >
                  <UserCircle2 size={15} /> My Profile
                </Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${PANEL_BDR}`, color: TEXT_MID }}
                >
                  <LogOut size={15} /> Log Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.30)" }}
              >
                <LogIn size={15} /> Log In
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
