"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon } from "lucide-react";

/* ── Slide data ─────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    src:      "/hero/slide-officers.jpg",
    bg:       "linear-gradient(135deg,#dbeafe 0%,#bfdbfe 60%,#e0e7ff 100%)",
    accent:   "#2563eb",
    light:    "#eff6ff",
    dark:     "#1d4ed8",
    category: "Our Leadership",
    line1:    "Guided by Vision,",
    line2:    "Driven by Excellence",
    sub:      "Meet the experts behind India's premier geospatial intelligence consultancy.",
  },
  {
    src:      "/hero/slide-nature.png",
    bg:       "linear-gradient(135deg,#d1fae5 0%,#a7f3d0 60%,#ccfbf1 100%)",
    accent:   "#059669",
    light:    "#f0fdf4",
    dark:     "#047857",
    category: "Environmental Intelligence",
    line1:    "Mapping the",
    line2:    "Natural World",
    sub:      "AI-powered remote sensing that turns landscapes into actionable environmental data.",
  },
  {
    src:      "/hero/slide-technology.jpg",
    bg:       "linear-gradient(135deg,#ede9fe 0%,#ddd6fe 60%,#e0e7ff 100%)",
    accent:   "#7c3aed",
    light:    "#faf5ff",
    dark:     "#6d28d9",
    category: "Technology & Innovation",
    line1:    "Geospatial AI",
    line2:    "Redefined",
    sub:      "From satellite imagery to deep learning — building the tools that shape tomorrow.",
  },
  {
    src:      "/hero/slide-field.png",
    bg:       "linear-gradient(135deg,#e0f2fe 0%,#bae6fd 60%,#cffafe 100%)",
    accent:   "#0284c7",
    light:    "#f0f9ff",
    dark:     "#0369a1",
    category: "Field Operations",
    line1:    "On the Ground,",
    line2:    "Across India",
    sub:      "12+ states, 500+ projects — precision surveys and drone missions delivered.",
  },
  {
    src:      "/hero/slide-training.jpg",
    bg:       "linear-gradient(135deg,#f3e8ff 0%,#e9d5ff 60%,#fce7f3 100%)",
    accent:   "#9333ea",
    light:    "#fdf4ff",
    dark:     "#7e22ce",
    category: "Training & Research",
    line1:    "Building the",
    line2:    "Next Generation",
    sub:      "1,200+ professionals trained in GIS, remote sensing, and AI geospatial workflows.",
  },
];

const STATS = [
  { value: "500+",  label: "Projects" },
  { value: "92.4%", label: "AI Accuracy" },
  { value: "15+",   label: "Years" },
  { value: "12+",   label: "States" },
];

const MARQUEE_ITEMS = [
  "Remote Sensing", "GIS Analytics", "Drone Mapping", "AI Geo-Analytics",
  "LULC Analysis", "Google Earth Engine", "Sentinel-2", "LiDAR",
  "ArcGIS Pro", "UAV Surveys", "STAAD Pro", "Structural Engineering",
];

/* ── Marquee ──────────────────────────────────────────────────────────── */
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
          <span
            key={i}
            className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            <span className="text-blue-400 opacity-60" style={{ fontSize: 8 }}>✦</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const go   = useCallback((idx: number) => setCurrent((idx + SLIDES.length) % SLIDES.length), []);
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent(c => (c + 1) % SLIDES.length), 5000);
    return () => clearTimeout(t);
  }, [current, paused]);

  const slide = SLIDES[current];

  return (
    <section
      id="home"
      aria-label="DeepEarthScience hero"
      className="relative flex flex-col"
      style={{ background: "var(--section-bg)" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-0.5 z-10 pointer-events-none"
        style={{ background: `linear-gradient(90deg,transparent,${slide.accent},transparent)`, transition: "background 0.8s" }}
      />

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(37,99,235,0.055) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* ── Main grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 pt-20 sm:pt-24 lg:pt-28 pb-8 min-h-[100svh] grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        {/* ── LEFT: Text ──────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Category badge */}
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.14em] mb-7"
                style={{ background: slide.light, color: slide.accent, border: `1px solid ${slide.accent}22` }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accent }} />
                {slide.category}
              </span>

              {/* Headline */}
              <h1
                className="font-black leading-[1.05] tracking-tight mb-5"
                style={{ fontSize: "clamp(2.2rem,5vw,4.6rem)", color: "var(--heading)" }}
              >
                {slide.line1}
                <br />
                <span
                  style={{
                    background: `linear-gradient(135deg,${slide.accent},${slide.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {slide.line2}
                </span>
              </h1>

              {/* Subheading */}
              <p
                className="text-base lg:text-lg leading-relaxed mb-9 max-w-md"
                style={{ color: "var(--body-text)" }}
              >
                {slide.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons — stable, don't re-animate */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              style={{
                background: `linear-gradient(135deg,${slide.accent},${slide.dark})`,
                boxShadow: `0 6px 20px ${slide.accent}40`,
                transition: "background 0.5s, box-shadow 0.5s, transform 0.15s",
              }}
            >
              Request Consultation <ArrowRightIcon size={15} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--heading)",
                boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
              }}
            >
              Explore Services
            </a>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-8 pt-6 mb-7"
            style={{ borderTop: "1px solid var(--divider)" }}
          >
            {STATS.map((s, i) => (
              <div key={i}>
                <p
                  className="text-2xl font-black leading-none transition-colors duration-500"
                  style={{ color: slide.accent }}
                >
                  {s.value}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--heading)" }}
            >
              <ArrowLeft size={15} strokeWidth={2.4} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 22 : 7,
                    height: 7,
                    background: i === current ? slide.accent : "var(--divider)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--heading)" }}
            >
              <ArrowRight size={15} strokeWidth={2.4} />
            </button>

            {/* Counter */}
            <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--muted)" }}>
              {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
            </span>

            {/* Progress bar */}
            <div className="flex-1 max-w-[100px] h-0.5 rounded-full overflow-hidden" style={{ background: "var(--divider)" }}>
              {!paused && (
                <motion.div
                  key={current}
                  className="h-full rounded-full"
                  style={{ background: slide.accent }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Photo card ─────────────────────────────────────────── */}
        <div
          className="order-1 lg:order-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Offset shadow/grid decoration */}
          <div className="relative">
            <div
              className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl pointer-events-none"
              style={{ background: slide.light, border: `1px solid ${slide.accent}18`, transition: "background 0.8s", zIndex: 0 }}
            />

            {/* Photo container */}
            <div
              className="relative overflow-hidden rounded-2xl sm:rounded-3xl w-full shadow-xl"
              style={{ aspectRatio: "4/3", zIndex: 1 }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={current}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                >
                  {/* Pastel gradient fallback */}
                  <div className="absolute inset-0" style={{ background: slide.bg }} />

                  {/* Real photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.src}
                    alt={slide.category}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center top", opacity: 0, transition: "opacity 0.7s ease" }}
                    loading="eager"
                    onLoad={e  => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Category chip — bottom left */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md"
                  style={{ background: "rgba(255,255,255,0.88)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: slide.accent }} />
                  <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: slide.accent }}>
                    {slide.category}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Slide counter chip — top right */}
              <div
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-[10px] font-black tabular-nums backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.85)", color: slide.accent, border: "1px solid rgba(255,255,255,0.6)" }}
              >
                {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Tech marquee ──────────────────────────────────────────────── */}
      <MarqueeStrip />
    </section>
  );
}
