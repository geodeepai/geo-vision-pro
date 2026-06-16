import type { SupabaseClient } from "@supabase/supabase-js";

export type ActivityEventType =
  | "login"
  | "account_created"
  | "profile_updated"
  | "email_changed"
  | "password_changed"
  | "avatar_updated"
  | "avatar_removed";

export async function logActivity(
  supabase: SupabaseClient,
  userId: string,
  eventType: ActivityEventType,
  description: string,
  metadata?: Record<string, unknown>
) {
  await supabase.from("activity_log").insert({
    user_id: userId,
    event_type: eventType,
    description,
    metadata: metadata ?? null,
  });
}

export function deviceLabel(): string {
  if (typeof navigator === "undefined") return "Unknown device";
  const ua = navigator.userAgent;
  const browser = /Edg\//.test(ua) ? "Edge"
    : /Chrome\//.test(ua) ? "Chrome"
    : /Firefox\//.test(ua) ? "Firefox"
    : /Safari\//.test(ua) ? "Safari"
    : "Browser";
  const os = /Windows/.test(ua) ? "Windows"
    : /Mac OS/.test(ua) ? "macOS"
    : /Android/.test(ua) ? "Android"
    : /iPhone|iPad|iPod/.test(ua) ? "iOS"
    : "Unknown OS";
  return `${browser} on ${os}`;
}
