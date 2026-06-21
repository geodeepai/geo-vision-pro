"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, BookOpen, CalendarDays, ChevronRight, ArrowUpRight } from "lucide-react";

const LEARN_NAV = [
  {
    label: "Academy",
    href:  "/learn/academy",
    Icon:  GraduationCap,
    desc:  "Courses & Certifications",
    color: "#1d9e75",
  },
  {
    label: "Tutorials",
    href:  "/learn/tutorials",
    Icon:  BookOpen,
    desc:  "Step-by-step guides",
    color: "#3b82f6",
  },
  {
    label: "Events",
    href:  "/learn/events",
    Icon:  CalendarDays,
    desc:  "Workshops & Conferences",
    color: "#8b5cf6",
  },
];

/* ── Inline DeepEarthScience logo mark ──────────────────────────────── */
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <div
      style={{
        width:        size,
        height:       size,
        borderRadius: size * 0.3,
        background:   "linear-gradient(135deg,#3b82f6,#4f46e5)",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        flexShrink:   0,
        boxShadow:    "0 0 12px rgba(59,130,246,0.35)",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" style={{ width: size * 0.56, height: size * 0.56 }}>
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6" />
        <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.2" fill="white" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const path   = usePathname();
  const active = LEARN_NAV.find(n => path.startsWith(n.href));

  return (
    <>
      {/* Spacer for fixed main Navbar (h-16 = 64 px) */}
      <div className="h-16" aria-hidden="true" />

      {/* ══ Learn sub-header ══ */}
      <nav
        className="sticky top-16 z-40"
        style={{
          background:          "rgba(255,255,255,0.97)",
          backdropFilter:      "blur(20px) saturate(180%)",
          WebkitBackdropFilter:"blur(20px) saturate(180%)",
          borderBottom:        "1px solid #e8edf5",
          boxShadow:           "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-0">

          {/* ── Brand / Back link ── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 pr-5 mr-5 flex-shrink-0 transition-all duration-200"
            style={{ borderRight: "1px solid rgba(0,0,0,0.07)" }}
          >
            <LogoMark size={28} />
            <div className="hidden sm:block leading-none">
              <span
                className="text-[13px] font-black tracking-tight transition-colors duration-200 group-hover:text-slate-900"
                style={{ color: "#0f172a" }}
              >
                DeepEarth<span style={{ color: "#3b82f6" }}>Science</span>
              </span>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="text-[9px] font-semibold uppercase tracking-widest transition-colors duration-200"
                  style={{ color: "#94a3b8" }}>
                  Main Site
                </span>
                <ArrowUpRight size={8} style={{ color: "#94a3b8" }}
                  className="group-hover:text-[#1d9e75] group-hover:-translate-y-px group-hover:translate-x-px transition-all duration-150" />
              </div>
            </div>
          </Link>

          {/* ── "Learn" label + breadcrumb (md+) ── */}
          <div className="hidden md:flex items-center gap-1.5 mr-5 flex-shrink-0">
            <span
              className="text-[11px] font-black uppercase tracking-[0.14em] px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(29,158,117,0.12)",
                border:     "1px solid rgba(29,158,117,0.22)",
                color:      "#1d9e75",
              }}
            >
              Learn
            </span>
            {active && (
              <>
                <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.2)" }} />
                <span
                  className="text-[12px] font-bold"
                  style={{ color: active.color }}
                >
                  {active.label}
                </span>
              </>
            )}
          </div>

          {/* vertical rule */}
          <div className="hidden md:block w-px h-6 mr-5 flex-shrink-0"
            style={{ background: "linear-gradient(180deg,transparent,rgba(0,0,0,0.12),transparent)" }} />

          {/* ── Section tabs ── */}
          <div
            className="flex items-center gap-1 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {LEARN_NAV.map(({ label, href, Icon, desc, color }) => {
              const isActive = path.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="group relative flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all duration-200"
                  style={{
                    background: isActive
                      ? `${color}18`
                      : "transparent",
                    border: isActive
                      ? `1px solid ${color}35`
                      : "1px solid transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                      e.currentTarget.style.border     = "1px solid rgba(0,0,0,0.07)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.border     = "1px solid transparent";
                    }
                  }}
                >
                  {/* Icon bubble */}
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: isActive ? `${color}22` : "rgba(255,255,255,0.06)",
                      border:     isActive ? `1px solid ${color}44` : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon
                      size={12}
                      style={{ color: isActive ? color : "#64748b" }}
                      className="transition-colors duration-200 group-hover:text-slate-700"
                    />
                  </div>

                  {/* Label */}
                  <div className="leading-none">
                    <p
                      className="text-[13px] font-bold leading-none transition-colors duration-200"
                      style={{ color: isActive ? "#0f172a" : "#475569" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-[9px] mt-0.5 hidden sm:block transition-colors duration-200"
                      style={{ color: isActive ? color : "#94a3b8" }}
                    >
                      {desc}
                    </p>
                  </div>

                  {/* Active bottom accent line */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full"
                      style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right: stat pill + CTA ── */}
          <div className="ml-auto flex-shrink-0 hidden lg:flex items-center gap-3 pl-4"
            style={{ borderLeft: "1px solid rgba(0,0,0,0.07)" }}>

            {/* Live stat */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.18)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d9e75] animate-pulse flex-shrink-0" />
              <span className="text-[11px] font-bold" style={{ color: "#1d9e75" }}>10,000+</span>
              <span className="text-[11px]" style={{ color: "#64748b" }}>enrolled</span>
            </div>

            {/* CTA */}
            <Link
              href="/learn/academy"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-black text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
              style={{
                background: "linear-gradient(135deg,#1d9e75,#16856200)",
                backgroundImage: "linear-gradient(135deg,#22c48a,#1d9e75)",
                boxShadow:  "0 2px 12px rgba(29,158,117,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <GraduationCap size={13} />
              Enroll Now
            </Link>
          </div>

        </div>
      </nav>

      {/* ── Page content ── */}
      {children}
    </>
  );
}
