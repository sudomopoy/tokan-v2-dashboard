import { cookies } from "next/headers";

function backendBaseUrl() {
  const base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://127.0.0.1:8000";
  return base.replace(/\/$/, "");
}

export async function backendFetch(path: string, init?: RequestInit) {
  const url = `${backendBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
  const cookieStore = cookies();
  const access = cookieStore.get("tokan_access")?.value;

  const headers = new Headers(init?.headers);
  headers.set("content-type", "application/json");
  if (access) headers.set("authorization", `Bearer ${access}`);

  return fetch(url, {
    ...init,
    headers,
    cache: "no-store"
  });
}

export function setAuthCookies(access: string, refresh: string) {
  const store = cookies();
  store.set("tokan_access", access, { httpOnly: true, sameSite: "lax", path: "/" });
  store.set("tokan_refresh", refresh, { httpOnly: true, sameSite: "lax", path: "/" });
}

export function clearAuthCookies() {
  const store = cookies();
  store.set("tokan_access", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  store.set("tokan_refresh", "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
}
