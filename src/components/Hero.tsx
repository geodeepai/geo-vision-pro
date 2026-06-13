"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ArrowRight, Map, Brain, LayoutGrid, Droplets, Leaf } from "lucide-react";

const EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Floating card mini-visualizations ─────────────────────────── */

function SatelliteCard() {
  return (
    <>
      <div className="flex gap-0.5 mb-2.5 rounded overflow-hidden">
        {["#ef4444","#f97316","#22c55e","#3b82f6","#8b5cf6","#06b6d4"].map((c) => (
          <div key={c} className="flex-1 h-11" style={{ background: c, opacity: 0.82 }} />
        ))}
      </div>
      <p className="text-[10px] font-bold text-slate-500 mb-1">Sentinel-2 · 10m GSD</p>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-slate-400">13 Spectral Bands</span>
        <span className="text-[9px] font-black text-emerald-600 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />LIVE
        </span>
      </div>
    </>
  );
}

function LulcCard() {
  const grid = ["#16a34a","#16a34a","#ca8a04","#6b7280","#16a34a","#2563eb","#ca8a04","#6b7280","#ca8a04","#16a34a","#6b7280","#16a34a","#2563eb","#6b7280","#16a34a","#ca8a04"];
  return (
    <>
      <div className="grid grid-cols-4 gap-0.5 mb-2.5 rounded overflow-hidden">
        {grid.map((c, i) => <div key={i} className="h-5" style={{ background: c }} />)}
      </div>
      <div className="flex flex-wrap gap-x-2.5 gap-y-1">
        {[{c:"#16a34a",l:"Forest 42%"},{c:"#ca8a04",l:"Agri 28%"},{c:"#6b7280",l:"Urban 18%"},{c:"#2563eb",l:"Water 12%"}].map(({c,l})=>(
          <div key={l} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />
            <span className="text-[9px] text-slate-500">{l}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function GisCard() {
  const layers = [
    {l:"Administrative",w:"88%",c:"#2563eb"},
    {l:"Road Network",w:"74%",c:"#7c3aed"},
    {l:"Land Parcels",w:"61%",c:"#059669"},
    {l:"Water Bodies",w:"43%",c:"#0891b2"},
  ];
  return (
    <>
      <div className="space-y-2 mb-2">
        {layers.map((layer) => (
          <div key={layer.l}>
            <div className="flex justify-between mb-0.5">
              <span className="text-[9px] text-slate-500">{layer.l}</span>
              <span className="text-[9px] font-bold" style={{ color: layer.c }}>{layer.w}</span>
            </div>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: layer.w, background: layer.c }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-slate-400">17 Active Layers</p>
    </>
  );
}

function AiCard() {
  return (
    <>
      <div className="text-center mb-3">
        <p className="text-3xl font-black" style={{ color: "#7c3aed" }}>94.7%</p>
        <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">Classification Accuracy</p>
      </div>
      <div className="space-y-1.5">
        {[{l:"CNN Encoder",v:"96%",c:"#7c3aed"},{l:"SAM Segment",v:"93%",c:"#0891b2"},{l:"Ensemble",v:"94.7%",c:"#059669"}].map((m)=>(
          <div key={m.l} className="flex items-center gap-2">
            <span className="text-[9px] text-slate-400 w-16 flex-shrink-0">{m.l}</span>
            <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: m.v, background: m.c }} />
            </div>
            <span className="text-[9px] font-black w-7 text-right" style={{ color: m.c }}>{m.v}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function EnvCard() {
  return (
    <>
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-3xl font-black text-emerald-600">0.82</p>
          <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wide">NDVI Index</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-emerald-600">+3.2%</p>
          <p className="text-[9px] text-slate-400">vs last season</p>
        </div>
      </div>
      {/* Mini sparkline */}
      <svg viewBox="0 0 100 24" className="w-full mb-2" style={{ height: 28 }}>
        <polyline points="0,18 16,15 32,16 48,10 64,12 80,6 100,8" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="0,18 16,15 32,16 48,10 64,12 80,6 100,8 100,24 0,24" fill="rgba(22,163,74,0.1)" />
      </svg>
      <p className="text-[9px] text-slate-400">Healthy Vegetation Cover</p>
    </>
  );
}

function WaterCard() {
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(14,165,233,0.1)" }}>
          <Droplets size={18} className="text-sky-500" />
        </div>
        <div>
          <p className="text-lg font-black text-sky-600">12,400</p>
          <p className="text-[9px] text-slate-400">km² Watershed</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {[{l:"Surface Flow",v:68,c:"#0891b2"},{l:"Groundwater",v:45,c:"#2563eb"},{l:"Reservoir",v:82,c:"#06b6d4"}].map((w)=>(
          <div key={w.l} className="flex items-center gap-2">
            <span className="text-[9px] text-slate-400 w-16 flex-shrink-0">{w.l}</span>
            <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width:`${w.v}%`, background: w.c }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Capsule with animated spinning border ─────────────────────── */
function InnovationCapsule({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl" style={{ padding: 1.5, overflow: "hidden" }}>
      {/* Rotating conic-gradient creates animated border */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: "-120%",
          background: "conic-gradient(from 0deg, #1a56db, #0891b2, #059669, #7c3aed, #c026d3, #ef4444, #1a56db)",
          animation: "spinSlow 4s linear infinite",
          opacity: 0.7,
        }}
      />
      <div className="relative rounded-2xl bg-white/90 backdrop-blur-sm" style={{ backdropFilter: "blur(16px)" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Floating card shell ───────────────────────────────────────── */
interface FloatProps {
  accent: string;
  Icon: React.ElementType;
  title: string;
  pos: string;
  animDur: string;
  animDelay: string;
  ready: boolean;
  motionDelay: number;
  children: React.ReactNode;
}

function FloatCard({ accent, Icon, title, pos, animDur, animDelay, ready, motionDelay, children }: FloatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: motionDelay, ease: EXPO }}
      className={`absolute ${pos} w-[200px] bg-white rounded-2xl border border-slate-100 overflow-hidden pointer-events-none hidden xl:block`}
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        animation: `floatCard ${animDur} ease-in-out ${animDelay} infinite`,
      }}
    >
      {/* Accent top bar */}
      <div className="h-[3px]" style={{ background: accent }} />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${accent}18` }}>
            <Icon size={13} style={{ color: accent }} />
          </div>
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-wider leading-none">{title}</p>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

/* ── Main Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [ready, setReady] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gsapCtx  = useRef<gsap.Context | null>(null);

  useEffect(() => {
    function startAnimations() {
      setReady(true);
      if (!titleRef.current) return;
      gsapCtx.current = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.05 });
        tl.from(titleRef.current!.querySelectorAll(".word-inner"), {
          yPercent: 112,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
        });
        tl.from(
          titleRef.current!.querySelectorAll(".char-inner"),
          { yPercent: 112, opacity: 0, duration: 0.55, stagger: 0.022, ease: "power3.out" },
          "-=0.4"
        );
      }, titleRef);
    }

    window.addEventListener("intro:done", startAnimations, { once: true });
    return () => {
      window.removeEventListener("intro:done", startAnimations);
      gsapCtx.current?.revert();
    };
  }, []);

  const fm = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: EXPO },
  });

  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden flex items-center pt-16">

      {/* ── Background ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
            backgroundSize: "36px 36px",
            opacity: 0.6,
          }}
        />
        {/* Soft colour orbs */}
        <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.07), transparent 68%)", filter: "blur(64px)" }} />
        <div className="absolute top-1/3 right-1/5 w-[550px] h-[550px] rounded-full" style={{ background: "radial-gradient(circle, rgba(5,150,105,0.06), transparent 68%)", filter: "blur(56px)" }} />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05), transparent 68%)", filter: "blur(56px)" }} />
        {/* Right-edge highlight */}
        <div className="absolute top-0 right-0 w-80 h-full" style={{ background: "linear-gradient(to left, rgba(14,165,233,0.03), transparent)" }} />
      </div>

      {/* ── Floating cards LEFT ───────────────────────────────── */}
      <FloatCard
        accent="#1a56db" Icon={Map} title="Satellite Data"
        pos="left-5 top-[26%]" animDur="5.2s" animDelay="0s"
        ready={ready} motionDelay={0.45}
      >
        <SatelliteCard />
      </FloatCard>

      <FloatCard
        accent="#059669" Icon={LayoutGrid} title="LULC Map"
        pos="left-3 top-[55%]" animDur="4.8s" animDelay="0.8s"
        ready={ready} motionDelay={0.6}
      >
        <LulcCard />
      </FloatCard>

      {/* ── Floating cards RIGHT ──────────────────────────────── */}
      <FloatCard
        accent="#0891b2" Icon={Map} title="GIS Analytics"
        pos="right-5 top-[24%]" animDur="5.8s" animDelay="0.4s"
        ready={ready} motionDelay={0.5}
      >
        <GisCard />
      </FloatCard>

      <FloatCard
        accent="#7c3aed" Icon={Brain} title="AI Processing"
        pos="right-3 top-[53%]" animDur="5s" animDelay="1.2s"
        ready={ready} motionDelay={0.65}
      >
        <AiCard />
      </FloatCard>

      <FloatCard
        accent="#16a34a" Icon={Leaf} title="Environmental"
        pos="left-[6%] bottom-[10%]" animDur="6s" animDelay="0.6s"
        ready={ready} motionDelay={0.75}
      >
        <EnvCard />
      </FloatCard>

      <FloatCard
        accent="#0ea5e9" Icon={Droplets} title="Water Resources"
        pos="right-[6%] bottom-[10%]" animDur="4.6s" animDelay="0.2s"
        ready={ready} motionDelay={0.8}
      >
        <WaterCard />
      </FloatCard>

      {/* ── Main centred content ─────────────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">

        {/* Caption badge */}
        <motion.div {...fm(0)}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" style={{ animation: "pulseDot 2s ease-in-out infinite" }} />
            AI-Powered Geospatial Consultancy
          </div>
        </motion.div>

        {/* ── Animated headline ───────────────────────────────── */}
        <h1
          ref={titleRef}
          className="font-black text-slate-900 leading-[1.06] tracking-tight mb-6"
          style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)" }}
        >
          {/* Line 1: word-mask reveal */}
          <span className="block mb-2">
            {["Transforming", "Earth", "Observation"].map((w, i) => (
              <span key={i} className="word-mask mr-[0.22em] last:mr-0">
                <span className="word-inner">{w}</span>
              </span>
            ))}
          </span>

          {/* Line 2: "into" word-mask + gradient char cascade */}
          <span className="block">
            <span className="word-mask mr-[0.22em]">
              <span className="word-inner">into</span>
            </span>
            <span className="hero-grad">
              {"Intelligent Decisions".split("").map((ch, i) => (
                <span key={i} className="char-mask">
                  <span className="char-inner">{ch === " " ? " " : ch}</span>
                </span>
              ))}
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <motion.p
          {...fm(0.18)}
          className="text-slate-500 text-lg leading-relaxed max-w-2xl mb-10"
        >
          Advanced AI-driven Remote Sensing, GIS, LULC Analytics, and Geospatial Consultancy
          for Sustainable Development and Infrastructure Excellence.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fm(0.32)} className="flex flex-wrap justify-center gap-3 mb-14">
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/15"
          >
            Explore Solutions <ArrowRight size={15} />
          </a>
          <a
            href="/consultancy"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Request Consultation
          </a>
        </motion.div>

        {/* ── Innovation Capsule ──────────────────────────────── */}
        <motion.div {...fm(0.46)} className="w-full max-w-3xl">
          <InnovationCapsule>
            <div className="px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-5">

              {/* Left: brand text */}
              <div className="text-left flex-shrink-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Platform</p>
                <p className="text-[15px] font-black text-slate-900 leading-tight">GeoVisionPro Intelligence Network</p>
              </div>

              {/* Right: feature chips */}
              <div className="flex items-center flex-wrap gap-2.5 justify-center sm:justify-end">
                {[
                  { icon:"🛰️", label:"Satellite Data",    color:"#1a56db" },
                  { icon:"🌍", label:"GIS Analytics",     color:"#059669" },
                  { icon:"🤖", label:"GeoAI",             color:"#7c3aed" },
                  { icon:"📊", label:"Predictive Insights",color:"#0891b2" },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold"
                    style={{ background:`${chip.color}08`, borderColor:`${chip.color}25`, color: chip.color }}
                  >
                    <span className="text-sm">{chip.icon}</span>
                    {chip.label}
                  </div>
                ))}
              </div>

            </div>
          </InnovationCapsule>
        </motion.div>

        {/* Subtle stat strip below capsule */}
        <motion.div {...fm(0.56)} className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { n:"500+", l:"Projects Delivered" },
            { n:"92.4%", l:"AI Accuracy" },
            { n:"15+", l:"Years Experience" },
            { n:"12+", l:"States Covered" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-xl font-black text-slate-900">{s.n}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{s.l}</p>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-slate-300 flex items-start justify-center pt-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" style={{ animation: "scrollDot 1.5s ease-in-out infinite" }} />
        </div>
      </motion.div>

    </section>
  );
}
