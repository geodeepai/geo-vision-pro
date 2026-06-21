export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.counterapi.dev/v1/DeepEarthScience-site/visitors/hit",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("counter api failed");
    const data = await res.json();
    return Response.json({ count: data.count, live: true });
  } catch {
    /* Fallback: deterministic count based on days since site launch */
    const launch = new Date("2024-06-01").getTime();
    const days   = Math.floor((Date.now() - launch) / 86_400_000);
    return Response.json({ count: 12_850 + days * 78, live: false });
  }
}
