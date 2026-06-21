// Shared left decorative panel used on all auth pages

const features = [
  { label: "Google Earth Engine", sub: "Cloud-scale satellite analysis", color: "#2563eb" },
  { label: "LULC & Remote Sensing", sub: "Multi-temporal land cover mapping", color: "#059669" },
  { label: "AI & Machine Learning", sub: "Geo-AI and deep learning workflows", color: "#7c3aed" },
  { label: "ArcGIS · AutoCAD · STAAD Pro", sub: "Industry-standard software training", color: "#d97706" },
];

export default function AuthPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-10 xl:p-14 relative overflow-hidden border-r border-slate-200"
      style={{ background: "linear-gradient(160deg, #f8faff 0%, #eef3ff 50%, #f0fdf8 100%)" }}>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(37,99,235,0.12) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft blue accent orb */}
      <div
        className="absolute top-1/4 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.8,
        }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #d1fae5 0%, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.7,
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
            <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill="white" />
          </svg>
        </div>
        <span className="text-slate-900 font-bold text-lg tracking-tight">
          DeepEarth<span className="text-blue-600">Science</span>
        </span>
      </div>

      {/* Globe + headline */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Globe — light version */}
        <div
          className="w-36 h-36 rounded-full relative flex-shrink-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, #bfdbfe, #eff6ff)",
            boxShadow: "0 8px 40px rgba(37,99,235,0.18), 0 2px 8px rgba(37,99,235,0.08)",
            border: "1.5px solid rgba(37,99,235,0.15)",
          }}
        >
          <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full">
            <ellipse cx="80" cy="80" rx="76" ry="28" fill="none" stroke="rgba(37,99,235,0.2)" strokeWidth="1.2" />
            <ellipse cx="80" cy="80" rx="50" ry="28" fill="none" stroke="rgba(37,99,235,0.14)" strokeWidth="1" />
            <line x1="4" y1="80" x2="156" y2="80" stroke="rgba(37,99,235,0.14)" strokeWidth="1" />
            <line x1="80" y1="4" x2="80" y2="156" stroke="rgba(37,99,235,0.14)" strokeWidth="1" />
            <path d="M42 52 L64 48 L76 58 L70 72 L58 76 L42 66 Z" fill="rgba(5,150,105,0.45)" />
            <path d="M86 44 L108 40 L116 55 L110 67 L95 69 L85 58 Z" fill="rgba(5,150,105,0.32)" />
            <circle cx="80" cy="80" r="4" fill="#2563eb" opacity="0.7" />
            <circle cx="60" cy="60" r="2.5" fill="#059669" opacity="0.8" />
          </svg>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 leading-snug mb-2">
            Transforming Earth Data<br />
            <span style={{
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Into Actionable Insights
            </span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            Access your dashboard to manage consultancy projects,
            track course progress, and connect with experts.
          </p>
        </div>
      </div>

      {/* Feature list */}
      <div className="relative z-10 space-y-3">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/60 border border-white/80 backdrop-blur-sm">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke={f.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-slate-800 text-xs font-semibold">{f.label}</p>
              <p className="text-slate-400 text-xs">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
