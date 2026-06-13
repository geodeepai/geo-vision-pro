"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function VisitorCount() {
  const [count,    setCount]    = useState<number | null>(null);
  const [display,  setDisplay]  = useState(0);
  const [live,     setLive]     = useState(false);

  /* Fetch once per session — avoids inflating the counter on re-renders */
  useEffect(() => {
    const cached = sessionStorage.getItem("gvp_visitor_count");
    if (cached) {
      const n = parseInt(cached, 10);
      setCount(n);
      setLive(sessionStorage.getItem("gvp_visitor_live") === "true");
      return;
    }

    fetch("/api/visitors")
      .then((r) => r.json())
      .then((d: { count: number; live: boolean }) => {
        setCount(d.count);
        setLive(d.live);
        sessionStorage.setItem("gvp_visitor_count", String(d.count));
        sessionStorage.setItem("gvp_visitor_live",  String(d.live));
      })
      .catch(() => {
        const days = Math.floor((Date.now() - new Date("2024-06-01").getTime()) / 86_400_000);
        setCount(12_850 + days * 78);
      });
  }, []);

  /* Animate the number rolling up from 0 to count */
  useEffect(() => {
    if (count === null) return;
    const start   = Date.now();
    const duration = 1600;
    const from    = Math.max(0, count - 300);

    const raf = requestAnimationFrame(function tick() {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (count - from) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(raf);
  }, [count]);

  if (count === null) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 animate-pulse">
        <div className="w-3 h-3 rounded-full bg-slate-700" />
        <div className="w-24 h-3 rounded bg-slate-700" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/60">
      {/* Live pulse dot */}
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      <Users size={12} className="text-slate-400 flex-shrink-0" />

      <span className="text-xs font-semibold tabular-nums text-slate-300">
        {display.toLocaleString("en-IN")}
      </span>

      <span className="text-xs text-slate-500">visitors</span>

      {live && (
        <span className="ml-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-500">
          live
        </span>
      )}
    </div>
  );
}
