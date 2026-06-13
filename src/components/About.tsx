"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Award, Shield, Satellite, Users, BookOpen, Zap, Globe, CheckCircle2 } from "lucide-react";

const STATS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "500+", label: "Projects Delivered" },
  { value: "120+", label: "Clients Served" },
  { value: "98%", label: "Client Satisfaction" },
];

const PILLARS = [
  { icon: Satellite, title: "Cutting-Edge Technology",  color: "#2563eb", desc: "We leverage the latest satellite platforms, AI models, and geospatial software to deliver accurate, fast, and future-proof results." },
  { icon: Shield,    title: "Certified Expertise",       color: "#059669", desc: "Our team holds professional certifications in Remote Sensing, GIS, structural engineering, and drone operations." },
  { icon: BookOpen,  title: "Research-Led Training",     color: "#7c3aed", desc: "Every course is designed by practitioners who have worked on national and international geospatial projects." },
  { icon: Zap,       title: "Rapid Turnaround",          color: "#ea580c", desc: "Structured workflows and dedicated analysts ensure your deliverables arrive on time without compromising precision." },
];

const DOMAINS = [
  "Urban & Regional Planning", "Agriculture & Food Security", "Disaster Management",
  "Infrastructure & Transport", "Forest & Biodiversity", "Water Resource Management",
  "Coastal & Marine Studies", "Renewable Energy Siting", "Defence & Surveillance",
];

const TRUST = [
  { icon: Award,  label: "Top Rated Consultancy 2024" },
  { icon: Globe,  label: "Projects in 12+ States" },
  { icon: Users,  label: "1,200+ Trained Professionals" },
  { icon: Shield, label: "ISO-Aligned Deliverables" },
];

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className="text-center transition-all duration-700"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-black text-white mb-1">{value}</div>
      <div className="text-blue-200 text-xs font-medium tracking-wide">{label}</div>
    </div>
  );
}

