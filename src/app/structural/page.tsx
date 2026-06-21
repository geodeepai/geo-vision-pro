"use client";

import Link from "next/link";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import ConsultationSection from "@/components/ConsultationSection";

const COLOR  = "#d97706";
const BG     = "#fffbeb";
const BORDER = "#fde68a";
const CARD   = { background: "rgba(255,255,255,0.96)", borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" } as const;

const OFFERINGS = [
  {
    title: "Structural Design Review",
    desc: "Independent third-party review of structural drawings, calculations, and specifications for buildings, bridges, and industrial structures.",
    bullets: ["RC & Steel Frame Review", "Load Path Verification", "IS Code Compliance Check", "Peer Review Certification"],
  },
  {
    title: "Foundation & Geotechnical Analysis",
    desc: "Assess foundation systems against soil investigation reports, bearing capacities, and settlement limits for safe and economical design.",
    bullets: ["Shallow & Pile Foundation Analysis", "Bearing Capacity Calculations", "Settlement & Differential Analysis", "Liquefaction Susceptibility Check"],
  },
  {
    title: "Load Combination Analysis",
    desc: "Compute and verify gravity, wind, seismic, and special load combinations per IS 875, IS 1893, and project-specific codes.",
    bullets: ["Dead, Live & Imposed Loads", "Wind Load (IS 875 Part 3)", "Seismic Analysis (IS 1893)", "Special & Crane Load Combinations"],
  },
  {
    title: "STAAD Pro Structural Modelling",
    desc: "Build, analyse, and design 2D/3D structural models in STAAD Pro for RCC, steel, and composite structures with full result extraction.",
    bullets: ["3D Frame & Shell Modelling", "Static & Dynamic Analysis", "Member Sizing & Code Check", "Response Spectrum & Time History"],
  },
  {
    title: "Site Feasibility Assessment",
    desc: "Evaluate site suitability for construction by combining geotechnical data, topographic surveys, and regulatory constraints into a feasibility report.",
    bullets: ["Topographic & Slope Analysis", "Soil & Rock Classification", "Regulatory Setback Compliance", "Risk & Constraint Summary"],
  },
  {
    title: "Infrastructure Planning Support",
    desc: "Provide structural and civil engineering inputs to master plans, road alignment studies, drainage design, and infrastructure feasibility reports.",
    bullets: ["Road & Pavement Design Inputs", "Drainage & Stormwater Analysis", "Utility Corridor Planning", "BOQ & Cost Estimation Support"],
  },
];

const STEPS = [
  { n: "01", title: "Document & Data Collection", desc: "Gather architectural drawings, soil reports, site survey data, existing structural drawings, and applicable codes and standards." },
  { n: "02", title: "Structural Modelling", desc: "Build the structural model in STAAD Pro or ETABS. Define materials, sections, boundary conditions, and load cases." },
  { n: "03", title: "Analysis & Design", desc: "Run linear/nonlinear analysis, extract member forces and deflections, and perform code-based design checks and optimisations." },
  { n: "04", title: "Review & Compliance Check", desc: "Verify against relevant IS / NBC codes. Check serviceability, strength, stability, and detailing requirements." },
  { n: "05", title: "Report & Drawing Issue", desc: "Issue stamped structural report, annotated drawings, calculation sheets, and a findings/recommendations summary." },
];

const TECH = ["STAAD Pro Connect", "ETABS", "SAP2000", "AutoCAD 2D/3D", "Revit Structure", "QGIS (Site Mapping)", "IS 456 / IS 800", "IS 875 / IS 1893", "NBC 2016", "MS Excel Calc Sheets", "Primavera P6", "ArcGIS Pro"];

const SECTORS = ["Residential & Commercial Buildings", "Bridges & Transportation", "Industrial & Warehouse Structures", "Water & Irrigation Structures", "Renewable Energy (Solar / Wind)", "Government & Public Infrastructure"];

const DELIVERABLES = [
  { title: "Structural Analysis Report", desc: "Full calculation set with model assumptions, load derivations, analysis results, and code-check summaries." },
  { title: "STAAD / ETABS Model Files", desc: "Analysis model files with annotated member IDs, load cases, and result screenshots." },
  { title: "Structural Drawings", desc: "AutoCAD drawing files for framing plans, sections, and connection details (review or new design)." },
  { title: "Foundation Design Report", desc: "Foundation type recommendation, bearing pressure calculations, and settlement analysis." },
  { title: "Site Feasibility Report", desc: "Combined geotechnical, topographic, and regulatory feasibility summary with risk matrix." },
  { title: "BOQ Support Sheet", desc: "Preliminary bill of quantities for structural items (optional add-on, project-dependent)." },
];

export default function StructuralPage() {
  return (
    <div className="min-h-screen" style={{ background: "#fffbeb" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1c1003 0%,#451a03 60%,#1c1003 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(253,230,138,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(253,230,138,.9) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle,${COLOR},transparent 70%)`, filter: "blur(80px)", opacity: 0.18 }} />
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5" style={{ background: "rgba(217,119,6,0.2)", color: "#fcd34d", border: "1px solid rgba(217,119,6,0.35)" }}>🏗️ Structural & Civil Engineering</span>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Structural & Civil{" "}
                <span style={{ background: "linear-gradient(135deg,#fcd34d,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Consulting</span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-7 max-w-xl">
                Expert structural analysis, design review, and civil engineering consultancy — integrating STAAD Pro modelling, IS code compliance, geotechnical assessment, and site feasibility into reliable, stamp-ready deliverables.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/consultancy#consultation" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg,${COLOR},#b45309)`, boxShadow: `0 4px 16px rgba(217,119,6,0.4)` }}>
                  <Mail size={15} /> Request a Consultation
                </a>
                <a href="#offerings" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 text-sm border border-white/15 hover:bg-white/10 transition-all">
                  Explore Services →
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {[{ val: "250+", label: "Structural Projects" }, { val: "IS Code", label: "Compliant Reports" }, { val: "7 Days", label: "Avg Turnaround" }, { val: "6+", label: "Sectors Served" }].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl border text-center" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <p className="text-2xl font-black mb-0.5" style={{ color: "#fcd34d" }}>{s.val}</p>
                  <p className="text-slate-400 text-[11px] font-medium leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Offerings */}
        <section id="offerings">
          <div className="mb-7"><h2 className="text-xl font-black text-slate-900 mb-1">What We Offer</h2><p className="text-sm text-slate-500">End-to-end structural and civil consulting services</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFERINGS.map((o) => (
              <div key={o.title} className="rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-0.5" style={{ ...CARD, borderColor: BORDER, background: BG }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${COLOR}15`, border: `1.5px solid ${COLOR}30` }}>
                  <div className="w-4 h-4 rounded-sm" style={{ background: COLOR }} />
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-2">{o.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{o.desc}</p>
                <ul className="space-y-1.5">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: COLOR }} />{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process">
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-8"><h2 className="text-xl font-black text-slate-900 mb-1">Our Process</h2><p className="text-sm text-slate-500">A structured 5-step engineering workflow from documents to stamp-ready reports</p></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4 p-5 rounded-xl border" style={{ borderColor: `${COLOR}25`, background: `${COLOR}06` }}>
                  <span className="text-2xl font-black flex-shrink-0" style={{ color: `${COLOR}40` }}>{s.n}</span>
                  <div><p className="text-xs font-black text-slate-900 mb-1.5">{s.title}</p><p className="text-[11px] text-slate-500 leading-relaxed">{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech + Sectors */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Software & Standards</h2>
            <p className="text-xs text-slate-500 mb-5">Industry tools and Indian Standard codes used in every engagement</p>
            <div className="flex flex-wrap gap-1.5">
              {TECH.map((t) => (<span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600">{t}</span>))}
            </div>
          </div>
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Sectors We Serve</h2>
            <p className="text-xs text-slate-500 mb-5">Structural consulting across major civil engineering domains</p>
            <div className="grid grid-cols-2 gap-2.5">
              {SECTORS.map((s) => (<div key={s} className="flex items-center gap-2 p-3 rounded-xl border" style={{ borderColor: `${COLOR}25`, background: `${COLOR}06` }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLOR }} /><p className="text-xs font-bold text-slate-700">{s}</p></div>))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <section id="deliverables">
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-6"><h2 className="text-base font-black text-slate-900 mb-1">What You Receive</h2><p className="text-xs text-slate-500">Standard deliverables for every structural & civil engagement</p></div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DELIVERABLES.map((d) => (
                <div key={d.title} className="flex gap-3 p-4 rounded-xl border" style={{ borderColor: `${COLOR}20`, background: `${COLOR}06` }}>
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: COLOR }} />
                  <div><p className="text-xs font-black text-slate-800 mb-1">{d.title}</p><p className="text-[11px] text-slate-500 leading-relaxed">{d.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="relative overflow-hidden rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg,#1c1003,#451a03)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(253,230,138,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(253,230,138,.9) 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-white mb-3">Need Structural Expertise for Your Project?</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto mb-7">Share your drawings, site data, and scope — we'll deliver IS-code-compliant analysis and stamp-ready reports within your timeline.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/consultancy#consultation" className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg,${COLOR},#b45309)`, boxShadow: `0 4px 16px rgba(217,119,6,0.4)` }}>
                  <Mail size={15} /> Request a Consultation
                </a>
                <Link href="/consultancy" className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-slate-300 text-sm border border-white/15 hover:bg-white/10 transition-all">
                  View All Services →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        <ConsultationSection />

      </div>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" /><path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" /></svg>
            </div>
            <span className="text-sm font-bold text-slate-800">Deep Earth Science</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a href="mailto:DeepEarthScience@email.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors"><Mail size={11} /> DeepEarthScience@email.com</a>
            <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-1 hover:text-blue-600 transition-colors"><Phone size={11} /> +91 XXXX XXX XXX</a>
            <span className="flex items-center gap-1"><MapPin size={11} /> India</span>
          </div>
          <Link href="/" className="text-xs text-blue-600 hover:underline font-semibold">← Back to Home</Link>
        </div>
      </footer>
    </div>
  );
}
