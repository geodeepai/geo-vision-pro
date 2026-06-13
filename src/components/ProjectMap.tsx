"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const PROJECTS = [
  { lat: 28.6139, lng: 77.2090, city: "New Delhi",    type: "lulc",  label: "Urban LULC Mapping",             detail: "Multi-temporal Sentinel-2 classification of Delhi NCR urban sprawl" },
  { lat: 19.0760, lng: 72.8777, city: "Mumbai",        type: "gis",   label: "Coastal GIS Analysis",           detail: "Shoreline change detection & tidal inundation risk mapping" },
  { lat: 12.9716, lng: 77.5946, city: "Bangalore",     type: "ai",    label: "AI Forest Cover Monitor",        detail: "Deep learning change detection in Bannerghatta forest buffer" },
  { lat: 13.0827, lng: 80.2707, city: "Chennai",       type: "drone", label: "Port UAV Survey",                detail: "High-resolution orthomosaic & volumetric survey of port assets" },
  { lat: 22.5726, lng: 88.3639, city: "Kolkata",       type: "rs",    label: "Sundarbans RS Study",            detail: "Mangrove health monitoring via SAR + optical fusion" },
  { lat: 17.3850, lng: 78.4867, city: "Hyderabad",     type: "lulc",  label: "Peri-Urban LULC Expansion",      detail: "Bi-annual land cover dynamics for infrastructure planning" },
  { lat: 23.0225, lng: 72.5714, city: "Ahmedabad",     type: "gis",   label: "Industrial Corridor GIS",        detail: "Multi-layer spatial database for DMIC industrial zone planning" },
  { lat: 26.4499, lng: 80.3319, city: "Kanpur",        type: "rs",    label: "Ganga River Monitoring",         detail: "River bank erosion & water quality index mapping using RS" },
  { lat: 21.1702, lng: 72.8311, city: "Surat",         type: "drone", label: "Urban Heat Island UAV",          detail: "Thermal drone survey for urban heat mitigation planning" },
  { lat: 26.9124, lng: 75.7873, city: "Jaipur",        type: "lulc",  label: "Desert Encroachment Mapping",    detail: "LULC transition analysis for Thar Desert boundary shifts" },
  { lat: 30.7333, lng: 76.7794, city: "Chandigarh",    type: "gis",   label: "Smart City GIS Platform",        detail: "Integrated GIS database for utility & asset management" },
  { lat: 15.2993, lng: 74.1240, city: "Goa",           type: "rs",    label: "Coastal Erosion Study",          detail: "Decadal shoreline change mapping from Landsat archives" },
  { lat: 24.5854, lng: 73.7125, city: "Udaipur",       type: "ai",    label: "Lake Water Level AI",            detail: "LSTM-based water level prediction from multi-date SAR data" },
  { lat: 11.0168, lng: 76.9558, city: "Coimbatore",    type: "drone", label: "Crop Stress UAV Survey",         detail: "NDVI & NDRE drone mapping for precision agriculture advisory" },
  // International
  { lat: 27.7172, lng: 85.3240, city: "Kathmandu",     type: "ai",    label: "Earthquake Damage Assessment",  detail: "AI building damage classification from post-quake satellite imagery" },
  { lat: 23.8103, lng: 90.4125, city: "Dhaka",         type: "rs",    label: "Flood Extent Mapping",           detail: "Sentinel-1 SAR flood inundation mapping for monsoon response" },
  { lat: 6.9271,  lng: 79.8612, city: "Colombo",       type: "gis",   label: "Urban Mobility GIS",             detail: "Road network & transit accessibility spatial analysis" },
];

const TYPE_CONFIG: Record<string, { color: string; label: string }> = {
  lulc:  { color: "#059669", label: "LULC" },
  rs:    { color: "#2563eb", label: "Remote Sensing" },
  gis:   { color: "#7c3aed", label: "GIS Analytics" },
  drone: { color: "#ea580c", label: "Drone / UAV" },
  ai:    { color: "#0891b2", label: "AI / Deep Learning" },
};

function makeIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:14px;height:14px;border-radius:50%;
      background:${color};
      border:2.5px solid rgba(255,255,255,0.85);
      box-shadow:0 0 0 4px ${color}40, 0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

function FitIndia() {
  const map = useMap();
  useEffect(() => {
    map.setView([22.5, 82.5], 5);
  }, [map]);
  return null;
}

export default function ProjectMap() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 420, border: "1px solid rgba(255,255,255,0.08)" }}>

      <MapContainer
        center={[22.5, 82.5]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%", background: "#060d1f" }}
        zoomControl={false}
      >
        <FitIndia />

        {/* Dark CartoDB tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />

        {PROJECTS.map((p, i) => {
          const cfg = TYPE_CONFIG[p.type];
          return (
            <Marker key={i} position={[p.lat, p.lng]} icon={makeIcon(cfg.color)}>
              <Popup
                closeButton={false}
                className="gvp-popup"
              >
                <div style={{
                  background: "#0d1b2e",
                  border: `1px solid ${cfg.color}40`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  minWidth: 200,
                  fontFamily: "inherit",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color, flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{cfg.label}</span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#f1f5f9", margin: "0 0 4px" }}>{p.label}</p>
                  <p style={{ fontSize: 10, color: "#64748b", margin: "0 0 6px", lineHeight: 1.5 }}>{p.detail}</p>
                  <p style={{ fontSize: 10, color: "#475569", margin: 0 }}>📍 {p.city}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend overlay */}
      <div style={{
        position: "absolute", bottom: 12, left: 12, zIndex: 1000,
        background: "rgba(6,13,31,0.88)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12, padding: "10px 14px", backdropFilter: "blur(8px)",
      }}>
        <p style={{ fontSize: 9, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 7px" }}>Project Types</p>
        {Object.entries(TYPE_CONFIG).map(([, cfg]) => (
          <div key={cfg.label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Project count badge */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 1000,
        background: "rgba(6,13,31,0.88)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10, padding: "6px 12px", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite", display: "inline-block" }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8" }}>{PROJECTS.length} Active Projects</span>
      </div>

    </div>
  );
}
