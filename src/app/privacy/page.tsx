import Link from "next/link";
import SubpageHero from "@/components/SubpageHero";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: `DeepEarthScience ("we", "us", "our") provides geospatial consultancy services and professional training courses through this website and learner dashboard. This Privacy Policy explains what information we collect, how we use it, and the choices you have.`,
  },
  {
    title: "2. Information We Collect",
    body: `When you register an account, enroll in a course, or contact us, we may collect: your name, email address, phone number, date of birth, organization, and address details (city, state, pincode); payment and transaction details for enrollments; and basic usage data such as pages visited and course progress.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use your information to create and manage your account, process enrollments and payments, issue certificates, send enrollment confirmations and important account notifications, respond to support requests, and improve our courses and services.`,
  },
  {
    title: "4. Data Storage & Security",
    body: `Your account and profile data is stored with industry-standard security practices, including encrypted connections and access controls that restrict data to your own account. We do not sell your personal information to third parties.`,
  },
  {
    title: "5. Cookies & Tracking",
    body: `We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how the site is used so we can improve it. You can control cookies through your browser settings.`,
  },
  {
    title: "6. Third-Party Services",
    body: `We rely on trusted third-party providers to operate the platform — for example, authentication and database hosting, transactional email delivery, and payment processing. These providers only receive the information necessary to perform their function.`,
  },
  {
    title: "7. Your Rights",
    body: `You can review and update most of your personal information at any time from your Profile page. To request a correction, export, or deletion of data we hold about you, contact us using the details below.`,
  },
  {
    title: "8. Children's Privacy",
    body: `Our courses are intended for learners above the age of 16. We do not knowingly collect personal information from children under 13.`,
  },
  {
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last updated" date below.`,
  },
  {
    title: "10. Contact Us",
    body: `If you have questions about this Privacy Policy or how your data is handled, reach out via our Contact page.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-14">
      <SubpageHero
        crumbs={[{ label: "Privacy Policy" }]}
        badge="Legal"
        title="Privacy Policy"
        desc="How we collect, use, and protect your personal information."
        accent="#2563eb"
        ctaLabel="Contact Us"
        ctaHref="/#contact"
      />

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
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
  );
}
