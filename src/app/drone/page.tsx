"use client";

import Link from "next/link";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import ConsultationSection from "@/components/ConsultationSection";

const COLOR  = "#ea580c";
const BG     = "#fff7ed";
const BORDER = "#fed7aa";
const CARD   = { background: "rgba(255,255,255,0.96)", borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" } as const;

const OFFERINGS = [
  {
    title: "Aerial Photogrammetry",
    desc: "Capture high-resolution overlapping images using fixed-wing or multirotor UAVs and process them into survey-grade photogrammetric products.",
    bullets: ["Mission Planning & GCP Layout", "PPK/RTK GPS Integration", "SfM Point Cloud Generation", "Survey-grade Accuracy Reports"],
  },
  {
    title: "Orthomosaic Generation",
    desc: "Produce geometrically corrected, seamlessly mosaicked orthophotos at 2–5 cm GSD for site documentation, monitoring, and mapping.",
    bullets: ["GSD: 2–10 cm/pixel", "GeoTIFF with World File", "RGB & Multispectral Mosaics", "Radiometric Calibration"],
  },
  {
    title: "Digital Elevation Models (DEM)",
    desc: "Generate precise DTMs, DSMs, and CHMs for terrain analysis, flood modelling, cut/fill estimation, and infrastructure planning.",
    bullets: ["DTM & DSM Production", "Canopy Height Model (CHM)", "Contour Interval Generation", "DEM Differencing & Change"],
  },
  {
    title: "Volume Calculations",
    desc: "Compute accurate stockpile volumes, cut/fill balances, and earthwork quantities for mining, quarrying, and construction projects.",
    bullets: ["Stockpile Volume Surveys", "Cut-Fill Balance Reports", "Earthwork Quantity Estimation", "Progress Monitoring"],
  },
  {
    title: "Thermal & Multispectral Surveys",
    desc: "Deploy thermal infrared and multispectral sensors for precision agriculture, solar panel inspection, and infrastructure heat loss detection.",
    bullets: ["Crop Stress Mapping (NDVI)", "Solar Panel Hot-spot Detection", "Roof & Insulation Surveys", "Electrical Infrastructure Inspection"],
  },
  {
    title: "3D Modelling & Point Clouds",
    desc: "Deliver georeferenced dense point clouds and textured 3D mesh models for BIM integration, heritage documentation, and site visualisation.",
    bullets: ["Dense Point Cloud (.LAS/.LAZ)", "Textured 3D Mesh (OBJ/FBX)", "BIM-ready CAD Export", "Heritage & Archaeological Surveys"],
  },
];

const STEPS = [
  { n: "01", title: "Site Assessment & Mission Plan", desc: "Review site permissions, plan flight paths, define GSD, overlap percentage, GCP locations, and safety protocols." },
  { n: "02", title: "Ground Control & Survey", desc: "Install and survey GCPs/CPs with RTK GNSS. Coordinate UAV and ground teams. Execute flight mission." },
  { n: "03", title: "Photogrammetric Processing", desc: "Ingest imagery into Agisoft Metashape or DJI Terra. Run alignment, dense cloud, DEM, and orthomosaic pipelines." },
  { n: "04", title: "Accuracy Assessment", desc: "Check-point RMSE validation, compare against ground-truth measurements. Report horizontal & vertical accuracy." },
  { n: "05", title: "Deliverable Export & Report", desc: "Export final products in required formats. Provide full survey report with flight logs, GCP coordinates, and accuracy stats." },
];

const TECH = ["DJI Phantom 4 RTK", "DJI Matrice 300", "eBee X (Fixed-Wing)", "Agisoft Metashape", "DJI Terra", "Pix4Dmapper", "CloudCompare", "QGIS 3.x", "ArcGIS Pro", "AutoCAD Civil 3D", "Trimble R10 RTK", "Emlid Reach RS2"];

const SECTORS = ["Mining & Quarrying", "Construction & Infrastructure", "Agriculture & Precision Farming", "Solar Energy Inspection", "Land Surveying & Cadastral", "Heritage & Archaeology"];

const DELIVERABLES = [
  { title: "High-Res Orthomosaic", desc: "GeoTIFF orthophoto at 2–10 cm GSD, EPSG-specified CRS." },
  { title: "Digital Elevation Models", desc: "DTM, DSM, and contour shapefiles exported in DEM GeoTIFF + ASCII grid." },
  { title: "Dense Point Cloud", desc: "Classified .LAS / .LAZ point cloud (coloured, intensity). Optional: filtered ground points only." },
  { title: "3D Mesh Model", desc: "Textured OBJ / FBX model for BIM integration or VR visualisation (on request)." },
  { title: "Volume Report", desc: "Stockpile / earthwork volume PDF + XLSX with base reference, cut & fill, net volume." },
  { title: "Survey Accuracy Report", desc: "GCP/CP RMSE table, flight log summary, and photogrammetric processing report." },
];

export default function DronePage() {
  return (
    <div className="min-h-screen" style={{ background: "#fff7ed" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#431407 0%,#7c2d12 60%,#431407 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(254,215,170,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(254,215,170,.9) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle,${COLOR},transparent 70%)`, filter: "blur(80px)", opacity: 0.18 }} />
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5" style={{ background: "rgba(234,88,12,0.2)", color: "#fdba74", border: "1px solid rgba(234,88,12,0.35)" }}>🚁 UAV Survey Services</span>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Drone & UAV{" "}
                <span style={{ background: "linear-gradient(135deg,#fdba74,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mapping</span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-7 max-w-xl">
                Survey-grade UAV mapping services delivering centimetre-accurate orthomosaics, DEMs, point clouds, and volumetric reports for construction, mining, agriculture, and infrastructure inspection.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/consultancy#consultation" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg,${COLOR},#c2410c)`, boxShadow: `0 4px 16px rgba(234,88,12,0.4)` }}>
                  <Mail size={15} /> Request a Consultation
                </a>
                <a href="#offerings" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 text-sm border border-white/15 hover:bg-white/10 transition-all">
                  Explore Services →
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {[{ val: "300+", label: "UAV Surveys" }, { val: "2 cm", label: "Min GSD Accuracy" }, { val: "5 Days", label: "Avg Turnaround" }, { val: "6+", label: "Sectors Served" }].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl border text-center" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <p className="text-2xl font-black mb-0.5" style={{ color: "#fdba74" }}>{s.val}</p>
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
          <div className="mb-7"><h2 className="text-xl font-black text-slate-900 mb-1">What We Offer</h2><p className="text-sm text-slate-500">End-to-end UAV survey services from mission planning to final deliverable</p></div>
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
            <div className="mb-8"><h2 className="text-xl font-black text-slate-900 mb-1">Our Process</h2><p className="text-sm text-slate-500">Rigorous 5-step survey workflow ensuring centimetre-accurate results</p></div>
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
            <h2 className="text-base font-black text-slate-900 mb-1">Equipment & Software</h2>
            <p className="text-xs text-slate-500 mb-5">Professional-grade UAVs and photogrammetric processing platforms</p>
            <div className="flex flex-wrap gap-1.5">
              {TECH.map((t) => (<span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600">{t}</span>))}
            </div>
          </div>
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Sectors We Serve</h2>
            <p className="text-xs text-slate-500 mb-5">UAV surveys for high-value sectors across India</p>
            <div className="grid grid-cols-2 gap-2.5">
              {SECTORS.map((s) => (<div key={s} className="flex items-center gap-2 p-3 rounded-xl border" style={{ borderColor: `${COLOR}25`, background: `${COLOR}06` }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLOR }} /><p className="text-xs font-bold text-slate-700">{s}</p></div>))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <section id="deliverables">
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-6"><h2 className="text-base font-black text-slate-900 mb-1">What You Receive</h2><p className="text-xs text-slate-500">Standard deliverables included in every UAV survey project</p></div>
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
          <div className="relative overflow-hidden rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg,#431407,#7c2d12)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(254,215,170,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(254,215,170,.9) 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-white mb-3">Ready to Survey from the Air?</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto mb-7">Share your site location, coverage area, and accuracy requirements — we'll deliver centimetre-precise UAV products on schedule.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/consultancy#consultation" className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg,${COLOR},#c2410c)`, boxShadow: `0 4px 16px rgba(234,88,12,0.4)` }}>
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
