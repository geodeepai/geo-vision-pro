"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  ChevronDown,
  Map,
  Satellite,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";

/* Three.js Globe — loaded client-side only (no SSR, WebGL requirement) */
const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

const LINE1       = ["Visualizing", "the", "Earth."];
const LINE2_PLAIN = ["Engineering", "the"];
const LINE2_GRAD  = "Future.";

const CHIPS = [
  { Icon: Satellite, label: "Satellite Data", tone: "#0B3D91" },
  { Icon: Map, label: "GIS Analytics", tone: "#0077B6" },
  { Icon: BrainCircuit, label: "GeoAI", tone: "#00856F" },
  { Icon: TrendingUp, label: "Predictive", tone: "#6D5BD0" },
];
const STATS = [
  { value: "500+",  label: "Projects" },
  { value: "92.4%", label: "AI Accuracy" },
  { value: "15+",   label: "Years" },
  { value: "12+",   label: "States" },
];

const BADGE_WORDS = [
  "Next-Gen Geospatial Intelligence",
  "AI-Powered Satellite Analytics",
  "Precision GIS Engineering",
];

const MARQUEE_ITEMS = [
  "Remote Sensing", "GIS Analytics", "Drone Mapping", "AI Geo-Analytics",
  "LULC Analysis", "Google Earth Engine", "Sentinel-2", "LiDAR",
  "ArcGIS Pro", "UAV Surveys", "STAAD Pro", "Structural Engineering",
];

const SIGNAL_ROWS = [
  { label: "NDVI", value: "0.84", width: "84%", color: "#00856F" },
  { label: "SAR Fusion", value: "91%", width: "91%", color: "#0077B6" },
  { label: "Risk Scan", value: "Live", width: "68%", color: "#6D5BD0" },
];

/* ── Official work photos — drop images into /public/photos/ ──────────────
   Name them photo-01.jpg … photo-12.jpg (or update the src paths below).
   The cards show a neutral placeholder when an image hasn't been added yet. */
const PHOTOS_ROW_1 = [
  { src: "/photos/photo-01.jpg", label: "Field Survey" },
  { src: "/photos/photo-02.jpg", label: "GIS Mapping" },
  { src: "/photos/photo-03.jpg", label: "Drone Operation" },
  { src: "/photos/photo-04.jpg", label: "LULC Analysis" },
  { src: "/photos/photo-05.jpg", label: "Satellite Processing" },
  { src: "/photos/photo-06.jpg", label: "Site Survey" },
];
const PHOTOS_ROW_2 = [
  { src: "/photos/photo-07.jpg", label: "AI Dashboard" },
  { src: "/photos/photo-08.jpg", label: "Environmental Study" },
  { src: "/photos/photo-09.jpg", label: "LiDAR Survey" },
  { src: "/photos/photo-10.jpg", label: "Urban Mapping" },
  { src: "/photos/photo-11.jpg", label: "Training Session" },
  { src: "/photos/photo-12.jpg", label: "Award Ceremony" },
];
/* Background drift photos — a subset that float behind the hero content */
const BG_DRIFT = [
  { src: "/photos/photo-01.jpg", x: 3,  y: 14, dx: 50,  dy: 22,  size: 290, dur: 14, delay: 0  },
  { src: "/photos/photo-05.jpg", x: 68, y: 6,  dx: -40, dy: 32,  size: 250, dur: 17, delay: 4  },
  { src: "/photos/photo-09.jpg", x: 74, y: 62, dx: -45, dy: -28, size: 270, dur: 15, delay: 9  },
  { src: "/photos/photo-03.jpg", x: 6,  y: 62, dx: 40,  dy: -22, size: 230, dur: 13, delay: 6  },
];

/* Deterministic star field — avoids hydration mismatch */
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x:  ((i * 73  + 11) % 97),
  y:  ((i * 47  + 23) % 89),
  s:  ((i * 31) % 12) / 10 + 0.3,
  o:  ((i * 19) % 28) / 100 + 0.04,
  d:  (i * 0.3) % 6,
}));

