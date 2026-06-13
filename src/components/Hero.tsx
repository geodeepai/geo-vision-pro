"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const LINE1       = ["Visualizing", "the", "Earth."];
const LINE2_PLAIN = ["Engineering", "the"];
const LINE2_GRAD  = "Future.";

const CHIPS = [
  { icon: "🛰️", label: "Satellite Data" },
  { icon: "🌍", label: "GIS Analytics" },
  { icon: "🤖", label: "GeoAI" },
  { icon: "📊", label: "Predictive" },
];
const STATS = [
  { value: "500+",  label: "Projects" },
  { value: "92.4%", label: "AI Accuracy" },
  { value: "15+",   label: "Years" },
  { value: "12+",   label: "States" },
];

/* Deterministic star field — avoids hydration mismatch */
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x:  ((i * 73  + 11) % 97),
  y:  ((i * 47  + 23) % 89),
  s:  ((i * 31) % 12) / 10 + 0.3,
  o:  ((i * 19) % 28) / 100 + 0.04,
  d:  (i * 0.3) % 6,
}));

/* ── Spinning-border capsule (Linear-inspired) ──────────────────────────── */
function IntelligenceCapsule() {
  return (
    <div className="relative rounded-2xl" style={{ padding: 1.5, overflow: "hidden" }}>
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-100%",
          background: "conic-gradient(from 0deg,#0077FF,#00D4FF,#00B894,#7B61FF,#0077FF)",
          animation: "spinSlow 5s linear infinite",
          opacity: 0.9,
        }}
      />
      <div className="relative rounded-2xl px-5 py-4" style={{ background: "#071A2E" }}>
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

