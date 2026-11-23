'use client';

// هدر اصلی سایت — ناوبری کامل با منوی موبایل، دراپ‌داون خدمات و وضعیت ورود
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  CreditCard,
  Gauge,
  LayoutDashboard,
  Menu,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Store,
  TrendingUp,
  User,
  Wallet,
  X,
  Stethoscope,
  Building2,
  Settings,
} from 'lucide-react';
import { useSite } from '@/lib/store';

const navGroups = [
  {
    label: 'خدمات',
    items: [
      { href: '/installments', title: 'خرید اقساطی', desc: 'خرید از فروشگاه‌های طرف قرارداد', icon: ShoppingBag },
      { href: '/lendtech', title: 'لندتک پیشرو', desc: 'فناوری وام‌دهی نسل جدید', icon: Wallet },
      { href: '/lendtech/bnpl', title: 'BNPL', desc: 'الان بخر، بعداً پرداخت کن', icon: CreditCard },
      { href: '/lendtech/credit-score', title: 'امتیاز اعتباری', desc: 'گزارش جامع اعتبارسنجی', icon: Gauge },
      { href: '/lendtech/invest', title: 'سرمایه‌گذاری', desc: 'سود ماهانه آنلاین', icon: TrendingUp },
    ],
  },
  {
    label: 'پورتال‌ها',
    items: [
      { href: '/dashboard', title: 'داشبورد مشتری', desc: 'مدیریت اقساط و درخواست‌ها', icon: LayoutDashboard },
      { href: '/doctors', title: 'پزشکان و کلینیک‌ها', desc: 'پنل ارائه خدمات درمانی', icon: Stethoscope },
      { href: '/merchants', title: 'پذیرندگان', desc: 'پنل فروشگاه‌ها', icon: Store },
      { href: '/organizations', title: 'سازمان‌ها', desc: 'طرح‌های رفاهی کارکنان', icon: Building2 },
    ],
  },
];

export function SiteHeader() {
  const { settings, pages, authUser } = useSite();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // بستن منو با تغییر مسیر
  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);

  // قفل اسکرول هنگام باز بودن منوی موبایل
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navPages = pages.filter((p) => p.inNav && p.status === 'published');
  const servicesGroup = navGroups[0];
  const portalsGroup = navGroups[1];

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled ? 'border-slate-100 bg-white/90 shadow-soft backdrop-blur-md' : 'border-transparent bg-white/70 backdrop-blur'
      }`}
    >
      <div className="container-x flex h-16 items-center gap-3">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="صفحه اصلی پیشرو وام">
          <span
            className="grid size-9 place-items-center rounded-xl text-base font-extrabold text-white"
            style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}
            aria-hidden
          >
            و
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-slate-800">{settings.logoText}</span>
            <span className="block text-[11px] font-medium text-slate-400">{settings.tagline}</span>
          </span>
        </Link>

        {/* ناوبری دسکتاپ */}
        <nav className="mr-4 hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          <Link
            href="/"
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
              isActive('/') ? 'text-[var(--brand-dark)]' : 'text-slate-600 hover:text-[var(--brand-dark)]'
            }`}
          >
            خانه
          </Link>

          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setDrop(group.label)}
              onMouseLeave={() => setDrop(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  drop === group.label ? 'text-[var(--brand-dark)]' : 'text-slate-600 hover:text-[var(--brand-dark)]'
                }`}
                aria-expanded={drop === group.label}
                aria-haspopup="true"
              >
                {group.label}
                <ChevronDown className={`size-4 transition-transform ${drop === group.label ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              {drop === group.label && (
                <div
                  className="absolute right-0 top-full w-72 animate-slide-down rounded-2xl border border-slate-100 bg-white p-2 shadow-lift"
                  role="menu"
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-[var(--brand-bg)]"
                      role="menuitem"
                    >
                      <span
                        className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--brand-bg)] text-[var(--brand-dark)]"
                        aria-hidden
                      >
                        <item.icon className="size-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-700">{item.title}</span>
                        <span className="block text-xs text-slate-400">{item.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {navPages
            .filter((p) => ['/support'].includes(p.path))
            .map((p) => (
              <Link
                key={p.id}
                href={p.path}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive(p.path) ? 'text-[var(--brand-dark)]' : 'text-slate-600 hover:text-[var(--brand-dark)]'
                }`}
              >
                {p.title}
              </Link>
            ))}

          <Link
            href="/admin"
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[var(--brand-dark)]"
          >
            <Settings className="size-4" aria-hidden />
            پنل مدیریت
          </Link>
        </nav>

        {/* اکشن‌ها */}
        <div className="mr-auto hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${settings.phone}`}
            className="link-muted flex items-center gap-1.5 text-sm font-semibold"
            aria-label="تماس تلفنی"
          >
            <Phone className="size-4" aria-hidden />
            {settings.phone}
          </a>
          <Link href={authUser ? '/dashboard' : '/auth'} className="btn-primary px-4 py-2">
            {authUser ? 'داشبورد من' : 'ورود / ثبت‌نام'}
          </Link>
        </div>

        {/* دکمه منوی موبایل */}
        <button
          type="button"
          className="mr-auto grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'بستن منو' : 'بازکردن منو'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* منوی موبایل */}
      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] animate-fade-in overflow-y-auto border-t border-slate-100 bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="ناوبری موبایل">
            <MobileLink href="/" label="خانه" active={isActive('/')} />
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mt-2 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-400">{group.label}</p>
                {group.items.map((item) => (
                  <MobileLink key={item.href} href={item.href} label={item.title} active={isActive(item.href)}>
                    <item.icon className="size-4 text-[var(--brand)]" aria-hidden />
                  </MobileLink>
                ))}
              </div>
            ))}
            {navPages
              .filter((p) => ['/support', '/installments', '/lendtech'].includes(p.path))
              .map((p) => (
                <MobileLink key={p.id} href={p.path} label={p.title} active={isActive(p.path)} />
              ))}
            <MobileLink href="/admin" label="پنل مدیریت" active={isActive('/admin')}>
              <Settings className="size-4 text-[var(--brand)]" aria-hidden />
            </MobileLink>
            <div className="mt-3 border-t border-slate-100 pt-3">
              <Link href={authUser ? '/dashboard' : '/auth'} className="btn-primary w-full">
                {authUser ? (
                  <>
                    <User className="size-4" aria-hidden /> داشبورد من
                  </>
                ) : (
                  'ورود / ثبت‌نام'
                )}
              </Link>
              <a href={`tel:${settings.phone}`} className="btn-ghost mt-2 w-full">
                <Phone className="size-4" aria-hidden /> {settings.phone}
              </a>
            </div>
            <div className="mt-2 flex items-center gap-2 px-3 pb-1 text-xs text-slate-400">
              <ShieldCheck className="size-3.5 text-[var(--brand)]" aria-hidden />
              دارای مجوز رسمی و رمزگذاری SSL
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
        active ? 'bg-[var(--brand-bg)] text-[var(--brand-dark)]' : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      {children}
      {label}
    </Link>
  );
}
