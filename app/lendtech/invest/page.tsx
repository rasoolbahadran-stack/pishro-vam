'use client';

// صفحه سرمایه‌گذاری آنلاین — طرح‌ها، محاسبه‌گر سود، سبد وام‌ها، روند سود ماهانه
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CircleAlert,
  Info,
  PieChart as PieIcon,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PageHero, Reveal, SectionHeading, StatCard } from '@/components/ui/common';
import { faMoney, faNum, parseFaDigits, groupDigits } from '@/lib/format';

const investPlans = [
  { id: 'starter', name: 'شروع‌کننده', min: 1, rate: 24, points: ['سبد متنوع ریسک کم (A+)', 'گزارش ماهانه', 'برداشت آزاد سرمایه'] },
  { id: 'balanced', name: 'متوازن', min: 10, rate: 28, points: ['سبد متنوع A تا B', 'بازپرداخت ماهانه', 'گزارش ماهانه شفاف'], popular: true },
  { id: 'maxyield', name: 'بیشترین بازده', min: 50, rate: 32, points: ['دسترسی به همه سطوح ریسک', 'مدیر اختصاصی سبد', 'بیمه بخشی از سرمایه'], },
];

const portfolio = [
  { borrower: 'محمد رضایی', amount: 8_000_000, risk: 'ریسک کم (A)', rate: 24 },
  { borrower: 'سارا احمدی', amount: 12_000_000, risk: 'ریسک کم (A+)', rate: 22 },
  { borrower: 'علی موسوی', amount: 25_000_000, risk: 'ریسک متوسط (B)', rate: 28 },
  { borrower: 'نازنین کریمی', amount: 5_000_000, risk: 'ریسک کم (A)', rate: 24 },
];

const profitTrend = [
  { month: 'خرداد', rate: 2.4 },
  { month: 'تیر', rate: 2.5 },
  { month: 'مرداد', rate: 2.6 },
  { month: 'شهریور', rate: 2.6 },
  { month: 'مهر', rate: 2.7 },
  { month: 'آبان', rate: 2.7 },
];

const riskMix = [
  { name: 'ریسک کم (A+)', value: 45, color: 'var(--brand)' },
  { name: 'ریسک کم (A)', value: 30, color: '#34d399' },
  { name: 'ریسک متوسط (B)', value: 25, color: '#fbbf24' },
];


