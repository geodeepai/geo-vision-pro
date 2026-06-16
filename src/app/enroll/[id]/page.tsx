"use client";
import { useState, useEffect, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ShieldCheck, CheckCircle2, XCircle, Loader2, Copy, ChevronRight,
  AlertCircle, CreditCard, Landmark, Smartphone, Wallet, Building2, FileText,
} from "lucide-react";
import { downloadPaymentReceipt, downloadEnrollmentLetter } from "@/lib/gvpPDF";
import { createClient } from "@/lib/supabase/client";

/* ─── Course data ──────────────────────────────────────────────── */
interface CourseInfo { id: number; title: string; ref: string; level: string; duration: string; fee: number; }

const COURSES: Record<number, CourseInfo> = {
  1:  { id: 1,  title: "Introduction to GIS",               ref: "GVP-CRS-2026-001", level: "Beginner",             duration: "6 Weeks | 24 Hours", fee: 2999  },
  2:  { id: 2,  title: "Spatial Data Analysis",             ref: "GVP-CRS-2026-002", level: "Intermediate",         duration: "8 Weeks | 32 Hours", fee: 4499  },
  3:  { id: 3,  title: "Land Use & Land Cover Mapping",     ref: "GVP-CRS-2026-003", level: "Intermediate",         duration: "6 Weeks | 28 Hours", fee: 3999  },
  4:  { id: 4,  title: "Advanced Cartography & Map Design", ref: "GVP-CRS-2026-004", level: "Advanced",             duration: "5 Weeks | 20 Hours", fee: 3499  },
  5:  { id: 5,  title: "Remote Sensing Fundamentals",       ref: "GVP-CRS-2026-005", level: "Beginner",             duration: "6 Weeks | 24 Hours", fee: 2999  },
  6:  { id: 6,  title: "Satellite Image Analysis",          ref: "GVP-CRS-2026-006", level: "Intermediate",         duration: "8 Weeks | 32 Hours", fee: 4999  },
  7:  { id: 7,  title: "GIS for Environmental Monitoring",  ref: "GVP-CRS-2026-007", level: "Intermediate",         duration: "7 Weeks | 28 Hours", fee: 3999  },
  8:  { id: 8,  title: "Drone & UAV Mapping Fundamentals",  ref: "GVP-CRS-2026-008", level: "Beginner",             duration: "5 Weeks | 20 Hours", fee: 5999  },
  9:  { id: 9,  title: "Advanced Drone Survey Techniques",  ref: "GVP-CRS-2026-009", level: "Advanced",             duration: "6 Weeks | 24 Hours", fee: 7999  },
  10: { id: 10, title: "QGIS Complete Masterclass",         ref: "GVP-CRS-2026-010", level: "Beginner to Advanced", duration: "10 Weeks | 40 Hours", fee: 5499 },
  11: { id: 11, title: "Google Earth Engine for GIS",       ref: "GVP-CRS-2026-011", level: "Intermediate",         duration: "8 Weeks | 32 Hours", fee: 4999  },
};

/* ─── Constants ────────────────────────────────────────────────── */
const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh",
  "Andaman & Nicobar Islands","Dadra & Nagar Haveli","Daman & Diu","Lakshadweep",
];

const POPULAR_BANKS = [
  { id: "sbi",    name: "State Bank of India", short: "SBI"       },
  { id: "hdfc",   name: "HDFC Bank",           short: "HDFC"      },
  { id: "icici",  name: "ICICI Bank",          short: "ICICI"     },
  { id: "axis",   name: "Axis Bank",           short: "Axis"      },
  { id: "kotak",  name: "Kotak Mahindra Bank", short: "Kotak"     },
  { id: "pnb",    name: "Punjab National Bank",short: "PNB"       },
  { id: "bob",    name: "Bank of Baroda",      short: "BOB"       },
  { id: "yes",    name: "Yes Bank",            short: "Yes Bank"  },
];

const ALL_BANKS = [
  "Bandhan Bank","Bank of India","Canara Bank","Central Bank of India","City Union Bank",
  "Dhanlaxmi Bank","Federal Bank","IDBI Bank","Indian Bank","IndusInd Bank",
  "Karnataka Bank","Karur Vysya Bank","RBL Bank","South Indian Bank",
  "Tamilnad Mercantile Bank","UCO Bank","Union Bank of India",
];

const BANK_URLS: Record<string, string> = {
  "State Bank of India": "https://retail.onlinesbi.sbi/retail/login.htm",
  "HDFC Bank":           "https://netbanking.hdfcbank.com/netbanking/",
  "ICICI Bank":          "https://www.icicibank.com/Personal-Banking/insta-banking/internet-banking/index.page",
  "Axis Bank":           "https://netbanking.axisbank.com/netbanking/",
  "Kotak Mahindra Bank": "https://www.kotak.com/en/personal-banking/tools-and-calculators/netbanking.html",
  "Punjab National Bank":"https://www.netpnb.com/",
  "Bank of Baroda":      "https://www.bobibanking.com/",
  "Yes Bank":            "https://netbanking.yesbank.in/",
  "Canara Bank":         "https://canarabank.com/netbanking",
  "Union Bank of India": "https://www.unionbankonline.co.in/",
  "Indian Bank":         "https://www.indianbank.net.in/",
  "IDBI Bank":           "https://www.idbibank.in/internet-banking.aspx",
  "Federal Bank":        "https://www.fednetbank.com/",
  "IndusInd Bank":       "https://www.indusnetbanking.com/",
  "Bank of India":       "https://bankofindia.co.in/netbanking",
  "UCO Bank":            "https://www.ucoonlinebanking.com/",
  "Central Bank of India":"https://www.centralbankofindia.co.in/",
  "Karnataka Bank":      "https://karnatakabanknet.in/",
  "South Indian Bank":   "https://www.southindianbank.com/personal/digital-banking/net-banking/",
  "Bandhan Bank":        "https://www.bandhanbank.com/personal/digital-banking/net-banking",
  "RBL Bank":            "https://www.rblbank.com/digital-banking/net-banking",
  "City Union Bank":     "https://www.cityunionbank.com/internet-banking",
  "Karur Vysya Bank":    "https://www.kvbnet.co.in/",
  "Tamilnad Mercantile Bank":"https://www.tmbnet.in/",
  "Dhanlaxmi Bank":      "https://www.dhanbank.com/",
};

const WALLET_URLS: Record<string, string> = {
  paytm:     "https://paytm.com/",
  phonepe:   "https://web.phonepe.com/",
  gpay:      "https://pay.google.com/",
  mobikwik:  "https://www.mobikwik.com/",
  freecharge:"https://www.freecharge.in/",
  airtel:    "https://www.airtel.in/airtel-money",
  jio:       "https://jiomoney.jio.com/",
  ola:       "https://www.olamoney.com/",
  amazon:    "https://www.amazon.in/b?node=14588614031",
};

const WALLETS = [
  { id: "paytm",     name: "Paytm",        color: "#00b9f5", icon: "💙" },
  { id: "phonepe",   name: "PhonePe",      color: "#5f259f", icon: "💜" },
  { id: "gpay",      name: "Google Pay",   color: "#4285f4", icon: "🔵" },
  { id: "mobikwik",  name: "MobiKwik",     color: "#e81c5a", icon: "❤️" },
  { id: "freecharge",name: "FreeCharge",   color: "#00b75a", icon: "💚" },
  { id: "airtel",    name: "Airtel Money", color: "#e40000", icon: "🔴" },
  { id: "jio",       name: "Jio Money",    color: "#0a5ab4", icon: "🔷" },
  { id: "ola",       name: "Ola Money",    color: "#ef6614", icon: "🟠" },
  { id: "amazon",    name: "Amazon Pay",   color: "#ff9900", icon: "📦" },
];

const PAY_METHODS = [
  { id: "card",      label: "Credit Card",         Icon: CreditCard,  desc: "Visa, Mastercard, RuPay, Amex" },
  { id: "debit",     label: "Debit Card",          Icon: CreditCard,  desc: "Visa, Mastercard, RuPay, Maestro" },
  { id: "netbanking",label: "Net Banking",         Icon: Landmark,    desc: "50+ Indian banks" },
  { id: "upi",       label: "UPI",                 Icon: Smartphone,  desc: "GPay, PhonePe, Paytm, BHIM" },
  { id: "emi",       label: "EMI (No Cost)",       Icon: CreditCard,  desc: "3, 6, 9, 12 month plans" },
  { id: "wallet",    label: "Digital Wallet",      Icon: Wallet,      desc: "Paytm, PhonePe, Amazon Pay & more" },
  { id: "neft",      label: "NEFT / RTGS / IMPS",  Icon: Landmark,    desc: "Bank transfer (24 hr confirmation)" },
  { id: "dd",        label: "Demand Draft / Cheque",Icon: FileText,   desc: "3–5 day clearance" },
  { id: "corporate", label: "Corporate / Invoice", Icon: Building2,   desc: "Bulk enrollments & B2B training" },
];

