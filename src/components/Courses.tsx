import Link from "next/link";

const courses = [
  {
    id: 1,
    badge: "Bestseller",
    badgeBg: "#fef3c7", badgeBorder: "#fde68a", badgeText: "#92400e",
    accentColor: "#2563eb",
    title: "Google Earth Engine (GEE)",
    level: "Beginner to Advanced",
    duration: "12 Weeks",
    desc: "Master cloud-based geospatial analysis using JavaScript and Python APIs for large-scale satellite data processing.",
    topics: ["JavaScript API", "Python API", "Image Processing", "Time Series", "Classification"],
  },
  {
    badge: "Popular",
    badgeBg: "#d1fae5", badgeBorder: "#a7f3d0", badgeText: "#065f46",
    accentColor: "#059669",
    title: "ArcGIS Pro & ArcMap",
    level: "All Levels",
    duration: "10 Weeks",
    desc: "Comprehensive training in the industry-standard GIS platform for mapping, spatial analysis, and geodatabase management.",
    topics: ["Cartography", "Spatial Analysis", "Geodatabase", "3D Analyst", "Model Builder"],
  },
  {
    badge: null,
    accentColor: "#d97706",
    title: "AutoCAD for Civil & Survey",
    level: "Beginner to Pro",
    duration: "8 Weeks",
    desc: "From basic 2D drafting to advanced 3D modeling, covering Civil 3D applications for surveying and infrastructure design.",
    topics: ["2D Drafting", "3D Modeling", "Civil 3D", "Survey Plans", "Layouts"],
  },
  {
    badge: null,
    accentColor: "#7c3aed",
    title: "STAAD Pro Structural Analysis",
    level: "Intermediate",
    duration: "10 Weeks",
    desc: "Master structural analysis and design using STAAD Pro for steel, concrete, and timber structures with real project scenarios.",
    topics: ["Structural Modeling", "Load Analysis", "Steel Design", "RCC Design", "IS Codes"],
  },
  {
    badge: "🔥 Hot",
    badgeBg: "#fed7aa", badgeBorder: "#fdba74", badgeText: "#7c2d12",
    accentColor: "#0891b2",
    title: "AI & Machine Learning",
    level: "Beginner to Advanced",
    duration: "16 Weeks",
    desc: "Comprehensive AI/ML curriculum covering Python, deep learning, neural networks, and geospatial applications.",
    topics: ["Python & TensorFlow", "Deep Learning", "CNN for Images", "Geo-AI", "LLM APIs"],
  },
  {
    id: 2,
    badge: null,
    accentColor: "#0d9488",
    title: "Remote Sensing Fundamentals",
    level: "Foundation to Expert",
    duration: "14 Weeks",
    desc: "Complete course on electromagnetic spectrum, sensor systems, image interpretation, and practical environmental applications.",
    topics: ["EM Spectrum", "Sensors & Platforms", "Image Interpretation", "NDVI & Indices", "Classification"],
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-14 md:py-24" style={{ background: "var(--section-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "var(--badge-border)", color: "var(--badge-text)" }}
          >
            Learn &amp; Grow
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--heading)" }}>
            Professional <span className="gradient-text">Training Courses</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "var(--body-text)" }}>
            Industry-recognised certification programs taught by domain experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c, i) => (
            <div
              key={i}
              className="relative flex flex-col rounded-2xl border p-6 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: c.accentColor }} />

              {/* Badge */}
              {c.badge && (
                <span
                  className="self-start px-2.5 py-0.5 rounded-full border text-xs font-semibold mb-4"
                  style={{
                    background: (c as { badgeBg?: string }).badgeBg ?? `${c.accentColor}18`,
                    borderColor: (c as { badgeBorder?: string }).badgeBorder ?? `${c.accentColor}40`,
                    color: (c as { badgeText?: string }).badgeText ?? c.accentColor,
                  }}
                >
                  {c.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${c.accentColor}14`, border: `1.5px solid ${c.accentColor}30` }}
              >
                <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                  <circle cx="16" cy="16" r="12" stroke={c.accentColor} strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="16" cy="16" r="6"  stroke={c.accentColor} strokeWidth="1.5" opacity="0.5" />
                  <circle cx="16" cy="16" r="3"  fill={c.accentColor} opacity="0.85" />
                </svg>
              </div>

              {/* Level / Duration */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: "var(--section-alt)", color: "var(--body-text)" }}>{c.level}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: "var(--section-alt)", color: "var(--body-text)" }}>{c.duration}</span>
              </div>

              <h3 className="font-bold text-lg mb-2" style={{ color: "var(--heading)" }}>{c.title}</h3>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--body-text)" }}>{c.desc}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {c.topics.map((t, j) => (
                  <span
                    key={j}
                    className="text-xs px-2.5 py-0.5 rounded-full border"
                    style={{ background: "var(--section-alt)", borderColor: "var(--card-border)", color: "var(--body-text)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-5 text-xs" style={{ color: "var(--muted)" }}>
                <span>💻 Online / Offline</span>
                <span>📜 Certificate</span>
              </div>

              {"id" in c ? (
                <Link
                  href={`/course/${(c as { id: number }).id}`}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-all hover:opacity-90 block"
                  style={{ background: c.accentColor, color: "#fff" }}
                >
                  View Course
                </Link>
              ) : (
                <a
                  href="#contact"
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: c.accentColor, color: "#fff" }}
                >
                  Enroll Now
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
