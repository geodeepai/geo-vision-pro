/* ── GeoVisionPro PDF Generator ─────────────────────────────────────
   Every PDF carries a GVP-[CODE]-2026-[NNN] reference number,
   full date in the header, short date in the footer, and
   professional body content throughout.
   ──────────────────────────────────────────────────────────────── */

async function getJsPDF() {
  const { jsPDF } = await import("jspdf");
  return jsPDF;
}

/* ── Brand constants ─────────────────────────────────────────────── */
const NAVY        = [10,  22,  40]  as const;
const GREEN       = [29, 158, 117]  as const;
const WHITE       = [255,255,255]   as const;
const LIGHT       = [176,196,216]   as const;
const DARK        = [15,  32,  53]  as const;
const LOGO_BLUE   = [59, 130, 246]  as const;
const LOGO_INDIGO = [79,  70, 229]  as const;
const PRO_BLUE    = [59, 130, 246]  as const;
const BODY_TXT    = [30,  45,  65]  as const;
const META_BG     = [242, 246, 251] as const;
const META_LBL    = [70, 100, 140]  as const;
const DIV_CLR     = [200, 215, 230] as const;

/* ── Date & layout geometry ──────────────────────────────────────── */
const DATE_FULL  = "14 June 2026";
const DATE_SHORT = "14/06/2026";

const NV_H  = 28;                   // navy band height (mm)
const MT_H  = 26;                   // metadata box height (mm)
const HDR_H = NV_H + 2 + MT_H + 1; // 57 mm total header
const CY    = HDR_H + 6;            // 63 mm — body starts here

type RGB = readonly [number, number, number];
type Doc = InstanceType<Awaited<ReturnType<typeof getJsPDF>>>;

interface DocMeta {
  ref: string;
  type: string;
  left?: [string, string];         // optional extra left-col row
  right?: [string, string][];      // up to 2 extra right-col rows
}

function refNo(code: string, idx: number): string {
  return `GVP-${code}-2026-${String(idx).padStart(3, "0")}`;
}

/* ── Low-level helpers ───────────────────────────────────────────── */
function setFill(doc: Doc, c: RGB)      { doc.setFillColor(c[0], c[1], c[2]); }
function setTextColor(doc: Doc, c: RGB) { doc.setTextColor(c[0], c[1], c[2]); }
function setDrawColor(doc: Doc, c: RGB) { doc.setDrawColor(c[0], c[1], c[2]); }

function hr(doc: Doc, y: number, color: RGB = DIV_CLR) {
  const W = doc.internal.pageSize.getWidth();
  setDrawColor(doc, color);
  doc.setLineWidth(0.3);
  doc.line(10, y, W - 10, y);
}

function wrappedText(
  doc: Doc, text: string, x: number, y: number, maxW: number, lineH: number
): number {
  const lines = doc.splitTextToSize(text, maxW);
  doc.text(lines, x, y);
  return y + lines.length * lineH;
}

