import Link from "next/link";
import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/server-backend";
import { LogoutButton } from "@/components/app/logout-button";
import { AppShellNav } from "@/components/app/app-shell-nav";

async function requireMe() {
  const r = await backendFetch("/api/me");
  if (!r.ok) redirect("/auth");
  return r.json();
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const me = await requireMe();
  const navItems = [
    { label: "داشبورد", href: "/app" },
    { label: "کیف پول", href: "/app/wallet" },
    { label: "تراکنش‌ها", href: "/app/transactions" },
    { label: "رفرال", href: "/app/referrals" },
    { label: "پروفایل", href: "/app/profile" },
    { label: "افزودن نوشته", badge: "جدید" },
    { label: "برگه‌ها" },
    { label: "پلاگین‌ها" },
    { label: "پوسته‌ها" },
    { label: "تنظیمات" }
  ];

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="sticky top-0 z-30 border-b border-ink-100/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/app" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-gradient shadow-card" />
              <div>
                <div className="text-sm font-bold text-ink-900">توکان</div>
                <div className="text-xs text-ink-500">ورژن مدرن وردپرسی</div>
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
              {me?.phone_e164}
            </div>
            <button className="rounded-xlplus bg-white px-4 py-2 text-sm font-medium text-ink-700 ring-1 ring-ink-100 shadow-soft">
              + ایجاد سریع
            </button>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-8 pt-4 md:grid-cols-[260px_1fr]">
        <AppShellNav items={navItems} />
        <main className="min-w-0 space-y-4">
          <div className="rounded-xlplus bg-white/60 px-4 py-3 text-xs text-ink-500 ring-1 ring-ink-100 shadow-soft backdrop-blur">
            حس وردپرس مدرن را داریم؛ همه‌چیز در نسخه آزمایشی است.
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
