import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/server-backend";

export async function POST(req: Request) {
  const body = await req.json();
  const r = await backendFetch("/api/auth/complete-profile", { method: "POST", body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
