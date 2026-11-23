'use client';

// لندینگ لندتک پیشرو — ۶ سرویس مالی، زیرساخت AI، مقایسه با بانک سنتی
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  Bot,
  BrainCircuit,
  CreditCard,
  Gauge,
  Lock,
  MonitorSmartphone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Timer,
  TrendingUp,
  Wallet,
  Activity,
  CircleDollarSign,
} from 'lucide-react';
import { PageHero, Reveal, SectionHeading, StatCard } from '@/components/ui/common';

const services = [
  {
    href: '/lendtech/credit-score',
    icon: Gauge,
    title: 'اعتبارسنجی هوش مصنوعی',
    desc: 'امتیازدهی آنی با تحلیل بیش از ۲۰۰ فاکتور توسط موتور AI پیشرو.',
    points: ['امتیاز آنی در ۳ ثانیه', 'تحلیل ۲۰۰+ فاکتور', 'به‌روزرسانی ماهانه'],
  },
  {
    href: '/lendtech/bnpl',
    icon: ShoppingBag,
    title: 'خرید بدون نقد (BNPL)',
    desc: 'خرید بدون نقد از فروشگاه‌های طرف قرارداد و پرداخت تا ۳ ماه بعد.',
    points: ['سقف خرید ۵۰ میلیون', 'بدون بهره ماه اول', 'تأیید لحظه‌ای'],
    popular: true,
  },
  {
    href: '/applications/new',
    icon: Wallet,
    title: 'وام خرد آنی',
    desc: 'وام‌های ۱ تا ۵۰ میلیون تومانی با تأیید ۵ دقیقه‌ای و بدون مراجعه حضوری.',
    points: ['بدون ضامن', 'تأیید ۵ دقیقه‌ای', 'واریز آنی'],
  },
  {
    href: '/lendtech/invest',
    icon: TrendingUp,
    title: 'سرمایه‌گذاری آنلاین',
    desc: 'با حداقل ۱ میلیون تومان شروع کنید و سود دوره‌ای دریافت کنید.',
    points: ['شروع از ۱ میلیون', 'گزارش ماهانه شفاف', 'برداشت آزاد'],
  },
  {
    href: '/lendtech/card',
    icon: CreditCard,
    title: 'کارت اعتباری دیجیتال',
    desc: 'کارت اعتباری مجازی با سقف ۱۰۰ میلیون و صدور ۷۲ ساعته.',
    points: ['سقف ۱۰۰ میلیون', 'تحویل ۷۲ ساعته', 'مدیریت کامل آنلاین'],
  },
  {
    href: '/installments',
    icon: MonitorSmartphone,
    title: 'لیزینگ خودرو',
    desc: 'خرید خودروهای داخلی و خارجی با پیش‌پرداخت ۳۰٪ و اقساط بلندمدت.',
    points: ['اقساط تا ۴۸ ماهه', 'پیش‌پرداخت ۳۰٪', 'تأیید آنی'],
  },
];

const aiFeatures = [
  { icon: BrainCircuit, title: 'تحلیل رفتاری', desc: 'بررسی ۶۰ ماه تاریخچه پرداخت و رفتار مالی برای پیش‌بینی دقیق ریسک.' },
  { icon: Bot, title: 'یادگیری ماشین', desc: 'مدل‌های ML که با میلیون‌ها داده هر ماه به‌روزرسانی می‌شوند.' },
  { icon: Activity, title: 'مانیتورینگ لحظه‌ای', desc: 'رصد شبانه‌روزی الگوهای غیرعادی و توقف خودکار تراکنش‌های مشکوک.' },
  { icon: Lock, title: 'امنیت بانکی', desc: 'رمزگذاری End-to-End با استاندارد بانکی و احراز هویت دومرحله‌ای.' },
];

const comparison = [
  { label: 'زمان تأیید وام', bank: '۷ تا ۳۰ روز کاری', us: 'کمتر از ۵ دقیقه' },
  { label: 'مراجعه حضوری', bank: 'لازم — چند بار', us: 'کاملاً آنلاین' },
  { label: 'نیاز به ضامن', bank: '۱ تا ۲ ضامن', us: 'بدون ضامن' },
  { label: 'اعتبارسنجی', bank: 'دستی و ناقص', us: 'هوش مصنوعی + ۲۰۰ فاکتور' },
  { label: 'مدارک مورد نیاز', bank: 'گواهی اشتغال، فیش حقوقی، سند', us: 'فقط کارت ملی' },
  { label: 'پیگیری وضعیت', bank: 'تماس مکرر با شعبه', us: 'داشبورد آنلاین لحظه‌ای' },
];

