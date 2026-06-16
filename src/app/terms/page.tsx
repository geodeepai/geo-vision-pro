import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By creating an account, enrolling in a course, or otherwise using the GeoVisionPro website and learner dashboard, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.`,
  },
  {
    title: "2. Description of Service",
    body: `GeoVisionPro provides geospatial consultancy services and online/offline professional training courses in GIS, remote sensing, drone mapping, AI-powered geo-analytics, and related fields.`,
  },
  {
    title: "3. User Accounts",
    body: `You must provide accurate information when creating an account and keep your login credentials confidential. You are responsible for all activity that occurs under your account.`,
  },
  {
    title: "4. Course Enrollment & Payments",
    body: `Course fees are displayed at the time of enrollment and must be paid in full to confirm your seat, except where an installment (EMI) or invoice-based payment option is explicitly offered. Prices may change for future enrollments but will not change for a course you have already paid for.`,
  },
  {
    title: "5. Refunds & Cancellations",
    body: `Refund eligibility depends on how much of the course has been accessed and how far in advance of the start date you request a cancellation. Contact our support team to discuss a specific enrollment.`,
  },
  {
    title: "6. Intellectual Property",
    body: `All course materials, videos, documents, and certificates are the intellectual property of GeoVisionPro or its instructors and are licensed to you for personal, non-commercial learning use only. Redistribution or resale of course content is not permitted.`,
  },
  {
    title: "7. Code of Conduct",
    body: `You agree not to misuse the platform — including attempting unauthorized access to other accounts, sharing login credentials, or uploading harmful content. Violations may result in suspension of your account.`,
  },
  {
    title: "8. Certificates",
    body: `Certificates are issued upon meeting a course's completion requirements and reflect the name on your account at the time of issuance. Certificate IDs can be used for verification.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `GeoVisionPro provides courses and consultancy services on an "as is" basis. We are not liable for indirect or incidental damages arising from use of our services, to the extent permitted by law.`,
  },
  {
    title: "10. Termination",
    body: `We may suspend or terminate accounts that violate these Terms. You may stop using the service at any time.`,
  },
  {
    title: "11. Changes to These Terms",
    body: `We may revise these Terms from time to time. Continued use of the service after changes take effect constitutes acceptance of the revised Terms.`,
  },
  {
    title: "12. Contact Us",
    body: `Questions about these Terms can be directed to us via our Contact page.`,
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div className="h-16" aria-hidden="true" />
      <main className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-slate-400 mb-10">Last updated: June 2026</p>

          <div className="space-y-8">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h2>
                <p className="text-[15px] text-slate-600 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <Link href="/#contact" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
