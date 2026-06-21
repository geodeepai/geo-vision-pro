"use client";

import { useEffect, useRef, useState } from "react";
import { X, Download, Award } from "lucide-react";

export type CertProps = {
  course: string;
  date: string;
  id: string;
  grade: string;
  duration: string;
  instructor: string;
};

/* ─── canvas PNG generator ───────────────────────────────────── */
function generatePNG(name: string, c: CertProps) {
  const LW = 1400, LH = 990, SCALE = 2;
  const canvas = document.createElement("canvas");
  canvas.width  = LW * SCALE;
  canvas.height = LH * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);

  const cx = LW / 2;
  const GOLD      = "#d4af37";
  const GOLD_FAINT = "rgba(212,175,55,0.28)";

  /* background */
  const bg = ctx.createLinearGradient(0, 0, LW, LH);
  bg.addColorStop(0,   "#030810");
  bg.addColorStop(0.5, "#071428");
  bg.addColorStop(1,   "#030810");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, LW, LH);

  /* center glow */
  const glow = ctx.createRadialGradient(cx, LH/2, 0, cx, LH/2, 580);
  glow.addColorStop(0, "rgba(37,99,235,0.13)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, LW, LH);

  /* subtle grid */
  ctx.strokeStyle = "rgba(148,198,255,0.035)";
  ctx.lineWidth = 0.6;
  for (let y = 0; y < LH; y += 44) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(LW,y); ctx.stroke(); }
  for (let x = 0; x < LW; x += 44) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,LH); ctx.stroke(); }

  /* outer border */
  ctx.strokeStyle = GOLD;
  ctx.lineWidth   = 5;
  ctx.strokeRect(28, 28, LW-56, LH-56);
  /* inner border */
  ctx.strokeStyle = GOLD_FAINT;
  ctx.lineWidth   = 1.5;
  ctx.strokeRect(50, 50, LW-100, LH-100);

  /* corner ornaments */
  [[70,70],[LW-70,70],[70,LH-70],[LW-70,LH-70]].forEach(([ox,oy]) => {
    ctx.beginPath(); ctx.arc(ox, oy, 20, 0, Math.PI*2);
    ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(ox, oy, 7, 0, Math.PI*2);
    ctx.fillStyle = GOLD; ctx.fill();
    [[0,-1],[0,1],[-1,0],[1,0]].forEach(([dx,dy]) => {
      ctx.beginPath(); ctx.moveTo(ox+dx*24, oy+dy*24); ctx.lineTo(ox+dx*38, oy+dy*38);
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2; ctx.stroke();
    });
  });

  /* top flanking lines */
  const topLineY = 92;
  ctx.strokeStyle = GOLD_FAINT; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(105, topLineY); ctx.lineTo(cx-70, topLineY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+70, topLineY); ctx.lineTo(LW-105, topLineY); ctx.stroke();

  /* logo circle */
  const logX = cx, logY = 113, logR = 43;
  const logGrad = ctx.createRadialGradient(logX-10, logY-10, 4, logX, logY, logR);
  logGrad.addColorStop(0, "#3b82f6"); logGrad.addColorStop(1, "#1e3a8a");
  ctx.beginPath(); ctx.arc(logX, logY, logR, 0, Math.PI*2);
  ctx.fillStyle = logGrad; ctx.fill();
  ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.save();
  ctx.beginPath(); ctx.arc(logX, logY, logR-2, 0, Math.PI*2); ctx.clip();
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(logX-logR, logY); ctx.lineTo(logX+logR, logY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(logX, logY-logR); ctx.lineTo(logX, logY+logR); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(logX-logR, logY);
  ctx.quadraticCurveTo(logX-logR/3, logY-logR/2, logX, logY);
  ctx.quadraticCurveTo(logX+logR/3, logY+logR/2, logX+logR, logY); ctx.stroke();
  ctx.restore();
  ctx.beginPath(); ctx.arc(logX, logY, 5, 0, Math.PI*2); ctx.fillStyle = "#fff"; ctx.fill();

  /* "DeepEarthScience" */
  ctx.textAlign = "center"; ctx.font = "bold 22px Arial,sans-serif";
  const gvpText = "DeepEarthScience";
  const gvpW = ctx.measureText("DeepEarth").width + ctx.measureText("science").width;
  ctx.fillStyle = "#93c5fd";
  ctx.textAlign = "left";
  ctx.fillText("DeepEarth", cx - gvpW/2, logY + 67);
  ctx.fillStyle = "#3b82f6";
  ctx.fillText("science", cx - gvpW/2 + ctx.measureText("DeepEarth").width, logY + 67);
  ctx.textAlign = "center";

  /* CERTIFICATE */
  ctx.font = "bold 66px Georgia,'Times New Roman',serif";
  ctx.fillStyle = GOLD;
  ctx.fillText("C E R T I F I C A T E", cx, 264);

  ctx.font = "26px Georgia,serif";
  ctx.fillStyle = "rgba(212,175,55,0.72)";
  ctx.fillText("O F   C O M P L E T I O N", cx, 306);

  /* diamond divider */
  const dHW = 200;
  ctx.strokeStyle = GOLD_FAINT; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx-dHW, 330); ctx.lineTo(cx-14, 330); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx+14, 330); ctx.lineTo(cx+dHW, 330); ctx.stroke();
  ctx.save(); ctx.translate(cx, 330); ctx.rotate(Math.PI/4);
  ctx.fillStyle = GOLD; ctx.fillRect(-6,-6,12,12); ctx.restore();

  /* This is to certify */
  ctx.font = "italic 24px Georgia,serif";
  ctx.fillStyle = "rgba(148,163,184,0.88)";
  ctx.fillText("This is to certify that", cx, 386);

  /* recipient name */
  ctx.font = `bold 78px Georgia,'Times New Roman',serif`;
  const nameGrad = ctx.createLinearGradient(cx-300, 0, cx+300, 0);
  nameGrad.addColorStop(0, "#f0f4ff"); nameGrad.addColorStop(0.5, "#fff"); nameGrad.addColorStop(1, "#f0f4ff");
  ctx.fillStyle = nameGrad;
  ctx.fillText(name, cx, 480);

  /* name underline */
  const nW = Math.min(ctx.measureText(name).width + 60, 520);
  const nlGrad = ctx.createLinearGradient(cx-nW/2, 0, cx+nW/2, 0);
  nlGrad.addColorStop(0, "transparent"); nlGrad.addColorStop(0.15, GOLD);
  nlGrad.addColorStop(0.85, GOLD); nlGrad.addColorStop(1, "transparent");
  ctx.fillStyle = nlGrad; ctx.fillRect(cx-nW/2, 494, nW, 2.5);

  /* "has successfully completed" */
  ctx.font = "22px Georgia,serif";
  ctx.fillStyle = "rgba(148,163,184,0.85)";
  ctx.fillText("has successfully completed the course", cx, 542);

  /* course name */
  ctx.font = "bold 46px Georgia,'Times New Roman',serif";
  ctx.fillStyle = "#60a5fa";
  ctx.fillText(c.course, cx, 614);

  /* meta row */
  ctx.font = "19px Arial,sans-serif";
  ctx.fillStyle = "rgba(100,116,139,0.75)";
  ctx.fillText(`${c.duration}  ·  Foundation to Expert`, cx, 650);

  /* grade badge */
  const bW=256, bH=50, bX=cx-bW/2, bY=674;
  const bGrad = ctx.createLinearGradient(bX, bY, bX+bW, bY+bH);
  bGrad.addColorStop(0,"#a07010"); bGrad.addColorStop(0.5,"#d4af37"); bGrad.addColorStop(1,"#a07010");
  ctx.fillStyle = bGrad;
  ctx.beginPath();
  ctx.moveTo(bX+24,bY); ctx.lineTo(bX+bW-24,bY);
  ctx.quadraticCurveTo(bX+bW,bY,bX+bW,bY+24);
  ctx.lineTo(bX+bW,bY+bH-24); ctx.quadraticCurveTo(bX+bW,bY+bH,bX+bW-24,bY+bH);
  ctx.lineTo(bX+24,bY+bH); ctx.quadraticCurveTo(bX,bY+bH,bX,bY+bH-24);
  ctx.lineTo(bX,bY+24); ctx.quadraticCurveTo(bX,bY,bX+24,bY);
  ctx.closePath(); ctx.fill();
  ctx.font = "bold 19px Arial,sans-serif";
  ctx.fillStyle = "#060d1f";
  ctx.fillText(`★  ${c.grade.toUpperCase()}  ★`, cx, bY+33);

  /* bottom divider */
  const botLineY = 784;
  const blGrad = ctx.createLinearGradient(100, botLineY, LW-100, botLineY);
  blGrad.addColorStop(0,"transparent"); blGrad.addColorStop(0.1,GOLD_FAINT);
  blGrad.addColorStop(0.9,GOLD_FAINT); blGrad.addColorStop(1,"transparent");
  ctx.strokeStyle = blGrad; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(100, botLineY); ctx.lineTo(LW-100, botLineY); ctx.stroke();

  /* left — date */
  ctx.textAlign = "left";
  ctx.font = "bold 13px Arial,sans-serif";
  ctx.fillStyle = "rgba(148,163,184,0.55)";
  ctx.fillText("DATE OF ISSUE", 148, 824);
  ctx.font = "bold 24px Georgia,serif";
  ctx.fillStyle = "#fff";
  ctx.fillText(c.date, 148, 858);
  ctx.strokeStyle = "rgba(212,175,55,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(148, 882); ctx.lineTo(360, 882); ctx.stroke();
  ctx.font = "13px Arial,sans-serif";
  ctx.fillStyle = "rgba(100,116,139,0.65)";
  ctx.fillText("Director, Deep Earth Science", 148, 900);

  /* center — official seal */
  const sX=cx, sY=845, sR=60;
  ctx.beginPath(); ctx.arc(sX, sY, sR, 0, Math.PI*2);
  ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.beginPath(); ctx.arc(sX, sY, sR-10, 0, Math.PI*2);
  ctx.strokeStyle = GOLD_FAINT; ctx.lineWidth = 1; ctx.stroke();
  const sGrad = ctx.createRadialGradient(sX-6, sY-6, 2, sX, sY, 30);
  sGrad.addColorStop(0,"#3b82f6"); sGrad.addColorStop(1,"#1e3a8a");
  ctx.beginPath(); ctx.arc(sX, sY, 30, 0, Math.PI*2); ctx.fillStyle = sGrad; ctx.fill();
  ctx.save();
  ctx.beginPath(); ctx.arc(sX, sY, 30, 0, Math.PI*2); ctx.clip();
  ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(sX-30,sY); ctx.lineTo(sX+30,sY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(sX,sY-30); ctx.lineTo(sX,sY+30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(sX-30,sY);
  ctx.quadraticCurveTo(sX-5,sY-12,sX,sY); ctx.quadraticCurveTo(sX+5,sY+12,sX+30,sY); ctx.stroke();
  ctx.restore();
  ctx.textAlign = "center";
  ctx.font = "bold 10px Arial,sans-serif";
  ctx.fillStyle = GOLD;
  ctx.fillText("OFFICIAL CERTIFICATE", sX, sY+sR+16);

  /* right — cert ID */
  ctx.textAlign = "right";
  ctx.font = "bold 13px Arial,sans-serif";
  ctx.fillStyle = "rgba(148,163,184,0.55)";
  ctx.fillText("CERTIFICATE ID", LW-148, 824);
  ctx.font = "bold 21px Georgia,serif";
  ctx.fillStyle = "#fff";
  ctx.fillText(c.id, LW-148, 858);
  ctx.strokeStyle = "rgba(212,175,55,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(LW-360, 882); ctx.lineTo(LW-148, 882); ctx.stroke();
  ctx.font = "13px Arial,sans-serif";
  ctx.fillStyle = "rgba(100,116,139,0.65)";
  ctx.fillText(c.instructor, LW-148, 900);

  /* fine print */
  ctx.textAlign = "center";
  ctx.font = "12px Arial,sans-serif";
  ctx.fillStyle = "rgba(100,116,139,0.36)";
  ctx.fillText("Deep Earth Science  ·  Remote Sensing & GIS Consultancy  ·  DeepEarthScience.com", cx, 952);

  /* trigger download */
  const a = document.createElement("a");
  a.download = `DeepEarthScience_Certificate_${name.replace(/\s+/g,"_")}.png`;
  a.href = canvas.toDataURL("image/png", 1.0);
  a.click();
}

/* ─── modal component ────────────────────────────────────────── */
export default function CertificateModal({
  cert, name, onClose,
}: { cert: CertProps; name: string; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const CERT_W = 1050, CERT_H = 743;

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      setScale(Math.min(w / CERT_W, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  async function handleDownload() {
    setDownloading(true);
    await new Promise((r) => setTimeout(r, 80));
    generatePNG(name, cert);
    setDownloading(false);
  }

  const GOLD = "#d4af37";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-start overflow-y-auto py-8 px-4"
      style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* action bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <Award size={20} className="text-amber-400" />
          <h2 className="text-white font-bold text-lg">Certificate of Completion</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-70 transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}
          >
            {downloading ? (
              <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Generating…</>
            ) : (
              <><Download size={15} /> Download PNG</>
            )}
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* certificate preview */}
      <div ref={containerRef} className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ height: CERT_H * scale, boxShadow: `0 0 80px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.6)` }}>
        <div
          style={{
            width: CERT_W, height: CERT_H,
            transform: `scale(${scale})`, transformOrigin: "top left",
            background: "linear-gradient(135deg,#030810 0%,#071428 50%,#030810 100%)",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* subtle grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(148,198,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(148,198,255,0.04) 1px,transparent 1px)`,
            backgroundSize: "44px 44px",
          }} />

          {/* center glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }} />

          {/* SVG decorative frame */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${CERT_W} ${CERT_H}`} preserveAspectRatio="none">
            {/* outer border */}
            <rect x="20" y="20" width={CERT_W-40} height={CERT_H-40} fill="none" stroke={GOLD} strokeWidth="3.5" />
            {/* inner border */}
            <rect x="36" y="36" width={CERT_W-72} height={CERT_H-72} fill="none" stroke="rgba(212,175,55,0.28)" strokeWidth="1" />
            {/* top flanking lines */}
            <line x1="78" y1="66" x2={CERT_W/2-52} y2="66" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" />
            <line x1={CERT_W/2+52} y1="66" x2={CERT_W-78} y2="66" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" />
            {/* corner ornaments */}
            {[[52,52],[CERT_W-52,52],[52,CERT_H-52],[CERT_W-52,CERT_H-52]].map(([ox,oy],i) => (
              <g key={i}>
                <circle cx={ox} cy={oy} r="15" fill="none" stroke={GOLD} strokeWidth="1.8" />
                <circle cx={ox} cy={oy} r="5.5" fill={GOLD} />
                <line x1={ox} y1={oy-18} x2={ox} y2={oy-28} stroke={GOLD} strokeWidth="1.8" />
                <line x1={ox} y1={oy+18} x2={ox} y2={oy+28} stroke={GOLD} strokeWidth="1.8" />
                <line x1={ox-18} y1={oy} x2={ox-28} y2={oy} stroke={GOLD} strokeWidth="1.8" />
                <line x1={ox+18} y1={oy} x2={ox+28} y2={oy} stroke={GOLD} strokeWidth="1.8" />
              </g>
            ))}
            {/* diamond divider */}
            <line x1={CERT_W/2-155} y1="248" x2={CERT_W/2-11} y2="248" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" />
            <line x1={CERT_W/2+11} y1="248" x2={CERT_W/2+155} y2="248" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" />
            <rect x={CERT_W/2-5} y="243" width="10" height="10" fill={GOLD} transform={`rotate(45 ${CERT_W/2} 248)`} />
            {/* bottom divider */}
            <line x1="80" y1="584" x2={CERT_W-80} y2="584" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8" />
            {/* seal circles */}
            <circle cx={CERT_W/2} cy="636" r="46" fill="none" stroke={GOLD} strokeWidth="1.8" />
            <circle cx={CERT_W/2} cy="636" r="38" fill="none" stroke="rgba(212,175,55,0.22)" strokeWidth="0.8" />
            {/* signature lines */}
            <line x1="112" y1="676" x2="280" y2="676" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" />
            <line x1={CERT_W-280} y1="676" x2={CERT_W-112} y2="676" stroke="rgba(212,175,55,0.3)" strokeWidth="0.8" />
          </svg>

          {/* ── Logo ── */}
          <div className="absolute flex flex-col items-center" style={{ top: 20, left: "50%", transform: "translateX(-50%)" }}>
            <div className="w-[62px] h-[62px] rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#3b82f6,#1e3a8a)", boxShadow: `0 0 0 2px ${GOLD}` }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.4" />
                <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2.2" fill="white" />
              </svg>
            </div>
            <p className="text-sm font-bold mt-1.5" style={{ letterSpacing: 0.5 }}>
              <span style={{ color: "#93c5fd" }}>DeepEarth</span>
              <span style={{ color: "#3b82f6" }}>Pro</span>
            </p>
          </div>

          {/* ── Main content ── */}
          <div className="absolute inset-0 flex flex-col items-center" style={{ paddingTop: 120 }}>

            {/* CERTIFICATE */}
            <p className="font-black tracking-[0.22em] uppercase"
              style={{ fontSize: 44, color: GOLD, fontFamily: "Georgia,'Times New Roman',serif", lineHeight: 1 }}>
              Certificate
            </p>
            <p style={{ fontSize: 17, color: "rgba(212,175,55,0.7)", letterSpacing: "0.3em", fontFamily: "Georgia,serif", marginTop: 6 }}>
              OF COMPLETION
            </p>

            {/* space for diamond divider (SVG layer) */}
            <div style={{ height: 28 }} />

            <p style={{ fontSize: 15, color: "rgba(148,163,184,0.85)", fontStyle: "italic", fontFamily: "Georgia,serif" }}>
              This is to certify that
            </p>
            <div style={{ height: 14 }} />

            {/* Recipient name */}
            <p style={{ fontSize: 54, fontWeight: 900, color: "#fff", fontFamily: "Georgia,'Times New Roman',serif", lineHeight: 1.1, textShadow: "0 2px 20px rgba(99,102,241,0.3)" }}>
              {name}
            </p>
            {/* name underline */}
            <div style={{ height: 3, width: Math.min(name.length * 28 + 60, 460), background: `linear-gradient(90deg,transparent,${GOLD},transparent)`, marginTop: 6 }} />

            <div style={{ height: 14 }} />
            <p style={{ fontSize: 15, color: "rgba(148,163,184,0.85)", fontFamily: "Georgia,serif" }}>
              has successfully completed the course
            </p>
            <div style={{ height: 16 }} />

            {/* Course name */}
            <p style={{ fontSize: 30, fontWeight: 900, color: "#60a5fa", fontFamily: "Georgia,'Times New Roman',serif", textAlign: "center", maxWidth: 700, lineHeight: 1.2 }}>
              {cert.course}
            </p>
            <p style={{ fontSize: 13, color: "rgba(100,116,139,0.75)", marginTop: 6 }}>
              {cert.duration} &nbsp;·&nbsp; Foundation to Expert
            </p>
            <div style={{ height: 14 }} />

            {/* Grade badge */}
            <div style={{
              padding: "8px 28px", borderRadius: 999,
              background: `linear-gradient(135deg,#a07010,${GOLD},#a07010)`,
              fontSize: 13, fontWeight: 800, color: "#060d1f", letterSpacing: "0.08em",
            }}>
              ★ &nbsp;{cert.grade.toUpperCase()}&nbsp; ★
            </div>
          </div>

          {/* ── Bottom section ── */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between" style={{ padding: "0 90px 42px" }}>
            {/* date */}
            <div>
              <p style={{ fontSize: 10, color: "rgba(148,163,184,0.5)", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase" }}>Date of Issue</p>
              <p style={{ fontSize: 16, color: "#fff", fontFamily: "Georgia,serif", fontWeight: 700, marginTop: 3 }}>{cert.date}</p>
              <div style={{ height: 14 }} />
              <p style={{ fontSize: 11, color: "rgba(100,116,139,0.6)" }}>Director, Deep Earth Science</p>
            </div>

            {/* seal */}
            <div className="flex flex-col items-center" style={{ marginBottom: 2 }}>
              <div className="flex items-center justify-center rounded-full"
                style={{ width: 58, height: 58, background: "linear-gradient(135deg,#3b82f6,#1e3a8a)", border: `2px solid ${GOLD}` }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.3" />
                  <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <p style={{ fontSize: 9, color: GOLD, fontWeight: 700, marginTop: 6, letterSpacing: "0.06em" }}>OFFICIAL CERTIFICATE</p>
            </div>

            {/* cert ID */}
            <div className="text-right">
              <p style={{ fontSize: 10, color: "rgba(148,163,184,0.5)", letterSpacing: "0.1em", fontWeight: 700, textTransform: "uppercase" }}>Certificate ID</p>
              <p style={{ fontSize: 14, color: "#fff", fontFamily: "Georgia,serif", fontWeight: 700, marginTop: 3 }}>{cert.id}</p>
              <div style={{ height: 14 }} />
              <p style={{ fontSize: 11, color: "rgba(100,116,139,0.6)" }}>{cert.instructor}</p>
            </div>
          </div>

          {/* fine print */}
          <div className="absolute bottom-0 left-0 right-0 text-center" style={{ paddingBottom: 10 }}>
            <p style={{ fontSize: 9, color: "rgba(100,116,139,0.3)", letterSpacing: "0.04em" }}>
              Deep Earth Science &nbsp;·&nbsp; Remote Sensing & GIS Consultancy &nbsp;·&nbsp; DeepEarthScience.com
            </p>
          </div>
        </div>
      </div>

      <p className="text-slate-500 text-xs mt-4">Click outside to close &nbsp;·&nbsp; Download PNG for printing or sharing</p>
    </div>
  );
}
