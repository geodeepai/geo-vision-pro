"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ── Photos — drop your images into /public/photos/
   Name them photo-01.jpg … photo-12.jpg (any JPG/PNG/WEBP).
   Cards below show a blue placeholder until real images are added.    ── */
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

/* ── Individual card with visible placeholder ──────────────────────────── */
function PhotoCard({ src, label }: { src: string; label: string }) {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-2xl"
      style={{ width: 260, height: 160 }}
    >
      {/* Placeholder: blue gradient + camera icon */}
      {status !== "ok" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg,#dbeafe 0%,#e0e7ff 60%,#f0f9ff 100%)",
            border: "1.5px dashed rgba(37,99,235,0.3)",
            borderRadius: "inherit",
          }}
        >
          {/* Camera icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
            stroke="rgba(37,99,235,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <p className="text-[11px] font-semibold text-center px-4 leading-tight" style={{ color: "rgba(37,99,235,0.6)" }}>
            {label}
          </p>
          {status === "error" && (
            <p className="text-[9px]" style={{ color: "rgba(37,99,235,0.35)" }}>
              Add to /public/photos/
            </p>
          )}
        </div>
      )}

      {/* Real image — fades in when loaded */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: status === "ok" ? 1 : 0 }}
        loading="eager"
        decoding="async"
        onLoad={() => setStatus("ok")}
        onError={() => setStatus("error")}
      />

      {/* Dark gradient + label — only over real photo */}
      {status === "ok" && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.62))" }}
          />
          <p className="absolute bottom-3 left-3 text-white text-xs font-bold leading-none drop-shadow-md">
            {label}
          </p>
        </>
      )}
    </div>
  );
}

/* ── Single sliding row ────────────────────────────────────────────────── */
function PhotoRow({ photos, direction }: {
  photos: { src: string; label: string }[];
  direction: 1 | -1;
}) {
  const doubled = [...photos, ...photos];
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)",
        WebkitMaskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)",
      }}
    >
      <motion.div
        className="flex gap-4"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((p, i) => (
          <PhotoCard key={`${p.src}-${i}`} src={p.src} label={p.label} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */
export default function WorkPhotoStrip() {
  return (
    <section
      className="relative overflow-hidden py-10 md:py-14"
      style={{ background: "var(--section-bg)", borderTop: "1px solid var(--divider)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(37,99,235,0.055) 1px,transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span
              className="text-[11px] font-black uppercase tracking-[0.16em]"
              style={{ color: "var(--muted)" }}
            >
              Official Work Gallery
            </span>
          </div>
          <div className="flex-1 h-px" style={{ background: "var(--divider)" }} />
          <span className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
            GeoVisionPro Projects
          </span>
        </div>
      </div>

      {/* Row 1 — left */}
      <div className="mb-4">
        <PhotoRow photos={PHOTOS_ROW_1} direction={1} />
      </div>

      {/* Row 2 — right */}
      <PhotoRow photos={PHOTOS_ROW_2} direction={-1} />
    </section>
  );
}
