"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Monitor, Send, CheckCircle2 } from "lucide-react";

const infoItems = [
  {
    icon: <MapPin size={20} />,
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    title: "Location",
    lines: ["Remote & On-site Consultancy", "Pan India & Global"],
  },
  {
    icon: <Mail size={20} />,
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    title: "Email",
    lines: ["info@geovisionpro.com", "training@geovisionpro.com"],
  },
  {
    icon: <Phone size={20} />,
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    title: "Phone",
    lines: ["+91 98XXX XXXXX", "Mon–Sat, 9am–6pm IST"],
  },
  {
    icon: <Monitor size={20} />,
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
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
    <section id="contact" className="py-14 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-slate-500">Have a project or want to enroll? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {infoItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-white hover:shadow-md hover:shadow-slate-100 transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, border: `1.5px solid ${item.border}`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-slate-800 text-sm font-semibold mb-1">{item.title}</div>
                  {item.lines.map((line, j) => (
                    <div key={j} className="text-slate-500 text-xs">{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-slate-900 text-xl font-bold">Message Sent!</h3>
                <p className="text-slate-500">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm hover:text-slate-700 hover:border-slate-300 transition-all"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Full Name" type="text" id="name" placeholder="Your name" required />
                  <FormField label="Email Address" type="email" id="email" placeholder="your@email.com" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField label="Phone Number" type="tel" id="phone" placeholder="+91 XXXXX XXXXX" />
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Area of Interest <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm transition-colors"
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
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your requirements or questions..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm resize-none transition-colors placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-200 hover:-translate-y-0.5"
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
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm placeholder:text-slate-400 transition-colors"
      />
    </div>
  );
}
