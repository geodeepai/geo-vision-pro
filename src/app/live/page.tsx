"use client";

import { useState } from "react";
import {
  Radio, Bell, ExternalLink, Calendar,
  Users, PlayCircle, ChevronRight,
} from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

function YTIcon({ size = 20, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
    </svg>
  );
}

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@earthscience_lab";
const YOUTUBE_LIVE_URL    = "https://www.youtube.com/@earthscience_lab/live";

const UPCOMING = [
  { date: "Coming Soon", title: "Google Earth Engine: Beginner to Advanced",  desc: "Live workshop — cloud-based geospatial analysis" },
  { date: "Coming Soon", title: "LULC Change Detection with Sentinel-2",       desc: "Step-by-step live mapping session" },
  { date: "Coming Soon", title: "AI in Remote Sensing — Q&A Session",          desc: "Ask our experts anything about geospatial AI" },
];

const PAST_HIGHLIGHTS = [
  { thumb: null, title: "Drone Survey Planning — Field Operations",  views: "1.2K", duration: "1:14:32" },
  { thumb: null, title: "ArcGIS Pro Advanced Mapping Techniques",   views: "2.4K", duration: "58:17" },
  { thumb: null, title: "Introduction to GIS for Beginners",        views: "5.8K", duration: "1:02:45" },
  { thumb: null, title: "Satellite Image Classification with ML",   views: "3.1K", duration: "47:20" },
];

function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
    </span>
  );
}

export default function LivePage() {
  const [subClicked, setSubClicked] = useState(false);

  return (
    <main className="min-h-screen bg-white pt-14">

      <SubpageHero
        crumbs={[{ label: "GEO+ Live" }]}
        badge="Live Broadcasts"
        title="DeepEarthScience Live"
        highlight="Live"
        desc="Watch live workshops, webinars, and expert Q&A sessions on remote sensing, GIS, drone mapping, and AI geospatial analytics — directly on our YouTube channel."
        accent="#ef4444"
        ctaLabel="Open YouTube Channel"
        ctaHref={YOUTUBE_CHANNEL_URL}
        secondLabel="Subscribe & Get Notified"
        secondHref={YOUTUBE_LIVE_URL + "?sub_confirmation=1"}
        stats={[
          { val: "Live", label: "Weekly Sessions" },
          { val: "4+", label: "Topics Covered" },
          { val: "Free", label: "All Sessions" },
          { val: "YT", label: "On YouTube" },
        ]}
      />

      {/* ── Live now sticky bar ─────────────────────────────── */}
      <div
        className="sticky top-14 z-40 flex items-center justify-between px-5 sm:px-10 h-11 text-sm"
        style={{ background: "rgba(255,255,255,0.97)", borderBottom: "1px solid rgba(0,0,0,0.06)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-2">
          <LiveDot />
          <span className="font-black text-[11px] uppercase tracking-widest text-red-500">GEO+ Live</span>
        </div>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-red-500 hover:text-red-600 transition-colors"
        >
          <YTIcon size={15} color="#ef4444" /> YouTube <ExternalLink size={11} />
        </a>
      </div>

      {/* ── Live embed ─────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 py-10 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)" }}
          >
            <LiveDot />
            <span className="text-[11px] font-black uppercase tracking-widest text-red-500">Live Now</span>
          </div>
          <span className="text-sm text-slate-500">If no stream is active, you&apos;ll see our latest uploaded video</span>
        </div>

        {/* Watch Live card — intentionally dark, represents a video player */}
        <a
          href={YOUTUBE_LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center transition-all hover:scale-[1.01]"
          style={{
            aspectRatio: "16/9",
            background: "linear-gradient(135deg,#0f0a1a 0%,#1a0a0a 50%,#0a0f1a 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.14)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,68,68,0.15) 0%, transparent 70%)" }} />
          <div
            className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
            style={{ background: "#ef4444", boxShadow: "0 0 60px rgba(239,68,68,0.45)" }}
          >
            <YTIcon size={36} color="#fff" />
          </div>
          <p className="relative z-10 text-white font-black text-xl mb-2">Watch Live on YouTube</p>
          <p className="relative z-10 text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            @earthscience_lab — Click to open the live stream in YouTube
          </p>
          <div
            className="relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white"
            style={{ background: "#ef4444", boxShadow: "0 4px 20px rgba(239,68,68,0.40)" }}
          >
            <YTIcon size={16} /> Open Live Stream <ExternalLink size={13} />
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 4px)" }} />
        </a>

        {/* Channel CTA */}
        <div
          className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-6 py-4"
          style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#ef4444" }}>
              <YTIcon size={20} color="#fff" />
            </div>
            <div>
              <p className="font-black text-sm text-slate-900">DeepEarthScience Official</p>
              <p className="text-xs text-slate-500">Subscribe for live sessions, tutorials & project walkthroughs</p>
            </div>
          </div>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white whitespace-nowrap transition-all hover:opacity-90"
            style={{ background: "#ef4444" }}
          >
            <YTIcon size={15} /> Visit Channel <ExternalLink size={12} />
          </a>
        </div>

        {/* Subscribe button */}
        <div className="mt-4">
          <button
            onClick={() => { setSubClicked(true); window.open(YOUTUBE_LIVE_URL + "?sub_confirmation=1", "_blank"); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", color: "#ef4444" }}
          >
            <Bell size={15} style={{ color: subClicked ? "#fbbf24" : undefined }} />
            {subClicked ? "Subscribed ✓" : "Subscribe & Get Notified"}
          </button>
        </div>
      </section>

      {/* ── Upcoming streams ───────────────────────────────────── */}
      <section className="px-5 sm:px-10 py-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Upcoming Live Sessions</h2>
            <p className="text-sm mt-0.5 text-slate-500">Subscribe to get notified before each session starts</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <Calendar size={13} /> Schedule
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {UPCOMING.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all"
              style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.16)" }}
              >
                <Radio size={18} color="#ef4444" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-snug text-slate-800">{s.title}</p>
                <p className="text-xs mt-0.5 truncate text-slate-500">{s.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "#ef4444" }}>{s.date}</p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold flex items-center gap-0.5 mt-0.5 justify-end text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Set reminder <ChevronRight size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Past highlights ────────────────────────────────────── */}
      <section className="px-5 sm:px-10 py-10 pb-20 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Past Highlights</h2>
            <p className="text-sm mt-0.5 text-slate-500">Missed a session? Catch up on our channel</p>
          </div>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
          >
            View All <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {PAST_HIGHLIGHTS.map((v, i) => (
            <a
              key={i}
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl overflow-hidden transition-all hover:-translate-y-1"
              style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{ aspectRatio: "16/9", background: "#f1f5f9" }}
              >
                <PlayCircle size={40} className="text-slate-300 group-hover:text-red-400 transition-colors" />
                <span
                  className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
                >
                  {v.duration}
                </span>
              </div>
              <div className="p-4">
                <p className="font-bold text-sm leading-snug mb-1 text-slate-800 group-hover:text-red-500 transition-colors">
                  {v.title}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1"><Users size={11} /> {v.views} views</span>
                  <span className="flex items-center gap-1"><YTIcon size={11} color="#94a3b8" /> DeepEarthScience</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
