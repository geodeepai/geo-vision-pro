"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogOut, Bell, BookOpen, Clock, Award, TrendingUp, Play,
  CheckCircle, Star, ChevronRight, Download, Lock, ShoppingCart,
  Target, Mail, Phone, MapPin, Calendar, X,
  Users, BarChart2, GraduationCap, LayoutDashboard, Compass, UserCog,
  Crown, ChevronDown, Sparkles, Camera, Loader2,
  History, LogIn, UserPlus, KeyRound, Image as ImageIcon,
  Shield, Eye, EyeOff,
  Globe, Map, Layers, Plane, Cpu, Building2, ArrowLeft, ExternalLink,
} from "lucide-react";
import CertificateModal from "@/components/CertificateModal";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/activity";

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

/* ─── explore topics (mirrors the site's 6 service pillars) ──── */
const TOPICS = [
  {
    key: "remote-sensing", label: "Remote Sensing & Earth Observation", icon: Globe, color: "#0d9488",
    desc: "Satellite and aerial imagery analysis, data acquisition, classification, and change detection.",
    href: "/consultancy", tags: ["GEE", "RS"],
  },
  {
    key: "lulc", label: "LULC Analysis & Mapping", icon: Map, color: "#059669",
    desc: "Multi-temporal land use & land cover classification for urban planning, agriculture, and environment.",
    href: "/lulc", tags: ["RS"],
  },
  {
    key: "gis", label: "GIS & Spatial Analysis", icon: Layers, color: "#2563eb",
    desc: "Geodatabase design, network analysis, spatial modelling, and custom cartography.",
    href: "/gis", tags: ["GIS"],
  },
  {
    key: "drone", label: "Drone & UAV Mapping", icon: Plane, color: "#d97706",
    desc: "Survey-grade UAV mapping delivering orthomosaics, DEMs, and volumetric reports.",
    href: "/drone", tags: [],
  },
  {
    key: "ai-geo", label: "AI-Powered Geo-Analytics", icon: Cpu, color: "#0891b2",
    desc: "Deep learning and big-data geoprocessing for automated feature extraction and predictive modelling.",
    href: "/ai-geo", tags: ["AI/ML"],
  },
  {
    key: "structural", label: "Structural & Civil Engineering", icon: Building2, color: "#7c3aed",
    desc: "Structural analysis, design review, and civil engineering consultancy for infrastructure.",
    href: "/structural", tags: ["CAD", "STAAD"],
  },
];

/* ─── helpers ────────────────────────────────────────────────── */
function Avatar({ name, size = 72, ring = true, src }: { name: string; size?: number; ring?: boolean; src?: string | null }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const ringShadow = ring ? "0 0 0 3px #fff,0 0 0 5px rgba(99,102,241,0.35),0 6px 18px rgba(99,102,241,0.3)" : "none";

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className="rounded-full object-cover flex-shrink-0 select-none"
        style={{ width: size, height: size, boxShadow: ringShadow }} />
    );
  }

  return (
    <div className="rounded-full flex items-center justify-center font-black text-white select-none flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.32,
        background: "linear-gradient(135deg,#3b82f6,#6366f1,#8b5cf6)",
        boxShadow: ringShadow }}>
      {initials}
    </div>
  );
}

