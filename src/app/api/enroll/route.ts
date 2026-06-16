import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendLearnerConfirmation, sendAdminNotification } from "@/lib/email";

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { error: "Enrollment storage isn't configured yet. Please contact the site admin." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = await request.json();

  const {
    courseId, courseTitle, courseRef,
    studentName, studentEmail, studentMobile,
    organization, city, state, pincode, hearAbout,
    fee, gst, discount, total,
    paymentMethod, enrollmentId, transactionId, receiptNo,
  } = body;

  if (!courseId || !studentName || !studentEmail || !total || !paymentMethod) {
    return NextResponse.json({ error: "Missing required enrollment fields" }, { status: 400 });
  }

  const { data: row, error } = await supabase
    .from("enrollments")
    .insert({
      user_id: user.id,
      course_id: courseId,
      course_title: courseTitle,
      course_ref: courseRef,
      student_name: studentName,
      student_email: studentEmail,
      student_mobile: studentMobile,
      organization, city, state, pincode,
      hear_about: hearAbout,
      fee, gst, discount, total,
      payment_method: paymentMethod,
      enrollment_id: enrollmentId,
      transaction_id: transactionId,
      receipt_no: receiptNo,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const emailData = {
    studentName, studentEmail, studentMobile,
    courseName: courseTitle, courseRef,
    enrollmentId, transactionId, receiptNo,
    paymentMethod, total,
  };

  await Promise.allSettled([
    sendLearnerConfirmation(emailData),
    sendAdminNotification(emailData),
  ]);

  return NextResponse.json({ enrollment: row });
}
