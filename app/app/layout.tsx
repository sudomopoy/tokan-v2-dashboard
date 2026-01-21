import Link from "next/link";
import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/server-backend";
import { LogoutButton } from "@/components/app/logout-button";

async function requireMe() {
  const r = await backendFetch("/api/me");
  if (!r.ok) redirect("/auth");
  return r.json();
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const me = await requireMe();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-gradient" />
            <div>
              <div className="text-sm font-bold">توکان</div>
              <div className="text-xs text-slate-500">{me?.phone_e164}</div>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[240px_1fr]">
        <aside className="card h-fit p-3">
          <nav className="space-y-1 text-sm">
            <Link className="block rounded-xl px-3 py-2 hover:bg-slate-100" href="/app">
              داشبورد
            </Link>
            <Link className="block rounded-xl px-3 py-2 hover:bg-slate-100" href="/app/wallet">
              کیف پول
            </Link>
            <Link className="block rounded-xl px-3 py-2 hover:bg-slate-100" href="/app/transactions">
              تراکنش‌ها
            </Link>
            <Link className="block rounded-xl px-3 py-2 hover:bg-slate-100" href="/app/referrals">
              رفرال
            </Link>
            <Link className="block rounded-xl px-3 py-2 hover:bg-slate-100" href="/app/profile">
              پروفایل
            </Link>
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
