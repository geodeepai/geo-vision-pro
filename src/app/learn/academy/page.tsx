"use client";
import { useState } from "react";
import Link from "next/link";
import { downloadCourseBrochure, downloadCertBrochure } from "@/lib/gvpPDF";
import SubpageHero from "@/components/SubpageHero";

/* ── Types ───────────────────────────────────────────────────────── */
interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  weeks: number;
  hours: number;
  fee: string;
  modules: string[];
  content: string;
  cert: string;
}
interface Cert {
  id: number;
  title: string;
  courses: string;
  duration: string;
  fee: string;
}

/* ── Data ────────────────────────────────────────────────────────── */
const STATS = [
  { n: "50+",     label: "Courses Available"      },
  { n: "10,000+", label: "Students Enrolled"      },
  { n: "25+",     label: "Expert Instructors"     },
  { n: "15+",     label: "Certification Programs" },
  { n: "100%",    label: "Online & Self-paced"    },
];

const CATS = ["All", "GIS", "Remote Sensing", "Drone & UAV", "Software", "Certification"];

const COURSES: Course[] = [
  {
    id: 1, title: "Introduction to GIS", category: "GIS",
    level: "Beginner", weeks: 6, hours: 24, fee: "₹2,999",
    cert: "GVP-CERT-GIS-001",
    modules: [
      "Module 1 – What is GIS?",
      "Module 2 – Coordinate Systems & Projections",
      "Module 3 – GIS Data Types (Vector & Raster)",
      "Module 4 – Spatial Analysis Basics",
      "Module 5 – Map Making & Cartography",
      "Module 6 – Final Project & Assessment",
    ],
    content: "GIS or Geographic Information System is a powerful tool that captures, stores, manipulates, analyzes, manages, and presents spatial or geographic data. This course introduces you to the foundational concepts of GIS, including how geographic data is collected, organized, and used in real-world applications like urban planning, agriculture, disaster management, and environmental monitoring.",
  },
  {
    id: 2, title: "Spatial Data Analysis", category: "GIS",
    level: "Intermediate", weeks: 8, hours: 32, fee: "₹4,499",
    cert: "GVP-CERT-SDA-002",
    modules: [
      "Module 1 – Spatial Data Models",
      "Module 2 – Geostatistics & Interpolation",
      "Module 3 – Network Analysis",
      "Module 4 – Overlay & Buffer Analysis",
      "Module 5 – 3D GIS Analysis",
      "Module 6 – Python for GIS (GeoPandas)",
      "Module 7 – Real-world Case Studies",
      "Module 8 – Capstone Project",
    ],
    content: "Spatial Data Analysis goes beyond basic GIS by teaching you how to extract meaningful patterns and insights from geographic datasets. You will learn advanced spatial statistics, network routing, terrain analysis, and how to automate GIS workflows using Python scripting with GeoPandas and Shapely libraries.",
  },
  {
    id: 3, title: "Land Use & Land Cover Mapping", category: "GIS",
    level: "Intermediate", weeks: 6, hours: 28, fee: "₹3,999",
    cert: "GVP-CERT-LULC-003",
    modules: [
      "Module 1 – LULC Concepts & Classification",
      "Module 2 – Image Preprocessing",
      "Module 3 – Supervised Classification",
      "Module 4 – Unsupervised Classification",
      "Module 5 – Accuracy Assessment",
      "Module 6 – Change Detection Mapping",
    ],
    content: "Land Use and Land Cover mapping is one of the most critical applications of remote sensing. This course teaches you how to classify satellite imagery into land use categories such as agriculture, forest, water bodies, and built-up areas using supervised and unsupervised classification techniques in QGIS and Google Earth Engine.",
  },
  {
    id: 4, title: "Advanced Cartography & Map Design", category: "GIS",
    level: "Advanced", weeks: 5, hours: 20, fee: "₹3,499",
    cert: "GVP-CERT-CART-004",
    modules: [
      "Module 1 – Principles of Cartography",
      "Module 2 – Map Projections & Scale",
      "Module 3 – Thematic Map Design",
      "Module 4 – Atlas & Print Layout",
      "Module 5 – Web Mapping with Leaflet.js",
    ],
    content: "This course transforms GIS analysts into skilled cartographers. Learn the art and science of map design including colour theory, typography, symbology, and layout composition. Master QGIS print layouts, create professional atlas maps, and build interactive web maps using Leaflet.js and Mapbox.",
  },
  {
    id: 5, title: "Remote Sensing Fundamentals", category: "Remote Sensing",
    level: "Beginner", weeks: 6, hours: 24, fee: "₹2,999",
    cert: "GVP-CERT-RS-005",
    modules: [
      "Module 1 – Electromagnetic Spectrum",
      "Module 2 – Satellite Sensor Types",
      "Module 3 – Image Resolution & Bands",
      "Module 4 – Image Interpretation",
      "Module 5 – Satellite Data Sources",
      "Module 6 – Practical Applications",
    ],
    content: "Remote sensing is the science of obtaining information about objects or areas from a distance, typically from aircraft or satellites. This foundational course covers electromagnetic radiation principles, satellite sensor types (optical, SAR, thermal), image resolution concepts, and how to download and interpret satellite data from sources like ISRO Bhuvan, USGS EarthExplorer, and Copernicus.",
  },
  {
    id: 6, title: "Satellite Image Analysis", category: "Remote Sensing",
    level: "Intermediate", weeks: 8, hours: 32, fee: "₹4,999",
    cert: "GVP-CERT-SIA-006",
    modules: [
      "Module 1 – Multispectral Image Analysis",
      "Module 2 – Vegetation Indices (NDVI, EVI)",
      "Module 3 – Water Body Mapping (NDWI)",
      "Module 4 – Urban Index Analysis (NDBI)",
      "Module 5 – SAR Image Analysis",
      "Module 6 – Thermal Band Analysis",
      "Module 7 – Cloud Masking Techniques",
      "Module 8 – Google Earth Engine Scripts",
    ],
    content: "This course dives deep into the analysis of multispectral and SAR satellite imagery. You will learn to compute spectral indices like NDVI for vegetation health, NDWI for water mapping, and NDBI for urban density. You will also learn to write Google Earth Engine JavaScript code to process large satellite datasets in the cloud.",
  },
  {
    id: 7, title: "GIS for Environmental Monitoring", category: "Remote Sensing",
    level: "Intermediate", weeks: 7, hours: 28, fee: "₹3,999",
    cert: "GVP-CERT-ENV-007",
    modules: [
      "Module 1 – Environmental GIS Overview",
      "Module 2 – Forest Cover Mapping",
      "Module 3 – Wetland & Water Body Analysis",
      "Module 4 – Air Quality Spatial Mapping",
      "Module 5 – Climate Change Indicators",
      "Module 6 – Biodiversity Hotspot Mapping",
      "Module 7 – Environmental Impact Reports",
    ],
    content: "GIS is a critical tool for environmental scientists and conservationists. This course teaches you how to use GIS and remote sensing for monitoring deforestation, tracking wetland changes, mapping biodiversity hotspots, and generating environmental impact assessment reports using real satellite data from Indian ecosystems.",
  },
  {
    id: 8, title: "Drone & UAV Mapping Fundamentals", category: "Drone & UAV",
    level: "Beginner", weeks: 5, hours: 20, fee: "₹5,999",
    cert: "GVP-CERT-UAV-008",
    modules: [
      "Module 1 – Introduction to Drones & UAVs",
      "Module 2 – Drone Regulations in India (DGCA)",
      "Module 3 – Flight Planning & Safety",
      "Module 4 – Photogrammetry Basics",
      "Module 5 – Point Cloud & 3D Model Creation",
    ],
    content: "This course covers everything you need to know about using drones for mapping and surveying. Learn DGCA regulations for drone operations in India, flight mission planning, ground control points, photogrammetry processing using Agisoft Metashape and OpenDroneMap, and generating orthophotos, DSMs, and 3D point clouds from drone imagery.",
  },
  {
    id: 9, title: "Advanced Drone Survey Techniques", category: "Drone & UAV",
    level: "Advanced", weeks: 6, hours: 24, fee: "₹7,999",
    cert: "GVP-CERT-ADV-UAV-009",
    modules: [
      "Module 1 – RTK & PPK GPS for Drones",
      "Module 2 – LiDAR Drone Scanning",
      "Module 3 – Multispectral Drone Imaging",
      "Module 4 – Corridor & Terrain Mapping",
      "Module 5 – Large Area Survey Planning",
      "Module 6 – Industry Use Cases",
    ],
    content: "For experienced drone operators looking to advance their skills, this course covers RTK/PPK precision GPS, LiDAR drone scanning for terrain models, multispectral imaging for agriculture, and planning large-scale corridor surveys for infrastructure projects like roads, railways, and pipelines.",
  },
  {
    id: 10, title: "QGIS Complete Masterclass", category: "Software",
    level: "Beginner to Advanced", weeks: 10, hours: 40, fee: "₹5,499",
    cert: "GVP-CERT-QGIS-010",
    modules: [
      "Module 1 – QGIS Interface & Setup",
      "Module 2 – Loading & Managing Data",
      "Module 3 – Digitizing & Editing",
      "Module 4 – Symbology & Labeling",
      "Module 5 – Spatial Analysis Tools",
      "Module 6 – Raster Analysis",
      "Module 7 – QGIS Plugin Ecosystem",
      "Module 8 – Python & PyQGIS Scripting",
      "Module 9 – Print Layout & Atlas",
      "Module 10 – Final Capstone Project",
    ],
    content: "The most comprehensive QGIS course available in India. From installing QGIS to writing custom PyQGIS scripts, this masterclass covers every feature of QGIS 3.x including vector analysis, raster processing, plugin development, and creating professional map layouts. Includes 40+ hands-on exercises using real Indian geospatial datasets.",
  },
  {
    id: 11, title: "Google Earth Engine for GIS", category: "Software",
    level: "Intermediate", weeks: 8, hours: 32, fee: "₹4,999",
    cert: "GVP-CERT-GEE-011",
    modules: [
      "Module 1 – GEE Platform Overview",
      "Module 2 – JavaScript for GEE",
      "Module 3 – Image Collections & Filters",
      "Module 4 – Spectral Index Computation",
      "Module 5 – Time Series Analysis",
      "Module 6 – Machine Learning in GEE",
      "Module 7 – Export & Visualization",
      "Module 8 – Final Project",
    ],
    content: "Google Earth Engine is the world's most powerful cloud-based geospatial platform with access to petabytes of satellite data. This course teaches you to write GEE JavaScript code to process Landsat, Sentinel, and MODIS imagery for applications including LULC mapping, NDVI time series, and supervised machine learning classification.",
  },
];