/* ── Scrolling tech marquee (Framer-style) ──────────────────────────────── */
function MarqueeStrip() {
  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
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

/* ── Single photo marquee row ────────────────────────────────────────────── */
function PhotoSlideRow({ photos, direction = 1 }: {
  photos: { src: string; label: string }[];
  direction?: 1 | -1;
}) {
  const doubled = [...photos, ...photos];
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%)",
      }}
    >
      <motion.div
        className="flex gap-3"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((p, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 overflow-hidden rounded-xl"
            style={{
              width: 224, height: 132,
              background: "var(--section-alt)",
              border: "1px solid var(--card-border)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.label}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(transparent 52%,rgba(0,0,0,0.52))" }}
            />
            <p className="absolute bottom-2 left-2.5 text-white text-[10px] font-semibold leading-none drop-shadow">
              {p.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Background drifting photos (float + vanish) ─────────────────────────── */
function BackgroundDriftPhotos() {
  return (
    <>
      {BG_DRIFT.map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none overflow-hidden rounded-2xl"
          style={{ left: `${item.x}%`, top: `${item.y}%`, width: item.size, aspectRatio: "16/10" }}
          animate={{
            opacity: [0, 0.09, 0.09, 0],
            x: [0, item.dx],
            y: [0, item.dy],
          }}
          transition={{ duration: item.dur, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ filter: "blur(2.5px) grayscale(0.25)" }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </motion.div>
      ))}
    </>
  );
}

/* ── Spinning-border capsule (Linear-inspired) ──────────────────────────── */
function IntelligenceCapsule() {
  return (
    <div className="relative rounded-2xl" style={{ padding: 1.5, overflow: "hidden" }}>
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-100%",
          background: "conic-gradient(from 0deg,#0B3D91,#0077B6,#00A896,#6D5BD0,#0B3D91)",
          animation: "spinSlow 7s linear infinite",
          opacity: 0.5,
        }}
      />
      <div
        className="relative overflow-hidden rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4"
        style={{
          background: "rgba(255,255,255,0.94)",
          boxShadow: "0 18px 48px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: "linear-gradient(90deg,transparent,rgba(11,61,145,0.45),transparent)",
            animation: "signalSweep 3.2s ease-in-out infinite",
          }}
        />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
              style={{ animation: "pulseDot 2s ease-in-out infinite" }}
            />
            <span
              className="text-[10px] font-bold tracking-[0.12em] uppercase truncate"
              style={{ color: "#64748b" }}
            >
              GeoVisionPro Intelligence
            </span>
          </div>
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ml-2"
            style={{ background: "rgba(0,133,111,0.10)", color: "#00856F" }}
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
                background: "rgba(248,250,252,0.92)",
                border: "1px solid rgba(15,23,42,0.08)",
                color: chip.tone,
                animation: `floatChip${(i % 3) + 1} ${3.5 + i * 0.5}s ease-in-out infinite`,
              }}
            >
              <chip.Icon size={13} strokeWidth={2.4} />
              <span>{chip.label}</span>
            </span>
          ))}
        </div>
        <div className="mt-4 grid gap-2">
          {SIGNAL_ROWS.map((row, i) => (
            <div key={row.label} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#52647d" }}>
                {row.label}
              </span>
              <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "#e2e8f0" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg,${row.color},rgba(255,255,255,0.72))`,
                    boxShadow: `0 0 18px ${row.color}66`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: row.width }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EXPO }}
                />
              </div>
              <span className="text-right text-[10px] font-bold" style={{ color: row.color }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 3D Earth Globe (Three.js WebGL) ────────────────────────────────────── */
function EarthGlobe({ ready }: { ready: boolean }) {
  return (
    <div className="flex items-center justify-center mt-8 lg:mt-0">
      <motion.div
        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[460px] lg:h-[460px]"
        initial={{ opacity: 0, x: 70, scale: 0.88 }}
        animate={ready ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 70, scale: 0.88 }}
        transition={{ duration: 1.2, delay: 0.1, ease: EXPO }}
      >

        {/* Outer atmosphere rings — desktop only (fixed pixel sizes) */}
        <div className="hidden lg:block">
          {[520, 490].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: size, height: size,
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                border: `1px solid rgba(0,119,255,${0.06 - i * 0.02})`,
                background: `radial-gradient(circle,transparent ${47 + i * 4}%,rgba(0,119,255,${0.04 - i * 0.01}) ${55 + i * 4}%,transparent ${65 + i * 4}%)`,
              }}
            />
          ))}
        </div>

        {/* CSS orbit rings — desktop only (fixed pixel sizes) */}
        <div className="hidden lg:block">
          {[
            { w: 420, dur: "26s" },
            { w: 330, dur: "18s", dashed: true },
            { w: 240, dur: "13s" },
          ].map((ring, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: ring.w, height: ring.w,
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                border: `1px ${ring.dashed ? "dashed" : "solid"} rgba(0,119,255,0.22)`,
                animation: `rotateRing${i + 1} ${ring.dur} linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Glow halo — proportional to container size */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "74%", height: "74%",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(circle,rgba(0,119,255,0.18) 0%,rgba(0,60,160,0.10) 45%,transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        {/* ── WebGL Three.js Globe — proportional to container size ──── */}
        <div
          className="absolute rounded-full overflow-hidden"
          style={{
            width: "65%", height: "65%",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            boxShadow:
              "0 0 90px rgba(0,119,255,0.45), 0 0 180px rgba(0,119,255,0.15)",
          }}
        >
          <Globe3D />
        </div>

        {/* ── Floating data cards ───────────────────────────────────────── */}

        {/* Card 1: NDVI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, delay: 0.32, ease: EXPO }}
          className="absolute hidden xl:block"
          style={{
            top: -18, left: -76,
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(15,23,42,0.10)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 4s ease-in-out 0s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-1" style={{ fontSize: 8, color: "var(--muted)" }}>NDVI Index</p>
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
            bottom: -18, left: -64,
            background: "rgba(7,26,46,0.88)",
            border: "1px solid rgba(0,119,255,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 5s ease-in-out 1.5s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-1.5" style={{ fontSize: 8, color: "var(--muted)" }}>GeoAI Model</p>
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
            top: -14, right: -64,
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px rgba(15,23,42,0.10)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 4.5s ease-in-out 0.8s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-1" style={{ fontSize: 8, color: "var(--muted)" }}>Area Mapped</p>
          <p className="font-black leading-none mb-1" style={{ fontSize: 22, color: "#00D4FF" }}>2.4M km²</p>
          <p style={{ fontSize: 8, color: "#334155" }} className="mb-2">Multi-sensor coverage</p>
          <div className="flex gap-1">
            {["SAR","Optical","LiDAR","DEM"].map((c) => (
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
            bottom: -14, right: -60,
            background: "rgba(7,26,46,0.88)",
            border: "1px solid rgba(0,184,148,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
            borderRadius: 16,
            padding: "12px 14px",
            animation: "floatCard 5.5s ease-in-out 2.5s infinite",
          }}
        >
          <p className="uppercase tracking-wider mb-2" style={{ fontSize: 8, color: "var(--muted)" }}>LULC Classes</p>
          {([
            ["Urban",  "#ef4444", 28],
            ["Agri",   "#22c55e", 45],
            ["Forest", "#16a34a", 18],
            ["Water",  "#3b82f6",  9],
          ] as [string,string,number][]).map(([lbl, clr, pct]) => (
            <div key={lbl} className="flex items-center gap-1.5 mb-1">
              <div style={{ width: 6, height: 6, borderRadius: 2, background: clr, flexShrink: 0 }} />
              <div style={{ width: 44, height: 3, background: "var(--divider)", borderRadius: 2 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: clr, borderRadius: 2, opacity: 0.85 }} />
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
  const [badgeIdx, setBadgeIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 24, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 24, mass: 0.4 });
  const glowX = useTransform(smoothX, [-0.5, 0.5], ["38%", "62%"]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ["28%", "68%"]);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const interactiveGlowDark  = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(0,212,255,0.22), transparent 34%)`;
  const interactiveGlowLight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(37,99,235,0.10), transparent 34%)`;
  const interactiveGlow = isDark ? interactiveGlowDark : interactiveGlowLight;

  const auroraA = useRef<HTMLDivElement>(null);
  const auroraB = useRef<HTMLDivElement>(null);
  const auroraC = useRef<HTMLDivElement>(null);
  const auroraD = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gsapCtx  = useRef<gsap.Context | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const cycle = setInterval(() => setBadgeIdx(i => (i + 1) % BADGE_WORDS.length), 3000);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      const reducedMotionTimer = window.setTimeout(() => setReady(true), 0);
      return () => window.clearTimeout(reducedMotionTimer);
    }

    /* Aurora mesh — each orb drifts on its own rhythm */
    if (auroraA.current) auroraA.current.style.animation = "float1 20s ease-in-out infinite";
    if (auroraB.current) auroraB.current.style.animation = "float2 26s ease-in-out infinite";
    if (auroraC.current) auroraC.current.style.animation = "float3 16s ease-in-out infinite";
    if (auroraD.current) auroraD.current.style.animation = "float1 22s ease-in-out 5s infinite";

    function startAnimations() {
      if (startedRef.current) return;
      startedRef.current = true;
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
    const fallback = window.setTimeout(startAnimations, 2800);
    return () => {
      window.removeEventListener("intro:done", startAnimations);
      window.clearTimeout(fallback);
      gsapCtx.current?.revert();
    };
  }, [shouldReduceMotion]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  const fm = (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.7, delay, ease: EXPO },
  });

  return (
    <section
      id="home"
      aria-label="GeoVisionPro hero"
      onPointerMove={handlePointerMove}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-16"
    >

      {/* ── Background ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ background: "var(--hero-bg)" }}>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: interactiveGlow, opacity: shouldReduceMotion ? 0.18 : 1 }}
        />

        {/* Stars — only visible in dark mode (white dots on white = invisible) */}
        {isDark && STARS.map((star, i) => (
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
              ["--star-opacity" as string]: star.o,
              animation: shouldReduceMotion ? undefined : `starTwinkle ${4 + (i % 5)}s ease-in-out ${star.d}s infinite`,
            }}
          />
        ))}

        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, var(--hero-grid) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: shouldReduceMotion ? undefined : "heroGridDrift 28s linear infinite",
          }}
        />

        {/* Noise texture */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.035 }}
          aria-hidden="true"
        >
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>

        {/* Aurora mesh */}
        <div
          ref={auroraA}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "55vw", height: "55vh",
            top: "5%", left: "8%",
            background: "radial-gradient(ellipse, var(--hero-aurora-a) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          ref={auroraB}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "48vw", height: "48vh",
            top: "20%", right: "5%",
            background: "radial-gradient(ellipse, var(--hero-aurora-b) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          ref={auroraC}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "40vw", height: "40vh",
            bottom: "8%", left: "28%",
            background: "radial-gradient(ellipse, var(--hero-aurora-c) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          ref={auroraD}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "35vw", height: "45vh",
            bottom: "15%", right: "18%",
            background: "radial-gradient(ellipse, var(--hero-aurora-d) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />

        {/* Background drifting work photos */}
        <BackgroundDriftPhotos />

        {/* Soft edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, var(--hero-vignette) 95%)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 lg:py-24 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* ── Left column ──────────────────────────────────────────────── */}
        <div className="min-w-0 w-full max-w-[calc(100vw-2rem)] lg:max-w-none">

          {/* Badge */}
          <motion.div {...fm(0)}>
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: "var(--hero-badge-bg)",
                border: "1px solid var(--hero-badge-border)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: "var(--hero-accent)",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={badgeIdx}
                  initial={{ opacity: 0.6, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0.6, y: -4 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="min-w-[13.5rem] text-xs font-semibold sm:min-w-[15rem] sm:text-sm"
                  style={{ color: "var(--hero-accent)" }}
                >
                  {BADGE_WORDS[badgeIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="max-w-full font-black leading-[1.03] tracking-tight mb-6"
            style={{ fontSize: "clamp(1.9rem, 5vw, 4rem)", color: "var(--heading)" }}
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
              <span className="geo-grad future-grad">
                {LINE2_GRAD}
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <motion.p
            {...fm(0.18)}
            className="text-base lg:text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: "var(--body-text)" }}
          >
            AI-powered geospatial intelligence transforming satellite data into strategic
            decisions for infrastructure, environment, and sustainable development.
          </motion.p>

          {/* Intelligence Capsule */}
          <motion.div {...fm(0.28)} className="mb-8 max-w-full overflow-hidden rounded-2xl">
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
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white overflow-hidden cursor-pointer w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
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
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold cursor-pointer transition-all w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              style={{
                border: "1px solid var(--hero-secondary-border)",
                color: "var(--hero-accent)",
                background: "var(--hero-secondary-bg)",
              }}
            >
              Explore Capabilities
            </motion.a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            {...fm(0.58)}
            className="flex flex-wrap gap-6 pt-6"
            style={{ borderTop: "1px solid var(--divider)" }}
          >
            {STATS.map((stat, i) => (
              <div key={i} className="group cursor-default">
                <p
                  className="text-2xl font-black transition-colors"
                  style={{ color: "var(--hero-accent)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--body-text)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ── Right column — Globe ─────────────────────────────────────── */}
        <EarthGlobe ready={ready} />

        {/* ── Photo marquee rows + tech strip ──────────────────────────── */}
        <motion.div
          {...fm(0.82)}
          className="lg:col-span-2 w-full"
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Our Official Work
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
          </div>

          {/* Row 1 — slides left */}
          <div className="mb-2.5">
            <PhotoSlideRow photos={PHOTOS_ROW_1} direction={1} />
          </div>

          {/* Row 2 — slides right */}
          <div className="mb-4">
            <PhotoSlideRow photos={PHOTOS_ROW_2} direction={-1} />
          </div>

          {/* Tech word marquee below photos */}
          <div style={{ borderTop: "1px solid var(--divider)", paddingTop: "16px" }}>
            <MarqueeStrip />
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <a
          href="#services"
          aria-label="Scroll to next section"
          className="group flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          style={{ border: "1px solid var(--hero-scroll-border)" }}
        >
          <ChevronDown
            size={18}
            className="transition-transform group-hover:translate-y-0.5"
            style={{ color: "var(--hero-accent)", animation: shouldReduceMotion ? undefined : "scrollCue 1.6s ease-in-out infinite" }}
          />
        </a>
      </motion.div>

    </section>
  );
}