const PROMO_CODES: Record<string, { discount: number; type: "percent" | "fixed"; label: string }> = {
  LAUNCH50:   { discount: 50,  type: "percent", label: "50% Launch Discount"     },
  ACADEMY20:  { discount: 20,  type: "percent", label: "20% Academy Discount"    },
  GVP500:     { discount: 500, type: "fixed",   label: "₹500 Instant Discount"   },
  STUDENT100: { discount: 100, type: "fixed",   label: "₹100 Student Discount"   },
};

const BATCHES = [
  "July 2026 (Starts 1 Jul)", "August 2026 (Starts 1 Aug)",
  "September 2026 (Starts 1 Sep)", "October 2026 (Starts 1 Oct)",
  "November 2026 (Starts 1 Nov)", "Flexi / Self-paced (Start Anytime)",
];

/* ─── Helpers ──────────────────────────────────────────────────── */
const fmt  = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const gstOf = (fee: number) => Math.floor(fee * 0.18);
function genId(prefix: string) {
  return `${prefix}-2026-${String(Math.floor(Math.random() * 89999) + 10001)}`;
}
function fmtTimer(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function formatCardNum(v: string) {
  return v.replace(/\D/g, "").substring(0, 16).replace(/(\d{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").substring(0, 4);
  return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}
function cardBrand(num: string) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n))         return "Visa";
  if (/^5[1-5]|^2[2-7]/.test(n)) return "Mastercard";
  if (/^6/.test(n))         return "RuPay";
  if (/^3[47]/.test(n))     return "Amex";
  return "";
}

/* ─── Student form type ─────────────────────────────────────────── */
interface StudentForm {
  name: string; email: string; mobile: string;
  organization: string;
  city: string; state: string; pincode: string;
  hearAbout: string;
  agreeTerms: boolean; agreeUpdates: boolean;
}

const FORM_INIT: StudentForm = {
  name: "", email: "", mobile: "",
  organization: "",
  city: "", state: "", pincode: "",
  hearAbout: "",
  agreeTerms: false, agreeUpdates: false,
};

/* ─── Progress bar ──────────────────────────────────────────────── */
function ProgressBar({ step }: { step: number }) {
  const pStep = step <= 2 ? step : step === 3 || step === 4 ? 3 : 4;
  const labels = ["Summary", "Details", "Payment", "Confirm"];
  return (
    <div className="flex items-center justify-center py-5 px-6">
      {labels.map((label, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <div className="flex-1 h-[2px] mx-2 max-w-[60px] rounded-full"
              style={{ background: pStep > i + 1 ? "#1d9e75" : "rgba(255,255,255,0.1)" }} />
          )}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: pStep > i + 1 ? "#1d9e75" : pStep === i + 1 ? "rgba(29,158,117,0.15)" : "rgba(255,255,255,0.05)",
                border: `2px solid ${pStep >= i + 1 ? "#1d9e75" : "rgba(255,255,255,0.12)"}`,
                color: pStep > i + 1 ? "#fff" : pStep === i + 1 ? "#1d9e75" : "#8aa3be",
              }}>
              {pStep > i + 1 ? "✓" : i + 1}
            </div>
            <span className="text-[10px] font-semibold whitespace-nowrap"
              style={{ color: pStep >= i + 1 ? "#1d9e75" : "#8aa3be" }}>
              {label}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function EnrollPage() {
  const params   = useParams();
  const router   = useRouter();
  const courseId = parseInt(String(params.id));
  const course   = COURSES[courseId];

  /* ── Core state ── */
  const [step, setStep]   = useState(1);      // 1-6 normal, 0=failed, 7=pending
  const [form, setForm]   = useState<StudentForm>(FORM_INIT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [payMethod, setPayMethod] = useState("");
  const [enrollIds, setEnrollIds] = useState({ enrollmentId: "", transactionId: "", receiptNo: "" });

  /* ── Promo ── */
  const [promoInput, setPromoInput]   = useState("");
  const [promoApplied, setPromoApplied] = useState<{ label: string; discount: number } | null>(null);
  const [promoError, setPromoError]   = useState("");

  /* ── Card / OTP ── */
  const [cardNum, setCardNum]         = useState("");
  const [cardName, setCardName]       = useState("");
  const [cardExpiry, setCardExpiry]   = useState("");
  const [cardCVV, setCardCVV]         = useState("");
  const [cardError, setCardError]     = useState("");
  const [showOTP, setShowOTP]         = useState(false);
  const [otp, setOtp]                 = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError]       = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend]     = useState(false);

  /* ── UPI ── */
  const [upiId, setUpiId]             = useState("");
  const [upiVerifying, setUpiVerifying] = useState(false);
  const [upiVerified, setUpiVerified] = useState<boolean | null>(null);
  const [upiWaiting, setUpiWaiting]   = useState(false);
  const [upiTimer, setUpiTimer]       = useState(600);
  const [upiError, setUpiError]       = useState("");

  /* ── Net banking ── */
  const [selectedBank, setSelectedBank]   = useState("");
  const [bankRedirecting, setBankRedirecting] = useState(false);

  /* ── EMI ── */
  const [emiMonths, setEmiMonths]   = useState(3);
  const [emiBank, setEmiBank]       = useState("");

  /* ── Wallet ── */
  const [selWallet, setSelWallet]   = useState("");
  const [walletError, setWalletError] = useState("");

  /* ── NEFT ── */
  const [neftUTR, setNeftUTR]       = useState("");

  /* ── DD ── */
  const [ddNum, setDDNum]           = useState("");
  const [ddBank, setDDBank]         = useState("");
  const [ddDate, setDDDate]         = useState("");

  /* ── Post-success redirect ── */
  const [redirectCount, setRedirectCount] = useState(10);

  /* ── Save-to-backend state ── */
  const [savingEnrollment, setSavingEnrollment] = useState(false);
  const [saveError, setSaveError] = useState("");

  /* ── Corporate ── */
  const [corp, setCorp]             = useState({ company: "", gst: "", email: "", contact: "", seats: "1" });

  /* ── Computed ── */
  const gst      = gstOf(course?.fee ?? 0);
  const discount = promoApplied?.discount ?? 0;
  const total    = (course?.fee ?? 0) + gst - discount;

  /* ── Effects ── */
  useEffect(() => {
    if (!showOTP) return;
    setResendTimer(30); setCanResend(false);
    const t = setInterval(() => setResendTimer(p => {
      if (p <= 1) { clearInterval(t); setCanResend(true); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [showOTP]);

  useEffect(() => {
    if (!upiWaiting) return;
    const count = setInterval(() => setUpiTimer(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(count);
  }, [upiWaiting]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      setForm(f => ({
        ...f,
        name: f.name || (u.user_metadata?.full_name as string) || "",
        email: f.email || u.email || "",
      }));
    });
  }, []);

  useEffect(() => {
    if (step !== 5) return;
    const t = setTimeout(() => { setStep(6); setRedirectCount(10); }, 2800);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step !== 6) return;
    if (redirectCount <= 0) { router.push("/"); return; }
    const t = setTimeout(() => setRedirectCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, redirectCount]);

  /* ── Handlers ── */
  function upd<K extends keyof StudentForm>(k: K, v: StudentForm[K]) {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  }

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    const pc   = PROMO_CODES[code];
    if (!pc) { setPromoError("Invalid promo code. Please check and try again."); setPromoApplied(null); return; }
    const disc = pc.type === "percent" ? Math.floor(course.fee * pc.discount / 100) : pc.discount;
    setPromoApplied({ label: pc.label, discount: Math.min(disc, course.fee) });
    setPromoError("");
  }

  function validateForm(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "Enter your full name (min 3 characters)";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.mobile || form.mobile.replace(/\D/g, "").length < 6)
      e.mobile = "Enter a valid phone number";
    if (!form.city.trim())    e.city       = "Enter your city";
    if (!form.state)          e.state      = "Please select your state";
    if (!form.pincode.trim() || form.pincode.trim().length < 4) e.pincode = "Enter a valid postal / ZIP code";
    if (!form.agreeTerms)     e.agreeTerms = "You must agree to the Terms & Conditions to proceed";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitEnrollment(paymentMethodLabel: string, transactionId: string, nextStep: number) {
    setSaveError("");
    setSavingEnrollment(true);
    const enrollmentId = genId("GVP-ENR");
    const receiptNo = genId("GVP-RCT");

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id, courseTitle: course.title, courseRef: course.ref,
          studentName: form.name, studentEmail: form.email, studentMobile: form.mobile,
          organization: form.organization, city: form.city, state: form.state,
          pincode: form.pincode, hearAbout: form.hearAbout,
          fee: course.fee, gst, discount, total,
          paymentMethod: paymentMethodLabel,
          enrollmentId, transactionId, receiptNo,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not save your enrollment. Please try again.");
      }
      setEnrollIds({ enrollmentId, transactionId, receiptNo });
      setStep(nextStep);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSavingEnrollment(false);
    }
  }

  function handlePaymentSuccess() {
    submitEnrollment(PAY_METHODS.find(p => p.id === payMethod)?.label ?? payMethod, genId("GVP-TXN"), 5);
  }

  function handleCardSubmit() {
    if (cardNum.replace(/\s/g, "").length < 16) { setCardError("Enter a valid 16-digit card number"); return; }
    if (!cardName.trim())  { setCardError("Cardholder name is required"); return; }
    if (cardExpiry.length < 5) { setCardError("Enter a valid expiry date MM/YY"); return; }
    if (cardCVV.length < 3)   { setCardError("Enter a valid CVV"); return; }
    setCardError("");
    setShowOTP(true);
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
  }

  function handleOTPVerify() {
    if (otp.join("") === "123456") {
      setShowOTP(false);
      handlePaymentSuccess();
    } else {
      setOtpError("Incorrect OTP. Hint: use 123456 for demo.");
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => document.getElementById("otp-0")?.focus(), 50);
    }
  }

  function handleUPIVerify() {
    if (!upiId.includes("@")) { setUpiError("Enter a valid UPI ID (e.g. name@upi)"); return; }
    setUpiError(""); setUpiVerifying(true);
    setTimeout(() => { setUpiVerifying(false); setUpiVerified(true); }, 1500);
  }

  function openBankLogin(bankName: string) {
    const url = BANK_URLS[bankName]
      ?? `https://www.google.com/search?q=${encodeURIComponent(bankName + " net banking login")}`;
    setSelectedBank(bankName);
    window.open(url, "_blank", "noopener,noreferrer");
    setBankRedirecting(true);
  }

  function handleNetBankProceed() {
    if (!selectedBank) return;
    openBankLogin(selectedBank);
  }

  function handleWalletPay() {
    if (!selWallet) { setWalletError("Please select a wallet"); return; }
    const url = WALLET_URLS[selWallet];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    setWalletError("");
    setBankRedirecting(true); // reuse waiting-screen state
  }

  /* ── Shared UI helpers ── */
  const card = "rounded-2xl p-6 mb-4";
  const cardStyle: React.CSSProperties = { background: "#0f2035", border: "1px solid rgba(255,255,255,0.08)" };
  const inp = "w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all duration-200";
  const inpStyle = (key: string, hasVal?: boolean): React.CSSProperties => ({
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${errors[key] ? "#ef4444" : (hasVal ?? !!form[key as keyof StudentForm]) ? "#1d9e75" : "rgba(255,255,255,0.1)"}`,
    color: "#fff",
  });
  const sel = "w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 appearance-none";
  const selStyle = (key: string): React.CSSProperties => ({
    background: "#0f2035",
    border: `1px solid ${errors[key] ? "#ef4444" : form[key as keyof StudentForm] ? "#1d9e75" : "rgba(255,255,255,0.1)"}`,
    color: form[key as keyof StudentForm] ? "#fff" : "#8aa3be",
  });

  function Label({ children, req }: { children: React.ReactNode; req?: boolean }) {
    return (
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8aa3be" }}>
        {children}{req && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
    );
  }
  function Err({ k }: { k: string }) {
    return errors[k] ? <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors[k]}</p> : null;
  }

  /* ─── STEP 1 — Course Summary ────────────────────────────────── */
  function renderStep1() {
    return (
      <div>
        <div className={card} style={cardStyle}>
          <span className="text-xs font-bold" style={{ color: "#1d9e75" }}>{course.ref}</span>
          <h1 className="text-white font-black text-2xl mt-1 mb-1">{course.title}</h1>
          <div className="flex flex-wrap gap-3 text-xs mb-5" style={{ color: "#8aa3be" }}>
            <span className="px-2 py-1 rounded-lg" style={{ background: "rgba(29,158,117,0.12)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.25)" }}>
              {course.level}
            </span>
            <span>⏱ {course.duration}</span>
            <span>🎓 Certificate Included</span>
            <span>💻 100% Online</span>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-5">
            {[
              "Lifetime access to all course materials & future updates",
              "Live doubt-clearing sessions every Saturday",
              "GeoVisionPro Academy Certificate of Completion",
              "Hands-on projects with real satellite & GIS datasets",
              "WhatsApp batch group & alumni network access",
              "Job placement assistance for graduates",
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#b0c4d8" }}>
                <span className="mt-0.5 flex-shrink-0 text-[#1d9e75]">✓</span>
                {b}
              </div>
            ))}
          </div>

          {/* Fee breakdown */}
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              ["Course Fee",       fmt(course.fee), false],
              ["GST @ 18%",        fmt(gst),        false],
              ...(promoApplied ? [["Discount (" + promoApplied.label + ")", `- ${fmt(promoApplied.discount)}`, false]] as [string, string, boolean][] : []),
            ].map(([label, value, bold], i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm"
                style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)", color: "#b0c4d8" }}>
                <span>{label as string}</span>
                <span style={{ color: "#8aa3be" }}>{value as string}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 font-black"
              style={{ background: "rgba(29,158,117,0.1)", borderTop: "1px solid rgba(29,158,117,0.2)" }}>
              <span className="text-white">Total Payable</span>
              <span className="text-xl" style={{ color: "#1d9e75" }}>{fmt(total)}</span>
            </div>
          </div>

          {/* Promo code */}
          <div className="mt-4">
            <label className="block text-xs font-semibold mb-2" style={{ color: "#8aa3be" }}>Promo Code</label>
            <div className="flex gap-2">
              <input
                className={inp} value={promoInput}
                onChange={e => { setPromoInput(e.target.value.toUpperCase()); setPromoError(""); }}
                placeholder="Enter code (try LAUNCH50)"
                style={{ ...inpStyle("promo", !!promoApplied), flex: 1 }}
              />
              <button onClick={applyPromo}
                className="px-4 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: promoApplied ? "#1d9e75" : "rgba(29,158,117,0.2)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.35)", whiteSpace: "nowrap" }}>
                {promoApplied ? "✓ Applied" : "Apply"}
              </button>
            </div>
            {promoError && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{promoError}</p>}
            {promoApplied && <p className="text-xs mt-1 font-semibold" style={{ color: "#1d9e75" }}>🎉 {promoApplied.label} applied — saving {fmt(promoApplied.discount)}!</p>}
          </div>
        </div>

        <button onClick={() => setStep(2)}
          className="w-full py-3.5 rounded-2xl font-black text-base text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.35)" }}>
          Proceed to Enroll →
        </button>
        <p className="text-center text-xs mt-3 flex items-center justify-center gap-1.5" style={{ color: "#8aa3be" }}>
          <ShieldCheck size={12} style={{ color: "#1d9e75" }} />
          Secure 256-bit SSL encrypted enrollment
        </p>
      </div>
    );
  }

  /* ─── STEP 2 — Student Registration ─────────────────────────── */
  function renderStep2() {
    return (
      <div>
        <div className={card} style={cardStyle}>
          <h2 className="text-white font-black text-xl mb-5">Your Details</h2>

          <div className="space-y-4">
            <div>
              <Label req>Full Name</Label>
              <input className={inp} value={form.name} onChange={e => upd("name", e.target.value)}
                placeholder="Enter your full name" style={inpStyle("name")} />
              <Err k="name" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label req>Email Address</Label>
                <input className={inp} type="email" value={form.email} onChange={e => upd("email", e.target.value)}
                  placeholder="you@example.com" style={inpStyle("email")} />
                <Err k="email" />
              </div>
              <div>
                <Label req>Phone Number</Label>
                <input className={inp} type="tel" value={form.mobile}
                  onChange={e => upd("mobile", e.target.value)}
                  placeholder="+1 234 567 8900" style={inpStyle("mobile")} />
                <Err k="mobile" />
              </div>
            </div>

            <div>
              <Label>Organization / Institution</Label>
              <input className={inp} value={form.organization} onChange={e => upd("organization", e.target.value)}
                placeholder="Optional" style={inpStyle("organization", false)} />
            </div>

            {/* Address */}
            <p className="text-xs font-black uppercase tracking-widest pt-2" style={{ color: "#1d9e75" }}>Address</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label req>City</Label>
                <input className={inp} value={form.city} onChange={e => upd("city", e.target.value)}
                  placeholder="Your city" style={inpStyle("city")} />
                <Err k="city" />
              </div>
              <div>
                <Label req>State / Region</Label>
                <select className={sel} value={form.state} onChange={e => upd("state", e.target.value)} style={selStyle("state")}>
                  <option value="">Select state / region</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
                <Err k="state" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label req>PIN / ZIP Code</Label>
                <input className={inp} type="text" maxLength={10} value={form.pincode}
                  onChange={e => upd("pincode", e.target.value.replace(/\D/g, ""))}
                  placeholder="Postal code" style={inpStyle("pincode")} />
                <Err k="pincode" />
              </div>
              <div>
                <Label>How did you hear about us?</Label>
                <select className={sel} value={form.hearAbout} onChange={e => upd("hearAbout", e.target.value)}
                  style={{ ...selStyle("hearAbout"), color: form.hearAbout ? "#fff" : "#8aa3be" }}>
                  <option value="">Select (optional)</option>
                  {["Google Search","Social Media","YouTube","Friend / Colleague","University / Institution","Job Portal","Other"].map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
            </div>

            {/* Terms */}
            <div className="pt-2 space-y-3">
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input type="checkbox" checked={form.agreeTerms}
                    onChange={e => upd("agreeTerms", e.target.checked)}
                    className="mt-0.5 flex-shrink-0 accent-[#1d9e75] w-4 h-4" />
                  <span className="text-sm" style={{ color: "#b0c4d8" }}>
                    I agree to the{" "}
                    <span className="underline cursor-pointer" style={{ color: "#1d9e75" }}>Terms & Conditions</span>
                    {" "}and{" "}
                    <span className="underline cursor-pointer" style={{ color: "#1d9e75" }}>Privacy Policy</span>
                    {" "}of GeoVisionPro Academy. <span style={{ color: "#ef4444" }}>*</span>
                  </span>
                </label>
                <Err k="agreeTerms" />
              </div>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={form.agreeUpdates}
                  onChange={e => upd("agreeUpdates", e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-[#1d9e75] w-4 h-4" />
                <span className="text-sm" style={{ color: "#8aa3be" }}>
                  Send me course updates, offers and tips via email & WhatsApp (optional)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep(1)}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.06)", color: "#b0c4d8", border: "1px solid rgba(255,255,255,0.1)" }}>
            ← Back
          </button>
          <button onClick={() => { if (validateForm()) setStep(3); }}
            className="flex-1 py-3.5 rounded-2xl font-black text-base text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.3)" }}>
            Continue to Payment →
          </button>
        </div>
      </div>
    );
  }

  /* ─── STEP 3 — Payment Selection ────────────────────────────── */
  function renderStep3() {
    return (
      <div>
        {/* Order summary */}
        <div className="rounded-2xl p-4 mb-4 flex items-center justify-between gap-3"
          style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.2)" }}>
          <div>
            <p className="text-xs" style={{ color: "#8aa3be" }}>Enrolling in</p>
            <p className="text-white font-bold text-sm leading-snug">{course.title}</p>
            <p className="text-xs mt-0.5" style={{ color: "#8aa3be" }}>{course.ref}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs" style={{ color: "#8aa3be" }}>Total</p>
            <p className="text-2xl font-black" style={{ color: "#1d9e75" }}>{fmt(total)}</p>
            <p className="text-xs" style={{ color: "#8aa3be" }}>incl. GST</p>
          </div>
        </div>

        <div className={card} style={cardStyle}>
          <h2 className="text-white font-black text-xl mb-4">Select Payment Method</h2>
          <div className="space-y-2">
            {PAY_METHODS.map(({ id, label, Icon, desc }) => (
              <label key={id} className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all"
                style={{
                  background: payMethod === id ? "rgba(29,158,117,0.1)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${payMethod === id ? "#1d9e75" : "rgba(255,255,255,0.08)"}`,
                }}>
                <input type="radio" name="payMethod" value={id} checked={payMethod === id}
                  onChange={() => setPayMethod(id)} className="accent-[#1d9e75] w-4 h-4 flex-shrink-0" />
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: payMethod === id ? "rgba(29,158,117,0.2)" : "rgba(255,255,255,0.06)" }}>
                  <Icon size={15} style={{ color: payMethod === id ? "#1d9e75" : "#8aa3be" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold" style={{ color: payMethod === id ? "#fff" : "#b0c4d8" }}>{label}</p>
                  <p className="text-xs" style={{ color: "#8aa3be" }}>{desc}</p>
                </div>
                {id === "emi" && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "rgba(29,158,117,0.15)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.3)" }}>
                    0% Interest
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep(2)}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.06)", color: "#b0c4d8", border: "1px solid rgba(255,255,255,0.1)" }}>
            ← Back
          </button>
          <button
            onClick={() => { if (payMethod) setStep(4); }}
            disabled={!payMethod}
            className="flex-1 py-3.5 rounded-2xl font-black text-base text-white transition-all"
            style={{
              background: payMethod ? "linear-gradient(135deg,#22c48a,#1d9e75)" : "rgba(255,255,255,0.08)",
              color: payMethod ? "#fff" : "#8aa3be",
              boxShadow: payMethod ? "0 4px 20px rgba(29,158,117,0.3)" : "none",
            }}>
            {payMethod ? `Pay with ${PAY_METHODS.find(p => p.id === payMethod)?.label} →` : "Select a payment method"}
          </button>
        </div>
      </div>
    );
  }

  /* ─── STEP 4 — Payment Gateway ──────────────────────────────── */
  function renderStep4() {
    const gatewayHeader = (title: string) => (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={14} style={{ color: "#1d9e75" }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1d9e75" }}>Secure Payment</span>
        </div>
        <h2 className="text-white font-black text-xl">{title}</h2>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm" style={{ color: "#8aa3be" }}>{course.title}</p>
          <p className="text-lg font-black" style={{ color: "#1d9e75" }}>{fmt(total)}</p>
        </div>
        <div className="h-px mt-4" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>
    );

    const payBtn = (label: string, action: () => void, disabled = false) => (
      <button onClick={action} disabled={disabled}
        className="w-full py-3.5 rounded-xl font-black text-base text-white mt-5 transition-all hover:opacity-90 flex items-center justify-center gap-2"
        style={{ background: disabled ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: disabled ? "none" : "0 4px 20px rgba(29,158,117,0.35)" }}>
        <ShieldCheck size={16} />
        {label}
      </button>
    );

    /* ── CARD / DEBIT ── */
    if (payMethod === "card" || payMethod === "debit") {
      const isDebit = payMethod === "debit";
      const brand = cardBrand(cardNum);
      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader(isDebit ? "Debit Card Payment" : "Credit Card Payment")}
            <div className="space-y-4">
              <div>
                <Label req>Card Number</Label>
                <div className="relative">
                  <input className={inp} value={cardNum}
                    onChange={e => { setCardNum(formatCardNum(e.target.value)); setCardError(""); }}
                    placeholder="XXXX XXXX XXXX XXXX" maxLength={19}
                    style={{ ...inpStyle("cardNum", cardNum.replace(/\s/g,"").length === 16), paddingRight: brand ? "70px" : "14px" }} />
                  {brand && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{ background: "rgba(29,158,117,0.15)", color: "#1d9e75" }}>{brand}</span>}
                </div>
              </div>
              <div>
                <Label req>Name on Card</Label>
                <input className={inp} value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())}
                  placeholder="AS ON CARD" style={inpStyle("cardName", !!cardName)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label req>Expiry Date</Label>
                  <input className={inp} value={cardExpiry}
                    onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY" maxLength={5} style={inpStyle("cardExpiry", cardExpiry.length === 5)} />
                </div>
                <div>
                  <Label req>CVV</Label>
                  <input className={inp} type="password" value={cardCVV}
                    onChange={e => setCardCVV(e.target.value.replace(/\D/g, "").substring(0, 4))}
                    placeholder="•••" maxLength={4} style={inpStyle("cardCVV", cardCVV.length >= 3)} />
                </div>
              </div>
              <label className="flex items-center gap-2.5 text-xs cursor-pointer" style={{ color: "#8aa3be" }}>
                <input type="checkbox" className="accent-[#1d9e75]" />
                Save card securely for future payments
              </label>
              {cardError && (
                <p className="flex items-center gap-1.5 text-xs" style={{ color: "#ef4444" }}>
                  <AlertCircle size={12} />{cardError}
                </p>
              )}
            </div>
            {payBtn(`Pay ${fmt(total)} Securely`, handleCardSubmit)}
            <p className="text-center text-xs mt-3" style={{ color: "#8aa3be" }}>
              You will receive an OTP on your registered mobile number for 3D Secure verification.
            </p>
          </div>
          <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: "#8aa3be" }}>← Choose Different Method</button>
        </div>
      );
    }

    /* ── NET BANKING ── */
    if (payMethod === "netbanking") {
      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader("Net Banking")}
            {bankRedirecting ? (
              <div className="flex flex-col items-center gap-5 py-6 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(29,158,117,0.12)", border: "2px solid rgba(29,158,117,0.35)" }}>
                  <Landmark size={28} style={{ color: "#1d9e75" }} />
                </div>
                <div>
                  <p className="text-white font-black text-lg">{selectedBank} opened</p>
                  <p className="text-sm mt-1" style={{ color: "#b0c4d8" }}>
                    Complete your payment of <strong style={{ color: "#1d9e75" }}>{fmt(total)}</strong> in the bank window.
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#8aa3be" }}>
                    Once payment is done, come back here and click the button below.
                  </p>
                </div>
                <button
                  onClick={() => window.open(
                    BANK_URLS[selectedBank] ?? `https://www.google.com/search?q=${encodeURIComponent(selectedBank + " net banking login")}`,
                    "_blank", "noopener,noreferrer"
                  )}
                  className="text-sm font-semibold flex items-center gap-1.5 transition-all hover:opacity-80"
                  style={{ color: "#1d9e75" }}>
                  ↗ Reopen bank window
                </button>
                <button onClick={handlePaymentSuccess}
                  className="w-full py-3.5 rounded-xl font-black text-base text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.35)" }}>
                  ✓ Payment Done — Confirm Enrollment
                </button>
                <button onClick={() => setBankRedirecting(false)}
                  className="text-sm transition-all hover:opacity-70" style={{ color: "#8aa3be" }}>
                  ← Go back / choose different bank
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold mb-1" style={{ color: "#8aa3be" }}>Click your bank to open its login page directly</p>
                <p className="text-xs mb-3" style={{ color: "#566b82" }}>You will be redirected to the official bank website to log in and pay</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {POPULAR_BANKS.map(b => (
                    <button key={b.id} onClick={() => openBankLogin(b.name)}
                      className="py-3.5 px-2 rounded-xl text-center text-xs font-black transition-all hover:scale-105 hover:opacity-90 flex flex-col items-center gap-1"
                      style={{
                        background: "linear-gradient(135deg,rgba(29,158,117,0.12),rgba(29,158,117,0.06))",
                        border: "1px solid rgba(29,158,117,0.28)",
                        color: "#1d9e75",
                      }}>
                      <Landmark size={14} style={{ color: "#1d9e75", opacity: 0.8 }} />
                      {b.short}
                    </button>
                  ))}
                </div>
                <p className="text-xs font-semibold mb-2" style={{ color: "#8aa3be" }}>Other Banks</p>
                <div className="flex gap-2">
                  <select className={sel} value={selectedBank} onChange={e => setSelectedBank(e.target.value)}
                    style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.1)", color: selectedBank ? "#fff" : "#8aa3be", flex: 1 }}>
                    <option value="">Select your bank</option>
                    {ALL_BANKS.map(b => <option key={b}>{b}</option>)}
                  </select>
                  <button onClick={handleNetBankProceed} disabled={!selectedBank}
                    className="px-4 rounded-xl text-xs font-black flex-shrink-0 transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", color: "#fff" }}>
                    Open →
                  </button>
                </div>
              </>
            )}
          </div>
          <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: "#8aa3be" }}>← Choose Different Method</button>
        </div>
      );
    }

    /* ── UPI ── */
    if (payMethod === "upi") {
      const upiPayee = "academy@geovisionpro";
      const upiStr   = `upi://pay?pa=${upiPayee}&pn=GeoVisionPro%20Academy&am=${total}&cu=INR&tn=Course%20${encodeURIComponent(course.ref)}`;
      const qrUrl    = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=1d9e75&bgcolor=0f2035&data=${encodeURIComponent(upiStr)}`;

      const UPI_APPS = [
        { name: "Google Pay",  link: `gpay://upi/pay?pa=${upiPayee}&pn=GeoVisionPro%20Academy&am=${total}&cu=INR&tn=Enrollment`,   fallback: upiStr },
        { name: "PhonePe",     link: `phonepe://pay?pa=${upiPayee}&pn=GeoVisionPro%20Academy&am=${total}&cu=INR`,                   fallback: upiStr },
        { name: "Paytm",       link: `paytmmp://pay?pa=${upiPayee}&pn=GeoVisionPro%20Academy&am=${total}&cu=INR`,                   fallback: upiStr },
        { name: "BHIM / UPI",  link: upiStr,                                                                                        fallback: upiStr },
      ];

      function openUPIApp(link: string) {
        window.location.href = link;
        setTimeout(() => setUpiWaiting(true), 1500);
      }

      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader("UPI Payment")}
            {upiWaiting ? (
              <div className="flex flex-col items-center gap-5 py-4 text-center">
                <div className="relative">
                  <Loader2 size={48} className="animate-spin" style={{ color: "#1d9e75" }} />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color: "#1d9e75" }}>
                    {fmtTimer(upiTimer)}
                  </div>
                </div>
                <div>
                  <p className="text-white font-black text-lg">Waiting for UPI payment…</p>
                  <p className="text-sm mt-1" style={{ color: "#b0c4d8" }}>
                    Approve <strong style={{ color: "#1d9e75" }}>{fmt(total)}</strong> in your UPI app
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#8aa3be" }}>Session expires in {fmtTimer(upiTimer)}</p>
                </div>
                <button onClick={handlePaymentSuccess}
                  className="w-full py-3.5 rounded-xl font-black text-base text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.35)" }}>
                  ✓ Payment Done — Confirm Enrollment
                </button>
                <button onClick={() => setUpiWaiting(false)}
                  className="text-sm transition-all hover:opacity-70" style={{ color: "#8aa3be" }}>
                  ← Go back
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* QR Code */}
                <div className="flex flex-col items-center gap-3">
                  <p className="text-xs font-semibold" style={{ color: "#8aa3be" }}>Scan QR with any UPI app</p>
                  <div className="p-3 rounded-2xl" style={{ background: "#0f2035", border: "2px solid rgba(29,158,117,0.3)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={qrUrl} alt="UPI QR Code" width={180} height={180} className="rounded-xl" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs" style={{ color: "#8aa3be" }}>Pay to UPI ID</p>
                    <p className="text-sm font-bold" style={{ color: "#1d9e75" }}>{upiPayee}</p>
                    <p className="text-xs" style={{ color: "#8aa3be" }}>Amount: <strong className="text-white">{fmt(total)}</strong></p>
                  </div>
                </div>

                <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* App buttons */}
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#8aa3be" }}>Or open directly in your app</p>
                  <div className="grid grid-cols-2 gap-2">
                    {UPI_APPS.map(app => (
                      <button key={app.name} onClick={() => openUPIApp(app.link)}
                        className="py-3 px-3 rounded-xl text-sm font-bold text-left flex items-center gap-2 transition-all hover:opacity-90"
                        style={{ background: "rgba(29,158,117,0.1)", border: "1px solid rgba(29,158,117,0.25)", color: "#1d9e75" }}>
                        <Smartphone size={14} />
                        {app.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* Manual confirm */}
                <button onClick={() => setUpiWaiting(true)}
                  className="w-full py-3.5 rounded-xl font-black text-base text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.35)" }}>
                  I have paid via UPI →
                </button>
                <p className="text-center text-xs" style={{ color: "#8aa3be" }}>
                  After paying, click above to confirm enrollment
                </p>
              </div>
            )}
          </div>
          {!upiWaiting && (
            <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
              style={{ color: "#8aa3be" }}>← Choose Different Method</button>
          )}
        </div>
      );
    }

    /* ── EMI ── */
    if (payMethod === "emi") {
      const plans = [3, 6, 9, 12].map(m => ({ months: m, monthly: Math.ceil(total / m) }));
      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader("No Cost EMI")}
            <div className="space-y-4">
              <p className="text-xs font-semibold" style={{ color: "#8aa3be" }}>Select EMI Plan</p>
              <div className="grid grid-cols-2 gap-3">
                {plans.map(p => (
                  <button key={p.months} onClick={() => setEmiMonths(p.months)}
                    className="p-3 rounded-xl text-left transition-all"
                    style={{
                      background: emiMonths === p.months ? "rgba(29,158,117,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${emiMonths === p.months ? "#1d9e75" : "rgba(255,255,255,0.08)"}`,
                    }}>
                    <p className="text-base font-black" style={{ color: emiMonths === p.months ? "#1d9e75" : "#fff" }}>
                      {fmt(p.monthly)}<span className="text-xs font-normal">/mo</span>
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#8aa3be" }}>{p.months} months · 0% interest</p>
                  </button>
                ))}
              </div>
              <div>
                <Label req>Bank for EMI</Label>
                <select className={sel} value={emiBank} onChange={e => setEmiBank(e.target.value)}
                  style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.1)", color: emiBank ? "#fff" : "#8aa3be" }}>
                  <option value="">Select bank</option>
                  {POPULAR_BANKS.map(b => <option key={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              <p className="text-xs font-semibold" style={{ color: "#8aa3be" }}>Card Details</p>
              <div>
                <Label req>Card Number</Label>
                <input className={inp} value={cardNum} onChange={e => setCardNum(formatCardNum(e.target.value))}
                  placeholder="XXXX XXXX XXXX XXXX" maxLength={19}
                  style={inpStyle("cardNum", cardNum.replace(/\s/g,"").length === 16)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label req>Expiry</Label>
                  <input className={inp} value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY" maxLength={5} style={inpStyle("cardExpiry", cardExpiry.length === 5)} />
                </div>
                <div>
                  <Label req>CVV</Label>
                  <input className={inp} type="password" value={cardCVV}
                    onChange={e => setCardCVV(e.target.value.replace(/\D/g,"").substring(0,4))}
                    placeholder="•••" maxLength={4} style={inpStyle("cardCVV", cardCVV.length >= 3)} />
                </div>
              </div>
              {cardError && <p className="text-xs" style={{ color: "#ef4444" }}>{cardError}</p>}
            </div>
            {payBtn(`Pay ${fmt(Math.ceil(total / emiMonths))}/month (${emiMonths} EMIs)`, handleCardSubmit, !emiBank)}
          </div>
          <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: "#8aa3be" }}>← Choose Different Method</button>
        </div>
      );
    }

    /* ── WALLET ── */
    if (payMethod === "wallet") {
      const chosenWallet = WALLETS.find(w => w.id === selWallet);
      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader("Digital Wallet")}
            {bankRedirecting ? (
              <div className="flex flex-col items-center gap-5 py-4 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: chosenWallet ? `${chosenWallet.color}18` : "rgba(29,158,117,0.12)", border: `2px solid ${chosenWallet?.color ?? "#1d9e75"}44` }}>
                  {chosenWallet?.icon ?? "💳"}
                </div>
                <div>
                  <p className="text-white font-black text-lg">
                    {chosenWallet?.name ?? "Wallet"} opened
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#b0c4d8" }}>
                    Complete payment of <strong style={{ color: "#1d9e75" }}>{fmt(total)}</strong> in the wallet app
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#8aa3be" }}>Come back here after payment is done</p>
                </div>
                <button onClick={handlePaymentSuccess}
                  className="w-full py-3.5 rounded-xl font-black text-base text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.35)" }}>
                  ✓ Payment Done — Confirm Enrollment
                </button>
                <button onClick={() => setBankRedirecting(false)}
                  className="text-sm transition-all hover:opacity-70" style={{ color: "#8aa3be" }}>
                  ← Go back
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs font-semibold" style={{ color: "#8aa3be" }}>Select Wallet</p>
                <div className="grid grid-cols-3 gap-2">
                  {WALLETS.map(w => (
                    <button key={w.id} onClick={() => setSelWallet(w.id)}
                      className="py-3 px-2 rounded-xl text-xs font-bold text-center transition-all flex flex-col items-center gap-1"
                      style={{
                        background: selWallet === w.id ? `${w.color}22` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selWallet === w.id ? w.color : "rgba(255,255,255,0.08)"}`,
                        color: selWallet === w.id ? w.color : "#b0c4d8",
                      }}>
                      <span className="text-base">{w.icon}</span>
                      {w.name}
                    </button>
                  ))}
                </div>
                {walletError && <p className="text-xs" style={{ color: "#ef4444" }}>{walletError}</p>}
                {selWallet && (
                  <p className="text-xs text-center" style={{ color: "#8aa3be" }}>
                    You will be redirected to <strong className="text-white">{chosenWallet?.name}</strong> to complete payment
                  </p>
                )}
                {payBtn(
                  selWallet ? `Open ${chosenWallet?.name} & Pay ${fmt(total)}` : `Select a Wallet`,
                  handleWalletPay,
                  !selWallet
                )}
              </div>
            )}
          </div>
          {!bankRedirecting && (
            <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
              style={{ color: "#8aa3be" }}>← Choose Different Method</button>
          )}
        </div>
      );
    }

    /* ── NEFT / RTGS / IMPS ── */
    if (payMethod === "neft") {
      const neftRef = enrollIds.enrollmentId || `GVP-ENR-PENDING-${form.email.split("@")[0].substring(0, 6).toUpperCase()}`;
      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader("NEFT / RTGS / IMPS Transfer")}
            <div className="rounded-xl p-4 space-y-3 mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-black uppercase tracking-wider" style={{ color: "#1d9e75" }}>Transfer Details</p>
              {[
                ["Bank Name",       "GeoVisionPro Academy — HDFC Bank"],
                ["Account Number",  "50200012345678"],
                ["IFSC Code",       "HDFC0001234"],
                ["Account Type",    "Current"],
                ["Account Name",    "GeoVisionPro Edu Pvt Ltd"],
                ["Amount",          fmt(total)],
                ["Reference / Remarks", neftRef],
              ].map(([l, v]) => (
                <div key={l} className="flex items-start justify-between gap-4 text-sm">
                  <span style={{ color: "#8aa3be", flexShrink: 0 }}>{l}</span>
                  <span className="font-bold text-right" style={{ color: "#fff" }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3 mb-4 text-xs"
              style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.2)", color: "#b0c4d8" }}>
              <strong style={{ color: "#1d9e75" }}>⚠ Important:</strong> Use your Enrollment Reference as the payment remarks/narration. Enrollment will be confirmed within 24 hours of payment receipt.
            </div>
            <div>
              <Label>UTR / Transaction Reference Number</Label>
              <input className={inp} value={neftUTR} onChange={e => setNeftUTR(e.target.value.toUpperCase())}
                placeholder="Enter UTR number after transfer"
                style={inpStyle("neft", !!neftUTR)} />
            </div>
            <button onClick={() => submitEnrollment("NEFT / RTGS / IMPS", neftUTR || "NEFT-PENDING", 7)}
              className="w-full py-3.5 rounded-xl font-black text-base text-white mt-5 transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.3)" }}>
              Submit Enrollment Request
            </button>
          </div>
          <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: "#8aa3be" }}>← Choose Different Method</button>
        </div>
      );
    }

    /* ── DD / CHEQUE ── */
    if (payMethod === "dd") {
      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader("Demand Draft / Cheque")}
            <div className="rounded-xl p-4 mb-4 text-sm"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-black uppercase mb-2" style={{ color: "#1d9e75" }}>DD / Cheque should be drawn in favour of:</p>
              <p className="font-bold text-white text-base mb-1">GeoVisionPro Edu Pvt Ltd</p>
              <p style={{ color: "#8aa3be" }}>Amount: <strong className="text-white">{fmt(total)}</strong></p>
              <div className="h-px my-3" style={{ background: "rgba(255,255,255,0.06)" }} />
              <p className="text-xs font-black uppercase mb-1" style={{ color: "#1d9e75" }}>Send to:</p>
              <p style={{ color: "#b0c4d8" }}>GeoVisionPro Academy, 4th Floor, Tech Park, Sector 62, Noida — 201309, Uttar Pradesh</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label req>DD / Cheque Number</Label>
                  <input className={inp} value={ddNum} onChange={e => setDDNum(e.target.value)}
                    placeholder="Enter number" style={inpStyle("dd", !!ddNum)} />
                </div>
                <div>
                  <Label req>Date on DD / Cheque</Label>
                  <input className={inp} type="date" value={ddDate} onChange={e => setDDDate(e.target.value)}
                    style={inpStyle("ddDate", !!ddDate)} />
                </div>
              </div>
              <div>
                <Label req>Issuing Bank</Label>
                <input className={inp} value={ddBank} onChange={e => setDDBank(e.target.value)}
                  placeholder="Bank name e.g. HDFC Bank, SBI" style={inpStyle("ddBank", !!ddBank)} />
              </div>
            </div>
            <button onClick={() => submitEnrollment("Demand Draft / Cheque", `DD-${ddNum}`, 7)}
              disabled={!ddNum || !ddDate || !ddBank}
              className="w-full py-3.5 rounded-xl font-black text-base text-white mt-5 transition-all hover:opacity-90"
              style={{ background: ddNum && ddDate && ddBank ? "linear-gradient(135deg,#22c48a,#1d9e75)" : "rgba(255,255,255,0.08)", boxShadow: "0 4px 20px rgba(29,158,117,0.2)" }}>
              Submit DD / Cheque Details
            </button>
          </div>
          <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: "#8aa3be" }}>← Choose Different Method</button>
        </div>
      );
    }

    /* ── CORPORATE / INVOICE ── */
    if (payMethod === "corporate") {
      return (
        <div>
          <div className={card} style={cardStyle}>
            {gatewayHeader("Corporate / Invoice Request")}
            <div className="space-y-4">
              <div>
                <Label req>Company Name</Label>
                <input className={inp} value={corp.company} onChange={e => setCorp(c => ({ ...c, company: e.target.value }))}
                  placeholder="Full legal company name" style={inpStyle("corpCompany", !!corp.company)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>GST Number</Label>
                  <input className={inp} value={corp.gst} onChange={e => setCorp(c => ({ ...c, gst: e.target.value.toUpperCase() }))}
                    placeholder="22AAAAA0000A1Z5" style={inpStyle("corpGST", false)} />
                </div>
                <div>
                  <Label req>Number of Seats</Label>
                  <select className={sel} value={corp.seats} onChange={e => setCorp(c => ({ ...c, seats: e.target.value }))}
                    style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
                    {["1","2","3","4","5","6-10","11-20","21-50","51+"].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label req>Company Email</Label>
                <input className={inp} type="email" value={corp.email} onChange={e => setCorp(c => ({ ...c, email: e.target.value }))}
                  placeholder="billing@company.com" style={inpStyle("corpEmail", !!corp.email)} />
              </div>
              <div>
                <Label req>Contact Person</Label>
                <input className={inp} value={corp.contact} onChange={e => setCorp(c => ({ ...c, contact: e.target.value }))}
                  placeholder="Name and designation" style={inpStyle("corpContact", !!corp.contact)} />
              </div>
              <div className="rounded-xl p-3 text-xs"
                style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.2)", color: "#b0c4d8" }}>
                📄 A formal invoice will be generated and emailed within 2–4 business hours. Payment terms: Net 15 days. GST invoice provided.
              </div>
            </div>
            <button onClick={() => { if (!corp.company || !corp.email || !corp.contact) return; submitEnrollment("Corporate / Invoice", `CORP-INV-${Date.now().toString().slice(-6)}`, 7); }}
              disabled={!corp.company || !corp.email || !corp.contact}
              className="w-full py-3.5 rounded-xl font-black text-base text-white mt-5 transition-all hover:opacity-90"
              style={{ background: corp.company && corp.email && corp.contact ? "linear-gradient(135deg,#22c48a,#1d9e75)" : "rgba(255,255,255,0.08)", boxShadow: "0 4px 20px rgba(29,158,117,0.2)" }}>
              Request Corporate Invoice
            </button>
          </div>
          <button onClick={() => setStep(3)} className="w-full text-sm py-2 rounded-xl transition-all hover:opacity-80"
            style={{ color: "#8aa3be" }}>← Choose Different Method</button>
        </div>
      );
    }

    return null;
  }

  /* ─── STEP 5 — Processing ───────────────────────────────────── */
  function renderProcessing() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full" style={{ border: "3px solid rgba(29,158,117,0.2)" }} />
          <div className="absolute inset-0 w-24 h-24 rounded-full animate-spin"
            style={{ border: "3px solid transparent", borderTopColor: "#1d9e75" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck size={28} style={{ color: "#1d9e75" }} />
          </div>
        </div>
        <div>
          <h2 className="text-white font-black text-2xl">Processing Payment…</h2>
          <p className="text-sm mt-2" style={{ color: "#8aa3be" }}>Please do not close this window or press back.</p>
          <p className="text-xs mt-1" style={{ color: "#8aa3be" }}>Verifying transaction with payment gateway</p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: "#1d9e75", animation: `pulse 1s ${i * 0.3}s infinite` }} />
          ))}
        </div>
      </div>
    );
  }

  /* ─── STEP 6 — Success ──────────────────────────────────────── */
  function renderSuccess() {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

    async function dlReceipt() {
      await downloadPaymentReceipt({
        receiptNo: enrollIds.receiptNo,
        enrollmentId: enrollIds.enrollmentId,
        transactionId: enrollIds.transactionId,
        studentName: form.name, studentEmail: form.email,
        studentMobile: `+91 ${form.mobile}`, studentCity: form.city, studentState: form.state,
        courseName: course.title, courseRef: course.ref, courseLevel: course.level,
        courseDuration: course.duration, courseBatch: "Flexible / Self-paced",
        fee: course.fee, gst, discount, total,
        paymentMethod: PAY_METHODS.find(p => p.id === payMethod)?.label ?? payMethod,
        paymentDate: dateStr,
      });
    }

    async function dlLetter() {
      await downloadEnrollmentLetter({
        enrollmentId: enrollIds.enrollmentId,
        studentName: form.name, studentEmail: form.email,
        studentMobile: `+91 ${form.mobile}`,
        courseName: course.title, courseRef: course.ref,
        courseLevel: course.level, courseDuration: course.duration, courseBatch: "Flexible / Self-paced",
        enrollDate: dateStr,
      });
    }

    return (
      <div className="text-center">
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(29,158,117,0.15)", border: "2px solid #1d9e75" }}>
            <CheckCircle2 size={40} style={{ color: "#1d9e75" }} />
          </div>
          <div>
            <h2 className="text-white font-black text-3xl">Enrollment Successful!</h2>
            <p className="text-sm mt-2" style={{ color: "#b0c4d8" }}>Welcome to GeoVisionPro Academy, {form.name.split(" ")[0]}! 🎓</p>
          </div>
        </div>

        <div className="rounded-2xl p-5 mb-5 text-left space-y-2.5"
          style={{ background: "#0f2035", border: "1px solid rgba(29,158,117,0.25)" }}>
          {[
            ["Enrollment ID",   enrollIds.enrollmentId],
            ["Transaction ID",  enrollIds.transactionId],
            ["Receipt No",      enrollIds.receiptNo],
            ["Course",          course.title],
            ["Amount Paid",     fmt(total)],
          ].map(([l, v]) => (
            <div key={l} className="flex items-center justify-between text-sm gap-3">
              <span style={{ color: "#8aa3be" }}>{l}</span>
              <span className="font-bold text-right" style={{ color: "#fff", wordBreak: "break-all" }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <button onClick={dlReceipt}
            className="py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: "rgba(29,158,117,0.15)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.3)" }}>
            📄 Download Receipt PDF
          </button>
          <button onClick={dlLetter}
            className="py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: "rgba(29,158,117,0.15)", color: "#1d9e75", border: "1px solid rgba(29,158,117,0.3)" }}>
            📋 Enrollment Letter PDF
          </button>
        </div>

        <div className="rounded-xl p-4 mb-5 text-sm text-left space-y-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#b0c4d8" }}>
          <p className="font-bold text-white text-xs uppercase tracking-wider mb-2">Next Steps</p>
          <p>✉ Check your email <strong style={{ color: "#1d9e75" }}>{form.email}</strong> for login credentials.</p>
          <p>💬 Join your batch WhatsApp group via the link in the email.</p>
          <p>🖥 Access your course at <strong style={{ color: "#1d9e75" }}>portal.geovisionpro.com</strong></p>
        </div>

        {/* Redirect countdown */}
        <div className="rounded-xl p-3 mb-4 flex items-center justify-between gap-3"
          style={{ background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.2)" }}>
          <p className="text-xs" style={{ color: "#8aa3be" }}>
            Returning to <strong className="text-white">GeoVisionPro</strong> in{" "}
            <strong style={{ color: "#1d9e75" }}>{redirectCount}s</strong>…
          </p>
          <button onClick={() => router.push("/")}
            className="text-xs font-black px-3 py-1.5 rounded-lg flex-shrink-0 transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", color: "#fff" }}>
            Go Now →
          </button>
        </div>

        <Link href="/learn/academy"
          className="w-full block py-3.5 rounded-2xl font-black text-base text-white text-center transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.3)" }}>
          Explore More Courses →
        </Link>
      </div>
    );
  }

  /* ─── STEP 7 — Pending (offline payments) ───────────────────── */
  function renderPending() {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(245,158,11,0.12)", border: "2px solid #f59e0b" }}>
          <AlertCircle size={40} style={{ color: "#f59e0b" }} />
        </div>
        <h2 className="text-white font-black text-2xl mb-2">Request Submitted!</h2>
        <p className="text-sm mb-6" style={{ color: "#b0c4d8" }}>
          Your enrollment request is pending payment confirmation.
        </p>
        <div className="rounded-2xl p-5 mb-5 text-left space-y-2.5"
          style={{ background: "#0f2035", border: "1px solid rgba(245,158,11,0.25)" }}>
          {[
            ["Enrollment ID",  enrollIds.enrollmentId],
            ["Transaction Ref", enrollIds.transactionId],
            ["Status",         "Pending Payment Confirmation"],
            ["Course",         course.title],
          ].map(([l, v]) => (
            <div key={l} className="flex items-center justify-between text-sm gap-3">
              <span style={{ color: "#8aa3be" }}>{l}</span>
              <span className="font-bold text-right" style={{ color: "#fff", wordBreak: "break-all" }}>{v}</span>
            </div>
          ))}
        </div>
        <p className="text-sm mb-6" style={{ color: "#8aa3be" }}>
          We will verify your payment and confirm enrollment within <strong className="text-white">24–48 hours</strong>.<br />
          A confirmation email will be sent to <strong style={{ color: "#1d9e75" }}>{form.email}</strong>.
        </p>
        <Link href="/learn/academy"
          className="block py-3.5 rounded-2xl font-bold text-base text-white transition-all hover:opacity-90"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
          ← Back to Academy
        </Link>
      </div>
    );
  }

  /* ─── STEP 0 — Failed ───────────────────────────────────────── */
  function renderFailed() {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(239,68,68,0.12)", border: "2px solid #ef4444" }}>
          <XCircle size={40} style={{ color: "#ef4444" }} />
        </div>
        <h2 className="text-white font-black text-2xl mb-2">Payment Failed</h2>
        <p className="text-sm mb-6" style={{ color: "#b0c4d8" }}>
          Your payment could not be processed. Your account has not been charged.
        </p>
        <div className="space-y-3">
          <button onClick={() => { setStep(4); setShowOTP(false); setCardError(""); setOtpError(""); }}
            className="w-full py-3.5 rounded-2xl font-black text-base text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)", boxShadow: "0 4px 20px rgba(29,158,117,0.3)" }}>
            Try Again
          </button>
          <button onClick={() => { setStep(3); setPayMethod(""); }}
            className="w-full py-3 rounded-2xl font-bold text-sm transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.06)", color: "#b0c4d8", border: "1px solid rgba(255,255,255,0.1)" }}>
            Use Different Payment Method
          </button>
          <a href="mailto:academy@geovisionpro.com"
            className="block w-full py-3 rounded-2xl font-bold text-sm text-center transition-all hover:opacity-80"
            style={{ color: "#8aa3be" }}>
            Contact Support
          </a>
        </div>
      </div>
    );
  }

  /* ─── OTP Overlay ───────────────────────────────────────────── */
  function renderOTPOverlay() {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
        <div className="w-full max-w-sm rounded-2xl p-6"
          style={{ background: "#0f2035", border: "1px solid rgba(29,158,117,0.3)" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(29,158,117,0.15)", border: "1px solid rgba(29,158,117,0.3)" }}>
              <ShieldCheck size={20} style={{ color: "#1d9e75" }} />
            </div>
            <div>
              <h3 className="text-white font-black text-lg">3D Secure Verification</h3>
              <p className="text-xs" style={{ color: "#8aa3be" }}>Enter OTP to complete payment</p>
            </div>
          </div>

          <p className="text-sm mb-4" style={{ color: "#b0c4d8" }}>
            OTP sent to your registered mobile ending in <strong className="text-white">••••{form.mobile.replace(/\D/g,"").slice(-4)}</strong>
          </p>

          <div className="flex gap-2 justify-center mb-2">
            {otp.map((digit, i) => (
              <input
                key={i} id={`otp-${i}`} type="text" maxLength={1} value={digit}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, "");
                  const next = [...otp]; next[i] = val; setOtp(next); setOtpError("");
                  if (val && i < 5) setTimeout(() => document.getElementById(`otp-${i + 1}`)?.focus(), 10);
                }}
                onKeyDown={e => {
                  if (e.key === "Backspace" && !otp[i] && i > 0)
                    setTimeout(() => document.getElementById(`otp-${i - 1}`)?.focus(), 10);
                }}
                className="w-11 h-13 text-center text-lg font-black rounded-xl outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${digit ? "#1d9e75" : "rgba(255,255,255,0.15)"}`,
                  color: "#fff", padding: "10px 0",
                }}
              />
            ))}
          </div>
          <p className="text-center text-xs mb-1" style={{ color: "#8aa3be" }}>Demo: use OTP <strong className="text-white">1 2 3 4 5 6</strong></p>

          {otpError && (
            <p className="text-center text-xs mb-3 flex items-center justify-center gap-1" style={{ color: "#ef4444" }}>
              <AlertCircle size={12} />{otpError}
            </p>
          )}

          <button onClick={handleOTPVerify}
            className="w-full py-3 rounded-xl font-black text-sm text-white mt-3 transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#22c48a,#1d9e75)" }}>
            Verify & Pay {fmt(total)}
          </button>

          <p className="text-center text-xs mt-3" style={{ color: "#8aa3be" }}>
            {canResend
              ? <button onClick={() => { setOtp(["","","","","",""]); setShowOTP(false); setTimeout(() => setShowOTP(true), 50); }}
                  style={{ color: "#1d9e75", fontWeight: "bold" }}>Resend OTP</button>
              : <>Resend in <strong className="text-white">{resendTimer}s</strong></>
            }
          </p>
        </div>
      </div>
    );
  }

  /* ─── Not found ─────────────────────────────────────────────── */
  if (!course) {
    return (
      <main style={{ background: "#0a1628", minHeight: "100vh" }} className="flex flex-col items-center justify-center gap-4">
        <div className="h-16" />
        <p className="text-white font-bold">Course not found</p>
        <Link href="/learn/academy" className="text-sm" style={{ color: "#1d9e75" }}>← Back to Academy</Link>
      </main>
    );
  }

  /* ─── Root render ───────────────────────────────────────────── */
  return (
    <main style={{ background: "#0a1628", minHeight: "100vh" }}>
      <div className="h-16" aria-hidden="true" />

      {/* Top bar */}
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/learn/academy" className="flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-80"
          style={{ color: "#8aa3be" }}>
          <ArrowLeft size={16} />Back to Academy
        </Link>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} style={{ color: "#1d9e75" }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1d9e75" }}>Secure Enrollment</span>
        </div>
      </div>

      {/* Progress bar (hide on terminal screens) */}
      {step >= 1 && step <= 6 && <ProgressBar step={step} />}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pb-20">
        {saveError && (
          <div className="rounded-xl p-4 mb-4 flex items-start gap-3"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-bold" style={{ color: "#ef4444" }}>Couldn&apos;t save your enrollment</p>
              <p className="text-xs mt-0.5" style={{ color: "#fca5a5" }}>{saveError} Click the confirm button again to retry.</p>
            </div>
          </div>
        )}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderProcessing()}
        {step === 6 && renderSuccess()}
        {step === 7 && renderPending()}
        {step === 0 && renderFailed()}
      </div>

      {showOTP && renderOTPOverlay()}
      {savingEnrollment && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <div className="flex flex-col items-center gap-4 px-8 py-7 rounded-2xl"
            style={{ background: "#0f2035", border: "1px solid rgba(29,158,117,0.3)" }}>
            <Loader2 size={32} className="animate-spin" style={{ color: "#1d9e75" }} />
            <p className="text-white font-bold text-sm">Saving your enrollment…</p>
          </div>
        </div>
      )}
    </main>
  );
}
