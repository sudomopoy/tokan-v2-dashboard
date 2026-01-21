"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tomanToIrr } from "@/lib/money";

export function WalletActions() {
  const [amountToman, setAmountToman] = useState("");
  const [withdrawToman, setWithdrawToman] = useState("");
  const [c2cToman, setC2cToman] = useState("");
  const [c2cTracking, setC2cTracking] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function initiateZarinpal() {
    setLoading(true);
    setError(null);
    try {
      const amount_irr = tomanToIrr(amountToman);
      if (!amount_irr) throw new Error("مبلغ نامعتبر است");
      const r = await fetch("/api/payments/zarinpal/initiate", { method: "POST", body: JSON.stringify({ amount_irr }) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.detail || "خطا در ایجاد پرداخت");
      if (data?.payment_url) window.location.href = String(data.payment_url);
      else throw new Error("لینک پرداخت دریافت نشد");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "خطا");
    } finally {
      setLoading(false);
    }
  }

  async function submitCardToCard() {
    setLoading(true);
    setError(null);
    try {
      const amount_irr = tomanToIrr(c2cToman);
      if (!amount_irr) throw new Error("مبلغ نامعتبر است");
      const r = await fetch("/api/payments/card-to-card/submit", {
        method: "POST",
        body: JSON.stringify({ amount_irr, tracking_code: c2cTracking })
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.detail || "خطا در ثبت رسید");
      setC2cToman("");
      setC2cTracking("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "خطا");
    } finally {
      setLoading(false);
    }
  }

  async function requestWithdraw() {
    setLoading(true);
    setError(null);
    try {
      const amount_irr = tomanToIrr(withdrawToman);
      if (!amount_irr) throw new Error("مبلغ نامعتبر است");
      const r = await fetch("/api/wallet/withdrawals", { method: "POST", body: JSON.stringify({ amount_irr }) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.detail || "خطا در ثبت درخواست برداشت");
      setWithdrawToman("");
      window.location.reload();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "خطا");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

      <div className="card p-5">
        <div className="text-sm font-bold">شارژ کیف پول</div>
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]">
          <Input placeholder="مبلغ (تومان)" value={amountToman} onChange={(e) => setAmountToman(e.target.value)} />
          <Button disabled={loading} onClick={initiateZarinpal}>
            پرداخت زرین‌پال
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_auto]">
          <Input placeholder="مبلغ (تومان)" value={c2cToman} onChange={(e) => setC2cToman(e.target.value)} />
          <Input placeholder="کد پیگیری (اختیاری)" value={c2cTracking} onChange={(e) => setC2cTracking(e.target.value)} />
          <Button variant="secondary" disabled={loading} onClick={submitCardToCard}>
            ثبت کارت‌به‌کارت
          </Button>
        </div>
        <div className="mt-2 text-xs text-slate-500">کارت‌به‌کارت پس از بررسی ادمین به موجودی اضافه می‌شود.</div>
      </div>

      <div className="card p-5">
        <div className="text-sm font-bold">برداشت</div>
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-[1fr_auto]">
          <Input placeholder="مبلغ (تومان)" value={withdrawToman} onChange={(e) => setWithdrawToman(e.target.value)} />
          <Button variant="secondary" disabled={loading} onClick={requestWithdraw}>
            ثبت درخواست برداشت
          </Button>
        </div>
        <div className="mt-2 text-xs text-slate-500">بعد از تایید ادمین، برداشت به وضعیت پرداخت‌شده تغییر می‌کند.</div>
      </div>
    </div>
  );
}