export default function InvestPage() {
  const [amountStr, setAmountStr] = useState('50,000,000');
  const [months, setMonths] = useState(12);
  const amount = parseFaDigits(amountStr) || 0;
  const monthlyRate = 0.027;
  const monthlyProfit = amount * monthlyRate;
  const yearlyProfit = monthlyProfit * 12;

  const totalPortfolio = portfolio.reduce((a, p) => a + p.amount, 0);

  return (
    <>
      <PageHero
        badge="سرمایه‌گذاری آنلاین"
        title="سرمایه‌تان را هوشمندانه به ثمر برسانید"
        subtitle="در وام‌های دیگران سرمایه‌گذاری کنید و سود دوره‌ای دریافت کنید؛ با تنوع‌بخشی خودکار در چندین وام‌گیرنده و گزارش ماهانه شفاف."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/auth" className="btn-primary px-6 py-3">
            شروع سرمایه‌گذاری
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <Link href="#calculator" className="btn-ghost px-6 py-3">
            محاسبه سود
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="سرمایه‌گذار فعال" value="۳٬۲۰۰+" hint="در سراسر کشور" icon={Wallet} />
          <StatCard label="میانگین بازده" value="۲.۷٪ / ماه" hint="در ۱۲ ماه گذشته" icon={TrendingUp} tone="blue" />
          <StatCard label="مبلغ تحت مدیریت" value="۲۱۰ میلیارد" hint="تومان" icon={PieIcon} tone="amber" />
          <StatCard label="نرخ بازگشت سرمایه" value="۹۸.۶٪" hint="بر اساس سابقه پلتفرم" icon={ShieldCheck} tone="slate" />
        </div>
      </section>

      {/* طرح‌ها */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="طرح‌های سرمایه‌گذاری" subtitle="از شروع‌کننده تا بیشترین بازده — متناسب با سرمایه و ریسک‌پذیری شما" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {investPlans.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <div className={`card relative flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${p.popular ? 'border-2 border-[var(--brand)]' : ''}`}>
                  {p.popular && <span className="absolute -top-3.5 right-6 badge-soft bg-[var(--brand)] text-white">محبوب‌ترین</span>}
                  <h3 className="text-lg font-extrabold text-slate-800">{p.name}</h3>
                  <p className="mt-2 text-2xl font-extrabold text-[var(--brand-dark)]">
                    {faNum(p.rate)}٪ <span className="text-sm font-semibold text-slate-400">سود سالانه تقریبی</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">حداقل سرمایه: {faNum(p.min)} میلیون تومان</p>
                  <ul className="mt-4 flex-1 space-y-2.5 text-sm text-slate-600">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <Check className="size-4 text-[var(--brand)]" aria-hidden />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth" className={`mt-6 w-full ${p.popular ? 'btn-primary' : 'btn-ghost'}`}>
                    انتخاب طرح
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* محاسبه‌گر سود */}
      <section id="calculator" className="section-pad scroll-mt-20 bg-white">
        <div className="container-x">
          <SectionHeading title="محاسبه‌گر سود سرمایه‌گذاری" subtitle="مبلغ سرمایه و مدت را وارد کنید تا سود تقریبی محاسبه شود" />
          <Reveal className="mt-8">
            <div className="card mx-auto grid max-w-3xl gap-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="inv-amount" className="field-label">
                    مبلغ سرمایه‌گذاری (تومان)
                  </label>
                  <input
                    id="inv-amount"
                    value={amountStr}
                    onChange={(e) => setAmountStr(e.target.value)}
                    inputMode="numeric"
                    className="field-input"
                    dir="ltr"
                  />
                  <p className="mt-1 text-xs text-slate-400">{faMoney(amount)} تومان</p>
                </div>
                <div>
                  <label htmlFor="inv-months" className="field-label">
                    مدت (ماه)
                  </label>
                  <input
                    id="inv-months"
                    type="range"
                    min={3}
                    max={36}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="mt-3 w-full accent-[var(--brand)]"
                  />
                  <p className="mt-1 text-xs font-bold text-[var(--brand-dark)]">{faNum(months)} ماه</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-[var(--brand-bg)] p-4">
                  <p className="text-xs font-medium text-[var(--brand-dark)]">سود ماهانه تقریبی</p>
                  <p className="mt-1.5 text-sm font-extrabold text-[var(--brand-dark)] sm:text-base">{faMoney(monthlyProfit)} ت</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-xs font-medium text-amber-600">سود در {faNum(months)} ماه</p>
                  <p className="mt-1.5 text-sm font-extrabold text-amber-700 sm:text-base">{faMoney(monthlyProfit * months)} ت</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">مجموع در پایان دوره</p>
                  <p className="mt-1.5 text-sm font-extrabold text-slate-800 sm:text-base">{faMoney(amount + monthlyProfit * months)} ت</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* سبد و روند */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card p-6">
              <h3 className="text-sm font-extrabold text-slate-700">وام‌های فعال سبد شما (نمونه)</h3>
              <p className="mt-1 text-xs text-slate-400">تنوع‌بخشی خودکار در چندین وام‌گیرنده</p>
              <div className="mt-4 overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>وام‌گیرنده</th>
                      <th>مبلغ</th>
                      <th>سطح ریسک</th>
                      <th>نرخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((p) => (
                      <tr key={p.borrower}>
                        <td className="font-semibold text-slate-700">{p.borrower}</td>
                        <td>{faMoney(p.amount)} ت</td>
                        <td>
                          <span className={`badge-soft ${p.risk.includes('متوسط') ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {p.risk}
                          </span>
                        </td>
                        <td className="font-bold text-[var(--brand-dark)]">{faNum(p.rate)}٪</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {riskMix.map((r) => (
                  <span key={r.name} className="badge-soft border border-slate-100 bg-white text-slate-600">
                    <span className="size-2.5 rounded-full" style={{ background: r.color }} aria-hidden />
                    {r.name}: {faNum(r.value)}٪
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card p-6">
              <h3 className="text-sm font-extrabold text-slate-700">تاریخچه سود ماهانه</h3>
              <p className="mt-1 text-xs text-slate-400">درصد سود واقعی ماه به ماه — میانگین ۲.۷٪</p>
              <div className="mt-4 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={profitTrend}>
                    <defs>
                      <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} />
                    <YAxis domain={[2, 3]} tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} tickFormatter={(v) => `${faNum(v)}٪`} />
                    <ReTooltip formatter={(v: number | string) => `${faNum(v)}٪`} />
                    <Area type="monotone" dataKey="rate" stroke="var(--brand)" strokeWidth={2.5} fill="url(#profitFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-700">
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
                سرمایه‌گذاری با ریسک از دست دادن بخشی از سرمایه همراه است و تضمین‌شده نیست.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-8">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-[var(--brand-dark)]">
          <span className="flex items-center gap-1.5"><BadgeCheck className="size-4" aria-hidden /> قرارداد رسمی سرمایه‌گذاری</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="size-4" aria-hidden /> تفکیک اموال و حساب امانی</span>
          <span className="flex items-center gap-1.5"><Info className="size-4" aria-hidden /> گزارش شفاف ماهانه</span>
        </div>
      </section>
    </>
  );
}