const CERTS: Cert[] = [
  {
    id: 1, title: "Certified GIS Professional (CGIS)",
    courses: "Introduction to GIS + Spatial Data Analysis + Advanced Cartography & Map Design",
    duration: "6 months", fee: "₹9,999",
  },
  {
    id: 2, title: "Certified Remote Sensing Analyst",
    courses: "Remote Sensing Fundamentals + Satellite Image Analysis + GIS for Environmental Monitoring",
    duration: "6 months", fee: "₹11,999",
  },
  {
    id: 3, title: "Certified Drone Survey Expert",
    courses: "Drone & UAV Mapping Fundamentals + Advanced Drone Survey Techniques",
    duration: "3 months", fee: "₹12,999",
  },
];

/* ── Level colours ───────────────────────────────────────────────── */
const lvlStyle: Record<string, string> = {
  "Beginner":            "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Intermediate":        "bg-blue-50 text-blue-700 border-blue-200",
  "Advanced":            "bg-purple-50 text-purple-700 border-purple-200",
  "Beginner to Advanced":"bg-amber-50 text-amber-700 border-amber-200",
};
const lvlGrad: Record<string, string> = {
  "Beginner":            "from-emerald-50 to-emerald-100",
  "Intermediate":        "from-blue-50 to-blue-100",
  "Advanced":            "from-purple-50 to-purple-100",
  "Beginner to Advanced":"from-amber-50 to-amber-100",
};

