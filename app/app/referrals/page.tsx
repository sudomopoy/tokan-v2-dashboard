import { backendFetch } from "@/lib/server-backend";

export default async function ReferralsPage() {
  const [meRes, invRes] = await Promise.all([backendFetch("/api/referrals/me"), backendFetch("/api/referrals/invites")]);
  const me = meRes.ok ? await meRes.json() : null;
  const inv = invRes.ok ? await invRes.json() : { invites: [], total_commission_irr: 0 };

  const code = me?.code ?? "—";
  const rate = me?.commission_rate_bps ?? 0;
  const totalIrr = inv?.total_commission_irr ?? 0;
  const totalToman = Math.floor(Number(totalIrr) / 10).toLocaleString("fa-IR");

  return (
    <div className="space-y-4">
      <div className="surface p-6">
        <h1 className="text-lg font-bold text-ink-900">رفرال</h1>
        <p className="mt-1 text-sm text-ink-500">کد رفرال، دعوت‌شده‌ها و درآمد</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="surface p-5">
          <div className="text-xs text-ink-500">کد رفرال</div>
          <div className="mt-1 font-mono text-xl font-bold text-ink-900">{code}</div>
        </div>
        <div className="surface p-5">
          <div className="text-xs text-ink-500">نرخ کمیسیون</div>
          <div className="mt-1 text-xl font-bold text-ink-900">{(Number(rate) / 100).toFixed(2)}%</div>
        </div>
        <div className="surface p-5">
          <div className="text-xs text-ink-500">مجموع درآمد (تومان)</div>
          <div className="mt-1 text-xl font-bold text-ink-900">{totalToman}</div>
        </div>
      </div>

      <div className="surface p-5">
        <div className="text-sm font-bold text-ink-900">دعوت‌شده‌ها</div>
        <div className="mt-3 space-y-2">
          {Array.isArray(inv?.invites) && inv.invites.length ? (
            inv.invites.map((i: any) => (
              <div
                key={i.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xlplus bg-ink-50/80 p-3 text-sm text-ink-800 ring-1 ring-ink-100"
              >
                <div className="truncate">
                  <div className="font-medium">{i.invited_user_phone}</div>
                  <div className="text-xs text-ink-500">
                    {i.invited_user_is_profile_complete ? "پروفایل تکمیل" : "پروفایل ناقص"} — {i.created_at}
                  </div>
                </div>
                <div className="text-xs text-ink-600">
                  {i.invited_user_first_name} {i.invited_user_last_name}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-ink-500">دعوت‌شده‌ای ثبت نشده است.</div>
          )}
        </div>
      </div>
    </div>
  );
}
