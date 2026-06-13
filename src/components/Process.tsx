import { MessageSquare, FileText, Activity, CheckCircle } from "lucide-react";

const steps = [
  { num: "01", icon: <MessageSquare size={26} />, color: "#2563eb", title: "Initial Consultation",   desc: "Share your requirements, goals, or learning objectives with our team for a personalised assessment." },
  { num: "02", icon: <FileText size={26} />,      color: "#059669", title: "Custom Plan",            desc: "We design a tailored consultancy approach or course curriculum aligned with your specific needs." },
  { num: "03", icon: <Activity size={26} />,      color: "#7c3aed", title: "Execution",             desc: "Our experts deliver high-quality work or structured training with regular progress updates." },
  { num: "04", icon: <CheckCircle size={26} />,   color: "#d97706", title: "Delivery & Support",    desc: "Receive final deliverables or certification with continued post-project or post-course support." },
];

export default function Process() {
  return (
    <section id="process" className="py-14 md:py-24" style={{ background: "var(--section-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "var(--badge-border)", color: "var(--badge-text)" }}
          >
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--heading)" }}>
            Our <span className="gradient-text">Simple Process</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm" style={{ color: "var(--body-text)" }}>
            From first contact to successful project delivery or course completion
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl border p-7 hover:-translate-y-1 transition-all duration-300 group"
              style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
            >
              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full items-center justify-center shadow-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                  <span className="text-xs font-bold" style={{ color: "var(--muted)" }}>›</span>
                </div>
              )}

              {/* Step number */}
              <div className="text-xs font-black mb-4 tracking-widest" style={{ color: s.color }}>{s.num}</div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${s.color}14`, border: `1.5px solid ${s.color}30`, color: s.color }}
              >
                {s.icon}
              </div>

              <h3 className="font-black text-sm mb-2" style={{ color: "var(--heading)" }}>{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--body-text)" }}>{s.desc}</p>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: `linear-gradient(90deg,transparent,${s.color},transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
