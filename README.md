## Tokan Dashboard (Phase 1)

### Env
نمونه env در `dashbaord/env.local.example` است. یک فایل `dashbaord/.env.local` بسازید:

- `NEXT_PUBLIC_BACKEND_BASE_URL=http://127.0.0.1:8000`

### Run (you run)

```bash
cd dashbaord
npm install
npm run dev
```

### Routes
- `/auth`: ورود/ثبت‌نام با OTP + تکمیل پروفایل
- `/app`: داشبورد
- `/app/wallet`: کیف پول (شارژ/برداشت)
- `/app/transactions`: لیست تراکنش‌ها
- `/app/referrals`: رفرال و دعوت‌شده‌ها
- `/app/profile`: پروفایل

# tokan-v2-dashboard
