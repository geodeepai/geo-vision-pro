// Shared left decorative panel used on all auth pages

const features = [
  { label: "Google Earth Engine", sub: "Cloud-scale satellite analysis" },
  { label: "LULC & Remote Sensing", sub: "Multi-temporal land cover mapping" },
  { label: "AI & Machine Learning", sub: "Geo-AI and deep learning workflows" },
  { label: "ArcGIS · AutoCAD · STAAD Pro", sub: "Industry-standard software training" },
];

export default function AuthPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full bg-[#060d1f] p-10 xl:p-14 relative overflow-hidden">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.055] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(148,198,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,198,255,1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Blue glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.15,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          filter: "blur(55px)",
          opacity: 0.12,
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
            <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2" fill="white" />
          </svg>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          DeepEarth<span className="text-blue-400">Science</span>
        </span>
      </div>

      {/* Globe + headline */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Mini globe */}
        <div
          className="w-36 h-36 rounded-full relative flex-shrink-0"
          style={{
            background: "radial-gradient(circle at 35% 35%, #1d4ed8, #0c1445)",
            boxShadow: "0 0 60px rgba(37,99,235,0.3), inset 0 0 30px rgba(0,0,40,0.5)",
          }}
        >
          <svg viewBox="0 0 160 160" className="absolute inset-0 w-full h-full">
            <ellipse cx="80" cy="80" rx="76" ry="28" fill="none" stroke="rgba(147,197,253,0.25)" strokeWidth="1.2" />
            <ellipse cx="80" cy="80" rx="50" ry="28" fill="none" stroke="rgba(147,197,253,0.18)" strokeWidth="1" />
            <line x1="4" y1="80" x2="156" y2="80" stroke="rgba(147,197,253,0.18)" strokeWidth="1" />
            <line x1="80" y1="4" x2="80" y2="156" stroke="rgba(147,197,253,0.18)" strokeWidth="1" />
            <path d="M42 52 L64 48 L76 58 L70 72 L58 76 L42 66 Z" fill="rgba(52,211,153,0.55)" />
            <path d="M86 44 L108 40 L116 55 L110 67 L95 69 L85 58 Z" fill="rgba(52,211,153,0.4)" />
            <circle cx="80" cy="80" r="4" fill="#93c5fd" />
            <circle cx="60" cy="60" r="2.5" fill="#6ee7b7" opacity="0.9" />
          </svg>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white leading-snug mb-2">
            Transforming Earth Data<br />
            <span style={{
              background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Into Actionable Insights
            </span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
            Access your dashboard to manage consultancy projects,
            track course progress, and connect with experts.
          </p>
        </div>
      </div>

      {/* Feature list */}
      <div className="relative z-10 space-y-3">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-white text-xs font-medium">{f.label}</p>
              <p className="text-slate-500 text-xs">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