function secHead(doc: Doc, text: string, y: number, x = 10): number {
  setTextColor(doc, GREEN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(text, x, y);
  return y + 6;
}

function tagBadge(doc: Doc, label: string, x: number, y: number) {
  doc.setFontSize(7);
  const tw = doc.getTextWidth(label);
  setFill(doc, [15, 64, 47] as RGB);
  doc.roundedRect(x, y - 4.5, tw + 6, 6.5, 1, 1, "F");
  setTextColor(doc, GREEN);
  doc.text(label, x + 3, y);
}

/* ── Logo mark (shared) ──────────────────────────────────────────── */
function drawLogo(doc: Doc, LX: number, LY: number, LS: number) {
  const S  = LS / 24;
  const cx = LX + 12 * S;
  const cy = LY + 12 * S;

  setFill(doc, LOGO_BLUE);
  doc.roundedRect(LX, LY, LS, LS, 2.5, 2.5, "F");
  setFill(doc, LOGO_INDIGO);
  doc.roundedRect(LX + LS / 2, LY, LS / 2, LS, 2.5, 2.5, "F");
  setFill(doc, [69, 100, 237] as RGB);
  doc.rect(LX + LS / 2 - 1, LY, 2, LS, "F");

  setDrawColor(doc, WHITE);
  doc.setLineWidth(0.55);
  doc.circle(cx, cy, 9 * S, "S");

  const wX = LX + 4 * S, wY = LY + 12 * S;
  setDrawColor(doc, WHITE);
  doc.setLineWidth(0.7);
  doc.lines(
    [
      [(6.667-4)*S, (8-12)*S, (9.333-4)*S, (8-12)*S, (12-4)*S, (12-12)*S],
      [(14.667-12)*S, (16-12)*S, (17.333-12)*S, (16-12)*S, (20-12)*S, (12-12)*S],
    ] as [number,number,number,number,number,number][],
    wX, wY, [1, 1], "S", false,
  );
  setFill(doc, WHITE);
  doc.circle(cx, cy, 2 * S, "F");
}

/* ── Page header ─────────────────────────────────────────────────── */
function addHeader(doc: Doc, m: DocMeta) {
  const W = doc.internal.pageSize.getWidth();

  setFill(doc, NAVY);
  doc.rect(0, 0, W, NV_H, "F");
  setFill(doc, LOGO_BLUE);
  doc.rect(0, NV_H, W, 2, "F");

  drawLogo(doc, 8, 4, 20);

  // Company name
  const LX = 8, LY = 4, LS = 20;
  setTextColor(doc, WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const gW = doc.getTextWidth("GeoVision");
  doc.text("GeoVision", LX + LS + 4, LY + 7);
  setTextColor(doc, PRO_BLUE);
  doc.text("Pro", LX + LS + 4 + gW, LY + 7);

  setTextColor(doc, LIGHT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("Mapping the Future with Precision", LX + LS + 4, LY + 13.5);
  setTextColor(doc, [120, 160, 200] as RGB);
  doc.setFontSize(6.5);
  doc.text("Remote Sensing · GIS · AI · Training", LX + LS + 4, LY + 19);

  setTextColor(doc, LIGHT);
  doc.setFontSize(7);
  doc.text("www.geovisionpro.com", W - 10, LY + 10, { align: "right" });

  // Metadata box
  setFill(doc, META_BG);
  doc.rect(0, NV_H + 2, W, MT_H, "F");
  setFill(doc, DIV_CLR);
  doc.rect(W / 2, NV_H + 3, 0.3, MT_H - 2, "F");

  const mTop = NV_H + 2;
  const RH   = 6.5;
  const LBW  = 24;
  const L1   = 10;
  const R1   = W / 2 + 8;

  function metaRow(side: "L" | "R", i: number, label: string, value: string) {
    const x = side === "L" ? L1 : R1;
    const y = mTop + 5 + i * RH;
    setTextColor(doc, META_LBL);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(`${label}:`, x, y);
    setTextColor(doc, NAVY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(value, x + LBW, y);
  }

  metaRow("L", 0, "Ref No",   m.ref);
  metaRow("L", 1, "Doc Type", m.type);
  metaRow("R", 0, "Date",     DATE_FULL);
  if (m.left)  metaRow("L", 2, m.left[0], m.left[1]);
  m.right?.forEach(([lbl, val], i) => metaRow("R", i + 1, lbl, val));

  setFill(doc, GREEN);
  doc.rect(0, NV_H + 2 + MT_H, W, 1, "F");
}

/* ── Page footer ─────────────────────────────────────────────────── */
function addFooter(doc: Doc, page: number, total: number, ref: string) {
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  setFill(doc, NAVY);
  doc.rect(0, H - 12, W, 12, "F");

  setTextColor(doc, LIGHT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(`Page ${page} of ${total}`, 10, H - 4.5);
  doc.text(`Ref: ${ref}  |  ${DATE_SHORT}  |  © 2026 GeoVisionPro`, W / 2, H - 4.5, { align: "center" });
  doc.text("www.geovisionpro.com", W - 10, H - 4.5, { align: "right" });
}

/* ══════════════════════════════════════════════════════════════════
   EXPORTED PDF GENERATORS
   ══════════════════════════════════════════════════════════════════ */

/* ── 1. Press Release ────────────────────────────────────────────── */
export async function downloadPressRelease(
  headline: string, date: string, body: string, idx = 1
) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo("PR", idx);

  addHeader(doc, {
    ref,
    type: "Press Release",
    left: ["Issued by", "Corporate Communications Dept"],
    right: [["Website", "www.geovisionpro.com"]],
  });

  let y = CY;

  tagBadge(doc, "PRESS RELEASE", 10, y); y += 9;

  setTextColor(doc, [10, 22, 40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const tl = doc.splitTextToSize(headline, W - 20);
  doc.text(tl, 10, y);
  y += tl.length * 7 + 3;

  setTextColor(doc, [80, 110, 150] as RGB);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Date: ${date}  ·  Source: GeoVisionPro Official Communications`, 10, y);
  y += 8;
  hr(doc, y, GREEN); y += 8;

  y = secHead(doc, "Introduction", y);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  y = wrappedText(doc, body, 10, y, W - 20, 5.5);
  y += 9;

  y = secHead(doc, "Key Highlights", y);
  const highlights = [
    "High-resolution geospatial data processing at national scale across India.",
    "AI-powered change detection and automated land-use classification.",
    "Multi-spectral and multi-temporal satellite data analysis capability.",
    "Cloud-based GIS data storage, sharing, and real-time collaboration.",
    "Compatible with QGIS, ArcGIS Pro, and Google Earth Engine platforms.",
  ];
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  highlights.forEach(h => {
    if (y > H - 50) return;
    y = wrappedText(doc, `•  ${h}`, 14, y, W - 24, 5);
    y += 1.5;
  });
  y += 7;

  if (y < H - 50) {
    setFill(doc, [235, 245, 255] as RGB);
    doc.roundedRect(10, y, W - 20, 22, 2, 2, "F");
    setFill(doc, LOGO_BLUE);
    doc.rect(10, y, 3, 22, "F");
    setTextColor(doc, [10, 22, 40] as RGB);
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(9);
    const qy = wrappedText(doc,
      `"This announcement represents a significant step in our mission to make precision geospatial data accessible, accurate, and actionable for every stakeholder across India."`,
      18, y + 7, W - 30, 5);
    setTextColor(doc, [80, 110, 150] as RGB);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("— Director, GeoVisionPro", 18, qy + 3);
    y = qy + 12;
  }

  y += 4;
  hr(doc, y); y += 8;
  y = secHead(doc, "About GeoVisionPro", y);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  y = wrappedText(doc,
    "GeoVisionPro is India's premier geospatial technology company, specialising in remote sensing, GIS analysis, satellite mapping, drone surveys, and AI-powered geo-analytics. Serving government agencies, urban planners, and environmental organisations across 22 states.",
    10, y, W - 20, 5);
  y += 7;

  setTextColor(doc, [80, 110, 150] as RGB);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Media Contact:", 10, y); y += 5;
  doc.setFont("helvetica", "normal");
  doc.text("communications@geovisionpro.com  |  +91-XXXXX-XXXXX", 10, y);

  addFooter(doc, 1, 1, ref);
  doc.save(`${ref}.pdf`);
}

/* ── 2. Publication / Report ─────────────────────────────────────── */
const PUB_CODE: Record<string, string> = {
  "Research Report": "RP", "Field Report": "FR",
  "White Paper": "WP",     "Technical Guide": "TG",
};

export async function downloadPublication(
  title: string, type: string, date: string, pages: number, desc: string,
  author = "GeoVisionPro Research Division", idx = 1
) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const code  = PUB_CODE[type] ?? "RP";
  const ref   = refNo(code, idx);

  /* Cover page */
  setFill(doc, NAVY);
  doc.rect(0, 0, W, H, "F");
  setFill(doc, GREEN);
  doc.rect(0, 0, W, 5, "F");
  doc.rect(0, H - 5, W, 5, "F");

  drawLogo(doc, W / 2 - 10, 50, 20);

  setTextColor(doc, WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("GeoVision", W / 2 - doc.getTextWidth("GeoVisionPro") / 2, 78);
  setTextColor(doc, PRO_BLUE);
  doc.text("Pro", W / 2 - doc.getTextWidth("GeoVisionPro") / 2 + doc.getTextWidth("GeoVision"), 78);

  tagBadge(doc, type.toUpperCase(), W / 2 - 15, 91);

  setTextColor(doc, WHITE);
  doc.setFontSize(16);
  const tl = doc.splitTextToSize(title, W - 40);
  doc.text(tl, W / 2, 102, { align: "center" });

  const tb = 102 + tl.length * 7;
  setTextColor(doc, LIGHT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Published: ${date}`, W / 2, tb + 8,  { align: "center" });
  doc.text(`Author: ${author}`,  W / 2, tb + 14, { align: "center" });
  doc.text(`${pages} pages  ·  Ref: ${ref}`, W / 2, tb + 20, { align: "center" });

  addFooter(doc, 1, pages, ref);

  /* Content page */
  doc.addPage();
  addHeader(doc, {
    ref, type,
    left: ["Author", author],
    right: [["Pages", `${pages} pages`], ["Version", "1.0"]],
  });

  let y = CY;
  setTextColor(doc, [10, 22, 40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const tl2 = doc.splitTextToSize(title, W - 20);
  doc.text(tl2, 10, y);
  y += tl2.length * 6 + 5;
  hr(doc, y, GREEN); y += 9;

  y = secHead(doc, "Executive Summary", y);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  y = wrappedText(doc, desc, 10, y, W - 20, 5.5);
  y += 9;

  y = secHead(doc, "Table of Contents", y);
  const toc: [string, string][] = [
    ["1. Executive Summary",               "02"],
    ["2. Introduction & Background",       "03"],
    ["3. Study Area & Methodology",        "05"],
    ["4. Data Sources & Satellite Imagery","08"],
    ["5. Analysis & Findings",             "12"],
    ["6. Maps & Visual Data",              "16"],
    ["7. Conclusions",                     "20"],
    ["8. Recommendations",                 "22"],
    ["9. References & Bibliography",       "23"],
  ];
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  toc.forEach(([item, pg]) => {
    if (y > H - 30) return;
    doc.text(item, 14, y);
    doc.text(pg, W - 10, y, { align: "right" });
    setDrawColor(doc, DIV_CLR);
    doc.setLineWidth(0.2);
    const iw = doc.getTextWidth(item) + 16;
    doc.line(iw, y - 0.8, W - doc.getTextWidth(pg) - 12, y - 0.8);
    y += 5.5;
  });

  y += 7;
  y = secHead(doc, "Introduction", y);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  y = wrappedText(doc,
    "Rapid urbanisation, land-use change, and environmental degradation have intensified the need for accurate, timely, and repeatable geospatial monitoring. Remote sensing provides a scalable and cost-effective solution, enabling area-wide assessment at resolutions previously unattainable through ground-based methods alone.",
    10, y, W - 20, 5.5);
  y += 8;

  if (y < H - 40) {
    y = secHead(doc, "Methodology", y);
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    wrappedText(doc,
      "Multi-temporal satellite imagery from Landsat 8/9 and Sentinel-2 was acquired and pre-processed for atmospheric correction and cloud masking. Supervised classification algorithms were applied using Google Earth Engine. Ground truth data was validated at 50 stratified random sample points.",
      10, y, W - 20, 5.5);
  }

  addFooter(doc, 2, pages, ref);
  const slug = title.replace(/[^a-z0-9]/gi, "-").substring(0, 35);
  doc.save(`${ref}-${slug}.pdf`);
}

/* ── 3. Transcript / Slides / Notes ─────────────────────────────── */
const TR_CODE: Record<string, string> = { Transcript: "TR", Slides: "SL", Notes: "SN" };
const TR_TYPE: Record<string, string> = {
  Transcript: "Video Transcript", Slides: "Webinar Slides", Notes: "Speaker Notes",
};

export async function downloadTranscript(
  title: string, duration: string, kind: "Transcript" | "Slides" | "Notes", idx = 1
) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo(TR_CODE[kind], idx);
  const type  = TR_TYPE[kind];

  addHeader(doc, {
    ref, type,
    left: ["Duration", duration],
    right: [["Speaker", "GeoVisionPro Expert Team"]],
  });

  let y = CY;
  tagBadge(doc, kind.toUpperCase(), 10, y); y += 9;

  setTextColor(doc, [10, 22, 40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const tl = doc.splitTextToSize(title, W - 20);
  doc.text(tl, 10, y);
  y += tl.length * 6 + 4;

  setTextColor(doc, [80, 110, 150] as RGB);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`GeoVision Video Series  ·  Duration: ${duration}  ·  GeoVisionPro Academy`, 10, y);
  y += 9;
  hr(doc, y, GREEN); y += 9;

  if (kind === "Transcript") {
    const segments = [
      { time: "00:00", head: "Introduction",    text: `Welcome to GeoVisionPro's video series. Today's session covers: ${title}. This topic is fundamental to modern geospatial practice and has wide applications across urban planning, environmental monitoring, and infrastructure development.` },
      { time: "02:15", head: "Background",       text: "We begin with the theoretical foundation — why this topic matters and how it fits into the broader landscape of GIS and remote sensing workflows used by professionals across India and globally." },
      { time: "05:40", head: "Methodology",      text: "The methodology section covers data acquisition strategies, processing pipelines, and quality assurance techniques. We walk through each step with screen-captured examples from real GeoVisionPro project environments." },
      { time: "09:00", head: "Case Study",        text: "A real-world case study from GeoVisionPro's field operations is examined in detail, demonstrating practical application of the technique and quantifying the accuracy gains achieved in the field." },
      { time: "11:30", head: "Key Takeaways",     text: "We close with a concise summary of the most actionable learnings from this session, plus links to supplementary reading materials and GeoVisionPro Academy course registration." },
    ];
    y = secHead(doc, "Full Transcript", y);
    segments.forEach(s => {
      if (y > H - 30) return;
      setFill(doc, DARK);
      doc.roundedRect(10, y, W - 20, 8, 1, 1, "F");
      setTextColor(doc, GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(`[${s.time}]`, 13, y + 5.5);
      setTextColor(doc, WHITE);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(s.head, 32, y + 5.5);
      y += 12;
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      y = wrappedText(doc, s.text, 14, y, W - 24, 4.5);
      y += 7;
    });
  } else if (kind === "Slides") {
    y = secHead(doc, "Slide Index & Content Summary", y);
    const slides = [
      ["01", "Introduction & Agenda",        "Opening slide: speaker introduction, session objectives, and roadmap."],
      ["02", "Background & Context",          "Why this topic is critical to modern geospatial practice."],
      ["03", "Core Concepts",                 "Key definitions, frameworks, and theoretical foundations."],
      ["04", "Step-by-Step Methodology",      "Full data processing workflow with annotated screenshots."],
      ["05", "Data Sources & Tools",          "Overview of satellite data platforms and GIS tools used."],
      ["06", "Results & Visualisation",       "Thematic maps, charts, and accuracy assessment outputs."],
      ["07", "Case Studies",                  "Two real-world project examples from GeoVisionPro's portfolio."],
      ["08", "Summary & Q&A",                 "Key learnings, next steps, and audience question session."],
    ];
    slides.forEach(([num, title2, note]) => {
      if (y > H - 20) return;
      setFill(doc, DARK);
      doc.roundedRect(10, y, W - 20, 9, 1, 1, "F");
      setTextColor(doc, GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(`Slide ${num}`, 14, y + 6);
      setTextColor(doc, WHITE);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(title2, 36, y + 6);
      y += 13;
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(note, 14, y);
      y += 7;
    });
  } else {
    y = secHead(doc, "Study Notes & Exercises", y);
    const notes = [
      ["Pre-reading Checklist",  "Review basic coordinate systems (WGS84/UTM), familiarise yourself with the QGIS or ArcGIS interface, and ensure access to the sample dataset at geovisionpro.com/academy/resources."],
      ["Core Terminology",        "Key terms: multi-temporal analysis, supervised classification, accuracy assessment, NDVI, spectral bands, ground truth, spatial resolution, and confusion matrix."],
      ["Exercise 1 – Hands-on",  "Download the provided Sentinel-2 data subset. Apply atmospheric correction (DOS1 method) using QGIS Semi-Automatic Classification Plugin. Export the corrected image as GeoTIFF."],
      ["Exercise 2 – Analysis",   "Perform supervised classification using a minimum of 5 land-cover classes. Calculate overall accuracy and Kappa coefficient from the resulting confusion matrix."],
      ["Further Reading",          "Lillesand, Kiefer & Chipman (2015) — Remote Sensing and Image Interpretation; Jensen (2016) — Introductory Digital Image Processing; GeoVisionPro blog at geovisionpro.com/blogs."],
    ];
    notes.forEach(([head, text]) => {
      if (y > H - 30) return;
      setFill(doc, DARK);
      doc.roundedRect(10, y, W - 20, 8, 1, 1, "F");
      setTextColor(doc, GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text(head, 14, y + 5.5);
      y += 12;
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      y = wrappedText(doc, text, 14, y, W - 24, 4.5);
      y += 6;
    });
  }

  addFooter(doc, 1, 1, ref);
  const slug = title.replace(/[^a-z0-9]/gi, "-").substring(0, 30);
  doc.save(`${ref}-${slug}.pdf`);
}

/* ── 4. Newsletter ───────────────────────────────────────────────── */
export async function downloadNewsletter(month: string, edition: number) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo("NL", edition);

  addHeader(doc, {
    ref,
    type: "Monthly Newsletter",
    left: ["Edition", `Volume 1, Issue ${edition}`],
  });

  // Title banner
  setFill(doc, DARK);
  doc.rect(0, CY, W, 20, "F");
  setTextColor(doc, WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("GeoVision Monthly", W / 2, CY + 11, { align: "center" });
  setTextColor(doc, GREEN);
  doc.setFontSize(9);
  doc.text(`${month}  ·  Edition #${edition}`, W / 2, CY + 17.5, { align: "center" });

  let y = CY + 29;

  // Welcome
  setTextColor(doc, [80, 110, 150] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("WELCOME MESSAGE", 10, y); y += 5;
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  y = wrappedText(doc,
    `Dear GeoVisionPro Community, welcome to the ${month} edition of the GeoVision Monthly. This issue brings you updates from our field operations, course launches, platform improvements, and upcoming events across India.`,
    10, y, W - 20, 5);
  y += 8;

  const stories = [
    {
      head: "Platform Update",
      body: "Our satellite data portal now supports batch download of multi-temporal Sentinel-2 composites, reducing processing time by up to 60% for large area studies. The updated interface is available at portal.geovisionpro.com with role-based access for enterprise and government clients.",
    },
    {
      head: "Training Spotlight",
      body: "New batch of the Google Earth Engine Professional Course opens next month. Early bird enrolment is live at geovisionpro.com/courses. The programme covers satellite data processing, machine learning classification, and large-scale environmental analysis using GEE's JavaScript API.",
    },
    {
      head: "Project Milestone",
      body: "The Ganga Delta river basin survey has crossed the 50% completion mark. Field teams have collected over 3,400 GPS control points and processed 240 sq km of UAV orthophotography. The full deliverable report is expected by end of quarter.",
    },
    {
      head: "Industry News",
      body: "India's National Remote Sensing Centre has published updated LULC basemaps for 2025. GeoVisionPro's comparative analysis — validating NRSC outputs against our field-verified datasets across five states — is now available for download on our publications page.",
    },
  ];

  stories.forEach(s => {
    if (y > H - 60) return;
    setFill(doc, DARK);
    doc.roundedRect(10, y, W - 20, 8, 1, 1, "F");
    setTextColor(doc, GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(s.head, 14, y + 5.5);
    y += 12;
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    y = wrappedText(doc, s.body, 12, y, W - 22, 4.5);
    y += 6;
    hr(doc, y); y += 6;
  });

  if (y < H - 40) {
    y += 3;
    setFill(doc, DARK);
    doc.roundedRect(10, y, W - 20, 22, 2, 2, "F");
    setTextColor(doc, GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Upcoming Events this Month", 14, y + 7);
    setTextColor(doc, LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("•  GeoVisionPro Training Webinar – Free registration open at geovisionpro.com/events", 14, y + 13);
    doc.text("•  Field Survey debrief meeting – Internal calendar invite sent to project teams", 14, y + 18.5);
  }

  addFooter(doc, 1, 2, ref);

  // Page 2
  doc.addPage();
  addHeader(doc, { ref, type: "Monthly Newsletter", left: ["Edition", `Volume 1, Issue ${edition}`] });
  let y2 = CY;

  y2 = secHead(doc, "Team Highlights", y2);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  y2 = wrappedText(doc,
    "This month we welcome four new GIS analysts to the remote sensing division. Our team now spans 12 states with project coordinators embedded in regional survey offices in Guwahati, Lucknow, Chennai, and Ahmedabad. Total headcount has reached 150+ geospatial professionals.",
    10, y2, W - 20, 5.5);
  y2 += 9;

  y2 = secHead(doc, "Upcoming Events", y2);
  const evList: [string, string, string][] = [
    ["Remote Sensing Workshop",  "July 5, 2026",     "Kolkata"],
    ["GIS India Summit",         "August 15, 2026",  "New Delhi"],
    ["GeoVisionPro Annual Meet", "Sept 20, 2026",    "Bangalore"],
  ];
  evList.forEach(([name, d, loc]) => {
    setFill(doc, DARK);
    doc.roundedRect(10, y2, W - 20, 8, 1, 1, "F");
    setTextColor(doc, GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(name, 14, y2 + 5.5);
    setTextColor(doc, LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`${d}  ·  ${loc}`, W - 12, y2 + 5.5, { align: "right" });
    y2 += 12;
  });

  y2 += 10;
  y2 = secHead(doc, "Subscribe & Connect", y2);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("newsletter@geovisionpro.com  |  www.geovisionpro.com/newsletter", 10, y2);
  y2 += 6;
  setTextColor(doc, [80, 110, 150] as RGB);
  doc.setFontSize(8);
  doc.text("To unsubscribe reply UNSUBSCRIBE to the address above. View past issues at geovisionpro.com/newsletters.", 10, y2);

  addFooter(doc, 2, 2, ref);
  doc.save(`${ref}-${month.replace(/\s/g, "")}.pdf`);
}

/* ── 5. Event Brochure / Schedule / Registration ─────────────────── */
export async function downloadEventPDF(
  name: string, date: string, location: string, type: string, desc: string,
  kind: "Brochure" | "Schedule" | "Registration", idx = 1
) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo("EV", idx);

  addHeader(doc, {
    ref,
    type: `Event ${kind}`,
    left: ["Event", name.substring(0, 38)],
    right: [["Venue", location], ["Event Date", date]],
  });

  let y = CY;
  tagBadge(doc, type.toUpperCase(), 10, y); y += 9;

  setTextColor(doc, [10, 22, 40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  const tl = doc.splitTextToSize(name, W - 20);
  doc.text(tl, 10, y);
  y += tl.length * 7 + 3;

  setTextColor(doc, GREEN);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`${date}   ·   ${location}`, 10, y);
  y += 9;
  hr(doc, y, GREEN); y += 9;

  y = secHead(doc, "About This Event", y);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  y = wrappedText(doc, desc, 10, y, W - 20, 5.5);
  y += 8;

  if (kind === "Schedule") {
    y = secHead(doc, "Event Schedule", y);
    const schedule: [string, string][] = [
      ["09:00 – 09:30", "Registration & Welcome Tea"],
      ["09:30 – 10:30", "Inaugural Session & Keynote Address"],
      ["10:30 – 11:00", "Networking Break"],
      ["11:00 – 13:00", "Technical Paper Presentations — Session I"],
      ["13:00 – 14:00", "Lunch & Technology Expo"],
      ["14:00 – 16:00", "Technical Paper Presentations — Session II"],
      ["16:00 – 16:30", "Panel Discussion: Future of GIS in India"],
      ["16:30 – 17:00", "Closing Ceremony & Certificate Distribution"],
    ];
    schedule.forEach(([time, act]) => {
      if (y > H - 20) return;
      setFill(doc, DARK);
      doc.roundedRect(10, y, W - 20, 8, 1, 1, "F");
      setTextColor(doc, GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(time, 13, y + 5.5);
      setTextColor(doc, WHITE);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(act, 62, y + 5.5);
      y += 11;
    });
    y += 5;
    setTextColor(doc, [80, 110, 150] as RGB);
    doc.setFontSize(8);
    doc.text("Schedule subject to minor changes. Confirmed timings will be circulated to registered participants.", 10, y);

  } else if (kind === "Registration") {
    y = secHead(doc, "Registration Form", y);
    const fields = [
      "Full Name",
      "Designation / Role",
      "Organisation",
      "Email Address",
      "Mobile Number",
      "City & State",
      "Participation Mode  (In-person  /  Online)",
      "Special Requirements  (dietary, accessibility)",
    ];
    fields.forEach(f => {
      if (y > H - 35) return;
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`${f}:`, 10, y);
      setDrawColor(doc, DIV_CLR);
      doc.setLineWidth(0.3);
      doc.line(10, y + 4, W - 10, y + 4);
      y += 13;
    });
    y += 3;
    setFill(doc, DARK);
    doc.roundedRect(10, y, W - 20, 18, 2, 2, "F");
    setTextColor(doc, GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Registration Fees", 14, y + 7);
    setTextColor(doc, LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Early Bird (before July 15, 2026):  ₹2,500    |    Standard Rate:  ₹3,500", 14, y + 13.5);
    y += 22;
    setFill(doc, GREEN);
    doc.roundedRect(10, y, W - 20, 10, 2, 2, "F");
    setTextColor(doc, WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Submit to: events@geovisionpro.com  |  WhatsApp: +91-XXXXX-XXXXX", W / 2, y + 6.5, { align: "center" });

  } else {
    y = secHead(doc, "Why Attend?", y);
    [
      "Network with 300+ GIS and remote sensing professionals from across India.",
      "Attend technical paper presentations on cutting-edge geospatial research.",
      "Visit the technology expo showcasing the latest mapping and survey equipment.",
      "Earn CPD points towards your professional continuing development requirements.",
      "Receive a certificate of participation from GeoVisionPro and supporting bodies.",
    ].forEach(b => {
      if (y > H - 20) return;
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      y = wrappedText(doc, `•  ${b}`, 13, y, W - 23, 5);
      y += 2;
    });
    y += 8;
    setFill(doc, GREEN);
    doc.roundedRect(10, y, W - 20, 12, 2, 2, "F");
    setTextColor(doc, WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Register: events.geovisionpro.com  |  events@geovisionpro.com", W / 2, y + 7.5, { align: "center" });
  }

  addFooter(doc, 1, 1, ref);
  const slug = name.replace(/[^a-z0-9]/gi, "-").substring(0, 28);
  doc.save(`${ref}-${kind}-${slug}.pdf`);
}

/* ── 6. Survey Report / Field Data / Map ─────────────────────────── */
const SR_CODE: Record<string, string> = { Report: "SR", FieldData: "FD", Map: "SM" };
const SR_TYPE: Record<string, string> = {
  Report:    "Field Survey Report",
  FieldData: "Field Data Summary",
  Map:       "Survey Map Document",
};

export async function downloadSurveyPDF(
  project: string, location: string, status: string, desc: string,
  kind: "Report" | "FieldData" | "Map", idx = 1
) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo(SR_CODE[kind], idx);

  addHeader(doc, {
    ref,
    type: SR_TYPE[kind],
    left: ["Project", project.substring(0, 38)],
    right: [["Location", location], ["Status", status]],
  });

  let y = CY;

  const stClr: RGB = status === "Ongoing" ? GREEN : status === "Completed" ? [37,99,235] : [217,119,6];
  setFill(doc, stClr);
  doc.roundedRect(10, y - 4, doc.getTextWidth(status) + 8, 6.5, 1, 1, "F");
  setTextColor(doc, WHITE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text(status, 14, y);
  y += 9;

  setTextColor(doc, [10, 22, 40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  const tl = doc.splitTextToSize(project, W - 20);
  doc.text(tl, 10, y);
  y += tl.length * 6 + 4;

  setTextColor(doc, GREEN);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text(`Location: ${location}  ·  Team: GeoVisionPro Survey Division`, 10, y);
  y += 9;
  hr(doc, y, GREEN); y += 9;

  if (kind === "Map") {
    setFill(doc, DARK);
    doc.roundedRect(10, y, W - 20, 70, 2, 2, "F");
    setFill(doc, [15, 40, 30] as RGB);
    doc.roundedRect(18, y + 6, W - 36, 56, 1, 1, "F");
    setTextColor(doc, GREEN);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("[Survey Area Map Placeholder]", W / 2, y + 36, { align: "center" });
    setTextColor(doc, LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(`Survey Region: ${location}`, W / 2, y + 44, { align: "center" });
    doc.text("CRS: WGS 84 / UTM Zone 44N  ·  Scale: 1:50,000", W / 2, y + 49.5, { align: "center" });
    doc.text("Imagery: Sentinel-2 10m  ·  Surveyed: June 2026", W / 2, y + 55, { align: "center" });
    y += 76;
    setTextColor(doc, [80, 110, 150] as RGB);
    doc.setFontSize(7.5);
    doc.text("Placeholder — georeferenced deliverable will be supplied as GeoTIFF, SHP, and KML formats.", 10, y);

  } else if (kind === "FieldData") {
    y = secHead(doc, "Field Data Summary", y);
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y = wrappedText(doc, desc, 10, y, W - 20, 5.5); y += 8;

    const rows: [string, string][] = [
      ["Survey Area",            "As per project boundary (GIS polygon provided)"],
      ["GPS Control Points",     "1,200+ (DGPS accuracy ±0.1 m)"],
      ["Instrument Used",        "DGPS, Total Station, UAV (Phantom 4 RTK)"],
      ["Imagery Resolution",     "< 5 cm GSD (UAV)  /  10 m (Sentinel-2)"],
      ["Coordinate System",      "WGS84 UTM Zone 44N / 45N"],
      ["Processing Software",    "ArcGIS Pro / QGIS 3.x / ERDAS IMAGINE"],
      ["QA / QC Pass Rate",      "97.4% (validated against independent check points)"],
      ["Survey Date",            `June 2026  ·  Status: ${status}`],
    ];
    rows.forEach(([k, v], i) => {
      setFill(doc, i === 0 ? (GREEN as RGB) : i % 2 === 0 ? (DARK as RGB) : ([8,18,34] as RGB));
      doc.roundedRect(10, y - 4, W - 20, 8, 0.5, 0.5, "F");
      setTextColor(doc, i === 0 ? WHITE : LIGHT);
      doc.setFont("helvetica", i === 0 ? "bold" : "normal");
      doc.setFontSize(8.5);
      doc.text(k, 14, y);
      doc.text(v, W / 2 + 5, y);
      y += 9;
    });

  } else {
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y = wrappedText(doc, desc, 10, y, W - 20, 5.5); y += 8;

    const secs = [
      { h: "1. Project Overview",     t: `This survey was commissioned to systematically assess and document ${project} using precision geospatial methods. The scope covers the full designated study area in ${location} with deliverables conforming to national mapping and reporting standards.` },
      { h: "2. Methodology",          t: "Multi-phase approach: Phase 1 — reconnaissance and horizontal/vertical control establishment using DGPS. Phase 2 — data acquisition via UAV photogrammetry and multispectral satellite imagery. Phase 3 — processing, classification, and statistical accuracy assessment against independent check points." },
      { h: "3. Preliminary Findings", t: "Initial analysis indicates significant spatial variation in land-cover and terrain characteristics across the study zone. Quantitative results, cartographic outputs, and accuracy statistics are included in the complete deliverable package submitted to the client authority." },
      { h: "4. Recommendations",      t: "Continued monitoring at 6-month intervals is recommended based on survey findings. GeoVisionPro is available to provide Phase II extended survey services and GIS database maintenance upon formal request from the project authority." },
    ];
    secs.forEach(s => {
      if (y > H - 40) { doc.addPage(); addHeader(doc, { ref, type: SR_TYPE[kind] }); addFooter(doc, 2, 2, ref); y = CY; }
      y = secHead(doc, s.h, y);
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      y = wrappedText(doc, s.t, 10, y, W - 20, 5.5);
      y += 9;
    });
  }

  addFooter(doc, 1, 1, ref);
  const slug = project.replace(/[^a-z0-9]/gi, "-").substring(0, 30);
  doc.save(`${ref}-${kind}-${slug}.pdf`);
}

/* ── 7. Partner Program ──────────────────────────────────────────── */
const PT_CODE: Record<string, string> = { Brochure:"PB", Agreement:"PA", Benefits:"PB", Application:"AF" };
const PT_IDX:  Record<string, number> = { Brochure:1,    Agreement:1,    Benefits:2,    Application:1 };
const PT_TYPE: Record<string, string> = {
  Brochure:"Partner Program Brochure", Agreement:"Partnership Agreement",
  Benefits:"Partner Benefits Guide",   Application:"Partner Application Form",
};

export async function downloadPartnerPDF(kind: "Brochure" | "Agreement" | "Benefits" | "Application") {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo(PT_CODE[kind], PT_IDX[kind]);

  addHeader(doc, { ref, type: PT_TYPE[kind], right: [["Version", "2026 Edition"]] });

  let y = CY;
  setTextColor(doc, [10,22,40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("GeoVisionPro Partner Program", W / 2, y, { align: "center" });
  y += 7;
  setTextColor(doc, GREEN);
  doc.setFontSize(9.5);
  doc.text(PT_TYPE[kind] + " — 2026", W / 2, y, { align: "center" });
  y += 11;
  hr(doc, y, GREEN); y += 9;

  if (kind === "Application") {
    y = secHead(doc, "Partnership Application Form 2026", y);
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y = wrappedText(doc, "Complete all fields and email to partners@geovisionpro.com. Our team will respond within 7 working days.", 10, y, W - 20, 5); y += 8;
    const fields = [
      "Organisation / Institution Name",
      "Type  (Academic / Private / Government / NGO)",
      "Website URL",
      "Primary Contact Name",
      "Designation",
      "Email Address",
      "Phone Number",
      "City & State",
      "Preferred Tier  (Silver / Gold / Platinum)",
      "Brief Description of Collaboration Interest",
      "Existing GIS / Remote Sensing Capabilities",
      "Expected Benefits from Partnership",
    ];
    fields.forEach(f => {
      if (y > H - 30) { doc.addPage(); addHeader(doc, { ref, type: PT_TYPE[kind] }); addFooter(doc, 2, 2, ref); y = CY; }
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`${f}:`, 10, y);
      setDrawColor(doc, DIV_CLR);
      doc.setLineWidth(0.3);
      doc.line(10, y + 4, W - 10, y + 4);
      y += 13;
    });
    y += 5;
    setFill(doc, GREEN);
    doc.roundedRect(10, y, W - 20, 10, 2, 2, "F");
    setTextColor(doc, WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Submit to: partners@geovisionpro.com  |  WhatsApp: +91-XXXXX-XXXXX", W / 2, y + 6.5, { align: "center" });

  } else if (kind === "Benefits") {
    const tiers = [
      { name: "Silver Partner",   bs: ["Access to GeoVisionPro public GIS datasets and basemaps", "Company logo on GeoVisionPro website partner page", "One joint webinar per calendar year", "Quarterly newsletter co-branding feature", "10% discount on all training programmes"] },
      { name: "Gold Partner",     bs: ["All Silver Partner benefits", "Access to curated 5-year satellite imagery archive", "Co-branded project reports and publications", "Two joint webinars per year", "Dedicated partner liaison officer", "20% discount on training programmes", "Priority project referrals from GeoVisionPro network"] },
      { name: "Platinum Partner", bs: ["All Gold Partner benefits", "Full research dataset access (proprietary and licensed)", "Joint project development with revenue-share arrangement", "Annual co-research publication in peer-reviewed journal", "GeoVisionPro brand ambassador status for 1 year", "Up to 5 complimentary training seats per course batch", "Custom API access to GeoVisionPro geospatial tools"] },
    ];
    tiers.forEach(t => {
      if (y > H - 30) return;
      setFill(doc, DARK);
      doc.roundedRect(10, y, W - 20, 7, 1, 1, "F");
      setTextColor(doc, GREEN);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(t.name, 14, y + 5);
      y += 11;
      t.bs.forEach(b => {
        if (y > H - 20) return;
        setTextColor(doc, BODY_TXT);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        y = wrappedText(doc, `✓  ${b}`, 14, y, W - 24, 4.5); y += 1.5;
      });
      y += 8;
    });

  } else if (kind === "Agreement") {
    const clauses = [
      { h: "1. Parties",              t: "This Partnership Agreement is entered into between GeoVisionPro (hereinafter 'GVP') and the Partner Organisation as identified in the accepted application form (GVP-AF-2026-001)." },
      { h: "2. Scope of Partnership", t: "The partnership covers joint activities in GIS project delivery, training programmes, research publications, and co-branding as outlined in the selected Partner Tier document (GVP-PB-2026-001 or GVP-PB-2026-002)." },
      { h: "3. Term",                 t: "This agreement is valid for one (1) calendar year from the date of signing and may be renewed by mutual written consent at least 30 days prior to the expiry date." },
      { h: "4. Confidentiality",      t: "Both parties agree to maintain strict confidentiality of all proprietary data, client information, and business strategies shared in the course of the partnership." },
      { h: "5. Intellectual Property",t: "Joint publications and deliverables shall credit both organisations equally. Proprietary datasets remain the sole property of the originating party and may not be reproduced without written permission." },
      { h: "6. Termination",          t: "Either party may terminate this agreement with 30 days written notice. All obligations existing at the termination date, including confidentiality obligations, shall survive termination." },
      { h: "7. Governing Law",        t: "This agreement is governed by the laws of India. Any disputes shall be resolved through arbitration in Hyderabad, Telangana, under the Arbitration and Conciliation Act, 1996." },
    ];
    clauses.forEach(c => {
      if (y > H - 35) { doc.addPage(); addHeader(doc, { ref, type: PT_TYPE[kind] }); addFooter(doc, 2, 2, ref); y = CY; }
      y = secHead(doc, c.h, y);
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      y = wrappedText(doc, c.t, 10, y, W - 20, 4.5); y += 8;
    });
    y += 4; hr(doc, y); y += 10;
    setTextColor(doc, [80,110,150] as RGB);
    doc.setFontSize(8);
    doc.text("Authorised Signature (GeoVisionPro):  ___________________________   Date: ___________", 10, y); y += 11;
    doc.text("Authorised Signature (Partner Org):   ___________________________   Date: ___________", 10, y);

  } else {
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y = wrappedText(doc, "GeoVisionPro Partner Program connects academic institutions, NGOs, government departments, and private sector organisations with India's leading geospatial expertise. Join our network to collaborate on field surveys, research, training, and technology projects.", 10, y, W - 20, 5.5); y += 9;
    y = secHead(doc, "How to Apply", y);
    [
      "Step 1:  Download and complete the Partner Application Form (GVP-AF-2026-001).",
      "Step 2:  Email the completed form along with your organisation profile to partners@geovisionpro.com.",
      "Step 3:  Our partnerships team reviews the application and responds within 5 working days.",
      "Step 4:  MoU signing and partner onboarding session scheduled at mutual convenience.",
      "Step 5:  Access partner resources, co-branding assets, and begin active collaboration.",
    ].forEach(s => {
      if (y > H - 20) return;
      setTextColor(doc, BODY_TXT);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      y = wrappedText(doc, s, 13, y, W - 23, 5); y += 3;
    });
    y += 7;
    setFill(doc, GREEN);
    doc.roundedRect(10, y, W - 20, 12, 2, 2, "F");
    setTextColor(doc, WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Contact: partners@geovisionpro.com  |  www.geovisionpro.com/partners", W / 2, y + 7.5, { align: "center" });
  }

  addFooter(doc, 1, 1, ref);
  doc.save(`${ref}-Partner${kind}.pdf`);
}

/* ── 8. Social Media Kit ─────────────────────────────────────────── */
export async function downloadSocialKit() {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo("SC", 1);

  addHeader(doc, { ref, type: "Social Media Kit", right: [["Version", "2026 Edition"]] });

  let y = CY;
  setTextColor(doc, [10,22,40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("GeoVisionPro — Official Social Media Kit 2026", W / 2, y, { align: "center" });
  y += 11;
  hr(doc, y, GREEN); y += 9;

  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  y = wrappedText(doc, "This document contains GeoVisionPro's official social media handles, verified URLs, approved hashtags, and brand usage guidelines. Use this kit when referencing GeoVisionPro in any social media post, press mention, or digital publication.", 10, y, W - 20, 5.5); y += 9;

  y = secHead(doc, "Official Handles & Platforms", y);
  const platforms: [string, string, string, RGB][] = [
    ["LinkedIn",    "GeoVisionPro",      "linkedin.com/company/geovisionpro", [0,119,181]   ],
    ["Twitter / X", "@GeoVisionPro",     "x.com/GeoVisionPro",               [29,161,242]  ],
    ["YouTube",     "GeoVisionPro",      "youtube.com/@GeoVisionPro",         [255,0,0]     ],
    ["Instagram",   "@geovisionpro",     "instagram.com/geovisionpro",        [225,48,108]  ],
    ["Facebook",    "GeoVisionPro India","facebook.com/GeoVisionPro",         [24,119,242]  ],
  ];
  platforms.forEach(([pname, handle, url, color]) => {
    if (y > H - 20) return;
    setFill(doc, DARK);
    doc.roundedRect(10, y, W - 20, 12, 1, 1, "F");
    setFill(doc, color);
    doc.roundedRect(10, y, 3, 12, 0.5, 0.5, "F");
    setTextColor(doc, WHITE);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(pname, 17, y + 5.5);
    setTextColor(doc, GREEN);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(handle, 17, y + 10);
    setTextColor(doc, LIGHT);
    doc.text(url, W - 12, y + 7, { align: "right" });
    y += 15;
  });

  y += 6;
  y = secHead(doc, "Official Hashtags", y);
  const htags = ["#GeoVisionPro","#GIS","#RemoteSensing","#LULC","#DroneMapping","#GeospatialIndia","#SatelliteImagery","#GISTraining","#GeospatialTech","#AIinGIS"];
  let xTag = 10;
  htags.forEach(t => {
    doc.setFontSize(7.5);
    const tw = doc.getTextWidth(t);
    if (xTag + tw + 10 > W - 10) { xTag = 10; y += 9; }
    setFill(doc, DARK);
    doc.roundedRect(xTag, y - 4, tw + 8, 7, 1, 1, "F");
    setTextColor(doc, GREEN);
    doc.text(t, xTag + 4, y);
    xTag += tw + 12;
  });
  y += 12;
  hr(doc, y); y += 8;

  y = secHead(doc, "Posting Guidelines", y);
  ["Always use the official GeoVisionPro logo from the Logo Pack (GVP-MR-2026-001).",
   "Use approved brand colours only: Navy #0a1628, Green #1d9e75, Text #b0c4d8.",
   "Tag @GeoVisionPro in all posts, articles, and social media mentions.",
   "Approved image formats: JPG and PNG only. Minimum resolution: 1920 × 1080 px.",
   "Do not alter, distort, or recolour the GeoVisionPro logo under any circumstances.",
  ].forEach(g => {
    if (y > H - 20) return;
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y = wrappedText(doc, `•  ${g}`, 14, y, W - 24, 5); y += 1.5;
  });
  y += 7;
  setTextColor(doc, [80,110,150] as RGB);
  doc.setFontSize(8);
  doc.text("Brand enquiries: social@geovisionpro.com  |  www.geovisionpro.com", 10, y);

  addFooter(doc, 1, 1, ref);
  doc.save(`${ref}-SocialMediaKit.pdf`);
}

/* ── 9. Blog PDF ─────────────────────────────────────────────────── */
export async function downloadBlog(
  title: string, author: string, date: string, category: string, excerpt: string, idx = 1
) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo("BL", idx);

  addHeader(doc, {
    ref,
    type: "Blog Article",
    left: ["Author", author],
    right: [["Category", category]],
  });

  let y = CY;
  tagBadge(doc, category.toUpperCase(), 10, y); y += 9;

  setTextColor(doc, [10,22,40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const tl = doc.splitTextToSize(title, W - 20);
  doc.text(tl, 10, y);
  y += tl.length * 6.5 + 4;

  setTextColor(doc, [80,110,150] as RGB);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`By ${author}   ·   ${date}   ·   geovisionpro.com/blogs`, 10, y);
  y += 9;
  hr(doc, y, GREEN); y += 9;

  const body = [
    excerpt,
    "Remote sensing and GIS technologies have fundamentally changed the way professionals analyse, map, and monitor our environment. With freely available satellite data from programmes like Copernicus and NASA/USGS Landsat, geospatial analysis is now accessible to a far wider professional audience than ever before.",
    "The tools available today — from open-source platforms like QGIS and Google Earth Engine to enterprise solutions like ArcGIS Pro and ERDAS IMAGINE — provide unprecedented analytical power for crop monitoring, urban sprawl detection, disaster response, and coastal zone management.",
    "In this article, we explore practical workflows, industry best practices, and expert insights drawn from GeoVisionPro's experience across hundreds of projects spanning infrastructure, agriculture, environmental monitoring, and field survey operations.",
    "Whether you are a student beginning your GIS journey or a seasoned professional updating your toolkit, we hope this article provides actionable guidance you can apply immediately in your own geospatial work.",
  ];
  body.forEach(para => {
    if (y > H - 30) return;
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    y = wrappedText(doc, para, 10, y, W - 20, 5.5); y += 7;
  });

  hr(doc, y); y += 7;
  setTextColor(doc, GREEN);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("More at: geovisionpro.com/blogs  |  Subscribe: newsletter@geovisionpro.com", 10, y);

  addFooter(doc, 1, 1, ref);
  const slug = title.replace(/[^a-z0-9]/gi, "-").substring(0, 35);
  doc.save(`${ref}-${slug}.pdf`);
}

/* ── 10. Media Resource ──────────────────────────────────────────── */
export async function downloadMediaResource(name: string, filename: string, idx = 1) {
  const JsPDF = await getJsPDF();
  const doc   = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W     = doc.internal.pageSize.getWidth();
  const H     = doc.internal.pageSize.getHeight();
  const ref   = refNo("MR", idx);

  addHeader(doc, { ref, type: "Media Resource", right: [["Version", "2026 Edition"]] });

  let y = CY;
  setTextColor(doc, [10,22,40] as RGB);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(name, W / 2, y, { align: "center" });
  y += 9;
  hr(doc, y, GREEN); y += 9;

  y = secHead(doc, "Company Overview", y);
  setTextColor(doc, BODY_TXT);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  y = wrappedText(doc,
    "GeoVisionPro is a leading geospatial technology company headquartered in Kolkata, West Bengal. We specialise in GIS mapping, remote sensing, satellite image processing, drone and UAV surveys, and geospatial training, serving government agencies, urban planners, agricultural bodies, and educational institutions across 22 states of India.",
    10, y, W - 20, 5.5); y += 9;

  y = secHead(doc, "Key Facts", y);
  const facts: [string, string][] = [
    ["Founded",            "2018"],
    ["Headquarters",       "Kolkata, West Bengal, India"],
    ["Team Size",          "150+ geospatial professionals"],
    ["Projects Completed", "500+ across 22 states"],
    ["Certifications",     "ISO 9001:2015 certified"],
    ["Core Services",      "GIS, Remote Sensing, Drone Survey, AI Analytics, Training"],
  ];
  facts.forEach(([k, v], i) => {
    if (y > H - 20) return;
    setFill(doc, i % 2 === 0 ? (DARK as RGB) : ([8,18,34] as RGB));
    doc.roundedRect(10, y - 4, W - 20, 8, 0.5, 0.5, "F");
    setTextColor(doc, LIGHT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(k, 14, y);
    setTextColor(doc, WHITE);
    doc.text(v, W / 2 + 5, y);
    y += 9;
  });

  y += 8;
  y = secHead(doc, "Brand Colours", y);
  const cols: [string, string, RGB][] = [
    ["Navy Blue", "#0a1628", NAVY  as RGB],
    ["Green",     "#1d9e75", GREEN as RGB],
    ["Text Blue", "#b0c4d8", LIGHT as RGB],
  ];
  cols.forEach(([label, hex, rgb]) => {
    if (y > H - 20) return;
    setFill(doc, rgb);
    doc.roundedRect(10, y - 3.5, 18, 7, 1, 1, "F");
    setTextColor(doc, BODY_TXT);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(`${label}  ·  ${hex}`, 33, y);
    y += 9;
  });

  y += 8;
  setTextColor(doc, [80,110,150] as RGB);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Document: ${name}  ·  File: ${filename}`, 10, y); y += 5;
  doc.text("For the complete media pack contact: media@geovisionpro.com  |  www.geovisionpro.com", 10, y);

  addFooter(doc, 1, 1, ref);
  doc.save(`${ref}-${filename}`);
}

/* ── ICS calendar file ───────────────────────────────────────────── */
export function downloadICS(name: string, dateStr: string, location: string, desc: string) {
  const d     = new Date(dateStr);
  const pad   = (n: number) => String(n).padStart(2, "0");
  const ymd   = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GeoVisionPro//Events//EN",
    "BEGIN:VEVENT",
    `UID:${stamp}@geovisionpro.com`, `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd}`, `DTEND;VALUE=DATE:${ymd}`,
    `SUMMARY:${name}`, `LOCATION:${location}`,
    `DESCRIPTION:${desc.replace(/\n/g, "\\n")} — GeoVisionPro Events`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), {
    href: url, download: `GVP-Event-${name.replace(/\s+/g, "-")}.ics`,
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
