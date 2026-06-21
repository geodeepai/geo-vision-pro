"use client";

import Link from "next/link";
import { CheckCircle, Mail, Phone, MapPin } from "lucide-react";
import ConsultationSection from "@/components/ConsultationSection";
import SubpageHero from "@/components/SubpageHero";

const COLOR  = "#0891b2";
const BG     = "#ecfeff";
const BORDER = "#a5f3fc";
const CARD   = { background: "rgba(255,255,255,0.96)", borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" } as const;

const OFFERINGS = [
  {
    title: "Deep Learning Classification",
    desc: "Train CNN-based models (U-Net, ResNet, DeepLab) on satellite and UAV imagery for semantic segmentation and scene classification tasks.",
    bullets: ["U-Net Semantic Segmentation", "ResNet / EfficientNet Classification", "Transfer Learning on Custom Datasets", "GPU-Accelerated Training (PyTorch)"],
  },
  {
    title: "Object Detection & Instance Segmentation",
    desc: "Detect and count objects (buildings, vehicles, trees, solar panels) in large-area imagery using YOLO, Faster R-CNN, and Mask R-CNN models.",
    bullets: ["Building & Structure Detection", "Vehicle Counting from Aerial Imagery", "Tree Crown Delineation", "Infrastructure Damage Assessment"],
  },
  {
    title: "Predictive Land Use Modelling",
    desc: "Forecast future land use patterns using CA-Markov chain, FLUS, and ML regression models trained on historical LULC and socioeconomic drivers.",
    bullets: ["CA-Markov & FLUS Models", "Urban Growth Simulation", "Agricultural Land Loss Forecasting", "Scenario-based Projection Maps"],
  },
  {
    title: "Time-Series Analysis (LSTM / GRU)",
    desc: "Analyse multi-temporal satellite data stacks using LSTM and transformer-based models to detect trends, anomalies, and phenological patterns.",
    bullets: ["Vegetation Phenology Monitoring", "Drought & Flood Anomaly Detection", "Crop Yield Estimation", "Temporal Change Forecasting"],
  },
  {
    title: "Big Data Geo-processing on GEE",
    desc: "Process petabytes of satellite imagery on Google Earth Engine using JavaScript and Python APIs for large-area and time-series analysis at scale.",
    bullets: ["Large-area LULC at Scale", "Multi-decadal Climate Analysis", "Automated Change Detection Pipelines", "GEE App Development"],
  },
  {
    title: "Spatial Data Science & Dashboards",
    desc: "Build interactive geospatial dashboards and decision-support tools combining machine learning outputs with real-time sensor or survey data.",
    bullets: ["Python (Streamlit / Dash) GIS Apps", "Automated Monitoring Pipelines", "KPI & Alert Thresholding", "API Integration & Data Ingestion"],
  },
];

const STEPS = [
  { n: "01", title: "Problem Framing & Data Scoping", desc: "Define the AI task (classification/detection/prediction), inventory training data, and select the appropriate model architecture." },
  { n: "02", title: "Data Preparation & Annotation", desc: "Pre-process imagery, create or clean training labels, apply augmentation, and split into train/validation/test sets." },
  { n: "03", title: "Model Training & Optimisation", desc: "Train selected deep learning or ML model, tune hyperparameters, apply regularisation, and monitor convergence metrics." },
  { n: "04", title: "Validation & Accuracy Metrics", desc: "Evaluate on held-out test set. Report IoU, F1, precision/recall, confusion matrix, and RMSE (for regression tasks)." },
  { n: "05", title: "Deployment & Deliverable", desc: "Export model weights, prediction maps, and a technical report. Optionally deploy as a REST API or GEE/Streamlit app." },
];

const TECH = ["Python 3.x", "PyTorch & TensorFlow", "Hugging Face Transformers", "scikit-learn", "Google Earth Engine", "GDAL / Rasterio", "GeoPandas", "QGIS Python Plugin", "Streamlit & Dash", "Docker", "CUDA / GPU Computing", "Weights & Biases"];

const SECTORS = ["Environmental Monitoring", "Precision Agriculture", "Smart City Planning", "Disaster Response & Recovery", "Energy & Solar Analytics", "Defence & Security (Authorised)"];

const DELIVERABLES = [
  { title: "Trained Model Weights", desc: "PyTorch/TF model checkpoints with inference scripts (on request)." },
  { title: "Prediction Maps", desc: "GeoTIFF rasters of model outputs per class or regression value." },
  { title: "Accuracy Assessment", desc: "Confusion matrix, IoU/F1/RMSE PDF + per-class breakdown XLSX." },
  { title: "GEE Script / Notebook", desc: "Annotated Google Earth Engine JS or Python code for reproducible runs." },
  { title: "Technical Report", desc: "Methodology PDF: dataset, architecture, training params, limitations." },
  { title: "Interactive Dashboard", desc: "Streamlit or Dash web app for visual exploration (project-dependent)." },
];

export default function AIGeoPage() {
  return (
    <div className="min-h-screen bg-white">
      <SubpageHero
        crumbs={[{ label: "Services", href: "/#services" }, { label: "AI-Powered Geo-Analytics" }]}
        badge="Machine Learning for Geospatial"
        title="AI-Powered Geo-Analytics"
        highlight="Geo-Analytics"
        desc="Deep learning, machine learning, and big data geoprocessing for automated feature extraction, predictive modelling, time-series analysis, and large-scale satellite data analytics on Google Earth Engine."
        accent={COLOR}
        stats={[{ val: "200+", label: "AI/ML Projects" }, { val: "95%+", label: "Model Accuracy" }, { val: "10 Days", label: "Avg Delivery" }, { val: "6+", label: "Sectors Served" }]}
        ctaLabel="Request a Consultation"
        ctaHref="/consultancy#consultation"
        secondLabel="Explore Services"
        secondHref="#offerings"
      />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Offerings */}
        <section id="offerings">
          <div className="mb-7"><h2 className="text-xl font-black text-slate-900 mb-1">What We Offer</h2><p className="text-sm text-slate-500">AI & ML services across the full geospatial intelligence pipeline</p></div>
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
            <div className="mb-8"><h2 className="text-xl font-black text-slate-900 mb-1">Our Process</h2><p className="text-sm text-slate-500">A structured ML engineering workflow from problem framing to deployment</p></div>
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
            <p className="text-xs text-slate-500 mb-5">State-of-the-art AI/ML and geospatial frameworks</p>
            <div className="flex flex-wrap gap-1.5">
              {TECH.map((t) => (<span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600">{t}</span>))}
            </div>
          </div>
          <div className="rounded-2xl border p-7" style={CARD}>
            <h2 className="text-base font-black text-slate-900 mb-1">Sectors We Serve</h2>
            <p className="text-xs text-slate-500 mb-5">AI geo-analytics applied across critical domains</p>
            <div className="grid grid-cols-2 gap-2.5">
              {SECTORS.map((s) => (<div key={s} className="flex items-center gap-2 p-3 rounded-xl border" style={{ borderColor: `${COLOR}25`, background: `${COLOR}06` }}><span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: COLOR }} /><p className="text-xs font-bold text-slate-700">{s}</p></div>))}
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <section id="deliverables">
          <div className="rounded-2xl border p-8" style={CARD}>
            <div className="mb-6"><h2 className="text-base font-black text-slate-900 mb-1">What You Receive</h2><p className="text-xs text-slate-500">Standard deliverables for every AI geo-analytics engagement</p></div>
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
              <h2 className="text-2xl font-black text-slate-900 mb-3">Ready to Unlock AI-Driven Geospatial Insights?</h2>
              <p className="text-slate-500 text-sm max-w-lg mx-auto mb-7">Tell us your task, data availability, and accuracy targets — we'll engineer a custom AI pipeline that delivers results at scale.</p>
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
