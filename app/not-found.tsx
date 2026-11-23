import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <span className="grid size-20 place-items-center rounded-3xl bg-[var(--brand-bg)] text-[var(--brand-dark)]" aria-hidden>
        <Compass className="size-10" />
      </span>
      <p className="mt-6 text-6xl font-extrabold tracking-tight text-[var(--brand-dark)]" aria-hidden>
        ۴۰۴
      </p>
      <h1 className="mt-3 text-xl font-extrabold text-slate-800">صفحه یافت نشد</h1>
      <p className="mt-2 max-w-md text-sm leading-7 text-slate-500">
        صفحه‌ای که دنبال آن می‌گردید وجود ندارد یا جابه‌جا شده است. از منو استفاده کنید یا به صفحه اصلی برگردید.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary px-6 py-3">
          بازگشت به خانه
        </Link>
        <Link href="/support" className="btn-ghost px-6 py-3">
          پشتیبانی
        </Link>
      </div>
    </div>
  );
}
