export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#060d1f]">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />
      {/* Color orbs */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute right-1/4 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="inline-block px-3.5 py-1.5 rounded-full border border-blue-400/25 bg-blue-400/10 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-6">
          Get Started Today
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Ready to Elevate Your{" "}
          <span style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Geospatial Skills?
          </span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Join 1200+ professionals who have transformed their careers with GeoVision Pro
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all shadow-xl shadow-blue-500/30 hover:-translate-y-0.5"
          >
            Start Your Journey
          </a>
          <a
            href="#courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Browse Courses
          </a>
        </div>
      </div>
    </section>
  );
}
