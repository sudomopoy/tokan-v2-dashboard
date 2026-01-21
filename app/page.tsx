import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-gradient">
      <div className="pointer-events-none absolute inset-0 bg-glass-1 opacity-60" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center p-6 text-white">
        <div className="surface w-full max-w-2xl bg-white/10 p-10 text-white ring-1 ring-white/25">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/80">Tokan • WP+</div>
              <h1 className="mt-1 text-3xl font-black">داشبورد فروشگاه‌ساز توکان</h1>
              <p className="mt-2 text-sm text-white/80">
                حس آشنای وردپرس، اما مدرن و نرم با چاشنی AI.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="accent-chip bg-white/15 text-white ring-white/30">نسخه بتا</span>
                <span className="accent-chip bg-white/15 text-white ring-white/30">UI نوستالژیک</span>
              </div>
            </div>
            <div className="rounded-xlplus bg-white/15 px-4 py-3 text-sm font-semibold ring-1 ring-white/25">
              بدون نیاز به نصب افزونه
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-xlplus bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-card"
            >
              ورود / ثبت‌نام
            </Link>
            <span className="text-sm text-white/80">شروع سریع داشبورد وردپرس مدرن</span>
          </div>
        </div>
      </div>
    </main>
  );
}
