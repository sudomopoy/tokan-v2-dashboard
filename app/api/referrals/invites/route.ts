import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/server-backend";

export async function GET() {
  const r = await backendFetch("/api/referrals/invites", { method: "GET" });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
