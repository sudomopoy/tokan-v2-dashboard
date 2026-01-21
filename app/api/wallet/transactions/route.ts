import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/server-backend";

export async function GET() {
  const r = await backendFetch("/api/wallet/transactions", { method: "GET" });
  const data = await r.json().catch(() => ([] as unknown));
  return NextResponse.json(data, { status: r.status });
}
