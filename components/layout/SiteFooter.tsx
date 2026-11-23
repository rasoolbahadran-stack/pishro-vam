'use client';

// فوتر سایت — از تنظیمات پنل مدیریت تغذیه می‌شود
import Link from 'next/link';
import { Instagram, Linkedin, Mail, MapPin, Phone, Send, ShieldCheck, Clock } from 'lucide-react';
import { useSite } from '@/lib/store';

const quickLinks = [
  { href: '/installments', label: 'خرید اقساطی' },
  { href: '/lendtech', label: 'لندتک پیشرو' },
  { href: '/applications/new', label: 'ثبت درخواست وام' },
  { href: '/lendtech/credit-score', label: 'امتیاز اعتباری' },
];

const partnerLinks = [
  { href: '/merchants/register', label: 'ثبت‌نام عامل / فروشگاه' },
  { href: '/doctors/register', label: 'ثبت‌نام پزشک' },
  { href: '/organizations/register', label: 'ثبت‌نام سازمان' },
];

const legalLinks = [
  { href: '/terms', label: 'قوانین و مقررات' },
  { href: '/privacy', label: 'حریم خصوصی' },
  { href: '/support', label: 'تماس با ما' },
];

export function SiteFooter() {
  const { settings } = useSite();
  return (
    <footer className="border-t border-slate-100 bg-white">
      {/* نوار اعتماد */}
      <div className="border-b border-slate-100 bg-[var(--brand-bg)]">
        <div className="container-x grid grid-cols-2 gap-4 py-4 text-sm font-semibold text-[var(--brand-dark)] sm:grid-cols-4">
          <span className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4" aria-hidden /> تأیید بانک مرکزی
          </span>
          <span className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4" aria-hidden /> رمزگذاری SSL
          </span>
          <span className="flex items-center justify-center gap-2">
            <Clock className="size-4" aria-hidden /> پشتیبانی ۲۴/۷
          </span>
          <span className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4" aria-hidden /> قرارداد دیجیتال
          </span>
        </div>
      </div>

      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* درباره */}
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="grid size-9 place-items-center rounded-xl text-base font-extrabold text-white"
              style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}
              aria-hidden
            >
              و
            </span>
            <span className="text-base font-extrabold text-slate-800">{settings.logoText}</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">{settings.footerNote}</p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={settings.socials.instagram}
              aria-label="اینستاگرام"
              className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
            <a
              href={settings.socials.telegram}
              aria-label="تلگرام"
              className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              <Send className="size-4" aria-hidden />
            </a>
            <a
              href={settings.socials.linkedin}
              aria-label="لینکدین"
              className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              <Linkedin className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* دسترسی سریع */}
        <nav aria-label="دسترسی سریع">
          <h3 className="text-sm font-extrabold text-slate-800">دسترسی سریع</h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-muted text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* عاملین */}
        <nav aria-label="ویژه عاملین">
          <h3 className="text-sm font-extrabold text-slate-800">ویژه عاملین</h3>
          <ul className="mt-4 space-y-2.5">
            {partnerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-muted text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* تماس */}
        <div>
          <h3 className="text-sm font-extrabold text-slate-800">تماس با ما</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-[var(--brand)]" aria-hidden />
              <span dir="ltr">{settings.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-[var(--brand)]" aria-hidden />
              <span dir="ltr">{settings.email}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" aria-hidden />
              {settings.address}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-[var(--brand)]" aria-hidden />
              {settings.workingHours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-400 sm:flex-row">
          <p>© ۱۴۰۳ {settings.siteName} — هلدینگ بین‌المللی پیشرو سرامیک. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-[var(--brand)]">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
