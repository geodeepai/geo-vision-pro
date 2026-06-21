"use client";

import Link from "next/link";
import VisitorCount from "./VisitorCount";

const footerLinks = {
  Services: [
    { label: "Remote Sensing",        href: "/consultancy" },
    { label: "LULC Mapping",          href: "/lulc" },
    { label: "GIS Analysis",          href: "/gis" },
    { label: "Drone Mapping",         href: "/drone" },
    { label: "AI Geo-Analytics",      href: "/ai-geo" },
    { label: "Structural Consulting", href: "/structural" },
  ],
  Courses: [
    { label: "Google Earth Engine", href: "/learn/academy" },
    { label: "ArcGIS Pro",          href: "/learn/academy" },
    { label: "AutoCAD",             href: "/learn/academy" },
    { label: "STAAD Pro",           href: "/learn/academy" },
    { label: "AI & ML",             href: "/learn/academy" },
    { label: "Remote Sensing",      href: "/learn/academy" },
  ],
  "Quick Links": [
    { label: "About Us",       href: "#about" },
    { label: "Our Process",    href: "#process" },
    { label: "Contact",        href: "#contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use",   href: "/terms" },
    { label: "Help & Support", href: "/help" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#080c14 0%,#050810 100%)",
        borderTop: "1px solid rgba(59,130,246,0.18)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-120px", left: "-80px",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-80px", right: "-60px",
          width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-18">

        {/* Top grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                  <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-[17px] text-white">
                DeepEarth<span style={{ color: "#60a5fa" }}>Science</span>
              </span>
            </a>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Premier consultancy and training institute in Remote Sensing, GIS, and geospatial technologies — delivering measurable impact across India and beyond.
            </p>

            {/* Social follow — NASA style */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] mb-3" style={{ color: "rgba(96,165,250,0.70)" }}>
                Follow Us
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  {
                    label: "Facebook", href: "https://www.facebook.com/login", color: "#1877f2",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Instagram", href: "https://www.instagram.com/accounts/login/", color: "#e1306c",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "X (Twitter)", href: "https://x.com/login", color: "#e7e9ea",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube", href: "https://www.youtube.com/@earthscience_lab", color: "#ff0000",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
                      </svg>
                    ),
                  },
                ].map(({ label, href, color, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1"
                    style={{
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.50)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = color;
                      (e.currentTarget as HTMLElement).style.borderColor = color + "55";
                      (e.currentTarget as HTMLElement).style.background = color + "15";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${color}30`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.50)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4
                className="text-[11px] font-black uppercase tracking-[0.22em] mb-5"
                style={{ color: "#60a5fa" }}
              >
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] transition-colors"
                      style={{ color: "rgba(255,255,255,0.42)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#f0f6ff"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)"}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div
          className="rounded-2xl p-5 mb-10 flex flex-wrap gap-8 items-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            { label: "Email",    value: "info@DeepEarthScience.com" },
            { label: "Training", value: "training@DeepEarthScience.com" },
            { label: "Coverage", value: "Pan India & Global" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p
                className="text-[10px] font-black uppercase tracking-[0.22em] mb-1"
                style={{ color: "rgba(96,165,250,0.70)" }}
              >
                {label}
              </p>
              <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.80)" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.28)" }}
        >
          <p>&copy; 2026 Deep Earth Science. All rights reserved.</p>
          <VisitorCount />
          <div className="flex gap-5">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms",   href: "/terms" },
              { label: "Help",    href: "/help" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors"
                style={{ color: "rgba(255,255,255,0.28)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)"}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
