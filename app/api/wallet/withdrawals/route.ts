import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/server-backend";

export async function GET() {
  const r = await backendFetch("/api/wallet/withdrawals", { method: "GET" });
  const data = await r.json().catch(() => ([] as unknown));
  return NextResponse.json(data, { status: r.status });
}

export async function POST(req: Request) {
  const body = await req.json();
  const r = await backendFetch("/api/wallet/withdrawals", { method: "POST", body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));
  return NextResponse.json(data, { status: r.status });
}
