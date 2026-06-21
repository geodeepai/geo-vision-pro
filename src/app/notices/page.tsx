"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";
import {
  Search, Download, Eye, Pin, Bell, Filter,
  Calendar, Building2, ChevronDown, X, FileText,
  AlertTriangle, Info, CheckCircle, Zap, Users,
  ArrowUpDown, Clock, Share2, Printer, ChevronRight,
  BookOpen, Briefcase, GraduationCap, Settings,
} from "lucide-react";

/* ── Types ──────────────────────────────────────────────────────────── */
type Priority = "urgent" | "high" | "medium" | "low";
type Category = "general" | "training" | "consultancy" | "administrative" | "recruitment" | "academic";

interface Notice {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  date: string;
  expiryDate?: string;
  department: string;
  category: Category;
  priority: Priority;
  author: string;
  views: number;
  isPinned: boolean;
  isNew: boolean;
  hasAttachment: boolean;
  attachmentName?: string;
  attachmentSize?: string;
  tags: string[];
}

/* ── Notice data ─────────────────────────────────────────────────────── */
const NOTICES: Notice[] = [
  {
    id: "GVP-2026-001",
    title: "Urgent: Satellite Data Processing Deadline Extended",
    summary: "The submission deadline for LULC mapping deliverables under Project NRDMS-2026 has been extended to 30 June 2026.",
    fullContent: "All teams working on the NRDMS-2026 satellite data processing project are hereby informed that the final deliverable submission deadline has been extended from 15 June 2026 to 30 June 2026. This extension is granted due to cloud cover issues affecting Sentinel-2 imagery acquisition over the study area. All intermediate deliverables (classified rasters, accuracy assessment reports, change detection maps) must be uploaded to the shared GIS server by 25 June 2026. Department heads are requested to update project timelines accordingly. Contact the Project Management Office for clarification.",
    date: "2026-06-10",
    expiryDate: "2026-06-30",
    department: "Remote Sensing Division",
    category: "consultancy",
    priority: "urgent",
    author: "Dr. R. Sharma",
    views: 342,
    isPinned: true,
    isNew: true,
    hasAttachment: true,
    attachmentName: "NRDMS-2026_Extension_Order.pdf",
    attachmentSize: "248 KB",
    tags: ["NRDMS", "Deadline", "Satellite", "LULC"],
  },
  {
    id: "GVP-2026-002",
    title: "New Batch: Google Earth Engine Professional Course",
    summary: "Applications are open for the July 2026 batch of GEE Professional Certification. Limited seats — 30 participants only.",
    fullContent: "Deep Earth Science Training Division is pleased to announce the commencement of the GEE Professional Certification Course — July 2026 Batch. The course spans 12 weeks (5 July – 27 September 2026) covering JavaScript API, Python API, large-scale image processing, time-series analysis, machine learning in GEE, and capstone project. Mode: Online (Live Sessions via Zoom) + Recorded Access. Fee: ₹18,500 (early bird ₹15,999 till 25 June). Eligibility: Graduate in Geography, Environmental Science, Civil Engineering or related field. Register at DeepEarthScience.com/courses. Contact: training@DeepEarthScience.com",
    date: "2026-06-08",
    expiryDate: "2026-07-05",
    department: "Training & Education",
    category: "training",
    priority: "high",
    author: "Prof. A. Mehta",
    views: 891,
    isPinned: true,
    isNew: true,
    hasAttachment: true,
    attachmentName: "GEE-July2026-Brochure.pdf",
    attachmentSize: "1.2 MB",
    tags: ["GEE", "Course", "Certification", "July Batch"],
  },
  {
    id: "GVP-2026-003",
    title: "Tender Notice: UAV Survey Services — Highway Project",
    summary: "Deep Earth Science invites sealed quotations from empanelled UAV service providers for aerial photogrammetry of NH-44 stretch.",
    fullContent: "Deep Earth Science invites sealed quotations from DGCA-approved UAV operators for drone survey services for a 45 km stretch of NH-44. Scope of work includes aerial photogrammetry, orthomosaic generation (2 cm GSD), DEM/DSM creation, and corridor mapping. The survey must be completed within 21 working days of work order issuance. Bid documents can be downloaded from our portal. Last date for submission: 20 June 2026, 5:00 PM IST. Pre-bid meeting: 15 June 2026, 11:00 AM at our Hyderabad office. Contact: procurement@DeepEarthScience.com",
    date: "2026-06-05",
    expiryDate: "2026-06-20",
    department: "Drone & UAV Operations",
    category: "consultancy",
    priority: "high",
    author: "Procurement Office",
    views: 214,
    isPinned: false,
    isNew: true,
    hasAttachment: true,
    attachmentName: "Tender-UAV-NH44-2026.pdf",
    attachmentSize: "856 KB",
    tags: ["Tender", "UAV", "Highway", "Procurement"],
  },
  {
    id: "GVP-2026-004",
    title: "Result Announcement: ArcGIS Pro Certification Exam — May 2026",
    summary: "Results for the ArcGIS Pro Professional Certification Examination (May 2026) are now published on the student portal.",
    fullContent: "The results for ArcGIS Pro Professional Certification Examination conducted on 28–29 May 2026 have been declared. Candidates can check their results by logging into the student portal at DeepEarthScience.com/portal using their enrollment ID. Overall pass percentage: 87.3%. Top scorer: 96/100. Certificates will be dispatched via courier within 15 working days for outstation candidates. Candidates who wish to apply for re-evaluation may submit the application form along with ₹500 fee by 25 June 2026.",
    date: "2026-06-03",
    department: "Training & Education",
    category: "academic",
    priority: "medium",
    author: "Examination Cell",
    views: 1204,
    isPinned: false,
    isNew: true,
    hasAttachment: false,
    tags: ["Results", "ArcGIS", "Certification", "Exam"],
  },
  {
    id: "GVP-2026-005",
    title: "Job Opening: Senior GIS Analyst (3 Positions)",
    summary: "Deep Earth Science is hiring Senior GIS Analysts with 3–5 years experience in ArcGIS Pro, Python scripting, and spatial database management.",
    fullContent: "Deep Earth Science is expanding its Spatial Analytics division and invites applications for the position of Senior GIS Analyst (3 openings). Qualifications: M.Sc./B.Tech in Geography/Geomatics/Civil Engineering. Experience: 3–5 years in GIS project delivery. Required Skills: ArcGIS Pro, QGIS, Python/ArcPy, PostGIS, geodatabase design, cartographic production. Preferred: Experience in government GIS projects, knowledge of DGPS/Total Station, familiarity with OGC standards. Location: Hyderabad / Remote (hybrid). CTC: ₹6–10 LPA (based on experience). Send resume to: careers@DeepEarthScience.com by 30 June 2026.",
    date: "2026-06-01",
    expiryDate: "2026-06-30",
    department: "GIS & Spatial Analysis",
    category: "recruitment",
    priority: "high",
    author: "HR Department",
    views: 567,
    isPinned: false,
    isNew: true,
    hasAttachment: true,
    attachmentName: "Job-Description-GIS-Analyst.pdf",
    attachmentSize: "320 KB",
    tags: ["Jobs", "GIS", "Hiring", "Analyst"],
  },
  {
    id: "GVP-2026-006",
    title: "Webinar: AI in Remote Sensing — Trends & Applications 2026",
    summary: "Free webinar on AI/ML applications in satellite image analysis. Featuring speakers from ISRO, IIT Bombay, and Deep Earth Science.",
    fullContent: "Deep Earth Science proudly presents a free online webinar titled 'AI in Remote Sensing: Trends & Applications 2026'. Date: 18 June 2026 | Time: 3:00 PM – 5:30 PM IST | Platform: Zoom Webinar. Speakers: Dr. P. Krishnan (ISRO SAC), Prof. S. Kumar (IIT Bombay, Geospatial Lab), Ms. N. Rao (Deep Earth Science, AI Lead). Topics: Deep Learning for LULC classification, SAR image interpretation using CNN, Geo-AI for disaster risk assessment, LLM-assisted geospatial data querying. Registration: Free | DeepEarthScience.com/webinar-june2026. Certificate of participation will be issued to all attendees.",
    date: "2026-05-28",
    expiryDate: "2026-06-18",
    department: "AI & Analytics Division",
    category: "training",
    priority: "medium",
    author: "Events Team",
    views: 723,
    isPinned: false,
    isNew: false,
    hasAttachment: true,
    attachmentName: "Webinar-AI-RS-2026-Flyer.pdf",
    attachmentSize: "512 KB",
    tags: ["Webinar", "AI", "ISRO", "Free", "Certificate"],
  },
  {
    id: "GVP-2026-007",
    title: "Office Closure: Eid al-Adha — 17 June 2026",
    summary: "Deep Earth Science offices (Hyderabad & Delhi) will remain closed on 17 June 2026 on account of Eid al-Adha. All project deadlines falling on this date are automatically deferred.",
    fullContent: "Deep Earth Science offices in Hyderabad and Delhi will remain closed on Tuesday, 17 June 2026, on account of Eid al-Adha (Bakrid). This is a gazetted public holiday. All project deadlines, client meetings, and deliverable submissions originally scheduled for 17 June 2026 are automatically rescheduled to the next working day, i.e., 18 June 2026. Ongoing field surveys and drone operations should be rescheduled by respective project managers. For urgent project matters, contact the emergency helpdesk: +91-98XXX-XXXXX.",
    date: "2026-05-25",
    department: "Administration",
    category: "administrative",
    priority: "low",
    author: "Admin Office",
    views: 156,
    isPinned: false,
    isNew: false,
    hasAttachment: false,
    tags: ["Holiday", "Office Closure", "Eid"],
  },
  {
    id: "GVP-2026-008",
    title: "STAAD Pro Structural Analysis — Intensive Weekend Batch",
    summary: "8-week intensive STAAD Pro course starting 6 July 2026 (weekends only). IS Code compliant design included. Limited to 20 participants.",
    fullContent: "Deep Earth Science Training Division announces an intensive weekend batch for STAAD Pro Structural Analysis (July–August 2026). Schedule: Every Saturday & Sunday, 6 July – 30 August 2026 | 9:00 AM – 1:00 PM IST. Mode: Online (live) + Recorded Access. Fee: ₹12,500 (inclusive of GST). Topics: Structural modelling, load combinations as per IS 875, RCC design to IS 456, steel design to IS 800, foundation design, result interpretation and report generation. Eligibility: B.Tech/B.E. Civil Engineering students or graduates. Certificate: Yes, upon 80% attendance and passing the end assessment. Registration closes: 30 June 2026.",
    date: "2026-05-20",
    expiryDate: "2026-07-06",
    department: "Training & Education",
    category: "training",
    priority: "medium",
    author: "Prof. V. Nair",
    views: 388,
    isPinned: false,
    isNew: false,
    hasAttachment: true,
    attachmentName: "STAAD-Weekend-July2026-Schedule.pdf",
    attachmentSize: "410 KB",
    tags: ["STAAD Pro", "Structural", "Weekend", "IS Code"],
  },
  {
    id: "GVP-2026-009",
    title: "System Maintenance: GIS Portal Downtime — 22 June 2026",
    summary: "Scheduled server maintenance on 22 June 2026 (2:00 AM–6:00 AM IST). GIS portal, client dashboard, and data download services will be unavailable.",
    fullContent: "Deep Earth Science IT Department informs all users that the GIS portal, client data dashboard, and project data download services will undergo scheduled maintenance on Sunday, 22 June 2026 from 2:00 AM to 6:00 AM IST (approximately 4 hours). During this window: all portal logins will be disabled, ongoing data uploads should be paused, email services will be functional, emergency support available at it-support@DeepEarthScience.com. This maintenance is required for server upgrades, security patches, and database optimization. We apologize for any inconvenience.",
    date: "2026-05-18",
    department: "IT & Systems",
    category: "administrative",
    priority: "medium",
    author: "IT Department",
    views: 201,
    isPinned: false,
    isNew: false,
    hasAttachment: false,
    tags: ["Maintenance", "Portal", "Downtime", "IT"],
  },
  {
    id: "GVP-2026-010",
    title: "Research Paper Submission: ISPRS Journal — Special Issue",
    summary: "Deep Earth Science researchers are encouraged to submit papers to ISPRS Journal of Photogrammetry special issue on 'AI-Driven Urban Remote Sensing'.",
    fullContent: "The ISPRS Journal of Photogrammetry and Remote Sensing has announced a special issue on 'AI-Driven Urban Remote Sensing — Methods and Applications'. Deep Earth Science encourages its research staff and senior analysts to submit original research papers. Submission portal opens: 1 July 2026. Deadline for submission: 30 September 2026. Topics of interest: Deep learning for building extraction, Urban heat island mapping, Change detection using multi-sensor data, 3D city modelling, Smart city geospatial infrastructure. Research support (writing assistance, figure preparation) available from our Academic Division. Contact: research@DeepEarthScience.com",
    date: "2026-05-15",
    expiryDate: "2026-09-30",
    department: "Research & Development",
    category: "academic",
    priority: "low",
    author: "Research Cell",
    views: 132,
    isPinned: false,
    isNew: false,
    hasAttachment: true,
    attachmentName: "ISPRS-SpecialIssue-CfP.pdf",
    attachmentSize: "290 KB",
    tags: ["Research", "ISPRS", "Publication", "AI"],
  },
  {
    id: "GVP-2026-011",
    title: "Fee Revision: Professional Certification Courses — July 2026",
    summary: "Course fees for all professional certification programs will be revised upward by 8% effective from the July 2026 batch onwards.",
    fullContent: "Deep Earth Science Training Division informs prospective students that professional certification course fees will be revised upward by approximately 8% for batches commencing from July 2026 onwards. This revision is necessitated by increased infrastructure costs, upgraded software licenses, and enhanced course content. The current fee structure remains applicable for all enrollments completed before 30 June 2026. Students enrolling before the deadline will be locked into the current pricing even if the batch starts after 1 July 2026. Early bird discounts will continue for eligible students. For detailed fee schedules, contact: training@DeepEarthScience.com",
    date: "2026-05-10",
    department: "Finance & Accounts",
    category: "administrative",
    priority: "high",
    author: "Finance Office",
    views: 445,
    isPinned: false,
    isNew: false,
    hasAttachment: true,
    attachmentName: "Fee-Structure-July2026.pdf",
    attachmentSize: "180 KB",
    tags: ["Fee Revision", "Courses", "Finance", "July 2026"],
  },
  {
    id: "GVP-2026-012",
    title: "Empanelment Notice: GIS Consultants & Freelance Analysts",
    summary: "Deep Earth Science invites applications from qualified GIS professionals for empanelment as associate consultants for project-based assignments.",
    fullContent: "Deep Earth Science is building a panel of qualified GIS consultants and remote sensing specialists for project-based engagements. Eligible candidates: M.Sc./B.Tech in Geography, Geomatics, Environmental Science; Minimum 2 years of relevant experience; Proficiency in ArcGIS Pro or QGIS (mandatory), additional tools (Google Earth Engine, ENVI, ERDAS, AutoCAD Civil 3D) preferred. Nature of work: Short-term project assignments (2–6 months), remote/hybrid. Remuneration: Competitive, project-based. How to apply: Send CV + portfolio to empanelment@DeepEarthScience.com with subject line 'GIS Consultant Empanelment 2026'. Last date: 15 July 2026.",
    date: "2026-05-05",
    expiryDate: "2026-07-15",
    department: "HR & Administration",
    category: "recruitment",
    priority: "medium",
    author: "HR Department",
    views: 318,
    isPinned: false,
    isNew: false,
    hasAttachment: true,
    attachmentName: "Empanelment-Form-2026.pdf",
    attachmentSize: "225 KB",
    tags: ["Empanelment", "Freelance", "GIS", "Jobs"],
  },
];

