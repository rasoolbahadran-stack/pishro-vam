'use client';

// صفحه BNPL — انتخاب فروشگاه با جستجو، محاسبه‌گر، مراحل درخواست و مزایا
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  Clock3,
  FileCheck2,
  Percent,
  Search,
  ShieldCheck,
  Smartphone,
  Store,
  Timer,
  Wallet,
} from 'lucide-react';
import { PageHero, Reveal, SectionHeading, StatCard, EmptyState } from '@/components/ui/common';
import { faMoney, faNum, loanCalc } from '@/lib/format';

const stores = [
  { id: 'st1', name: 'الکترونیک پیشرو', category: 'الکترونیک', cap: 50 },
  { id: 'st2', name: 'خانه و آشپزخانه مهر', category: 'لوازم خانگی', cap: 30 },
  { id: 'st3', name: 'کلینیک سلامت پارس', category: 'خدمات درمانی', cap: 80 },
  { id: 'st4', name: 'نمایندگی ایران‌خودرو آرین', category: 'خودرو', cap: 400 },
  { id: 'st5', name: 'پوشاک آریا', category: 'پوشاک', cap: 10 },
  { id: 'st6', name: 'مبلمان و دکوراسیون نیان', category: 'مبلمان', cap: 35 },
  { id: 'st7', name: 'دیجی‌مارکت مرکزی', category: 'الکترونیک', cap: 25 },
  { id: 'st8', name: 'زنجیره مصرف برنج', category: 'خواربار', cap: 20 },
];

const steps = [
  { icon: Store, title: 'انتخاب فروشگاه', desc: 'از میان فروشگاه‌های طرف قرارداد، محل خرید خود را پیدا کنید.' },
  { icon: Wallet, title: 'درخواست BNPL', desc: 'مبلغ خرید و تعداد اقساط (۲ تا ۳ قسط) را انتخاب کنید.' },
  { icon: Timer, title: 'تأیید در ۳۰ ثانیه', desc: 'موتور AI اعتبار شما را لحظه‌ای بررسی و تأیید می‌کند.' },
  { icon: FileCheck2, title: 'خرید کنید!', desc: 'کد تأیید را در فروشگاه یا اپلیکیشن وارد کنید و خرید را نهایی کنید.' },
];

const benefits = [
  'تأیید در کمتر از ۳۰ ثانیه',
  'بدون بهره در ماه اول',
  'مدیریت کامل اقساط از طریق داشبورد',
  'حفاظت کامل از اطلاعات',
  '۵۰۰+ فروشگاه در سراسر کشور',
  'بدون نیاز به کارت فیزیکی — همه‌چیز دیجیتال',
];


