"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Headline split
const LINE1 = ["Visualizing", "the", "Earth."];
const LINE2_PLAIN = ["Engineering", "the"];
const LINE2_GRAD = "Future.";

const CHIPS = [
  { icon: "🛰️", label: "Satellite Data" },
  { icon: "🌍", label: "GIS Analytics" },
  { icon: "🤖", label: "GeoAI" },
  { icon: "📊", label: "Predictive" },
];

const STATS = [
  { value: "500+",  label: "Projects Delivered" },
  { value: "92.4%", label: "AI Accuracy" },
  { value: "15+",   label: "Years Experience" },
  { value: "12+",   label: "States Covered" },
];

/* ── Intelligence Network Capsule ───────────────────────────────────────── */
function IntelligenceCapsule() {
  return (
    <div
      className="relative rounded-2xl"
      style={{ padding: 1.5, overflow: "hidden" }}
    >
      {/* Spinning conic-gradient border */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-100%",
          background:
            "conic-gradient(from 0deg, #0077FF, #00D4FF, #00B894, #7B61FF, #0077FF)",
          animation: "spinSlow 5s linear infinite",
          opacity: 0.9,
        }}
      />

      <div
        className="relative rounded-2xl px-5 py-4"
        style={{ background: "#071A2E" }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ animation: "pulseDot 2s ease-in-out infinite" }}
            />
            <span
              className="text-[10px] font-bold tracking-[0.16em] uppercase"
              style={{ color: "#64748b" }}
            >
              GeoVisionPro Intelligence Network
            </span>
          </div>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "rgba(0,184,148,0.15)", color: "#00B894" }}
          >
            LIVE
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {CHIPS.map((chip, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{
                background: "rgba(0,119,255,0.1)",
                border: "1px solid rgba(0,212,255,0.18)",
                color: "#00D4FF",
                animation: `floatChip${(i % 3) + 1} ${3.5 + i * 0.5}s ease-in-out infinite`,
              }}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Globe Visualization ─────────────────────────────────────────────────── */
function GlobeViz({ ready }: { ready: boolean }) {
  return (
    <div className="hidden lg:flex relative items-center justify-center">
      <motion.div
        className="relative w-[340px] h-[340px]"
        initial={{ opacity: 0, x: 60, scale: 0.92 }}
        animate={ready ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.92 }}
        transition={{ duration: 1.1, delay: 0.1, ease: EXPO }}
      >
        {/* Orbital rings */}
        {[
          { size: "100%", dur: "24s", dashed: false },
          { size: "76%",  dur: "17s", dashed: true },
          { size: "54%",  dur: "12s", dashed: false },
        ].map((ring, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size, height: ring.size,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              border: `1px ${ring.dashed ? "dashed" : "solid"} rgba(0,119,255,0.2)`,
              animation: `rotateRing${i + 1} ${ring.dur} linear infinite`,
            }}
          />
        ))}

        {/* Globe sphere */}
        <div
          className="absolute rounded-full"
          style={{
            width: 210, height: 210,
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle at 32% 28%, #0c3470, #071A2E)",
            boxShadow:
              "0 0 60px rgba(0,119,255,0.3), 0 0 120px rgba(0,119,255,0.08), inset 0 0 50px rgba(0,0,30,0.5)",
          }}
        >
          <svg
            viewBox="0 0 210 210"
            className="w-full h-full absolute inset-0 rounded-full overflow-hidden"
          >
            {/* Grid */}
            {[35,53,70,88,105,123,140,158,175].map((y, i) => (
              <line key={`h${i}`} x1="0" y1={y} x2="210" y2={y}
                stroke="rgba(0,212,255,0.07)" strokeWidth="0.7" />
            ))}
            {[35,70,105,140,175].map((x, i) => (
              <line key={`v${i}`} x1={x} y1="0" x2={x} y2="210"
                stroke="rgba(0,212,255,0.07)" strokeWidth="0.7" />
            ))}

            {/* Land masses */}
            <path d="M112 68 L130 63 L145 72 L148 90 L140 108 L128 112 L112 105 L106 90 Z"
              fill="rgba(0,184,148,0.5)" />
            <path d="M78 62 L108 65 L112 68 L106 90 L88 88 L72 78 L68 68 Z"
              fill="rgba(0,184,148,0.4)" />
            <path d="M112 105 L128 112 L122 132 L105 140 L90 130 L94 112 Z"
              fill="rgba(0,184,148,0.4)" />
            <path d="M50 48 L70 44 L76 58 L70 72 L55 74 L45 62 Z"
              fill="rgba(0,184,148,0.28)" />
            <path d="M52 80 L70 76 L76 92 L72 118 L55 120 L44 104 L46 90 Z"
              fill="rgba(0,184,148,0.28)" />
            <path d="M16 55 L42 50 L50 64 L44 88 L28 92 L14 76 Z"
              fill="rgba(0,184,148,0.25)" />
            <path d="M148 90 L165 85 L170 100 L158 115 L145 112 L140 108 Z"
              fill="rgba(0,184,148,0.35)" />

            {/* Satellite scan swath */}
            <rect x="100" y="55" width="55" height="100"
              fill="rgba(0,212,255,0.04)" rx="1" />
            <line x1="100" y1="55" x2="155" y2="55"
              stroke="rgba(0,212,255,0.55)" strokeWidth="1.2">
              <animate attributeName="y1" values="55;155;55" dur="4s" repeatCount="indefinite" />
              <animate attributeName="y2" values="55;155;55" dur="4s" repeatCount="indefinite" />
            </line>

            {/* Project / city dots */}
            <circle cx="120" cy="82" r="2.5" fill="#00D4FF" opacity="0.95">
              <animate attributeName="opacity" values="0.95;0.35;0.95" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="138" cy="88" r="2"   fill="#00B894" opacity="0.9" />
            <circle cx="108" cy="96" r="2"   fill="#0077FF" opacity="0.9" />
            <circle cx="58"  cy="60" r="2"   fill="#7B61FF" opacity="0.7" />
            <circle cx="24"  cy="70" r="1.8" fill="#00D4FF" opacity="0.6" />
            <circle cx="160" cy="96" r="2"   fill="#00B894" opacity="0.7" />
          </svg>
        </div>

        {/* Floating data card — NDVI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EXPO }}
          className="absolute -top-5 -left-14 px-3 py-2.5 rounded-xl"
          style={{
            background: "rgba(7,26,46,0.9)",
            border: "1px solid rgba(0,212,255,0.2)",
            animation: "floatCard 4s ease-in-out 0s infinite",
          }}
        >
          <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>NDVI Index</p>
          <p className="text-sm font-black" style={{ color: "#00B894" }}>0.84</p>
          <div className="flex gap-0.5 mt-1 items-end">
            {[4, 6, 5, 8, 7, 9, 8].map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-sm"
                style={{ height: h * 2, background: "rgba(0,184,148,0.5)" }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating data card — AI Processing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EXPO }}
          className="absolute -bottom-5 -left-12 px-3 py-2.5 rounded-xl"
          style={{
            background: "rgba(7,26,46,0.9)",
            border: "1px solid rgba(0,119,255,0.25)",
            animation: "floatCard 4.8s ease-in-out 1.2s infinite",
          }}
        >
          <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>AI Processing</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <p className="text-xs font-bold" style={{ color: "#0077FF" }}>94.7% Acc.</p>
          </div>
          <p className="text-[8px] mt-0.5" style={{ color: "#334155" }}>Model: GeoAI v3.1</p>
        </motion.div>

        {/* Floating data card — Coverage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.6, ease: EXPO }}
          className="absolute -top-3 -right-12 px-3 py-2.5 rounded-xl"
          style={{
            background: "rgba(7,26,46,0.9)",
            border: "1px solid rgba(0,212,255,0.2)",
            animation: "floatCard 5.2s ease-in-out 2.4s infinite",
          }}
        >
          <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>Coverage</p>
          <p className="text-sm font-black" style={{ color: "#00D4FF" }}>12 States</p>
          <p className="text-[8px] mt-0.5" style={{ color: "#334155" }}>India + 3 Nations</p>
        </motion.div>

      </motion.div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [ready, setReady] = useState(false);

  const orbRef1  = useRef<HTMLDivElement>(null);
  const orbRef2  = useRef<HTMLDivElement>(null);
  const orbRef3  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gsapCtx  = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (orbRef1.current) orbRef1.current.style.animation = "float1 16s ease-in-out infinite";
    if (orbRef2.current) orbRef2.current.style.animation = "float2 22s ease-in-out infinite";
    if (orbRef3.current) orbRef3.current.style.animation = "float3 14s ease-in-out infinite";

    function startAnimations() {
      setReady(true);
      if (!titleRef.current) return;
      gsapCtx.current = gsap.context(() => {
        const tl = gsap.timeline();

        /* Line 1 + "Engineering the" — word-mask reveal */
        tl.from(titleRef.current!.querySelectorAll(".word-inner"), {
          yPercent: 115,
          duration: 0.95,
          stagger: 0.09,
          ease: "power4.out",
        });

        /* "Future." — char-by-char cascade */
        tl.from(
          titleRef.current!.querySelectorAll(".char-inner"),
          {
            yPercent: 115,
            opacity: 0,
            duration: 0.55,
            stagger: 0.03,
            ease: "power3.out",
          },
          "-=0.42"
        );
      }, titleRef);
    }

    window.addEventListener("intro:done", startAnimations, { once: true });
    return () => {
      window.removeEventListener("intro:done", startAnimations);
      gsapCtx.current?.revert();
    };
  }, []);

  const fm = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7, delay, ease: EXPO },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* ── Background ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: "#071A2E" }}>
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,119,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,119,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }}
        />
        {/* Orbs */}
        <div
          ref={orbRef1}
          className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #0077FF 0%, transparent 65%)",
            filter: "blur(90px)",
            opacity: 0.1,
          }}
        />
        <div
          ref={orbRef2}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #00D4FF 0%, transparent 65%)",
            filter: "blur(80px)",
            opacity: 0.09,
          }}
        />
        <div
          ref={orbRef3}
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #00B894 0%, transparent 65%)",
            filter: "blur(80px)",
            opacity: 0.07,
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, #071A2E 90%)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left column */}
        <div>

          {/* Badge */}
          <motion.div {...fm(0)}>
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(0,119,255,0.08)",
                border: "1px solid rgba(0,119,255,0.22)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#00D4FF",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
              />
              <span className="text-sm font-semibold" style={{ color: "#00D4FF" }}>
                Next-Generation Geospatial Intelligence
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="font-black text-white leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 5.2vw, 4rem)" }}
          >
            {/* "Visualizing the Earth." — word reveal */}
            <span className="block mb-2">
              {LINE1.map((word, i) => (
                <span key={i} className="word-mask mr-[0.24em] last:mr-0">
                  <span className="word-inner">{word}</span>
                </span>
              ))}
            </span>

            {/* "Engineering the Future." — word + char cascade */}
            <span className="block">
              {LINE2_PLAIN.map((word, i) => (
                <span key={i} className="word-mask mr-[0.24em]">
                  <span className="word-inner">{word}</span>
                </span>
              ))}
              {/* "Future." — gradient + char cascade */}
              <span className="geo-grad">
                {LINE2_GRAD.split("").map((ch, i) => (
                  <span key={i} className="char-mask">
                    <span className="char-inner">{ch}</span>
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            {...fm(0.18)}
            className="text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: "#94a3b8" }}
          >
            AI-powered geospatial intelligence transforming satellite data into strategic
            decisions for infrastructure, environment, and sustainable development.
          </motion.p>

          {/* Intelligence Capsule */}
          <motion.div {...fm(0.28)} className="mb-8">
            <IntelligenceCapsule />
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-10"
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.44 } },
            }}
          >
            <motion.a
              href="#contact"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1, y: 0,
                  transition: { duration: 0.6, ease: EXPO },
                },
              }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #0077FF, #00D4FF)",
                boxShadow: "0 8px 32px rgba(0,119,255,0.35)",
              }}
            >
              Request Consultation <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#services"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1, y: 0,
                  transition: { duration: 0.6, ease: EXPO },
                },
              }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold cursor-pointer"
              style={{
                border: "1px solid rgba(0,212,255,0.3)",
                color: "#00D4FF",
                background: "rgba(0,212,255,0.05)",
              }}
            >
              Explore Capabilities
            </motion.a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            {...fm(0.58)}
            className="flex flex-wrap gap-6 pt-6"
            style={{ borderTop: "1px solid rgba(0,119,255,0.12)" }}
          >
            {STATS.map((stat, i) => (
              <div key={i}>
                <p className="text-xl font-black" style={{ color: "#00D4FF" }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Right column — Globe */}
        <GlobeViz ready={ready} />

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid rgba(0,212,255,0.25)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#00D4FF",
              animation: "scrollDot 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}
