const items = [
  "Remote Sensing", "LULC Mapping", "Google Earth Engine", "ArcGIS Pro",
  "AutoCAD", "STAAD Pro", "AI & Machine Learning", "Satellite Image Analysis",
  "Drone Mapping", "GIS Consulting", "Change Detection", "Spatial Analysis",
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-3.5 overflow-hidden">
      <div className="ticker-animate">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 whitespace-nowrap">
            <span className="text-sm text-slate-500 font-medium">{item}</span>
            <span className="text-blue-400 text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
