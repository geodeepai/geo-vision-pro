"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const BRAND        = "GeoVision";
const BRAND_ACCENT = "Pro";
const TAGLINE      = "Remote Sensing  ·  GIS  ·  AI";

export default function MaskReveal() {
  const [gone,    setGone]    = useState(false);
  const [count,   setCount]   = useState(0);
  const topRef     = useRef<HTMLDivElement>(null);
  const botRef     = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    /* ── Progress counter tick ──────────────────────────────────────── */
    let frame = 0;
    const total = 72; /* ~1.8s at 40fps */
    const interval = setInterval(() => {
      frame++;
      setCount(Math.min(100, Math.round((frame / total) * 100)));
      if (frame >= total) clearInterval(interval);
    }, 25);

    const tl = gsap.timeline({
      onComplete() {
        document.documentElement.style.overflow = "";
        clearInterval(interval);
        setCount(100);
        window.dispatchEvent(new CustomEvent("intro:done"));
        setGone(true);
      },
    });

    /* ── Phase 1: Logo icon bounces in ──────────────────────────────── */
    tl.from(".mr-logo", {
      scale: 0.4,
      opacity: 0,
      rotation: -18,
      duration: 0.6,
      ease: "back.out(2)",
      delay: 0.1,
    });

    /* ── Phase 2: Brand chars cascade up ────────────────────────────── */
    tl.from(".mr-char", {
      yPercent: 115,
      duration: 0.65,
      stagger: 0.038,
      ease: "power4.out",
    }, "-=0.25");

    /* ── Phase 3: Progress bar fills ─────────────────────────────────── */
    tl.from(barRef.current, {
      scaleX: 0,
      transformOrigin: "left",
      duration: 0.45,
      ease: "power3.out",
    }, "-=0.5");

    /* ── Phase 4: Divider line draws out ─────────────────────────────── */
    tl.from(".mr-line", {
      scaleX: 0,
      transformOrigin: "center",
      duration: 0.4,
      ease: "power3.out",
    }, "-=0.3");

    /* ── Phase 5: Tagline fades in ───────────────────────────────────── */
    tl.from(".mr-tagline", {
      opacity: 0,
      letterSpacing: "0.5em",
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.2");

    /* ── Phase 6: Hold ───────────────────────────────────────────────── */
    tl.to({}, { duration: 0.22 });

    /* ── Phase 7: Divider glow flash ─────────────────────────────────── */
    tl.to(dividerRef.current, { opacity: 1, duration: 0.08, ease: "none" });
    tl.to(dividerRef.current, { opacity: 0, duration: 0.08, ease: "none" });

    /* ── Phase 8: Content fades up ───────────────────────────────────── */
    tl.to(contentRef.current, {
      opacity: 0,
      y: -28,
      duration: 0.26,
      ease: "power2.in",
    }, "-=0.04");

    /* ── Phase 9: Curtain splits ─────────────────────────────────────── */
    tl.to(topRef.current, { yPercent: -102, duration: 0.9, ease: "power3.inOut" }, "-=0.08");
    tl.to(botRef.current, { yPercent:  102, duration: 0.9, ease: "power3.inOut" }, "<");

    return () => {
      tl.kill();
      clearInterval(interval);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[200]" aria-hidden="true">

      {/* Top half */}
      <div ref={topRef} className="absolute top-0 left-0 right-0 h-[50.5vh] bg-[#060d1f]" style={{ willChange: "transform" }} />

      {/* Bottom half */}
      <div ref={botRef} className="absolute bottom-0 left-0 right-0 h-[50.5vh] bg-[#060d1f]" style={{ willChange: "transform" }} />

      {/* Glow line at split */}
      <div
        ref={dividerRef}
        className="absolute left-0 right-0 h-px opacity-0 pointer-events-none"
        style={{
          top: "50%",
          background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.85) 35%,rgba(123,97,255,0.85) 65%,transparent)",
          boxShadow: "0 0 28px 6px rgba(0,212,255,0.4)",
        }}
      />

      {/* Centered brand content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none select-none"
      >
        {/* Logo icon */}
        <div
          className="mr-logo w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg,#0077FF,#00D4FF)",
            boxShadow: "0 0 56px rgba(0,212,255,0.5), 0 20px 44px rgba(0,0,0,0.5)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
            <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2.5" fill="white" />
          </svg>
        </div>

        {/* Brand name */}
        <div className="flex items-baseline gap-[0.18em]">
          <div className="flex items-baseline">
            {BRAND.split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span
                  className="mr-char inline-block text-white"
                  style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </div>
          <div className="flex items-baseline">
            {BRAND_ACCENT.split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                <span
                  className="mr-char inline-block"
                  style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#00D4FF" }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="mr-line w-40 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.7),transparent)" }}
        />

        {/* Tagline */}
        <p className="mr-tagline text-slate-400 text-xs tracking-[0.3em] uppercase">{TAGLINE}</p>

        {/* Progress bar + counter */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-32 sm:w-48 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              ref={barRef}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg,#0077FF,#00D4FF)",
                width: `${count}%`,
                transition: "width 0.025s linear",
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 w-8 text-right">{count}%</span>
        </div>
      </div>
    </div>
  );
}