/* ── Earth Globe (Planet Labs–inspired) ─────────────────────────────────── */
function EarthGlobe({ ready }: { ready: boolean }) {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: 420, height: 420 }}
        initial={{ opacity: 0, x: 70, scale: 0.88 }}
        animate={ready ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 70, scale: 0.88 }}
        transition={{ duration: 1.2, delay: 0.1, ease: EXPO }}
      >
        {/* Outer atmosphere halo */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 476, height: 476,
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle,transparent 44%,rgba(0,119,255,0.07) 55%,transparent 70%)",
            border: "1px solid rgba(0,119,255,0.07)",
          }}
        />

        {/* Orbit rings */}
        {[
          { w: "100%", dur: "26s" },
          { w: "78%",  dur: "18s", dashed: true },
          { w: "56%",  dur: "13s" },
        ].map((ring, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.w, height: ring.w,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              border: `1px ${ring.dashed ? "dashed" : "solid"} rgba(0,119,255,0.2)`,
              animation: `rotateRing${i + 1} ${ring.dur} linear infinite`,
            }}
          />
        ))}

        {/* Globe sphere */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: 236, height: 236,
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle at 33% 28%, #0d3880, #071A2E)",
            boxShadow:
              "0 0 80px rgba(0,119,255,0.4), 0 0 160px rgba(0,119,255,0.12), inset 0 0 60px rgba(0,0,30,0.6)",
          }}
        >
          <svg viewBox="0 0 236 236" className="w-full h-full">
            {/* Lat/lon grid */}
            {[28,47,66,84,102,118,134,152,170,188,208].map((y, i) => (
              <line key={`h${i}`} x1="0" y1={y} x2="236" y2={y}
                stroke="rgba(0,212,255,0.07)" strokeWidth="0.6" />
            ))}
            {[30,60,90,118,146,176,206].map((x, i) => (
              <line key={`v${i}`} x1={x} y1="0" x2={x} y2="236"
                stroke="rgba(0,212,255,0.07)" strokeWidth="0.6" />
            ))}

            {/* Land masses */}
            <path d="M123 74 L143 69 L161 78 L164 98 L155 118 L141 123 L123 115 L117 99 Z"
              fill="rgba(0,184,148,0.55)" />
            <path d="M85 68 L120 72 L123 74 L117 99 L97 96 L79 84 L75 74 Z"
              fill="rgba(0,184,148,0.42)" />
            <path d="M123 115 L141 123 L133 148 L115 158 L98 146 L103 122 Z"
              fill="rgba(0,184,148,0.45)" />
            <path d="M54 51 L76 47 L82 63 L76 80 L59 82 L48 68 Z"
              fill="rgba(0,184,148,0.28)" />
            <path d="M56 87 L76 82 L82 100 L78 130 L59 132 L46 114 L50 98 Z"
              fill="rgba(0,184,148,0.27)" />
            <path d="M16 58 L45 52 L54 68 L48 96 L29 100 L14 82 Z"
              fill="rgba(0,184,148,0.23)" />
            <path d="M163 98 L182 90 L188 108 L174 125 L160 120 L155 118 Z"
              fill="rgba(0,184,148,0.38)" />

            {/* Satellite orbit paths */}
            <ellipse id="gvp-orb1" cx="118" cy="118" rx="90" ry="30"
              fill="none" stroke="rgba(0,212,255,0.3)" strokeWidth="0.8"
              strokeDasharray="3 3" transform="rotate(-20 118 118)" />
            <ellipse id="gvp-orb2" cx="118" cy="118" rx="76" ry="24"
              fill="none" stroke="rgba(0,184,148,0.2)" strokeWidth="0.6"
              strokeDasharray="2 4" transform="rotate(42 118 118)" />

            {/* Animated satellites */}
            <circle r="3.5" fill="#00D4FF" style={{ filter: "drop-shadow(0 0 4px #00D4FF)" }}>
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#gvp-orb1" />
              </animateMotion>
            </circle>
            <circle r="2.5" fill="#00B894" style={{ filter: "drop-shadow(0 0 3px #00B894)" }}>
              <animateMotion dur="11s" repeatCount="indefinite" begin="3s">
                <mpath href="#gvp-orb2" />
              </animateMotion>
            </circle>

            {/* Satellite scan swath */}
            <rect x="112" y="58" width="62" height="116" fill="rgba(0,212,255,0.04)" rx="1" />
            <line x1="112" y1="58" x2="174" y2="58"
              stroke="rgba(0,212,255,0.6)" strokeWidth="1.2">
              <animate attributeName="y1" values="58;174;58" dur="4s" repeatCount="indefinite" />
              <animate attributeName="y2" values="58;174;58" dur="4s" repeatCount="indefinite" />
            </line>

            {/* City / project dots */}
            <circle cx="133" cy="88" r="2.5" fill="#00D4FF" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="151" cy="98"  r="2"   fill="#00B894" opacity="0.85" />
            <circle cx="118" cy="104" r="2"   fill="#0077FF" opacity="0.85" />
            <circle cx="62"  cy="63"  r="2"   fill="#7B61FF" opacity="0.7"  />
            <circle cx="24"  cy="76"  r="1.8" fill="#00D4FF" opacity="0.55" />
            <circle cx="176" cy="105" r="2"   fill="#00B894" opacity="0.7"  />
          </svg>
        </div>

        {/* ── Floating data cards (hidden on smaller lg, full on xl) ── */}

        {/* Card 1: NDVI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.32, ease: EXPO }}
          className="absolute hidden xl:block"
          style={{
            top: -22, left: -70,
            background: "rgba(7,26,46,0.88)",
            border: "1px solid rgba(0,212,255,0.18)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 4s ease-in-out 0s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-1" style={{ fontSize: 8, color: "#475569" }}>NDVI Index</p>
          <p className="font-black leading-none mb-2" style={{ fontSize: 22, color: "#00B894" }}>0.84</p>
          <div className="flex gap-0.5 items-end">
            {[4, 6, 5, 8, 7, 9, 8].map((h, i) => (
              <div key={i} style={{
                width: 6, height: h * 2.5, borderRadius: 2,
                background: `rgba(0,184,148,${0.3 + i * 0.09})`,
              }} />
            ))}
          </div>
        </motion.div>

        {/* Card 2: GeoAI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.48, ease: EXPO }}
          className="absolute hidden xl:block"
          style={{
            bottom: -22, left: -60,
            background: "rgba(7,26,46,0.88)",
            border: "1px solid rgba(0,119,255,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 5s ease-in-out 1.5s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-1.5" style={{ fontSize: 8, color: "#475569" }}>GeoAI Model</p>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <p className="font-bold" style={{ fontSize: 11, color: "#0077FF" }}>94.7% Accuracy</p>
          </div>
          <div className="space-y-1.5">
            {([ ["Sentinel-2", 94], ["Landsat-9", 87], ["SAR Fusion", 91] ] as [string,number][]).map(([name, val]) => (
              <div key={name} className="flex items-center gap-2">
                <span style={{ fontSize: 7, color: "#334155", width: 52 }}>{name}</span>
                <div style={{ width: 44, height: 3, background: "rgba(0,119,255,0.12)", borderRadius: 2 }}>
                  <div style={{ width: `${val}%`, height: "100%", background: "#0077FF", borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 7, color: "#475569" }}>{val}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 3: Coverage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.62, ease: EXPO }}
          className="absolute hidden xl:block"
          style={{
            top: -16, right: -60,
            background: "rgba(7,26,46,0.88)",
            border: "1px solid rgba(0,212,255,0.18)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 4.5s ease-in-out 0.8s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-1" style={{ fontSize: 8, color: "#475569" }}>Live Coverage</p>
          <p className="font-black leading-none mb-1" style={{ fontSize: 22, color: "#00D4FF" }}>12 States</p>
          <p style={{ fontSize: 8, color: "#334155" }} className="mb-2">India + 3 Nations</p>
          <div className="flex gap-1">
            {["IN","NP","BD","LK"].map((c) => (
              <span key={c} style={{
                fontSize: 7, color: "#00D4FF",
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.2)",
                borderRadius: 4, padding: "1px 4px",
              }}>{c}</span>
            ))}
          </div>
        </motion.div>

        {/* Card 4: LULC */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.76, ease: EXPO }}
          className="absolute hidden xl:block"
          style={{
            bottom: -16, right: -56,
            background: "rgba(7,26,46,0.88)",
            border: "1px solid rgba(0,184,148,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 5.5s ease-in-out 2.5s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-2" style={{ fontSize: 8, color: "#475569" }}>LULC Classes</p>
          {([
            ["Urban",  "#ef4444", 28],
            ["Agri",   "#22c55e", 45],
            ["Forest", "#16a34a", 18],
            ["Water",  "#3b82f6",  9],
          ] as [string,string,number][]).map(([lbl, clr, pct]) => (
            <div key={lbl} className="flex items-center gap-1.5 mb-1">
              <div style={{ width: 6, height: 6, borderRadius: 2, background: clr, flexShrink: 0 }} />
              <div style={{ width: 44, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: clr, borderRadius: 2, opacity: 0.75 }} />
              </div>
              <span style={{ fontSize: 7, color: "#475569", width: 22, textAlign: "right" }}>{pct}%</span>
            </div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const [ready, setReady] = useState(false);

  const auroraA = useRef<HTMLDivElement>(null);
  const auroraB = useRef<HTMLDivElement>(null);
  const auroraC = useRef<HTMLDivElement>(null);
  const auroraD = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gsapCtx  = useRef<gsap.Context | null>(null);

  useEffect(() => {
    /* Aurora mesh — each orb drifts on its own rhythm */
    if (auroraA.current) auroraA.current.style.animation = "float1 20s ease-in-out infinite";
    if (auroraB.current) auroraB.current.style.animation = "float2 26s ease-in-out infinite";
    if (auroraC.current) auroraC.current.style.animation = "float3 16s ease-in-out infinite";
    if (auroraD.current) auroraD.current.style.animation = "float1 22s ease-in-out 5s infinite";

    function startAnimations() {
      setReady(true);
      if (!titleRef.current) return;
      gsapCtx.current = gsap.context(() => {
        const tl = gsap.timeline();
        tl.from(titleRef.current!.querySelectorAll(".word-inner"), {
          yPercent: 115,
          duration: 1,
          stagger: 0.09,
          ease: "power4.out",
        });
        tl.from(
          titleRef.current!.querySelectorAll(".char-inner"),
          {
            yPercent: 115,
            opacity: 0,
            duration: 0.55,
            stagger: 0.028,
            ease: "power3.out",
          },
          "-=0.44"
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
    initial:    { opacity: 0, y: 24 },
    animate:    ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7, delay, ease: EXPO },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >

      {/* ── Background ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: "#071A2E" }}>

        {/* Star field */}
        {STARS.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left:     `${star.x}%`,
              top:      `${star.y}%`,
              width:    star.s,
              height:   star.s,
              background: "#fff",
              opacity:  star.o,
            }}
          />
        ))}

        {/* Blueprint grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,119,255,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,119,255,0.055) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }}
        />

        {/* Aurora mesh — 4 large colour orbs (Stripe-inspired) */}
        <div
          ref={auroraA}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "55vw", height: "55vh",
            top: "5%", left: "8%",
            background: "radial-gradient(ellipse, rgba(0,119,255,0.13) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          ref={auroraB}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "48vw", height: "48vh",
            top: "20%", right: "5%",
            background: "radial-gradient(ellipse, rgba(0,212,255,0.10) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          ref={auroraC}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "40vw", height: "40vh",
            bottom: "8%", left: "28%",
            background: "radial-gradient(ellipse, rgba(0,184,148,0.10) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          ref={auroraD}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "35vw", height: "45vh",
            bottom: "15%", right: "18%",
            background: "radial-gradient(ellipse, rgba(123,97,255,0.08) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />

        {/* Radial vignette (edges fade to navy) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 45%, #071A2E 92%)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left column ──────────────────────────────────────────────── */}
        <div>

          {/* Badge */}
          <motion.div {...fm(0)}>
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(0,119,255,0.08)",
                border: "1px solid rgba(0,119,255,0.22)",
                boxShadow: "0 0 20px rgba(0,119,255,0.08)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#00D4FF",
                  boxShadow: "0 0 8px #00D4FF",
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
            className="font-black text-white leading-[1.06] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 5.4vw, 4.4rem)" }}
          >
            {/* "Visualizing the Earth." */}
            <span className="block mb-1">
              {LINE1.map((word, i) => (
                <span key={i} className="word-mask mr-[0.22em] last:mr-0">
                  <span className="word-inner">{word}</span>
                </span>
              ))}
            </span>

            {/* "Engineering the Future." */}
            <span className="block">
              {LINE2_PLAIN.map((word, i) => (
                <span key={i} className="word-mask mr-[0.22em]">
                  <span className="word-inner">{word}</span>
                </span>
              ))}
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

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-10"
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            variants={{
              hidden: {},
              show:   { transition: { staggerChildren: 0.12, delayChildren: 0.44 } },
            }}
          >
            {/* Primary CTA */}
            <motion.a
              href="#contact"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO } },
              }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white overflow-hidden cursor-pointer"
              style={{
                background: "linear-gradient(135deg,#0077FF,#00D4FF)",
                boxShadow: "0 8px 32px rgba(0,119,255,0.4), 0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%)",
                  animation: "shimmer 0.7s ease forwards",
                }}
              />
              <span className="relative">Request Consultation</span>
              <ArrowRight size={16} className="relative" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#services"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO } },
              }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold cursor-pointer transition-all"
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
              <div key={i} className="group cursor-default">
                <p
                  className="text-2xl font-black transition-colors"
                  style={{ color: "#00D4FF" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ── Right column — Globe ─────────────────────────────────────── */}
        <EarthGlobe ready={ready} />

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
          style={{ border: "1px solid rgba(0,212,255,0.22)" }}
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
