"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";
import {
  downloadPressRelease,
  downloadPublication,
  downloadTranscript,
  downloadNewsletter,
  downloadEventPDF,
  downloadSurveyPDF,
  downloadPartnerPDF,
  downloadSocialKit,
  downloadBlog,
  downloadMediaResource,
  downloadICS,
} from "@/lib/gvpPDF";

/* ── Design tokens ────────────────────────────────────────────────── */
const BG      = "#ffffff";
const ACCENT  = "#1d9e75";
const TEXT    = "#64748b";
const CARD    = "rgba(255,255,255,0.97)";
const BORDER  = "rgba(0,0,0,0.07)";
const HOVER_T = "#059669";

/* ── Section list ─────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "press-releases",     label: "Press Releases" },
  { id: "recently-published", label: "Recently Published" },
  { id: "videos",             label: "Video Series" },
  { id: "podcasts",           label: "Podcasts & Webinars" },
  { id: "blogs",              label: "GIS Blogs" },
  { id: "newsletters",        label: "Newsletters" },
  { id: "social",             label: "Social Media" },
  { id: "media",              label: "Media Resources" },
  { id: "events",             label: "Events" },
  { id: "field-updates",      label: "Field Updates" },
  { id: "partners",           label: "Partner Program" },
];

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */
const PRESS = [
  { headline: "DeepEarthScience Launches New Satellite Mapping Platform",      date: "June 10, 2026", body: "DeepEarthScience announced the launch of its next-generation satellite mapping platform, offering real-time imagery processing and AI-driven land analysis across India, covering over 3.2 million sq km. The platform integrates Sentinel-2, Landsat-9, and ISRO Resourcesat-2A data streams with cloud-based processing, reducing turnaround time for LULC deliverables by up to 70%. Clients across agriculture, urban planning, and disaster management sectors will have access to the platform from July 2026." },
  { headline: "DeepEarthScience Partners with National Survey Authority",       date: "May 22, 2026",  body: "DeepEarthScience has entered a strategic MoU with the National Survey of India to deliver high-accuracy cadastral mapping for 12 states, benefiting 40 million land parcels across urban and rural zones. Under the agreement, DeepEarthScience will provide satellite imagery analysis, ground-truth verification, and GIS database integration using the NSI's national coordinate framework." },
  { headline: "DeepEarthScience Wins Best GIS Innovation Award 2026",          date: "April 14, 2026", body: "At the Annual Geospatial Excellence Awards held in New Delhi, DeepEarthScience received the Best GIS Innovation award for its AI-powered urban change detection system, beating 27 other nominees. The system uses deep-learning classification on multi-temporal Sentinel-2 imagery to detect and flag urban expansion with 94.6% accuracy at 10 m resolution." },
  { headline: "DeepEarthScience Expands to Northeast India Operations",        date: "March 5, 2026",  body: "DeepEarthScience has established regional offices in Guwahati and Shillong to serve the growing demand for geospatial services across the eight northeastern states. The expansion includes dedicated teams for forest cover monitoring, terrain mapping, and disaster risk assessment — critical needs for this ecologically sensitive and topographically complex region." },
  { headline: "New GIS Data Portal Launch Announcement",                   date: "February 18, 2026", body: "DeepEarthScience has launched a new client-facing GIS data portal at portal.DeepEarthScience.com, enabling direct download of project deliverables, live survey dashboards, and curated satellite imagery subsets. The portal features role-based access control, project tracking, and a metadata catalogue aligned with OGC and ISO 19115 standards." },
];

const PUBLISHED = [
  { title: "Urban Expansion Analysis Using Remote Sensing 2026", tag: "Research Report", date: "June 5, 2026",    pages: 24, size: "2.4 MB", desc: "A comprehensive analysis of urban sprawl across 8 Indian metro cities using multi-temporal Sentinel-2 imagery and ML classifiers, revealing a 34% net urban growth over five years." },
  { title: "GIS in Disaster Management: A Field Report",          tag: "Field Report",    date: "May 18, 2026",   pages: 18, size: "1.8 MB", desc: "Field findings from the 2025 Assam flood response documenting how real-time GIS dashboards reduced emergency response time by 41% across three flood-affected districts." },
  { title: "Satellite Data Accuracy White Paper",                 tag: "White Paper",     date: "April 30, 2026", pages: 12, size: "1.1 MB", desc: "Methodology and accuracy benchmarks for multi-sensor satellite data fusion comparing Sentinel-2, LISS-IV, and Planet imagery across eight land-cover categories." },
  { title: "Land Degradation Study – Eastern India 2026",         tag: "Research Report", date: "March 12, 2026", pages: 30, size: "3.1 MB", desc: "Multitemporal NDVI and soil erosion modelling across five eastern states using MODIS and Sentinel-2 to quantify land degradation hotspots over a 15-year period." },
  { title: "Coastal Zone Mapping Technical Guide",                tag: "Technical Guide", date: "February 8, 2026",pages: 20, size: "2.0 MB", desc: "Step-by-step technical guide for coastal zone mapping using UAV photogrammetry and satellite shoreline extraction techniques, following MoEF coastal regulation norms." },
];

