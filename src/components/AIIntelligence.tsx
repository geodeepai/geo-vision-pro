"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  Globe2, Radio, Map, LayoutGrid, Leaf, Building2,
  Droplets, TrendingUp, ArrowRight, ChevronRight,
  Satellite, Cpu, BarChart3, CheckCircle2,
} from "lucide-react";

/* ── Accent palette ── */
const CY = "#0077CC";
const EM = "#059669";

/* ── Workflow ── */
const WORKFLOW = [
  { n:"01", label:"Satellite Data",      sub:"Sentinel · Landsat · SAR · LiDAR",  Icon:Satellite,    color:"#2563eb" },
  { n:"02", label:"AI Processing",       sub:"CNN · Transformers · SAM · LLMs",   Icon:Cpu,          color:"#7c3aed" },
  { n:"03", label:"GIS Analysis",        sub:"Spatial · Vector · Raster Ops",     Icon:Map,          color:"#059669" },
  { n:"04", label:"Predictive Insights", sub:"Forecast · Risk · Temporal ML",     Icon:BarChart3,    color:"#d97706" },
  { n:"05", label:"Decision Support",    sub:"Reports · Policy · Infrastructure", Icon:CheckCircle2, color:"#16a34a" },
];

/* ── 8 Domain cards ── */
const DOMAINS = [
  { Icon: Globe2,     color:"#2563eb", title:"AI-Powered Geospatial Intelligence",     desc:"Neural networks fused with multi-spectral imagery extract planet-scale intelligence in hours, not months.",   pills:["Deep Learning","Auto Classification","Sensor Fusion"] },
  { Icon: Radio,      color:"#059669", title:"Remote Sensing & Satellite Analytics",    desc:"End-to-end processing from raw DN values to radiometrically corrected, analysis-ready data cubes.",           pills:["SAR Processing","Optical Analysis","Time-series Stack"] },
  { Icon: Map,        color:"#7c3aed", title:"GIS Mapping & Spatial Decision Support",  desc:"Multi-layer geospatial databases and cartographic outputs that turn complex data into clear decision maps.",   pills:["Spatial Querying","Overlay Analysis","Web GIS"] },
  { Icon: LayoutGrid, color:"#0891b2", title:"LULC Change Detection & Monitoring",      desc:"Multi-temporal land use classification achieving >92% accuracy across 15+ classes using vision transformers.", pills:["Change Detection","15+ Classes","Kappa > 0.89"] },
  { Icon: Leaf,       color:"#16a34a", title:"AI-Based Environmental Impact Assessment",desc:"Automated EIA workflows integrating satellite indices and ML models to quantify ecological stress.",            pills:["NDVI / EVI Maps","Carbon Estimation","EIA Compliance"] },
  { Icon: Building2,  color:"#d97706", title:"Urban Growth & Infrastructure Planning",  desc:"AI-driven urban expansion modelling, suitability analysis, and smart-city spatial databases for master plans.", pills:["Urban Sprawl Model","Suitability Mapping","Smart City GIS"] },
  { Icon: Droplets,   color:"#0ea5e9", title:"Water Resource & Watershed Management",   desc:"Hydrological modelling and flood susceptibility mapping using SAR and optical satellite data fusion.",         pills:["Flood Mapping","Watershed Delineation","Water Quality Index"] },
  { Icon: TrendingUp, color:"#7c3aed", title:"Predictive Spatial Modeling",             desc:"LSTM and spatiotemporal transformers forecast land-use transitions, disaster zones, and infrastructure demand.", pills:["LSTM Forecasting","Risk Probability Maps","Spatiotemporal ML"] },
];

const STATS = [
  { value:"92.4%", label:"LULC Accuracy" },
  { value:"0.3 m", label:"Min Resolution" },
  { value:"500+",  label:"Projects Done" },
  { value:"12+",   label:"States Covered" },
];

