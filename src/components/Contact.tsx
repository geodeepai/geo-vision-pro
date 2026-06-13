"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Monitor, Send, CheckCircle2 } from "lucide-react";

const infoItems = [
  {
    icon: <MapPin size={20} />,
    color: "#2563eb",
    title: "Location",
    lines: ["Remote & On-site Consultancy", "Pan India & Global"],
  },
  {
    icon: <Mail size={20} />,
    color: "#059669",
    title: "Email",
    lines: ["info@geovisionpro.com", "training@geovisionpro.com"],
  },
  {
    icon: <Phone size={20} />,
    color: "#7c3aed",
    title: "Phone",
    lines: ["+91 98XXX XXXXX", "Mon–Sat, 9am–6pm IST"],
  },
  {
    icon: <Monitor size={20} />,
    color: "#d97706",
    title: "Online Training",
    lines: ["Live Classes via Zoom/Teams", "Recorded sessions available"],
  },
];

const interestOptions = [
  {
    group: "Consultancy",
    options: ["Remote Sensing Consultancy", "LULC Analysis & Mapping", "GIS & Spatial Analysis", "Drone & UAV Mapping", "AI-Powered Geo-Analytics", "Structural & Civil Consulting"],
  },
  {
    group: "Training Courses",
    options: ["Google Earth Engine (GEE)", "ArcGIS Pro & ArcMap", "AutoCAD for Civil & Survey", "STAAD Pro Structural Analysis", "AI & Machine Learning", "Remote Sensing Fundamentals"],
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-14 md:py-24" style={{ background: "var(--section-alt)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase mb-4"
            style={{ background: "var(--badge-bg)", borderColor: "var(--badge-border)", color: "var(--badge-text)" }}
          >
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--heading)" }}>
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p style={{ color: "var(--body-text)" }}>Have a project or want to enroll? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {infoItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-0.5"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}14`, border: `1.5px solid ${item.color}30`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "var(--heading)" }}>{item.title}</div>
                  {item.lines.map((line, j) => (
                    <div key={j} className="text-xs" style={{ color: "var(--body-text)" }}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center gap-4 rounded-2xl border p-12 text-center"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(5,150,105,0.12)" }}>
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold" style={{ color: "var(--heading)" }}>Message Sent!</h3>
                <p style={{ color: "var(--body-text)" }}>We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2 rounded-lg border text-sm transition-all hover:opacity-80"
                  style={{ borderColor: "var(--card-border)", color: "var(--body-text)" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border p-8 space-y-5 shadow-sm"
                style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Full Name" type="text" id="name" placeholder="Your name" required />
                  <FormField label="Email Address" type="email" id="email" placeholder="your@email.com" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Phone Number" type="tel" id="phone" placeholder="+91 XXXXX XXXXX" />
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-blue-500/40"
                      style={{ background: "var(--input-bg)", borderColor: "var(--card-border)", color: "var(--heading)" }}
                    >
                      <option value="">Select a service/course</option>
                      {interestOptions.map((group) => (
                        <optgroup key={group.group} label={group.group}>
                          {group.options.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your requirements or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm resize-none transition-colors outline-none focus:ring-2 focus:ring-blue-500/40"
                    style={{ background: "var(--input-bg)", borderColor: "var(--card-border)", color: "var(--heading)" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 8px 24px rgba(37,99,235,0.25)" }}
                >
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, type, id, placeholder, required,
}: {
  label: string; type: string; id: string; placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: "var(--heading)" }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors outline-none focus:ring-2 focus:ring-blue-500/40"
        style={{ background: "var(--input-bg)", borderColor: "var(--card-border)", color: "var(--heading)" }}
      />
    </div>
  );
}
