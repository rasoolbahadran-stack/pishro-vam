'use client';

// بخش‌های صفحه اصلی (۱): Hero، محاسبه‌گر وام، خدمات، آمار
// هر بخش داده‌اش را از Store می‌گیرد و از پنل مدیریت قابل ویرایش است.
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  Car,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Star,
  Headset,
  Landmark,
  FileCheck2,
  Send,
  SearchCheck,
  HandCoins,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
} from 'recharts';
import type { SectionConfig } from '@/lib/types';
import { useSite } from '@/lib/store';
import { amortizationSchedule, faMoney, faNum, faToman, loanCalc } from '@/lib/format';
import { Reveal, SectionHeading } from '@/components/ui/common';

// ── Hero ─────────────────────────────────────────────────────
export function HeroSection({ config }: { config: SectionConfig }) {
  const { settings, media } = useSite();
  const mediaItem = media.find((m) => m.id === config.imageUrl || m.name === config.imageUrl);
  const badges = ['تأیید بانک مرکزی', 'رمزگذاری SSL', 'پشتیبانی ۲۴/۷'];
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(135deg, var(--brand-bg), #fff 55%, #f8fafb)' }}
        aria-hidden
      />
      <div className="container-x relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div className="animate-fade-up">
          <span className="badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">
            <Sparkles className="size-3.5" aria-hidden />
            زیرمجموعه هلدینگ بین‌المللی پیشرو سرامیک
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-snug text-slate-800 sm:text-4xl lg:text-[2.75rem] lg:leading-snug">
            {settings.heroTitle}
            <br />
            <span className="text-[var(--brand)]">{config.title?.replace('پیشرو وام؛', '') || settings.heroHighlight} خرید اقساطی</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">{config.subtitle}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={config.ctaHref || '/auth'} className="btn-primary px-6 py-3 text-base">
              {config.ctaLabel || 'ثبت‌نام سریع'}
              <ArrowLeft className="size-4.5" aria-hidden />
            </Link>
            <Link href="/lendtech" className="btn-ghost px-6 py-3 text-base">
              مشاهده طرح‌ها
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
            {badges.map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <BadgeCheck className="size-4 text-[var(--brand)]" aria-hidden />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* کارت بصری Hero */}
        <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
          {mediaItem && mediaItem.src !== 'hero-illustration' ? (
            // تصویر انتخاب‌شده از کتابخانه رسانه
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaItem.src} alt={mediaItem.alt} className="w-full rounded-3xl object-cover shadow-lift" />
          ) : (
            <div className="relative mx-auto max-w-md">
              <div className="card animate-float rounded-3xl p-6 shadow-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">سقف اعتبار شما</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-800">{faNum('۲۰۰')} میلیون تومان</p>
                  </div>
                  <span className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                    <HandCoins className="size-5" aria-hidden />
                  </span>
                </div>
                <div className="mt-5 h-2.5 w-full rounded-full bg-slate-100">
                  <div className="h-full w-2/3 rounded-full" style={{ background: 'linear-gradient(90deg, var(--brand-light), var(--brand))' }} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                  <span>استفاده‌شده: {faNum('۶۵')} میلیون</span>
                  <span>امتیاز اعتباری {faNum('۷۴۸')}</span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: Banknote, label: 'وام نقدی' },
                    { icon: ShoppingBag, label: 'خرید اقساطی' },
                    { icon: Stethoscope, label: 'خدمات پزشکی' },
                  ].map((x) => (
                    <div key={x.label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                      <x.icon className="mx-auto size-5 text-[var(--brand)]" aria-hidden />
                      <p className="mt-1.5 text-[11px] font-semibold text-slate-600">{x.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card absolute -bottom-5 -left-4 hidden w-44 animate-float rounded-2xl p-3 shadow-card sm:block" style={{ animationDelay: '1.2s' }}>
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600" aria-hidden>
                    <FileCheck2 className="size-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">تأیید وام</p>
                    <p className="text-[10px] text-slate-400">در ۵ دقیقه</p>
                  </div>
                </div>
              </div>
              <div className="card absolute -top-4 -right-3 hidden w-48 animate-float rounded-2xl p-3 shadow-card sm:block" style={{ animationDelay: '.6s' }}>
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-amber-50 text-amber-600" aria-hidden>
                    <SearchCheck className="size-4" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">اعتبارسنجی AI</p>
                    <p className="text-[10px] text-slate-400">تحلیل ۲۰۰+ فاکتور</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── محاسبه‌گر هوشمند وام ──────────────────────────────────────
export function CalculatorSection({ config }: { config: SectionConfig }) {
  const [amount, setAmount] = useState(100_000_000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(20);
  const calc = loanCalc(amount, months, rate);
  const schedule = amortizationSchedule(amount, months, rate);

  const donut = [
    { name: 'اصل وام', value: Math.round(amount) },
    { name: 'سود کل', value: Math.round(calc.totalProfit) },
  ];
  const donutColors = ['var(--brand)', '#fbbf24'];

  const chartData = schedule
    .filter((_, i) => i % Math.max(1, Math.floor(schedule.length / 12)) === 0)
    .map((r) => ({ name: `ماه ${faNum(r.n)}`, principal: Math.round(r.principal / 1_000_000), profit: Math.round(r.profit / 1_000_000) }));

  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <SectionHeading title={config.title || 'محاسبه‌گر هوشمند وام'} subtitle={config.subtitle} />
        <Reveal className="mt-10">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* کنترل‌ها */}
            <div className="card p-6 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-amount" className="field-label">
                    مبلغ وام (تومان)
                  </label>
                  <span className="text-sm font-extrabold text-[var(--brand-dark)]">{faMoney(amount)}</span>
                </div>
                <input
                  id="calc-amount"
                  type="range"
                  min={5_000_000}
                  max={500_000_000}
                  step={5_000_000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--brand)]"
                  aria-valuetext={`${faMoney(amount)} تومان`}
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>۵ میلیون</span>
                  <span>۵۰۰ میلیون</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-months" className="field-label">
                    تعداد اقساط
                  </label>
                  <span className="text-sm font-extrabold text-[var(--brand-dark)]">{faNum(months)} ماه</span>
                </div>
                <input
                  id="calc-months"
                  type="range"
                  min={3}
                  max={36}
                  step={1}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--brand)]"
                  aria-valuetext={`${faNum(months)} ماه`}
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>۳ ماه</span>
                  <span>۳۶ ماه</span>
                </div>
              </div>

              <div className="mt-6">
                <span className="field-label">نرخ سود سالانه</span>
                <div className="grid grid-cols-3 gap-2">
                  {[18, 20, 24].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRate(r)}
                      className={`rounded-xl border px-3 py-2 text-sm font-bold transition-all ${
                        rate === r
                          ? 'border-[var(--brand)] bg-[var(--brand-bg)] text-[var(--brand-dark)]'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                      aria-pressed={rate === r}
                    >
                      {faNum(r)}٪
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[var(--brand-bg)] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-600">قسط ماهانه</span>
                  <span className="text-xl font-extrabold text-[var(--brand-dark)]">{faToman(calc.monthly)}</span>
                </div>
              </div>

              <Link href="/applications/new" className="btn-primary mt-5 w-full">
                ثبت درخواست وام
                <ArrowLeft className="size-4" aria-hidden />
              </Link>
            </div>

            {/* نتایج */}
            <div className="grid gap-6 lg:col-span-3">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'کل پرداخت', value: faToman(calc.total) },
                  { label: 'مجموع سود', value: faToman(calc.totalProfit) },
                  { label: 'نرخ مؤثر (EIR)', value: `${faNum(calc.eir.toFixed(1))}٪` },
                ].map((s) => (
                  <div key={s.label} className="card p-4 text-center">
                    <p className="text-xs font-medium text-slate-400">{s.label}</p>
                    <p className="mt-1.5 text-sm font-extrabold text-slate-800 sm:text-base">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-slate-700">توزیع پرداخت</h3>
                  <p className="text-xs text-slate-400">اصل وام در برابر سود کل</p>
                </div>
                <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
                  <div className="h-44 w-44 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={donut} dataKey="value" innerRadius={48} outerRadius={70} paddingAngle={3} strokeWidth={0}>
                          {donut.map((_, i) => (
                            <Cell key={i} fill={donutColors[i]} />
                          ))}
                        </Pie>
                        <ReTooltip formatter={(v: number | string) => faMoney(Number(v))} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="size-3 rounded-full" style={{ background: 'var(--brand)' }} aria-hidden />
                      <span className="text-slate-600">اصل وام:</span>
                      <span className="font-bold text-slate-800">{faToman(amount)}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-3 rounded-full bg-amber-400" aria-hidden />
                      <span className="text-slate-600">سود کل:</span>
                      <span className="font-bold text-slate-800">{faToman(calc.totalProfit)}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-slate-700">جدول اقساط ماه‌به‌ماه</h3>
                  <p className="text-xs text-slate-400">نمونه‌وار — میلیون تومان</p>
                </div>
                <div className="chart-scroll mt-3">
                  <div className="h-52 min-w-[480px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} barGap={2}>
                        <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} interval={0} angle={-35} textAnchor="end" height={44} />
                        <ReTooltip formatter={(v: number | string) => `${faNum(v)} میلیون تومان`} />
                        <Bar dataKey="principal" name="اصل" fill="var(--brand)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="profit" name="سود" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const serviceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Banknote,
  ShoppingBag,
  Stethoscope,
  CreditCard,
  Car,
  TrendingUp,
};

// ── خدمات اصلی ────────────────────────────────────────────────
export function ServicesSection({ config }: { config: SectionConfig }) {
  const { services } = useSite();
  const active = services.filter((s) => s.enabled);
  return (
    <section className="section-pad bg-[var(--brand-bg)]">
      <div className="container-x">
        <SectionHeading title={config.title || 'خدمات اصلی'} subtitle={config.subtitle} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((svc, i) => {
            const Icon = serviceIconMap[svc.icon] || Banknote;
            return (
              <Reveal key={svc.id} delay={i * 60}>
                <Link
                  href={svc.href}
                  className="card group block h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)] transition-transform group-hover:scale-110">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-slate-800">{svc.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{svc.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--brand-dark)]">
                    بیشتر بدانید
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-8 text-center">
          <Link href="/lendtech" className="btn-ghost">
            همه خدمات را ببینید
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ── آمار ──────────────────────────────────────────────────────
export function StatsSection({ config }: { config: SectionConfig }) {
  const stats = [
    { value: '۵۰,۰۰۰+', label: 'مشتری فعال', icon: Users, hint: 'بیش از ۵۰ هزار مشتری راضی' },
    { value: '۲,۵۰۰+', label: 'عامل فعال', icon: Store2, hint: 'فروشگاه، پزشک و سازمان' },
    { value: '۹۶٪', label: 'رضایت مشتریان', icon: Star, hint: 'بر اساس نظرسنجی سالانه' },
    { value: '۵ دقیقه', label: 'زمان تأیید', icon: Clock, hint: 'میانگین اعتبارسنجی هوشمند' },
  ];
  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <SectionHeading title={config.title || 'پیشرو وام در یک نگاه'} subtitle={config.subtitle} />
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="card relative overflow-hidden p-6 text-center transition-shadow hover:shadow-card">
                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                  <s.icon className="size-6" aria-hidden />
                </span>
                <p className="mt-4 text-2xl font-extrabold text-slate-800 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-sm font-bold text-[var(--brand-dark)]">{s.label}</p>
                <p className="mt-1 text-xs text-slate-400">{s.hint}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Store2(props: { className?: string }) {
  return <Landmark {...props} />;
}
