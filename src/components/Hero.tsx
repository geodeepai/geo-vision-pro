"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, Play, MapPin, Monitor, Brain } from "lucide-react";

const EXPO = [0.16, 1, 0.3, 1] as const;

const LINE1_WORDS   = ["Transforming", "Earth", "Data"];
const LINE2_PREFIX  = ["Into"];
const GRADIENT_PHRASE = "Actionable Insights";

export default function Hero() {
  const [ready, setReady] = useState(false);

  const orbRef1  = useRef<HTMLDivElement>(null);
  const orbRef2  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gsapCtx  = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Orb float — CSS animation, always on
    if (orbRef1.current) orbRef1.current.style.animation = "float1 14s ease-in-out infinite";
    if (orbRef2.current) orbRef2.current.style.animation = "float2 18s ease-in-out infinite";

    function startAnimations() {
      // 1. Signal Framer Motion to start
      setReady(true);

      // 2. GSAP headline timeline
      if (!titleRef.current) return;
      gsapCtx.current = gsap.context(() => {
        const tl = gsap.timeline();

        // Line 1 words + "Into" — slide up from word-mask
        tl.from(titleRef.current!.querySelectorAll(".word-inner"), {
          yPercent: 112,
          duration: 0.88,
          stagger: 0.1,
          ease: "power4.out",
        });

        // "Actionable Insights" — char cascade overlapping the word reveal
        tl.from(
          titleRef.current!.querySelectorAll(".char-inner"),
          {
            yPercent: 112,
            opacity: 0,
            duration: 0.52,
            stagger: 0.026,
            ease: "power3.out",
          },
          "-=0.38"
        );
      }, titleRef);
    }

    window.addEventListener("intro:done", startAnimations, { once: true });

    return () => {
      window.removeEventListener("intro:done", startAnimations);
      gsapCtx.current?.revert();
    };
  }, []);

  // Framer Motion helpers — only animate when ready===true
  const fm = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.7, delay, ease: EXPO },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      {/* ── Background ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#060d1f]">
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,198,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,198,255,1) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        <div
          ref={orbRef1}
          className="absolute top-20 left-1/3 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 65%)",
            filter: "blur(70px)",
            opacity: 0.15,
          }}
        />
        <div
          ref={orbRef2}
          className="absolute bottom-16 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, #818cf8 0%, transparent 65%)",
            filter: "blur(65px)",
            opacity: 0.12,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, #060d1f 88%)",
          }}
        />
      </div>

      {/* ── Content grid ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left column ────────────────────────────────────────────────── */}
        <div>
          {/* Badge */}
          <motion.div {...fm(0)}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/25 bg-blue-400/10 text-blue-300 text-sm font-medium mb-7">
              <span
                className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"
                style={{ animation: "pulseDot 2s ease-in-out infinite" }}
              />
              Remote Sensing &amp; Geospatial Experts
            </div>
          </motion.div>

          {/* ── Headline — GSAP word + char mask reveals ─────────────────── */}
          <h1
            ref={titleRef}
            className="font-bold text-white leading-[1.1] tracking-tight mb-7"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}
          >
            {/* Line 1 — word-by-word */}
            <span className="block mb-1">
              {LINE1_WORDS.map((word, i) => (
                <span key={i} className="word-mask mr-[0.28em] last:mr-0">
                  <span className="word-inner">{word}</span>
                </span>
              ))}
            </span>

            {/* Line 2 — "Into" word + char-cascade gradient phrase */}
            <span className="block">
              {LINE2_PREFIX.map((word, i) => (
                <span key={i} className="word-mask mr-[0.28em]">
                  <span className="word-inner">{word}</span>
                </span>
              ))}

              {/* "Actionable Insights" — each char masked for cascade */}
              <span className="shimmer-text whitespace-nowrap">
                {GRADIENT_PHRASE.split("").map((ch, i) => (
                  <span key={i} className="char-mask">
                    <span className="char-inner">{ch === " " ? " " : ch}</span>
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p {...fm(0.2)} className="text-slate-400 text-lg leading-relaxed mb-9 max-w-lg">
            Expert consultancy in Remote Sensing, LULC Analysis, and professional
            training in GEE, ArcGIS, AutoCAD, STAAD Pro &amp; Artificial Intelligence.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.38 } },
            }}
          >
            <motion.a
              href="#services"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO } },
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-xl shadow-blue-500/30 cursor-pointer"
            >
              Explore Services <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#courses"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO } },
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.08] text-white font-semibold backdrop-blur-sm cursor-pointer hover:bg-white/[0.12]"
            >
              <Play size={16} className="text-blue-300" />
              View Courses
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right column: Globe ─────────────────────────────────────────── */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: 60, scale: 0.94 }}
          animate={ready ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 60, scale: 0.94 }}
          transition={{ duration: 1, delay: 0.08, ease: EXPO }}
        >
          <div className="relative w-80 h-80">

            {/* Rotating rings */}
            {[
              { size: "100%", dur: "22s", dashed: false },
              { size: "78%",  dur: "16s", dashed: true },
              { size: "56%",  dur: "11s", dashed: false },
            ].map((ring, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: ring.size, height: ring.size,
                  top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  border: `1px ${ring.dashed ? "dashed" : "solid"} rgba(99,179,255,0.18)`,
                  animation: `rotateRing${i + 1} ${ring.dur} linear infinite`,
                }}
              />
            ))}

            {/* Globe sphere */}
            <div
              className="absolute rounded-full"
              style={{
                width: 192, height: 192,
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                background: "radial-gradient(circle at 35% 35%, #1d4ed8, #0c1445)",
                boxShadow: "0 0 80px rgba(37,99,235,0.35), inset 0 0 40px rgba(0,0,60,0.5)",
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
                <ellipse cx="100" cy="100" rx="95" ry="35" fill="none" stroke="rgba(147,197,253,0.25)" strokeWidth="1.5" />
                <ellipse cx="100" cy="100" rx="65" ry="35" fill="none" stroke="rgba(147,197,253,0.2)"  strokeWidth="1.2" />
                <ellipse cx="100" cy="100" rx="35" ry="35" fill="none" stroke="rgba(147,197,253,0.15)" strokeWidth="1" />
                <line x1="5"   y1="100" x2="195" y2="100" stroke="rgba(147,197,253,0.2)" strokeWidth="1.2" />
                <line x1="100" y1="5"   x2="100" y2="195" stroke="rgba(147,197,253,0.2)" strokeWidth="1.2" />
                <path d="M55 65 L80 60 L95 73 L88 90 L72 95 L55 83 Z" fill="rgba(52,211,153,0.55)" />
                <path d="M108 55 L135 50 L145 68 L138 83 L118 86 L106 73 Z" fill="rgba(52,211,153,0.45)" />
                <path d="M68 108 L95 106 L100 124 L83 135 L66 127 Z" fill="rgba(16,185,129,0.4)" />
                <circle cx="100" cy="100" r="5"   fill="#93c5fd" />
                <circle cx="78"  cy="78"  r="3"   fill="#6ee7b7" opacity="0.9" />
                <circle cx="128" cy="73"  r="3"   fill="#6ee7b7" opacity="0.9" />
                <circle cx="83"  cy="118" r="2.5" fill="#fbbf24" opacity="0.9" />
              </svg>
            </div>

            {/* Floating info cards */}
            {[
              { icon: <MapPin size={15} className="text-blue-400" />,    label: "LULC Analysis", pos: "-top-4 -left-8",  delay: 0.25, dur: "4s"   },
              { icon: <Monitor size={15} className="text-emerald-400" />, label: "GEE Platform",  pos: "-bottom-4 -left-6", delay: 0.4,  dur: "4.6s" },
              { icon: <Brain size={15} className="text-violet-400" />,   label: "AI Insights",   pos: "-top-2 -right-6",  delay: 0.55, dur: "5.2s" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.5, delay: card.delay, ease: EXPO }}
                className={`absolute ${card.pos} flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs font-medium shadow-lg`}
                style={{ animation: `floatCard ${card.dur} ease-in-out ${i * 1.2}s infinite` }}
              >
                {card.icon}
                {card.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            style={{ animation: "scrollDot 1.5s ease-in-out infinite" }}
          />
        </div>
      </motion.div>

    </section>
  );
}
