'use client';

// اجزای client که باید در layout اصلی باشد: کنترل رنگ برند (از تنظیمات پنل)
// و نمایش بنر وضعیت «در دست آماده‌سازی» برای صفحاتی که در پنل پیش‌نویس شده‌اند.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Construction } from 'lucide-react';
import { useSite, pageStatusFor } from '@/lib/store';

export function AccentController() {
  const { settings } = useSite();
  useEffect(() => {
    document.documentElement.dataset.accent = settings.accent;
  }, [settings.accent]);
  return null;
}

export function PageStatusBanner() {
  const pathname = usePathname();
  const { pages, ready } = useSite();
  if (!ready) return null;
  const meta = pageStatusFor(pages, pathname || '/');
  if (!meta || meta.status === 'published') return null;
  return (
    <div className="border-b border-amber-200 bg-amber-50 text-amber-800" role="status">
      <div className="container-x flex items-center gap-2 py-2.5 text-sm">
        <Construction className="size-4 shrink-0" aria-hidden />
        <span>
          این صفحه در حال حاضر وضعیت «در دست آماده‌سازی» دارد و از پنل مدیریت می‌توانید آن را منتشر کنید.
        </span>
        <Link href="/admin/pages" className="mr-auto shrink-0 font-semibold underline underline-offset-4">
          مدیریت صفحات
        </Link>
      </div>
    </div>
  );
}