const VIDEOS = [
  { title: "How GIS is Changing Urban Planning",          duration: "12 min", month: "June 2026" },
  { title: "Introduction to Remote Sensing",              duration: "18 min", month: "May 2026" },
  { title: "Field Survey Best Practices",                 duration: "22 min", month: "May 2026" },
  { title: "Drone Mapping from Sky to Map",               duration: "15 min", month: "April 2026" },
  { title: "Satellite Image Classification Tutorial",     duration: "25 min", month: "March 2026" },
  { title: "GIS for Environmental Monitoring",            duration: "20 min", month: "March 2026" },
];

const PODCASTS = [
  { title: "Mapping the Future – Episode 12",    type: "Podcast", date: "May 30, 2026",   duration: "45 min" },
  { title: "GIS in Climate Change Research",      type: "Webinar", date: "May 15, 2026",   duration: "60 min" },
  { title: "Remote Sensing Q&A Session",          type: "Webinar", date: "April 25, 2026", duration: "30 min" },
  { title: "Urban GIS Applications",              type: "Podcast", date: "April 10, 2026", duration: "40 min" },
  { title: "Drone Survey Techniques",             type: "Webinar", date: "March 20, 2026", duration: "55 min" },
  { title: "Mapping the Future – Episode 13",    type: "Podcast", date: "March 5, 2026",   duration: "48 min" },
];

const BLOGS = [
  { title: "Top 5 GIS Tools for 2026",                 author: "Admin",         date: "June 8, 2026",    cat: "GIS",            excerpt: "The geospatial software landscape has never been more competitive. We break down the five tools every GIS professional should master this year." },
  { title: "How Satellite Imagery Helps Farmers",       author: "Dr. S. Kumar",  date: "May 20, 2026",   cat: "Remote Sensing",  excerpt: "Precision agriculture is transforming crop yield management. Discover how Sentinel-2 NDVI composites are helping smallholder farmers in Punjab." },
  { title: "Understanding Coordinate Systems",          author: "A. Mehta",      date: "May 5, 2026",    cat: "GIS",            excerpt: "WGS84, UTM, India's Everest spheroid — coordinate systems can be confusing. This guide clears up the most common misconceptions for GIS professionals." },
  { title: "Future of Drone Surveys in India",          author: "R. Sharma",     date: "April 22, 2026", cat: "Survey",         excerpt: "With DGCA liberalising drone regulations, aerial photogrammetry is set to transform project surveys in infrastructure and urban planning sectors." },
  { title: "Remote Sensing in Flood Prediction",        author: "Dr. P. Rao",    date: "April 8, 2026",  cat: "Remote Sensing",  excerpt: "How Synthetic Aperture Radar (SAR) imagery from Sentinel-1 is enabling near real-time flood extent mapping and early warning system integration." },
  { title: "Open Source GIS: QGIS vs ArcGIS",          author: "Admin",         date: "March 15, 2026", cat: "Tech",           excerpt: "A practical head-to-head comparison of the two most widely used GIS platforms — from basic mapping to advanced spatial analysis and automation." },
];

const NEWSLETTERS = [
  { title: "DeepEarth Monthly – June 2026",      month: "June 2026",     edition: 18, size: "3.2 MB" },
  { title: "DeepEarth Monthly – May 2026",       month: "May 2026",      edition: 17, size: "2.9 MB" },
  { title: "DeepEarth Monthly – April 2026",     month: "April 2026",    edition: 16, size: "3.0 MB" },
  { title: "DeepEarth Monthly – March 2026",     month: "March 2026",    edition: 15, size: "2.7 MB" },
  { title: "DeepEarth Monthly – February 2026",  month: "February 2026", edition: 14, size: "2.8 MB" },
  { title: "DeepEarth Monthly – January 2026",   month: "January 2026",  edition: 13, size: "3.1 MB" },
];

