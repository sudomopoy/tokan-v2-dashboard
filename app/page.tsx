import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-gradient">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center p-6">
        <div className="card w-full max-w-xl p-8">
          <h1 className="text-2xl font-bold">توکان</h1>
          <p className="mt-2 text-sm text-slate-600">داشبورد فروشگاه‌ساز</p>
          <div className="mt-6">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
            >
              ورود / ثبت‌نام
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