/* ══════════════════════════════════════════════════════════════════ */
export default function AcademyPage() {
  const [cat, setCat]     = useState("All");
  const [modal, setModal] = useState<Course | null>(null);

  const filtered = cat === "All" || cat === "Certification"
    ? COURSES
    : COURSES.filter(c => c.category === cat);

  const refStr = (id: number) => `GVP-CRS-2026-${String(id).padStart(3, "0")}`;

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>

      <SubpageHero
        crumbs={[{ label: "Learn", href: "/learn/academy" }, { label: "Academy" }]}
        badge="DeepEarthScience Academy"
        title="Learn GIS & Remote Sensing from Experts"
        highlight="from Experts"
        desc="DeepEarthScience Academy offers professional courses in GIS, Remote Sensing, Satellite Mapping, Drone Survey, and Geospatial Technology — designed for beginners, intermediates, and advanced professionals."
        accent="#1d9e75"
        stats={[{ val: "50+", label: "Courses Available" }, { val: "10,000+", label: "Students Enrolled" }, { val: "25+", label: "Expert Instructors" }, { val: "15+", label: "Certifications" }]}
        ctaLabel="Browse Courses"
        ctaHref="#courses"
        secondLabel="View Certifications"
        secondHref="#certs"
      />

      {/* ── Filter tabs ── */}
      <section className="px-4 py-6 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={{
                background:   cat === c ? "#1d9e75" : "rgba(0,0,0,0.03)",
                borderColor:  cat === c ? "#1d9e75" : "rgba(0,0,0,0.1)",
                color:        cat === c ? "#fff"    : "#64748b",
              }}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ── Course grid ── */}
      <section className="px-4 pb-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(course => (
            <div key={course.id}
              style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
              className="flex flex-col overflow-hidden hover:shadow-lg hover:border-[#1d9e75]/40 transition-all duration-200">
              {/* Card header strip */}
              <div className={`bg-gradient-to-r ${lvlGrad[course.level] ?? "from-slate-50 to-slate-100"} px-4 pt-4 pb-3 border-b border-black/[0.06]`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {refStr(course.id)}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lvlStyle[course.level] ?? ""}`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="text-slate-900 font-black text-[15px] leading-snug">{course.title}</h3>
                <p className="text-slate-500 text-xs mt-1">{course.weeks} Weeks · {course.hours} Hours · {course.category}</p>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col gap-3">
                <p className="text-xs leading-relaxed text-slate-500">
                  {course.content.substring(0, 130)}…
                </p>

                {/* Modules preview */}
                <div className="space-y-1">
                  {course.modules.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <span style={{ color: "#1d9e75", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="truncate">{m.replace(/^Module \d+\s*[–\-]\s*/, "")}</span>
                    </div>
                  ))}
                  {course.modules.length > 3 && (
                    <p className="text-[11px]" style={{ color: "#1d9e75" }}>
                      +{course.modules.length - 3} more modules
                    </p>
                  )}
                </div>

                {/* Fee */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/[0.06]">
                  <span className="text-slate-900 font-black text-lg">{course.fee}</span>
                  <span className="text-xs text-slate-400">Online · Self-paced</span>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button onClick={() => setModal(course)}
                    className="col-span-1 py-2 rounded-lg text-xs font-bold transition-all"
                    style={{ background: "rgba(29,158,117,0.08)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.2)" }}>
                    Details
                  </button>
                  <Link href={`/enroll/${course.id}`}
                    className="col-span-1 py-2 rounded-lg text-xs font-bold text-white transition-all text-center block"
                    style={{ background: "#1d9e75" }}>
                    Enroll
                  </Link>
                  <button
                    onClick={() => downloadCourseBrochure(
                      course.title, course.level, `${course.weeks} Weeks | ${course.hours} Hours`,
                      course.fee, course.modules, course.content, course.cert, course.id
                    )}
                    className="col-span-1 py-2 rounded-lg text-xs font-bold transition-all text-slate-600"
                    style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}>
                    PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      {(cat === "All" || cat === "Certification") && (
        <section className="px-4 pb-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6" id="certs">
            <div className="h-px flex-1" style={{ background: "rgba(29,158,117,0.2)" }} />
            <h2 className="text-slate-900 font-black text-xl px-2">Certification Programs</h2>
            <div className="h-px flex-1" style={{ background: "rgba(29,158,117,0.2)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CERTS.map(c => (
              <div key={c.id}
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                className="p-5 flex flex-col gap-3 hover:shadow-lg hover:border-[#1d9e75]/40 transition-all">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#1d9e75" }}>
                    GVP-CERT-2026-{String(c.id).padStart(3, "0")}
                  </span>
                  <h3 className="text-slate-900 font-black text-[15px] leading-snug mt-1">{c.title}</h3>
                </div>
                <div style={{ borderLeft: "2px solid #1d9e75" }} className="pl-3 space-y-0.5">
                  {c.courses.split("+").map((course, i) => (
                    <p key={i} className="text-xs text-slate-500">{course.trim()}</p>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>⏱ {c.duration}</span>
                  <span className="font-black text-slate-900 text-base">{c.fee}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <Link href="/learn/academy#courses"
                    className="py-2 rounded-lg text-xs font-bold text-white text-center block"
                    style={{ background: "#1d9e75" }}>
                    Enroll Now
                  </Link>
                  <button
                    onClick={() => downloadCertBrochure(c.title, c.courses, c.duration, c.fee, c.id)}
                    className="py-2 rounded-lg text-xs font-bold transition-all text-slate-600"
                    style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}>
                    Brochure PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Course detail modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: "#0f2035", border: "1px solid rgba(29,158,117,0.3)" }}>
            {/* Modal header */}
            <div className="sticky top-0 z-10 px-6 py-4 flex items-start justify-between"
              style={{ background: "#0f2035", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div>
                <span className="text-xs font-bold" style={{ color: "#1d9e75" }}>{refStr(modal.id)}</span>
                <h2 className="text-white font-black text-xl leading-snug">{modal.title}</h2>
                <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: "#8aa3be" }}>
                  <span>{modal.level}</span>
                  <span>·</span>
                  <span>{modal.weeks} Weeks · {modal.hours} Hours</span>
                  <span>·</span>
                  <span className="font-bold text-white">{modal.fee}</span>
                </div>
              </div>
              <button onClick={() => setModal(null)}
                className="ml-4 text-2xl leading-none font-light transition-colors hover:text-white"
                style={{ color: "#8aa3be" }}>×</button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5">
              {/* About */}
              <div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1d9e75" }}>About the Course</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#b0c4d8" }}>{modal.content}</p>
              </div>

              {/* Modules */}
              <div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1d9e75" }}>Course Modules</h3>
                <div className="space-y-1.5">
                  {modal.modules.map((m, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
                      style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)" }}>
                      <span className="font-black text-xs w-5 flex-shrink-0" style={{ color: "#1d9e75" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ color: "#b0c4d8" }}>{m.replace(/^Module \d+\s*[–\-]\s*/, "")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate */}
              <div className="rounded-xl p-4"
                style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.2)" }}>
                <p className="text-sm font-bold text-white mb-1">Certificate of Completion</p>
                <p className="text-xs" style={{ color: "#8aa3be" }}>Code: {modal.cert}</p>
                <p className="text-xs mt-1" style={{ color: "#8aa3be" }}>
                  Digital + Physical certificate issued on successful completion of all modules and assessments.
                </p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="sticky bottom-0 px-6 py-4 flex gap-3"
              style={{ background: "#0f2035", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <Link href={`/enroll/${modal.id}`}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white text-center block"
                style={{ background: "#1d9e75" }}>
                Enroll Now
              </Link>
              <button
                onClick={() => downloadCourseBrochure(
                  modal.title, modal.level, `${modal.weeks} Weeks | ${modal.hours} Hours`,
                  modal.fee, modal.modules, modal.content, modal.cert, modal.id
                )}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ background: "rgba(255,255,255,0.06)", color: "#b0c4d8", border: "1px solid rgba(255,255,255,0.1)" }}>
                Download Brochure PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
