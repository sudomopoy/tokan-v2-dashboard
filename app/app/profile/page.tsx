import { backendFetch } from "@/lib/server-backend";

export default async function ProfilePage() {
  const r = await backendFetch("/api/me");
  const me = r.ok ? await r.json() : null;

  return (
    <div className="space-y-4">
      <div className="card p-6">
        <h1 className="text-lg font-bold">پروفایل</h1>
        <p className="mt-1 text-sm text-slate-600">اطلاعات کاربری و وضعیت محدودسازی‌ها</p>
      </div>

      <div className="card p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs text-slate-500">شماره</div>
            <div className="mt-1 font-mono">{me?.phone_e164 ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">نام</div>
            <div className="mt-1">{me ? `${me.first_name} ${me.last_name}` : "—"}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-slate-500">محدودسازی‌ها</div>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              <span className="rounded-xl bg-slate-100 px-3 py-1">blocked: {String(me?.is_blocked ?? "—")}</span>
              <span className="rounded-xl bg-slate-100 px-3 py-1">deposit_blocked: {String(me?.deposit_blocked ?? "—")}</span>
              <span className="rounded-xl bg-slate-100 px-3 py-1">withdraw_blocked: {String(me?.withdraw_blocked ?? "—")}</span>
              <span className="rounded-xl bg-slate-100 px-3 py-1">referral_blocked: {String(me?.referral_blocked ?? "—")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
