'use client';

// بخش‌های صفحه اصلی (۲): مراحل کار، عاملین، طرح‌های وام، نظرات، سؤالات پرتکرار، CTA
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  FileUp,
  Landmark,
  Send,
  ShieldCheck,
  Star,
  Stethoscope,
  Store,
  UserSearch,
  Building2,
  Handshake,
  Rocket,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from 'recharts';
import type { SectionConfig } from '@/lib/types';
import { useSite } from '@/lib/store';
import { faMoney, faNum, loanCalc } from '@/lib/format';
import { Reveal, SectionHeading } from '@/components/ui/common';

// ── مراحل کار ─────────────────────────────────────────────────
export function HowItWorksSection({ config }: { config: SectionConfig }) {
  const steps = [
    { title: 'ثبت اطلاعات هویتی', desc: 'شماره موبایل و اطلاعات هویتی خود را در چند دقیقه وارد کنید.', icon: UserSearch },
    { title: 'ارسال مدارک', desc: 'تصویر کارت ملی و مدرک درآمدی را به‌صورت آنلاین بارگذاری کنید.', icon: FileUp },
    { title: 'بررسی هوشمند', desc: 'موتور اعتبارسنجی AI پرونده شما را در ۵ دقیقه تحلیل می‌کند.', icon: ShieldCheck },
    { title: 'دریافت تأیید', desc: 'پس از امضای قرارداد دیجیتال، مبلغ در کمتر از ۷۲ ساعت واریز می‌شود.', icon: HandCoinsIcon },
  ];
  return (
    <section className="section-pad bg-[var(--brand-bg)]">
      <div className="container-x">
        <SectionHeading title={config.title || 'چگونه کار می‌کند؟'} subtitle={config.subtitle} />
        <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* خط اتصال */}
          <div className="pointer-events-none absolute inset-x-10 top-8 hidden h-0.5 bg-gradient-to-l from-[var(--brand-light)] via-[var(--brand)] to-[var(--brand-light)] lg:block" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="card relative h-full p-6 text-center transition-shadow hover:shadow-card">
                <span
                  className="relative z-10 mx-auto grid size-16 place-items-center rounded-2xl text-white shadow-card"
                  style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}
                >
                  <s.icon className="size-7" aria-hidden />
                </span>
                <span className="mt-3 inline-block rounded-full bg-[var(--brand-bg)] px-2.5 py-0.5 text-[11px] font-extrabold text-[var(--brand-dark)]">
                  مرحله {faNum(i + 1)}
                </span>
                <h3 className="mt-2 text-base font-extrabold text-slate-800">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center text-sm text-slate-500">
          نتیجه اعتبارسنجی در کمتر از ۲۴ ساعت اعلام می‌شود — بدون مراجعه حضوری.
        </Reveal>
      </div>
    </section>
  );
}

function HandCoinsIcon(props: { className?: string }) {
  return <Rocket {...props} />;
}

