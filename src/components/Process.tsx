import { MessageSquare, FileText, Activity, CheckCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <MessageSquare size={26} />,
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    title: "Initial Consultation",
    desc: "Share your requirements, goals, or learning objectives with our team for a personalized assessment.",
  },
  {
    num: "02",
    icon: <FileText size={26} />,
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    title: "Custom Plan",
    desc: "We design a tailored consultancy approach or course curriculum aligned with your specific needs.",
  },
  {
    num: "03",
    icon: <Activity size={26} />,
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    title: "Execution",
    desc: "Our experts deliver high-quality work or structured training with regular progress updates.",
  },
  {
    num: "04",
    icon: <CheckCircle size={26} />,
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    title: "Delivery & Support",
    desc: "Receive final deliverables or certification with continued post-project or post-course support.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-14 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our <span className="gradient-text">Simple Process</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            From first contact to successful project delivery or course completion
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-slate-200 bg-white p-7 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Connector arrow (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center shadow-sm">
                  <span className="text-slate-400 text-xs font-bold">›</span>
                </div>
              )}

              {/* Step number */}
              <div className="text-5xl font-black mb-5 select-none" style={{ color: s.color, opacity: 0.1 }}>
                {s.num}
              </div>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: s.bg, border: `1.5px solid ${s.border}`, color: s.color }}
              >
                {s.icon}
              </div>

              <h3 className="text-slate-900 font-bold mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: s.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
