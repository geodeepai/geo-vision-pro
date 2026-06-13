"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut, Bell, BookOpen, Clock, Award, TrendingUp, Play,
  CheckCircle, Star, ChevronRight, Download, Lock, ShoppingCart,
  Zap, Target, Edit3, Mail, Phone, MapPin, Calendar, X,
  Users, BarChart2, GraduationCap,
} from "lucide-react";
import CertificateModal from "@/components/CertificateModal";

/* ─── course catalogue (mirrors the website) ─────────────────── */
const ALL_COURSES = [
  {
    id: 1, tag: "GEE", color: "#2563eb",
    badge: "Bestseller", badgeStyle: { background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" },
    title: "Google Earth Engine (GEE)",
    desc: "Master cloud-based geospatial analysis using JavaScript and Python APIs for large-scale satellite data processing.",
    level: "Beginner to Advanced", duration: "12 Weeks", price: "₹499", priceNum: 499,
    rating: 4.9, students: 540, lessons: 24,
    topics: ["JavaScript API", "Python API", "Image Processing", "Time Series", "Classification", "Export & Automation"],
  },
  {
    id: 2, tag: "GIS", color: "#059669",
    badge: "Popular", badgeStyle: { background: "#d1fae5", color: "#065f46", border: "1px solid #a7f3d0" },
    title: "ArcGIS Pro & ArcMap",
    desc: "Comprehensive training in the industry-standard GIS platform for mapping, spatial analysis, and geodatabase management.",
    level: "All Levels", duration: "10 Weeks", price: "₹449", priceNum: 449,
    rating: 4.8, students: 320, lessons: 18,
    topics: ["Cartography", "Spatial Analysis", "Geodatabase", "3D Analyst", "Model Builder", "Layout & Print"],
  },
  {
    id: 3, tag: "CAD", color: "#d97706",
    badge: null, badgeStyle: null,
    title: "AutoCAD for Civil & Survey",
    desc: "From basic 2D drafting to advanced 3D modeling, covering Civil 3D applications for surveying and infrastructure design.",
    level: "Beginner to Pro", duration: "8 Weeks", price: "₹349", priceNum: 349,
    rating: 4.7, students: 215, lessons: 16,
    topics: ["2D Drafting", "3D Modeling", "Civil 3D", "Survey Plans", "Layouts", "Annotation"],
  },
  {
    id: 4, tag: "STAAD", color: "#7c3aed",
    badge: null, badgeStyle: null,
    title: "STAAD Pro Structural Analysis",
    desc: "Master structural analysis and design using STAAD Pro for steel, concrete, and timber structures with real project scenarios.",
    level: "Intermediate", duration: "10 Weeks", price: "₹399", priceNum: 399,
    rating: 4.6, students: 180, lessons: 20,
    topics: ["Structural Modeling", "Load Analysis", "Steel Design", "RCC Design", "IS Codes", "Result Interpretation"],
  },
  {
    id: 5, tag: "AI/ML", color: "#0891b2",
    badge: "🔥 Hot", badgeStyle: { background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" },
    title: "AI & Machine Learning",
    desc: "Comprehensive AI/ML curriculum covering Python, deep learning, neural networks, and geospatial applications.",
    level: "Beginner to Advanced", duration: "16 Weeks", price: "₹499", priceNum: 499,
    rating: 4.9, students: 450, lessons: 30,
    topics: ["Python & TensorFlow", "Deep Learning", "CNN for Images", "Geo-AI", "LLM APIs", "Model Deployment"],
  },
  {
    id: 6, tag: "RS", color: "#0d9488",
    badge: null, badgeStyle: null,
    title: "Remote Sensing Fundamentals",
    desc: "Complete course on electromagnetic spectrum, sensor systems, image interpretation, and practical environmental applications.",
    level: "Foundation to Expert", duration: "14 Weeks", price: "₹299", priceNum: 299,
    rating: 4.8, students: 560, lessons: 22,
    topics: ["EM Spectrum", "Sensors & Platforms", "Image Interpretation", "NDVI & Indices", "Classification", "Field Validation"],
  },
];

const DEFAULT_PROGRESS: Record<number, { progress: number; completed: number; nextLesson: string; enrolledDate: string }> = {
  1: { progress: 100, completed: 24, nextLesson: "Course Completed ✓",        enrolledDate: "Feb 2025" },
  2: { progress: 45,  completed: 8,  nextLesson: "Supervised Classification",  enrolledDate: "Mar 2025" },
  6: { progress: 100, completed: 22, nextLesson: "Course Completed ✓",        enrolledDate: "Jan 2025" },
};

const MOCK_USER = {
  name: "XYZ",
  email: "",
  phone: "+91 98765 43210",
  location: "New Delhi, India",
  interest: "Google Earth Engine (GEE)",
  memberSince: "January 2025",
  streak: 7,
  plan: "Pro",
};

const CERTIFICATES: Record<number, { date: string; id: string; grade: string; instructor: string }> = {
  1: { date: "June 2025",  id: "GVP-GEE-2025-002", grade: "Distinction", instructor: "Dr. Arjun Mehta" },
  6: { date: "April 2025", id: "GVP-RS-2025-001",  grade: "Distinction", instructor: "Dr. Priya Sharma" },
};

/* ─── helpers ────────────────────────────────────────────────── */
function Avatar({ name, size = 72 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="rounded-full flex items-center justify-center font-black text-white select-none flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.32,
        background: "linear-gradient(135deg,#3b82f6,#6366f1,#8b5cf6)",
        boxShadow: "0 0 0 3px #fff,0 0 0 5px #6366f1,0 8px 24px rgba(99,102,241,0.4)" }}>
      {initials}
    </div>
  );
}

