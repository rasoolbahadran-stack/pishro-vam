'use client';

// لایه پنل مدیریت — گیت ورود نمایشی (admin / admin123) + سایدبار + هدر
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Blocks,
  ExternalLink,
  FileSliders,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Settings,
  ShieldCheck,
  FileStack,
  X,
} from 'lucide-react';
import { useSite } from '@/lib/store';

const navItems = [
  { href: '/admin', label: 'داشبورد', icon: LayoutDashboard, exact: true },
  { href: '/admin/sections', label: 'بخش‌های سایت', icon: Blocks },
  { href: '/admin/pages', label: 'صفحات', icon: FileStack },
  { href: '/admin/content', label: 'محتوا', icon: MessageSquareQuote },
  { href: '/admin/applications', label: 'درخواست‌ها', icon: FileSliders },
  { href: '/admin/media', label: 'رسانه', icon: Images },
  { href: '/admin/settings', label: 'تنظیمات', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { adminSession, setAdminSession, settings, ready } = useSite();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname() || '/admin';
  const router = useRouter();

  useEffect(() => setSidebarOpen(false), [pathname]);

  if (!ready) {
    return <div className="grid min-h-screen place-items-center text-sm text-slate-400">در حال بارگذاری پنل…</div>;
  }

  if (!adminSession) {
    return <LoginGate onSuccess={() => setAdminSession(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* سایدبار دسکتاپ */}
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-60 border-l border-slate-200 bg-white lg:flex lg:flex-col">
        <div className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
          <span
            className="grid size-9 place-items-center rounded-xl text-base font-extrabold text-white"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}
            aria-hidden
          >
            و
          </span>
          <div>
            <p className="text-sm font-extrabold text-slate-800">{settings.logoText}</p>
            <p className="text-[11px] text-slate-400">پنل مدیریت</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="ناوبری پنل">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
                  active ? 'bg-[var(--brand-bg)] text-[var(--brand-dark)]' : 'text-slate-500 hover:bg-slate-50'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <item.icon className="size-4.5" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-slate-100 p-3">
          <Link href="/" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-500 transition-colors hover:bg-slate-50">
            <ExternalLink className="size-4.5" aria-hidden />
            مشاهده سایت
          </Link>
          <button
            type="button"
            onClick={() => {
              setAdminSession(false);
              router.push('/');
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold text-red-500 transition-colors hover:bg-red-50"
          >
            <LogOut className="size-4.5" aria-hidden />
            خروج از پنل
          </button>
        </div>
      </aside>

      {/* دراور موبایل */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 animate-fade-in bg-slate-900/40" onClick={() => setSidebarOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 right-0 flex w-64 animate-slide-down flex-col border-l border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <p className="text-sm font-extrabold text-slate-800">پنل مدیریت</p>
              <button type="button" onClick={() => setSidebarOpen(false)} className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500" aria-label="بستن منو">
                <X className="size-4.5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {navItems.map((item) => {
                const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold ${
                      active ? 'bg-[var(--brand-bg)] text-[var(--brand-dark)]' : 'text-slate-500'
                    }`}
                  >
                    <item.icon className="size-4.5" aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
              <Link href="/" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-500">
                <ExternalLink className="size-4.5" aria-hidden />
                مشاهده سایت
              </Link>
            </nav>
          </aside>
        </div>
      )}

      <div className="lg:mr-60">
        {/* هدر */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="بازکردن منو"
          >
            <Menu className="size-4.5" />
          </button>
          <p className="text-sm font-extrabold text-slate-700">پنل مدیریت پیشرو وام</p>
          <span className="badge-soft mr-auto bg-[var(--brand-bg)] text-[var(--brand-dark)]">
            <ShieldCheck className="size-3.5" aria-hidden />
            نسخه دمو — داده‌ها در مرورگر ذخیره می‌شوند
          </span>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin123') {
      setError('');
      onSuccess();
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-4" dir="rtl">
      <div className="card w-full max-w-sm p-8 shadow-lift">
        <div className="text-center">
          <span
            className="mx-auto grid size-12 place-items-center rounded-2xl text-xl font-extrabold text-white"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}
            aria-hidden
          >
            و
          </span>
          <h1 className="mt-4 text-lg font-extrabold text-slate-800">ورود به پنل مدیریت</h1>
          <p className="mt-1 text-xs text-slate-400">نسخه نمایشی — دسترسی مدیریت سایت</p>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="ad-user" className="field-label">نام کاربری</label>
            <input id="ad-user" value={user} onChange={(e) => setUser(e.target.value)} className="field-input" placeholder="admin" dir="ltr" autoComplete="username" />
          </div>
          <div>
            <label htmlFor="ad-pass" className="field-label">رمز عبور</label>
            <input id="ad-pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="field-input" placeholder="••••••••" dir="ltr" autoComplete="current-password" />
          </div>
          {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3">ورود</button>
        </form>
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-center text-xs font-semibold text-amber-700">
          حساب نمایشی — کاربر: admin | رمز: admin123
        </p>
      </div>
    </div>
  );
}
