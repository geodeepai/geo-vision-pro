"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  IconNews, IconVideo, IconHeadphones,
  IconPencil, IconMail, IconShare, IconPhoto,
  IconCalendarEvent, IconMapPin, IconHeartHandshake,
  IconArticle,
} from "@tabler/icons-react";

/* ── Palette ──────────────────────────────────────────────────────── */
const NAV_BG    = "#0c0f16";
const NAV_BDR   = "rgba(255,255,255,0.07)";
const TEXT_HI   = "rgba(255,255,255,0.92)";
const TEXT_MID  = "rgba(255,255,255,0.50)";
const HOVER_BG  = "rgba(255,255,255,0.06)";
const PANEL_BG  = "#111520";
const PANEL_BDR = "rgba(255,255,255,0.09)";

/* ── Search index ─────────────────────────────────────────────────── */
type SearchItem = { title: string; desc: string; href: string; category: string };

const SEARCH_INDEX: SearchItem[] = [
  // Services
  { title: "Remote Sensing Consultancy",    desc: "Satellite analysis, NDVI, land cover classification",     href: "/consultancy",          category: "Services" },
  { title: "LULC Analysis & Mapping",       desc: "Land use land cover change detection and monitoring",     href: "/lulc",                 category: "Services" },
  { title: "GIS & Spatial Analysis",        desc: "Geographic information systems, spatial mapping",         href: "/gis",                  category: "Services" },
  { title: "Drone & UAV Mapping",           desc: "Aerial survey, photogrammetry, drone missions",           href: "/drone",                category: "Services" },
  { title: "AI-Powered Geo-Analytics",      desc: "Machine learning, deep learning, geospatial intelligence",href: "/ai-geo",               category: "Services" },
  { title: "Structural & Civil Consulting", desc: "STAAD Pro, AutoCAD, civil structural engineering",        href: "/structural",           category: "Services" },
  // Courses / Academy
  { title: "DeepEarthScience Academy",          desc: "All courses in GIS, remote sensing, AI and geospatial",  href: "/learn/academy",        category: "Courses" },
  { title: "Google Earth Engine",           desc: "GEE programming, cloud-based satellite data analysis",   href: "/learn/academy",        category: "Courses" },
  { title: "ArcGIS Pro Training",           desc: "Professional GIS desktop software course",               href: "/learn/academy",        category: "Courses" },
  { title: "AutoCAD Course",                desc: "Technical drawing, drafting and 2D/3D design",           href: "/learn/academy",        category: "Courses" },
  { title: "STAAD Pro Structural Analysis", desc: "Structural engineering analysis and design software",     href: "/learn/academy",        category: "Courses" },
  { title: "AI & Machine Learning for Geo", desc: "Neural networks, deep learning, spatial AI workflows",   href: "/learn/academy",        category: "Courses" },
  { title: "Remote Sensing Course",         desc: "Satellite image interpretation, sensors, bands",          href: "/learn/academy",        category: "Courses" },
  { title: "LiDAR & Point Cloud",           desc: "3D scanning, point cloud processing, LiDAR analysis",    href: "/learn/academy",        category: "Courses" },
  // Learn
  { title: "Tutorials",                     desc: "Step-by-step guides, walkthroughs and how-tos",          href: "/learn/tutorials",      category: "Learn" },
  { title: "Events & Workshops",            desc: "Live webinars, training sessions and conferences",        href: "/learn/events",         category: "Learn" },
  // News
  { title: "Press Releases",               desc: "Official announcements and media coverage",                href: "/news#press-releases",  category: "News" },
  { title: "Recently Published Articles",  desc: "Latest research papers and articles from DeepEarthScience",   href: "/news#recently-published",category:"News" },
  { title: "DeepEarth Video Series",       desc: "Tutorial videos, case studies, project walkthroughs",     href: "/news#videos",          category: "News" },
  { title: "Podcasts & Webinars",          desc: "Expert talks, interviews and live Q&A sessions",          href: "/news#podcasts",        category: "News" },
  { title: "GIS Blogs",                    desc: "In-depth geospatial articles and technical insights",      href: "/news#blogs",           category: "News" },
  { title: "Newsletters",                  desc: "Monthly digest, tips and DeepEarthScience updates",           href: "/news#newsletters",     category: "News" },
  { title: "Social Media",                 desc: "Follow DeepEarthScience on LinkedIn, YouTube and more",       href: "/news#social",          category: "News" },
  { title: "Media Resources",              desc: "Press kit, logos, imagery and brand assets",               href: "/news#media",           category: "News" },
  { title: "Events & Conferences",         desc: "Upcoming and past events, summits and expos",             href: "/news#events",          category: "News" },
  { title: "Field Survey Updates",         desc: "On-ground project reports and survey news",                href: "/news#field-updates",   category: "News" },
  { title: "Partner Program",              desc: "Collaborate with DeepEarthScience, grow together",            href: "/news#partners",        category: "News" },
  // Company
  { title: "Contact Us",                   desc: "Get in touch, request a quote or consultation",           href: "#contact",              category: "Company" },
  { title: "Notices",                      desc: "Important announcements and public notices",               href: "/notices",              category: "Company" },
  // Support / Legal
  { title: "Help & Support",              desc: "FAQs, tutorials and support resources",                     href: "/help",                 category: "Support" },
  { title: "Privacy Policy",              desc: "How we collect and protect your data",                      href: "/privacy",              category: "Legal" },
  { title: "Terms of Use",               desc: "Terms and conditions of using DeepEarthScience",                href: "/terms",                category: "Legal" },
  // Account
  { title: "Login",                       desc: "Sign in to your DeepEarthScience account",                     href: "/login",                category: "Account" },
  { title: "Register",                    desc: "Create a new DeepEarthScience account",                        href: "/register",             category: "Account" },
  { title: "My Profile",                  desc: "View your courses, projects and account settings",         href: "/profile",              category: "Account" },
  { title: "Forgot Password",             desc: "Reset your account password",                              href: "/forgot-password",      category: "Account" },
];

