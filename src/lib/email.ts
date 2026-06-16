import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = "GeoVisionPro Academy <onboarding@resend.dev>";

export interface EnrollmentEmailData {
  studentName: string;
  studentEmail: string;
  studentMobile: string;
  courseName: string;
  courseRef: string;
  enrollmentId: string;
  transactionId: string;
  receiptNo: string;
  paymentMethod: string;
  total: number;
}

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function wrapper(title: string, bodyHtml: string) {
  return `
  <div style="background:#0a1628;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#0f2035;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
      <div style="background:linear-gradient(135deg,#22c48a,#1d9e75);padding:20px 28px;">
        <p style="margin:0;color:#fff;font-weight:800;font-size:18px;">GeoVisionPro Academy</p>
      </div>
      <div style="padding:28px;color:#b0c4d8;font-size:14px;line-height:1.6;">
        <h2 style="color:#fff;margin:0 0 16px;font-size:20px;">${title}</h2>
        ${bodyHtml}
      </div>
      <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.08);color:#566b82;font-size:11px;">
        GeoVisionPro Academy &middot; portal.geovisionpro.com
      </div>
    </div>
  </div>`;
}

function detailRow(label: string, value: string) {
  return `<div style="display:flex;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
    <span style="color:#8aa3be;">${label}</span>
    <span style="color:#fff;font-weight:700;text-align:right;">${value}</span>
  </div>`;
}

export async function sendLearnerConfirmation(data: EnrollmentEmailData) {
  const html = wrapper(
    `Welcome, ${data.studentName.split(" ")[0]}! 🎓`,
    `<p>You're successfully enrolled in <strong style="color:#1d9e75;">${data.courseName}</strong>.</p>
     <div style="margin:16px 0;">
       ${detailRow("Enrollment ID", data.enrollmentId)}
       ${detailRow("Transaction ID", data.transactionId)}
       ${detailRow("Receipt No", data.receiptNo)}
       ${detailRow("Payment Method", data.paymentMethod)}
       ${detailRow("Amount Paid", fmt(data.total))}
     </div>
     <p>Login credentials and your batch details will follow shortly. You can access your course anytime at <strong style="color:#1d9e75;">portal.geovisionpro.com</strong>.</p>`
  );

  if (!process.env.RESEND_API_KEY) return;
  return getResend().emails.send({
    from: FROM,
    to: data.studentEmail,
    subject: `Enrollment confirmed — ${data.courseName}`,
    html,
  });
}

export async function sendAdminNotification(data: EnrollmentEmailData) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail || !process.env.RESEND_API_KEY) return;

  const html = wrapper(
    "New Enrollment Received",
    `<div style="margin:16px 0;">
       ${detailRow("Student", data.studentName)}
       ${detailRow("Email", data.studentEmail)}
       ${detailRow("Mobile", data.studentMobile || "—")}
       ${detailRow("Course", data.courseName)}
       ${detailRow("Course Ref", data.courseRef)}
       ${detailRow("Enrollment ID", data.enrollmentId)}
       ${detailRow("Transaction ID", data.transactionId)}
       ${detailRow("Payment Method", data.paymentMethod)}
       ${detailRow("Amount Paid", fmt(data.total))}
     </div>`
  );

  return getResend().emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New enrollment: ${data.studentName} — ${data.courseName}`,
    html,
  });
}
