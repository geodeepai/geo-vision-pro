"use client";

import Link from "next/link";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import ConsultationSection from "@/components/ConsultationSection";
import SubpageHero from "@/components/SubpageHero";

const COLOR  = "#7c3aed";
const BG     = "#f5f3ff";
const BORDER = "#ddd6fe";
const CARD   = { background: "rgba(255,255,255,0.96)", borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" } as const;

const OFFERINGS = [
  {
    title: "Geodatabase Design & Management",
    desc: "Build well-structured spatial databases for managing complex multi-layer datasets with consistent topology, schemas, and access control.",
    bullets: ["File & Enterprise Geodatabase Setup", "Topology Rules & Validation", "Spatial Indexing & Performance Tuning", "Version Management (ArcSDE)"],
  },
  {
    title: "Network Analysis & Route Optimization",
    desc: "Model infrastructure networks (roads, utilities, pipelines) and solve shortest-path, service area, and closest-facility routing problems.",
    bullets: ["Shortest Path & OD Matrix", "Service Area & Catchment Zones", "Utility Network Tracing", "Logistics Route Optimization"],
  },
  {
    title: "Spatial Modelling & Suitability Analysis",
    desc: "Create weighted spatial models for site suitability, risk zonation, habitat assessment, and multi-criteria decision analysis (MCDA).",
    bullets: ["Weighted Overlay Analysis", "Habitat Suitability Modelling", "Hazard & Risk Zonation", "MCE / AHP Integration"],
  },
  {
    title: "Geostatistics & Interpolation",
    desc: "Apply kriging, IDW, and spline interpolation for surface modelling of continuous spatial variables such as rainfall, elevation, and contamination.",
    bullets: ["Ordinary & Universal Kriging", "IDW & Spline Interpolation", "Semivariogram Modelling", "Error & Uncertainty Mapping"],
  },
  {
    title: "3D Terrain & Surface Modelling",
    desc: "Generate DTMs, DSMs, TINs, and contour maps from LiDAR, photogrammetry, or topographic survey data for engineering and planning applications.",
    bullets: ["DTM / DSM Generation", "TIN & Contour Production", "Slope, Aspect & Curvature Maps", "Viewshed & Visibility Analysis"],
  },
  {
    title: "Custom Cartography & Map Production",
    desc: "Design print-ready and web-optimised thematic maps, atlases, and interactive dashboards adhering to cartographic best practices.",
    bullets: ["Thematic & Reference Maps", "Map Atlas Production", "Symbology & Legend Design", "Web Map (Leaflet / ArcGIS Online)"],
  },
];

const STEPS = [
  { n: "01", title: "Requirements & Data Audit", desc: "Understand objectives, inventory existing spatial data, and define the coordinate reference system, schema, and output formats." },
  { n: "02", title: "Data Acquisition & Integration", desc: "Source, reproject, clean, and integrate multi-source vector/raster layers into a unified geodatabase or project workspace." },
  { n: "03", title: "Spatial Analysis & Modelling", desc: "Run geoprocessing workflows, spatial queries, and analytical models using ModelBuilder, Python (ArcPy / QGIS API), or R." },
  { n: "04", title: "Quality Assurance", desc: "Validate topology, check attribute completeness, cross-check results against field data or reference datasets." },
  { n: "05", title: "Deliverable Production", desc: "Produce final maps, geodatabases, reports, and interactive web layers with full metadata documentation." },
];

const TECH = ["ArcGIS Pro 3.x", "QGIS 3.x", "ArcPy & ModelBuilder", "PostGIS / PostgreSQL", "GRASS GIS", "R (sf, terra)", "Python (GeoPandas)", "FME Platform", "ArcGIS Online", "Leaflet.js", "OpenLayers", "GDAL / OGR"];

const SECTORS = ["Urban & Regional Planning", "Water Resources & Irrigation", "Transport & Infrastructure", "Disaster Risk Reduction", "Environmental Management", "Oil, Gas & Mining"];

const DELIVERABLES = [
  { title: "Geodatabase Package", desc: "File geodatabase or GeoPackage with all processed layers, topology rules, and metadata." },
  { title: "Vector & Raster Outputs", desc: "Shapefiles, GeoJSON, GeoTIFFs exported per client specification and CRS." },
  { title: "Thematic Maps (PDF/PNG)", desc: "Print-ready A3/A4 maps with legend, scale, graticule, and north arrow." },
  { title: "Geoprocessing Scripts", desc: "Python / ModelBuilder scripts for reproducible workflows (optional add-on)." },
  { title: "Analysis Report", desc: "Technical methodology PDF with data sources, parameters, and key findings." },
  { title: "Web Map Layer", desc: "Hosted feature service or Leaflet map (project-dependent, on request)." },
];

export default function GISPage() {
  return (
    <div className="min-h-screen bg-white">
      <SubpageHero
        crumbs={[{ label: "Services", href: "/#services" }, { label: "GIS & Spatial Analysis" }]}
        badge="Geospatial Data Services"
        title="GIS & Spatial Analysis"
        highlight="Analysis"
        desc="End-to-end geographic information system services — geodatabase design, network analysis, spatial modelling, 3D terrain, and premium cartographic outputs for engineering, planning, and research."
        accent={COLOR}
        stats={[{ val: "400+", label: "GIS Projects" }, { val: "15+", label: "Software Tools" }, { val: "7 Days", label: "Avg Turnaround" }, { val: "6+", label: "Sectors Served" }]}
        ctaLabel="Request a Consultation"
        ctaHref="/consultancy#consultation"
        secondLabel="Explore Services"
        secondHref="#offerings"
      />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Offerings */}
        <section id="offerings">
          <div className="mb-7"><h2 className="text-xl font-black text-slate-900 mb-1">What We Offer</h2><p className="text-sm text-slate-500">Comprehensive GIS services across the full spatial data lifecycle</p></div>
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
            <div className="mb-8"><h2 className="text-xl font-black text-slate-900 mb-1">Our Process</h2><p className="text-sm text-slate-500">A structured 5-step workflow from data audit to final deliverable</p></div>
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
            <p className="text-xs text-slate-500 mb-5">Industry-standard GIS platforms and scripting tools</p>
            <div className="flex flex-wrap gap-1.5">
              {TECH.map((t) => (<span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600">{t}</span>))}
            </div>
          </div>
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Sectors We Serve</h2>
            <p className="text-xs text-slate-500 mb-5">GIS solutions across critical sectors</p>
            <div className="grid grid-cols-2 gap-2.5">
              {SECTORS.map((s) => (<div key={s} className="flex items-center gap-2 p-3 rounded-xl border" style={{ borderColor: `${COLOR}25`, background: `${COLOR}06` }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLOR }} /><p className="text-xs font-bold text-slate-700">{s}</p></div>))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <section id="deliverables">
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-6"><h2 className="text-base font-black text-slate-900 mb-1">What You Receive</h2><p className="text-xs text-slate-500">Standard deliverables included in every GIS project</p></div>
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
          <div className="relative overflow-hidden rounded-2xl p-8 text-center border" style={{ background: `${COLOR}08`, borderColor: `${COLOR}25` }}>
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-slate-900 mb-3">Have a GIS Challenge?</h2>
              <p className="text-slate-500 text-sm max-w-lg mx-auto mb-7">Share your spatial data requirements and project scope — we'll deliver precise, analysis-ready GIS outputs on schedule.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/consultancy#consultation" className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all" style={{ background: COLOR, boxShadow: `0 4px 16px ${COLOR}40` }}>
                  <Mail size={15} /> Request a Consultation
                </a>
                <Link href="/consultancy" className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm border hover:opacity-90 transition-all" style={{ color: COLOR, borderColor: `${COLOR}35`, background: `${COLOR}10` }}>
                  View All Services →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        <ConsultationSection />

      </div>
    </div>
  );
}
