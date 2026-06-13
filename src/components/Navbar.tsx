"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, LogIn, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const SERVICE_LINKS = [
  { label: "Remote Sensing Consultancy", href: "/consultancy" },
  { label: "LULC Analysis & Mapping",    href: "/lulc" },
  { label: "GIS & Spatial Analysis",     href: "/gis" },
  { label: "Drone & UAV Mapping",        href: "/drone" },
  { label: "AI-Powered Geo-Analytics",   href: "/ai-geo" },
  { label: "Structural & Civil Consulting", href: "/structural" },
];

const NAV_LINKS = [
  { href: "#home",    label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#about",   label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [svcOpen,    setSvcOpen]    = useState(false);
  const [svcMobOpen, setSvcMobOpen] = useState(false);
  const svcRef    = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function openSvc()  { if (closeTimer.current) clearTimeout(closeTimer.current); setSvcOpen(true); }
  function closeSvc() { closeTimer.current = setTimeout(() => setSvcOpen(false), 120); }

  const linkCls = scrolled
    ? "hover:bg-white/10"
    : "text-white/80 hover:text-white hover:bg-white/10";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: "var(--nav-scrolled)",
        borderBottom: "1px solid var(--nav-border)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 1px 20px rgba(0,0,0,0.08)",
      } : {
        background: "linear-gradient(to bottom, rgba(7,26,46,0.65), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200/50">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span
            className="font-bold tracking-tight transition-colors text-[17px]"
            style={{ color: scrolled ? "var(--heading)" : "#ffffff" }}
          >
            GeoVision<span className="text-blue-500">Pro</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          <li ref={svcRef} className="relative">
            <button
              onMouseEnter={openSvc}
              onMouseLeave={closeSvc}
              onClick={() => setSvcOpen((p) => !p)}
              aria-expanded={svcOpen}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all font-medium text-[15px] ${linkCls}`}
              style={{
                color: svcOpen
                  ? "#2563eb"
                  : scrolled ? "var(--nav-text)" : "rgba(255,255,255,0.8)",
                background: svcOpen && !scrolled ? "rgba(255,255,255,0.1)" : undefined,
              }}
            >
              Services
              <ChevronDown size={14} className={`transition-transform duration-200 ${svcOpen ? "rotate-180" : ""}`} />
            </button>

            {svcOpen && (
              <div
                onMouseEnter={openSvc}
                onMouseLeave={closeSvc}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(680px,90vw)] rounded-2xl overflow-hidden dark:border dark:border-white/10"
                style={{
                  background: "var(--section-bg)",
                  border: "1px solid var(--card-border)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
                  animation: "fadeSlideDown 0.18s ease-out forwards",
                }}
              >
                <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: "var(--card-border)", background: "var(--section-alt)" }}>
                  <div>
                    <p className="text-sm font-black" style={{ color: "var(--heading)" }}>Our Services</p>
                    <p className="text-xs" style={{ color: "var(--body-text)" }}>Click any service to explore full details</p>
                  </div>
                  <Link href="/consultancy" onClick={() => setSvcOpen(false)} className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-px" style={{ background: "var(--card-border)" }}>
                  {SERVICE_LINKS.map((svc) => (
                    <Link
                      key={svc.label}
                      href={svc.href}
                      onClick={() => setSvcOpen(false)}
                      className="flex items-center p-4 transition-all group"
                      style={{ background: "var(--section-bg)" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "var(--section-alt)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "var(--section-bg)")}
                    >
                      <p className="font-bold text-[13px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug" style={{ color: "var(--heading)" }}>
                        {svc.label}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="px-5 py-3 flex items-center gap-2" style={{ background: "var(--section-alt)", borderTop: "1px solid var(--card-border)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs" style={{ color: "var(--body-text)" }}>
                    All services available <span className="font-semibold" style={{ color: "var(--heading)" }}>online & on-site</span> across India
                  </p>
                </div>
              </div>
            )}
          </li>

          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`px-3.5 py-2 rounded-lg transition-all font-medium text-[15px] ${linkCls}`}
                style={{ color: scrolled ? "var(--nav-text)" : "rgba(255,255,255,0.8)" }}
                onMouseEnter={e => { e.currentTarget.style.color = scrolled ? "var(--nav-text-hover)" : "#ffffff"; }}
                onMouseLeave={e => { e.currentTarget.style.color = scrolled ? "var(--nav-text)" : "rgba(255,255,255,0.8)"; }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-1.5">
          <ThemeToggle scrolled={scrolled} />
          <Link
            href="/login"
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-[15px] transition-all ${linkCls}`}
            style={{ color: scrolled ? "var(--nav-text)" : "rgba(255,255,255,0.8)" }}
          >
            <LogIn size={16} />
            Log In
          </Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle scrolled={scrolled} />
          <button
            className="transition-colors"
            style={{ color: scrolled ? "var(--heading)" : "#ffffff" }}
            onClick={() => setOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-b px-6 pb-5 shadow-lg" style={{ background: "var(--section-bg)", borderColor: "var(--card-border)" }}>
          <ul className="flex flex-col gap-1 pt-2">
            <li>
              <button
                onClick={() => setSvcMobOpen((p) => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all font-medium text-[15px]"
                style={{ color: "var(--body-text)" }}
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${svcMobOpen ? "rotate-180" : ""}`} />
              </button>
              {svcMobOpen && (
                <div className="ml-3 mt-1 mb-2 flex flex-col gap-1">
                  {SERVICE_LINKS.map((svc) => (
                    <Link
                      key={svc.label}
                      href={svc.href}
                      onClick={() => { setOpen(false); setSvcMobOpen(false); }}
                      className="flex items-center px-3 py-2.5 rounded-xl transition-all font-semibold text-[15px] hover:text-blue-600 dark:hover:text-blue-400"
                      style={{ color: "var(--heading)" }}
                    >
                      {svc.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-lg transition-all font-medium text-[15px]"
                  style={{ color: "var(--body-text)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-[15px] transition-all"
              style={{ borderColor: "var(--card-border)", color: "var(--heading)" }}
            >
              <LogIn size={15} /> Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
