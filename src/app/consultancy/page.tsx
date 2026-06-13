"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckCircle, Satellite, Layers, BarChart2,
  FileText, Leaf, Building2, Droplets, Mountain, AlertTriangle,
  Wind, Waves, Shield, Clock, Users, Award, Target,
  ChevronRight, MapPin, Mail, Phone, Send, Loader2,
  MessageSquare, User, Briefcase, AtSign, PhoneCall,
  SlidersHorizontal, Navigation2, DollarSign, Calendar,
} from "lucide-react";
import ServiceTopBar from "@/components/ServiceTopBar";

/* ─── Core services ──────────────────────────────────────────── */
const CORE_SERVICES = [
  {
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    title: "Satellite Image Processing",
    desc: "End-to-end processing of optical and SAR imagery including geometric correction, atmospheric correction, radiometric calibration, and cloud masking to produce analysis-ready data.",
    bullets: [
      "TOA & Surface Reflectance Conversion",
      "Geometric & Radiometric Calibration",
      "Cloud & Shadow Masking",
      "Multi-sensor Data Fusion",
      "Pan-sharpening & Resolution Enhancement",
    ],
  },
  {
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    title: "LULC Mapping & Change Detection",
    desc: "Accurate land use/land cover classification and multi-temporal change analysis for agriculture, urban growth, deforestation, and wetland monitoring.",
    bullets: [
      "Supervised & Unsupervised Classification",
      "Object-Based Image Analysis (OBIA)",
      "Multi-temporal Change Detection",
      "Post-classification Accuracy Assessment",
      "LULC Transition Matrix & Statistics",
    ],
  },
  {
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    title: "Spectral Indices & Thematic Mapping",
    desc: "Computation of vegetation, water, soil, and urban spectral indices for resource mapping, crop health monitoring, and environmental characterization.",
    bullets: [
      "NDVI, EVI, SAVI, LAI Computation",
      "NDWI, MNDWI Water Body Mapping",
      "Burn Severity (dNBR, BAI)",
      "Urban Index (NDBI) Mapping",
      "Time-series Index Trend Analysis",
    ],
  },
  {
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    title: "Environmental Impact Assessment",
    desc: "Satellite-based EIA support covering baseline mapping, vegetation stress detection, water quality assessment, and post-project monitoring.",
    bullets: [
      "Baseline Land Cover Mapping",
      "Vegetation Health & Stress Analysis",
      "Water Body & Wetland Inventory",
      "Soil Degradation Assessment",
      "Periodic Monitoring & Comparison",
    ],
  },
  {
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    title: "Terrain & DEM Analysis",
    desc: "Digital elevation model generation and terrain analysis for watershed delineation, flood modelling, slope stability, and infrastructure siting.",
    bullets: [
      "SRTM / ASTER / ALOS DEM Processing",
      "Slope, Aspect & Hillshade Derivation",
      "Watershed & Drainage Delineation",
      "Flood Inundation Modelling",
      "Viewshed & Line-of-sight Analysis",
    ],
  },
  {
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    title: "Custom Geospatial Reports",
    desc: "Comprehensive, publication-ready technical reports with classified maps, accuracy tables, statistical summaries, and GIS-ready deliverables tailored to client requirements.",
    bullets: [
      "Technical Methodology Documentation",
      "Classified Maps with Cartographic Layout",
      "Accuracy Assessment (Kappa, OA, PA, UA)",
      "GeoTIFF, Shapefile & GeoJSON Outputs",
      "Interactive Web Map (Optional)",
    ],
  },
];

/* ─── Methodology steps ──────────────────────────────────────── */
const STEPS = [
  {
    n: "01",
    title: "Requirement Analysis",
    desc: "We begin with a detailed client brief to understand objectives, study area, timeline, budget, and deliverable format before recommending the optimal data strategy.",
    icon: Target,
    color: "#2563eb",
  },
  {
    n: "02",
    title: "Data Acquisition & QA",
    desc: "We identify the best-fit satellite sensors based on spatial/temporal requirements, acquire imagery through Copernicus, USGS EarthExplorer, or commercial providers, and perform cloud and quality checks.",
    icon: Satellite,
    color: "#0891b2",
  },
  {
    n: "03",
    title: "Pre-processing & Correction",
    desc: "Geometric orthorectification, radiometric calibration, atmospheric correction (Sen2Cor / FLAASH / 6S), and image mosaicking ensure scientifically accurate analysis-ready data.",
    icon: Layers,
    color: "#7c3aed",
  },
  {
    n: "04",
    title: "Analysis & Classification",
    desc: "We apply client-defined spectral indices, classification algorithms (RF, SVM, OBIA), change detection, or time-series analysis using ENVI, SNAP, GEE, and Python.",
    icon: BarChart2,
    color: "#059669",
  },
  {
    n: "05",
    title: "Validation & Accuracy Report",
    desc: "Ground truth data and stratified random sampling validate classification results. We compute confusion matrix, Kappa coefficient, and per-class accuracy before finalising outputs.",
    icon: CheckCircle,
    color: "#d97706",
  },
  {
    n: "06",
    title: "Reporting & Delivery",
    desc: "Clients receive a full technical report, georeferenced maps, vector shapefiles, Excel/CSV statistics, and an optional web map — all reviewed with a project debrief call.",
    icon: FileText,
    color: "#dc2626",
  },
];

