const items = [
  "Remote Sensing", "LULC Mapping", "Google Earth Engine", "ArcGIS Pro",
  "AutoCAD", "STAAD Pro", "AI & Machine Learning", "Satellite Image Analysis",
  "Drone Mapping", "GIS Consulting", "Change Detection", "Spatial Analysis",
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div
      className="border-y py-3.5 overflow-hidden"
      style={{ background: "var(--section-alt)", borderColor: "var(--card-border)" }}
    >
      <div className="ticker-animate">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 whitespace-nowrap">
            <span className="text-sm font-medium" style={{ color: "var(--body-text)" }}>{item}</span>
            <span className="text-blue-400 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
