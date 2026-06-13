import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    href: "/consultancy",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="20" stroke="url(#s1)" strokeWidth="2" />
        <path d="M8 24 Q16 12 24 24 Q32 36 40 24" stroke="url(#s1)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="url(#s1)" />
        <defs>
          <linearGradient id="s1" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Remote Sensing Consultancy",
    desc: "Advanced satellite and aerial image analysis for environmental monitoring, land cover mapping, and resource management using cutting-edge methodologies.",
    bullets: ["Satellite Image Processing", "Spectral Analysis & Classification", "Change Detection Studies", "Environmental Impact Assessment"],
    featured: true,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="6" width="36" height="36" rx="4" stroke="url(#s2)" strokeWidth="2" />
        <path d="M6 18 L42 18 M6 30 L42 30 M18 6 L18 42 M30 6 L30 42" stroke="url(#s2)" strokeWidth="1.5" />
        <rect x="18" y="18" width="12" height="12" fill="url(#s2)" opacity="0.4" />
        <defs>
          <linearGradient id="s2" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "LULC Analysis & Mapping",
    desc: "Comprehensive Land Use Land Cover mapping and multi-temporal analysis for urban planning, agriculture monitoring, and forest management.",
    bullets: ["Multi-temporal LULC Mapping", "Urban Sprawl Analysis", "Agricultural Monitoring", "Forest Cover Assessment"],
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 6 L40 14 L40 34 L24 42 L8 34 L8 14 Z" stroke="url(#s3)" strokeWidth="2" />
        <path d="M24 6 L24 42 M8 14 L40 34 M40 14 L8 34" stroke="url(#s3)" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="5" fill="url(#s3)" />
        <defs>
          <linearGradient id="s3" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "GIS & Spatial Analysis",
    desc: "Comprehensive geospatial data analysis, spatial modeling, and cartographic outputs for informed decision-making across sectors.",
    bullets: ["Spatial Data Management", "Geostatistical Analysis", "3D Terrain Modeling", "Custom Map Production"],
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 8 L38 18 L38 36 L24 40 L10 36 L10 18 Z" stroke="url(#s4)" strokeWidth="2" />
        <path d="M18 28 L22 24 L26 28 L30 20" stroke="url(#s4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="16" r="3" fill="url(#s4)" opacity="0.6" />
        <defs>
          <linearGradient id="s4" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#f97316" />
            <stop offset="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Drone & UAV Mapping",
    desc: "High-resolution UAV survey services for precise topographic mapping, volumetric analysis, and site inspection.",
    bullets: ["Aerial Photogrammetry", "Orthomosaic Generation", "Digital Elevation Models", "Volume Calculations"],
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="12" width="32" height="24" rx="3" stroke="url(#s5)" strokeWidth="2" />
        <path d="M8 18 L40 18" stroke="url(#s5)" strokeWidth="1.5" />
        <circle cx="12" cy="15" r="1.5" fill="url(#s5)" />
        <circle cx="17" cy="15" r="1.5" fill="url(#s5)" />
        <path d="M14 28 L18 25 L22 28 L28 22 L34 27" stroke="url(#s5)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <defs>
          <linearGradient id="s5" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#06b6d4" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "AI-Powered Geo-Analytics",
    desc: "Leveraging machine learning and deep learning for automated feature extraction, predictive modeling, and large-scale geospatial analysis.",
    bullets: ["Deep Learning Classification", "Predictive Land Use Modeling", "Automated Feature Extraction", "Big Data Geo-processing"],
    featured: false,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M12 36 L12 20 L24 12 L36 20 L36 36 Z" stroke="url(#s6)" strokeWidth="2" />
        <path d="M18 36 L18 26 L24 22 L30 26 L30 36" stroke="url(#s6)" strokeWidth="1.5" />
        <path d="M6 42 L42 42" stroke="url(#s6)" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="s6" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Structural & Civil Consulting",
    desc: "Expert structural analysis and design consulting for civil engineering projects integrating modern software tools with geospatial data.",
    bullets: ["Structural Design Reviews", "Site Feasibility Studies", "Infrastructure Planning", "STAAD Pro Analysis"],
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-14 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our <span className="gradient-text">Consultancy Services</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            End-to-end geospatial solutions from data acquisition to actionable insights
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={i}
              className={`relative group rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                s.featured
                  ? "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md shadow-blue-100"
                  : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-slate-100"
              }`}
            >
              {s.featured && (
                <div className="absolute top-5 right-5 px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold">
                  Featured
                </div>
              )}
              {/* Top accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

              <div className="mb-5">{s.icon}</div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1.5 mb-6">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              {"href" in s ? (
                <Link
                  href={(s as { href: string }).href}
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors group/link"
                >
                  Learn More
                  <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors group/link"
                >
                  Inquire Now
                  <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