const SOCIALS = [
  { platform: "LinkedIn",     handle: "DeepEarthScience",       url: "#", desc: "Follow us for GIS updates, job openings, and industry insights.",        dot: "#0077b5" },
  { platform: "Twitter / X",  handle: "@DeepEarthScience",       url: "#", desc: "Real-time geo-tweets, quick tips, and breaking geospatial news.",        dot: "#1da1f2" },
  { platform: "YouTube",      handle: "DeepEarthScience",       url: "#", desc: "Watch our full tutorial series, webinar recordings, and case studies.",    dot: "#ff0000" },
  { platform: "Instagram",    handle: "@DeepEarthScience",       url: "#", desc: "Behind-the-scenes field photos, drone footage, and team moments.",        dot: "#e1306c" },
  { platform: "Facebook",     handle: "DeepEarthScience India",  url: "#", desc: "Join our community, join discussions, and get event updates.",            dot: "#1877f2" },
];

const MEDIA_ASSETS = [
  { name: "DeepEarthScience Logo Pack",          formats: "PNG, SVG",  size: "2.4 MB", file: "GVP-LogoPack-2026.pdf" },
  { name: "Brand Guidelines Document",       formats: "PDF",       size: "5.1 MB", file: "GVP-BrandGuidelines-2026.pdf" },
  { name: "Press Kit (Full)",                formats: "ZIP",       size: "18.7 MB",file: "GVP-PressKit-2026.pdf" },
  { name: "High-Resolution Images",          formats: "ZIP (JPEG)",size: "34.2 MB",file: "GVP-Images-2026.pdf" },
  { name: "Fact Sheet 2026",                 formats: "PDF",       size: "1.2 MB", file: "GVP-FactSheet-2026.pdf" },
  { name: "Company Profile Document",        formats: "PDF",       size: "4.0 MB", file: "GVP-CompanyProfile-2026.pdf" },
  { name: "Product Brochure",                formats: "PDF",       size: "3.8 MB", file: "GVP-ProductBrochure-2026.pdf" },
];

const EVENTS = [
  { name: "GIS India Summit 2026",           date: "Aug 15, 2026",  location: "New Delhi",   type: "Conference", desc: "India's largest annual geospatial conference. DeepEarthScience is a Silver Sponsor and will present three research papers.", upcoming: true },
  { name: "Remote Sensing Workshop",          date: "July 5, 2026",  location: "Kolkata",     type: "Workshop",   desc: "A one-day intensive workshop on Sentinel-2 image analysis and QGIS workflows, limited to 40 participants.",                upcoming: true },
  { name: "DeepEarthScience Annual Meet 2026",    date: "Sept 20, 2026", location: "Bangalore",   type: "Conference", desc: "Our annual stakeholder meeting featuring project reviews, research presentations, and partner networking sessions.",         upcoming: true },
  { name: "Drone Mapping Expo 2026",          date: "Oct 10, 2026",  location: "Mumbai",      type: "Expo",       desc: "South Asia's premier drone technology expo. DeepEarthScience will showcase its latest UAV photogrammetry workflows.",          upcoming: true },
  { name: "International GIS Conference",     date: "Nov 3, 2026",   location: "Hyderabad",   type: "Conference", desc: "A global gathering of geospatial professionals discussing AI, climate change mapping, and smart city infrastructure.",       upcoming: true },
  { name: "GIS for Agriculture Seminar",      date: "Dec 1, 2026",   location: "Pune",        type: "Webinar",    desc: "Half-day seminar on satellite-based crop monitoring, yield estimation, and irrigation planning using GIS.",                  upcoming: true },
];

