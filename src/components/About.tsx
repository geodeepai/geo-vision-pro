import { CheckCircle2, Award } from "lucide-react";

const features = [
  { title: "Industry-Expert Trainers",         desc: "Learn from professionals with real project experience" },
  { title: "Hands-on Project-Based Learning",  desc: "Work on real datasets and industry case studies" },
  { title: "Lifetime Learning Community",       desc: "Access to alumni network and updated course materials" },
  { title: "Placement Assistance",             desc: "Career guidance and job placement support" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative background blob */}
            <div
              className="absolute -inset-6 rounded-3xl opacity-60"
              style={{ background: "radial-gradient(ellipse at 40% 50%, #eff6ff 0%, transparent 70%)" }}
            />
            <div className="relative bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-100">
              {/* Globe */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-44 h-44 rounded-full relative shadow-2xl"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #1d4ed8, #0c1445)",
                    boxShadow: "0 20px 60px rgba(37,99,235,0.25), inset 0 0 30px rgba(0,0,60,0.4)",
                  }}
                >
                  <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full">
                    <ellipse cx="80" cy="80" rx="76" ry="28" fill="none" stroke="rgba(147,197,253,0.3)" strokeWidth="1.2" />
                    <ellipse cx="80" cy="80" rx="50" ry="28" fill="none" stroke="rgba(147,197,253,0.25)" strokeWidth="1" />
                    <line x1="4" y1="80" x2="156" y2="80" stroke="rgba(147,197,253,0.25)" strokeWidth="1" />
                    <line x1="80" y1="4" x2="80" y2="156" stroke="rgba(147,197,253,0.25)" strokeWidth="1" />
                    <path d="M42 52 L64 48 L76 58 L70 72 L58 76 L42 66 Z" fill="rgba(52,211,153,0.6)" />
                    <path d="M86 44 L108 40 L116 55 L110 67 L95 69 L85 58 Z" fill="rgba(52,211,153,0.5)" />
                    <circle cx="80" cy="80" r="4" fill="#93c5fd" />
                    <circle cx="62" cy="62" r="2.5" fill="#6ee7b7" opacity="0.9" />
                    <circle cx="100" cy="58" r="2.5" fill="#6ee7b7" opacity="0.9" />
                  </svg>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 my-5" />

              {/* Brand statement */}
              <div className="text-center">
                <p className="text-slate-500 text-sm leading-relaxed">
                  Trusted by government agencies, research institutions, and private enterprises across India and globally.
                </p>
              </div>
            </div>

            {/* Award badge */}
            <div className="absolute -top-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-200 shadow-lg shadow-amber-50">
              <Award size={18} className="text-amber-500" />
              <span className="text-sm text-slate-700 font-semibold">Top Rated Consultancy</span>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
              Pioneering{" "}
              <span className="gradient-text">Geospatial Excellence</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              GeoVision Pro is a premier consultancy and training institute specializing in Remote
              Sensing, GIS, and geospatial technologies. With over 15 years of experience, we
              bridge the gap between cutting-edge geospatial science and practical real-world applications.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Our team comprises scientists, engineers, and educators who have contributed to national
              and international projects across urban planning, agriculture, disaster management, and
              infrastructure development.
            </p>

            <ul className="space-y-4 mb-9">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-slate-800 font-semibold text-sm">{f.title}</div>
                    <div className="text-slate-500 text-sm mt-0.5">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
