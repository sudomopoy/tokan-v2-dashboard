import { backendFetch } from "@/lib/server-backend";
import { WalletActions } from "@/components/app/wallet-actions";

export default async function WalletPage() {
  const [wRes, txRes, wdRes] = await Promise.all([
    backendFetch("/api/wallet"),
    backendFetch("/api/wallet/transactions"),
    backendFetch("/api/wallet/withdrawals")
  ]);
  const wallet = wRes.ok ? await wRes.json() : null;
  const txs = txRes.ok ? await txRes.json() : [];
  const withdrawals = wdRes.ok ? await wdRes.json() : [];

  return (
    <div className="space-y-4">
      <div className="surface p-6">
        <h1 className="text-lg font-bold text-ink-900">کیف پول</h1>
        <p className="mt-1 text-sm text-ink-500">مدیریت موجودی، شارژ و برداشت در یک داشبورد یکپارچه.</p>
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
          <div className="text-xs text-ink-500">هدیه (غیرقابل برداشت)</div>
          <div className="mt-1 text-xl font-bold text-ink-900">{wallet?.gift_balance_irt ?? "—"} تومان</div>
        </div>
      </div>

      <WalletActions />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="surface p-5">
          <div className="text-sm font-bold text-ink-900">آخرین تراکنش‌ها</div>
          <div className="mt-3 space-y-2">
            {Array.isArray(txs) && txs.length ? (
              txs.slice(0, 8).map((t: any) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-xlplus bg-ink-50/80 p-3 text-sm text-ink-800 ring-1 ring-ink-100"
                >
                  <div className="truncate">
                    <div className="font-medium">{t.kind}</div>
                    <div className="text-xs text-ink-500">{t.created_at}</div>
                  </div>
                  <div className="font-mono">{t.amount_irt} ت</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-ink-500">تراکنشی ثبت نشده است.</div>
            )}
          </div>
        </div>

        <div className="surface p-5">
          <div className="text-sm font-bold text-ink-900">درخواست‌های برداشت</div>
          <div className="mt-3 space-y-2">
            {Array.isArray(withdrawals) && withdrawals.length ? (
              withdrawals.slice(0, 8).map((w: any) => (
                <div
                  key={w.id}
                  className="flex items-center justify-between rounded-xlplus bg-ink-50/80 p-3 text-sm text-ink-800 ring-1 ring-ink-100"
                >
                  <div>
                    <div className="font-medium">
                      #{w.id} — {w.status}
                    </div>
                    <div className="text-xs text-ink-500">{w.created_at}</div>
                  </div>
                  <div className="font-mono">{w.amount_irt} ت</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-ink-500">درخواستی ثبت نشده است.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
