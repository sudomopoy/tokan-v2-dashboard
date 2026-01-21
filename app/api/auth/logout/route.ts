import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/server-backend";

export async function POST() {
  clearAuthCookies();
  return NextResponse.json({ ok: true });
}
