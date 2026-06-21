import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ_GROUPS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Account & Login",
    items: [
      { q: "How do I create an account?", a: "Click \"Create an account\" on the login page, fill in your name, email, and a password, then sign in. You'll be redirected to your learner profile." },
      { q: "I forgot my password — what do I do?", a: "Go to the login page and click \"Forgot your password?\". Enter your registered email and we'll send a secure reset link." },
      { q: "How do I update my name, email, or contact details?", a: "Sign in, go to your Profile, select \"Edit Profile\" from the sidebar, update the fields you need, and click Save Changes." },
    ],
  },
  {
    category: "Enrollment & Payment",
    items: [
      { q: "How do I enroll in a course?", a: "Browse the Academy section, open a course, and click Enroll. You'll be asked to sign in (or register) before completing your details and payment." },
      { q: "What payment methods are accepted?", a: "Card, Net Banking, UPI, EMI, Digital Wallets, NEFT/RTGS, Demand Draft/Cheque, and Corporate Invoice billing are all supported during checkout." },
      { q: "Will I get a receipt for my payment?", a: "Yes — a downloadable PDF receipt and enrollment letter are provided immediately after a successful enrollment, and a confirmation email is also sent." },
    ],
  },
  {
    category: "Courses & Certificates",
    items: [
      { q: "How do I track my course progress?", a: "Your Profile dashboard shows enrolled courses, lessons completed, and overall progress under \"My Courses\"." },
      { q: "When do I receive my certificate?", a: "Certificates are issued automatically once a course's completion requirements are met, and can be viewed or downloaded from the Certificates tab in your Profile." },
    ],
  },
  {
    category: "Technical Issues",
    items: [
      { q: "The site isn't loading properly — what should I try?", a: "Try refreshing the page or clearing your browser cache. If the issue persists, contact our support team with details of what you were doing and any error message you saw." },
      { q: "I'm not receiving emails from DeepEarthScience.", a: "Check your spam/junk folder first. If you still don't see emails, confirm your registered email address under Edit Profile and reach out to support." },
    ],
  },
];

export default function HelpAndSupportPage() {
  return (
    <>
      <Navbar />
      <div className="h-16" aria-hidden="true" />
      <main className="bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-14 md:py-20">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">Help &amp; Support</h1>
          <p className="text-slate-500 mb-10">Answers to common questions about your account, enrollments, and courses.</p>

          <div className="space-y-10">
            {FAQ_GROUPS.map((group) => (
              <div key={group.category}>
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">{group.category}</h2>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <details key={item.q} className="group rounded-xl border border-slate-200 px-5 py-4 open:bg-slate-50 transition-colors">
                      <summary className="flex items-center justify-between gap-3 cursor-pointer font-semibold text-slate-800 text-sm list-none">
                        {item.q}
                        <ChevronDown size={16} className="text-slate-400 flex-shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="text-sm text-slate-600 leading-relaxed mt-3">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-7 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Still need help?</p>
                <p className="text-xs text-slate-500">Our team typically responds within 24 hours.</p>
              </div>
            </div>
            <Link href="/#contact" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white whitespace-nowrap"
              style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
              <Mail size={14} /> Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
