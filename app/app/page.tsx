import Link from "next/link";
import { backendFetch } from "@/lib/server-backend";

export default async function DashboardHome() {
  const walletRes = await backendFetch("/api/wallet");
  const wallet = walletRes.ok ? await walletRes.json() : null;

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <h1 className="text-lg font-bold">خوش آمدید</h1>
        <p className="mt-1 text-sm text-slate-600">نمای کلی فاز اول توکان</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="text-xs text-slate-500">قابل برداشت</div>
          <div className="mt-1 text-xl font-bold">{wallet?.available_balance_irt ?? "—"} تومان</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-slate-500">بلوکه</div>
          <div className="mt-1 text-xl font-bold">{wallet?.blocked_balance_irt ?? "—"} تومان</div>
        </div>
        <div className="card p-5">
          <div className="text-xs text-slate-500">هدیه</div>
          <div className="mt-1 text-xl font-bold">{wallet?.gift_balance_irt ?? "—"} تومان</div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex flex-wrap gap-2">
          <Link className="rounded-xl bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700" href="/app/wallet">
            رفتن به کیف پول
          </Link>
          <Link className="rounded-xl bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800" href="/app/referrals">
            مدیریت رفرال
          </Link>
        </div>
      </div>
    </div>
  );
}
