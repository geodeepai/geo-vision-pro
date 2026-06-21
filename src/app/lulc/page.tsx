"use client";

import Link from "next/link";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import ConsultationSection from "@/components/ConsultationSection";

const COLOR   = "#059669";
const BG      = "#ecfdf5";
const BORDER  = "#a7f3d0";
const CARD    = { background: "rgba(255,255,255,0.96)", borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" } as const;

const OFFERINGS = [
  {
    title: "Multi-temporal LULC Mapping",
    desc: "Classify land use and land cover across multiple time periods using supervised and unsupervised algorithms to track landscape dynamics.",
    bullets: ["Random Forest & SVM Classification", "OBIA (Object-Based Image Analysis)", "FAO LCCS & Custom Legend Design", "Post-classification Smoothing"],
  },
  {
    title: "Urban Sprawl & Growth Analysis",
    desc: "Quantify urban expansion, monitor peri-urban growth corridors, and support master planning through satellite-derived impervious surface mapping.",
    bullets: ["NDBI & UI Index Mapping", "Urban Growth Boundary Detection", "Sprawl Rate Calculation", "Infrastructure Impact Assessment"],
  },
  {
    title: "Agricultural Land Monitoring",
    desc: "Map crop types, monitor seasonal land use transitions, and identify fallow or degraded agricultural land using time-series satellite data.",
    bullets: ["Crop Type Classification", "Seasonal Cultivation Mapping", "Irrigation Command Area Delineation", "Agricultural Encroachment Detection"],
  },
  {
    title: "Forest & Vegetation Mapping",
    desc: "Assess forest cover, detect deforestation hotspots, classify vegetation types, and monitor restoration and afforestation programme outcomes.",
    bullets: ["Forest Cover Density Classification", "Deforestation Hot-spot Detection", "Mangrove & Riparian Mapping", "Vegetation Health (NDVI, EVI)"],
  },
  {
    title: "Wetland & Water Body Mapping",
    desc: "Delineate seasonal and perennial water bodies, map wetland extent changes, and support environmental clearance documentation.",
    bullets: ["NDWI / MNDWI Water Extraction", "Seasonal Flood Plain Mapping", "Wetland Category Classification", "Encroachment & Loss Quantification"],
  },
  {
    title: "Change Detection & Transition Analysis",
    desc: "Produce from–to change matrices between two or more time points to quantify land cover transitions and compute change statistics.",
    bullets: ["Bi-temporal Change Detection", "LULC Transition Matrix", "Net & Gross Change Statistics", "Change Rate Modelling"],
  },
];

const STEPS = [
  { n: "01", title: "Study Area & Period Definition", desc: "Define spatial extent, target LULC classes, reference years, and required map scale based on client objectives and available data." },
  { n: "02", title: "Satellite Data Acquisition", desc: "Select best-fit sensors (Sentinel-2, Landsat, MODIS) based on spatial/temporal requirements and perform cloud quality screening." },
  { n: "03", title: "Pre-processing & Classification", desc: "Apply atmospheric correction, collect training samples, run classification algorithm, and perform iterative refinement and spatial filtering." },
  { n: "04", title: "Accuracy Assessment", desc: "Validate using stratified random sampling. Compute confusion matrix, overall accuracy, Kappa coefficient, and per-class PA & UA." },
  { n: "05", title: "Report & GIS Deliverables", desc: "Deliver classified GeoTIFFs, vector shapefiles, change matrices, area statistics, and a full technical methodology report." },
];

const TECH = ["Sentinel-2 MSI", "Landsat 8/9 OLI", "MODIS Terra/Aqua", "ENVI 5.x", "SNAP Toolbox", "QGIS 3.x", "ArcGIS Pro", "Google Earth Engine", "Python (scikit-learn)", "ERDAS Imagine", "Semi-Automatic Classification Plugin", "R (randomForest)"];

const SECTORS = ["Urban & Regional Planning", "Agriculture & Food Security", "Forest & Environment Dept.", "Environmental Impact Assessment", "Research & Academia", "Government & Policy"];

const DELIVERABLES = [
  { title: "Classified Raster Maps", desc: "GeoTIFF files for each time period with defined CRS and colour legend." },
  { title: "Vector Shapefiles", desc: "Polygon shapefiles (SHP + GeoJSON) per LULC class for all epochs." },
  { title: "Change Detection Layer", desc: "From–to change raster and polygon shapefile with transition labels." },
  { title: "Accuracy Assessment Report", desc: "Confusion matrix, OA, Kappa, PA & UA per class in PDF + XLSX." },
  { title: "Area Statistics Summary", desc: "Class-wise area in ha & %, change in ha & %, rate of change per year." },
  { title: "Technical Report", desc: "Full methodology PDF with data sources, software parameters & limitations." },
];

export default function LULCPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#022c22 0%,#064e3b 60%,#022c22 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(167,243,208,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(167,243,208,.9) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle,${COLOR},transparent 70%)`, filter: "blur(80px)", opacity: 0.18 }} />
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5" style={{ background: "rgba(5,150,105,0.2)", color: "#6ee7b7", border: "1px solid rgba(5,150,105,0.35)" }}>🗺️ Geospatial Classification Services</span>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                LULC Analysis &{" "}
                <span style={{ background: "linear-gradient(135deg,#6ee7b7,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mapping</span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-7 max-w-xl">
                Comprehensive Land Use Land Cover mapping and multi-temporal change analysis for urban planning, agriculture monitoring, forest management, and environmental assessment.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/consultancy#consultation" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg,${COLOR},#047857)`, boxShadow: `0 4px 16px rgba(5,150,105,0.4)` }}>
                  <Mail size={15} /> Request a Consultation
                </a>
                <a href="#offerings" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 text-sm border border-white/15 hover:bg-white/10 transition-all">
                  Explore Services →
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {[{ val: "500+", label: "LULC Projects" }, { val: ">92%", label: "Classification Accuracy" }, { val: "10 Days", label: "Avg Turnaround" }, { val: "6+", label: "Sectors Served" }].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl border text-center" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <p className="text-2xl font-black mb-0.5" style={{ color: "#6ee7b7" }}>{s.val}</p>
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
          <div className="mb-7"><h2 className="text-xl font-black text-slate-900 mb-1">What We Offer</h2><p className="text-sm text-slate-500">End-to-end LULC mapping services tailored to your study requirements</p></div>
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
            <div className="mb-8"><h2 className="text-xl font-black text-slate-900 mb-1">Our Process</h2><p className="text-sm text-slate-500">A rigorous 5-step workflow from raw data to validated deliverables</p></div>
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
            <h2 className="text-base font-black text-slate-900 mb-1">Technology Stack</h2>
            <p className="text-xs text-slate-500 mb-5">Industry-standard tools across the full processing pipeline</p>
            <div className="flex flex-wrap gap-1.5">
              {TECH.map((t) => (<span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600">{t}</span>))}
            </div>
          </div>
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Sectors We Serve</h2>
            <p className="text-xs text-slate-500 mb-5">Delivering LULC projects across key industry domains</p>
            <div className="grid grid-cols-2 gap-2.5">
              {SECTORS.map((s) => (<div key={s} className="flex items-center gap-2 p-3 rounded-xl border" style={{ borderColor: `${COLOR}25`, background: `${COLOR}06` }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLOR }} /><p className="text-xs font-bold text-slate-700">{s}</p></div>))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <section id="deliverables">
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-6"><h2 className="text-base font-black text-slate-900 mb-1">What You Receive</h2><p className="text-xs text-slate-500">Standard deliverables included in every LULC project</p></div>
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
          <div className="relative overflow-hidden rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg,#022c22,#064e3b)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(rgba(167,243,208,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(167,243,208,.9) 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-white mb-3">Ready to Map Your Landscape?</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto mb-7">Tell us your study area, time period, and classification requirements — we'll deliver accurate, validated LULC maps on time.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/consultancy#consultation" className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg,${COLOR},#047857)`, boxShadow: `0 4px 16px rgba(5,150,105,0.4)` }}>
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

      {/* Footer */}
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