/* ── Constants ───────────────────────────────────────────────────────── */
const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  urgent: { label: "Urgent",  color: "#dc2626", bg: "rgba(220,38,38,0.10)",  icon: <AlertTriangle size={11} /> },
  high:   { label: "High",    color: "#ea580c", bg: "rgba(234,88,12,0.10)",  icon: <Zap size={11} /> },
  medium: { label: "Medium",  color: "#2563eb", bg: "rgba(37,99,235,0.10)",  icon: <Info size={11} /> },
  low:    { label: "Low",     color: "#059669", bg: "rgba(5,150,105,0.10)",  icon: <CheckCircle size={11} /> },
};

const CATEGORY_CONFIG: Record<Category, { label: string; icon: React.ReactNode; color: string }> = {
  general:        { label: "General",        icon: <Bell size={13} />,         color: "#64748b" },
  training:       { label: "Training",       icon: <GraduationCap size={13} />, color: "#7c3aed" },
  consultancy:    { label: "Consultancy",    icon: <Briefcase size={13} />,    color: "#2563eb" },
  administrative: { label: "Administrative", icon: <Settings size={13} />,     color: "#d97706" },
  recruitment:    { label: "Recruitment",    icon: <Users size={13} />,        color: "#059669" },
  academic:       { label: "Academic",       icon: <BookOpen size={13} />,     color: "#0891b2" },
};

