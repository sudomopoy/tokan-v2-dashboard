import { backendFetch } from "@/lib/server-backend";

export default async function TransactionsPage() {
  const r = await backendFetch("/api/wallet/transactions");
  const txs = r.ok ? await r.json() : [];

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <h1 className="text-lg font-bold">تراکنش‌ها</h1>
        <p className="mt-1 text-sm text-slate-600">لیست آخرین تراکنش‌های کیف پول</p>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3 text-right">نوع</th>
                <th className="p-3 text-right">مبلغ</th>
                <th className="p-3 text-right">از</th>
                <th className="p-3 text-right">به</th>
                <th className="p-3 text-right">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(txs) && txs.length ? (
                txs.map((t: any) => (
                  <tr key={t.id} className="border-t border-slate-100">
                    <td className="p-3">{t.kind}</td>
                    <td className="p-3 font-mono">{t.amount_irt} ت</td>
                    <td className="p-3">{t.from_bucket ?? "—"}</td>
                    <td className="p-3">{t.to_bucket ?? "—"}</td>
                    <td className="p-3 text-xs text-slate-500">{t.created_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 text-slate-500" colSpan={5}>
                    تراکنشی ثبت نشده است.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