function Ring({ pct, color, size = 56 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#eef1f6" strokeWidth="5" />
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

const CARD = { background:"#ffffff", borderColor:"rgba(15,23,42,0.07)", boxShadow:"0 1px 2px rgba(15,23,42,0.03)" } as const;
const SOFT_BLUE = { background:"linear-gradient(135deg,#f3f7ff,#f1f0fe)", borderColor:"#e2e8ff" } as const;
const PRIMARY_BTN = "linear-gradient(135deg,#4f7df3,#6366f1)";
const PRIMARY_SHADOW = "0 4px 14px rgba(79,125,243,0.28)";

type TabKey = "dashboard" | "my courses" | "explore" | "topics" | "certificates" | "profile" | "security" | "activity";
const NAV_GROUPS: { label: string; items: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] }[] = [
  { label: "Learning", items: [
    { key: "dashboard",    label: "Dashboard",       icon: LayoutDashboard },
    { key: "my courses",   label: "My Courses",      icon: BookOpen },
    { key: "explore",      label: "Explore Courses", icon: Compass },
    { key: "topics",       label: "Explore Topics",  icon: Globe },
    { key: "certificates", label: "Certificates",    icon: Award },
  ]},
  { label: "Account", items: [
    { key: "profile",  label: "Edit Profile", icon: UserCog },
    { key: "security", label: "Security",     icon: Shield },
    { key: "activity", label: "Activity Log", icon: History },
  ]},
];
const NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

const ACTIVITY_ICONS: Record<string, typeof LogIn> = {
  login: LogIn,
  account_created: UserPlus,
  profile_updated: UserCog,
  email_changed: Mail,
  password_changed: KeyRound,
  avatar_updated: ImageIcon,
  avatar_removed: ImageIcon,
  enrollment: GraduationCap,
};

/* ─── page ───────────────────────────────────────────────────── */
const PROFILE_FIELDS_INIT = { full_name: "", dob: "", phone: "", organization: "", city: "", state: "", pincode: "" };
type ProfileFields = typeof PROFILE_FIELDS_INIT;

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser]               = useState(MOCK_USER);
  const [activeTab, setActiveTab]     = useState<TabKey>("dashboard");
  const [enrolledIds, setEnrolledIds] = useState<number[]>([1, 2, 6]);
  const [enrollModal, setEnrollModal] = useState<typeof ALL_COURSES[0] | null>(null);
  const [toast, setToast]             = useState<string | null>(null);
  const [confirming, setConfirming]   = useState(false);
  const [certModal, setCertModal]     = useState<null | { courseId: number }>(null);
  const [menuOpen, setMenuOpen]       = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [notifOpen, setNotifOpen]     = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  /* ── Editable profile ── */
  const [profile, setProfile]         = useState<ProfileFields>(PROFILE_FIELDS_INIT);
  const [editForm, setEditForm]       = useState<ProfileFields & { email: string }>({ ...PROFILE_FIELDS_INIT, email: "" });
  const [saving, setSaving]           = useState(false);
  const [saveError, setSaveError]     = useState("");

  /* ── Profile picture ── */
  const [avatarUrl, setAvatarUrl]         = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError]     = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Activity log ── */
  const [activity, setActivity]           = useState<{ id: string; type: string; description: string; createdAt: string }[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityLoaded, setActivityLoaded] = useState(false);

  /* ── Security / change password ── */
  const [pwForm, setPwForm]               = useState({ current: "", next: "", confirm: "" });
  const [pwShow, setPwShow]               = useState(false);
  const [pwSaving, setPwSaving]           = useState(false);
  const [pwError, setPwError]             = useState("");

  /* ── Explore topics ── */
  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[number] | null>(null);

  /* load persisted state */
  useEffect(() => {
    const ids = localStorage.getItem("gvp_enrolled_ids");
    if (ids) setEnrolledIds(JSON.parse(ids));

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;

    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const authUser = data.user;
      if (!authUser) return;
      const fullName = (authUser.user_metadata?.full_name as string) || MOCK_USER.name;
      setUser((u) => ({ ...u, name: fullName, email: authUser.email ?? "" }));

      const { data: row } = await supabase.from("profiles").select("*").eq("id", authUser.id).maybeSingle();
      if (row?.avatar_url) setAvatarUrl(row.avatar_url);
      const loaded: ProfileFields = {
        full_name: row?.full_name || fullName,
        dob: row?.dob || "",
        phone: row?.phone || "",
        organization: row?.organization || "",
        city: row?.city || "",
        state: row?.state || "",
        pincode: row?.pincode || "",
      };
      setProfile(loaded);
      setUser((u) => ({
        ...u,
        name: loaded.full_name || u.name,
        phone: loaded.phone || u.phone,
        location: loaded.city || loaded.state ? [loaded.city, loaded.state].filter(Boolean).join(", ") : u.location,
      }));
    });
  }, []);

  /* close avatar menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  /* close notifications panel on outside click */
  useEffect(() => {
    if (!notifOpen) return;
    function onClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [notifOpen]);

  function toggleNotifications() {
    setNotifOpen((o) => {
      const next = !o;
      if (next && !activityLoaded) loadActivity();
      return next;
    });
  }

  function goToEditProfile() {
    setEditForm({ ...profile, full_name: profile.full_name || user.name, email: user.email });
    setSaveError("");
    setActiveTab("profile");
    setMenuOpen(false);
  }

  function selectTab(key: TabKey) {
    if (key === "profile") { goToEditProfile(); return; }
    if (key === "activity" && !activityLoaded) loadActivity();
    if (key === "security") { setPwForm({ current: "", next: "", confirm: "" }); setPwError(""); }
    if (key === "topics") { setSelectedTopic(null); }
    setActiveTab(key);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (pwForm.next.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError("New passwords do not match."); return; }

    setPwSaving(true);
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser || !user.email) throw new Error("Not signed in");

      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: pwForm.current,
      });
      if (verifyError) throw new Error("Current password is incorrect.");

      const { error: updateError } = await supabase.auth.updateUser({ password: pwForm.next });
      if (updateError) throw updateError;

      await logActivity(supabase, authUser.id, "password_changed", "Password changed");

      setPwForm({ current: "", next: "", confirm: "" });
      setToast("Password changed successfully!");
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Could not change password. Please try again.");
    } finally {
      setPwSaving(false);
    }
  }

  async function loadActivity() {
    setActivityLoading(true);
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const [logRes, enrollRes] = await Promise.all([
        supabase.from("activity_log").select("*").eq("user_id", authUser.id).order("created_at", { ascending: false }).limit(50),
        supabase.from("enrollments").select("*").eq("user_id", authUser.id).order("created_at", { ascending: false }).limit(50),
      ]);

      const logItems = (logRes.data ?? []).map((r) => ({
        id: r.id as string,
        type: r.event_type as string,
        description: r.description as string,
        createdAt: r.created_at as string,
      }));
      const enrollItems = (enrollRes.data ?? []).map((r) => ({
        id: r.id as string,
        type: "enrollment",
        description: `Enrolled in "${r.course_title}"`,
        createdAt: r.created_at as string,
      }));

      const merged = [...logItems, ...enrollItems].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setActivity(merged);
      setActivityLoaded(true);
    } finally {
      setActivityLoading(false);
    }
  }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  }

  function exactTime(iso: string) {
    return new Date(iso).toLocaleString("en-US", {
      day: "numeric", month: "short", year: "numeric",
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  }

  function resetEditForm() {
    setEditForm({ ...profile, full_name: profile.full_name || user.name, email: user.email });
    setSaveError("");
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) { setAvatarError("Please choose an image file."); return; }
    if (file.size > 3 * 1024 * 1024) { setAvatarError("Image must be smaller than 3MB."); return; }

    setAvatarError("");
    setUploadingAvatar(true);
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not signed in");

      const path = `${authUser.id}/avatar`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      const freshUrl = `${pub.publicUrl}?t=${Date.now()}`;

      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: authUser.id,
        avatar_url: freshUrl,
        updated_at: new Date().toISOString(),
      });
      if (upsertError) throw upsertError;

      await supabase.auth.updateUser({ data: { avatar_url: freshUrl } });
      await logActivity(supabase, authUser.id, "avatar_updated", "Updated profile picture");

      setAvatarUrl(freshUrl);
      setToast("Profile picture updated!");
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : "Could not upload image. Please try again.");
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleRemoveAvatar() {
    setAvatarError("");
    setUploadingAvatar(true);
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not signed in");

      await supabase.storage.from("avatars").remove([`${authUser.id}/avatar`]);

      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: authUser.id,
        avatar_url: null,
        updated_at: new Date().toISOString(),
      });
      if (upsertError) throw upsertError;

      await supabase.auth.updateUser({ data: { avatar_url: null } });
      await logActivity(supabase, authUser.id, "avatar_removed", "Removed profile picture");
      setAvatarUrl(null);
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : "Could not remove photo. Please try again.");
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    try {
      const supabase = createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not signed in");

      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: authUser.id,
        full_name: editForm.full_name,
        dob: editForm.dob || null,
        phone: editForm.phone,
        organization: editForm.organization,
        city: editForm.city,
        state: editForm.state,
        pincode: editForm.pincode,
        updated_at: new Date().toISOString(),
      });
      if (upsertError) throw upsertError;

      await supabase.auth.updateUser({ data: { full_name: editForm.full_name } });
      await logActivity(supabase, authUser.id, "profile_updated", "Updated profile details");

      if (editForm.email && editForm.email !== user.email) {
        const res = await fetch("/api/profile/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: editForm.email }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Could not update email address");
        }
        await logActivity(supabase, authUser.id, "email_changed", `Changed email to ${editForm.email}`);
      }

      const { full_name, dob, phone, organization, city, state, pincode } = editForm;
      setProfile({ full_name, dob, phone, organization, city, state, pincode });
      setUser((u) => ({
        ...u,
        name: full_name || u.name,
        email: editForm.email || u.email,
        phone: phone || u.phone,
        location: city || state ? [city, state].filter(Boolean).join(", ") : u.location,
      }));
      setToast("Profile updated successfully!");
      setTimeout(() => setToast(null), 4000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

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
    setToast(`Enrolled in "${name}" successfully!`);
    setTimeout(() => setToast(null), 4000);
    setActiveTab("my courses");
  }

  async function handleLogout() {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
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
  const activeLabel  = NAV_ITEMS.find((n) => n.key === activeTab)?.label ?? "Dashboard";

  const inputCls = "w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 bg-white focus:bg-white transition-all outline-none";
  const inputStyle = { borderColor: "rgba(15,23,42,0.1)" } as const;
  const labelCls = "block text-xs font-semibold text-slate-500 mb-1.5";

  return (
    <div className="min-h-screen" style={{ background:"#fafbfd" }}>

      {/* ── Success toast ─────────────────────────────────── */}
      {toast && (
        <div className="fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold animate-bounce-in"
          style={{ background:"linear-gradient(135deg,#10b981,#059669)", boxShadow:"0 8px 32px rgba(16,185,129,0.45)" }}>
          <CheckCircle size={18} />
          <span>{toast}</span>
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
          style={{ background:"rgba(15,23,42,0.5)", backdropFilter:"blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setEnrollModal(null); }}>
          <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ background:"#fff" }}>
            <div className="h-2" style={{ background:`linear-gradient(90deg,${enrollModal.color},${enrollModal.color}66)` }} />
            <div className="p-7">
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

              <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /> {enrollModal.rating} rating</span>
                <span className="flex items-center gap-1"><Users size={11} /> {enrollModal.students.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {enrollModal.duration}</span>
                <span className="flex items-center gap-1"><BarChart2 size={11} /> {enrollModal.level}</span>
                <span className="flex items-center gap-1"><BookOpen size={11} /> {enrollModal.lessons} lessons</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-5">{enrollModal.desc}</p>

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

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span>💻 Online &amp; Offline</span>
                <span>📜 Certificate included</span>
                <span>♾️ Lifetime access</span>
                <span>🎯 Project-based</span>
              </div>

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

      {/* ── Header ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50" style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px) saturate(180%)", borderBottom:"1px solid rgba(15,23,42,0.06)" }}>
        <div className="px-5 md:px-7 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-[16px] tracking-tight">GeoVision<span className="text-blue-600">Pro</span></span>
            <span className="hidden lg:flex items-center gap-1.5 ml-2 pl-3 text-sm" style={{ borderLeft: "1px solid rgba(15,23,42,0.08)" }}>
              <span className="text-slate-400">Learner</span>
              <ChevronRight size={13} className="text-slate-300" />
              <span className="text-slate-700 font-semibold">{activeLabel}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={toggleNotifications}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all">
                <Bell size={17} />
                {notEnrolled.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white" />}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-80 rounded-2xl overflow-hidden z-50"
                  style={{ background:"#fff", border:"1px solid rgba(15,23,42,0.08)", boxShadow:"0 16px 40px rgba(15,23,42,0.16)" }}>
                  <div className="p-4" style={{ borderBottom:"1px solid rgba(15,23,42,0.06)" }}>
                    <p className="font-bold text-slate-900 text-sm">Notifications</p>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notEnrolled.length > 0 && (
                      <button onClick={() => { setActiveTab("explore"); setNotifOpen(false); }}
                        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-all text-left"
                        style={{ borderBottom:"1px solid rgba(15,23,42,0.06)" }}>
                        <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ShoppingCart size={14} className="text-amber-500" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{notEnrolled.length} new course{notEnrolled.length !== 1 ? "s" : ""} available</p>
                          <p className="text-xs text-slate-400 mt-0.5">Tap to explore and enroll</p>
                        </div>
                      </button>
                    )}

                    {activityLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 size={18} className="animate-spin text-indigo-400" />
                      </div>
                    ) : activity.length === 0 ? (
                      <p className="text-center text-xs text-slate-400 py-8">No recent activity.</p>
                    ) : (
                      activity.slice(0, 6).map((item) => {
                        const Icon = ACTIVITY_ICONS[item.type] ?? History;
                        return (
                          <div key={item.id} className="flex items-start gap-3 px-4 py-3" style={{ borderBottom:"1px solid rgba(15,23,42,0.06)" }}>
                            <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon size={14} className="text-slate-500" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-800">{item.description}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{timeAgo(item.createdAt)}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <button onClick={() => { selectTab("activity"); setNotifOpen(false); }}
                    className="w-full py-2.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-all">
                    View All Activity
                  </button>
                </div>
              )}
            </div>

            {/* Avatar menu */}
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-all">
                <Avatar name={user.name} size={30} ring={false} src={avatarUrl} />
                <span className="text-sm font-semibold text-slate-700 hidden sm:block">{user.name}</span>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-64 rounded-2xl overflow-hidden z-50"
                  style={{ background:"#fff", border:"1px solid rgba(15,23,42,0.08)", boxShadow:"0 16px 40px rgba(15,23,42,0.16)" }}>
                  <div className="p-4 flex items-center gap-3" style={{ borderBottom:"1px solid rgba(15,23,42,0.06)" }}>
                    <Avatar name={user.name} size={40} src={avatarUrl} />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email || "—"}</p>
                    </div>
                  </div>
                  <div className="p-1.5">
                    <button onClick={goToEditProfile}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
                      <UserCog size={15} /> Edit Profile
                    </button>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile nav (sidebar replacement on small screens) ── */}
      <div className="md:hidden sticky z-40 flex gap-1 px-3 py-2 overflow-x-auto"
        style={{ top: 64, background:"rgba(255,255,255,0.97)", borderBottom:"1px solid rgba(15,23,42,0.06)" }}>
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => selectTab(key)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
            style={activeTab===key ? { background:"#eef2ff", color:"#4f46e5" } : { color:"#64748b" }}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      <div className="flex">

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="hidden md:flex md:flex-col" style={{ width: 248, flexShrink: 0, borderRight:"1px solid rgba(15,23,42,0.06)", background:"#fff" }}>
          <div className="sticky flex flex-col" style={{ top: 64, height: "calc(100vh - 64px)" }}>
            <div className="flex-1 overflow-y-auto p-4">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="mb-5">
                  <p className="px-3 mb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">{group.label}</p>
                  <nav className="space-y-0.5">
                    {group.items.map(({ key, label, icon: Icon }) => {
                      const active = activeTab === key;
                      return (
                        <button key={key} onClick={() => selectTab(key)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left relative group">
                          <span className="absolute inset-0 rounded-xl transition-opacity"
                            style={{ background: active ? "#eef2ff" : "transparent", opacity: active ? 1 : 0 }} />
                          <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full transition-all"
                            style={{ background: active ? "#4f46e5" : "transparent" }} />
                          <Icon size={16} className="relative z-10 transition-colors" style={{ color: active ? "#4338ca" : "#94a3b8" }} />
                          <span className="relative z-10 transition-colors" style={{ color: active ? "#3730a3" : "#475569" }}>{label}</span>
                          {key === "explore" && notEnrolled.length > 0 && (
                            <span className="relative z-10 ml-auto text-[10px] font-bold w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">{notEnrolled.length}</span>
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              ))}
            </div>

            {/* Pinned plan card */}
            <div className="p-4">
              <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background:"linear-gradient(160deg,#1e1b4b,#312e81)" }}>
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background:"radial-gradient(circle,#818cf8,transparent 70%)", filter:"blur(18px)", opacity:0.5 }} />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-amber-300 mb-2">
                    <Crown size={10} /> {user.plan.toUpperCase()}
                  </span>
                  <p className="text-white text-xs font-semibold leading-snug mb-3">{enrolledCourses.length}/{ALL_COURSES.length} courses enrolled</p>
                  <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden mb-3">
                    <div className="h-full rounded-full" style={{ width:`${(enrolledCourses.length/ALL_COURSES.length)*100}%`, background:"linear-gradient(90deg,#818cf8,#c4b5fd)" }} />
                  </div>
                  {notEnrolled.length > 0 && (
                    <button onClick={() => setActiveTab("explore")}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-indigo-900 hover:opacity-90 transition-all"
                      style={{ background:"#fff" }}>
                      <Sparkles size={11} /> Explore More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main content (single active view) ─────────────── */}
        <main className="flex-1 min-w-0 px-5 md:px-9 py-6 md:py-8">

          {/* ══════════ DASHBOARD ══════════ */}
          {activeTab === "dashboard" && (
            <>
              {/* Welcome banner */}
              <div className="rounded-3xl p-7 md:p-8 mb-6 flex flex-wrap items-center justify-between gap-5 relative overflow-hidden border" style={SOFT_BLUE}>
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{ background:"radial-gradient(circle,#a5b4fc,transparent 70%)", filter:"blur(50px)", opacity:0.35 }} />
                <div className="relative z-10 flex items-center gap-5">
                  <Avatar name={user.name} size={64} src={avatarUrl} />
                  <div>
                    <p className="text-indigo-500 text-sm font-semibold">{greeting},</p>
                    <h1 className="text-[26px] font-black text-slate-900 tracking-tight leading-tight">{user.name} 👋</h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-indigo-600 border border-indigo-100 shadow-sm">
                        <Crown size={10} /> {user.plan} Plan
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <Target size={11} /> {user.streak}-day streak 🔥
                      </span>
                      <span className="text-xs text-slate-500">{enrolledCourses.length}/{ALL_COURSES.length} courses enrolled</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setActiveTab("explore")}
                  className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 hover:-translate-y-0.5 transition-all"
                  style={{ background:PRIMARY_BTN, boxShadow:PRIMARY_SHADOW }}>
                  <ShoppingCart size={15} /> Browse All Courses
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label:"Enrolled Courses",    value:enrolledCourses.length, sub:`of ${ALL_COURSES.length} available`, icon:<BookOpen size={16}/>,   tc:"#3b82f6", bg:"#eff6ff" },
                  { label:"Hours Learned",        value:"62",                   sub:"Total hrs so far",              icon:<Clock size={16}/>,        tc:"#6366f1", bg:"#eef2ff" },
                  { label:"Certificates Earned",  value:certCourses.length,     sub:"Completed courses",             icon:<Award size={16}/>,        tc:"#d97706", bg:"#fffbeb" },
                  { label:"Avg. Completion",      value:`${avgPct}%`,           sub:"Across enrolled courses",       icon:<TrendingUp size={16}/>,   tc:"#059669", bg:"#ecfdf5" },
                ].map(({ label, value, sub, icon, tc, bg }) => (
                  <div key={label} className="rounded-2xl border p-5 hover:-translate-y-0.5 hover:shadow-md transition-all" style={CARD}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background:bg, color:tc }}>{icon}</div>
                    <p className="text-[26px] font-black text-slate-900 leading-none mb-1 tracking-tight">{value}</p>
                    <p className="text-xs font-semibold text-slate-700">{label}</p>
                    <p className="text-[11px] text-slate-400">{sub}</p>
                  </div>
                ))}
              </div>

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
                          <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl border hover:shadow-md transition-all group" style={{ borderColor:"rgba(15,23,42,0.06)", background:"#fafbff" }}>
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
                          <span className="ml-1 text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">{notEnrolled.length} available</span>
                        </h2>
                        <button onClick={() => setActiveTab("explore")} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5">
                          See all <ChevronRight size={13} />
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {notEnrolled.map((c) => (
                          <div key={c.id} className="rounded-xl border p-4 hover:shadow-md transition-all flex flex-col gap-2 cursor-pointer group" style={{ borderColor:"rgba(15,23,42,0.06)", background:"#fafbff" }}
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
                      <Avatar name={user.name} size={48} src={avatarUrl} />
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.interest}</p>
                      </div>
                    </div>
                    {[
                      { icon:<Mail size={12} className="text-indigo-400"/>,     v:user.email||"—" },
                      { icon:<Phone size={12} className="text-indigo-400"/>,    v:user.phone },
                      { icon:<MapPin size={12} className="text-indigo-400"/>,   v:user.location },
                      { icon:<Calendar size={12} className="text-indigo-400"/>, v:`Since ${user.memberSince}` },
                    ].map(({ icon, v }) => (
                      <div key={v} className="flex items-center gap-2 text-xs text-slate-500 py-1">{icon}<span className="truncate">{v}</span></div>
                    ))}
                    <button onClick={goToEditProfile}
                      className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                      style={{ borderColor: "rgba(15,23,42,0.1)" }}>
                      <UserCog size={13} /> Edit Profile
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
                </div>
              </div>
            </>
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
                  className="w-full flex items-center justify-between rounded-2xl p-6 hover:-translate-y-0.5 hover:shadow-md transition-all group border"
                  style={SOFT_BLUE}>
                  <div className="text-left">
                    <p className="font-bold text-base text-slate-900">Enroll in {notEnrolled.length} More Course{notEnrolled.length!==1?"s":""}</p>
                    <p className="text-indigo-600 text-sm mt-0.5">Prices starting from ₹299 · Certificate on completion</p>
                  </div>
                  <ChevronRight size={22} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
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
                  <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold"><ShoppingCart size={11} /> {notEnrolled.length} Available</span>
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
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white whitespace-nowrap hover:-translate-y-0.5 transition-all"
                  style={{ background:PRIMARY_BTN, boxShadow:PRIMARY_SHADOW }}>
                  Talk to an Expert
                </Link>
              </div>
            </div>
          )}

          {/* ══════════ EXPLORE TOPICS ══════════ */}
          {activeTab === "topics" && (
            <div className="pb-8">
              {!selectedTopic ? (
                <>
                  <div className="mb-5">
                    <p className="font-bold text-slate-900 text-lg">Explore Topics</p>
                    <p className="text-sm text-slate-500 mt-0.5">Browse by subject area to find related courses and learn more about our services.</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TOPICS.map((t) => {
                      const Icon = t.icon;
                      const matchCount = ALL_COURSES.filter((c) => t.tags.includes(c.tag)).length;
                      return (
                        <button key={t.key} onClick={() => setSelectedTopic(t)}
                          className="text-left rounded-2xl border p-5 hover:-translate-y-1 hover:shadow-xl transition-all flex flex-col gap-3"
                          style={CARD}>
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${t.color}15`, color: t.color }}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h3 className="font-black text-slate-900 text-base leading-snug">{t.label}</h3>
                            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.desc}</p>
                          </div>
                          {matchCount > 0 && (
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full w-fit" style={{ background: `${t.color}15`, color: t.color }}>
                              {matchCount} course{matchCount !== 1 ? "s" : ""}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div>
                  <button onClick={() => setSelectedTopic(null)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors mb-5">
                    <ArrowLeft size={15} /> Back to Topics
                  </button>

                  <div className="rounded-2xl border p-7 mb-5" style={CARD}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${selectedTopic.color}15`, color: selectedTopic.color }}>
                        <selectedTopic.icon size={22} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-black text-slate-900">{selectedTopic.label}</h2>
                        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{selectedTopic.desc}</p>
                        <Link href={selectedTopic.href}
                          className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold transition-colors hover:opacity-80"
                          style={{ color: selectedTopic.color }}>
                          Learn more on our website <ExternalLink size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const related = ALL_COURSES.filter((c) => selectedTopic.tags.includes(c.tag));
                    if (related.length === 0) {
                      return (
                        <div className="rounded-2xl border p-8 text-center" style={CARD}>
                          <p className="text-sm text-slate-500">No courses tagged for this topic in your dashboard yet — visit the link above for our full {selectedTopic.label} services.</p>
                        </div>
                      );
                    }
                    return (
                      <div className="grid md:grid-cols-2 gap-4">
                        {related.map((c) => {
                          const enrolled = enrolledIds.includes(c.id);
                          return (
                            <div key={c.id} className="rounded-2xl border p-5 flex flex-col gap-2" style={CARD}>
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ background:`${c.color}15`, color:c.color }}>{c.tag}</span>
                                {enrolled && <span className="text-[11px] font-bold text-green-600 flex items-center gap-1"><CheckCircle size={11}/> Enrolled</span>}
                              </div>
                              <p className="font-bold text-slate-800 text-sm">{c.title}</p>
                              <p className="text-xs text-slate-400">{c.duration} · {c.price}</p>
                              {!enrolled && (
                                <button onClick={() => setEnrollModal(c)}
                                  className="mt-2 self-start flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white"
                                  style={{ background:`linear-gradient(135deg,${c.color},${c.color}cc)` }}>
                                  <ShoppingCart size={12} /> Enroll Now
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              )}
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
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white hover:-translate-y-0.5 transition-all"
                    style={{ background:PRIMARY_BTN, boxShadow:PRIMARY_SHADOW }}>
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
                  className="w-full flex items-center justify-between rounded-2xl p-6 hover:shadow-md transition-all group border"
                  style={SOFT_BLUE}>
                  <div className="text-left">
                    <p className="font-bold text-slate-900">Earn More Certificates</p>
                    <p className="text-indigo-600 text-sm mt-0.5">Enroll in {notEnrolled.length} more courses — from ₹299</p>
                  </div>
                  <ChevronRight size={20} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}

          {/* ══════════ EDIT PROFILE ══════════ */}
          {activeTab === "profile" && (
            <div className="max-w-2xl pb-8">
              <div className="rounded-2xl border p-7 md:p-8" style={CARD}>
                <div className="flex items-center gap-5 mb-7">
                  <div className="relative group flex-shrink-0">
                    <Avatar name={editForm.full_name || user.name} size={72} src={avatarUrl} />
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="absolute inset-0 rounded-full flex items-center justify-center transition-all"
                      style={{ background: "rgba(15,23,42,0)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.45)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0)"; }}
                      aria-label="Change profile picture">
                      {uploadingAvatar ? (
                        <Loader2 size={18} className="text-white animate-spin" />
                      ) : (
                        <Camera size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">{editForm.full_name || user.name}</h2>
                    <p className="text-sm text-slate-400 mb-2">Update your personal details below</p>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingAvatar}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors disabled:opacity-50">
                        {avatarUrl ? "Change Photo" : "Upload Photo"}
                      </button>
                      {avatarUrl && (
                        <button type="button" onClick={handleRemoveAvatar} disabled={uploadingAvatar}
                          className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors disabled:opacity-50">
                          Remove
                        </button>
                      )}
                    </div>
                    {avatarError && <p className="text-xs text-red-500 mt-1.5">{avatarError}</p>}
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {saveError && (
                    <p className="px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                      {saveError}
                    </p>
                  )}

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Personal Information</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Full Name</label>
                        <input value={editForm.full_name} onChange={(e) => setEditForm((f) => ({ ...f, full_name: e.target.value }))} className={inputCls} style={inputStyle} />
                      </div>
                      <div>
                        <label className={labelCls}>Date of Birth</label>
                        <input type="date" value={editForm.dob} onChange={(e) => setEditForm((f) => ({ ...f, dob: e.target.value }))} className={inputCls} style={inputStyle} />
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }} className="pt-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Contact Details</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Email Address</label>
                        <input type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} style={inputStyle} />
                      </div>
                      <div>
                        <label className={labelCls}>Phone</label>
                        <input value={editForm.phone} onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))} className={inputCls} style={inputStyle} />
                      </div>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }} className="pt-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Organization &amp; Location</p>
                    <div className="space-y-4">
                      <div>
                        <label className={labelCls}>Organization</label>
                        <input value={editForm.organization} onChange={(e) => setEditForm((f) => ({ ...f, organization: e.target.value }))} className={inputCls} style={inputStyle} />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className={labelCls}>City</label>
                          <input value={editForm.city} onChange={(e) => setEditForm((f) => ({ ...f, city: e.target.value }))} className={inputCls} style={inputStyle} />
                        </div>
                        <div>
                          <label className={labelCls}>State</label>
                          <input value={editForm.state} onChange={(e) => setEditForm((f) => ({ ...f, state: e.target.value }))} className={inputCls} style={inputStyle} />
                        </div>
                        <div>
                          <label className={labelCls}>Pincode</label>
                          <input value={editForm.pincode} onChange={(e) => setEditForm((f) => ({ ...f, pincode: e.target.value }))} className={inputCls} style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-5 pt-2" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                    <button type="button" onClick={resetEditForm}
                      className="text-sm font-semibold text-slate-500 hover:text-slate-700 transition-all">
                      Reset
                    </button>
                    <button type="submit" disabled={saving}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white disabled:opacity-70 transition-all hover:opacity-90 hover:-translate-y-0.5"
                      style={{ background:PRIMARY_BTN, boxShadow:PRIMARY_SHADOW }}>
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ══════════ SECURITY ══════════ */}
          {activeTab === "security" && (
            <div className="max-w-2xl pb-8">
              <div className="rounded-2xl border p-7 md:p-8" style={CARD}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center"><Shield size={16} className="text-indigo-600" /></span>
                  <h2 className="text-lg font-black text-slate-900">Security</h2>
                </div>
                <p className="text-sm text-slate-500 mb-6 ml-11">Change your password. You&apos;ll need your current password to confirm.</p>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  {pwError && (
                    <p className="px-4 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                      {pwError}
                    </p>
                  )}

                  <div>
                    <label className={labelCls}>Current Password</label>
                    <input type={pwShow ? "text" : "password"} value={pwForm.current}
                      onChange={(e) => setPwForm((f) => ({ ...f, current: e.target.value }))}
                      className={inputCls} style={inputStyle} autoComplete="current-password" />
                  </div>
                  <div>
                    <label className={labelCls}>New Password</label>
                    <input type={pwShow ? "text" : "password"} value={pwForm.next}
                      onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
                      className={inputCls} style={inputStyle} autoComplete="new-password" placeholder="Minimum 6 characters" />
                  </div>
                  <div>
                    <label className={labelCls}>Confirm New Password</label>
                    <input type={pwShow ? "text" : "password"} value={pwForm.confirm}
                      onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                      className={inputCls} style={inputStyle} autoComplete="new-password" />
                  </div>

                  <button type="button" onClick={() => setPwShow((s) => !s)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">
                    {pwShow ? <EyeOff size={13} /> : <Eye size={13} />}
                    {pwShow ? "Hide passwords" : "Show passwords"}
                  </button>

                  <div className="flex items-center justify-end pt-2" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
                    <button type="submit" disabled={pwSaving}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white disabled:opacity-70 transition-all hover:opacity-90 hover:-translate-y-0.5"
                      style={{ background:PRIMARY_BTN, boxShadow:PRIMARY_SHADOW }}>
                      {pwSaving ? "Updating…" : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>

              <button onClick={() => selectTab("activity")}
                className="mt-4 w-full flex items-center justify-between rounded-2xl p-5 hover:shadow-md transition-all group border"
                style={SOFT_BLUE}>
                <div className="text-left flex items-center gap-3">
                  <History size={16} className="text-indigo-600" />
                  <p className="text-sm font-semibold text-slate-900">Review your recent logins and account activity</p>
                </div>
                <ChevronRight size={18} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* ══════════ ACTIVITY LOG ══════════ */}
          {activeTab === "activity" && (
            <div className="max-w-2xl pb-8">
              <div className="rounded-2xl border p-7 md:p-8" style={CARD}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center"><History size={16} className="text-indigo-600" /></span>
                  <h2 className="text-lg font-black text-slate-900">Activity Log</h2>
                </div>
                <p className="text-sm text-slate-500 mb-6 ml-11">Logins, account changes, and enrollments on your account.</p>

                {activityLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 size={24} className="animate-spin text-indigo-400" />
                  </div>
                ) : activity.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <History size={24} className="text-slate-300" />
                    </div>
                    <p className="text-sm text-slate-500">No activity recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {activity.map((item, i) => {
                      const Icon = ACTIVITY_ICONS[item.type] ?? History;
                      return (
                        <div key={item.id} className="flex items-start gap-3 py-3" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(15,23,42,0.06)" }}>
                          <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon size={14} className="text-slate-500" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800">{item.description}</p>
                          </div>
                          <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap" title={timeAgo(item.createdAt)}>{exactTime(item.createdAt)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="px-5 md:px-9 py-5" style={{ borderTop: "1px solid rgba(15,23,42,0.06)" }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>&copy; 2026 GeoVisionPro. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/help" className="hover:text-slate-600 transition-colors">Help &amp; Support</Link>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <Link href="/#contact" className="hover:text-slate-600 transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