const FIELD = [
  { project: "Coastal Erosion Survey – Odisha",    location: "Puri District, Odisha",    status: "Ongoing",   updated: "June 10, 2026", desc: "Multi-temporal shoreline analysis using Landsat-9 and UAV LiDAR to quantify erosion rates along 48 km of coastline." },
  { project: "Urban Mapping – Kolkata North",       location: "Kolkata, West Bengal",     status: "Completed", updated: "May 28, 2026",  desc: "High-resolution orthophoto and cadastral mapping of 14 sq km covering wards 1–34 in North Kolkata. Final report submitted." },
  { project: "Forest Cover Assessment – Jharkhand", location: "Ranchi & Lohardaga",      status: "Upcoming",  updated: "July 1, 2026",  desc: "Bi-annual forest cover change detection using Sentinel-2 across 9,200 sq km of reserved and protected forest land." },
  { project: "River Basin Survey – Ganga Delta",    location: "Sundarbans, West Bengal",  status: "Ongoing",   updated: "June 8, 2026",  desc: "Hydrological survey combining drone bathymetry and satellite DEM to map channel migration in the Ganga-Brahmaputra delta." },
  { project: "Agricultural Land Survey – Punjab",   location: "Ludhiana & Patiala",       status: "Completed", updated: "May 15, 2026",  desc: "Crop-type classification and cropping-pattern analysis over 6,400 sq km using multi-date Sentinel-2 imagery and field sampling." },
  { project: "Hill Terrain Mapping – Darjeeling",   location: "Darjeeling, West Bengal",  status: "Upcoming",  updated: "July 15, 2026", desc: "High-resolution DEM generation via UAV-based photogrammetry for slope stability analysis and landslide hazard zonation." },
];

const STATUS_CFG: Record<string, { color: string; bg: string }> = {
  Ongoing:   { color: ACCENT,    bg: "rgba(29,158,117,0.12)"  },
  Completed: { color: "#2563eb", bg: "rgba(37,99,235,0.12)"   },
  Upcoming:  { color: "#d97706", bg: "rgba(217,119,6,0.12)"   },
};

const EVENT_TYPE_COLOR: Record<string, string> = {
  Conference: ACCENT, Workshop: "#7c3aed", Expo: "#ea580c", Webinar: "#2563eb",
};

/* ══════════════════════════════════════════════════════════════════
   SHARED UI ATOMS
   ══════════════════════════════════════════════════════════════════ */
function SectionHead({ id, title, sub }: { id: string; title: string; sub?: string }) {
  return (
    <div id={id} className="mb-8 scroll-mt-28">
      <div className="h-0.5 w-10 mb-4 rounded-full" style={{ background: ACCENT }} />
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{title}</h2>
      {sub && <p className="text-sm" style={{ color: TEXT }}>{sub}</p>}
    </div>
  );
}

function Divider() { return <div className="my-14 h-px" style={{ background: BORDER }} />; }

function BackTop() {
  return (
    <div className="mt-10 pt-5 flex justify-end" style={{ borderTop: `1px solid ${BORDER}` }}>
      <a href="#news-top" className="text-xs font-bold transition-colors" style={{ color: TEXT }}
        onMouseEnter={e => (e.currentTarget.style.color = HOVER_T)}
        onMouseLeave={e => (e.currentTarget.style.color = TEXT)}>
        ↑ Back to top
      </a>
    </div>
  );
}

function Tag({ label, color = ACCENT }: { label: string; color?: string }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      {label}
    </span>
  );
}

