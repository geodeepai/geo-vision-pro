"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center overflow-hidden"
      style={{
        minHeight: "100svh",
        background: "linear-gradient(170deg, #f4f7fd 0%, #eaf0fa 40%, #dde8f8 100%)",
      }}
    >
      {/* Soft top radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.75) 0%, transparent 60%)",
        }}
      />

      {/* ── Text ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 sm:pt-36 pb-4">
        <FadeUp delay={0}>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.30em] mb-6"
            style={{ color: "#2563eb" }}
          >
            Geospatial Intelligence
          </p>
        </FadeUp>

        <FadeUp delay={0.10}>
          <h1
            className="leading-[1.06] mb-5"
            style={{
              fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              color: "#0d1117",
            }}
          >
            See Earth.<br />Understand Change.
          </h1>
        </FadeUp>

        <FadeUp delay={0.18}>
          <p
            className="text-base sm:text-[17px] leading-relaxed mb-9 max-w-[500px]"
            style={{ color: "#4b5563" }}
          >
            AI-powered GIS, Remote Sensing, and Earth Observation solutions
            <br className="hidden sm:block" />
            for a smarter, sustainable, and resilient future.
          </p>
        </FadeUp>

        <FadeUp delay={0.26}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "#0d1117", boxShadow: "0 4px 20px rgba(0,0,0,0.22)" }}
            >
              Explore Solutions <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{
                border: "1.5px solid rgba(0,0,0,0.16)",
                color: "#0d1117",
                background: "rgba(255,255,255,0.55)",
              }}
            >
              Request Consultation <ArrowRight size={15} />
            </a>
          </div>
        </FadeUp>
      </div>

      {/* ── Globe — centered, large, full sphere ─────────────────── */}
      <motion.div
        className="relative z-10 flex items-center justify-center flex-1 w-full"
        style={{ paddingBottom: "16px" }}
        initial={{ opacity: 0, scale: 0.88, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.15, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Atmosphere glow behind globe */}
        <div
          style={{
            position: "absolute",
            width: "min(620px, 78vw)",
            aspectRatio: "1",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(96,165,250,0.28) 0%, rgba(147,197,253,0.12) 55%, transparent 72%)",
            filter: "blur(36px)",
            pointerEvents: "none",
          }}
        />

        {/* Keyframes for earth rotation */}
        <style>{`
          @keyframes earthSpin {
            from { background-position-x: 0%; }
            to   { background-position-x: 200%; }
          }
        `}</style>

        {/* Globe sphere */}
        <div
          style={{
            width: "min(540px, 70vw)",
            aspectRatio: "1",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            boxShadow:
              "0 0 0 1px rgba(148,187,233,0.25), 0 20px 80px rgba(30,58,138,0.22), 0 60px 120px rgba(0,0,0,0.14)",
          }}
        >
          {/* Rotating earth texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/earth-map.jpg)",
              backgroundSize: "200% 100%",
              backgroundRepeat: "repeat-x",
              backgroundPositionY: "35%",
              animation: "earthSpin 36s linear infinite",
            }}
          />

          {/* Night-side dark fade on the right edge */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 80% 50%, rgba(0,0,0,0.35) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Specular highlight — top-left light source */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 33% 26%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 58%)",
              pointerEvents: "none",
            }}
          />

          {/* Atmosphere rim glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, transparent 58%, rgba(120,180,255,0.28) 73%, rgba(186,220,255,0.52) 86%, rgba(214,233,255,0.80) 95%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>

      {/* Subtle bottom gradient into next section */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: "12%",
          background: "linear-gradient(to top, rgba(221,232,248,0.8) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
