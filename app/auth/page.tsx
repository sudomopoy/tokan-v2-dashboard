"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "phone" | "otp" | "profile";

export default function AuthPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const linkToken = sp.get("token") || "";

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [debugCode, setDebugCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => {
    if (step === "phone") return "ورود / ثبت‌نام";
    if (step === "otp") return "کد تایید";
    return "تکمیل اطلاعات";
  }, [step]);

  useEffect(() => {
    if (!linkToken) return;
    setLoading(true);
    setError(null);
    fetch("/api/auth/verify-otp", { method: "POST", body: JSON.stringify({ link_token: linkToken }) })
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data?.detail || "خطا در تایید لینک");
        if (data?.is_new_user) setStep("profile");
        else router.replace("/app");
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "خطا"))
      .finally(() => setLoading(false));
  }, [linkToken, router]);

  async function onRequestOtp() {
    setLoading(true);
    setError(null);
    setDebugCode(null);
    try {
      const r = await fetch("/api/auth/request-otp", { method: "POST", body: JSON.stringify({ phone }) });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.detail || "خطا در ارسال کد");
      if (data?.debug_code) setDebugCode(String(data.debug_code));
      setStep("otp");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "خطا");
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyOtp() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, code })
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.detail || "کد تایید نامعتبر است");
      if (data?.is_new_user) setStep("profile");
      else router.replace("/app");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "خطا");
    } finally {
      setLoading(false);
    }
  }

  async function onCompleteProfile() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch("/api/auth/complete-profile", {
        method: "POST",
        body: JSON.stringify({ first_name: firstName, last_name: lastName, referral_code: referralCode })
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.detail || "خطا در ثبت اطلاعات");
      router.replace("/app");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "خطا");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-gradient">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center p-6">
        <div className="card w-full max-w-md p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{title}</h1>
            <div className="text-xs text-slate-500">توکان</div>
          </div>

          {error ? <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

          {step === "phone" ? (
            <div className="mt-6 space-y-3">
              <label className="block text-sm text-slate-700">شماره موبایل</label>
              <Input placeholder="مثلاً 09123456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Button disabled={loading || phone.trim().length < 10} onClick={onRequestOtp} className="w-full">
                {loading ? "..." : "ارسال کد تایید"}
              </Button>
            </div>
          ) : null}

          {step === "otp" ? (
            <div className="mt-6 space-y-3">
              <div className="text-sm text-slate-600">کد تایید ارسال‌شده را وارد کنید.</div>
              {debugCode ? (
                <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="text-xs text-slate-500">DEBUG CODE</div>
                  <div className="mt-1 font-mono">{debugCode}</div>
                </div>
              ) : null}
              <Input placeholder="کد ۶ رقمی" value={code} onChange={(e) => setCode(e.target.value)} />
              <Button disabled={loading || code.trim().length < 4} onClick={onVerifyOtp} className="w-full">
                {loading ? "..." : "تایید و ادامه"}
              </Button>
              <button
                className="w-full text-center text-sm text-slate-600 underline"
                onClick={() => {
                  setStep("phone");
                  setCode("");
                }}
              >
                تغییر شماره
              </button>
            </div>
          ) : null}

          {step === "profile" ? (
            <div className="mt-6 space-y-3">
              <div className="text-sm text-slate-600">برای تکمیل ثبت‌نام، اطلاعات پایه را وارد کنید.</div>
              <Input placeholder="نام" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <Input placeholder="نام خانوادگی" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              <Input
                placeholder="کد رفرال (اختیاری)"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <Button disabled={loading || !firstName.trim() || !lastName.trim()} onClick={onCompleteProfile} className="w-full">
                {loading ? "..." : "ورود به داشبورد"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
