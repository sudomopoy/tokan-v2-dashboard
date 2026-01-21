import { NextResponse } from "next/server";
import { backendFetch, setAuthCookies } from "@/lib/server-backend";

export async function POST(req: Request) {
  const body = await req.json();
  const r = await backendFetch("/api/auth/verify-otp", { method: "POST", body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));

  if (r.ok && data?.access && data?.refresh) {
    setAuthCookies(String(data.access), String(data.refresh));
  }
  return NextResponse.json(data, { status: r.status });
}
