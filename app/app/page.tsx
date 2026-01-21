import Link from "next/link";
import { backendFetch } from "@/lib/server-backend";

export default async function DashboardHome() {
  const walletRes = await backendFetch("/api/wallet");
  const wallet = walletRes.ok ? await walletRes.json() : null;

  return (
    <div className="space-y-4">
      <div className="card relative overflow-hidden p-6 text-ink-50">
        <div className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-90" />
        <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80">
              Tokan
            </div>
            <h1 className="mt-1 text-2xl font-extrabold text-white">داشبورد مالی و رفرال توکان</h1>
            <p className="mt-2 text-sm text-white/80">
              تصویر واضح از کیف پول، تراکنش‌ها و رفرال‌ها در یک نگاه.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="accent-chip bg-white/15 text-white ring-white/30">متمرکز و ساده</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-right text-white/90">
            <div className="rounded-xlplus bg-white/15 px-4 py-2 text-sm ring-1 ring-white/25">تراز کیف پول</div>
            <div className="text-2xl font-black">
              {wallet?.available_balance_irt ?? "—"} <span className="text-sm font-semibold">تومان</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="surface p-5">
          <div className="text-xs text-ink-500">قابل برداشت</div>
          <div className="mt-1 text-xl font-bold text-ink-900">{wallet?.available_balance_irt ?? "—"} تومان</div>
        </div>
        <div className="surface p-5">
          <div className="text-xs text-ink-500">بلوکه</div>
          <div className="mt-1 text-xl font-bold text-ink-900">{wallet?.blocked_balance_irt ?? "—"} تومان</div>
        </div>
        <div className="surface p-5">
          <div className="text-xs text-ink-500">هدیه</div>
          <div className="mt-1 text-xl font-bold text-ink-900">{wallet?.gift_balance_irt ?? "—"} تومان</div>
        </div>
      </div>

      <div className="surface p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="muted">دسترسی سریع</span>
          <Link className="accent-chip ring-brand-300" href="/app/wallet">
            کیف پول
          </Link>
          <Link className="accent-chip bg-ink-900 text-white ring-ink-800" href="/app/referrals">
            رفرال
          </Link>
          <Link className="accent-chip bg-white text-ink-800 ring-ink-100" href="/app/transactions">
            تراکنش‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}
