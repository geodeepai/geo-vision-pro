"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, LogIn, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICE_LINKS = [
  {
    label: "Remote Sensing Consultancy",
    desc: "Satellite imagery analysis, EIA & environmental monitoring",
    href: "/consultancy",
    color: "#2563eb",
    bg: "#eff6ff",
    dot: "🛰️",
  },
  {
    label: "LULC Analysis & Mapping",
    desc: "Multi-temporal land use & land cover classification",
    href: "/lulc",
    color: "#059669",
    bg: "#ecfdf5",
    dot: "🗺️",
  },
  {
    label: "GIS & Spatial Analysis",
    desc: "Geospatial data management & cartographic outputs",
    href: "/gis",
    color: "#7c3aed",
    bg: "#f5f3ff",
    dot: "📍",
  },
  {
    label: "Drone & UAV Mapping",
    desc: "High-resolution aerial photogrammetry & DEMs",
    href: "/drone",
    color: "#ea580c",
    bg: "#fff7ed",
    dot: "🚁",
  },
  {
    label: "AI-Powered Geo-Analytics",
    desc: "Deep learning for automated feature extraction",
    href: "/ai-geo",
    color: "#0891b2",
    bg: "#ecfeff",
    dot: "🤖",
  },
  {
    label: "Structural & Civil Consulting",
    desc: "Structural design reviews & site feasibility studies",
    href: "/structural",
    color: "#d97706",
    bg: "#fffbeb",
    dot: "🏗️",
  },
];

const NAV_LINKS = [
  { href: "#home",    label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#about",   label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open,         setOpen]         = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [svcOpen,      setSvcOpen]      = useState(false);
  const [svcMobOpen,   setSvcMobOpen]   = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) {
        setSvcOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function openSvc()  {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSvcOpen(true);
  }
  function closeSvc() {
    closeTimer.current = setTimeout(() => setSvcOpen(false), 120);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
          </div>
          <span
            className={`font-bold tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}
            style={{ fontSize: 18 }}
          >
            GeoVision<span className="text-blue-600">Pro</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">

          {/* Services mega-menu trigger */}
          <li ref={svcRef} className="relative">
            <button
              onMouseEnter={openSvc}
              onMouseLeave={closeSvc}
              onClick={() => setSvcOpen((p) => !p)}
              aria-expanded={svcOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-all font-medium ${
                scrolled
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              } ${svcOpen ? (scrolled ? "text-blue-600 bg-blue-50" : "text-white bg-white/10") : ""}`}
              style={{ fontSize: 18 }}
            >
              Services
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${svcOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mega-menu dropdown */}
            {svcOpen && (
              <div
                onMouseEnter={openSvc}
                onMouseLeave={closeSvc}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                style={{ animation: "fadeSlideDown 0.18s ease-out forwards" }}
              >
                {/* Header strip */}
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between"
                  style={{ background: "linear-gradient(135deg,#f8faff,#f0f4ff)" }}>
                  <div>
                    <p className="text-sm font-black text-slate-900">Our Services</p>
                    <p className="text-xs text-slate-500">Click any service to explore full details</p>
                  </div>
                  <Link
                    href="/consultancy"
                    onClick={() => setSvcOpen(false)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View All <ArrowRight size={12} />
                  </Link>
                </div>

                {/* 3-column service grid */}
                <div className="grid grid-cols-3 gap-px bg-slate-100">
                  {SERVICE_LINKS.map((svc) => (
                    <Link
                      key={svc.label}
                      href={svc.href}
                      onClick={() => setSvcOpen(false)}
                      className="flex items-center p-4 bg-white hover:bg-blue-50 transition-all group"
                    >
                      <p
                        className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug"
                        style={{ fontSize: 13 }}
                      >
                        {svc.label}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-2"
                  style={{ background: "#fafbff" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs text-slate-500">
                    All services available <span className="font-semibold text-slate-700">online & on-site</span> across India
                  </p>
                </div>
              </div>
            )}
          </li>

          {/* Other nav links */}
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`px-3.5 py-2 rounded-lg transition-all font-medium ${
                  scrolled
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontSize: 18 }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold transition-all ${
              scrolled
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                : "text-white/85 hover:text-white hover:bg-white/10"
            }`}
            style={{ fontSize: 18 }}
          >
            <LogIn size={18} />
            Log In
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`md:hidden transition-colors ${scrolled ? "text-slate-700" : "text-white"}`}
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pb-5 shadow-lg">
          <ul className="flex flex-col gap-1 pt-2">

            {/* Services accordion */}
            <li>
              <button
                onClick={() => setSvcMobOpen((p) => !p)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all font-medium"
                style={{ fontSize: 18 }}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${svcMobOpen ? "rotate-180" : ""}`}
                />
              </button>

              {svcMobOpen && (
                <div className="ml-3 mt-1 mb-2 flex flex-col gap-1">
                  {SERVICE_LINKS.map((svc) => (
                    <Link
                      key={svc.label}
                      href={svc.href}
                      onClick={() => { setOpen(false); setSvcMobOpen(false); }}
                      className="flex items-center px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all group"
                    >
                      <span
                        className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors"
                        style={{ fontSize: 15 }}
                      >
                        {svc.label}
                      </span>
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
                  className="block px-3 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all font-medium"
                  style={{ fontSize: 18 }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
              style={{ fontSize: 18 }}
            >
              <LogIn size={15} /> Log In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