function Ring({ pct, color, size = 56 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={pct===100?"#16a34a":color} strokeWidth="5"
        strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="53%" textAnchor="middle" dominantBaseline="middle"
        style={{ fontSize: size*0.22, fontWeight: 800, fill: pct===100?"#16a34a":color }}>
        {pct===100 ? "✓" : `${pct}%`}
      </text>
    </svg>
  );
}

const CARD = { background:"rgba(255,255,255,0.93)", borderColor:"rgba(0,0,0,0.06)", boxShadow:"0 2px 20px rgba(0,0,0,0.05)" } as const;
const tabs = ["dashboard","my courses","explore","certificates"] as const;

/* ─── page ───────────────────────────────────────────────────── */
export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser]               = useState(MOCK_USER);
  const [activeTab, setActiveTab]     = useState<typeof tabs[number]>("dashboard");
  const [enrolledIds, setEnrolledIds] = useState<number[]>([1, 2, 6]);
  const [enrollModal, setEnrollModal] = useState<typeof ALL_COURSES[0] | null>(null);
  const [toast, setToast]             = useState<string | null>(null);
  const [confirming, setConfirming]   = useState(false);
  const [certModal, setCertModal]     = useState<null | { courseId: number }>(null);

  /* load persisted state */
  useEffect(() => {
    const ids = localStorage.getItem("gvp_enrolled_ids");
    if (ids) setEnrolledIds(JSON.parse(ids));
    const email = sessionStorage.getItem("gvp_user_email");
    if (email) setUser((u) => ({ ...u, email }));
  }, []);

  /* enroll action */
  async function handleEnroll(courseId: number) {
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 900));
    const next = [...new Set([...enrolledIds, courseId])];
    setEnrolledIds(next);
    localStorage.setItem("gvp_enrolled_ids", JSON.stringify(next));
    setConfirming(false);
    setEnrollModal(null);
    const name = ALL_COURSES.find((c) => c.id === courseId)?.title ?? "";
    setToast(name);
    setTimeout(() => setToast(null), 4000);
    setActiveTab("my courses");
  }

  function handleLogout() {
    sessionStorage.removeItem("gvp_user_email");
    router.push("/login");
  }

  /* derived */
  const enrolledCourses = ALL_COURSES.filter((c) => enrolledIds.includes(c.id)).map((c) => {
    const d = DEFAULT_PROGRESS[c.id];
    return d ? { ...c, ...d }
      : { ...c, progress: 0, completed: 0,
          nextLesson: "Introduction & Overview",
          enrolledDate: new Date().toLocaleDateString("en-US",{month:"short",year:"numeric"}) };
  });
  const notEnrolled  = ALL_COURSES.filter((c) => !enrolledIds.includes(c.id));
  const avgPct       = enrolledCourses.length ? Math.round(enrolledCourses.reduce((a,c)=>a+c.progress,0)/enrolledCourses.length) : 0;
  const certCourses  = enrolledCourses.filter((c) => CERTIFICATES[c.id]);
  const hour         = new Date().getHours();
  const greeting     = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen" style={{ background:"#f0f4f8" }}>

      {/* ── Success toast ─────────────────────────────────── */}
      {toast && (
        <div className="fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold animate-bounce-in"
          style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 8px 32px rgba(16,185,129,0.45)" }}>
          <CheckCircle size={18} />
          <span>Enrolled in <span className="font-black">"{toast}"</span> successfully!</span>
        </div>
      )}

      {/* ── Certificate modal ────────────────────────────── */}
      {certModal && (() => {
        const course = ALL_COURSES.find((c) => c.id === certModal.courseId)!;
        const cert   = CERTIFICATES[certModal.courseId]!;
        return (
          <CertificateModal
            name={user.name}
            cert={{
              course:     course.title,
              date:       cert.date,
              id:         cert.id,
              grade:      cert.grade,
              duration:   course.duration,
              instructor: cert.instructor,
            }}
            onClose={() => setCertModal(null)}
          />
        );
      })()}

      {/* ── Enroll modal ──────────────────────────────────── */}
      {enrollModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ background:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setEnrollModal(null); }}>
          <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ background:"#fff" }}>
            {/* Color header */}
            <div className="h-2" style={{ background:`linear-gradient(90deg,${enrollModal.color},${enrollModal.color}66)` }} />
            <div className="p-7">
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background:`${enrollModal.color}18`, color:enrollModal.color }}>{enrollModal.tag}</span>
                  {enrollModal.badge && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={enrollModal.badgeStyle ?? {}}>{enrollModal.badge}</span>}
                </div>
                <button onClick={() => setEnrollModal(null)} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all flex-shrink-0">
                  <X size={18} />
                </button>
              </div>

              <h2 className="text-xl font-black text-slate-900 mb-1">{enrollModal.title}</h2>

              {/* Meta */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {enrollModal.rating} rating</span>
                <span className="flex items-center gap-1"><Users size={11} /> {enrollModal.students.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {enrollModal.duration}</span>
                <span className="flex items-center gap-1"><BarChart2 size={11} /> {enrollModal.level}</span>
                <span className="flex items-center gap-1"><BookOpen size={11} /> {enrollModal.lessons} lessons</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-5">{enrollModal.desc}</p>

              {/* Topics */}
              <div className="mb-5">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">What you will learn</p>
                <div className="flex flex-wrap gap-1.5">
                  {enrollModal.topics.map((t) => (
                    <span key={t} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-medium">
                      <CheckCircle size={10} className="text-green-500" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span>💻 Online &amp; Offline</span>
                <span>📜 Certificate included</span>
                <span>♾️ Lifetime access</span>
                <span>🎯 Project-based</span>
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-3xl font-black" style={{ color:enrollModal.color }}>{enrollModal.price}</p>
                  <p className="text-xs text-slate-400">One-time payment · No subscription</p>
                </div>
                <button
                  onClick={() => handleEnroll(enrollModal.id)}
                  disabled={confirming}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-white text-sm disabled:opacity-70 transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background:`linear-gradient(135deg,${enrollModal.color},${enrollModal.color}bb)`, boxShadow:`0 6px 20px ${enrollModal.color}44` }}>
                  {confirming ? (
                    <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Processing…</>
                  ) : (
                    <><GraduationCap size={16} /> Confirm Enrollment</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Navbar ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50" style={{ background:"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(0,0,0,0.07)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-[16px] tracking-tight">GeoVision<span className="text-blue-600">Pro</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all">
              <Bell size={17} />
              {notEnrolled.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-white" />}
            </button>
            <div className="flex items-center gap-2 px-2 py-1 rounded-xl cursor-default">
              <Avatar name={user.name} size={30} />
              <span className="text-sm font-semibold text-slate-700 hidden sm:block">{user.name}</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-7">

        {/* ── Welcome banner ─────────────────────────────── */}
        <div className="rounded-2xl p-7 mb-6 flex flex-wrap items-center justify-between gap-5 overflow-hidden relative"
          style={{ background:"linear-gradient(135deg,#060d1f 0%,#0f2044 55%,#060d1f 100%)", boxShadow:"0 8px 40px rgba(15,23,42,0.25)" }}>
          <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage:`linear-gradient(rgba(148,198,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(148,198,255,1) 1px,transparent 1px)`, backgroundSize:"40px 40px" }} />
          <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,#3b82f6,transparent 70%)", filter:"blur(70px)", opacity:0.18 }} />
          <div className="relative z-10 flex items-center gap-5">
            <Avatar name={user.name} size={64} />
            <div>
              <p className="text-blue-300 text-sm font-medium">{greeting},</p>
              <h1 className="text-2xl font-black text-white tracking-tight">{user.name} 👋</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/20">
                  <Zap size={10} /> {user.plan} Plan
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Target size={11} /> {user.streak}-day streak 🔥
                </span>
                <span className="text-xs text-slate-400">{enrolledCourses.length}/{ALL_COURSES.length} courses enrolled</span>
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <button onClick={() => setActiveTab("explore")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-all shadow-lg"
              style={{ background:"linear-gradient(135deg,#3b82f6,#6366f1)", boxShadow:"0 4px 16px rgba(99,102,241,0.4)" }}>
              <ShoppingCart size={15} /> Browse All Courses
            </button>
          </div>
        </div>

        {/* ── Stats ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label:"Enrolled Courses",    value:enrolledCourses.length, sub:`of ${ALL_COURSES.length} available`, icon:<BookOpen size={17}/>,   grad:"#3b82f6,#2563eb",  bg:"bg-blue-50",    tc:"text-blue-600" },
            { label:"Hours Learned",        value:"62",                   sub:"Total hrs so far",              icon:<Clock size={17}/>,        grad:"#6366f1,#7c3aed",  bg:"bg-indigo-50",  tc:"text-indigo-600" },
            { label:"Certificates Earned",  value:certCourses.length,     sub:"Completed courses",             icon:<Award size={17}/>,        grad:"#f59e0b,#ea580c",  bg:"bg-amber-50",   tc:"text-amber-600" },
            { label:"Avg. Completion",      value:`${avgPct}%`,           sub:"Across enrolled courses",       icon:<TrendingUp size={17}/>,   grad:"#10b981,#059669",  bg:"bg-emerald-50", tc:"text-emerald-600" },
          ].map(({ label, value, sub, icon, grad, bg, tc }) => (
            <div key={label} className="rounded-2xl border p-5 hover:-translate-y-0.5 transition-all" style={CARD}>
              <div className={`w-9 h-9 rounded-xl ${bg} ${tc} flex items-center justify-center mb-3`}>{icon}</div>
              <p className="text-2xl font-black mb-0.5" style={{ background:`linear-gradient(135deg,${grad})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{value}</p>
              <p className="text-xs font-semibold text-slate-700">{label}</p>
              <p className="text-[11px] text-slate-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs ─────────────────────────────────────── */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit border relative" style={{ background:"rgba(255,255,255,0.9)", borderColor:"rgba(0,0,0,0.07)", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all whitespace-nowrap relative"
              style={activeTab===tab ? { background:"linear-gradient(135deg,#3b82f6,#6366f1)", color:"#fff", boxShadow:"0 4px 12px rgba(99,102,241,0.35)" } : { color:"#64748b" }}>
              {tab}
              {tab === "explore" && notEnrolled.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">{notEnrolled.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════ DASHBOARD ══════════ */}
        {activeTab === "dashboard" && (
          <div className="grid lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">

              {/* Continue learning */}
              {enrolledCourses.filter((c)=>c.progress<100).length > 0 && (
                <div className="rounded-2xl border p-6" style={CARD}>
                  <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><Play size={13} className="text-blue-600" /></span>
                    Continue Learning
                  </h2>
                  <div className="space-y-3">
                    {enrolledCourses.filter((c)=>c.progress<100).map((c) => (
                      <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-all group" style={{ borderColor:"rgba(0,0,0,0.06)", background:"#fafbff" }}>
                        <Ring pct={c.progress} color={c.color} size={56} />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm truncate">{c.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">Next: <span className="text-slate-600 font-medium">{c.nextLesson}</span></p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[11px] text-slate-400">{c.completed}/{c.lessons} lessons</span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full font-bold" style={{ background:`${c.color}15`, color:c.color }}>{c.tag}</span>
                          </div>
                        </div>
                        <Link href={`/course/${c.id}`}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 flex-shrink-0 transition-all"
                          style={{ background:`linear-gradient(135deg,${c.color},${c.color}cc)`, boxShadow:`0 4px 12px ${c.color}44` }}>
                          <Play size={13} /> {c.progress===0 ? "Start" : "Resume"}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available to enroll */}
              {notEnrolled.length > 0 && (
                <div className="rounded-2xl border p-6" style={CARD}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center"><ShoppingCart size={13} className="text-amber-500" /></span>
                      Enroll in More Courses
                      <span className="ml-1 text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">{notEnrolled.length} available</span>
                    </h2>
                    <button onClick={() => setActiveTab("explore")} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                      See all <ChevronRight size={13} />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {notEnrolled.map((c) => (
                      <div key={c.id} className="rounded-xl border p-4 hover:shadow-md transition-all flex flex-col gap-2 cursor-pointer group" style={{ borderColor:"rgba(0,0,0,0.07)", background:"#fafbff" }}
                        onClick={() => setEnrollModal(c)}>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background:`${c.color}15`, color:c.color }}>{c.tag}</span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-0.5"><Star size={9} className="text-amber-400 fill-amber-400" /> {c.rating}</span>
                        </div>
                        <p className="font-bold text-slate-800 text-xs leading-snug">{c.title}</p>
                        <p className="text-[11px] text-slate-400">{c.duration}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm font-black" style={{ color:c.color }}>{c.price}</span>
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg text-white group-hover:scale-105 transition-transform"
                            style={{ background:`linear-gradient(135deg,${c.color},${c.color}cc)` }}>
                            Enroll
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All enrolled success */}
              {notEnrolled.length === 0 && (
                <div className="rounded-2xl border p-6 text-center" style={CARD}>
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={28} className="text-green-500" />
                  </div>
                  <p className="font-bold text-slate-900 text-lg">You're enrolled in all courses! 🎉</p>
                  <p className="text-sm text-slate-400 mt-1">Complete your courses to earn certificates.</p>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Profile card */}
              <div className="rounded-2xl border p-6" style={CARD}>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar name={user.name} size={48} />
                  <div>
                    <p className="font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.interest}</p>
                  </div>
                </div>
                {[
                  { icon:<Mail size={12} className="text-blue-400"/>,     v:user.email||"—" },
                  { icon:<Phone size={12} className="text-blue-400"/>,    v:user.phone },
                  { icon:<MapPin size={12} className="text-blue-400"/>,   v:user.location },
                  { icon:<Calendar size={12} className="text-blue-400"/>, v:`Since ${user.memberSince}` },
                ].map(({ icon, v }) => (
                  <div key={v} className="flex items-center gap-2 text-xs text-slate-500 py-1">{icon}<span className="truncate">{v}</span></div>
                ))}
                <button className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
                  <Edit3 size={13} /> Edit Profile
                </button>
              </div>

              {/* Streak */}
              <div className="rounded-2xl border p-6" style={CARD}>
                <p className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2"><span className="text-base">🔥</span> Learning Streak</p>
                <p className="text-3xl font-black text-orange-500 mb-0.5">{user.streak} <span className="text-base font-semibold text-slate-400">days</span></p>
                <p className="text-xs text-slate-400 mb-3">Keep it going!</p>
                <div className="grid grid-cols-7 gap-1">
                  {["M","T","W","T","F","S","S"].map((d,i) => (
                    <div key={i} className={`h-7 rounded-md flex items-center justify-center text-[10px] font-bold ${i<user.streak?"bg-orange-400 text-white":"bg-slate-100 text-slate-300"}`}>{d}</div>
                  ))}
                </div>
              </div>

              {/* Plan */}
              <div className="rounded-2xl p-5 relative overflow-hidden"
                style={{ background:"linear-gradient(135deg,#060d1f,#0f2044)", boxShadow:"0 8px 28px rgba(15,23,42,0.22)" }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full" style={{ background:"radial-gradient(circle,#3b82f6,transparent 70%)", filter:"blur(30px)", opacity:0.3 }} />
                <p className="text-blue-300 text-xs font-semibold mb-0.5 relative z-10">Current Plan</p>
                <p className="text-white text-xl font-black relative z-10">{user.plan} <span className="text-blue-400">Member</span></p>
                <p className="text-slate-400 text-xs mt-1 mb-4 relative z-10">{enrolledCourses.length}/{ALL_COURSES.length} courses enrolled</p>
                {notEnrolled.length > 0 && (
                  <button onClick={() => setActiveTab("explore")}
                    className="relative z-10 w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-all"
                    style={{ background:"linear-gradient(135deg,#3b82f6,#6366f1)" }}>
                    Enroll in {notEnrolled.length} More Course{notEnrolled.length!==1?"s":""}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ MY COURSES ══════════ */}
        {activeTab === "my courses" && (
          <div className="space-y-4 pb-8">
            <p className="text-sm text-slate-500">{enrolledCourses.length} enrolled · {notEnrolled.length} more available</p>
            {enrolledCourses.map((c) => (
              <div key={c.id} className="rounded-2xl border p-6 hover:shadow-lg transition-all" style={CARD}>
                <div className="flex flex-wrap items-start gap-5">
                  <Ring pct={c.progress} color={c.color} size={72} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-2" style={{ background:`${c.color}15`, color:c.color }}>{c.tag}</span>
                        <h3 className="font-black text-slate-900 text-lg leading-snug">{c.title}</h3>
                        <p className="text-sm text-slate-400 mt-0.5">{c.duration} · Enrolled {c.enrolledDate} · <span className="font-semibold" style={{ color:c.color }}>{c.price}</span></p>
                      </div>
                      {c.progress === 100 ? (
                        <button onClick={() => setCertModal({ courseId: c.id })}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0 hover:opacity-90 hover:-translate-y-0.5 transition-all"
                          style={{ background:"linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow:"0 4px 16px rgba(245,158,11,0.35)" }}>
                          <Download size={14} /> View &amp; Download Certificate
                        </button>
                      ) : (
                        <Link href={`/course/${c.id}`}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 hover:-translate-y-0.5 transition-all flex-shrink-0"
                          style={{ background:`linear-gradient(135deg,${c.color},${c.color}cc)`, boxShadow:`0 4px 16px ${c.color}44` }}>
                          <Play size={14} /> {c.progress===0 ? "Start Learning" : "Resume"}
                        </Link>
                      )}
                    </div>
                    <div className="mt-4 grid sm:grid-cols-3 gap-3">
                      {[
                        { label:"Lessons Done",  value:`${c.completed}/${c.lessons}` },
                        { label:"Next Up",        value:c.nextLesson },
                        { label:"Status",         value:c.progress===100?"✅ Completed":c.progress===0?"⏳ Not Started":"▶ In Progress" },
                      ].map(({ label, value }) => (
                        <div key={label} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{label}</p>
                          <p className="text-sm font-bold text-slate-700 mt-0.5 truncate">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${c.progress}%`, background:`linear-gradient(90deg,${c.color},${c.color}88)` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {notEnrolled.length > 0 && (
              <button onClick={() => setActiveTab("explore")}
                className="w-full flex items-center justify-between rounded-2xl p-6 text-white hover:opacity-95 hover:-translate-y-0.5 transition-all group"
                style={{ background:"linear-gradient(135deg,#060d1f,#0f2044)", boxShadow:"0 8px 28px rgba(15,23,42,0.2)" }}>
                <div className="text-left">
                  <p className="font-bold text-base">Enroll in {notEnrolled.length} More Course{notEnrolled.length!==1?"s":""}</p>
                  <p className="text-blue-300 text-sm mt-0.5">Prices starting from ₹299 · Certificate on completion</p>
                </div>
                <ChevronRight size={22} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        )}

        {/* ══════════ EXPLORE ══════════ */}
        {activeTab === "explore" && (
          <div className="pb-8">
            <div className="flex flex-wrap items-end justify-between mb-5 gap-3">
              <div>
                <p className="font-bold text-slate-900 text-lg">All Courses <span className="text-slate-400 font-normal text-base">({ALL_COURSES.length} total)</span></p>
                <p className="text-sm text-slate-500 mt-0.5">Click any course to view details &amp; enroll · Prices ₹299–₹499 · Certificate included</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold"><CheckCircle size={11} /> {enrolledCourses.length} Enrolled</span>
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold"><ShoppingCart size={11} /> {notEnrolled.length} Available</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ALL_COURSES.map((c) => {
                const enrolled = enrolledIds.includes(c.id);
                return (
                  <div key={c.id}
                    className="rounded-2xl border flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all group cursor-pointer relative"
                    style={CARD}
                    onClick={() => !enrolled && setEnrollModal(c)}>
                    {enrolled && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 border border-green-200">
                        <CheckCircle size={10} /> Enrolled
                      </div>
                    )}
                    <div className="h-1.5" style={{ background:`linear-gradient(90deg,${c.color},${c.color}55)` }} />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ background:`${c.color}15`, color:c.color }}>{c.tag}</span>
                        {c.badge && <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={c.badgeStyle??{}}>{c.badge}</span>}
                        <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{c.level}</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-base leading-snug mb-2">{c.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1">{c.desc}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {c.topics.slice(0,3).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-400">{t}</span>
                        ))}
                        {c.topics.length>3 && <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-slate-400">+{c.topics.length-3} more</span>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                        <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" />{c.rating}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{c.duration}</span>
                        <span>{c.lessons} lessons</span>
                        <span>{c.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div>
                          <p className="text-xl font-black" style={{ color:c.color }}>{c.price}</p>
                          <p className="text-[10px] text-slate-400">📜 Certificate included</p>
                        </div>
                        {enrolled ? (
                          <button onClick={(e)=>{ e.stopPropagation(); setActiveTab("my courses"); }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white"
                            style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>
                            <Play size={13} /> Continue
                          </button>
                        ) : (
                          <button onClick={(e)=>{ e.stopPropagation(); setEnrollModal(c); }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 hover:-translate-y-0.5 transition-all group-hover:shadow-lg"
                            style={{ background:`linear-gradient(135deg,${c.color},${c.color}bb)`, boxShadow:`0 4px 12px ${c.color}33` }}>
                            <ShoppingCart size={13} /> Enroll Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Help */}
            <div className="mt-6 rounded-2xl border p-5 flex flex-wrap items-center justify-between gap-4" style={CARD}>
              <div>
                <p className="text-sm font-bold text-slate-900">Not sure which course to pick?</p>
                <p className="text-xs text-slate-500 mt-0.5">Our experts will guide you to the right course for your career goals.</p>
              </div>
              <Link href="/#contact"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white whitespace-nowrap"
                style={{ background:"linear-gradient(135deg,#3b82f6,#6366f1)" }}>
                Talk to an Expert
              </Link>
            </div>
          </div>
        )}

        {/* ══════════ CERTIFICATES ══════════ */}
        {activeTab === "certificates" && (
          <div className="pb-8 space-y-5">
            {certCourses.length > 0 ? certCourses.map((c) => {
              const cert = CERTIFICATES[c.id]!;
              return (
                <div key={c.id} className="rounded-2xl border p-6 flex flex-wrap items-center justify-between gap-5" style={CARD}>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background:"linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow:"0 6px 20px rgba(245,158,11,0.35)" }}>
                      <Award size={26} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base">{c.title}</h3>
                      <p className="text-sm text-slate-400 mt-0.5">Issued {cert.date} · <span className="font-semibold text-slate-600">{cert.id}</span></p>
                      <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <CheckCircle size={10} /> {cert.grade}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCertModal({ courseId: c.id })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90 hover:-translate-y-0.5 transition-all"
                    style={{ background:"linear-gradient(135deg,#f59e0b,#ea580c)", boxShadow:"0 4px 16px rgba(245,158,11,0.35)" }}>
                    <Download size={15} /> View &amp; Download
                  </button>
                </div>
              );
            }) : (
              <div className="rounded-2xl border p-10 text-center" style={CARD}>
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Award size={28} className="text-slate-300" />
                </div>
                <p className="font-bold text-slate-700 text-lg">No certificates yet</p>
                <p className="text-sm text-slate-400 mt-1 mb-5">Complete a course to earn your certificate.</p>
                <button onClick={() => setActiveTab("my courses")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background:"linear-gradient(135deg,#3b82f6,#6366f1)" }}>
                  <Play size={14} /> Go to My Courses
                </button>
              </div>
            )}

            {/* In progress */}
            {enrolledCourses.filter((c)=>c.progress<100).length > 0 && (
              <div className="rounded-2xl border p-6" style={CARD}>
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Lock size={14} className="text-slate-400" /> Certificates in Progress
                </h3>
                {enrolledCourses.filter((c)=>c.progress<100).map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-3 border-t border-slate-100 first:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:`${c.color}15` }}>
                        <BookOpen size={14} style={{ color:c.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{c.title}</p>
                        <p className="text-xs text-slate-400">{c.progress}% complete · {c.completed}/{c.lessons} lessons</p>
                      </div>
                    </div>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${c.progress}%`, background:c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {notEnrolled.length > 0 && (
              <button onClick={() => setActiveTab("explore")}
                className="w-full flex items-center justify-between rounded-2xl p-6 text-white hover:opacity-95 transition-all group"
                style={{ background:"linear-gradient(135deg,#060d1f,#0f2044)", boxShadow:"0 8px 28px rgba(15,23,42,0.2)" }}>
                <div className="text-left">
                  <p className="font-bold">Earn More Certificates</p>
                  <p className="text-blue-300 text-sm mt-0.5">Enroll in {notEnrolled.length} more courses — from ₹299</p>
                </div>
                <ChevronRight size={20} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