/* ─── Sectors ────────────────────────────────────────────────── */
const SECTORS = [
  { label: "Agriculture & Precision Farming", Icon: Leaf, color: "#16a34a" },
  { label: "Forest & Biodiversity", Icon: Wind, color: "#065f46" },
  { label: "Urban Planning & Smart Cities", Icon: Building2, color: "#1d4ed8" },
  { label: "Hydrology & Water Resources", Icon: Droplets, color: "#0369a1" },
  { label: "Geology & Mineral Exploration", Icon: Mountain, color: "#92400e" },
  { label: "Disaster & Risk Assessment", Icon: AlertTriangle, color: "#dc2626" },
  { label: "Oceanography & Coastal Zones", Icon: Waves, color: "#0891b2" },
  { label: "Defense & Border Monitoring", Icon: Shield, color: "#374151" },
];

/* ─── Tech stack ─────────────────────────────────────────────── */
const TECH = {
  "Satellite Sensors": [
    "Landsat 8 / 9 (OLI-TIRS)",
    "Sentinel-1 SAR (C-band)",
    "Sentinel-2 MSI (10 m)",
    "MODIS (Terra / Aqua)",
    "WorldView-2/3 (VHR)",
    "PlanetScope (3 m Daily)",
    "ALOS-2 PALSAR (L-band)",
    "ASTER (Thermal / SWIR)",
  ],
  "Processing Software": [
    "ENVI + ENVI Analytics",
    "ESA SNAP Toolbox",
    "QGIS 3.x",
    "ArcGIS Pro",
    "ERDAS Imagine",
    "Google Earth Engine",
    "Python (GDAL / Rasterio)",
    "scikit-learn / TensorFlow",
  ],
  "Deliverable Formats": [
    "GeoTIFF (raster)",
    "Shapefile / GeoJSON",
    "KMZ / KML",
    "PDF Map Layouts",
    "Excel / CSV Statistics",
    "Interactive Web Map",
    "Technical PDF Report",
    "GEE App (Optional)",
  ],
};

/* ─── USPs ───────────────────────────────────────────────────── */
const USPS = [
  {
    Icon: Award,
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    title: "Expert Team",
    desc: "Our analysts hold advanced degrees in Remote Sensing, GIS, and Earth Observation and have delivered 100+ projects across government, NGO, and private sectors.",
  },
  {
    Icon: Target,
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    title: ">90% Classification Accuracy",
    desc: "Rigorous validation using stratified sampling, confusion matrix, and Kappa statistics ensures every deliverable meets international accuracy standards.",
  },
  {
    Icon: Clock,
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    title: "5–15 Day Turnaround",
    desc: "We maintain clear project timelines with milestone updates. Most standard mapping projects are delivered within two working weeks from data receipt.",
  },
  {
    Icon: Users,
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    title: "End-to-End Management",
    desc: "From data procurement and processing to final map production and client review — we manage the entire workflow so you can focus on decision-making.",
  },
];

/* ─── Consultation form ──────────────────────────────────────── */
type FormData = {
  fullName: string; company: string; email: string; phone: string;
  service: string; location: string; budget: string;
  message: string; contactMethod: "phone" | "email" | "whatsapp";
};
type FormErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

const SERVICES = [
  "Satellite Image Processing & Analysis",
  "LULC Mapping & Change Detection",
  "Spectral Indices & Thematic Mapping",
  "Environmental Impact Assessment",
  "Terrain & DEM Analysis",
  "Flood & Disaster Assessment",
  "Custom Geospatial Reports",
  "Other / Not Sure Yet",
];
const BUDGETS = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "To be discussed",
];

