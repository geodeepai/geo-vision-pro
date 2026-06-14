"use client";
import { useState } from "react";
import { downloadTutorialPDF } from "@/lib/gvpPDF";

/* ── Types ───────────────────────────────────────────────────────── */
interface Tutorial {
  id: number;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate";
  duration: string;
  software: string;
  steps: string[];
  code?: string;
  issues: string[];
}

/* ── Data ────────────────────────────────────────────────────────── */
const TUT_CATS = ["All", "QGIS", "Google Earth Engine", "Python GIS", "Drone", "Remote Sensing", "ArcGIS"];

const TUTORIALS: Tutorial[] = [
  {
    id: 1, title: "How to Install QGIS on Windows 11",
    category: "QGIS", level: "Beginner", duration: "10 min read", software: "QGIS",
    steps: [
      "Step 1 – Visit qgis.org and download the QGIS 3.x Long Term Release installer for Windows.",
      "Step 2 – Right-click the installer and select 'Run as Administrator' to avoid permission issues.",
      "Step 3 – Choose 'OSGeo4W' installation type for the full component suite.",
      "Step 4 – Accept the default component selection (includes GRASS GIS and SAGA).",
      "Step 5 – Click Install and wait approximately 15 minutes for the full installation.",
      "Step 6 – Launch QGIS Desktop from the Start Menu and verify the interface loads correctly.",
      "Step 7 – Go to Plugins > Manage and Install Plugins to verify the plugin system is working.",
    ],
    issues: [
      "Missing DLL error on launch → uninstall and reinstall using the OSGeo4W installer.",
      "Slow startup time → Plugins > Manage Plugins > disable any unused or experimental plugins.",
      "CRS/Projection error → go to Project > Properties > CRS and set to EPSG:4326 (WGS 84).",
    ],
  },
  {
    id: 2, title: "Load a Shapefile in QGIS",
    category: "QGIS", level: "Beginner", duration: "8 min read", software: "QGIS",
    steps: [
      "Step 1 – Open QGIS and create a new project (Project > New).",
      "Step 2 – Go to Layer > Add Layer > Add Vector Layer from the menu bar.",
      "Step 3 – Click the Browse button and navigate to your .shp file location.",
      "Step 4 – Select the .shp file and click Add, then close the dialog.",
      "Step 5 – Right-click the layer in the Layers panel and select Zoom to Layer.",
      "Step 6 – Press F6 to open the Attribute Table and inspect the data fields.",
      "Step 7 – Double-click the layer to open Layer Properties and customise the symbology.",
    ],
    issues: [
      "Layer not displaying → ensure the .dbf, .prj, and .shx files are in the same folder as the .shp file.",
      "Blank attribute table → the .dbf file may be missing or corrupted; re-export from source.",
      "Wrong CRS / misaligned layers → right-click layer > Properties > Source > set coordinate reference system.",
    ],
  },
  {
    id: 3, title: "NDVI Calculation in QGIS",
    category: "QGIS", level: "Intermediate", duration: "15 min read", software: "QGIS",
    steps: [
      "Step 1 – Download Sentinel-2 imagery from Copernicus Open Access Hub (scihub.copernicus.eu) and load bands B4 (Red) and B8 (NIR) into QGIS.",
      "Step 2 – Go to Raster > Raster Calculator to open the formula editor.",
      "Step 3 – Enter the NDVI formula: (\"B8@1\" - \"B4@1\") / (\"B8@1\" + \"B4@1\")",
      "Step 4 – Set the output extent and CRS to match the input bands.",
      "Step 5 – Click OK to run the calculation and generate the NDVI raster layer.",
      "Step 6 – Go to Layer Properties > Symbology, set render type to Singleband pseudocolor, choose the RdYlGn colour ramp with min = -1, max = 1.",
      "Step 7 – Export the result via Raster > Save As and choose GeoTIFF format.",
    ],
    code: `Formula: NDVI = (NIR - Red) / (NIR + Red)\n\nIn QGIS Raster Calculator:\n("B8@1" - "B4@1") / ("B8@1" + "B4@1")\n\nInterpretation:\n-1.0 to 0.0  →  Water / Bare soil\n 0.0 to 0.3  →  Sparse vegetation\n 0.3 to 0.6  →  Moderate vegetation\n 0.6 to 1.0  →  Dense healthy vegetation`,
    issues: [
      "Division by zero error → add a small epsilon: (B8 - B4) / (B8 + B4 + 0.0001)",
      "Values outside -1 to +1 range → check that both bands are loaded as Float32, not Integer.",
      "Misaligned bands → ensure both bands have the same spatial resolution and extent before calculating.",
    ],
  },
  {
    id: 4, title: "Create a Heatmap in QGIS",
    category: "QGIS", level: "Intermediate", duration: "12 min read", software: "QGIS",
    steps: [
      "Step 1 – Load your point data file (CSV with lat/lon or shapefile) into QGIS.",
      "Step 2 – If using CSV, go to Layer > Add Delimited Text Layer and specify the X (longitude) and Y (latitude) fields.",
      "Step 3 – Double-click the point layer to open Layer Properties, then navigate to Symbology.",
      "Step 4 – Change the render type from Single Symbol to Heatmap in the dropdown.",
      "Step 5 – Set the Radius value (e.g. 10 map units) to control the influence area of each point.",
      "Step 6 – Select a colour ramp such as YlOrRd (yellow to red) for density visualisation.",
      "Step 7 – Adjust the Maximum value and Weight field if your data has intensity attributes.",
      "Step 8 – To export as a raster for further analysis, use Raster > Save As > GeoTIFF.",
    ],
    issues: [
      "Heatmap appears blank → ensure the layer has point geometry, not polygon or line.",
      "Low resolution output → increase the Rows/Columns value in the Export Raster dialog.",
      "Performance is slow → reduce the radius or work with a projected CRS (e.g. UTM) instead of geographic coordinates.",
    ],
  },
  {
    id: 5, title: "Load Sentinel-2 in Google Earth Engine",
    category: "Google Earth Engine", level: "Intermediate", duration: "15 min read", software: "Google Earth Engine",
    steps: [
      "Step 1 – Sign in to the GEE Code Editor at code.earthengine.google.com using your Google account.",
      "Step 2 – Create a new script in the Scripts panel on the left side.",
      "Step 3 – Define your area of interest geometry using the drawing tools or by importing a shapefile asset.",
      "Step 4 – Load and filter the Sentinel-2 SR Harmonized image collection.",
      "Step 5 – Create a cloud-free median composite from the filtered collection.",
      "Step 6 – Add the composite to the map as a true-colour (RGB) visualisation.",
      "Step 7 – Click Run to execute the script and inspect the output in the Map panel.",
    ],
    code: `// Step 4 – Load Sentinel-2 collection\nvar s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')\n  .filterDate('2026-01-01', '2026-06-01')\n  .filterBounds(geometry)\n  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));\n\n// Step 5 – Median composite\nvar image = s2.median();\n\n// Step 6 – Visualise true colour\nMap.addLayer(image,\n  {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000},\n  'Sentinel-2 True Colour');`,
    issues: [
      "Script quota exceeded → reduce the date range or use a smaller area of interest geometry.",
      "Black/empty tiles → increase the max value in the visualisation parameters (try 5000 for hazy scenes).",
      "Authentication error → re-authorise via earthengine authenticate in the GEE terminal.",
    ],
  },
  {
    id: 6, title: "Introduction to GeoPandas",
    category: "Python GIS", level: "Intermediate", duration: "20 min read", software: "Python / GeoPandas",
    steps: [
      "Step 1 – Install the required libraries: pip install geopandas matplotlib folium",
      "Step 2 – Import GeoPandas and load a shapefile using gpd.read_file().",
      "Step 3 – Inspect the CRS (Coordinate Reference System) using gdf.crs.",
      "Step 4 – Reproject to WGS84 (EPSG:4326) using gdf.to_crs(epsg=4326).",
      "Step 5 – Plot the data using gdf.plot() with a column and colormap.",
      "Step 6 – Perform a spatial join using gpd.sjoin() to combine point and polygon datasets.",
      "Step 7 – Save the result back to a shapefile using gdf.to_file('output.shp').",
    ],
    code: `import geopandas as gpd\nimport matplotlib.pyplot as plt\n\n# Load shapefile\ngdf = gpd.read_file('india_states.shp')\nprint(gdf.crs)             # Check CRS\n\n# Reproject to WGS84\ngdf = gdf.to_crs(epsg=4326)\n\n# Plot with population column\ngdf.plot(column='population', cmap='YlOrRd',\n         legend=True, figsize=(10, 8))\nplt.title('India Population by State')\nplt.show()\n\n# Spatial join: find which state each point falls in\nresult = gpd.sjoin(points, gdf, how='inner',\n                   predicate='within')`,
    issues: [
      "Fiona import error → install with: conda install -c conda-forge geopandas (use conda instead of pip).",
      "CRS mismatch in sjoin → always reproject both layers to the same CRS before spatial join.",
      "Slow plotting on large datasets → use gdf.simplify(0.01) to reduce geometry complexity before plotting.",
    ],
  },
  {
    id: 7, title: "Plan a Drone Mapping Mission",
    category: "Drone", level: "Beginner", duration: "15 min read", software: "DJI Pilot / Litchi",
    steps: [
      "Step 1 – Check DGCA airspace restrictions for your survey location at digitalsky.dgca.gov.in before flying.",
      "Step 2 – Open DJI Pilot or the Litchi app and connect to your drone via the controller.",
      "Step 3 – Use the mission planning tool to draw the survey area boundary on the map.",
      "Step 4 – Set flight parameters: Altitude 80–120 m AGL, Speed 5–7 m/s, Front overlap 80%, Side overlap 70%.",
      "Step 5 – Place a minimum of 5 Ground Control Points (GCPs) distributed across the survey area.",
      "Step 6 – Check drone battery level (>80% recommended) and weather (wind < 15 km/h, no rain).",
      "Step 7 – Execute the autonomous mission and monitor the flight from the ground control station.",
      "Step 8 – Import captured images into Agisoft Metashape or OpenDroneMap for processing.",
    ],
    issues: [
      "GPS signal weak → wait for 8+ satellite lock (shown in app) before starting the mission.",
      "Images out of alignment → increase overlap to 85/75 and ensure consistent lighting conditions.",
      "DGCA permit required → for flights above 120m AGL or in controlled airspace, file via Digital Sky portal.",
    ],
  },
];

