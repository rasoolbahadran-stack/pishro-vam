'use client';

// صفحه امتیاز اعتباری — طیف امتیاز، عوامل، روند ۸ ماهه، وام‌های واجد شرایط، پیشنهادات AI
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CircleAlert,
  CreditCard,
  Gauge,
  HandCoins,
  Info,
  RefreshCw,
  Timer,
  Wallet,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PageHero, Reveal, SectionHeading, StatCard } from '@/components/ui/common';
import { faMoney, faNum } from '@/lib/format';

const score = 748;
const min = 300;
const max = 850;
const pct = Math.round(((score - min) / (max - min)) * 100);

const trend = [
  { month: 'فروردین', score: 640 },
  { month: 'اردیبهشت', score: 655 },
  { month: 'خرداد', score: 670 },
  { month: 'تیر', score: 688 },
  { month: 'مرداد', score: 702 },
  { month: 'شهریور', score: 715 },
  { month: 'مهر', score: 720 },
  { month: 'آبان', score: 748 },
];

const weights = [
  { factor: 'سابقه پرداخت', value: 35 },
  { factor: 'میزان بدهی', value: 30 },
  { factor: 'سابقه اعتباری', value: 15 },
  { factor: 'انواع اعتبار', value: 12 },
  { factor: 'درخواست‌های جدید', value: 8 },
];

const eligibleLoans = [
  { icon: HandCoins, title: 'وام خرد آنی', cap: 'تا ۳۰ میلیون تومان', ok: true },
  { icon: Wallet, title: 'خرید اقساطی', cap: 'تا ۴۰۰ میلیون تومان', ok: true },
  { icon: CreditCard, title: 'کارت اعتباری طلایی', cap: 'سقف ۶۰ میلیون تومان', ok: true },
  { icon: Timer, title: 'وام بلندمدت ۳۶ ماهه', cap: 'نیاز به مدارک بیشتر', ok: false },
];

const tips = [
  'موجودی کارت اعتباری خود را زیر ۳۰٪ سقف نگه دارید.',
  'هیچ قسطی را دیر پرداخت نکنید — سابقه پرداخت بیشترین وزن امتیاز را دارد.',
  'انواع مختلف اعتبار (خرید اقساطی + کارت + وام) داشته باشید.',
  'درخواست‌های اعتباری جدید را در بازه‌های کوتاه محدود کنید.',
];


export default function CreditScorePage() {
  const level = score >= 720 ? 'عالی' : score >= 640 ? 'خوب' : score >= 560 ? 'متوسط' : 'ضعیف';

  return (
    <>
      <PageHero
        badge="اعتبارسنجی هوشمند"
        title="گزارش امتیاز اعتباری شما"
        subtitle="گزارش جامع امتیاز اعتباری — به‌روزرسانی ماهانه با تحلیل بیش از ۲۰۰ فاکتور توسط موتور هوش مصنوعی پیشرو."
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">
            <RefreshCw className="size-3.5" aria-hidden />
            آخرین به‌روزرسانی: امروز
          </span>
          <Link href="/applications/new" className="btn-primary px-6 py-3">
            درخواست وام بر اساس امتیاز
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
        </div>
      </PageHero>

      <section className="section-pad bg-white">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          {/* گیج امتیاز */}
          <Reveal className="lg:col-span-2">
            <div className="card p-6 text-center">
              <h2 className="text-sm font-extrabold text-slate-600">امتیاز اعتباری شما</h2>
              <div className="relative mx-auto mt-6 h-44 w-44">
                <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(pct / 100) * 314} 314`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-slate-800">{faNum(score)}</span>
                  <span className="mt-1 badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">سطح {level}</span>
                </div>
              </div>
              {/* طیف امتیاز */}
              <div className="mt-6">
                <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                  <span className="w-1/5 bg-red-400" />
                  <span className="w-1/5 bg-orange-400" />
                  <span className="w-1/5 bg-amber-400" />
                  <span className="w-1/5 bg-lime-400" />
                  <span className="w-1/5 bg-[var(--brand)]" />
                </div>
                <div className="relative mt-1 h-4">
                  <span
                    className="absolute -translate-x-1/2 text-xs font-extrabold text-[var(--brand-dark)]"
                    style={{ right: `${100 - pct}%` }}
                  >
                    ▲ شما اینجا هستید
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{faNum(min)}</span>
                  <span>{faNum(max)}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* آمار + وام‌های واجد شرایط */}
          <div className="space-y-6 lg:col-span-3">
            <Reveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <StatCard label="سابقه اعتباری" value="۴ سال" hint="از اولین وام" icon={Timer} tone="slate" />
                <StatCard label="تعداد وام‌ها" value="۵" hint="۲ وام فعال" icon={Wallet} />
                <StatCard label="تأخیر پرداخت" value="۰" hint="در ۲۴ ماه گذشته" icon={BadgeCheck} tone="blue" />
                <StatCard label="بدهی فعال" value="۱۵ میلیون" hint="از ۱۴۰ میلیون سقف" icon={CircleAlert} tone="amber" />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card p-6">
                <h2 className="text-base font-extrabold text-slate-800">وام‌های واجد شرایط دریافت</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {eligibleLoans.map((l) => (
                    <div key={l.title} className={`flex items-center gap-3 rounded-2xl border p-4 ${l.ok ? 'border-emerald-100 bg-emerald-50/60' : 'border-amber-100 bg-amber-50/60'}`}>
                      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${l.ok ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        <l.icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-slate-700">{l.title}</p>
                        <p className="text-xs text-slate-500">{l.cap}</p>
                      </div>
                      <span className={`mr-auto badge-soft ${l.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {l.ok ? 'واجد شرایط' : 'شرطی'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* روند + وزن عوامل */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card p-6">
              <h3 className="text-sm font-extrabold text-slate-700">روند امتیاز ۸ ماهه</h3>
              <p className="mt-1 text-xs text-slate-400">تغییرات ماه به ماه</p>
              <div className="mt-4 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                    <YAxis domain={[600, 800]} tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                    <ReTooltip formatter={(v: number | string) => `امتیاز: ${faNum(v)}`} />
                    <Area type="monotone" dataKey="score" stroke="var(--brand)" strokeWidth={2.5} fill="url(#scoreFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card p-6">
              <h3 className="text-sm font-extrabold text-slate-700">وزن عوامل امتیازدهی</h3>
              <p className="mt-1 text-xs text-slate-400">تأثیر هر فاکتور بر امتیاز نهایی</p>
              <div className="mt-4 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={weights} outerRadius="75%">
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                    <ReTooltip formatter={(v: number | string) => `${faNum(v)}٪`} />
                    <Radar dataKey="value" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* پیشنهادات */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <SectionHeading title="پیشنهادات هوش مصنوعی برای بهبود امتیاز" subtitle="با رعایت این نکات، امتیاز اعتباری خود را در ماه‌های آینده افزایش دهید" />
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {tips.map((t, i) => (
              <Reveal key={t} delay={i * 60}>
                <div className="card flex items-start gap-3 p-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                    <Check className="size-4.5" aria-hidden />
                  </span>
                  <p className="text-sm leading-7 text-slate-600">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <div className="mx-auto inline-flex max-w-2xl items-start gap-2 rounded-2xl bg-amber-50 p-4 text-right text-xs leading-6 text-amber-700">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              امتیاز اعتباری پیشرو وام صرفاً یک سنجه داخلی برای پیشنهاد بهترین طرح‌هاست و در گزارش‌های رسمی اعتبارسنجی کشور ثبت نمی‌شود.
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