const CATEGORY_COLOR: Record<string, string> = {
  Services: "#2563eb",
  Courses:  "#7c3aed",
  Learn:    "#059669",
  News:     "#d97706",
  Company:  "#64748b",
  Support:  "#0891b2",
  Legal:    "#94a3b8",
  Account:  "#4f46e5",
};

/* ── Fuzzy search ─────────────────────────────────────────────────── */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function fuzzyScore(query: string, item: SearchItem): number {
  const q  = query.toLowerCase().trim();
  if (!q) return 0;
  const haystack = `${item.title} ${item.desc} ${item.category}`.toLowerCase();

  // Exact substring → top priority
  if (haystack.includes(q)) return 100 + (item.title.toLowerCase().includes(q) ? 20 : 0);

  // Word-by-word with typo tolerance
  const qWords = q.split(/\s+/);
  const hWords = haystack.split(/[\s,&/]+/);
  let total = 0;
  for (const qw of qWords) {
    let best = 0;
    for (const hw of hWords) {
      if (hw.includes(qw) || qw.includes(hw)) { best = Math.max(best, 80); continue; }
      if (qw.length >= 3 && hw.length >= 3) {
        const dist = levenshtein(qw, hw);
        const sim  = 1 - dist / Math.max(qw.length, hw.length);
        if (sim >= 0.55) best = Math.max(best, sim * 65);
      }
    }
    total += best;
  }
  return total / qWords.length;
}

function runSearch(query: string): SearchItem[] {
  if (!query.trim()) return [];
  return SEARCH_INDEX
    .map(item => ({ item, score: fuzzyScore(query, item) }))
    .filter(r => r.score >= 18)
    .sort((a, b) => b.score - a.score)
    .slice(0, 9)
    .map(r => r.item);
}

/* ── Hover-timer dropdown hook ───────────────────────────────────── */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref  = useRef<HTMLLIElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enter  = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave  = () => { timer.current = setTimeout(() => setOpen(false), 130); };
  const toggle = () => setOpen(p => !p);
  const close  = () => setOpen(false);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return { open, ref, enter, leave, toggle, close };
}

