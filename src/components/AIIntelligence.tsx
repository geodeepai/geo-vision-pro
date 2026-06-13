"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";

const PIPELINE = [
  { step: "01", label: "Raw Data Ingestion", sub: "Satellite · Drone · Sensor", color: "#6366f1" },
  { step: "02", label: "Preprocessing", sub: "Radiometric · Geometric · Mosaic", color: "#8b5cf6" },
  { step: "03", label: "AI Model Inference", sub: "CNN · Transformer · SAM", color: "#2563eb" },
  { step: "04", label: "Validated Output", sub: "Classified · Vectorised · Report-ready", color: "#059669" },
];

const DOMAINS = [
  {
    id: "lulc",
    tag: "LULC",
    title: "Multi-Class Land Cover Classification",
    desc: "Deep convolutional networks trained on Sentinel-2 and Landsat time-series achieve >92% overall accuracy across 15 LULC classes — automating what used to take weeks of manual digitisation.",
    metrics: [
      { label: "Overall Accuracy", value: "92.4%" },
      { label: "Kappa Coefficient", value: "0.89" },
      { label: "Classes Mapped", value: "15+" },
    ],
    capabilities: ["Seasonal Change Detection", "Crop Type Discrimination", "Urban Sprawl Monitoring", "Forest Degradation Index"],
    color: "#059669",
    glow: "rgba(5,150,105,0.15)",
    accent: "#ecfdf5",
  },
  {
    id: "rs",
    tag: "Remote Sensing",
    title: "Automated Feature Extraction from Imagery",
    desc: "Segment Anything Model (SAM) and custom transformers extract roads, buildings, water bodies, and vegetation boundaries at pixel-level precision from very-high-resolution satellite scenes.",
    metrics: [
      { label: "Detection F1-Score", value: "0.94" },
      { label: "Processing Speed", value: "10× faster" },
      { label: "Resolution Support", value: "0.3 m–30 m" },
    ],
    capabilities: ["Building Footprint Extraction", "Road Network Detection", "Waterbody Delineation", "Shadow & Cloud Masking"],
    color: "#2563eb",
    glow: "rgba(37,99,235,0.15)",
    accent: "#eff6ff",
  },
  {
    id: "gis",
    tag: "GIS Analytics",
    title: "Predictive Spatial Modelling",
    desc: "Graph neural networks and spatiotemporal transformers model urban growth, flood risk zones, and site suitability — fusing vector layers, DEMs, and socioeconomic data into decision-ready intelligence.",
    metrics: [
      { label: "Prediction Accuracy", value: "89%" },
      { label: "Spatial Layers Fused", value: "20+" },
      { label: "Risk Zones Mapped", value: "District-level" },
    ],
    capabilities: ["Urban Growth Simulation", "Flood Susceptibility Mapping", "Site Suitability Analysis", "Infrastructure Demand Forecast"],
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.15)",
    accent: "#f5f3ff",
  },
  {
    id: "drone",
    tag: "UAV & Drone",
    title: "Real-Time Object Detection & 3D Reconstruction",
    desc: "YOLOv9 and NeRF-based pipelines process drone orthomosaics for instant anomaly detection, crop stress mapping, and photogrammetric 3D models — enabling decisions at the field edge.",
    metrics: [
      { label: "Object Detection mAP", value: "91%" },
      { label: "3D Model Resolution", value: "2 cm GSD" },
      { label: "Processing Latency", value: "<4 hrs/km²" },
    ],
    capabilities: ["Crop Stress Detection", "Structure Damage Assessment", "Point Cloud Classification", "Orthomosaic Vegetation Index"],
    color: "#ea580c",
    glow: "rgba(234,88,12,0.15)",
    accent: "#fff7ed",
  },
];

const TECH = [
  "Google Earth Engine", "TensorFlow / Keras", "PyTorch", "Segment Anything (SAM)",
  "GDAL / Rasterio", "Scikit-learn", "LangChain RAG", "ONNX Runtime",
  "Hugging Face Transformers", "OpenCV", "QGIS Python API", "ArcPy",
];

function PipelineArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center px-1 flex-shrink-0">
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <path d="M0 8 H26 M22 3 L28 8 L22 13" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AIIntelligence() {
  const [active, setActive] = useState("lulc");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const domain = DOMAINS.find((d) => d.id === active)!;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg,#060d1f 0%,#0a1628 60%,#060d1f 100%)" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(37,99,235,0.1),transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-14 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-xs font-bold tracking-widest uppercase">AI-Powered Geospatial Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
            Where{" "}
            <span style={{ background: "linear-gradient(135deg,#818cf8,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Deep Learning
            </span>{" "}
            Meets the Earth
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            We embed state-of-the-art AI directly into geospatial workflows — replacing manual interpretation
            with neural precision, and static maps with living, predictive intelligence.
          </p>
        </div>

        {/* Processing pipeline */}
        <div
          className="mb-16 transition-all duration-700 delay-150"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
        >
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">AI Processing Pipeline</p>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-0">
            {PIPELINE.map((p, i) => (
              <div key={p.step} className="flex items-center gap-3 lg:gap-0 w-full lg:w-auto">
                <div
                  className="flex-1 lg:flex-none flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all hover:scale-105"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: `${p.color}30`, minWidth: 180 }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-black" style={{ background: `${p.color}20`, color: p.color }}>
                    {p.step}
                  </div>
                  <div>
                    <p className="text-white text-xs font-black">{p.label}</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">{p.sub}</p>
                  </div>
                </div>
                {i < PIPELINE.length - 1 && <PipelineArrow />}
              </div>
            ))}
          </div>
        </div>

        {/* Domain tabs + detail */}
        <div
          className="transition-all duration-700 delay-300"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}
        >
          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className="px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                style={
                  active === d.id
                    ? { background: d.color, color: "#fff", boxShadow: `0 4px 20px ${d.glow}` }
                    : { background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }
                }
              >
                {d.tag}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            key={domain.id}
            className="rounded-3xl border overflow-hidden"
            style={{ borderColor: `${domain.color}25`, background: "rgba(255,255,255,0.02)" }}
          >
            <div className="grid lg:grid-cols-2 gap-0">

              {/* Left — description */}
              <div className="p-8 border-b lg:border-b-0 lg:border-r" style={{ borderColor: `${domain.color}20` }}>
                <span className="inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4" style={{ background: `${domain.color}20`, color: domain.color }}>
                  {domain.tag}
                </span>
                <h3 className="text-xl font-black text-white mb-3 leading-snug">{domain.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-7">{domain.desc}</p>

                {/* Capabilities */}
                <div className="space-y-2">
                  {domain.capabilities.map((c) => (
                    <div key={c} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: domain.color }} />
                      <span className="text-xs text-slate-300 font-medium">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — metrics + visual */}
              <div className="p-8 flex flex-col justify-between gap-6">

                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-3">
                  {domain.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl p-4 text-center border"
                      style={{ background: `${domain.color}10`, borderColor: `${domain.color}25` }}
                    >
                      <p className="text-xl font-black mb-1" style={{ color: domain.color }}>{m.value}</p>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Pseudo terminal / classification visual */}
                <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: "rgba(0,0,0,0.4)" }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-3 text-[10px] text-slate-500 font-mono">gvp_inference.py · {domain.tag}</span>
                  </div>
                  <div className="px-5 py-4 font-mono text-[11px] leading-relaxed" style={{ background: "rgba(0,0,0,0.25)" }}>
                    <p><span className="text-indigo-400">import</span> <span className="text-white">gvp_ai</span></p>
                    <p className="text-slate-500"># Load pre-trained model</p>
                    <p><span className="text-emerald-400">model</span> <span className="text-white">=</span> <span className="text-yellow-300">gvp_ai.load</span><span className="text-white">(</span><span className="text-orange-300">"{domain.id}_v3"</span><span className="text-white">)</span></p>
                    <p><span className="text-emerald-400">result</span> <span className="text-white">=</span> <span className="text-yellow-300">model.predict</span><span className="text-white">(scene, confidence=</span><span className="text-orange-300">0.92</span><span className="text-white">)</span></p>
                    <p className="mt-1 text-slate-500"># Output</p>
                    <p><span style={{ color: domain.color }}>✓ {domain.metrics[0].label}: <strong>{domain.metrics[0].value}</strong></span></p>
                    <p><span style={{ color: domain.color }}>✓ {domain.metrics[1].label}: <strong>{domain.metrics[1].value}</strong></span></p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div
          className="mt-14 text-center transition-all duration-700 delay-500"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}
        >
          <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-5">AI & Geospatial Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TECH.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:scale-105"
                style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-8 py-6 border" style={{ background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.2)" }}>
          <div>
            <p className="text-white font-black text-lg mb-1">Ready to Automate Your Geospatial Workflows?</p>
            <p className="text-slate-400 text-sm">Tell us your dataset and challenge — we'll design the right AI pipeline.</p>
          </div>
          <a
            href="/consultancy"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg,#6366f1,#2563eb)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
          >
            Start AI Consultation →
          </a>
        </div>

      </div>
    </section>
  );
}