export default function About() {
  const headRef   = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section id="about" style={{ background: "var(--section-bg)" }} className="overflow-hidden">

      {/* Stats banner — always dark blue, no theming needed */}
      <div style={{ background: "linear-gradient(135deg,#0c1445 0%,#1e3a8a 50%,#0c1445 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 md:divide-x md:divide-blue-700/40">
            {STATS.map((s, i) => <StatCard key={s.label} value={s.value} label={s.label} delay={i * 100} />)}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Header */}
        <div
          ref={headRef}
          className="text-center max-w-3xl mx-auto mb-16 transition-all duration-700"
          style={{ opacity: headInView ? 1 : 0, transform: headInView ? "translateY(0)" : "translateY(24px)" }}
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-5"
            style={{ background: "var(--badge-bg)", borderColor: "var(--badge-border)", color: "var(--badge-text)" }}
          >
            Who We Are
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6" style={{ color: "var(--heading)" }}>
            Pioneering{" "}
            <span className="gradient-text">Geospatial Excellence</span>{" "}
            Across India
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--body-text)" }}>
            GeoVision Pro is a premier remote sensing consultancy and geospatial training institute.
            For over 15 years we have translated satellite data, drone imagery, and AI analytics
            into decisions that shape infrastructure, policy, and environmental stewardship.
          </p>
        </div>

        {/* Mission + Visual */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">

          {/* Visual card */}
          <div className="relative">
            <div
              className="relative rounded-3xl border overflow-hidden"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
            >
              {/* Top strip */}
              <div className="px-7 py-5 border-b flex items-center justify-between" style={{ background: "var(--section-alt)", borderColor: "var(--card-border)" }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--muted)" }}>Established</p>
                  <p className="text-2xl font-black" style={{ color: "var(--heading)" }}>2009</p>
                </div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                    <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="2" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Globe visual */}
              <div className="flex justify-center py-8" style={{ background: "var(--card-bg)" }}>
                <div className="relative">
                  <div className="w-48 h-48 rounded-full relative" style={{ background: "radial-gradient(circle at 35% 35%,#1d4ed8,#0c1445)", boxShadow: "0 24px 64px rgba(37,99,235,0.3)" }}>
                    <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full">
                      <ellipse cx="80" cy="80" rx="76" ry="28" fill="none" stroke="rgba(147,197,253,0.3)" strokeWidth="1.2" />
                      <ellipse cx="80" cy="80" rx="50" ry="28" fill="none" stroke="rgba(147,197,253,0.2)" strokeWidth="1" />
                      <ellipse cx="80" cy="80" rx="76" ry="55" fill="none" stroke="rgba(147,197,253,0.15)" strokeWidth="1" />
                      <line x1="4" y1="80" x2="156" y2="80" stroke="rgba(147,197,253,0.2)" strokeWidth="1" />
                      <line x1="80" y1="4" x2="80" y2="156" stroke="rgba(147,197,253,0.2)" strokeWidth="1" />
                      <path d="M42 52 L64 48 L76 58 L70 72 L58 76 L42 66 Z" fill="rgba(52,211,153,0.65)" />
                      <path d="M86 44 L108 40 L116 55 L110 67 L95 69 L85 58 Z" fill="rgba(52,211,153,0.55)" />
                      <path d="M50 88 L66 85 L72 94 L62 100 L50 96 Z" fill="rgba(52,211,153,0.45)" />
                    </svg>
                    <div className="absolute -inset-6 rounded-full border border-blue-300/20 animate-spin" style={{ animationDuration: "20s" }}>
                      <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" style={{ transform: "translateX(-50%)" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-px" style={{ background: "var(--card-border)" }}>
                {TRUST.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 p-4" style={{ background: "var(--card-bg)" }}>
                    <Icon size={14} className="text-blue-500 flex-shrink-0" />
                    <span className="text-xs font-semibold" style={{ color: "var(--body-text)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-xl"
              style={{ background: "var(--card-bg)", borderColor: "#fde68a" }}
            >
              <Award size={16} className="text-amber-500" />
              <span className="text-xs font-bold" style={{ color: "var(--heading)" }}>Top Rated 2024</span>
            </div>
          </div>

          {/* Mission text */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 leading-snug" style={{ color: "var(--heading)" }}>
              Where Science Meets<br />
              <span className="gradient-text">Real-World Impact</span>
            </h3>
            <p className="leading-relaxed mb-5" style={{ color: "var(--body-text)" }}>
              Founded by a team of remote sensing scientists and civil engineers, GeoVision Pro was built on a single belief: geospatial intelligence should be accessible, actionable, and affordable for every organisation — from government bodies to startups.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: "var(--body-text)" }}>
              Today our consultants, trainers, and analysts work together across LULC mapping, drone photogrammetry, AI feature extraction, and structural engineering — delivering end-to-end geospatial solutions that are IS-code compliant and stamp-ready.
            </p>
            <div className="space-y-3 mb-9">
              {[
                "Government bodies, research institutions & private enterprises trust us",
                "Multi-disciplinary team: scientists, engineers & educators",
                "Projects spanning 12+ Indian states and international assignments",
                "Training that converts freshers into industry-ready professionals",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-blue-600" />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--body-text)" }}>{point}</p>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-200/30 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)" }}
            >
              Partner With Us →
            </a>
          </div>
        </div>

        {/* Pillars */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black mb-2" style={{ color: "var(--heading)" }}>Why Organisations Choose Us</h3>
            <p className="text-sm" style={{ color: "var(--body-text)" }}>Four pillars that set GeoVision Pro apart</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-300"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--card-border)")}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: `${color}14`, border: `1px solid ${color}30` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h4 className="font-black text-sm mb-2" style={{ color: "var(--heading)" }}>{title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--body-text)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Domain expertise — always dark */}
        <div className="rounded-3xl p-6 sm:p-10 text-center" style={{ background: "linear-gradient(135deg,#0c1445,#1e3a8a,#0c1445)" }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: "rgba(255,255,255,0.1)", color: "#93c5fd", border: "1px solid rgba(147,197,253,0.2)" }}>
            Domain Expertise
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Sectors We Have Transformed</h3>
          <p className="text-blue-200 text-sm mb-8 max-w-xl mx-auto">Our geospatial solutions have created measurable impact across these critical domains</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {DOMAINS.map((d) => (
              <span key={d} className="px-4 py-2 rounded-xl text-xs font-semibold hover:scale-105 transition-transform" style={{ background: "rgba(255,255,255,0.08)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)" }}>
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