const EMPTY: FormData = {
  fullName: "", company: "", email: "", phone: "",
  service: "", location: "", budget: "",
  message: "", contactMethod: "email",
};

function validate(d: FormData): FormErrors {
  const e: FormErrors = {};
  if (!d.fullName.trim() || d.fullName.trim().length < 2)
    e.fullName = "Full name must be at least 2 characters.";
  if (!d.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "Enter a valid email address.";
  if (!d.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(d.phone))
    e.phone = "Enter a valid phone number.";
  if (!d.service)
    e.service = "Please select a service.";
  return e;
}

function ConsultationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function set(field: keyof FormData, val: string) {
    setForm((p) => ({ ...p, [field]: val }));
    if (touched[field]) {
      const next = { ...form, [field]: val };
      const e = validate(next);
      setErrors((prev) => ({ ...prev, [field]: e[field] }));
    }
  }

  function blur(field: keyof FormData) {
    setTouched((p) => ({ ...p, [field]: true }));
    const e = validate(form);
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, service: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  }

  const waText = encodeURIComponent(
    `Hi, I'd like a consultation for *${form.service || "Remote Sensing"}*.\nName: ${form.fullName || "(not filled)"}\nEmail: ${form.email || "(not filled)"}`
  );
  const waLink = `https://wa.me/91XXXXXXXXXX?text=${waText}`;

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500";
  const inputOk = "border-slate-200 hover:border-slate-300";
  const inputErr = "border-red-400 focus:ring-red-400/30 focus:border-red-400";

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  });

  return (
    <section id="consultation" ref={ref} aria-labelledby="consult-heading">
      {/* Section label */}
      <motion.div {...fadeUp(0)} className="mb-7">
        <h2 id="consult-heading" className="text-xl font-black text-slate-900 mb-1">
          Request a Consultation
        </h2>
        <p className="text-sm text-slate-500 max-w-xl">
          Schedule a free consultation with our experts. Tell us about your project and we will get back to you shortly.
        </p>
      </motion.div>

      {/* Main card */}
      <motion.div
        {...fadeUp(0.1)}
        className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100"
      >
        <div className="grid lg:grid-cols-[380px_1fr]">

          {/* ── Left info panel ─────────────────────────────────── */}
          <div
            className="relative p-8 lg:p-10 flex flex-col justify-between gap-8 overflow-hidden"
            style={{ background: "linear-gradient(160deg,#060d1f 0%,#0f2044 55%,#0a1a3a 100%)" }}
          >
            {/* grid bg */}
            <div className="absolute inset-0 opacity-[0.055]" style={{
              backgroundImage: `linear-gradient(rgba(148,198,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(148,198,255,.9) 1px,transparent 1px)`,
              backgroundSize: "32px 32px",
            }} />
            {/* glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(70px)", opacity: 0.2 }} />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-6"
                style={{ background: "rgba(37,99,235,0.22)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.38)" }}>
                <Calendar size={11} /> Free — No Obligation
              </span>
              <h3 className="text-2xl font-black text-white leading-tight mb-3">
                Talk to a Remote<br />Sensing Expert
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have data in hand or need help selecting the right satellite dataset,
                our analysts will guide you from first brief to final deliverable.
              </p>
            </div>

            {/* Contact info */}
            <div className="relative z-10 space-y-3">
              {[
                { Icon: Mail, label: "Email", val: "geovisionpro@email.com", href: "mailto:geovisionpro@email.com" },
                { Icon: PhoneCall, label: "Phone", val: "+91 XXXX XXX XXX", href: "tel:+91XXXXXXXXXX" },
                { Icon: MapPin, label: "Location", val: "India (Remote & On-site)", href: "#" },
              ].map(({ Icon, label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 group"
                  aria-label={label}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <span className="text-slate-400 text-xs group-hover:text-white transition-colors">{val}</span>
                </a>
              ))}
            </div>

            {/* What to expect */}
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">What to Expect</p>
              <ul className="space-y-2">
                {[
                  "Initial reply within 24 hours",
                  "Free project scoping call",
                  "Detailed proposal in 48 hours",
                  "No-obligation quote",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <CheckCircle size={13} className="text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right form panel ─────────────────────────────────── */}
          <div className="bg-white p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 gap-5"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#ecfdf5,#d1fae5)", border: "2px solid #6ee7b7" }}>
                    <CheckCircle size={36} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Request Received!</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Thank you, <strong className="text-slate-700">{form.fullName}</strong>. Our team will review your requirements
                      and reach out via <strong className="text-slate-700">{form.contactMethod}</strong> within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setForm(EMPTY); setStatus("idle"); setTouched({}); setErrors({}); }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  noValidate
                  aria-label="Consultation request form"
                  className="space-y-5"
                >
                  <div>
                    <p className="text-base font-black text-slate-900 mb-0.5">Your Details</p>
                    <p className="text-xs text-slate-400">Fields marked <span className="text-red-500">*</span> are required</p>
                  </div>

                  {/* Row 1: Full Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="fullName"
                          type="text"
                          autoComplete="name"
                          placeholder="Dr. Arjun Mehta"
                          value={form.fullName}
                          onChange={(e) => set("fullName", e.target.value)}
                          onBlur={() => blur("fullName")}
                          aria-required="true"
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? "err-fullName" : undefined}
                          className={`${inputBase} pl-9 ${errors.fullName ? inputErr : inputOk}`}
                        />
                      </div>
                      {errors.fullName && (
                        <p id="err-fullName" role="alert" className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                      <div className="relative">
                        <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Organisation / Institute"
                          value={form.company}
                          onChange={(e) => set("company", e.target.value)}
                          className={`${inputBase} pl-9 ${inputOk}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <AtSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          onBlur={() => blur("email")}
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "err-email" : undefined}
                          className={`${inputBase} pl-9 ${errors.email ? inputErr : inputOk}`}
                        />
                      </div>
                      {errors.email && (
                        <p id="err-email" role="alert" className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneCall size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          onBlur={() => blur("phone")}
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "err-phone" : undefined}
                          className={`${inputBase} pl-9 ${errors.phone ? inputErr : inputOk}`}
                        />
                      </div>
                      {errors.phone && (
                        <p id="err-phone" role="alert" className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Service + Location */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Service Required <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <SlidersHorizontal size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                        <select
                          id="service"
                          value={form.service}
                          onChange={(e) => set("service", e.target.value)}
                          onBlur={() => blur("service")}
                          aria-required="true"
                          aria-invalid={!!errors.service}
                          aria-describedby={errors.service ? "err-service" : undefined}
                          className={`${inputBase} pl-9 appearance-none cursor-pointer ${errors.service ? inputErr : inputOk}`}
                        >
                          <option value="">Select a service…</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.service && (
                        <p id="err-service" role="alert" className="text-[11px] text-red-500 mt-1">{errors.service}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-xs font-bold text-slate-700 mb-1.5">Project Location</label>
                      <div className="relative">
                        <Navigation2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="location"
                          type="text"
                          placeholder="State / District / Coordinates"
                          value={form.location}
                          onChange={(e) => set("location", e.target.value)}
                          className={`${inputBase} pl-9 ${inputOk}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-bold text-slate-700 mb-1.5">Budget Range</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                      <select
                        id="budget"
                        value={form.budget}
                        onChange={(e) => set("budget", e.target.value)}
                        className={`${inputBase} pl-9 appearance-none cursor-pointer ${inputOk}`}
                      >
                        <option value="">Select approximate budget…</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Message / Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Describe your study area, objectives, timeline, and any data you already have…"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={`${inputBase} resize-none ${inputOk}`}
                    />
                  </div>

                  {/* Contact method */}
                  <fieldset>
                    <legend className="text-xs font-bold text-slate-700 mb-2.5">
                      Preferred Contact Method
                    </legend>
                    <div className="flex flex-wrap gap-3" role="radiogroup">
                      {(["email", "phone", "whatsapp"] as const).map((m) => {
                        const labels: Record<string, string> = { email: "Email", phone: "Phone Call", whatsapp: "WhatsApp" };
                        const icons: Record<string, React.ReactNode> = {
                          email: <AtSign size={13} />,
                          phone: <PhoneCall size={13} />,
                          whatsapp: <MessageSquare size={13} />,
                        };
                        const active = form.contactMethod === m;
                        return (
                          <label
                            key={m}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                              active
                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100"
                                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="contactMethod"
                              value={m}
                              checked={active}
                              onChange={() => set("contactMethod", m)}
                              className="sr-only"
                              aria-label={labels[m]}
                            />
                            {icons[m]}
                            {labels[m]}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      aria-disabled={status === "loading"}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-70"
                      style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Submit Request
                        </>
                      )}
                    </motion.button>

                    <motion.a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Open WhatsApp consultation"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all border"
                      style={{ background: "#ecfdf5", color: "#065f46", borderColor: "#6ee7b7", boxShadow: "0 2px 10px rgba(16,185,129,0.15)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Consultation
                    </motion.a>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    By submitting you agree to our privacy policy. We never share your data with third parties.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const CARD = { background: "rgba(255,255,255,0.95)", borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" } as const;

const CONSULTANCY_NAV = [
  { href: "#services-detail", label: "Services" },
  { href: "#methodology",     label: "Methodology" },
  { href: "#sectors",         label: "Sectors" },
  { href: "#why-us",          label: "Why Us" },
];

export default function ConsultancyPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f0f4f8" }}>

      <ServiceTopBar
        color="#2563eb"
        gradientTo="#4f46e5"
        badge="RS"
        title="Remote Sensing Consultancy"
        navLinks={CONSULTANCY_NAV}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#060d1f 0%,#0f2044 60%,#060d1f 100%)" }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,198,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,198,255,1) 1px,transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(80px)", opacity: 0.18 }} />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,#4f46e5,transparent 70%)", filter: "blur(70px)", opacity: 0.14 }} />

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-10">
            {/* Left text */}
            <div className="max-w-2xl">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5"
                style={{ background: "rgba(37,99,235,0.2)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.35)" }}
              >
                <Satellite size={11} /> Professional Geospatial Services
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                Remote Sensing{" "}
                <span style={{ background: "linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Consultancy
                </span>
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-7 max-w-xl">
                Advanced satellite and aerial imagery analysis — from raw data acquisition through pre-processing,
                classification, change detection, and publication-ready reporting — for governments, research
                institutions, NGOs, and private enterprises.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#consultation"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}
                >
                  <Mail size={15} /> Request a Consultation
                </a>
                <a
                  href="#services-detail"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 text-sm border border-white/15 hover:bg-white/10 transition-all"
                >
                  Explore Services <ChevronRight size={15} />
                </a>
              </div>
            </div>

            {/* Right stat cards */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {[
                { val: "100+", label: "Projects Delivered", color: "#60a5fa" },
                { val: ">90%", label: "Classification Accuracy", color: "#34d399" },
                { val: "15 Days", label: "Avg Turnaround", color: "#fbbf24" },
                { val: "8+", label: "Industry Sectors", color: "#a78bfa" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-2xl border text-center"
                  style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <p className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.val}</p>
                  <p className="text-slate-400 text-[11px] font-medium leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* ── Core Services ─────────────────────────────────────── */}
        <section id="services-detail">
          <div className="mb-7">
            <h2 className="text-xl font-black text-slate-900 mb-1">Core Service Offerings</h2>
            <p className="text-sm text-slate-500">Everything we cover in a typical remote sensing engagement</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
                style={{ ...CARD, borderColor: svc.border, background: svc.bg }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${svc.color}15`, border: `1.5px solid ${svc.color}30` }}
                >
                  <div className="w-4 h-4 rounded-sm" style={{ background: svc.color }} />
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-2">{svc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{svc.desc}</p>
                <ul className="space-y-1.5">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: svc.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Methodology ───────────────────────────────────────── */}
        <section id="methodology">
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-8">
              <h2 className="text-xl font-black text-slate-900 mb-1">Our Methodology</h2>
              <p className="text-sm text-slate-500">A rigorous 6-step workflow ensures scientifically valid and client-aligned deliverables</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="relative flex gap-4 p-5 rounded-xl border hover:shadow-md transition-all"
                  style={{ borderColor: `${step.color}25`, background: `${step.color}06` }}
                >
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${step.color}15`, border: `1.5px solid ${step.color}30` }}
                    >
                      <step.icon size={17} style={{ color: step.color }} />
                    </div>
                    <span className="text-[10px] font-black text-slate-300">{step.n}</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 mb-1.5">{step.title}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sectors + Tech stack side by side ─────────────────── */}
        <div id="sectors" className="grid lg:grid-cols-2 gap-5">

          {/* Sectors */}
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Industry Sectors We Serve</h2>
            <p className="text-xs text-slate-500 mb-5">We deliver projects across eight distinct application domains</p>
            <div className="grid grid-cols-2 gap-3">
              {SECTORS.map((sec) => (
                <div
                  key={sec.label}
                  className="flex items-center gap-3 p-3 rounded-xl border hover:shadow-md transition-all"
                  style={{ borderColor: `${sec.color}25`, background: `${sec.color}06` }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${sec.color}15`, border: `1.5px solid ${sec.color}30` }}
                  >
                    <sec.Icon size={16} style={{ color: sec.color }} />
                  </div>
                  <p className="text-[11px] font-bold text-slate-700 leading-snug">{sec.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Technology Stack</h2>
            <p className="text-xs text-slate-500 mb-5">Industry-standard tools across the full processing pipeline</p>
            <div className="space-y-5">
              {Object.entries(TECH).map(([category, items]) => (
                <div key={category}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Why Choose Us ─────────────────────────────────────── */}
        <section id="why-us">
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 mb-1">Why Choose GeoVision Pro</h2>
            <p className="text-sm text-slate-500">What sets our remote sensing consultancy apart</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USPS.map((usp) => (
              <div
                key={usp.title}
                className="rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
                style={{ background: usp.bg, borderColor: usp.border }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${usp.color}15`, border: `1.5px solid ${usp.color}30` }}
                >
                  <usp.Icon size={20} style={{ color: usp.color }} />
                </div>
                <p className="text-sm font-black text-slate-900 mb-2">{usp.title}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Deliverables ──────────────────────────────────────── */}
        <section>
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-6">
              <h2 className="text-base font-black text-slate-900 mb-1">What You Receive</h2>
              <p className="text-xs text-slate-500">Standard deliverables included in every remote sensing project</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Classified Raster Maps", desc: "GeoTIFF files with defined coordinate reference system and legend, ready for import into any GIS software.", color: "#2563eb" },
                { title: "Vector Shapefiles", desc: "Polygon shapefiles (SHP + GeoJSON) for all classified land cover categories, compatible with QGIS and ArcGIS.", color: "#059669" },
                { title: "Accuracy Assessment Report", desc: "Confusion matrix, overall accuracy, Kappa coefficient, and per-class producer & user accuracies in PDF and XLSX.", color: "#7c3aed" },
                { title: "Statistical Summary", desc: "Area statistics per class (hectares & percentages), change matrix for temporal studies, and trend charts in Excel.", color: "#d97706" },
                { title: "Technical Methodology Report", desc: "Full PDF documenting data sources, processing workflow, software parameters, validation approach, and limitations.", color: "#0891b2" },
                { title: "Cartographic Map Layout", desc: "Print-ready PDF map with north arrow, scale bar, legend, projection info, and client logo — A3 or A4 format.", color: "#dc2626" },
              ].map((d) => (
                <div
                  key={d.title}
                  className="flex gap-3 p-4 rounded-xl border"
                  style={{ borderColor: `${d.color}20`, background: `${d.color}06` }}
                >
                  <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: d.color }} />
                  <div>
                    <p className="text-xs font-black text-slate-800 mb-1">{d.title}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing note ──────────────────────────────────────── */}
        <section>
          <div
            className="rounded-2xl border p-8"
            style={{ background: "linear-gradient(135deg,#eff6ff,#f5f3ff)", borderColor: "#bfdbfe" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Project Pricing</p>
                <h2 className="text-lg font-black text-slate-900 mb-2">Flexible, Scope-based Quotes</h2>
                <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
                  Pricing depends on study area size, number of time points, required sensors, classification complexity, and turnaround time.
                  Contact us for a free project scoping call — most standard LULC projects start from <span className="font-bold text-slate-900">₹8,000</span>.
                </p>
                <ul className="flex flex-wrap gap-4 mt-4 text-xs text-slate-600">
                  {["No hidden charges", "Free initial consultation", "Milestone-based payment", "Revision included"].map((p) => (
                    <li key={p} className="flex items-center gap-1.5">
                      <CheckCircle size={13} className="text-blue-500" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <a
                  href="mailto:geovisionpro@email.com"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
                >
                  <Mail size={15} /> Email for Quote
                </a>
                <a
                  href="tel:+91XXXXXXXXXX"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-blue-700 text-sm border border-blue-200 bg-white hover:shadow-md transition-all"
                >
                  <Phone size={15} /> Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Consultation form ─────────────────────────────────── */}
        <ConsultationSection />

      </div>

      {/* ── Simple page footer ────────────────────────────────── */}
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-bold text-slate-800">GeoVision Pro</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a href="mailto:geovisionpro@email.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Mail size={11} /> geovisionpro@email.com
            </a>
            <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Phone size={11} /> +91 XXXX XXX XXX
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <MapPin size={11} /> India
            </a>
          </div>
          <Link href="/" className="text-xs text-blue-600 hover:underline font-semibold">
            ← Back to Home
          </Link>
        </div>
      </footer>

    </div>
  );
}
