'use client';

// صفحه خرید اقساطی — دسته‌بندی‌ها، فروشگاه‌ها، مراحل، طرح‌های اقساط
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  Car,
  Check,
  ShoppingBag,
  Smartphone,
  Sofa,
  Stethoscope,
  Timer,
  Wallet,
  FileCheck2,
  CreditCard,
} from 'lucide-react';
import { PageHero, Reveal, SectionHeading, StatCard } from '@/components/ui/common';
import { faNum } from '@/lib/format';

const categories = [
  { icon: Sofa, title: 'لوازم منزل و مبلمان', cap: 50 },
  { icon: Smartphone, title: 'موبایل و کالای دیجیتال', cap: 25 },
  { icon: Car, title: 'خودرو و لیزینگ', cap: 400 },
  { icon: Stethoscope, title: 'خدمات پزشکی و درمان', cap: 100 },
  { icon: ShoppingBag, title: 'پوشاک و مد', cap: 10 },
  { icon: CreditCard, title: 'کارت خرید اعتباری', cap: 100 },
];

const merchants = [
  { name: 'فروشگاه سرامیک پیشرو', category: 'مصالح ساختمانی' },
  { name: 'کلینیک امید', category: 'خدمات درمانی' },
  { name: 'نمایشگاه ایران‌خودرو آرین', category: 'خودرو' },
  { name: 'خانه مهر — لوازم خانگی', category: 'لوازم خانگی' },
  { name: 'دیجی‌مارکت مرکزی', category: 'کالای دیجیتال' },
  { name: 'مبلمان نیان', category: 'مبلمان و دکوراسیون' },
];

const steps = [
  { icon: ShoppingBag, title: 'انتخاب کالا', desc: 'از فروشگاه‌های طرف قرارداد، کالا یا خدمت موردنظر را انتخاب کنید.' },
  { icon: Wallet, title: 'درخواست اعتبار', desc: 'مبلغ و پیش‌پرداخت را تعیین کنید و درخواست خود را ثبت کنید.' },
  { icon: Timer, title: 'تأیید هوشمند', desc: 'اعتبارسنجی AI در ۵ دقیقه نتیجه را اعلام می‌کند.' },
  { icon: FileCheck2, title: 'امضا و تحویل', desc: 'قرارداد را دیجیتال امضا کنید و کالا را دریافت کنید.' },
];


export default function InstallmentsPage() {
  return (
    <>
      <PageHero
        badge="خرید اقساطی"
        title="خرید هوشمند، پرداخت راحت"
        subtitle="خرید کالا از فروشگاه‌های طرف قرارداد با اقساط منعطف تا ۳۶ ماهه — بدون ضامن، با تأیید آنی اعتبارسنجی هوشمند."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/applications/new" className="btn-primary px-6 py-3">
            شروع درخواست خرید
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <Link href="/lendtech/bnpl" className="btn-ghost px-6 py-3">
            خرید BNPL سریع‌تر
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="فروشگاه طرف قرارداد" value="۵۰۰+" hint="سراسر کشور" icon={ShoppingBag} />
          <StatCard label="حداکثر اقساط" value="۳۶ ماه" hint="بسته به طرح" icon={Timer} tone="blue" />
          <StatCard label="زمان تأیید" value="۵ دقیقه" hint="اعتبارسنجی AI" icon={BadgeCheck} tone="amber" />
          <StatCard label="حداقل پیش‌پرداخت" value="۱۰٪" hint="در طرح‌های ویژه" icon={Wallet} tone="slate" />
        </div>
      </section>

      {/* دسته‌بندی‌ها */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="چه چیزهایی می‌توانید بخرید؟" subtitle="از لوازم منزل تا خودرو — اقساطی بخرید و راحت پرداخت کنید" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <Link href="/applications/new" className="card group flex items-center gap-4 p-5 transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)] transition-transform group-hover:scale-110">
                    <c.icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-700">{c.title}</h3>
                    <p className="mt-1 text-xs font-bold text-[var(--brand-dark)]">تا {faNum(c.cap)} میلیون تومان</p>
                  </div>
                  <ArrowLeft className="mr-auto size-4 text-slate-300 transition-all group-hover:-translate-x-1 group-hover:text-[var(--brand)]" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* مراحل */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <SectionHeading title="مراحل خرید اقساطی" subtitle="۴ گام ساده تا تحویل کالا" />
          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute inset-x-10 top-8 hidden h-0.5 bg-gradient-to-l from-[var(--brand-light)] via-[var(--brand)] to-[var(--brand-light)] lg:block" aria-hidden />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card relative h-full p-6 text-center transition-shadow hover:shadow-card">
                  <span className="relative z-10 mx-auto grid size-16 place-items-center rounded-2xl text-white shadow-card" style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))' }}>
                    <s.icon className="size-7" aria-hidden />
                  </span>
                  <span className="mt-3 inline-block rounded-full bg-[var(--brand-bg)] px-2.5 py-0.5 text-[11px] font-extrabold text-[var(--brand-dark)]">
                    گام {faNum(i + 1)}
                  </span>
                  <h3 className="mt-2 text-base font-extrabold text-slate-800">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* فروشگاه‌ها */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="فروشگاه‌های منتخب" subtitle="نمونه‌ای از شبکه پذیرندگان پیشرو وام" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {merchants.map((m, i) => (
              <Reveal key={m.name} delay={i * 50}>
                <div className="card flex items-center gap-3 p-5 transition-shadow hover:shadow-card">
                  <span className="grid size-11 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                    <ShoppingBag className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-slate-700">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.category}</p>
                  </div>
                  <Check className="mr-auto size-5 text-[var(--brand)]" aria-label="طرف قرارداد" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <p className="text-sm text-slate-500">صاحب کسب‌وکار هستید و می‌خواهید به شبکه ما بپیوندید؟</p>
            <Link href="/merchants/register" className="btn-primary mt-4 px-6 py-3">
              ثبت‌نام به‌عنوان عامل
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