/* ── Level badge ─────────────────────────────────────────────────── */
const lvlBadge = {
  Beginner:     "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/25",
};

const catColors: Record<string, string> = {
  "QGIS":                 "#1d9e75",
  "Google Earth Engine":  "#3b82f6",
  "Python GIS":           "#8b5cf6",
  "Drone":                "#f59e0b",
  "Remote Sensing":       "#06b6d4",
  "ArcGIS":               "#ec4899",
};

/* ══════════════════════════════════════════════════════════════════ */
export default function TutorialsPage() {
  const [cat,      setCat]      = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = cat === "All" ? TUTORIALS : TUTORIALS.filter(t => t.category === cat);
  const refStr   = (id: number) => `GVP-TUT-2026-${String(id).padStart(3, "0")}`;

  return (
    <main style={{ background: "#0a1628", minHeight: "100vh", color: "#b0c4d8" }}>

      {/* ── Hero ── */}
      <section style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f2035 60%,#0a1628 100%)" }}
        className="pt-24 pb-10 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-widest"
          style={{ background: "rgba(29,158,117,0.12)", border: "1px solid rgba(29,158,117,0.3)", color: "#1d9e75" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1d9e75] animate-pulse inline-block" />
          GeoVisionPro Tutorials
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
          Step-by-Step GIS &amp;
          <br className="hidden sm:block" /> <span style={{ color: "#1d9e75" }}>Remote Sensing Guides</span>
        </h1>
        <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "#b0c4d8" }}>
          Practical tutorials written by GeoVisionPro experts. Download each tutorial as a professional PDF
          reference guide for offline use.
        </p>
      </section>

      {/* ── Filter tabs ── */}
      <section className="px-4 py-6 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-2">
          {TUT_CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all"
              style={{
                background:  cat === c ? "#1d9e75" : "rgba(255,255,255,0.04)",
                borderColor: cat === c ? "#1d9e75" : "rgba(255,255,255,0.1)",
                color:       cat === c ? "#fff"    : "#b0c4d8",
              }}>
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ── Tutorial list ── */}
      <section className="px-4 pb-16 max-w-5xl mx-auto space-y-4">
        {filtered.map(tut => {
          const isOpen = expanded === tut.id;
          const accent = catColors[tut.category] ?? "#1d9e75";

          return (
            <div key={tut.id}
              style={{ background: "#0f2035", border: `1px solid ${isOpen ? accent + "55" : "rgba(255,255,255,0.07)"}`, borderRadius: 12 }}
              className="overflow-hidden transition-all duration-200">
              {/* Card header — always visible */}
              <button
                className="w-full text-left px-5 py-4 flex items-start gap-4"
                onClick={() => setExpanded(isOpen ? null : tut.id)}>
                {/* Number badge */}
                <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white"
                  style={{ background: accent + "25", border: `1px solid ${accent}55`, color: accent }}>
                  {String(tut.id).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: accent + "18", color: accent, border: `1px solid ${accent}33` }}>
                      {tut.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${lvlBadge[tut.level]}`}>
                      {tut.level}
                    </span>
                    <span className="text-[10px]" style={{ color: "#8aa3be" }}>{tut.duration}</span>
                    <span className="text-[10px] font-semibold" style={{ color: "#8aa3be" }}>{refStr(tut.id)}</span>
                  </div>
                  <h3 className="text-white font-black text-[15px] leading-snug pr-4">{tut.title}</h3>
                </div>
                <span className="flex-shrink-0 text-xl leading-none font-light mt-1 transition-transform duration-200"
                  style={{ color: accent, transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {/* Steps */}
                  <div className="pt-4">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                      Step-by-Step Instructions
                    </p>
                    <div className="space-y-2">
                      {tut.steps.map((step, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black text-white mt-0.5"
                            style={{ background: accent + "30", color: accent }}>
                            {i + 1}
                          </span>
                          <p style={{ color: "#b0c4d8" }} className="leading-relaxed">
                            {step.replace(/^Step \d+\s*[–\-]\s*/, "")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code block */}
                  {tut.code && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
                        Code Reference
                      </p>
                      <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl p-4"
                        style={{ background: "#061020", color: "#a8d8a8", border: "1px solid rgba(29,158,117,0.2)", fontFamily: "monospace" }}>
                        {tut.code}
                      </pre>
                    </div>
                  )}

                  {/* Common issues */}
                  {tut.issues.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#f59e0b" }}>
                        Common Issues &amp; Fixes
                      </p>
                      <div className="space-y-2">
                        {tut.issues.map((issue, i) => (
                          <div key={i} className="flex gap-2 text-xs" style={{ color: "#b0c4d8" }}>
                            <span style={{ color: "#f59e0b" }} className="flex-shrink-0 mt-0.5">⚠</span>
                            <span>{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download button */}
                  <div className="flex gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button
                      onClick={() => downloadTutorialPDF(
                        tut.title, tut.level, tut.software,
                        tut.steps, tut.issues, tut.id
                      )}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                      style={{ background: "#1d9e75" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download PDF ({refStr(tut.id)})
                    </button>
                    <a href="mailto:academy@geovisionpro.com"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#b0c4d8", border: "1px solid rgba(255,255,255,0.1)" }}>
                      Ask a Question
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p style={{ color: "#8aa3be" }}>No tutorials found in this category.</p>
          </div>
        )}
      </section>
    </main>
  );
}