export default function BnplPage() {
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState(20_000_000);
  const [parts, setParts] = useState(3);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return stores;
    return stores.filter((s) => s.name.includes(q) || s.category.includes(q));
  }, [query]);

  const calc = loanCalc(amount, parts, 0); // ماه اول بدون بهره

  return (
    <>
      <PageHero
        badge="خرید الان، پرداخت بعد"
        title="BNPL پیشرو؛ خرید بدون نقد"
        subtitle="از ۵۰۰+ فروشگاه طرف قرارداد آنلاین و حضوری خرید کنید و مبلغ را در ۲ یا ۳ قسط پرداخت کنید — ماه اول بدون بهره."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#stores" className="btn-primary px-6 py-3">
            انتخاب فروشگاه
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <Link href="/auth" className="btn-ghost px-6 py-3">
            فعال‌سازی اعتبار
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="خرید این ماه" value="۸ میلیارد تومان" hint="گردش BNPL کاربران" icon={ShoppingBagIcon} />
          <StatCard label="میانگین تأیید" value="۳۰ ثانیه" hint="از درخواست تا کد خرید" icon={Timer} tone="blue" />
          <StatCard label="فروشگاه طرف قرارداد" value="۵۰۰+" hint="آنلاین و حضوری" icon={Store} tone="amber" />
          <StatCard label="رضایت مشتری" value="۹۴٪" hint="نظرسنجی کاربران BNPL" icon={BadgeCheck} tone="slate" />
        </div>
      </section>

      {/* مراحل */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="چطور کار می‌کند؟" subtitle="در ۴ گام ساده خرید اقساطی خود را نهایی کنید" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="card h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-xs font-extrabold text-slate-400">گام {faNum(i + 1)}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-extrabold text-slate-700">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* فروشگاه‌ها */}
      <section id="stores" className="section-pad scroll-mt-20 bg-white">
        <div className="container-x">
          <SectionHeading title="فروشگاه‌های طرف قرارداد" subtitle="از میان فروشگاه‌های همکار جستجو کنید و سقف خرید هر فروشگاه را ببینید" />
          <Reveal className="mt-8">
            <div className="relative mx-auto max-w-md">
              <Search className="absolute right-4 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی فروشگاه یا صنف…"
                className="field-input pr-11"
                aria-label="جستجوی فروشگاه"
              />
            </div>
          </Reveal>
          {filtered.length === 0 ? (
            <Reveal className="mt-8">
              <EmptyState title="فروشگاهی با این نام یافت نشد" description="عبارت دیگری را جستجو کنید یا از فهرست کامل استفاده کنید." icon={Store} />
            </Reveal>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((s, i) => (
                <Reveal key={s.id} delay={i * 40}>
                  <div className="card flex h-full items-center gap-3 p-4 transition-shadow hover:shadow-card">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <Store className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-slate-700">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.category}</p>
                      <p className="mt-1 text-xs font-bold text-[var(--brand-dark)]">تا {faNum(s.cap)} میلیون</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* محاسبه‌گر BNPL */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="محاسبه‌گر BNPL" subtitle="مبلغ خرید و تعداد اقساط را انتخاب کنید" />
          <Reveal className="mt-8">
            <div className="card mx-auto grid max-w-3xl gap-6 p-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="bnpl-amount" className="field-label">
                    مبلغ خرید
                  </label>
                  <span className="text-sm font-extrabold text-[var(--brand-dark)]">{faMoney(amount)} ت</span>
                </div>
                <input
                  id="bnpl-amount"
                  type="range"
                  min={1_000_000}
                  max={50_000_000}
                  step={1_000_000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--brand)]"
                />
              </div>
              <div>
                <span className="field-label">تعداد اقساط</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { n: 1, label: 'پرداخت ماه بعد', extra: 'بدون بهره' },
                    { n: 2, label: '۲ قسط مساوی' },
                    { n: 3, label: '۳ قسط مساوی' },
                  ].map((o) => (
                    <button
                      key={o.n}
                      type="button"
                      onClick={() => setParts(o.n)}
                      className={`rounded-xl border p-2.5 text-center text-xs font-bold transition-all ${
                        parts === o.n
                          ? 'border-[var(--brand)] bg-[var(--brand-bg)] text-[var(--brand-dark)]'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                      aria-pressed={parts === o.n}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2 rounded-2xl bg-white p-4 shadow-soft">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-slate-400">هر قسط</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-800">{faMoney(calc.monthly)} ت</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">مجموع پرداختی</p>
                    <p className="mt-1 text-sm font-extrabold text-slate-800">{faMoney(calc.total)} ت</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">سود</p>
                    <p className="mt-1 text-sm font-extrabold text-emerald-600">
                      {parts === 1 ? 'بدون بهره' : `${faMoney(calc.totalProfit)} ت`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <Link href="/auth" className="btn-primary w-full py-3">
                  شروع خرید BNPL
                  <ArrowLeft className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* مزایا */}
      <section className="section-pad bg-white">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-slate-800 sm:text-3xl">مزایای BNPL پیشرو</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-sm font-semibold text-slate-600">
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-700">
              برای استفاده از BNPL به احراز هویت و امتیاز اعتباری حداقل {faNum('۵۵۰')} نیاز دارید؛ امتیاز شما از داشبورد قابل مشاهده است.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="card relative overflow-hidden p-6">
              <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4">
                <span className="flex items-center gap-2 text-sm font-extrabold text-slate-700">
                  <Smartphone className="size-4.5 text-[var(--brand)]" aria-hidden />
                  رسید خرید نمایشی
                </span>
                <span className="badge-soft bg-emerald-50 text-emerald-600">
                  <Check className="size-3.5" aria-hidden />
                  تأیید شد!
                </span>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-400">فروشگاه</dt>
                  <dd className="font-bold text-slate-700">الکترونیک پیشرو</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">مبلغ خرید</dt>
                  <dd className="font-extrabold text-slate-800">{faNum('۲۰,۰۰۰,۰۰۰')} تومان</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">برنامه پرداخت</dt>
                  <dd className="font-bold text-[var(--brand-dark)]">۳ قسط ۳۰ روزه</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">کد خرید</dt>
                  <dd className="font-extrabold tracking-widest text-slate-800" dir="ltr">
                    {faNum('۴۸۲۱۹')}
                  </dd>
                </div>
              </dl>
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-[var(--brand-bg)] p-3 text-xs font-semibold text-[var(--brand-dark)]">
                <Percent className="size-4" aria-hidden />
                ماه اول بدون بهره — با پرداخت به‌موقع، سقف اعتبار شما افزایش می‌یابد.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-[var(--brand-bg)] py-8">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-[var(--brand-dark)]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-4" aria-hidden /> پرداخت امن با رمزگذاری کامل
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-4" aria-hidden /> پشتیبانی شبانه‌روزی
          </span>
          <span className="flex items-center gap-1.5">
            <Store className="size-4" aria-hidden /> شبکه گسترده پذیرندگان
          </span>
        </div>
      </section>
    </>
  );
}

function ShoppingBagIcon(props: { className?: string }) {
  return <Wallet {...props} />;
}