export default function LendTechPage() {
  return (
    <>
      <PageHero
        badge="فناوری وام‌دهی نسل جدید — LendTech"
        title="لندتک پیشرو؛ وام هوشمند در ۵ دقیقه"
        subtitle="با موتور اعتبارسنجی مبتنی بر هوش مصنوعی پیشرو، وام بگیرید، سرمایه‌گذاری کنید و خرید اقساطی انجام دهید — همه در یک پلتفرم یکپارچه."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/auth" className="btn-primary px-6 py-3">
            دریافت وام آنلاین
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <Link href="/lendtech/credit-score" className="btn-ghost px-6 py-3">
            بررسی امتیاز اعتباری
          </Link>
        </div>
      </PageHero>

      {/* آمار عملکرد */}
      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="سرعت تأیید وام" value="۵ دقیقه" hint="میانگین از ثبت تا نتیجه" icon={Timer} />
          <StatCard label="دقت تشخیص تقلب" value="۹۹٪" hint="با مدل‌های یادگیری ماشین" icon={ShieldCheck} tone="blue" />
          <StatCard label="رضایت کاربران" value="۹۶٪" hint="بر اساس نظرسنجی سالانه" icon={BadgeCheck} tone="amber" />
          <StatCard label="سرویس‌های فعال" value="۶ سرویس" hint="یک پلتفرم، همه نیازها" icon={Sparkles} tone="slate" />
        </div>
      </section>

      {/* خدمات لندتک */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="خدمات لندتک پیشرو" subtitle="شش سرویس مالی پیشرفته — از اعتبارسنجی AI تا سرمایه‌گذاری آنلاین؛ هر آنچه برای مدیریت مالی هوشمند نیاز دارید." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className={`card group relative flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${s.popular ? 'border-2 border-[var(--brand)]' : ''}`}>
                  {s.popular && (
                    <span className="absolute -top-3 right-5 badge-soft bg-amber-100 text-amber-700">محبوب‌ترین</span>
                  )}
                  <span className="grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)] transition-transform group-hover:scale-110">
                    <s.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-slate-800">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{s.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <BadgeCheck className="size-3.5 text-[var(--brand)]" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[var(--brand-dark)]">
                    شروع کنید
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* زیرساخت هوش مصنوعی */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                <Sparkles className="size-3.5" aria-hidden />
                زیرساخت فناوری
              </span>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-800 sm:text-3xl">
                موتور AI پیشرو؛ قدرتمندترین اعتبارسنجی بازار
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                تصمیمات مالی باید سریع، دقیق و منصفانه باشند. موتور اعتبارسنجی پیشرو با ترکیب تحلیل رفتاری، یادگیری ماشین و
                مانیتورینگ لحظه‌ای، ریسک هر پرونده را در چند ثانیه برآورد می‌کند — همان کاری که در بانک‌های سنتی هفته‌ها طول
                می‌کشد.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {aiFeatures.map((f) => (
                  <div key={f.title} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                    <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <f.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-3 text-sm font-extrabold text-slate-700">{f.title}</h3>
                    <p className="mt-1.5 text-xs leading-6 text-slate-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* مقایسه با بانک سنتی */}
            <Reveal delay={120}>
              <div className="card overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50/60 p-5">
                  <h3 className="text-base font-extrabold text-slate-800">ما در مقابل بانک سنتی</h3>
                  <p className="mt-1 text-xs text-slate-400">تفاوت آشکار است</p>
                </div>
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>معیار</th>
                      <th>بانک سنتی</th>
                      <th>لندتک پیشرو</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row) => (
                      <tr key={row.label}>
                        <td className="font-semibold text-slate-700">{row.label}</td>
                        <td className="text-slate-500">{row.bank}</td>
                        <td className="font-bold text-[var(--brand-dark)]">
                          <span className="flex items-center gap-1">
                            <BadgeCheck className="size-4 shrink-0 text-[var(--brand)]" aria-hidden />
                            {row.us}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* مقاصد مالی */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="برای چه نیازهایی؟" subtitle="لندتک پیشرو برای هر هدف مالی" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShoppingBag, title: 'خرید لوازم منزل', cap: 'تا ۵۰ میلیون تومان' },
              { icon: CircleDollarSign, title: 'هزینه‌های پزشکی', cap: 'تا ۱۰۰ میلیون تومان' },
              { icon: TrendingUp, title: 'سرمایه در گردش کسب‌وکار', cap: 'تا ۵۰۰ میلیون تومان' },
              { icon: Wallet, title: 'خرید دفتر یا ملک', cap: 'تا ۲ میلیارد تومان' },
            ].map((g, i) => (
              <Reveal key={g.title} delay={i * 60}>
                <div className="card p-6 text-center transition-shadow hover:shadow-card">
                  <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                    <g.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-sm font-extrabold text-slate-700">{g.title}</h3>
                  <p className="mt-1 text-xs font-bold text-[var(--brand-dark)]">{g.cap}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link href="/applications/new" className="btn-primary px-7 py-3 text-base">
              همین حالا شروع کنید
              <ArrowLeft className="size-4.5" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