/* ── Globe SVG — bright blue sphere with orbiting satellites ── */
function GlobeViz() {
  return (
    <div className="relative flex items-center justify-center select-none w-full max-w-[440px] mx-auto" style={{ aspectRatio:"1/1" }}>

      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 68%)", filter:"blur(32px)" }} />

      {/* Decorative rings */}
      <div className="absolute rounded-full border border-dashed pointer-events-none" style={{ inset:10, borderColor:"rgba(37,99,235,0.14)", animation:"spinSlow 60s linear infinite" }} />
      <div className="absolute rounded-full border border-dashed pointer-events-none" style={{ inset:28, borderColor:"rgba(5,150,105,0.10)", animation:"spinSlowReverse 40s linear infinite" }} />

      <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ position:"relative", zIndex:2, overflow:"visible" }}>
        <defs>
          {/* Bright blue sphere for light backgrounds */}
          <radialGradient id="sph2" cx="34%" cy="28%" r="72%">
            <stop offset="0%"   stopColor="#93c5fd" />
            <stop offset="38%"  stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id="atmo2" cx="50%" cy="50%" r="50%">
            <stop offset="72%"  stopColor="transparent" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.18" />
          </radialGradient>
          <clipPath id="gc2"><circle cx="200" cy="200" r="154" /></clipPath>
          <filter id="glow3">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Atmosphere halo */}
        <circle cx="200" cy="200" r="176" fill="url(#atmo2)" />
        <circle cx="200" cy="200" r="163" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.22" />

        {/* Sphere */}
        <circle cx="200" cy="200" r="154" fill="url(#sph2)" />

        {/* Lat / lon grid */}
        <g clipPath="url(#gc2)" fill="none" stroke="#bfdbfe" strokeWidth="0.6" opacity="0.4">
          <ellipse cx="200" cy="200" rx="154" ry="42" />
          <ellipse cx="200" cy="200" rx="154" ry="86" />
          <ellipse cx="200" cy="200" rx="154" ry="128" />
          <ellipse cx="200" cy="155" rx="136" ry="36" />
          <ellipse cx="200" cy="246" rx="136" ry="36" />
          <ellipse cx="200" cy="200" rx="40"  ry="154" />
          <ellipse cx="200" cy="200" rx="92"  ry="154" />
          <ellipse cx="200" cy="200" rx="138" ry="154" />
        </g>

        {/* Land masses */}
        <g clipPath="url(#gc2)" opacity="0.7">
          <path d="M 234,136 L 268,141 L 276,163 L 259,195 L 237,188 L 222,167 L 224,149 Z" fill="#34d399" />
          <ellipse cx="253" cy="197" rx="6" ry="9" fill="#34d399" opacity="0.7" />
          <path d="M 201,134 L 226,130 L 233,155 L 216,170 L 200,160 Z" fill="#34d399" opacity="0.75" />
          <path d="M 270,130 L 308,126 L 315,150 L 298,167 L 273,159 Z" fill="#34d399" opacity="0.68" />
          <path d="M 188,168 L 212,163 L 220,198 L 208,226 L 187,214 Z" fill="#34d399" opacity="0.55" />
          <path d="M 234,110 L 289,105 L 296,124 L 268,130 L 236,122 Z" fill="#34d399" opacity="0.45" />
        </g>

        {/* Specular highlight */}
        <ellipse cx="162" cy="152" rx="46" ry="28" fill="white" opacity="0.15" />

        {/* Project dots */}
        <g filter="url(#glow3)">
          {([
            [244,147,"#f59e0b"],[236,170,"#34d399"],[241,186,"#60a5fa"],
            [261,146,"#f59e0b"],[249,193,"#a78bfa"],
            [255,140,"#60a5fa"],[225,158,"#34d399"],[281,154,"#f59e0b"],
            [205,180,"#38bdf8"],
          ] as [number,number,string][]).map(([x,y,c],i)=>(
            <circle key={i} cx={x} cy={y} r="3.8" fill={c} opacity="0.95" />
          ))}
        </g>

        {/* Connection lines */}
        <g clipPath="url(#gc2)" fill="none" stroke="#93c5fd" strokeWidth="0.6" strokeDasharray="3 7" opacity="0.35">
          <line x1="244" y1="147" x2="261" y2="146" />
          <line x1="244" y1="147" x2="236" y2="170" />
          <line x1="236" y1="170" x2="241" y2="186" />
          <line x1="244" y1="147" x2="225" y2="158" />
          <line x1="261" y1="146" x2="281" y2="154" />
          <line x1="205" y1="180" x2="188" y2="185" />
        </g>

        {/* Orbit 1 — cyan satellite */}
        <g transform="rotate(-22 200 200)">
          <ellipse cx="200" cy="200" rx="178" ry="52" fill="none" stroke="#60a5fa" strokeWidth="0.65" strokeOpacity="0.28" strokeDasharray="6 14" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="13s" repeatCount="indefinite" />
            <rect x="369" y="195.5" width="18" height="9" rx="2.5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.3" />
            <rect x="350" y="197.5" width="17" height="5" rx="1.5" fill="#4338ca" opacity="0.9" />
            <rect x="387" y="197.5" width="17" height="5" rx="1.5" fill="#4338ca" opacity="0.9" />
            <line x1="378" y1="195.5" x2="378" y2="189" stroke="#60a5fa" strokeWidth="0.9" />
            <circle cx="378" cy="188" r="1.8" fill="#60a5fa" />
          </g>
        </g>

        {/* Orbit 2 — emerald satellite */}
        <g transform="rotate(55 200 200)">
          <ellipse cx="200" cy="200" rx="162" ry="46" fill="none" stroke="#34d399" strokeWidth="0.6" strokeOpacity="0.22" strokeDasharray="4 12" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="180 200 200" to="540 200 200" dur="8.5s" repeatCount="indefinite" />
            <rect x="354" y="196.5" width="15" height="8" rx="2" fill="#064e3b" stroke="#34d399" strokeWidth="1.2" />
            <rect x="339" y="198.5" width="13" height="4" rx="1.5" fill="#34d399" opacity="0.85" />
            <rect x="369" y="198.5" width="13" height="4" rx="1.5" fill="#34d399" opacity="0.85" />
            <line x1="361.5" y1="196.5" x2="361.5" y2="191" stroke="#34d399" strokeWidth="0.9" />
            <circle cx="361.5" cy="190" r="1.5" fill="#34d399" />
          </g>
        </g>

        {/* Scan line */}
        <g clipPath="url(#gc2)">
          <line x1="46" y1="200" x2="354" y2="200" stroke="#60a5fa" strokeWidth="1" opacity="0">
            <animate attributeName="y1" values="52;348;52" dur="5.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="52;348;52" dur="5.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.3;0.3;0" dur="5.5s" repeatCount="indefinite" />
          </line>
        </g>
      </svg>

      {/* Floating data chips */}
      <div className="absolute hidden sm:block" style={{ top:62, right:-8, animation:"floatChip1 4.2s ease-in-out infinite" }}>
        <div style={{ background:"rgba(255,255,255,0.92)", border:"1px solid rgba(37,99,235,0.18)", borderRadius:12, padding:"9px 13px", backdropFilter:"blur(14px)", boxShadow:"0 4px 16px rgba(15,23,42,0.08)" }}>
          <p style={{ fontSize:9, color:"#64748b", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 3px" }}>NDVI Index</p>
          <p style={{ fontSize:20, fontWeight:900, color:"#059669", margin:0, lineHeight:1 }}>0.82</p>
        </div>
      </div>
      <div className="absolute hidden sm:block" style={{ bottom:88, left:-14, animation:"floatChip2 5.1s ease-in-out infinite", animationDelay:"1.1s" }}>
        <div style={{ background:"rgba(255,255,255,0.92)", border:"1px solid rgba(5,150,105,0.18)", borderRadius:12, padding:"9px 13px", backdropFilter:"blur(14px)", boxShadow:"0 4px 16px rgba(15,23,42,0.08)" }}>
          <p style={{ fontSize:9, color:"#64748b", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 3px" }}>Land Class</p>
          <p style={{ fontSize:13, fontWeight:800, color:"#059669", margin:0 }}>Dense Forest</p>
        </div>
      </div>
      <div className="absolute hidden sm:block" style={{ top:168, right:-28, animation:"floatChip3 6s ease-in-out infinite", animationDelay:"0.6s" }}>
        <div style={{ background:"rgba(255,255,255,0.92)", border:"1px solid rgba(124,58,237,0.18)", borderRadius:12, padding:"9px 13px", backdropFilter:"blur(14px)", boxShadow:"0 4px 16px rgba(15,23,42,0.08)" }}>
          <p style={{ fontSize:9, color:"#64748b", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 3px" }}>AI Accuracy</p>
          <p style={{ fontSize:20, fontWeight:900, color:"#7c3aed", margin:0, lineHeight:1 }}>94.7%</p>
        </div>
      </div>
      <div className="absolute hidden sm:block" style={{ bottom:185, right:-18, animation:"floatChip1 4.8s ease-in-out infinite", animationDelay:"2s" }}>
        <div style={{ background:"rgba(255,255,255,0.92)", border:"1px solid rgba(217,119,6,0.18)", borderRadius:12, padding:"9px 13px", backdropFilter:"blur(14px)", boxShadow:"0 4px 16px rgba(15,23,42,0.08)" }}>
          <p style={{ fontSize:9, color:"#64748b", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 3px" }}>Cloud Cover</p>
          <p style={{ fontSize:20, fontWeight:900, color:"#d97706", margin:0, lineHeight:1 }}>8%</p>
        </div>
      </div>
    </div>
  );
}

export default function AIIntelligence() {
  const secRef = useRef<HTMLDivElement>(null);
  const inView = useInView(secRef, { once:true, margin:"-8% 0px" });

  return (
    <section
      ref={secRef}
      className="relative overflow-hidden"
      style={{ background:"var(--section-alt)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`radial-gradient(circle at 1px 1px,rgba(37,99,235,0.07) 1px,transparent 0)`, backgroundSize:"44px 44px" }} />
      {/* Top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background:`linear-gradient(90deg,transparent,rgba(37,99,235,0.25),transparent)` }} />
      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background:`linear-gradient(90deg,transparent,rgba(5,150,105,0.20),transparent)` }} />
      {/* Soft glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none" style={{ background:`radial-gradient(circle,rgba(37,99,235,0.06),transparent 70%)`, filter:"blur(48px)" }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none" style={{ background:`radial-gradient(circle,rgba(5,150,105,0.06),transparent 70%)`, filter:"blur(48px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* PART 1 — Globe + Text */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">

          {/* Globe */}
          <div
            className="flex justify-center order-2 lg:order-1 transition-all duration-1000"
            style={{ opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(-40px)" }}
          >
            <GlobeViz />
          </div>

          {/* Text */}
          <div
            className="order-1 lg:order-2 transition-all duration-1000"
            style={{ opacity:inView?1:0, transform:inView?"translateX(0)":"translateX(40px)", transitionDelay:"0.1s" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6" style={{ background:"var(--badge-bg)", border:"1px solid var(--badge-border)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse bg-blue-500" />
              <span style={{ color:"var(--badge-text)", fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" }}>AI-Powered Geospatial Platform · Live</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-5" style={{ color:"var(--heading)" }}>
              Transforming{" "}
              <span className="gradient-text">Spatial Data</span>
              {" "}into<br />
              <span className="gradient-text">Intelligent Decisions</span>
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color:"var(--body-text)", maxWidth:490 }}>
              Advanced AI-driven Remote Sensing, GIS, LULC Analytics, and Geospatial Consultancy for Sustainable Development and Infrastructure Excellence.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-xl p-4" style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)", boxShadow:"0 1px 3px rgba(15,23,42,0.04)" }}>
                  <p className="text-2xl font-black mb-0.5 text-blue-600">{s.value}</p>
                  <p className="text-xs font-semibold" style={{ color:"var(--body-text)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background:"linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow:"0 6px 20px rgba(37,99,235,0.28)" }}
              >
                Explore Solutions <ArrowRight size={15} />
              </a>
              <a
                href="/consultancy"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5"
                style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)", color:"var(--heading)", boxShadow:"0 1px 3px rgba(15,23,42,0.06)" }}
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>

        {/* PART 2 — AI Processing Pipeline */}
        <div
          className="mb-20 transition-all duration-700"
          style={{ opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(28px)", transitionDelay:"0.2s" }}
        >
          <div className="text-center mb-9">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-blue-600">AI Processing Pipeline</p>
            <h3 className="text-2xl md:text-3xl font-black" style={{ color:"var(--heading)" }}>From Raw Data to Actionable Intelligence</h3>
            <p className="text-sm mt-2" style={{ color:"var(--body-text)" }}>Five-stage automated workflow powering every geospatial deliverable</p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-2">
            {WORKFLOW.map(({ n, label, sub, Icon, color }, i) => (
              <div key={n} className="flex items-center gap-1.5 flex-1">
                <div
                  className="group flex-1 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-default"
                  style={{ background:"var(--card-bg)", border:`1px solid ${color}22`, boxShadow:"0 1px 4px rgba(15,23,42,0.05)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${color}22`)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black" style={{ color }}>{n}</span>
                    <div className="h-px flex-1 rounded" style={{ background:`linear-gradient(90deg,${color}50,transparent)` }} />
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background:`${color}12`, border:`1px solid ${color}25` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <p className="text-sm font-black mb-1 leading-snug" style={{ color:"var(--heading)" }}>{label}</p>
                  <p className="text-[11px] leading-snug" style={{ color:"var(--body-text)" }}>{sub}</p>
                </div>
                {i < WORKFLOW.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0 px-0.5">
                    <ChevronRight size={14} style={{ color:"var(--muted)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PART 3 — 8 Domain Cards */}
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity:inView?1:0, transform:inView?"translateY(0)":"translateY(28px)", transitionDelay:"0.3s" }}
        >
          <div className="text-center mb-9">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color:EM }}>Our Expertise</p>
            <h3 className="text-2xl md:text-3xl font-black" style={{ color:"var(--heading)" }}>Geospatial Intelligence Domains</h3>
            <p className="text-sm mt-2" style={{ color:"var(--body-text)" }}>Eight specialised disciplines, one integrated AI-geospatial platform</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOMAINS.map(({ Icon, title, desc, pills, color }) => (
              <div
                key={title}
                className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
                style={{ background:"var(--card-bg)", border:"1px solid var(--card-border)", boxShadow:"0 1px 4px rgba(15,23,42,0.04)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}35`; e.currentTarget.style.boxShadow=`0 8px 24px rgba(15,23,42,0.08)`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--card-border)"; e.currentTarget.style.boxShadow="0 1px 4px rgba(15,23,42,0.04)"; }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background:`radial-gradient(ellipse at top, ${color}06, transparent 70%)` }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background:`${color}12`, border:`1px solid ${color}25` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h4 className="text-xs font-black mb-2 leading-snug" style={{ color:"var(--heading)" }}>{title}</h4>
                <p className="text-[11px] leading-relaxed mb-4" style={{ color:"var(--body-text)", minHeight:56 }}>{desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {pills.map(p => (
                    <span key={p} className="px-2 py-0.5 rounded-md text-[10px] font-semibold" style={{ background:`${color}10`, color, border:`1px solid ${color}22` }}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 4 — Bottom CTA */}
        <div
          className="relative rounded-3xl p-10 text-center overflow-hidden transition-all duration-700"
          style={{ background:"linear-gradient(135deg,#0f2d6e 0%,#1d4ed8 50%,#1e40af 100%)", opacity:inView?1:0, transitionDelay:"0.4s" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)`, backgroundSize:"36px 36px" }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background:`radial-gradient(ellipse at center,rgba(255,255,255,0.06),transparent 68%)` }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.22)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-blue-200" />
              <span style={{ color:"#bfdbfe", fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>NASA-Grade Analytics · McKinsey-Level Strategy</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              Ready to Transform Your<br />
              <span style={{ background:"linear-gradient(135deg,#93c5fd,#c4b5fd)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Geospatial Workflow?
              </span>
            </h3>
            <p className="text-blue-200 text-sm max-w-xl mx-auto mb-8">
              Tell us your data challenge — we design the right AI geospatial pipeline for government, engineering, environmental, and infrastructure clients.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#services" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background:"#ffffff", color:"#1d4ed8", boxShadow:"0 6px 20px rgba(0,0,0,0.2)" }}>
                Explore Solutions <ArrowRight size={15} />
              </a>
              <a href="/consultancy" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5" style={{ border:"1px solid rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.08)" }}>
                Request Consultation
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
