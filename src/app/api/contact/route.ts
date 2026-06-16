import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendContactAcknowledgment, sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json(
      { error: "Contact form isn't configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { name, email, phone, interest, message } = body;

  if (!name || !email || !interest || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in all required fields with a valid email." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({ name, email, phone, interest, message });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const emailData = { name, email, phone, interest, message };
  await Promise.allSettled([
    sendContactNotification(emailData),
    sendContactAcknowledgment(emailData),
  ]);

  return NextResponse.json({ ok: true });
}
