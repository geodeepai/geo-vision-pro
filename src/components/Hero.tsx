"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

/* ── Slide data ───────────────────────────────────────────────────────────
   Add real photos to /public/hero/ — the gradient background shows when
   no image is available so the slideshow works great out of the box.     */
const SLIDES = [
  {
    src:      "/hero/slide-officers.jpg",
    gradient: "linear-gradient(150deg,#0a1628 0%,#0f2d6e 45%,#1d4ed8 100%)",
    pattern:  "rgba(255,255,255,0.03)",
    accent:   "#60a5fa",
    category: "Our Leadership",
    line1:    "Guided by Vision,",
    line2:    "Driven by Excellence",
    sub:      "Meet the experts behind India's premier geospatial intelligence consultancy.",
  },
  {
    src:      "/hero/slide-nature.png",
    gradient: "linear-gradient(150deg,#052e16 0%,#065f46 45%,#0f766e 100%)",
    pattern:  "rgba(255,255,255,0.03)",
    accent:   "#34d399",
    category: "Environmental Intelligence",
    line1:    "Mapping the",
    line2:    "Natural World",
    sub:      "AI-powered remote sensing that turns landscapes into actionable environmental data.",
  },
  {
    src:      "/hero/slide-technology.jpg",
    gradient: "linear-gradient(150deg,#1e1b4b 0%,#312e81 45%,#4338ca 100%)",
    pattern:  "rgba(255,255,255,0.03)",
    accent:   "#a78bfa",
    category: "Technology & Innovation",
    line1:    "Geospatial AI",
    line2:    "Redefined",
    sub:      "From satellite imagery to deep learning — building the tools that shape tomorrow.",
  },
  {
    src:      "/hero/slide-field.png",
    gradient: "linear-gradient(150deg,#0c4a6e 0%,#0369a1 45%,#0284c7 100%)",
    pattern:  "rgba(255,255,255,0.03)",
    accent:   "#38bdf8",
    category: "Field Operations",
    line1:    "On the Ground,",
    line2:    "Across India",
    sub:      "12+ states, 500+ projects — precision surveys and drone missions delivered.",
  },
  {
    src:      "/hero/slide-training.jpg",
    gradient: "linear-gradient(150deg,#3b0764 0%,#6d28d9 45%,#7c3aed 100%)",
    pattern:  "rgba(255,255,255,0.03)",
    accent:   "#c4b5fd",
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

/* ── Tech marquee ─────────────────────────────────────────────────────── */
function MarqueeStrip() {
  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "var(--section-bg)",
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
            style={{ color: "#475569" }}
          >
            <span style={{ color: "#0B3D91", opacity: 0.55, fontSize: 8 }}>✦</span>
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
  const progressKey = useRef(0);

  const go   = useCallback((idx: number) => setCurrent((idx + SLIDES.length) % SLIDES.length), []);
  const prev = () => go(current - 1);
  const next = () => go(current + 1);

  /* Auto-advance every 5 s, pause on hover */
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent(c => (c + 1) % SLIDES.length), 5000);
    return () => clearTimeout(t);
  }, [current, paused]);

  progressKey.current = current;
  const slide = SLIDES[current];

  return (
    <section id="home" aria-label="GeoVisionPro hero" className="relative flex flex-col">

      {/* ── Full-screen slideshow ──────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100svh" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* ── Slide backgrounds ──────────────────────────────────────── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            {/* Gradient (always visible — fallback when no photo) */}
            <div className="absolute inset-0" style={{ background: slide.gradient }} />

            {/* Subtle dot grid on gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle,${slide.pattern} 1px,transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Real photo — fades in when loaded, top-anchored so faces stay visible */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.category}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0, transition: "opacity 0.8s ease", objectPosition: "center top" }}
              loading="eager"
              onLoad={e  => { (e.currentTarget as HTMLImageElement).style.opacity = "1"; }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />

            {/* Light base overlay — keeps photo visible on mobile */}
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.28)" }} />

            {/* Desktop extra: left-side darkening for text column */}
            <div
              className="absolute inset-0 hidden sm:block"
              style={{
                background:
                  "linear-gradient(to right,rgba(0,0,0,0.48) 0%,rgba(0,0,0,0.18) 55%,rgba(0,0,0,0) 100%)",
              }}
            />

            {/* Bottom fade — shorter on mobile so photo shows more */}
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: "clamp(100px, 22vh, 200px)",
                background: "linear-gradient(to top,rgba(0,0,0,0.80),transparent)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Content overlay ────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col min-h-[100svh] max-w-7xl mx-auto px-6 sm:px-10 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-10">

          {/* Main text block */}
          <div className="flex-1 flex flex-col justify-center max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Category badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: `1px solid ${slide.accent}55`,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: slide.accent }}
                  />
                  <span
                    className="text-[11px] font-black tracking-[0.16em] uppercase"
                    style={{ color: slide.accent }}
                  >
                    {slide.category}
                  </span>
                </div>

                {/* Headline */}
                <h1
                  className="font-black text-white leading-[1.05] tracking-tight mb-5"
                  style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.2rem)" }}
                >
                  {slide.line1}
                  <br />
                  <span
                    style={{
                      background: `linear-gradient(135deg,#fff 30%,${slide.accent})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {slide.line2}
                  </span>
                </h1>

                {/* Sub */}
                <p
                  className="text-base md:text-lg leading-relaxed mb-9 max-w-[520px]"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 hover:opacity-92"
                    style={{
                      background: slide.accent,
                      color: "#0f172a",
                      boxShadow: `0 8px 24px ${slide.accent}50`,
                    }}
                  >
                    Request Consultation
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.28)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    Explore Services
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Bottom bar: stats + navigation ─────────────────────── */}
          <div className="flex flex-col gap-5 mt-auto">

            {/* Divider */}
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.12)" }} />

            {/* Stats + nav in one row */}
            <div className="flex flex-wrap items-end justify-between gap-6">

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                {STATS.map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl font-black text-white leading-none">{s.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.48)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3 flex-wrap">

                {/* Prev */}
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  <ArrowLeft size={15} strokeWidth={2.5} />
                </button>

                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width:  i === current ? 22 : 7,
                        height: 7,
                        background: i === current ? slide.accent : "rgba(255,255,255,0.32)",
                      }}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>

                {/* Counter */}
                <span className="text-xs font-semibold tabular-nums" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                </span>

                {/* Progress bar */}
                <div className="w-24 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
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

            {/* Scroll cue */}
            <a
              href="#services"
              aria-label="Scroll down"
              className="flex items-center gap-1.5 text-xs font-medium w-fit"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              <ChevronDown size={15} className="animate-bounce" />
              Scroll to explore
            </a>

          </div>
        </div>

      </div>

      {/* ── Tech marquee below slides ──────────────────────────────────── */}
      <MarqueeStrip />

    </section>
  );
}
