"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

interface Stat  { val: string; label: string; }
interface Crumb { label: string; href?: string; }

interface SubpageHeroProps {
  crumbs:      Crumb[];
  badge:       string;
  title:       string;
  highlight?:  string;        // part of title shown in accent colour
  desc:        string;
  accent:      string;        // service colour e.g. "#059669"
  stats?:      Stat[];
  ctaLabel?:   string;
  ctaHref?:    string;
  secondLabel?: string;
  secondHref?:  string;
}

export default function SubpageHero({
  crumbs, badge, title, highlight, desc, accent,
  stats, ctaLabel = "Request Consultation", ctaHref = "#contact",
  secondLabel, secondHref,
}: SubpageHeroProps) {

  const accentDim = accent + "18";
  const accentBrd = accent + "35";

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "#ffffff", borderBottom: "1px solid #e8edf5" }}
    >
      {/* Very subtle background tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% -10%, ${accentDim} 0%, transparent 70%)` }}
      />

      {/* Thin accent stripe at very top */}
      <div style={{ height: 3, background: `linear-gradient(90deg,${accent},${accent}88,transparent)` }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-14">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-slate-400 mb-8 flex-wrap">
          <Link href="/" className="flex items-center gap-1 hover:text-slate-600 transition-colors">
            <Home size={11} /> Home
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="text-slate-300">/</span>
              {c.href ? (
                <Link href={c.href} className="hover:text-slate-600 transition-colors">{c.label}</Link>
              ) : (
                <span className="text-slate-600 font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-10">
          {/* Left: text */}
          <div className="max-w-2xl">
            {/* Badge */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-5 uppercase tracking-wide"
              style={{ background: accentDim, color: accent, border: `1px solid ${accentBrd}` }}
            >
              {badge}
            </span>

            {/* Title */}
            <h1
              className="font-black leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#0d1117", letterSpacing: "-0.02em" }}
            >
              {highlight
                ? <>
                    {title.split(highlight)[0]}
                    <span style={{ color: accent }}>{highlight}</span>
                    {title.split(highlight)[1]}
                  </>
                : title}
            </h1>

            {/* Description */}
            <p className="text-[15px] leading-relaxed mb-8 text-slate-500 max-w-xl">{desc}</p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: accent, boxShadow: `0 4px 18px ${accent}40` }}
              >
                {ctaLabel} <ArrowRight size={14} />
              </a>
              {secondLabel && secondHref && (
                <a
                  href={secondHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{ color: accent, border: `1.5px solid ${accentBrd}`, background: accentDim }}
                >
                  {secondLabel} <ArrowRight size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Right: Stats grid */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="px-5 py-4 rounded-2xl text-center"
                  style={{ background: accentDim, border: `1px solid ${accentBrd}` }}
                >
                  <p className="text-2xl font-black mb-0.5" style={{ color: accent }}>{s.val}</p>
                  <p className="text-[11px] font-semibold text-slate-500 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
