"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Menu, X, ChevronDown, ArrowRight, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Main-site data (mirrors Navbar.tsx) ─────────────────────────── */
const SERVICE_LINKS = [
  { label: "Remote Sensing Consultancy",    href: "/consultancy", color: "#2563eb" },
  { label: "LULC Analysis & Mapping",       href: "/lulc",        color: "#059669" },
  { label: "GIS & Spatial Analysis",        href: "/gis",         color: "#7c3aed" },
  { label: "Drone & UAV Mapping",           href: "/drone",       color: "#ea580c" },
  { label: "AI-Powered Geo-Analytics",      href: "/ai-geo",      color: "#0891b2" },
  { label: "Structural & Civil Consulting", href: "/structural",  color: "#d97706" },
];

const MAIN_NAV = [
  { href: "/#home",    label: "Home" },
  { href: "/#courses", label: "Courses" },
  { href: "/#about",   label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

/* ── Page section nav defaults ───────────────────────────────────── */
const DEFAULT_NAV_LINKS = [
  { href: "#offerings",    label: "Offerings" },
  { href: "#process",      label: "Process" },
  { href: "#deliverables", label: "Deliverables" },
  { href: "#consultation", label: "Consult" },
];

type NavLink = { href: string; label: string };

type Props = {
  color: string;
  gradientTo: string;
  badge: string;
  title: string;
  navLinks?: NavLink[];
};

/* ══════════════════════════════════════════════════════════════════ */
/*  Left sidebar drawer — exact copy of main-site Navbar content     */
/* ══════════════════════════════════════════════════════════════════ */
function SiteNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [svcOpen, setSvcOpen] = useState(false);

  /* close on outside click */
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            ref={drawerRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 h-full z-[70] flex flex-col overflow-hidden"
            style={{
              width: 300,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(24px)",
              boxShadow: "4px 0 40px rgba(0,0,0,0.18)",
              borderRight: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <a href="/#home" onClick={onClose} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                    <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="2" fill="white" />
                  </svg>
                </div>
                <span className="font-bold text-slate-900" style={{ fontSize: 17 }}>
                  DeepEarth<span className="text-blue-500">Science</span>
                </span>
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">

              {/* Services accordion */}
              <div>
                <button
                  onClick={() => setSvcOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all font-semibold"
                  style={{ fontSize: 15 }}
                >
                  <span>Services</span>
                  <ChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform duration-200 ${svcOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {svcOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 mt-1 mb-2 space-y-0.5 pb-1">
                        {/* Header strip */}
                        <div className="px-3 py-2 mb-1 rounded-lg" style={{ background: "linear-gradient(135deg,#f8faff,#f0f4ff)" }}>
                          <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Our Services</p>
                        </div>
                        {SERVICE_LINKS.map((svc) => (
                          <Link
                            key={svc.label}
                            href={svc.href}
                            onClick={onClose}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-all group"
                          >
                            <span
                              className="font-semibold group-hover:text-blue-600 transition-colors leading-snug"
                              style={{ fontSize: 13, color: "#374151" }}
                            >
                              {svc.label}
                            </span>
                          </Link>
                        ))}
                        {/* View all */}
                        <Link
                          href="/consultancy"
                          onClick={onClose}
                          className="flex items-center gap-1.5 px-3 py-2 mt-1 rounded-xl text-blue-600 hover:bg-blue-50 transition-all font-bold"
                          style={{ fontSize: 12 }}
                        >
                          View All Services <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other main nav links */}
              {MAIN_NAV.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className="flex items-center px-3 py-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all font-semibold"
                  style={{ fontSize: 15 }}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Footer actions */}
            <div className="px-4 py-4 border-t border-slate-100 space-y-2.5">
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all"
                style={{ fontSize: 14 }}
              >
                <LogIn size={15} /> Log In
              </Link>
              <a
                href="/#contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
                style={{
                  fontSize: 14,
                  background: "linear-gradient(135deg,#2563eb,#4f46e5)",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
                }}
              >
                Get Started
              </a>
              <p className="text-center text-[11px] text-slate-400 pt-1">Deep Earth Science · All services across India</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
/*  Main exported top bar                                             */
/* ══════════════════════════════════════════════════════════════════ */
export default function ServiceTopBar({ color, gradientTo, title, navLinks }: Props) {
  const links = navLinks ?? DEFAULT_NAV_LINKS;

  const [scrolled,      setScrolled]      = useState(false);
  const [scrollPct,     setScrollPct]     = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [drawerOpen,    setDrawerOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y  = window.scrollY;
      const el = document.documentElement;
      setScrolled(y > 50);
      setScrollPct(Math.min(100, (y / (el.scrollHeight - el.clientHeight)) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [links]);

  return (
    <>
      {/* Left sidebar drawer */}
      <SiteNavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[2.5px] z-50 pointer-events-none"
          style={{
            width: `${scrollPct}%`,
            background: `linear-gradient(90deg,${color},${gradientTo})`,
            boxShadow: `0 0 8px ${color}99`,
          }}
          transition={{ duration: 0.1 }}
        />

        <div className="max-w-7xl mx-auto px-4 h-[64px] flex items-center gap-3">

          {/* ── Far left: hamburger menu button ── */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open main navigation"
            className="flex items-center gap-2 px-3 py-2 rounded-xl border font-semibold transition-all hover:bg-slate-50 hover:border-slate-300 flex-shrink-0"
            style={{ fontSize: 13, color: "#475569", borderColor: "rgba(0,0,0,0.1)" }}
          >
            <Menu size={16} />
            <span className="hidden sm:inline">Main Menu</span>
          </button>

          {/* Divider */}
          <div className="h-6 w-px flex-shrink-0" style={{ background: "rgba(0,0,0,0.1)" }} />

          {/* ── Brand mark ── */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md shadow-blue-200/50"
              style={{ background: "linear-gradient(135deg,#3b82f6,#4f46e5)" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="font-black leading-none" style={{ fontSize: 14, color: "#0f172a" }}>
                DeepEarth<span style={{ color: "#3b82f6" }}>Science</span>
              </p>
              <p className="font-semibold leading-none mt-0.5 truncate max-w-[180px]" style={{ fontSize: 11, color }}>
                {title}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 w-px flex-shrink-0 hidden md:block" style={{ background: "rgba(0,0,0,0.08)" }} />

          {/* ── Center: current-page section nav ── */}
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center" aria-label="Page sections">
            {links.map((link) => {
              const id     = link.href.replace("#", "");
              const active = activeSection === id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveSection(id);
                  }}
                  className="relative px-3.5 py-2 rounded-xl font-semibold transition-all duration-300 group whitespace-nowrap"
                  style={{ fontSize: 13, color: active ? color : "#475569" }}
                >
                  <motion.span
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      background: active ? `${color}14` : "transparent",
                      boxShadow: active ? `inset 0 0 0 1.5px ${color}38` : "inset 0 0 0 0px transparent",
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 group-hover:text-slate-900 transition-colors duration-200">
                    {link.label}
                  </span>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        key="dot"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] w-4 rounded-full"
                        style={{ background: `linear-gradient(90deg,${color},${gradientTo})`, transformOrigin: "center" }}
                      />
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </nav>

          {/* ── Right: Back + Get a Quote ── */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <Link
              href="/"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold transition-all hover:bg-slate-100"
              style={{ fontSize: 12, color: "#64748b" }}
            >
              <ArrowLeft size={13} />
              Home
            </Link>

            <a
              href="#consultation"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full font-bold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{
                fontSize: 12,
                background: `linear-gradient(135deg,${color},${gradientTo})`,
                boxShadow: `0 4px 14px ${color}55`,
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "rgba(255,255,255,0.8)" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="hidden sm:inline">Get a Quote</span>
              <Mail size={11} />
            </a>
          </div>

        </div>
      </motion.header>
    </>
  );
}
