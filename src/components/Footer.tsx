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
    { label: "About Us",      href: "#about" },
    { label: "Our Process",   href: "#process" },
    { label: "Contact",       href: "#contact" },
    { label: "Privacy Policy",href: "/privacy" },
    { label: "Terms of Use",  href: "/terms" },
    { label: "Help & Support",href: "/help" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--section-alt)", borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                  <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-lg" style={{ color: "var(--heading)" }}>
                GeoVision<span className="text-blue-600">Pro</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "var(--body-text)" }}>
              Premier consultancy and training institute in Remote Sensing, GIS, and geospatial technologies — delivering measurable impact across India and beyond.
            </p>
            <div className="flex gap-2.5">
              {["Li", "YT"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s === "Li" ? "LinkedIn" : "YouTube"}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:-translate-y-0.5"
                  style={{ border: "1px solid var(--card-border)", color: "var(--body-text)", background: "var(--card-bg)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#2563eb"; (e.currentTarget as HTMLElement).style.color = "#2563eb"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--card-border)"; (e.currentTarget as HTMLElement).style.color = "var(--body-text)"; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold mb-4 tracking-wide" style={{ color: "var(--heading)" }}>{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-blue-600"
                      style={{ color: "var(--body-text)" }}
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
          className="rounded-2xl p-5 mb-8 flex flex-wrap gap-6 items-center"
          style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
        >
          {[
            { label: "Email", value: "info@geovisionpro.com" },
            { label: "Training", value: "training@geovisionpro.com" },
            { label: "Coverage", value: "Pan India & Global" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--muted)" }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs pt-6" style={{ borderTop: "1px solid var(--divider)", color: "var(--muted)" }}>
          <p>&copy; 2026 GeoVision Pro. All rights reserved.</p>
          <VisitorCount />
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
            <Link href="/help" className="hover:text-blue-600 transition-colors">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
