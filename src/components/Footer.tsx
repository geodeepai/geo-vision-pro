import VisitorCount from "./VisitorCount";

const footerLinks = {
  Services: [
    "Remote Sensing", "LULC Mapping", "GIS Analysis",
    "Drone Mapping", "AI Geo-Analytics", "Structural Consulting",
  ],
  Courses: [
    "Google Earth Engine", "ArcGIS Pro", "AutoCAD",
    "STAAD Pro", "AI & Machine Learning", "Remote Sensing",
  ],
  "Quick Links": [
    "About Us", "Our Process", "Contact",
    "Privacy Policy", "Careers",
  ],
};

const anchors: Record<string, string> = {
  "About Us": "#about",
  "Our Process": "#process",
  Contact: "#contact",
  "Privacy Policy": "/privacy",
};

export default function Footer() {
  return (
    <footer className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                  <path d="M4 12 Q8 6 12 12 Q16 18 20 12" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">
                GeoVision<span className="text-blue-500">Pro</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Premier consultancy and training institute in Remote Sensing, GIS, and geospatial technologies.
            </p>
            <div className="flex gap-2.5">
              {["LinkedIn", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-9 h-9 rounded-lg border border-slate-700 bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all text-xs font-medium"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white text-sm font-semibold mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={anchors[link] ?? "#"}
                      className="text-slate-400 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 GeoVision Pro. All rights reserved.</p>
          <VisitorCount />
          <p>Built with passion for geospatial excellence.</p>
        </div>
      </div>
    </footer>
  );
}
