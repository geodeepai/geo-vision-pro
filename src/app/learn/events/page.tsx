"use client";
import { useState } from "react";
import { downloadEventPDF, downloadICS } from "@/lib/gvpPDF";
import SubpageHero from "@/components/SubpageHero";

/* ── Types ───────────────────────────────────────────────────────── */
interface LearnEvent {
  id: number;
  title: string;
  type: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  date: string;
  dateISO: string;
  venue: string;
  time?: string;
  fee?: string;
  capacity?: string;
  desc: string;
  agenda?: string[];
  downloads: ("Brochure" | "Schedule" | "Registration" | "ICS" | "Slides" | "Certificate")[];
  btnLabel: string;
  btnVariant?: "primary" | "outline";
}

/* ── Data ────────────────────────────────────────────────────────── */
const EVENTS: LearnEvent[] = [
  {
    id: 1, title: "Remote Sensing Workshop",
    type: "Workshop", status: "Upcoming",
    date: "05 July 2026", dateISO: "2026-07-05",
    venue: "DeepEarthScience Office, Kolkata",
    time: "10:00 AM – 05:00 PM",
    fee: "₹1,500 per participant",
    capacity: "30 participants",
    desc: "A hands-on full-day workshop on Remote Sensing applications using Sentinel-2 satellite imagery and QGIS. Participants will learn to download satellite data, perform image classification, compute spectral indices, and generate thematic maps. Laptops with QGIS installed required.",
    agenda: [
      "10:00 AM – Introduction to Remote Sensing",
      "11:30 AM – Satellite Data Download & Setup",
      "01:00 PM – Lunch Break",
      "02:00 PM – Image Classification Hands-on",
      "03:30 PM – NDVI & Spectral Index Analysis",
      "04:30 PM – Q&A and Certificate Distribution",
    ],
    downloads: ["Brochure", "Schedule", "Registration", "ICS"],
    btnLabel: "Register Now",
  },
  {
    id: 2, title: "GIS India Summit 2026",
    type: "Conference", status: "Upcoming",
    date: "15 August 2026", dateISO: "2026-08-15",
    venue: "India Habitat Centre, New Delhi",
    time: "09:00 AM – 06:00 PM",
    fee: "₹2,500 (Early Bird) / ₹3,500 (Standard)",
    capacity: "500 participants",
    desc: "GIS India Summit 2026 is the largest annual gathering of GIS professionals, researchers, government officials, and industry leaders in India. The summit features keynote addresses, technical paper presentations, panel discussions, and an exhibition of latest geospatial technologies.",
    agenda: [
      "Track A – Urban & Smart City GIS",
      "Track B – Agriculture & Environment",
      "Track C – Disaster Management & GIS",
      "Track D – Drone & UAV Technology",
      "Track E – AI & Machine Learning in GIS",
    ],
    downloads: ["Brochure", "Schedule", "Registration", "ICS"],
    btnLabel: "Register Now",
  },
  {
    id: 3, title: "DeepEarthScience Annual Meet 2026",
    type: "Conference", status: "Upcoming",
    date: "20 September 2026", dateISO: "2026-09-20",
    venue: "Hotel Lalit Ashok, Bangalore",
    time: "10:00 AM – 08:00 PM",
    fee: "By Invitation / Partner Only",
    desc: "The DeepEarthScience Annual Meet brings together team members, partners, clients, and stakeholders for a full day of presentations, recognition awards, networking, and strategic planning for the year ahead. Includes evening gala dinner.",
    agenda: [
      "Annual review of DeepEarthScience projects and milestones",
      "Partner and client appreciation awards ceremony",
      "Strategic roadmap presentation for 2027",
      "Networking sessions and breakout discussions",
      "Evening gala dinner and entertainment",
    ],
    downloads: ["Brochure", "ICS"],
    btnLabel: "Request Invitation",
    btnVariant: "outline",
  },
  {
    id: 4, title: "Drone Mapping Expo 2026",
    type: "Expo", status: "Upcoming",
    date: "10 October 2026", dateISO: "2026-10-10",
    venue: "Bombay Exhibition Centre, Mumbai",
    time: "09:00 AM – 06:00 PM",
    fee: "₹500 (Entry) / Free for students",
    desc: "India's premier drone and UAV mapping exhibition showcasing the latest drone hardware, software, and survey technologies. DeepEarthScience will be exhibiting at Stall No. B-24 with live drone demonstrations, product launches, and free consultations.",
    agenda: [
      "Live drone demonstrations by leading manufacturers",
      "DeepEarthScience Stall B-24: product launches & free consultations",
      "Technical seminars on LiDAR and photogrammetry",
      "DGCA regulatory updates and compliance workshop",
      "Networking lunch for registered exhibitors",
    ],
    downloads: ["Brochure", "ICS"],
    btnLabel: "Register Free",
  },
  {
    id: 5, title: "GIS for Agriculture Seminar",
    type: "Seminar", status: "Upcoming",
    date: "01 December 2026", dateISO: "2026-12-01",
    venue: "ICRISAT Campus, Pune",
    time: "10:00 AM – 04:00 PM",
    fee: "Free for registered participants",
    desc: "A focused seminar on applications of GIS and remote sensing in precision agriculture, crop health monitoring, irrigation planning, and soil mapping. Organised in collaboration with agricultural research institutions.",
    agenda: [
      "Precision agriculture overview: current state in India",
      "Crop health monitoring using NDVI and multispectral indices",
      "Drone-based soil and irrigation mapping",
      "Panel discussion: AI in agriculture GIS",
      "Open Q&A and networking session",
    ],
    downloads: ["Brochure", "Registration", "ICS"],
    btnLabel: "Register Free",
  },
  {
    id: 6, title: "Introduction to GIS – Webinar",
    type: "Webinar", status: "Completed",
    date: "10 March 2026", dateISO: "2026-03-10",
    venue: "Online (Zoom)",
    time: "03:00 PM – 05:00 PM",
    fee: "Free",
    desc: "Introductory webinar on GIS basics attended by 350+ participants online. Covered foundational concepts of GIS, coordinate systems, QGIS installation, and real-world applications across urban planning and environmental management.",
    downloads: ["Slides", "Certificate"],
    btnLabel: "View Recording",
    btnVariant: "outline",
  },
];