const DEPARTMENTS = ["All Departments", ...Array.from(new Set(NOTICES.map(n => n.department)))];
const CATEGORIES: { id: "all" | Category; label: string; icon: React.ReactNode }[] = [
  { id: "all",            label: "All",            icon: <Bell size={14} /> },
  { id: "training",       label: "Training",       icon: <GraduationCap size={14} /> },
  { id: "consultancy",    label: "Consultancy",    icon: <Briefcase size={14} /> },
  { id: "recruitment",    label: "Recruitment",    icon: <Users size={14} /> },
  { id: "academic",       label: "Academic",       icon: <BookOpen size={14} /> },
  { id: "administrative", label: "Administrative", icon: <Settings size={14} /> },
];

const SORT_OPTIONS = [
  { value: "newest",   label: "Newest First" },
  { value: "oldest",   label: "Oldest First" },
  { value: "priority", label: "By Priority" },
  { value: "views",    label: "Most Viewed" },
];

const PRIORITY_ORDER: Record<Priority, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

/* ── PDF download ────────────────────────────────────────────────────── */
function downloadPDF(notice: Notice) {
  const pc = PRIORITY_CONFIG[notice.priority];
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${notice.id} — ${notice.title}</title>
<style>
  @page { margin: 28mm 24mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; font-size: 13px; line-height: 1.6; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1e3a8a; padding-bottom: 16px; margin-bottom: 22px; }
  .logo-row { display: flex; align-items: center; gap: 10px; }
  .logo-box { width: 36px; height: 36px; background: linear-gradient(135deg,#3b82f6,#4f46e5); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .logo-box svg { width: 20px; height: 20px; }
  .org-name { font-size: 18px; font-weight: 900; color: #0f172a; }
  .org-name .pro { color: #3b82f6; }
  .org-sub { font-size: 10px; color: #64748b; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
  .notice-id { text-align: right; }
  .notice-id .id { font-size: 12px; font-weight: 800; color: #2563eb; letter-spacing: 0.06em; }
  .notice-id .date { font-size: 11px; color: #64748b; margin-top: 3px; }
  .priority-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: ${pc.bg}; color: ${pc.color}; border: 1px solid ${pc.color}40; margin-bottom: 10px; }
  .title { font-size: 20px; font-weight: 900; color: #0f172a; margin-bottom: 14px; line-height: 1.3; }
  .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; margin-bottom: 20px; padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
  .meta-item label { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; display: block; margin-bottom: 2px; }
  .meta-item span { font-size: 12px; color: #0f172a; font-weight: 600; }
  .divider { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }
  .section-heading { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #2563eb; margin-bottom: 8px; }
  .content { color: #374151; font-size: 13px; line-height: 1.7; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
  .tag { font-size: 10px; padding: 2px 8px; background: #eff6ff; color: #1d4ed8; border-radius: 20px; border: 1px solid #bfdbfe; font-weight: 600; }
  .footer { margin-top: 28px; padding-top: 12px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; }
  .watermark { color: #e2e8f0; font-size: 9px; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo-row">
      <div class="logo-box">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.5"/>
          <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <circle cx="12" cy="12" r="2" fill="white"/>
        </svg>
      </div>
      <div>
        <div class="org-name">DeepEarth<span class="science">Science</span></div>
        <div class="org-sub">Remote Sensing · GIS · AI · Training</div>
      </div>
    </div>
    <div class="notice-id">
      <div class="id">${notice.id}</div>
      <div class="date">Issued: ${new Date(notice.date).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>
      ${notice.expiryDate ? `<div class="date">Valid till: ${new Date(notice.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</div>` : ""}
    </div>
  </div>

  <div class="priority-badge">${pc.label} Priority</div>
  <div class="title">${notice.title}</div>

  <div class="meta-grid">
    <div class="meta-item"><label>Department</label><span>${notice.department}</span></div>
    <div class="meta-item"><label>Category</label><span>${CATEGORY_CONFIG[notice.category].label}</span></div>
    <div class="meta-item"><label>Issued By</label><span>${notice.author}</span></div>
    <div class="meta-item"><label>Notice ID</label><span>${notice.id}</span></div>
  </div>

  <hr class="divider">
  <p class="section-heading">Notice Details</p>
  <p class="content">${notice.fullContent.replace(/\n/g, "<br>")}</p>

  <div class="tags">
    ${notice.tags.map(t => `<span class="tag">${t}</span>`).join("")}
  </div>

  <div class="footer">
    <span>Deep Earth Science · info@DeepEarthScience.com · DeepEarthScience.com</span>
    <span class="watermark">Official Notice · ${notice.id}</span>
  </div>
</body>
</html>`;

  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 600);
}

/* ── Copy link ───────────────────────────────────────────────────────── */
function copyLink(id: string) {
  navigator.clipboard.writeText(`${window.location.origin}/notices#${id}`).catch(() => {});
}

/* ── Notice detail modal ─────────────────────────────────────────────── */
function NoticeModal({ notice, onClose }: { notice: Notice; onClose: () => void }) {
  const pc = PRIORITY_CONFIG[notice.priority];
  const cc = CATEGORY_CONFIG[notice.category];
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl bg-white"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 bg-slate-100 text-slate-400 hover:bg-slate-200"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="px-7 pt-7 pb-5 border-b border-black/[0.07] bg-slate-50 rounded-t-3xl">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-black tracking-widest uppercase text-slate-400">{notice.id}</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
              style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.color}35` }}>
              {pc.icon}{pc.label}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1"
              style={{ background: `${cc.color}10`, color: cc.color, border: `1px solid ${cc.color}25` }}>
              {cc.icon} {cc.label}
            </span>
          </div>
          <h2 className="text-xl font-black leading-snug text-slate-900 mb-4">{notice.title}</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar size={12} />{new Date(notice.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            <span className="flex items-center gap-1.5"><Building2 size={12} />{notice.department}</span>
            <span className="flex items-center gap-1.5"><Users size={12} />{notice.author}</span>
            <span className="flex items-center gap-1.5"><Eye size={12} />{notice.views.toLocaleString()} views</span>
            {notice.expiryDate && (
              <span className="flex items-center gap-1.5 text-amber-500"><Clock size={12} />Expires {new Date(notice.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-5">
          <p className="text-sm leading-relaxed mb-5 text-slate-600">
            {notice.fullContent}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {notice.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                #{tag}
              </span>
            ))}
          </div>

          {/* Attachment */}
          {notice.hasAttachment && (
            <div className="flex items-center gap-3 p-3.5 rounded-xl mb-5 bg-slate-50 border border-slate-200">
              <FileText size={16} className="text-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{notice.attachmentName}</p>
                <p className="text-xs text-slate-400">{notice.attachmentSize}</p>
              </div>
              <button onClick={() => downloadPDF(notice)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
                style={{ background: "#2563eb" }}>
                <Download size={12} /> Download
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button onClick={() => downloadPDF(notice)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#2563eb" }}>
              <Printer size={14} /> Print / Save PDF
            </button>
            <button onClick={() => copyLink(notice.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 transition-all hover:bg-slate-50">
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  Notice Board Page                                                     */
/* ══════════════════════════════════════════════════════════════════════ */
export default function NoticesPage() {
  const [search,     setSearch]     = useState("");
  const [category,   setCategory]   = useState<"all" | Category>("all");
  const [priority,   setPriority]   = useState<"all" | Priority>("all");
  const [department, setDepartment] = useState("All Departments");
  const [sort,       setSort]       = useState("newest");
  const [showFilter, setShowFilter] = useState(false);
  const [page,       setPage]       = useState(1);
  const [modal,      setModal]      = useState<Notice | null>(null);
  const [copied,     setCopied]     = useState<string | null>(null);
  const PER_PAGE = 6;

  /* ── Filtered + sorted list ── */
  const filtered = useMemo(() => {
    let list = NOTICES.filter(n => {
      if (search) {
        const q = search.toLowerCase();
        if (!n.title.toLowerCase().includes(q) &&
            !n.summary.toLowerCase().includes(q) &&
            !n.id.toLowerCase().includes(q) &&
            !n.department.toLowerCase().includes(q) &&
            !n.tags.some(t => t.toLowerCase().includes(q))) return false;
      }
      if (category   !== "all" && n.category   !== category)   return false;
      if (priority   !== "all" && n.priority   !== priority)   return false;
      if (department !== "All Departments" && n.department !== department) return false;
      return true;
    });

    list.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      if (sort === "newest")   return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sort === "oldest")   return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort === "priority") return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sort === "views")    return b.views - a.views;
      return 0;
    });

    return list;
  }, [search, category, priority, department, sort]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < filtered.length;

  /* Stats */
  const urgentCount  = NOTICES.filter(n => n.priority === "urgent").length;
  const thisWeek     = NOTICES.filter(n => {
    const d = new Date(n.date);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 7 * 86400000;
  }).length;
  const pinnedCount  = NOTICES.filter(n => n.isPinned).length;

  function handleCopy(id: string) {
    copyLink(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  const activeFilters = (category !== "all" ? 1 : 0) + (priority !== "all" ? 1 : 0) + (department !== "All Departments" ? 1 : 0);

  return (
    <>

      <SubpageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Notice Board" }]}
        badge="Official Notices"
        title="Notice Board"
        highlight="Board"
        desc="Official announcements, tenders, course updates, and institutional notices from Deep Earth Science."
        accent="#2563eb"
        stats={[
          { val: String(NOTICES.length), label: "Total Notices" },
          { val: String(urgentCount), label: "Urgent" },
          { val: String(thisWeek), label: "This Week" },
          { val: String(pinnedCount), label: "Pinned" },
        ]}
        ctaLabel="Browse Notices"
        ctaHref="#notices"
      />

      {/* ── Main content ── */}
      <div id="notices" className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          {/* ── Search + filters bar ── */}
          <div className="flex flex-col gap-3 mb-6">

            {/* Search row */}
            <div className="flex gap-2.5">
              <div className="flex-1 relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search notices by title, ID, department, keyword…"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all text-slate-900 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filter toggle */}
              <button
                onClick={() => setShowFilter(p => !p)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex-shrink-0"
                style={{
                  background: showFilter ? "rgba(37,99,235,0.08)" : "rgba(0,0,0,0.04)",
                  border: showFilter ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(0,0,0,0.09)",
                  color: showFilter ? "#2563eb" : "#64748b",
                }}
              >
                <Filter size={14} />
                <span className="hidden sm:inline">Filters</span>
                {activeFilters > 0 && (
                  <span className="w-5 h-5 rounded-full text-xs font-black flex items-center justify-center" style={{ background: "#2563eb", color: "#fff" }}>{activeFilters}</span>
                )}
              </button>

              {/* Sort */}
              <div className="relative flex-shrink-0">
                <ArrowUpDown size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="pl-8 pr-8 py-2.5 rounded-xl text-sm font-semibold outline-none appearance-none cursor-pointer text-slate-700 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>

            {/* Expandable filter panel */}
            {showFilter && (
              <div className="rounded-2xl border p-4 grid sm:grid-cols-2 gap-4 bg-slate-50"
                style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                {/* Priority */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2.5 text-slate-500">Priority</p>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "urgent", "high", "medium", "low"] as const).map(p => {
                      const active = priority === p;
                      const cfg = p !== "all" ? PRIORITY_CONFIG[p] : null;
                      return (
                        <button
                          key={p}
                          onClick={() => { setPriority(p); setPage(1); }}
                          className="px-3 py-1 rounded-lg text-xs font-bold transition-all capitalize flex items-center gap-1.5"
                          style={{
                            background: active ? (cfg?.bg ?? "rgba(0,0,0,0.08)") : "rgba(0,0,0,0.04)",
                            color: active ? (cfg?.color ?? "#0f172a") : "#64748b",
                            border: `1px solid ${active ? (cfg?.color ?? "rgba(0,0,0,0.2)") + "50" : "rgba(0,0,0,0.08)"}`,
                          }}
                        >
                          {cfg?.icon} {p === "all" ? "All" : cfg?.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Department */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2.5 text-slate-500">Department</p>
                  <div className="relative">
                    <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    <select
                      value={department}
                      onChange={e => { setDepartment(e.target.value); setPage(1); }}
                      className="w-full pl-8 pr-8 py-2 rounded-xl text-xs font-semibold outline-none appearance-none cursor-pointer text-slate-700 bg-white"
                      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                    >
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                  </div>
                </div>
                {/* Clear */}
                {activeFilters > 0 && (
                  <button
                    onClick={() => { setPriority("all"); setDepartment("All Departments"); setPage(1); }}
                    className="sm:col-span-2 flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: "#dc2626" }}
                  >
                    <X size={12} /> Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Category tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 hide-scrollbar">
              {CATEGORIES.map(c => {
                const active = category === c.id;
                const count = c.id === "all" ? NOTICES.length : NOTICES.filter(n => n.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => { setCategory(c.id); setPage(1); }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0"
                    style={{
                      background: active ? "rgba(37,99,235,0.08)" : "rgba(0,0,0,0.03)",
                      color: active ? "#2563eb" : "#64748b",
                      border: active ? "1px solid rgba(37,99,235,0.25)" : "1px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    {c.icon} {c.label}
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black"
                      style={{ background: active ? "rgba(37,99,235,0.15)" : "rgba(0,0,0,0.05)", color: active ? "#2563eb" : "#64748b" }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Results header ── */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-slate-500">
              Showing <span className="text-slate-900">{paginated.length}</span> of <span className="text-slate-900">{filtered.length}</span> notices
            </p>
            {(search || activeFilters > 0) && (
              <button
                onClick={() => { setSearch(""); setPriority("all"); setDepartment("All Departments"); setCategory("all"); setPage(1); }}
                className="flex items-center gap-1.5 text-xs font-bold"
                style={{ color: "#dc2626" }}
              >
                <X size={12} /> Reset all
              </button>
            )}
          </div>

          {/* ── Notice cards grid ── */}
          {paginated.length === 0 ? (
            <div className="text-center py-24 rounded-3xl border border-slate-200 bg-slate-50">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-black text-slate-900 mb-2">No notices found</h3>
              <p className="text-sm text-slate-400">Try different search terms or clear the filters.</p>
            </div>
          ) : (
            <div id="pinned" className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginated.map(notice => {
                const pc = PRIORITY_CONFIG[notice.priority];
                const cc = CATEGORY_CONFIG[notice.category];
                return (
                  <div
                    key={notice.id}
                    className="group relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 bg-white"
                    style={{ borderColor: "rgba(0,0,0,0.07)", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${pc.color}35`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px rgba(0,0,0,0.08)`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.07)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"; }}
                  >
                    {/* Top priority accent */}
                    <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${pc.color},${pc.color}44)` }} />

                    {/* Card header */}
                    <div className="px-5 pt-4 pb-3 border-b border-black/[0.05] bg-slate-50">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {notice.isPinned && (
                            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(245,158,11,0.1)", color: "#d97706", border: "1px solid rgba(245,158,11,0.25)" }}>
                              <Pin size={8} /> Pinned
                            </span>
                          )}
                          {notice.isNew && (
                            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full animate-pulse"
                              style={{ background: "rgba(5,150,105,0.1)", color: "#059669", border: "1px solid rgba(5,150,105,0.2)" }}>
                              ✦ New
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-black tracking-wider flex-shrink-0 text-slate-400">{notice.id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                          style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.color}35` }}>
                          {pc.icon} {pc.label}
                        </span>
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{ background: `${cc.color}10`, color: cc.color, border: `1px solid ${cc.color}25` }}>
                          {cc.icon} {cc.label}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-5 py-4 flex-1 flex flex-col">
                      <h3 className="font-black text-sm leading-snug mb-2 text-slate-900 line-clamp-2">{notice.title}</h3>
                      <p className="text-xs leading-relaxed mb-4 line-clamp-3 flex-1 text-slate-500">{notice.summary}</p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] mb-4 text-slate-400">
                        <span className="flex items-center gap-1"><Calendar size={10} />{new Date(notice.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                        <span className="flex items-center gap-1"><Building2 size={10} />{notice.department.split(" ")[0]}</span>
                        <span className="flex items-center gap-1"><Eye size={10} />{notice.views.toLocaleString()}</span>
                        {notice.expiryDate && (
                          <span className="flex items-center gap-1 text-amber-500"><Clock size={10} />Exp. {new Date(notice.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
                        )}
                      </div>

                      {/* Attachment chip */}
                      {notice.hasAttachment && (
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg mb-3 w-fit"
                          style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}>
                          <FileText size={10} className="text-blue-500" />
                          <span className="text-[10px] font-semibold text-blue-600 truncate max-w-[160px]">{notice.attachmentName}</span>
                          <span className="text-[9px] text-slate-400">{notice.attachmentSize}</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {notice.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-black/[0.06]">
                        <button
                          onClick={() => setModal(notice)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90"
                          style={{ background: "#2563eb", color: "#fff" }}
                        >
                          <ChevronRight size={13} /> View Details
                        </button>
                        <button
                          onClick={() => downloadPDF(notice)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90 flex-shrink-0"
                          style={{ background: "#059669", color: "#fff" }}
                          title="Download PDF"
                        >
                          <Download size={13} /> PDF
                        </button>
                        <button
                          onClick={() => handleCopy(notice.id)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all flex-shrink-0 bg-slate-100 border border-slate-200"
                          style={{ color: copied === notice.id ? "#059669" : "#64748b" }}
                          title="Copy link"
                        >
                          {copied === notice.id ? <CheckCircle size={13} /> : <Share2 size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Load more ── */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage(p => p + 1)}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5 text-white"
                style={{ background: "#2563eb", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}
              >
                <ChevronDown size={16} /> Load More ({filtered.length - paginated.length} remaining)
              </button>
            </div>
          )}

          {/* ── Back to home ── */}
          <div className="flex justify-center mt-12 pt-8 border-t border-black/[0.07]">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 hover:border-slate-300 transition-all"
            >
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {modal && <NoticeModal notice={modal} onClose={() => setModal(null)} />}
    </>
  );
}
