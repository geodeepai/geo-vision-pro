"use client";

import { useState } from "react";
import { ExternalLink, Bell, PlayCircle } from "lucide-react";

const CHANNEL_URL  = "https://www.youtube.com/@earthscience_lab";
const CHANNEL_NAME = "Earth Science Lab";
const CHANNEL_HANDLE = "@earthscience_lab";

/*
  To show a real embedded video, replace FEATURED_VIDEO_ID below with
  any video ID from your YouTube channel.
  Example: if your video URL is youtube.com/watch?v=dQw4w9WgXcQ
  then FEATURED_VIDEO_ID = "dQw4w9WgXcQ"
*/
const FEATURED_VIDEO_ID = ""; // ← paste your video ID here

function YTIcon({ size = 20, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
    </svg>
  );
}

export default function YouTubeSection() {
  const [subbed, setSubbed] = useState(false);

  return (
    <section
      id="youtube"
      className="py-20 px-5 sm:px-10"
      style={{ background: "var(--section-alt)", borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)" }}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-red-500">YouTube Channel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: "var(--heading)" }}>
              Watch &amp; Learn on <span style={{ color: "#ef4444" }}>YouTube</span>
            </h2>
            <p className="text-base" style={{ color: "var(--muted)" }}>
              Live sessions, tutorials, field updates and geospatial deep-dives — all on our channel.
            </p>
          </div>

          {/* Channel card */}
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl flex-shrink-0"
            style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#ef4444" }}>
              <YTIcon size={20} color="#fff" />
            </div>
            <div>
              <p className="font-black text-sm leading-none" style={{ color: "var(--heading)" }}>{CHANNEL_NAME}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{CHANNEL_HANDLE}</p>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <ExternalLink size={14} style={{ color: "var(--muted)" }} />
            </a>
          </div>
        </div>

        {/* Main embed area */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Video embed — takes 2 cols */}
          <div className="lg:col-span-2">
            {FEATURED_VIDEO_ID ? (
              /* Real video embed */
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl"
                style={{ paddingBottom: "56.25%", background: "#0a0c12" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${FEATURED_VIDEO_ID}?rel=0&modestbranding=1`}
                  title="DeepEarthScience YouTube Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              </div>
            ) : (
              /* Channel link card (shown when no video ID is set) */
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden text-center transition-all hover:scale-[1.01]"
                style={{
                  aspectRatio:  "16/9",
                  background:   "linear-gradient(135deg,#0f0a1a 0%,#1a0808 50%,#0a0f1a 100%)",
                  border:       "1px solid rgba(255,255,255,0.08)",
                  boxShadow:    "0 20px 60px rgba(0,0,0,0.30)",
                }}
              >
                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(239,68,68,0.18) 0%,transparent 70%)" }} />

                {/* Play button */}
                <div
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-2xl"
                  style={{ background: "#ef4444", boxShadow: "0 0 60px rgba(239,68,68,0.50)" }}
                >
                  <YTIcon size={36} color="#fff" />
                </div>

                <p className="relative z-10 text-white font-black text-xl mb-2">{CHANNEL_NAME}</p>
                <p className="relative z-10 text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {CHANNEL_HANDLE} · Click to visit our YouTube channel
                </p>

                <div
                  className="relative z-10 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white"
                  style={{ background: "#ef4444", boxShadow: "0 4px 20px rgba(239,68,68,0.40)" }}
                >
                  <YTIcon size={16} /> Watch on YouTube
                </div>

                {/* Scan lines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 4px)" }} />
              </a>
            )}
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">

            {/* Subscribe CTA */}
            <div
              className="rounded-2xl p-6 flex flex-col items-center text-center"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style={{ background: "#ef4444" }}>
                <YTIcon size={28} color="#fff" />
              </div>
              <p className="font-black text-lg mb-1" style={{ color: "var(--heading)" }}>Subscribe Free</p>
              <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                Get notified for every new video, live session, and tutorial we publish.
              </p>
              <button
                onClick={() => { setSubbed(true); window.open(`${CHANNEL_URL}?sub_confirmation=1`, "_blank"); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: subbed ? "#16a34a" : "#ef4444", boxShadow: `0 6px 20px ${subbed ? "rgba(22,163,74,0.30)" : "rgba(239,68,68,0.30)"}` }}
              >
                <Bell size={15} style={{ color: subbed ? "#bbf7d0" : undefined }} />
                {subbed ? "Subscribed ✓" : "Subscribe to Channel"}
              </button>
            </div>

            {/* What we cover */}
            <div
              className="rounded-2xl p-5 flex-1"
              style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
            >
              <p className="font-black text-sm mb-4" style={{ color: "var(--heading)" }}>What We Cover</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Remote Sensing & Satellite Analysis",
                  "GIS Mapping Tutorials",
                  "AI in Geospatial Science",
                  "Drone & UAV Field Surveys",
                  "Google Earth Engine Live",
                  "LULC Change Detection",
                ].map((topic, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--body-text)" }}>
                    <PlayCircle size={14} style={{ color: "#ef4444", flexShrink: 0 }} />
                    {topic}
                  </li>
                ))}
              </ul>

              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.20)" }}
              >
                <YTIcon size={14} color="#ef4444" /> View All Videos
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
