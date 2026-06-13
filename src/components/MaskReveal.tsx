"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Brand chars split for per-character mask reveal
const BRAND = "GeoVision";
const BRAND_ACCENT = "Pro";
const TAGLINE = "Remote Sensing  ·  GIS  ·  AI";

export default function MaskReveal() {
  const [gone, setGone] = useState(false);
  const topRef    = useRef<HTMLDivElement>(null);
  const botRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll during intro
    document.documentElement.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete() {
        document.documentElement.style.overflow = "";
        window.dispatchEvent(new CustomEvent("intro:done"));
        setGone(true);
      },
    });

    // ── Phase 1: Logo icon bounces in ──────────────────────────────────
    tl.from(".mr-logo", {
      scale: 0.45,
      opacity: 0,
      rotation: -12,
      duration: 0.55,
      ease: "back.out(1.8)",
      delay: 0.1,
    });

    // ── Phase 2: Brand characters cascade up ──────────────────────────
    // Each char is wrapped in overflow:hidden so the slide-up masks cleanly
    tl.from(
      ".mr-char",
      {
        yPercent: 115,
        duration: 0.65,
        stagger: 0.04,
        ease: "power4.out",
      },
      "-=0.25"
    );

    // ── Phase 3: Divider line draws from center out ────────────────────
    tl.from(
      ".mr-line",
      {
        scaleX: 0,
        transformOrigin: "center",
        duration: 0.45,
        ease: "power3.out",
      },
      "-=0.3"
    );

    // ── Phase 4: Tagline letter-spacing fade ──────────────────────────
    tl.from(
      ".mr-tagline",
      {
        opacity: 0,
        letterSpacing: "0.5em",
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // ── Phase 5: Hold ─────────────────────────────────────────────────
    tl.to({}, { duration: 0.28 });

    // ── Phase 6: Divider glow flash just before curtain splits ─────────
    tl.to(dividerRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: "none",
    });
    tl.to(dividerRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "none",
    });

    // ── Phase 7: Content fades/rises as curtain lifts ─────────────────
    tl.to(
      contentRef.current,
      { opacity: 0, y: -22, duration: 0.28, ease: "power2.in" },
      "-=0.05"
    );

    // ── Phase 8: Split curtain reveal ─────────────────────────────────
    tl.to(
      topRef.current,
      { yPercent: -102, duration: 0.88, ease: "power3.inOut" },
      "-=0.1"
    );
    tl.to(
      botRef.current,
      { yPercent: 102, duration: 0.88, ease: "power3.inOut" },
      "<" // concurrent with top panel
    );

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-[200]" aria-hidden="true">

      {/* Top half panel */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 right-0 h-[50.5vh] bg-[#060d1f]"
        style={{ willChange: "transform" }}
      />

      {/* Bottom half panel */}
      <div
        ref={botRef}
        className="absolute bottom-0 left-0 right-0 h-[50.5vh] bg-[#060d1f]"
        style={{ willChange: "transform" }}
      />

      {/* Divider glow line (flashes just before split) */}
      <div
        ref={dividerRef}
        className="absolute left-0 right-0 h-px opacity-0 pointer-events-none"
        style={{
          top: "50%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.9) 40%, rgba(167,139,250,0.9) 60%, transparent 100%)",
          boxShadow: "0 0 24px 4px rgba(96,165,250,0.5)",
        }}
      />

      {/* Centered brand content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none"
      >
        {/* Logo icon */}
        <div
          className="mr-logo w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            boxShadow: "0 0 48px rgba(99,102,241,0.55), 0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
            <path
              d="M4 12 Q8 6 12 12 Q16 18 20 12"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="2.5" fill="white" />
          </svg>
        </div>

        {/* Brand name — each character in its own overflow:hidden mask */}
        <div className="flex items-baseline gap-[0.18em]">
          {/* "GeoVision" — white */}
          <div className="flex items-baseline">
            {BRAND.split("").map((ch, i) => (
              <span
                key={i}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <span
                  className="mr-char inline-block text-white"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </div>

          {/* "Pro" — blue accent */}
          <div className="flex items-baseline">
            {BRAND_ACCENT.split("").map((ch, i) => (
              <span
                key={i}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <span
                  className="mr-char inline-block"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: "#60a5fa",
                  }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Divider line */}
        <div
          className="mr-line w-40 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(96,165,250,0.7), transparent)",
          }}
        />

        {/* Tagline */}
        <p
          className="mr-tagline text-slate-400 text-xs tracking-[0.3em] uppercase"
        >
          {TAGLINE}
        </p>
      </div>
    </div>
  );
}
