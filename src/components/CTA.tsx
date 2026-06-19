export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg,#0f2d6e 0%,#1d4ed8 60%,#1e40af 100%)" }}>
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Soft glow orbs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle,#93c5fd 0%,transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle,#c4b5fd 0%,transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ background: "rgba(255,255,255,0.12)", color: "#bfdbfe", border: "1px solid rgba(255,255,255,0.2)" }}>
          Get Started Today
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          Ready to Elevate Your{" "}
          <span style={{ background: "linear-gradient(135deg,#93c5fd,#c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Geospatial Skills?
          </span>
        </h2>
        <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
          Join 1,200+ professionals who have transformed their careers with GeoVision Pro.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: "#ffffff", color: "#1d4ed8", boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
          >
            Start Your Journey
          </a>
          <a
            href="#courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.08)" }}
          >
            Browse Courses
          </a>
        </div>
      </div>
    </section>
  );
}
