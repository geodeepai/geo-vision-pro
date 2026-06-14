"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, GraduationCap, BookOpen, CalendarDays, Home } from "lucide-react";

const LEARN_NAV = [
  { label: "Academy",   href: "/learn/academy",   Icon: GraduationCap },
  { label: "Tutorials", href: "/learn/tutorials", Icon: BookOpen       },
  { label: "Events",    href: "/learn/events",    Icon: CalendarDays   },
];

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const active = LEARN_NAV.find(n => path.startsWith(n.href));

  return (
    <>
      {/* Spacer for the fixed main Navbar (h-16 = 64px) */}
      <div className="h-16" aria-hidden="true" />

      {/* ── Learn sub-header ── */}
      <nav
        className="sticky top-16 z-40"
        style={{
          background:    "rgba(10,22,40,0.97)",
          borderBottom:  "1px solid rgba(29,158,117,0.22)",
          backdropFilter:"blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-0">

          {/* ── Back to main site ── */}
          <Link
            href="/"
            className="flex items-center gap-2 pr-4 mr-4 flex-shrink-0 transition-all group"
            style={{
              color:       "#b0c4d8",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#b0c4d8")}
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
            <Home size={13} className="opacity-70" />
            <span className="text-sm font-semibold hidden sm:inline">Main Site</span>
            <span className="text-sm font-semibold sm:hidden">Home</span>
          </Link>

          {/* ── Breadcrumb (md+) ── */}
          <div className="hidden md:flex items-center gap-1.5 mr-4 flex-shrink-0 text-xs"
            style={{ color: "#8aa3be" }}>
            <span className="font-semibold text-white">Learn</span>
            {active && (
              <>
                <span style={{ color: "rgba(255,255,255,0.25)" }}>›</span>
                <span style={{ color: "#1d9e75" }} className="font-semibold">{active.label}</span>
              </>
            )}
          </div>
          <div className="hidden md:block w-px h-5 mr-4 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* ── Section links ── */}
          <div className="flex items-center gap-0.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {LEARN_NAV.map(({ label, href, Icon }) => {
              const isActive = path.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-150 relative"
                  style={{
                    color:      isActive ? "#1d9e75" : "#b0c4d8",
                    background: isActive ? "rgba(29,158,117,0.1)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color      = "#fff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color      = "#b0c4d8";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <Icon size={13} />
                  {label}
                  {/* Active underline */}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: "#1d9e75" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── Right: academy CTA (lg+) ── */}
          <div className="ml-auto flex-shrink-0 hidden lg:flex items-center gap-3">
            <span className="text-xs" style={{ color: "#8aa3be" }}>
              10,000+ students enrolled
            </span>
            <Link
              href="/learn/academy"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#1d9e75" }}
            >
              <GraduationCap size={12} />
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
