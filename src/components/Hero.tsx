"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight as ArrowRightIcon } from "lucide-react";

/* ── Slide data ─────────────────────────────────────────────────────── */
const SLIDES = [
  {
    accent: "#2563eb",
    dark:   "#1d4ed8",
    light:  "#eff6ff",
    category: "Our Leadership",
    line1:    "Guided by Vision,",
    line2:    "Driven by Excellence",
    sub:      "Meet the experts behind India's premier geospatial intelligence consultancy.",
  },
  {
    accent: "#059669",
    dark:   "#047857",
    light:  "#f0fdf4",
    category: "Environmental Intelligence",
    line1:    "Mapping the",
    line2:    "Natural World",
    sub:      "AI-powered remote sensing that turns landscapes into actionable environmental data.",
  },
  {
    accent: "#7c3aed",
    dark:   "#6d28d9",
    light:  "#faf5ff",
    category: "Technology & Innovation",
    line1:    "Geospatial AI",
    line2:    "Redefined",
    sub:      "From satellite imagery to deep learning — building the tools that shape tomorrow.",
  },
  {
    accent: "#0284c7",
    dark:   "#0369a1",
    light:  "#f0f9ff",
    category: "Field Operations",
    line1:    "On the Ground,",
    line2:    "Across India",
    sub:      "12+ states, 500+ projects — precision surveys and drone missions delivered.",
  },
  {
    accent: "#9333ea",
    dark:   "#7e22ce",
    light:  "#fdf4ff",
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

/* ── Hero ────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [current, setCurrent] = useState(0);

  const go   = useCallback((idx: number) => setCurrent((idx + SLIDES.length) % SLIDES.length), []);
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  useEffect(() => {
    const t = setTimeout(() => setCurrent(c => (c + 1) % SLIDES.length), 5000);
    return () => clearTimeout(t);
  }, [current]);

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

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(37,99,235,0.055) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Subtle radial glow that shifts per slide */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%,${slide.accent}12 0%,transparent 70%)` }}
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-6 sm:px-10 pt-32 sm:pt-36 lg:pt-40 pb-10 min-h-[100svh] flex flex-col justify-center items-center text-center">

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category badge */}
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.14em] mb-8"
              style={{ background: slide.light, color: slide.accent, border: `1px solid ${slide.accent}28` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accent }} />
              {slide.category}
            </span>

            {/* Headline */}
            <h1
              className="font-black leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem,6.5vw,5.5rem)", color: "var(--heading)" }}
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
              className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--body-text)" }}
            >
              {slide.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
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
          className="flex flex-wrap justify-center gap-10 pt-8 mb-10 w-full"
          style={{ borderTop: "1px solid var(--divider)" }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p
                className="text-3xl font-black leading-none transition-colors duration-500"
                style={{ color: slide.accent }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-1.5" style={{ color: "var(--muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Slide navigation */}
        <div className="flex items-center gap-3">
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
            <ArrowRightIcon size={15} strokeWidth={2.4} />
          </button>

          {/* Progress bar */}
          <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "var(--divider)" }}>
            <motion.div
              key={current}
              className="h-full rounded-full"
              style={{ background: slide.accent }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>

          <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--muted)" }}>
            {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>

      </div>

      {/* ── Tech marquee ─────────────────────────────────────────────── */}
      <MarqueeStrip />
    </section>
  );
}
