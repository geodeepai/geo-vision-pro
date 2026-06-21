"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckCircle, Mail, Send, Loader2, MessageSquare, User, Briefcase,
  AtSign, PhoneCall, SlidersHorizontal, Navigation2, DollarSign,
  Calendar, MapPin,
} from "lucide-react";

type FormData = {
  fullName: string; company: string; email: string; phone: string;
  service: string; location: string; budget: string;
  message: string; contactMethod: "phone" | "email" | "whatsapp";
};
type FormErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

const SERVICES = [
  "Satellite Image Processing & Analysis",
  "LULC Mapping & Change Detection",
  "Spectral Indices & Thematic Mapping",
  "Environmental Impact Assessment",
  "Terrain & DEM Analysis",
  "Drone / UAV Survey",
  "GIS & Spatial Analysis",
  "AI-Powered Geo-Analytics",
  "Structural & Civil Consulting",
  "Other / Not Sure Yet",
];

const BUDGETS = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
  "To be discussed",
];

const EMPTY: FormData = {
  fullName: "", company: "", email: "", phone: "",
  service: "", location: "", budget: "",
  message: "", contactMethod: "email",
};

function validate(d: FormData): FormErrors {
  const e: FormErrors = {};
  if (!d.fullName.trim() || d.fullName.trim().length < 2)
    e.fullName = "Full name must be at least 2 characters.";
  if (!d.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "Enter a valid email address.";
  if (!d.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(d.phone))
    e.phone = "Enter a valid phone number.";
  if (!d.service)
    e.service = "Please select a service.";
  return e;
}

export default function ConsultationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm]       = useState<FormData>(EMPTY);
  const [errors, setErrors]   = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [status, setStatus]   = useState<Status>("idle");

  function set(field: keyof FormData, val: string) {
    setForm((p) => ({ ...p, [field]: val }));
    if (touched[field]) {
      const next = { ...form, [field]: val };
      const e = validate(next);
      setErrors((prev) => ({ ...prev, [field]: e[field] }));
    }
  }

  function blur(field: keyof FormData) {
    setTouched((p) => ({ ...p, [field]: true }));
    const e = validate(form);
    setErrors((prev) => ({ ...prev, [field]: e[field] }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, service: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  }

  const waText = encodeURIComponent(
    `Hi, I'd like a consultation for *${form.service || "Geospatial Services"}*.\nName: ${form.fullName || "(not filled)"}\nEmail: ${form.email || "(not filled)"}`
  );
  const waLink = `https://wa.me/91XXXXXXXXXX?text=${waText}`;

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500";
  const inputOk  = "border-slate-200 hover:border-slate-300";
  const inputErr = "border-red-400 focus:ring-red-400/30 focus:border-red-400";

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number], delay },
  });

  return (
    <section id="consultation" ref={ref} aria-labelledby="consult-heading">
      <motion.div {...fadeUp(0)} className="mb-7">
        <h2 id="consult-heading" className="text-xl font-black text-slate-900 mb-1">
          Request a Consultation
        </h2>
        <p className="text-sm text-slate-500 max-w-xl">
          Schedule a free consultation with our experts. Tell us about your project and we will get back to you shortly.
        </p>
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100"
      >
        <div className="grid lg:grid-cols-[380px_1fr]">

          {/* Left info panel */}
          <div
            className="relative p-8 lg:p-10 flex flex-col justify-between gap-8 overflow-hidden"
            style={{ background: "linear-gradient(160deg,#060d1f 0%,#0f2044 55%,#0a1a3a 100%)" }}
          >
            <div className="absolute inset-0 opacity-[0.055]" style={{
              backgroundImage: `linear-gradient(rgba(148,198,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(148,198,255,.9) 1px,transparent 1px)`,
              backgroundSize: "32px 32px",
            }} />
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle,#2563eb,transparent 70%)", filter: "blur(70px)", opacity: 0.2 }} />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-6"
                style={{ background: "rgba(37,99,235,0.22)", color: "#93c5fd", border: "1px solid rgba(37,99,235,0.38)" }}>
                <Calendar size={11} /> Free — No Obligation
              </span>
              <h3 className="text-2xl font-black text-white leading-tight mb-3">
                Talk to a Geospatial<br />Expert
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you have data in hand or need help selecting the right approach,
                our analysts will guide you from first brief to final deliverable.
              </p>
            </div>

            <div className="relative z-10 space-y-3">
              {[
                { Icon: Mail,      label: "Email",    val: "DeepEarthScience@email.com",  href: "mailto:DeepEarthScience@email.com" },
                { Icon: PhoneCall, label: "Phone",    val: "+91 XXXX XXX XXX",         href: "tel:+91XXXXXXXXXX" },
                { Icon: MapPin,    label: "Location", val: "India (Remote & On-site)", href: "#" },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href} className="flex items-center gap-3 group" aria-label={label}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <span className="text-slate-400 text-xs group-hover:text-white transition-colors">{val}</span>
                </a>
              ))}
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">What to Expect</p>
              <ul className="space-y-2">
                {[
                  "Initial reply within 24 hours",
                  "Free project scoping call",
                  "Detailed proposal in 48 hours",
                  "No-obligation quote",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-xs text-slate-400">
                    <CheckCircle size={13} className="text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right form panel */}
          <div className="bg-white p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 gap-5"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#ecfdf5,#d1fae5)", border: "2px solid #6ee7b7" }}>
                    <CheckCircle size={36} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Request Received!</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Thank you, <strong className="text-slate-700">{form.fullName}</strong>. Our team will review your requirements
                      and reach out via <strong className="text-slate-700">{form.contactMethod}</strong> within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setForm(EMPTY); setStatus("idle"); setTouched({}); setErrors({}); }}
                    className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={submit}
                  noValidate
                  aria-label="Consultation request form"
                  className="space-y-5"
                >
                  <div>
                    <p className="text-base font-black text-slate-900 mb-0.5">Your Details</p>
                    <p className="text-xs text-slate-400">Fields marked <span className="text-red-500">*</span> are required</p>
                  </div>

                  {/* Row 1: Full Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="fullName" type="text" autoComplete="name" placeholder="Dr. Arjun Mehta"
                          value={form.fullName} onChange={(e) => set("fullName", e.target.value)} onBlur={() => blur("fullName")}
                          aria-required="true" aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? "err-fullName" : undefined}
                          className={`${inputBase} pl-9 ${errors.fullName ? inputErr : inputOk}`}
                        />
                      </div>
                      {errors.fullName && <p id="err-fullName" role="alert" className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                      <div className="relative">
                        <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="company" type="text" autoComplete="organization" placeholder="Organisation / Institute"
                          value={form.company} onChange={(e) => set("company", e.target.value)}
                          className={`${inputBase} pl-9 ${inputOk}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <AtSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="email" type="email" autoComplete="email" placeholder="you@example.com"
                          value={form.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")}
                          aria-required="true" aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "err-email" : undefined}
                          className={`${inputBase} pl-9 ${errors.email ? inputErr : inputOk}`}
                        />
                      </div>
                      {errors.email && <p id="err-email" role="alert" className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <PhoneCall size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210"
                          value={form.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")}
                          aria-required="true" aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "err-phone" : undefined}
                          className={`${inputBase} pl-9 ${errors.phone ? inputErr : inputOk}`}
                        />
                      </div>
                      {errors.phone && <p id="err-phone" role="alert" className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Row 3: Service + Location */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="service" className="block text-xs font-bold text-slate-700 mb-1.5">
                        Service Required <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <SlidersHorizontal size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                        <select
                          id="service" value={form.service} onChange={(e) => set("service", e.target.value)} onBlur={() => blur("service")}
                          aria-required="true" aria-invalid={!!errors.service}
                          aria-describedby={errors.service ? "err-service" : undefined}
                          className={`${inputBase} pl-9 appearance-none cursor-pointer ${errors.service ? inputErr : inputOk}`}
                        >
                          <option value="">Select a service…</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {errors.service && <p id="err-service" role="alert" className="text-[11px] text-red-500 mt-1">{errors.service}</p>}
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-xs font-bold text-slate-700 mb-1.5">Project Location</label>
                      <div className="relative">
                        <Navigation2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                          id="location" type="text" placeholder="State / District / Coordinates"
                          value={form.location} onChange={(e) => set("location", e.target.value)}
                          className={`${inputBase} pl-9 ${inputOk}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-xs font-bold text-slate-700 mb-1.5">Budget Range</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                      <select
                        id="budget" value={form.budget} onChange={(e) => set("budget", e.target.value)}
                        className={`${inputBase} pl-9 appearance-none cursor-pointer ${inputOk}`}
                      >
                        <option value="">Select approximate budget…</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Message / Project Details
                    </label>
                    <textarea
                      id="message" rows={4}
                      placeholder="Describe your study area, objectives, timeline, and any data you already have…"
                      value={form.message} onChange={(e) => set("message", e.target.value)}
                      className={`${inputBase} resize-none ${inputOk}`}
                    />
                  </div>

                  {/* Contact method */}
                  <fieldset>
                    <legend className="text-xs font-bold text-slate-700 mb-2.5">Preferred Contact Method</legend>
                    <div className="flex flex-wrap gap-3" role="radiogroup">
                      {(["email", "phone", "whatsapp"] as const).map((m) => {
                        const labels: Record<string, string> = { email: "Email", phone: "Phone Call", whatsapp: "WhatsApp" };
                        const icons: Record<string, React.ReactNode> = {
                          email:    <AtSign size={13} />,
                          phone:    <PhoneCall size={13} />,
                          whatsapp: <MessageSquare size={13} />,
                        };
                        const active = form.contactMethod === m;
                        return (
                          <label
                            key={m}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                              active
                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100"
                                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <input
                              type="radio" name="contactMethod" value={m}
                              checked={active} onChange={() => set("contactMethod", m)}
                              className="sr-only" aria-label={labels[m]}
                            />
                            {icons[m]}
                            {labels[m]}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      aria-disabled={status === "loading"}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-70"
                      style={{ background: "linear-gradient(135deg,#2563eb,#4f46e5)", boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}
                    >
                      {status === "loading" ? (
                        <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                      ) : (
                        <><Send size={15} /> Submit Request</>
                      )}
                    </motion.button>

                    <motion.a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Open WhatsApp consultation"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all border"
                      style={{ background: "#ecfdf5", color: "#065f46", borderColor: "#6ee7b7", boxShadow: "0 2px 10px rgba(16,185,129,0.15)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-500">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Consultation
                    </motion.a>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    By submitting you agree to our privacy policy. We never share your data with third parties.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