/* ── Search box component ─────────────────────────────────────────── */
function SearchBox({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [val,     setVal]     = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selIdx,  setSelIdx]  = useState(-1);
  const [open,    setOpen]    = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router  = useRouter();

  useEffect(() => {
    const r = runSearch(val);
    setResults(r);
    setSelIdx(-1);
    setOpen(r.length > 0 && focused);
  }, [val, focused]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  function go(href: string) {
    setVal(""); setOpen(false);
    onNavigate?.();
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelIdx(i => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelIdx(i => Math.max(i - 1, -1)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (selIdx >= 0 && results[selIdx]) go(results[selIdx].href);
      else if (val.trim()) go(`/news?q=${encodeURIComponent(val.trim())}`);
    }
    else if (e.key === "Escape") { setOpen(false); setVal(""); }
  }

  const showPanel = open && results.length > 0;

  return (
    <div ref={wrapRef} style={{ position: "relative", width: mobile ? "100%" : undefined }}>
      <div style={{ position: "relative" }}>
        <Search
          size={13}
          style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: TEXT_MID, pointerEvents: "none" }}
        />
        <input
          type="text"
          value={val}
          onChange={e => setVal(e.target.value)}
          onFocus={() => { setFocused(true); if (results.length > 0) setOpen(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKey}
          placeholder="Search…"
          aria-label="Search site"
          style={{
            height:          mobile ? 40 : 34,
            width:           mobile ? "100%" : focused ? 220 : 170,
            paddingLeft:     32,
            paddingRight:    12,
            borderRadius:    10,
            fontSize:        mobile ? 14 : 13,
            fontWeight:      500,
            outline:         "none",
            background:      "rgba(255,255,255,0.07)",
            border:          `1px solid ${focused ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.10)"}`,
            color:           TEXT_HI,
            caretColor:      "#60a5fa",
            transition:      "width 0.25s ease, border-color 0.15s",
          }}
        />
        {val && (
          <button
            onMouseDown={e => { e.preventDefault(); setVal(""); setOpen(false); }}
            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: TEXT_MID, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {showPanel && (
        <div
          style={{
            position:    "absolute",
            top:         "calc(100% + 8px)",
            left:        0,
            right:       mobile ? 0 : undefined,
            minWidth:    mobile ? undefined : 360,
            maxWidth:    mobile ? undefined : 400,
            background:  PANEL_BG,
            border:      `1px solid ${PANEL_BDR}`,
            borderRadius: 14,
            boxShadow:   "0 24px 72px rgba(0,0,0,0.60)",
            zIndex:      100,
            overflow:    "hidden",
            animation:   "fadeSlideDown 0.15s ease-out forwards",
          }}
        >
          <p style={{ padding: "10px 14px 8px", fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: TEXT_MID }}>
            {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
          {results.map((item, i) => {
            const color = CATEGORY_COLOR[item.category] ?? "#64748b";
            const active = i === selIdx;
            return (
              <button
                key={`${item.href}-${i}`}
                onMouseDown={e => { e.preventDefault(); go(item.href); }}
                onMouseEnter={() => setSelIdx(i)}
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            10,
                  width:          "100%",
                  padding:        "9px 14px",
                  textAlign:      "left",
                  background:     active ? "rgba(255,255,255,0.06)" : "transparent",
                  border:         "none",
                  cursor:         "pointer",
                  borderTop:      `1px solid ${PANEL_BDR}`,
                  transition:     "background 0.1s",
                }}
              >
                {/* Category dot */}
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: active ? "#fff" : TEXT_HI, margin: 0, lineHeight: 1.3 }}>{item.title}</p>
                  <p style={{ fontSize: 11, color: TEXT_MID, margin: "2px 0 0", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.desc}</p>
                </div>
                {/* Category chip */}
                <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 4, background: `${color}20`, color, flexShrink: 0 }}>
                  {item.category}
                </span>
              </button>
            );
          })}
          <div style={{ padding: "8px 14px 10px", borderTop: `1px solid ${PANEL_BDR}`, background: "rgba(0,0,0,0.2)" }}>
            <p style={{ fontSize: 10, color: TEXT_MID, margin: 0 }}>
              Press <kbd style={{ background: HOVER_BG, padding: "1px 5px", borderRadius: 4, color: TEXT_HI, fontSize: 10 }}>↑↓</kbd> to navigate&nbsp;&nbsp;
              <kbd style={{ background: HOVER_BG, padding: "1px 5px", borderRadius: 4, color: TEXT_HI, fontSize: 10 }}>↵</kbd> to open&nbsp;&nbsp;
              <kbd style={{ background: HOVER_BG, padding: "1px 5px", borderRadius: 4, color: TEXT_HI, fontSize: 10 }}>Esc</kbd> to close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Nav data ─────────────────────────────────────────────────────── */
const SERVICE_LINKS = [
  { label: "Remote Sensing Consultancy",    href: "/consultancy" },
  { label: "LULC Analysis & Mapping",       href: "/lulc" },
  { label: "GIS & Spatial Analysis",        href: "/gis" },
  { label: "Drone & UAV Mapping",           href: "/drone" },
  { label: "AI-Powered Geo-Analytics",      href: "/ai-geo" },
  { label: "Structural & Civil Consulting", href: "/structural" },
];

const NEWS_LINKS = [
  { label: "Press Releases",        href: "/news#press-releases",      icon: IconNews,           desc: "Official announcements & media" },
  { label: "Recently Published",    href: "/news#recently-published",  icon: IconArticle,        desc: "Latest research & articles" },
  { label: "DeepEarth Video Series",href: "/news#videos",              icon: IconVideo,          desc: "Tutorials & case studies" },
  { label: "Podcasts & Webinars",   href: "/news#podcasts",            icon: IconHeadphones,     desc: "Expert talks & live sessions" },
  { label: "GIS Blogs",             href: "/news#blogs",               icon: IconPencil,         desc: "In-depth GIS & RS insights" },
  { label: "Newsletters",           href: "/news#newsletters",         icon: IconMail,           desc: "Monthly digest & updates" },
  { label: "Social Media",          href: "/news#social",              icon: IconShare,          desc: "Follow us across platforms" },
  { label: "Media Resources",       href: "/news#media",               icon: IconPhoto,          desc: "Press kit, logos & imagery" },
  { label: "Events & Conferences",  href: "/news#events",              icon: IconCalendarEvent,  desc: "Upcoming & past events" },
  { label: "Field Survey Updates",  href: "/news#field-updates",       icon: IconMapPin,         desc: "On-ground project reports" },
  { label: "Partner Program",       href: "/news#partners",            icon: IconHeartHandshake, desc: "Collaborate & grow with us" },
];

const LEARN_LINKS = [
  { label: "DeepEarthScience Academy", href: "/learn/academy" },
  { label: "Tutorials",            href: "/learn/tutorials" },
  { label: "Events",               href: "/learn/events" },
];

const EXPLORE_SECTIONS = [
  { label: "Home",           href: "#home" },
  { label: "Services",       href: "#services" },
  { label: "Courses",        href: "#courses" },
  { label: "Contact",        href: "#contact" },
  { label: "Notices",        href: "/notices" },
  { label: "News & Updates", href: "/news" },
];

/* ══════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [svcMob,     setSvcMob]     = useState(false);
  const [newsMob,    setNewsMob]    = useState(false);
  const [learnMob,   setLearnMob]   = useState(false);

  const svc     = useDropdown();
  const news    = useDropdown();
  const learn   = useDropdown();
  const explore = useDropdown();

  const router = useRouter();
  const { user } = useAuth();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  async function handleLogout() {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/login");
  }

  function navBtn(active: boolean) {
    return { color: TEXT_HI, background: active ? HOVER_BG : "transparent" };
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: NAV_BG, borderBottom: `1px solid ${NAV_BDR}`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      {/* ── Desktop bar ─────────────────────────────────────────── */}
      <div className="relative h-14 flex items-center px-5 sm:px-8">

        {/* LEFT: Explore + Search */}
        <div className="hidden lg:flex items-center gap-3 z-10">

          {/* Explore dropdown */}
          <li ref={explore.ref} className="list-none relative">
            <button
              onMouseEnter={explore.enter} onMouseLeave={explore.leave} onClick={explore.toggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-[16px] font-bold tracking-wide"
              style={navBtn(explore.open)}
            >
              <Compass size={14} strokeWidth={2} style={{ color: TEXT_MID }} />
              Explore
            </button>
            {explore.open && (
              <div
                onMouseEnter={explore.enter} onMouseLeave={explore.leave}
                className="absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden"
                style={{ background: PANEL_BG, border: `1px solid ${PANEL_BDR}`, boxShadow: "0 20px 60px rgba(0,0,0,0.5)", animation: "fadeSlideDown 0.15s ease-out forwards" }}
              >
                <p className="px-4 pt-3 pb-2 text-[10px] font-black uppercase tracking-widest" style={{ color: TEXT_MID }}>Quick Links</p>
                {EXPLORE_SECTIONS.map(s => (
                  <a key={s.label} href={s.href} onClick={explore.close}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors"
                    style={{ color: TEXT_HI }}
                    onMouseEnter={e => (e.currentTarget.style.background = HOVER_BG)}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#60a5fa", opacity: 0.6, flexShrink: 0 }} />
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </li>

          {/* Search */}
          <SearchBox />
        </div>

        {/* CENTER: Logo */}
        <a href="#home" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-10" aria-label="DeepEarthScience Home">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span className="font-bold text-[16px] tracking-tight hidden sm:inline" style={{ color: "#fff" }}>
            DeepEarth<span style={{ color: "#60a5fa" }}>Science</span>
          </span>
        </a>

        {/* RIGHT: Nav items */}
        <ul className="hidden lg:flex items-center gap-0.5 ml-auto z-10">

          {/* Services */}
          <li ref={svc.ref} className="relative">
            <button onMouseEnter={svc.enter} onMouseLeave={svc.leave} onClick={svc.toggle}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all text-[16px] font-semibold"
              style={navBtn(svc.open)}
            >
              Our Services
              <ChevronDown size={12} className={`transition-transform duration-200 ${svc.open ? "rotate-180" : ""}`} style={{ color: TEXT_MID }} />
            </button>
            {svc.open && (
              <div onMouseEnter={svc.enter} onMouseLeave={svc.leave}
                className="absolute top-full right-0 mt-2 w-[min(580px,90vw)] rounded-2xl overflow-hidden"
                style={{ background: PANEL_BG, border: `1px solid ${PANEL_BDR}`, boxShadow: "0 24px 72px rgba(0,0,0,0.55)", animation: "fadeSlideDown 0.17s ease-out forwards" }}
              >
                <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${PANEL_BDR}`, background: "rgba(255,255,255,0.03)" }}>
                  <div>
                    <p className="text-sm font-black" style={{ color: TEXT_HI }}>Our Services</p>
                    <p className="text-[11px] mt-0.5" style={{ color: TEXT_MID }}>Click any service to explore full details</p>
                  </div>
                  <Link href="/consultancy" onClick={svc.close} className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300">
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-px" style={{ background: PANEL_BDR }}>
                  {SERVICE_LINKS.map(s => (
                    <Link key={s.label} href={s.href} onClick={svc.close}
                      className="flex items-start p-4 transition-all group"
                      style={{ background: PANEL_BG }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={e => (e.currentTarget.style.background = PANEL_BG)}
                    >
                      <p className="font-bold text-[12.5px] leading-snug group-hover:text-blue-400 transition-colors" style={{ color: TEXT_HI }}>{s.label}</p>
                    </Link>
                  ))}
                </div>
                <div className="px-5 py-2.5 flex items-center gap-2" style={{ borderTop: `1px solid ${PANEL_BDR}`, background: "rgba(255,255,255,0.02)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[11px]" style={{ color: TEXT_MID }}>
                    All services available <span style={{ color: TEXT_HI, fontWeight: 600 }}>online & on-site</span> across India
                  </p>
                </div>
              </div>
            )}
          </li>

          {/* News & Events */}
          <li ref={news.ref} className="relative">
            <button onMouseEnter={news.enter} onMouseLeave={news.leave} onClick={news.toggle}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all text-[16px] font-semibold whitespace-nowrap"
              style={navBtn(news.open)}
            >
              News &amp; Updates
              <ChevronDown size={12} className={`transition-transform duration-200 ${news.open ? "rotate-180" : ""}`} style={{ color: TEXT_MID }} />
            </button>
            {news.open && (
              <div onMouseEnter={news.enter} onMouseLeave={news.leave}
                className="absolute top-full right-0 mt-2 w-[min(540px,92vw)] rounded-2xl overflow-hidden"
                style={{ background: PANEL_BG, border: `1px solid ${PANEL_BDR}`, boxShadow: "0 24px 72px rgba(0,0,0,0.55)", animation: "fadeSlideDown 0.17s ease-out forwards" }}
              >
                <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(29,158,117,0.22)", background: "rgba(29,158,117,0.07)" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(29,158,117,0.20)", border: "1px solid rgba(29,158,117,0.35)" }}>
                      <IconNews size={15} color="#1d9e75" stroke={1.8} />
                    </div>
                    <div>
                      <p className="text-sm font-black" style={{ color: TEXT_HI }}>News &amp; Updates</p>
                      <p className="text-[11px]" style={{ color: TEXT_MID }}>Stay informed with Deep Earth Science</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: "rgba(29,158,117,0.18)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.35)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d9e75] animate-pulse inline-block" /> Live
                  </span>
                </div>
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
                        <p className="text-[12.5px] font-bold leading-none mb-0.5 group-hover:text-[#1d9e75] transition-colors" style={{ color: TEXT_HI }}>{label}</p>
                        <p className="text-[10px] leading-snug truncate" style={{ color: TEXT_MID }}>{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="px-5 py-2.5 flex items-center justify-between" style={{ borderTop: "1px solid rgba(29,158,117,0.15)", background: "rgba(0,0,0,0.25)" }}>
                  <p className="text-[10px]" style={{ color: TEXT_MID }}>Fresh content published weekly</p>
                  <Link href="/news" onClick={news.close} className="flex items-center gap-1 text-[11px] font-bold text-[#1d9e75] hover:text-emerald-400">
                    Subscribe <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Learn */}
          <li ref={learn.ref} className="relative">
            <button onMouseEnter={learn.enter} onMouseLeave={learn.leave} onClick={learn.toggle}
              className="flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all text-[16px] font-semibold"
              style={navBtn(learn.open)}
            >
              Learn
              <ChevronDown size={12} className={`transition-transform duration-200 ${learn.open ? "rotate-180" : ""}`} style={{ color: TEXT_MID }} />
            </button>
            {learn.open && (
              <div onMouseEnter={learn.enter} onMouseLeave={learn.leave}
                className="absolute top-full right-0 mt-2 w-52 rounded-xl overflow-hidden"
                style={{ background: PANEL_BG, border: `1px solid ${PANEL_BDR}`, boxShadow: "0 16px 48px rgba(0,0,0,0.50)", animation: "fadeSlideDown 0.17s ease-out forwards" }}
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

          {/* GEO+ LIVE */}
          <li>
            <a href="https://www.youtube.com/@earthscience_lab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg ml-1 text-[16px] font-bold transition-all hover:opacity-85">
              <span style={{ color: TEXT_HI }}>GEO+</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest" style={{ border: "1.5px solid #ef4444", color: "#ef4444", lineHeight: 1 }}>LIVE</span>
            </a>
          </li>

          {/* Divider */}
          <li className="w-px h-5 mx-1" style={{ background: PANEL_BDR }} aria-hidden />

          {/* Theme */}
          <li><ThemeToggle /></li>

          {/* Auth */}
          <li>
            {user ? (
              <div className="flex items-center gap-1">
                <Link href="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[16px] font-semibold transition-all"
                  style={{ color: TEXT_HI }}
                  onMouseEnter={e => (e.currentTarget.style.background = HOVER_BG)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <UserCircle2 size={14} /> Profile
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[16px] font-semibold transition-all"
                  style={{ color: TEXT_MID }}
                  onMouseEnter={e => (e.currentTarget.style.background = HOVER_BG)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <Link href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[16px] font-bold transition-all ml-1 text-white"
                style={{ background: "rgba(37,99,235,0.85)", boxShadow: "0 2px 12px rgba(37,99,235,0.30)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,99,235,1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,99,235,0.85)")}
              >
                <LogIn size={13} /> Log In
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile right */}
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

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden border-t px-5 pb-6 shadow-2xl" style={{ background: PANEL_BG, borderColor: PANEL_BDR }}>
          {/* Mobile search */}
          <div className="mt-4 mb-3">
            <SearchBox mobile onNavigate={closeMobile} />
          </div>

          <ul className="flex flex-col gap-0.5">
            {/* Services */}
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
                    <Link key={s.label} href={s.href} onClick={() => { closeMobile(); setSvcMob(false); }}
                      className="block px-4 py-2.5 text-[13px] font-medium transition-colors hover:text-blue-400"
                      style={{ color: TEXT_HI, borderBottom: `1px solid ${PANEL_BDR}` }}
                    >{s.label}</Link>
                  ))}
                </div>
              )}
            </li>

            {/* News */}
            <li>
              <button onClick={() => setNewsMob(p => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] font-semibold"
                style={{ color: newsMob ? "#1d9e75" : TEXT_HI }}
              >
                <span className="flex items-center gap-2">
                  <IconNews size={14} color="#1d9e75" stroke={1.7} /> News &amp; Updates
                </span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${newsMob ? "rotate-180" : ""}`} style={{ color: "#1d9e75" }} />
              </button>
              {newsMob && (
                <div className="ml-3 mt-1 mb-2 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${PANEL_BDR}` }}>
                  {NEWS_LINKS.map(({ label, href, icon: Icon }) => (
                    <Link key={label} href={href} onClick={() => { closeMobile(); setNewsMob(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors"
                      style={{ borderBottom: `1px solid ${PANEL_BDR}` }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(29,158,117,0.07)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "")}
                    >
                      <Icon size={14} color="#1d9e75" stroke={1.6} />
                      <span className="text-[13px] font-medium" style={{ color: TEXT_HI }}>{label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Learn */}
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
                    <Link key={item.label} href={item.href} onClick={() => { closeMobile(); setLearnMob(false); }}
                      className="block px-4 py-2.5 text-[13px] font-medium transition-colors"
                      style={{ color: TEXT_HI, borderBottom: `1px solid ${PANEL_BDR}` }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#1d9e75"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = TEXT_HI; }}
                    >{item.label}</Link>
                  ))}
                </div>
              )}
            </li>

            {/* Quick links grid */}
            <li>
              <p className="px-3 pt-3 pb-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: TEXT_MID }}>Quick Links</p>
              <div className="grid grid-cols-3 gap-1.5">
                {EXPLORE_SECTIONS.map(s => (
                  <a key={s.label} href={s.href} onClick={closeMobile}
                    className="px-3 py-2 rounded-lg text-[12px] font-medium text-center transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", color: TEXT_HI, border: `1px solid ${PANEL_BDR}` }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")}
                    onMouseLeave={e => (e.currentTarget.style.color = TEXT_HI)}
                  >{s.label}</a>
                ))}
              </div>
            </li>
          </ul>

          {/* Auth */}
          <div className="mt-4 pt-4 space-y-2" style={{ borderTop: `1px solid ${PANEL_BDR}` }}>
            {user ? (
              <>
                <Link href="/profile" onClick={closeMobile}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${PANEL_BDR}`, color: TEXT_HI }}
                >
                  <UserCircle2 size={15} /> My Profile
                </Link>
                <button onClick={() => { closeMobile(); handleLogout(); }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${PANEL_BDR}`, color: TEXT_MID }}
                >
                  <LogOut size={15} /> Log Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={closeMobile}
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
