const testimonials = [
  {
    initials: "RK",
    name: "Dr. Rahul Kumar",
    role: "Environmental Researcher, IIT Delhi",
    accentColor: "#2563eb",
    accentBg: "#eff6ff",
    quote:
      "The GEE course transformed my research capabilities. I went from basic QGIS to processing terabytes of Landsat data in the cloud within weeks.",
  },
  {
    initials: "SP",
    name: "Shreya Patel",
    role: "Urban Planner, Ahmedabad Municipal Corp",
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    quote:
      "Their LULC consultancy project for our municipal corporation was delivered on time with exceptional accuracy. Highly recommend their services.",
  },
  {
    initials: "AM",
    name: "Arjun Mehta",
    role: "GIS Analyst, ISRO Ahmedabad",
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    quote:
      "The AI + Remote Sensing combination course is exactly what the industry needed. Practical, up-to-date, and incredibly well-structured curriculum.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Quote mark */}
              <div className="text-5xl font-serif leading-none mb-4" style={{ color: t.accentColor, opacity: 0.25 }}>
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: t.accentBg, color: t.accentColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-slate-800 text-sm font-semibold">{t.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
