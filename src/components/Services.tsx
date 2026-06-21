"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    href: "/consultancy",
    title: "Remote Sensing Consultancy",
    desc: "Advanced satellite and aerial image analysis for environmental monitoring, land cover mapping, and resource management.",
    bullets: ["Satellite Image Processing", "Spectral Analysis & Classification", "Change Detection Studies", "Environmental Impact Assessment"],
    accent: "#3b82f6",
    grad: "linear-gradient(135deg,#1e3a5f 0%,#0f2040 100%)",
    span: "lg:col-span-2",
  },
  {
    num: "02",
    title: "LULC Analysis & Mapping",
    desc: "Multi-temporal land use mapping for urban planning, agriculture monitoring, and forest management.",
    bullets: ["Multi-temporal LULC Mapping", "Urban Sprawl Analysis", "Agricultural Monitoring", "Forest Cover Assessment"],
    accent: "#10b981",
    grad: "linear-gradient(135deg,#0d2e22 0%,#071a14 100%)",
    span: "",
  },
  {
    num: "03",
    title: "GIS & Spatial Analysis",
    desc: "Geospatial data analysis, spatial modeling, and cartographic outputs for informed decision-making.",
    bullets: ["Spatial Data Management", "Geostatistical Analysis", "3D Terrain Modeling", "Custom Map Production"],
    accent: "#a855f7",
    grad: "linear-gradient(135deg,#1e1040 0%,#10082a 100%)",
    span: "",
  },
  {
    num: "04",
    title: "Drone & UAV Mapping",
    desc: "High-resolution UAV survey services for precise topographic mapping, volumetric analysis, and site inspection.",
    bullets: ["Aerial Photogrammetry", "Orthomosaic Generation", "Digital Elevation Models", "Volume Calculations"],
    accent: "#f97316",
    grad: "linear-gradient(135deg,#2a1200 0%,#1a0a00 100%)",
    span: "",
  },
  {
    num: "05",
    title: "AI-Powered Geo-Analytics",
    desc: "Machine learning and deep learning for automated feature extraction, predictive modeling, and large-scale geospatial analysis.",
    bullets: ["Deep Learning Classification", "Predictive Land Use Modeling", "Automated Feature Extraction", "Big Data Geo-processing"],
    accent: "#06b6d4",
    grad: "linear-gradient(135deg,#00202a 0%,#001018 100%)",
    span: "",
  },
  {
    num: "06",
    title: "Structural & Civil Consulting",
    desc: "Expert structural analysis and design consulting integrating modern software tools with geospatial data.",
    bullets: ["Structural Design Reviews", "Site Feasibility Studies", "Infrastructure Planning", "STAAD Pro Analysis"],
    accent: "#f59e0b",
    grad: "linear-gradient(135deg,#1f1200 0%,#100900 100%)",
    span: "lg:col-span-2",
  },
];

type Service = typeof services[0];

function ServiceCard({ s, index }: { s: Service; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative group rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 ${s.span}`}
      style={{
        background: s.grad,
        border: `1px solid ${hovered ? s.accent + "55" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 40px ${s.accent}22, 0 20px 60px rgba(0,0,0,0.4)` : "0 4px 24px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Big faded number watermark */}
      <div
        className="absolute top-0 right-4 font-black leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(5rem,14vw,9rem)",
          color: s.accent,
          opacity: hovered ? 0.12 : 0.07,
          transition: "opacity 0.35s ease",
          lineHeight: 1,
        }}
      >
        {s.num}
      </div>

      {/* Top accent bar */}
      <div
        className="absolute top-0 inset-x-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg,${s.accent},${s.accent}44,transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.35s ease",
        }}
      />

      <div className="relative z-10 p-7 sm:p-8 flex flex-col h-full">
        {/* Number + accent dot */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="text-[11px] font-black uppercase tracking-[0.22em]"
            style={{ color: s.accent }}
          >
            {s.num}
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ background: s.accent }}
          />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
            Service
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold mb-3 leading-tight"
          style={{
            fontSize: "clamp(1.1rem,2.2vw,1.35rem)",
            color: "#f8fafc",
          }}
        >
          {s.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "rgba(255,255,255,0.52)" }}
        >
          {s.desc}
        </p>

        {/* Bullets */}
        <ul className="flex flex-col gap-2 mb-7 flex-1">
          {s.bullets.map((b, j) => (
            <li key={j} className="flex items-center gap-2.5 text-[13px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.accent }} />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div>
          {s.href ? (
            <Link
              href={s.href}
              className="inline-flex items-center gap-2 text-[13px] font-bold transition-all"
              style={{ color: s.accent }}
            >
              Learn More
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: s.accent + "22",
                  transform: hovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                <ArrowUpRight size={13} />
              </span>
            </Link>
          ) : (
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] font-bold transition-all"
              style={{ color: s.accent }}
            >
              Inquire Now
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: s.accent + "22",
                  transform: hovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                <ArrowUpRight size={13} />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 md:py-28 px-5 sm:px-8"
      style={{ background: "#070a10" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="text-[11px] font-black uppercase tracking-[0.28em] mb-4"
              style={{ color: "#3b82f6" }}
            >
              What We Do
            </p>
            <h2
              className="font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem,5vw,3.5rem)",
                color: "#f8fafc",
                letterSpacing: "-0.02em",
              }}
            >
              Our Consultancy<br />
              <span style={{
                background: "linear-gradient(90deg,#3b82f6,#a855f7,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Services
              </span>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed sm:text-right"
            style={{ color: "rgba(255,255,255,0.40)" }}
          >
            End-to-end geospatial solutions — from data acquisition to actionable intelligence.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={i} s={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