/* Green download button */
function DlBtn({ label, onClick, small }: { label: string; onClick: () => void; small?: boolean }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1.5 font-bold rounded-lg transition-all hover:opacity-90 active:scale-95 ${small ? "text-[11px] px-3 py-1.5" : "text-xs px-3.5 py-2"}`}
      style={{ background: ACCENT, color: "#fff" }}>
      ⬇ {label}
    </button>
  );
}

/* Outline secondary button */
function OutBtn({ label, href = "#", onClick }: { label: string; href?: string; onClick?: () => void }) {
  if (onClick) return (
    <button onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-lg transition-all"
      style={{ color: ACCENT, border: `1px solid rgba(29,158,117,0.35)`, background: "rgba(29,158,117,0.06)" }}
      onMouseEnter={e => { e.currentTarget.style.color = HOVER_T; e.currentTarget.style.borderColor = ACCENT; }}
      onMouseLeave={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = "rgba(29,158,117,0.35)"; }}>
      {label}
    </button>
  );
  return (
    <Link href={href}
      className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-2 rounded-lg transition-all"
      style={{ color: ACCENT, border: `1px solid rgba(29,158,117,0.35)`, background: "rgba(29,158,117,0.06)" }}
      onMouseEnter={e => { e.currentTarget.style.color = HOVER_T; e.currentTarget.style.borderColor = ACCENT; }}
      onMouseLeave={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = "rgba(29,158,117,0.35)"; }}>
      {label}
    </Link>
  );
}

function Card({ children, hover = true }: { children: React.ReactNode; hover?: boolean }) {
  return (
    <div className="rounded-xl p-5 flex flex-col gap-0 transition-all duration-200"
      style={{ background: CARD, border: `1px solid ${BORDER}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
      onMouseEnter={hover ? e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29,158,117,0.3)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; } : undefined}
      onMouseLeave={hover ? e => { (e.currentTarget as HTMLDivElement).style.borderColor = BORDER; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.04)"; } : undefined}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════ */
export default function NewsPage() {
  const [active,  setActive]  = useState("press-releases");
  const [email,   setEmail]   = useState("");
  const [name,    setName]    = useState("");
  const [subDone, setSubDone] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [orgEmail,setOrgEmail]= useState("");

  /* Highlight active section in sticky tab nav */
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-25% 0px -65% 0px" },
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  function handleSub(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubDone(true); setEmail(""); setName("");
  }

  return (
    <>

      <div id="news-top" style={{ background: BG, minHeight: "100vh" }}>

        {/* ── Sticky section tab nav ── */}
        <div className="sticky top-16 z-40 overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8edf5", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
          <div className="flex min-w-max px-4 md:px-8 max-w-7xl mx-auto">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`}
                className="flex-shrink-0 px-3.5 py-3 text-[11px] font-bold whitespace-nowrap transition-all duration-150 border-b-2"
                style={{ color: active === s.id ? ACCENT : TEXT, borderBottomColor: active === s.id ? ACCENT : "transparent" }}
                onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.color = HOVER_T; }}
                onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.color = TEXT; }}
              >{s.label}</a>
            ))}
          </div>
        </div>

        <SubpageHero
          crumbs={[{ label: "Home", href: "/" }, { label: "News & Updates" }]}
          badge="All content fully downloadable"
          title="News & Updates"
          highlight="Updates"
          desc="Every press release, report, video transcript, newsletter, and resource is available for instant download."
          accent={ACCENT}
          stats={[{ val: "5", label: "Press Releases" }, { val: "5", label: "Publications" }, { val: "6", label: "Videos" }, { val: "6", label: "Newsletters" }]}
          ctaLabel="Press Releases"
          ctaHref="#press-releases"
          secondLabel="Newsletters"
          secondHref="#newsletters"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

          {/* ══ 1 · PRESS RELEASES ══════════════════════════════════ */}
          <SectionHead id="press-releases" title="Press Releases" sub="Official DeepEarthScience announcements — each downloadable as a branded PDF" />
          <div className="flex flex-col gap-4 mb-5">
            {PRESS.map((p, i) => (
              <Card key={p.headline}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: ACCENT }}>{p.date}</p>
                <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{p.headline}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: TEXT }}>{p.body.substring(0, 180)}…</p>
                <div className="flex flex-wrap gap-2">
                  <DlBtn label="Download PDF" onClick={() => downloadPressRelease(p.headline, p.date, p.body, i + 1)} />
                  <OutBtn label="Read More" />
                </div>
              </Card>
            ))}
          </div>
          <DlBtn label="Download All Press Releases" onClick={async () => { for (const [i, p] of PRESS.entries()) await downloadPressRelease(p.headline, p.date, p.body, i + 1); }} />
          <BackTop />
          <Divider />

          {/* ══ 2 · RECENTLY PUBLISHED ══════════════════════════════ */}
          <SectionHead id="recently-published" title="Recently Published" sub="Research reports, field reports & white papers — all downloadable" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {PUBLISHED.map((p, i) => (
              <Card key={p.title}>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Tag label={p.tag} />
                  <span className="text-[10px]" style={{ color: TEXT }}>{p.date}</span>
                </div>
                <h3 className="text-sm font-black text-slate-900mb-2 leading-snug flex-1">{p.title}</h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: TEXT }}>{p.desc}</p>
                <div className="flex items-center gap-2 text-[10px] mb-4" style={{ color: TEXT }}>
                  <span>{p.pages} pages</span><span>·</span><span>{p.size}</span>
                </div>
                <DlBtn label="Download PDF" onClick={() => downloadPublication(p.title, p.tag, p.date, p.pages, p.desc, undefined, i + 1)} />
              </Card>
            ))}
          </div>
          <DlBtn label="Download All Publications" onClick={async () => { for (const [i, p] of PUBLISHED.entries()) await downloadPublication(p.title, p.tag, p.date, p.pages, p.desc, undefined, i + 1); }} />
          <BackTop />
          <Divider />

          {/* ══ 3 · VIDEO SERIES ════════════════════════════════════ */}
          <SectionHead id="videos" title="DeepEarth Video Series" sub="Download transcript, slides, or study notes for any video" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VIDEOS.map((v, i) => (
              <Card key={v.title}>
                {/* Thumbnail */}
                <div className="w-full aspect-video rounded-lg mb-3 flex items-center justify-center relative overflow-hidden flex-shrink-0"
                  style={{ background: "#f1f5f9", border: `1px solid ${BORDER}` }}>
                  <div className="absolute inset-0 opacity-15"
                    style={{ backgroundImage: `repeating-linear-gradient(45deg,${ACCENT}22 0,${ACCENT}22 1px,transparent 1px,transparent 8px)` }} />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                    <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4 ml-0.5"><polygon points="4,2 14,8 4,14" /></svg>
                  </div>
                </div>
                <h3 className="text-sm font-black text-slate-900mb-1.5 leading-snug">{v.title}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px]" style={{ color: TEXT }}>{v.month}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "rgba(29,158,117,0.1)", color: ACCENT }}>{v.duration}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <DlBtn small label="Transcript" onClick={() => downloadTranscript(v.title, v.duration, "Transcript", i + 1)} />
                  <DlBtn small label="Slides"     onClick={() => downloadTranscript(v.title, v.duration, "Slides",     i + 1)} />
                  <DlBtn small label="Notes"      onClick={() => downloadTranscript(v.title, v.duration, "Notes",      i + 1)} />
                </div>
              </Card>
            ))}
          </div>
          <BackTop />
          <Divider />

          {/* ══ 4 · PODCASTS & WEBINARS ═════════════════════════════ */}
          <SectionHead id="podcasts" title="Podcasts & Webinars" sub="Transcripts, slides & speaker notes for every episode" />
          <div className="flex flex-col gap-3">
            {PODCASTS.map((p, i) => (
              <Card key={p.title}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <Tag label={p.type} color={p.type === "Podcast" ? "#7c3aed" : "#2563eb"} />
                      <span className="text-[10px]" style={{ color: TEXT }}>{p.date} · {p.duration}</span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900">{p.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                    <DlBtn small label="Transcript" onClick={() => downloadTranscript(p.title, p.duration, "Transcript", i + 7)} />
                    <DlBtn small label="Slides"     onClick={() => downloadTranscript(p.title, p.duration, "Slides",     i + 7)} />
                    {p.type === "Podcast" && <DlBtn small label="Notes" onClick={() => downloadTranscript(p.title, p.duration, "Notes", i + 7)} />}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <BackTop />
          <Divider />

          {/* ══ 5 · GIS BLOGS ═══════════════════════════════════════ */}
          <SectionHead id="blogs" title="GIS Blogs" sub="Download any post as a branded PDF or read it inline" />
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            {BLOGS.map((b, i) => (
              <Card key={b.title}>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Tag label={b.cat} color="#2563eb" />
                  <span className="text-[10px]" style={{ color: TEXT }}>{b.date}</span>
                </div>
                <h3 className="text-sm font-black text-slate-900mb-1">{b.title}</h3>
                <p className="text-[11px] mb-2" style={{ color: `${ACCENT}99` }}>by {b.author}</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: TEXT }}>{b.excerpt}</p>
                <div className="flex gap-2 flex-wrap">
                  <DlBtn label="Download PDF" onClick={() => downloadBlog(b.title, b.author, b.date, b.cat, b.excerpt, i + 1)} />
                  <OutBtn label="Read More" />
                </div>
              </Card>
            ))}
          </div>
          <DlBtn label="Download All Blogs PDF" onClick={async () => { for (const [i, b] of BLOGS.entries()) await downloadBlog(b.title, b.author, b.date, b.cat, b.excerpt, i + 1); }} />
          <BackTop />
          <Divider />

          {/* ══ 6 · NEWSLETTERS ═════════════════════════════════════ */}
          <SectionHead id="newsletters" title="Newsletters" sub="Download past issues or subscribe to get the next one in your inbox" />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Past Issues</p>
              <div className="flex flex-col gap-2 mb-4">
                {NEWSLETTERS.map(n => (
                  <div key={n.title} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29,158,117,0.4)"}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = BORDER}>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{n.title}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: TEXT }}>Edition #{n.edition} · {n.size}</p>
                    </div>
                    <DlBtn small label="PDF" onClick={() => downloadNewsletter(n.month, n.edition)} />
                  </div>
                ))}
              </div>
              <DlBtn label="Download All Newsletters" onClick={async () => { for (const n of NEWSLETTERS) await downloadNewsletter(n.month, n.edition); }} />
            </div>

            <div className="rounded-xl p-6" style={{ background: CARD, border: `1px solid rgba(29,158,117,0.28)` }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: ACCENT }}>Subscribe Free</p>
              <h3 className="text-lg font-black text-slate-900mb-2">Get the monthly digest</h3>
              <p className="text-xs mb-5" style={{ color: TEXT }}>GIS insights, project updates, training alerts and field reports — delivered to your inbox every month.</p>
              {subDone ? (
                <p className="font-bold" style={{ color: ACCENT }}>✓ Subscribed! Watch your inbox.</p>
              ) : (
                <form onSubmit={handleSub} className="flex flex-col gap-2">
                  <input type="text"  placeholder="Your name"  value={name}  onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#f8fafc", border: `1px solid ${BORDER}`, color: "#0f172a" }} />
                  <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#f8fafc", border: `1px solid ${BORDER}`, color: "#0f172a" }} />
                  <button type="submit"
                    className="px-4 py-2.5 rounded-xl text-sm font-black transition-all hover:opacity-90"
                    style={{ background: ACCENT, color: "#fff" }}>
                    Subscribe to Newsletter
                  </button>
                </form>
              )}
            </div>
          </div>
          <BackTop />
          <Divider />

          {/* ══ 7 · SOCIAL MEDIA ════════════════════════════════════ */}
          <SectionHead id="social" title="Social Media" sub="Follow us across platforms — download our complete Social Media Kit" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
            {SOCIALS.map(s => (
              <Card key={s.platform}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />
                  <h3 className="text-sm font-black text-slate-900">{s.platform}</h3>
                </div>
                <p className="text-[11px] font-mono mb-2" style={{ color: ACCENT }}>{s.handle}</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: TEXT }}>{s.desc}</p>
                <div className="flex gap-2">
                  <OutBtn label="Follow" href={s.url} />
                </div>
              </Card>
            ))}
          </div>
          <DlBtn label="Download Social Media Kit PDF" onClick={downloadSocialKit} />
          <BackTop />
          <Divider />

          {/* ══ 8 · MEDIA RESOURCES ═════════════════════════════════ */}
          <SectionHead id="media" title="Media Resources" sub="Brand assets, press kits and fact sheets — all instantly downloadable" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MEDIA_ASSETS.map((m, i) => (
              <Card key={m.name}>
                <h3 className="text-sm font-black text-slate-900mb-1.5">{m.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono" style={{ color: ACCENT }}>{m.formats}</span>
                  <span className="text-[10px]" style={{ color: TEXT }}>· {m.size}</span>
                </div>
                <DlBtn label="Download" onClick={() => downloadMediaResource(m.name, m.file, i + 1)} />
              </Card>
            ))}
          </div>
          <BackTop />
          <Divider />

          {/* ══ 9 · EVENTS & CONFERENCES ════════════════════════════ */}
          <SectionHead id="events" title="Events & Conferences" sub="Register, download brochures, schedules and calendar files" />
          <div className="grid md:grid-cols-2 gap-4">
            {EVENTS.map((ev, i) => (
              <Card key={ev.name}>
                <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                  <h3 className="text-sm font-black text-slate-900leading-snug flex-1">{ev.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black flex-shrink-0"
                    style={{ background: `${EVENT_TYPE_COLOR[ev.type]}18`, color: EVENT_TYPE_COLOR[ev.type] }}>
                    {ev.type}
                  </span>
                </div>
                <p className="text-[11px] font-bold mb-1" style={{ color: ACCENT }}>{ev.date} · {ev.location}</p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: TEXT }}>{ev.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  <DlBtn small label="Brochure"  onClick={() => downloadEventPDF(ev.name, ev.date, ev.location, ev.type, ev.desc, "Brochure",      i + 1)} />
                  <DlBtn small label="Schedule"  onClick={() => downloadEventPDF(ev.name, ev.date, ev.location, ev.type, ev.desc, "Schedule",      i + 1)} />
                  <DlBtn small label="Reg. Form" onClick={() => downloadEventPDF(ev.name, ev.date, ev.location, ev.type, ev.desc, "Registration",  i + 1)} />
                  <OutBtn label="+ Calendar"     onClick={() => downloadICS(ev.name, ev.date, ev.location, ev.desc)} />
                </div>
              </Card>
            ))}
          </div>
          <BackTop />
          <Divider />

          {/* ══ 10 · FIELD SURVEY UPDATES ═══════════════════════════ */}
          <SectionHead id="field-updates" title="Field Survey Updates" sub="Live project status with downloadable survey reports and maps" />
          <div className="flex flex-col gap-4">
            {FIELD.map((f, i) => {
              const cfg = STATUS_CFG[f.status];
              return (
                <Card key={f.project}>
                  <div className="flex flex-wrap items-start gap-3 mb-2">
                    <h3 className="text-sm font-black text-slate-900flex-1 leading-snug">{f.project}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black flex-shrink-0"
                      style={{ background: cfg.bg, color: cfg.color }}>
                      {f.status}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold mb-0.5" style={{ color: ACCENT }}>{f.location}</p>
                  <p className="text-[10px] mb-2" style={{ color: TEXT }}>Last updated: {f.updated}</p>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: TEXT }}>{f.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <DlBtn small label="Survey Report" onClick={() => downloadSurveyPDF(f.project, f.location, f.status, f.desc, "Report",    i + 1)} />
                    <DlBtn small label="Field Data"    onClick={() => downloadSurveyPDF(f.project, f.location, f.status, f.desc, "FieldData", i + 1)} />
                    <DlBtn small label="Survey Map"    onClick={() => downloadSurveyPDF(f.project, f.location, f.status, f.desc, "Map",       i + 1)} />
                  </div>
                </Card>
              );
            })}
          </div>
          <BackTop />
          <Divider />

          {/* ══ 11 · PARTNER PROGRAM ════════════════════════════════ */}
          <SectionHead id="partners" title="Partner Program" sub="Download the brochure, agreement template or application form" />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>Partnership Tiers</p>
              {[
                { tier: "Silver Partner",   perks: ["GIS dataset access", "Logo on website", "1 joint webinar/year", "Newsletter feature", "10% course discount"] },
                { tier: "Gold Partner",     perks: ["All Silver perks", "Satellite imagery archives", "Co-branded reports", "Dedicated liaison", "20% course discount"] },
                { tier: "Platinum Partner", perks: ["All Gold perks", "Full research datasets", "Revenue-share projects", "Co-research publication", "5 free training seats"] },
              ].map(t => (
                <div key={t.tier} className="mb-3 px-4 py-3.5 rounded-xl" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <p className="text-sm font-black text-slate-900mb-2">{t.tier}</p>
                  <ul className="flex flex-col gap-0.5">
                    {t.perks.map(p => (
                      <li key={p} className="text-xs flex items-start gap-2" style={{ color: TEXT }}>
                        <span style={{ color: ACCENT }}>✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Downloads</p>
              <div className="flex flex-col gap-2">
                {(["Brochure", "Agreement", "Benefits", "Application"] as const).map(k => (
                  <div key={k} className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl"
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Partner {k}</p>
                      <p className="text-[10px]" style={{ color: TEXT }}>
                        {k === "Brochure"     ? "Program overview & how to apply" :
                         k === "Agreement"    ? "MoU template for signing" :
                         k === "Benefits"     ? "Detailed per-tier benefit guide" :
                                                "Fillable application form"}
                      </p>
                    </div>
                    <DlBtn small label="PDF" onClick={() => downloadPartnerPDF(k)} />
                  </div>
                ))}
              </div>

              {/* Apply form */}
              <div className="rounded-xl p-5 mt-2" style={{ background: CARD, border: `1px solid rgba(29,158,117,0.3)` }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Apply Now</p>
                <div className="flex flex-col gap-2">
                  <input type="text"  placeholder="Organisation name" value={orgName}  onChange={e => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#f8fafc", border: `1px solid ${BORDER}`, color: "#0f172a" }} />
                  <input type="email" placeholder="Contact email"     value={orgEmail} onChange={e => setOrgEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: "#f8fafc", border: `1px solid ${BORDER}`, color: "#0f172a" }} />
                  <button
                    className="px-4 py-2.5 rounded-xl text-sm font-black transition-all hover:opacity-90"
                    style={{ background: ACCENT, color: "#fff" }}>
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
          <BackTop />

        </div>

        {/* Footer strip */}
        <div className="text-center py-7 text-xs text-slate-400 border-t border-black/[0.07]">
          <Link href="/" className="transition-colors text-slate-500 hover:text-[#1d9e75]">
            ← Back to main site
          </Link>
          <span className="mx-3 text-slate-200">|</span>
          © 2026 Deep Earth Science
        </div>
      </div>
    </>
  );
}