// ── ویژه عاملین ───────────────────────────────────────────────
export function PartnersSection({ config }: { config: SectionConfig }) {
  const partners = [
    {
      href: '/merchants',
      title: 'فروشگاه‌ها',
      desc: 'فروش اقساطی به مشتریان بیشتر و درآمد بالاتر؛ تسویه هفتگی منظم.',
      icon: Store,
      points: ['تا ۳۰ مشتری جدید در ماه', 'تسویه هفتگی', 'پنل مدیریت فروش'],
    },
    {
      href: '/doctors',
      title: 'پزشکان و کلینیک‌ها',
      desc: 'ارائه خدمات درمانی اقساطی به بیماران با تأیید آنی اعتبار.',
      icon: Stethoscope,
      points: ['رتبه‌بندی بیماران', 'تسویه هفتگی شنبه', 'مدیریت خدمات و تعرفه'],
    },
    {
      href: '/organizations',
      title: 'سازمان‌ها',
      desc: 'طرح‌های رفاهی و تسهیلات ویژه برای کارکنان سازمان شما.',
      icon: Building2,
      points: ['طرح‌های رفاهی اختصاصی', 'گزارش دوره‌ای', 'داشبورد کارکنان'],
    },
  ];
  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <SectionHeading title={config.title || 'ویژه عاملین'} subtitle={config.subtitle} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="card group flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                    <p.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-800">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{p.desc}</p>
                <ul className="mt-4 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="size-4 text-[var(--brand)]" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} className="btn-soft mt-5 w-full">
                  <Handshake className="size-4" aria-hidden />
                  ورود به پنل
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── طرح‌های وام ───────────────────────────────────────────────
export function PlansSection({ config }: { config: SectionConfig }) {
  const { plans } = useSite();
  const [amount, setAmount] = useState(100_000_000);
  const active = plans.filter((p) => p.enabled);

  const chartData = active.map((p) => {
    const c = loanCalc(amount, p.months, p.rate);
    return { name: p.name, monthly: Math.round(c.monthly / 1_000_000) };
  });

  return (
    <section className="section-pad bg-[var(--brand-bg)]">
      <div className="container-x">
        <SectionHeading title={config.title || 'طرح‌های وام'} subtitle={config.subtitle} />

        <Reveal className="mx-auto mt-6 max-w-xl">
          <div className="card flex flex-col items-center gap-3 p-4 sm:flex-row">
            <label htmlFor="plan-amount" className="shrink-0 text-sm font-bold text-slate-600">
              بر اساس مبلغ:
            </label>
            <input
              id="plan-amount"
              type="range"
              min={10_000_000}
              max={500_000_000}
              step={10_000_000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-[var(--brand)]"
            />
            <span className="shrink-0 rounded-lg bg-[var(--brand-bg)] px-3 py-1 text-sm font-extrabold text-[var(--brand-dark)]">
              {faMoney(amount)} ت
            </span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {active.map((plan, i) => {
            const c = loanCalc(amount, plan.months, plan.rate);
            return (
              <Reveal key={plan.id} delay={i * 80}>
                <div
                  className={`card relative flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${
                    plan.popular ? 'border-2 border-[var(--brand)] shadow-card' : ''
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3.5 right-6 rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-card" style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}>
                      پیشنهاد هوش مصنوعی
                    </span>
                  )}
                  <h3 className="text-lg font-extrabold text-slate-800">{plan.name}</h3>
                  <p className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[var(--brand-dark)]">{faMoney(c.monthly)}</span>
                    <span className="text-xs text-slate-400">تومان / ماه</span>
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <Check className="size-4 text-[var(--brand)]" aria-hidden />
                      اقساط {faNum(plan.months)} ماهه — سود {faNum(plan.rate)}٪ سالانه
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-4 text-[var(--brand)]" aria-hidden />
                      مجموع بازپرداخت: {faMoney(c.total)}
                    </li>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="size-4 text-[var(--brand)]" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/applications/new" className={`mt-6 w-full ${plan.popular ? 'btn-primary' : 'btn-ghost'}`}>
                    انتخاب این طرح
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* نمودار مقایسه */}
        <Reveal className="mt-10">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-extrabold text-slate-700">مقایسه قسط ماهانه طرح‌ها</h3>
              <p className="text-xs text-slate-400">بر اساس مبلغ انتخابی — میلیون تومان</p>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: 'Vazirmatn' }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <ReTooltip formatter={(v: number | string) => `${faNum(v)} میلیون تومان`} />
                  <Bar dataKey="monthly" name="قسط ماهانه" fill="var(--brand)" radius={[8, 8, 0, 0]} maxBarSize={70} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 rounded-xl bg-[var(--brand-bg)] p-3 text-xs leading-6 text-[var(--brand-dark)]">
              مقادیر نمودار با مبلغ انتخابی شما تنظیم شده‌اند — برای تغییر، اسلایدر بالا را جابه‌جا کنید.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── نظرات کاربران ─────────────────────────────────────────────
export function TestimonialsSection({ config }: { config: SectionConfig }) {
  const { testimonials } = useSite();
  const active = testimonials.filter((t) => t.enabled);
  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <SectionHeading title={config.title || 'کاربران ما چه می‌گویند؟'} subtitle={config.subtitle} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {active.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <figure className="card flex h-full flex-col p-6 transition-shadow hover:shadow-card">
                <div className="flex items-center gap-1" aria-label={`امتیاز ${faNum(t.rating)} از ${faNum(5)}`}>
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`size-4 ${si < t.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`}
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-7 text-slate-600">«{t.text}»</blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-[var(--brand-bg)] text-sm font-extrabold text-[var(--brand-dark)]" aria-hidden>
                    {t.name.replace('دکتر ', '').charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-slate-700">{t.name}</span>
                    <span className="block text-xs text-slate-400">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── سؤالات پرتکرار ────────────────────────────────────────────
export function FaqSection({ config }: { config: SectionConfig }) {
  const { faqs } = useSite();
  const [openId, setOpenId] = useState<string | null>(null);
  const active = faqs.filter((f) => f.enabled);
  return (
    <section className="section-pad bg-[var(--brand-bg)]">
      <div className="container-x">
        <SectionHeading title={config.title || 'سؤالات پرتکرار'} subtitle={config.subtitle} />
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {active.map((f, i) => {
            const open = openId === f.id;
            return (
              <Reveal key={f.id} delay={i * 50}>
                <div className={`card overflow-hidden transition-all ${open ? 'border-[var(--brand)]' : ''}`}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 p-5 text-right"
                    onClick={() => setOpenId(open ? null : f.id)}
                    aria-expanded={open}
                  >
                    <span className="text-sm font-bold text-slate-700 sm:text-base">{f.question}</span>
                    <span className={`grid size-8 shrink-0 place-items-center rounded-lg transition-colors ${open ? 'bg-[var(--brand)] text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
                    </span>
                  </button>
                  {open && (
                    <div className="animate-slide-down border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-500">
                      {f.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CTA پایانی ────────────────────────────────────────────────
export function CtaSection({ config }: { config: SectionConfig }) {
  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl p-8 text-center text-white shadow-lift sm:p-14" style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}>
            <div className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-white/10" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -right-10 size-64 rounded-full bg-white/10" aria-hidden />
            <h2 className="relative text-2xl font-extrabold sm:text-3xl">
              آماده‌اید مالیتان را هوشمندانه مدیریت کنید؟
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
              {config.subtitle || 'همین حالا ثبت‌نام کنید و اولین وام خود را در ۵ دقیقه دریافت کنید.'}
            </p>
            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href={config.ctaHref || '/auth'} className="btn bg-white px-7 py-3 text-base font-extrabold text-[var(--brand-dark)] shadow-card hover:-translate-y-0.5">
                {config.ctaLabel || 'شروع رایگان'}
                <ArrowLeft className="size-4.5" aria-hidden />
              </Link>
              <Link href="/support" className="btn border-2 border-white/60 px-6 py-3 text-base text-white hover:bg-white/10">
                گفتگو با پشتیبانی
              </Link>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4" aria-hidden /> بدون نیاز به ضامن
              </span>
              <span className="flex items-center gap-1.5">
                <Landmark className="size-4" aria-hidden /> مجوز رسمی
              </span>
              <span className="flex items-center gap-1.5">
                <Send className="size-4" aria-hidden /> واریز تا ۷۲ ساعت
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