/* ── Filter options ──────────────────────────────────────────────── */
const STATUS_TABS = ["All", "Upcoming", "Completed"];
const TYPE_TABS   = ["All Types", "Workshop", "Conference", "Expo", "Seminar", "Webinar"];

/* ── Visual helpers ──────────────────────────────────────────────── */
const statusStyle: Record<string, string> = {
  Upcoming:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  Ongoing:   "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-slate-100 text-slate-500 border-slate-200",
};
const typeIcon: Record<string, string> = {
  Workshop:   "🛠",
  Conference: "🎤",
  Expo:       "🏛",
  Seminar:    "📚",
  Webinar:    "💻",
};

/* ══════════════════════════════════════════════════════════════════ */
export default function EventsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter,   setTypeFilter]   = useState("All Types");

  const filtered = EVENTS.filter(e => {
    const statusOk = statusFilter === "All" || e.status === statusFilter;
    const typeOk   = typeFilter === "All Types" || e.type === typeFilter;
    return statusOk && typeOk;
  });

  const refStr = (id: number) => `GVP-EV-2026-${String(id).padStart(3, "0")}`;

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>

      <SubpageHero
        crumbs={[{ label: "Learn", href: "/learn/events" }, { label: "Events" }]}
        badge="DeepEarthScience Events"
        title="Events & Conferences Across India"
        highlight="Across India"
        desc="Join DeepEarthScience at workshops, conferences, expos, and seminars — network with GIS professionals, learn from experts, and stay ahead in geospatial technology."
        accent="#8b5cf6"
        stats={[{ val: "6+", label: "Events This Year" }, { val: "1,000+", label: "Participants" }, { val: "5", label: "Event Types" }, { val: "Pan-India", label: "Locations" }]}
        ctaLabel="Browse Events"
        ctaHref="#events"
      />

      {/* ── Filters ── */}
      <section className="px-4 pt-6 pb-2 max-w-6xl mx-auto" id="events">
        {/* Status filter */}
        <div className="flex gap-2 mb-3">
          {STATUS_TABS.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={{
                background:  statusFilter === s ? "#8b5cf6" : "rgba(0,0,0,0.03)",
                borderColor: statusFilter === s ? "#8b5cf6" : "rgba(0,0,0,0.1)",
                color:       statusFilter === s ? "#fff"    : "#64748b",
              }}>
              {s}
            </button>
          ))}
        </div>
        {/* Type filter */}
        <div className="flex flex-wrap gap-2">
          {TYPE_TABS.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
              style={{
                background:  typeFilter === t ? "rgba(139,92,246,0.12)" : "rgba(0,0,0,0.03)",
                borderColor: typeFilter === t ? "rgba(139,92,246,0.4)"  : "rgba(0,0,0,0.08)",
                color:       typeFilter === t ? "#7c3aed"                : "#64748b",
              }}>
              {typeIcon[t] ?? ""} {t}
            </button>
          ))}
        </div>
      </section>

      {/* ── Events ── */}
      <section className="px-4 py-8 pb-16 max-w-6xl mx-auto space-y-6">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400">No events match your selected filters.</p>
          </div>
        )}

        {filtered.map(ev => (
          <div key={ev.id}
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.07)", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
            className="overflow-hidden hover:shadow-lg hover:border-[#8b5cf6]/30 transition-all duration-200">
            <div className="flex flex-col lg:flex-row">
              {/* Left colour bar & date */}
              <div className="lg:w-[180px] flex-shrink-0 flex flex-row lg:flex-col items-center justify-between lg:justify-start gap-4 p-5 bg-slate-50"
                style={{ borderRight: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="text-center">
                  <div className="text-3xl font-black text-slate-900">{ev.date.split(" ")[0]}</div>
                  <div className="text-sm font-semibold" style={{ color: "#8b5cf6" }}>
                    {ev.date.split(" ").slice(1).join(" ")}
                  </div>
                  {ev.time && <div className="text-[11px] mt-1 text-slate-400">{ev.time}</div>}
                </div>
                <div className="text-center">
                  <div className="text-4xl">{typeIcon[ev.type] ?? "📅"}</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest mt-1 text-slate-400">
                    {ev.type}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-5">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[ev.status]}`}>
                        {ev.status}
                      </span>
                      <span className="text-[10px] text-slate-400">{refStr(ev.id)}</span>
                    </div>
                    <h3 className="text-slate-900 font-black text-xl leading-snug">{ev.title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#1d9e75" }}>📍 {ev.venue}</p>
                  </div>
                  {ev.fee && (
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Registration Fee</p>
                      <p className="text-sm font-bold text-slate-900">{ev.fee}</p>
                      {ev.capacity && <p className="text-[11px] text-slate-400">Max {ev.capacity}</p>}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4 text-slate-600">{ev.desc}</p>

                {/* Agenda */}
                {ev.agenda && (
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#1d9e75" }}>
                      {ev.status === "Completed" ? "Topics Covered" : "Agenda Highlights"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {ev.agenda.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <span style={{ color: "#1d9e75" }} className="flex-shrink-0 mt-0.5">▸</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* What you get (for upcoming events) */}
                {ev.status === "Upcoming" && (
                  <div className="mb-4 p-3 rounded-xl"
                    style={{ background: "rgba(29,158,117,0.05)", border: "1px solid rgba(29,158,117,0.15)" }}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#1d9e75" }}>
                      What You Get
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {["Workshop materials & study kit", "Participation certificate", "Expert-led sessions", "Networking opportunity"].map((b, i) => (
                        <span key={i} className="text-xs text-slate-600">✓ {b}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Downloads + CTA */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Primary CTA */}
                  <button
                    className="px-5 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ background: ev.btnVariant === "outline" ? "transparent" : "#1d9e75",
                             border: ev.btnVariant === "outline" ? "1px solid #1d9e75" : "none",
                             color:  ev.btnVariant === "outline" ? "#1d9e75" : "#fff" }}>
                    {ev.btnLabel}
                  </button>

                  {/* Download buttons */}
                  {ev.downloads.map(dl => {
                    const dlStyle = { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" };
                    if (dl === "ICS") return (
                      <button key="ics"
                        onClick={() => downloadICS(ev.title, ev.dateISO, ev.venue, ev.desc)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-600"
                        style={dlStyle}>
                        📅 Add to Calendar
                      </button>
                    );
                    if (dl === "Brochure") return (
                      <button key="brochure"
                        onClick={() => downloadEventPDF(ev.title, ev.date, ev.venue, ev.type, ev.desc, "Brochure", ev.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-600"
                        style={dlStyle}>
                        ↓ Brochure PDF
                      </button>
                    );
                    if (dl === "Schedule") return (
                      <button key="schedule"
                        onClick={() => downloadEventPDF(ev.title, ev.date, ev.venue, ev.type, ev.desc, "Schedule", ev.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-600"
                        style={dlStyle}>
                        ↓ Schedule PDF
                      </button>
                    );
                    if (dl === "Registration") return (
                      <button key="reg"
                        onClick={() => downloadEventPDF(ev.title, ev.date, ev.venue, ev.type, ev.desc, "Registration", ev.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-600"
                        style={dlStyle}>
                        ↓ Registration Form
                      </button>
                    );
                    if (dl === "Slides") return (
                      <button key="slides"
                        onClick={() => downloadEventPDF(ev.title, ev.date, ev.venue, ev.type, ev.desc, "Schedule", ev.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-600"
                        style={dlStyle}>
                        ↓ Presentation Slides
                      </button>
                    );
                    return (
                      <button key={dl}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all text-slate-600"
                        style={dlStyle}>
                        ↓ {dl} PDF
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA strip ── */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <div className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}>
          <h2 className="text-slate-900 font-black text-2xl mb-2">Organise an Event with DeepEarthScience</h2>
          <p className="text-sm mb-5 text-slate-500">
            Partner with us to host GIS workshops, training sessions, or conferences at your institution.
          </p>
          <a href="mailto:events@DeepEarthScience.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: "#8b5cf6" }}>
            Contact Events Team →
          </a>
        </div>
      </section>
    </main>
  );
}
