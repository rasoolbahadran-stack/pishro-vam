'use client';

// صفحه کارت اعتباری — طرح‌ها، درخواست کارت، کارت مجازی تعاملی، تراکنش‌ها با فیلتر و CSV
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  Globe2,
  Lock,
  ShieldCheck,
  Sparkles,
  Wifi,
  ChevronDown,
} from 'lucide-react';
import { PageHero, Reveal, SectionHeading, StatCard } from '@/components/ui/common';
import { Modal } from '@/components/ui/Modal';
import { faMoney, faNum } from '@/lib/format';
import { useSite } from '@/lib/store';

const cardPlans = [
  { id: 'silver', name: 'نقره‌ای', cap: 30, cashback: '۰.۵٪ کش‌بک', fee: 'بدون کارمزد سالانه', color: '#64748b' },
  { id: 'gold', name: 'طلایی', cap: 60, cashback: '۱.۵٪ کش‌بک', fee: 'کارمزد سالانه: ۹۹۰ هزار تومان', color: '#d97706', popular: true },
  { id: 'platinum', name: 'پلاتینیوم', cap: 100, cashback: '۲.۵٪ کش‌بک', fee: 'کارمزد سالانه: ۱٬۹۹۰ هزار تومان', color: '#7c3aed' },
];

const transactionsSeed = [
  { id: 'tx1', title: 'خرید آنلاین — فروشگاه الکترونیک پیشرو', category: 'الکترونیک', amount: -4_200_000, date: '۱۴۰۳/۰۸/۲۵', status: 'موفق' },
  { id: 'tx2', title: 'خرید آنلاین — دیجی‌مارکت', category: 'الکترونیک', amount: -1_850_000, date: '۱۴۰۳/۰۸/۲۴', status: 'موفق' },
  { id: 'tx3', title: 'بازپرداخت قسط', category: 'مالی', amount: 3_875_000, date: '۱۴۰۳/۰۸/۲۳', status: 'موفق' },
  { id: 'tx4', title: 'سوپرمارکت شهروند', category: 'خواربار', amount: -620_000, date: '۱۴۰۳/۰۸/۲۲', status: 'موفق' },
  { id: 'tx5', title: 'اپ‌استور — اشتراک نرم‌افزار', category: 'نرم‌افزار', amount: -380_000, date: '۱۴۰۳/۰۸/۲۱', status: 'موفق' },
  { id: 'tx6', title: 'پمپ‌بنزین آزادی', category: 'حمل‌ونقل', amount: -450_000, date: '۱۴۰۳/۰۸/۲۰', status: 'موفق' },
  { id: 'tx7', title: 'کافه نادری', category: 'پذیرایی', amount: -210_000, date: '۱۴۰۳/۰۸/۲۰', status: 'موفق' },
  { id: 'tx8', title: 'پرداخت قبض برق', category: 'قبوض', amount: -540_000, date: '۱۴۰۳/۰۸/۱۹', status: 'در انتظار' },
];

const controlsSeed = [
  { id: 'c1', label: 'خرید اینترنتی', on: true },
  { id: 'c2', label: 'پرداخت بین‌المللی', on: false },
  { id: 'c3', label: 'استفاده خارج از کشور', on: false },
  { id: 'c4', label: 'پرداخت بی‌سیم (NFC)', on: true },
  { id: 'c5', label: 'تراکنش‌های تماسی', on: true },
];


export default function CardPage() {
  const { media } = useSite();
  const [requestOpen, setRequestOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [controls, setControls] = useState(controlsSeed);
  const [locked, setLocked] = useState(false);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [status, setStatus] = useState('all');
  const fileRef = useRef<HTMLInputElement>(null);

  const transactions = useMemo(() => {
    const q = query.trim();
    return transactionsSeed.filter(
      (t) =>
        (!q || t.title.includes(q)) &&
        (cat === 'all' || t.category === cat) &&
        (status === 'all' || t.status === status)
    );
  }, [query, cat, status]);

  const categories = ['all', ...new Set(transactionsSeed.map((t) => t.category))];
  const totalSpend = transactionsSeed.filter((t) => t.amount < 0).reduce((a, t) => a + Math.abs(t.amount), 0);

  const exportCsv = () => {
    const rows = [['عنوان', 'دسته‌بندی', 'مبلغ (تومان)', 'تاریخ', 'وضعیت']];
    transactions.forEach((t) => rows.push([t.title, t.category, String(t.amount), t.date, t.status]));
    const csv = '\uFEFF' + rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleControl = (id: string) => setControls((prev) => prev.map((c) => (c.id === id ? { ...c, on: !c.on } : c)));

  const copyNumber = () => {
    navigator.clipboard?.writeText('6037 9975 1234 5678').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <PageHero
        badge="کارت اعتباری دیجیتال"
        title="کارت اعتباری پیشرو؛ اعتبار همیشه همراه"
        subtitle="مدیریت کارت، تراکنش‌ها و اعتبار — همه در یک جا. صدور آنلاین در ۷۲ ساعت کاری و استفاده فوری از کارت مجازی."
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary px-6 py-3" onClick={() => setRequestOpen(true)}>
            درخواست کارت
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <Link href="/lendtech/credit-score" className="btn-ghost px-6 py-3">
            بررسی واجد شرایط بودن
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="اعتبار کارت" value="۶۰ میلیون تومان" hint="طرح طلایی" icon={CreditCard} />
          <StatCard label="مصرف این ماه" value={`${faMoney(totalSpend / 1_000_000)} میلیون`} hint={`${faNum(transactionsSeed.length)} تراکنش`} icon={Download} tone="amber" />
          <StatCard label="تراکنش‌های موفق" value={faNum(transactionsSeed.filter((t) => t.status === 'موفق').length)} hint="در ۳۰ روز گذشته" icon={BadgeCheck} tone="blue" />
          <StatCard label="پذیرش سراسری" value="۱۰۰٪" hint="همه پایانه‌های شتاب" icon={Globe2} tone="slate" />
        </div>
      </section>

      {/* کارت مجازی */}
      <section className="section-pad bg-white">
        <div className="container-x grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading center={false} title="کارت مجازی شما" subtitle="برای مشاهده اطلاعات حساس، کارت را بچرخانید یا گزینه نمایش را بزنید." />
            <div className="mt-6 [perspective:1200px]">
              <div
                className={`relative mx-auto aspect-[8/5] w-full max-w-md transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}
              >
                {/* روی کارت */}
                <div
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl p-6 text-white shadow-lift [backface-visibility:hidden]"
                  style={{
                    background: locked
                      ? 'linear-gradient(135deg, #475569, #1e293b)'
                      : 'linear-gradient(135deg, var(--brand), var(--brand-dark))',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold">پیشرو وام</span>
                    <Wifi className="size-5 rotate-90" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[11px] text-white/70">شماره کارت</p>
                    <p className="mt-1 font-mono text-xl tracking-widest" dir="ltr">
                      {revealed ? '۶۰۳۷ ۹۹۷۵ ۱۲۳۴ ۵۶۷۸' : '•••• •••• •••• ۵۶۷۸'}
                    </p>
                  </div>
                  <div className="flex items-end justify-between text-xs">
                    <span>
                      <span className="block text-white/70">دارنده کارت</span>
                      <span className="font-bold">ALI MOHAMMADI</span>
                    </span>
                    <span>
                      <span className="block text-white/70">انقضا</span>
                      <span className="font-bold" dir="ltr">۰۵/۰۷</span>
                    </span>
                  </div>
                  {locked && (
                    <span className="absolute inset-0 grid place-items-center bg-slate-900/40 text-sm font-extrabold">
                      <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-red-600">
                        <Lock className="size-4" aria-hidden /> کارت قفل است
                      </span>
                    </span>
                  )}
                </div>
                {/* پشت کارت */}
                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-3xl p-6 text-white shadow-lift [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
                >
                  <div className="h-11 w-full rounded-lg bg-slate-200/80" />
                  <div className="flex items-center justify-between rounded-xl bg-white/10 p-3">
                    <span className="text-xs text-white/70">CVV</span>
                    <span className="font-mono font-bold tracking-widest">{revealed ? '۱۲۳' : '•••'}</span>
                  </div>
                  <p className="text-[11px] leading-5 text-white/60">
                    برای امنیت بیشتر، CVV را با کسی به اشتراک نگذارید.
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-5 flex max-w-md flex-wrap gap-2">
              <button type="button" className="btn-soft flex-1" onClick={() => setFlipped((v) => !v)}>
                {flipped ? 'نمایش روی کارت' : 'نمایش پشت کارت'}
              </button>
              <button type="button" className="btn-ghost flex-1" onClick={() => setRevealed((v) => !v)}>
                {revealed ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
                {revealed ? 'مخفی‌کردن' : 'نمایش شماره'}
              </button>
              <button type="button" className="btn-ghost flex-1" onClick={copyNumber}>
                {copied ? 'کپی شد!' : 'کپی شماره'}
              </button>
            </div>
          </Reveal>

          {/* کنترل‌های کارت */}
          <Reveal delay={120}>
            <div className="card p-6">
              <h3 className="text-base font-extrabold text-slate-800">کنترل‌های کارت</h3>
              <p className="mt-1 text-xs text-slate-400">سرویس‌های کارت را لحظه‌ای فعال یا غیرفعال کنید</p>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-red-50 p-4">
                <div>
                  <p className="text-sm font-extrabold text-red-600">{locked ? 'کارت قفل است' : 'قفل اضطراری کارت'}</p>
                  <p className="text-xs text-red-400">{locked ? 'برای بازگشت به حالت عادی، قفل را بردارید' : 'در صورت مفقودی، فوراً کارت را قفل کنید'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLocked((v) => !v)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${locked ? 'bg-red-500' : 'bg-slate-300'}`}
                  role="switch"
                  aria-checked={locked}
                  aria-label="قفل کارت"
                >
                  <span className={`absolute top-1 size-5 rounded-full bg-white shadow transition-all ${locked ? 'right-1' : 'right-6'}`} />
                </button>
              </div>
              <ul className="mt-4 divide-y divide-slate-100">
                {controls.map((c) => (
                  <li key={c.id} className="flex items-center justify-between py-3">
                    <span className="text-sm font-semibold text-slate-600">{c.label}</span>
                    <button
                      type="button"
                      onClick={() => toggleControl(c.id)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${c.on ? 'bg-[var(--brand)]' : 'bg-slate-300'}`}
                      role="switch"
                      aria-checked={c.on}
                      aria-label={c.label}
                    >
                      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${c.on ? 'right-0.5' : 'right-5.5'}`} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-700">
                هشدار سقف اعتبار: هنگام رسیدن مصرف به ۸۰٪، اعلان دریافت می‌کنید.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* تراکنش‌ها */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="تراکنش‌های کارت" subtitle="جستجو و فیلتر تراکنش‌ها و دریافت خروجی CSV" />
          <Reveal className="mt-8">
            <div className="card overflow-hidden">
              <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-3">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجو در تراکنش‌ها…"
                  className="field-input"
                  aria-label="جستجوی تراکنش"
                />
                <div className="relative">
                  <select value={cat} onChange={(e) => setCat(e.target.value)} className="field-input appearance-none pl-9" aria-label="دسته‌بندی">
                    <option value="all">همه دسته‌ها</option>
                    {categories.filter((c) => c !== 'all').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                </div>
                <div className="relative">
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="field-input appearance-none pl-9" aria-label="وضعیت">
                    <option value="all">همه وضعیت‌ها</option>
                    <option value="موفق">موفق</option>
                    <option value="در انتظار">در انتظار</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>عنوان</th>
                      <th>دسته‌بندی</th>
                      <th>مبلغ</th>
                      <th>تاریخ</th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="transition-colors hover:bg-slate-50/60">
                        <td className="font-semibold text-slate-700">{t.title}</td>
                        <td className="text-slate-400">{t.category}</td>
                        <td className={`font-extrabold ${t.amount < 0 ? 'text-red-500' : 'text-emerald-600'}`} dir="ltr">
                          {faMoney(Math.abs(t.amount))} {t.amount < 0 ? '−' : '+'} ت
                        </td>
                        <td className="text-slate-400">{t.date}</td>
                        <td>
                          <span className={`badge-soft ${t.status === 'موفق' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-sm text-slate-400">تراکنشی یافت نشد</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <p className="text-xs text-slate-400">{faNum(transactions.length)} تراکنش نمایش داده می‌شود</p>
                <button type="button" className="btn-ghost py-2" onClick={exportCsv}>
                  <Download className="size-4" aria-hidden />
                  خروجی CSV
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* طرح‌های کارت */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <SectionHeading title="طرح‌های کارت اعتباری" subtitle="طرح مناسب را انتخاب کنید و درخواست خود را ثبت کنید" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {cardPlans.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <div className={`card flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lift ${p.popular ? 'border-2 border-[var(--brand)]' : ''}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold text-slate-800">{p.name}</h3>
                    <span className="size-9 rounded-xl" style={{ background: p.color }} aria-hidden />
                  </div>
                  <p className="mt-4 text-2xl font-extrabold text-[var(--brand-dark)]">{faNum(p.cap)} میلیون</p>
                  <p className="text-xs text-slate-400">سقف اعتبار</p>
                  <ul className="mt-4 flex-1 space-y-2.5 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><Check className="size-4 text-[var(--brand)]" aria-hidden />{p.cashback}</li>
                    <li className="flex items-center gap-2"><Check className="size-4 text-[var(--brand)]" aria-hidden />{p.fee}</li>
                    <li className="flex items-center gap-2"><Check className="size-4 text-[var(--brand)]" aria-hidden />پذیرش سراسری و آنلاین</li>
                    {p.id === 'gold' && <li className="flex items-center gap-2"><Check className="size-4 text-[var(--brand)]" aria-hidden />بیمه خرید</li>}
                    {p.id === 'platinum' && (
                      <>
                        <li className="flex items-center gap-2"><Check className="size-4 text-[var(--brand)]" aria-hidden />دسترسی لانژ فرودگاه</li>
                        <li className="flex items-center gap-2"><Check className="size-4 text-[var(--brand)]" aria-hidden />مشاور مالی اختصاصی</li>
                      </>
                    )}
                  </ul>
                  <button type="button" onClick={() => setRequestOpen(true)} className={`mt-6 w-full ${p.popular ? 'btn-primary' : 'btn-ghost'}`}>
                    درخواست این طرح
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* مودال درخواست کارت */}
      <Modal open={requestOpen} onClose={() => setRequestOpen(false)} title="درخواست کارت اعتباری" size="md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setRequestOpen(false);
            alert('درخواست کارت اعتباری شما ثبت شد. پس از بررسی مدارک، نتیجه طی ۷۲ ساعت کاری از طریق پیامک اعلام می‌شود. (نسخه نمایشی)');
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="card-name" className="field-label">نام و نام خانوادگی *</label>
              <input id="card-name" required className="field-input" placeholder="مثال: علی محمدی" />
            </div>
            <div>
              <label htmlFor="card-mobile" className="field-label">شماره موبایل *</label>
              <input id="card-mobile" required inputMode="tel" className="field-input" placeholder="۰۹۱۲…" dir="ltr" />
            </div>
            <div>
              <label htmlFor="card-income" className="field-label">درآمد ماهانه (تومان)</label>
              <input id="card-income" className="field-input" placeholder="۱۵٬۰۰۰٬۰۰۰" inputMode="numeric" />
            </div>
            <div>
              <label htmlFor="card-job" className="field-label">نوع اشتغال</label>
              <select id="card-job" className="field-input">
                <option>کارمند</option>
                <option>خوداشتغال</option>
                <option>کارمند دولت</option>
                <option>صاحب کسب‌وکار</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="card-plan" className="field-label">طرح کارت</label>
            <select id="card-plan" className="field-input">
              {cardPlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — سقف {faNum(p.cap)} میلیون ({p.cashback})
                </option>
              ))}
            </select>
          </div>
          <p className="rounded-xl bg-[var(--brand-bg)] p-3 text-xs leading-6 text-[var(--brand-dark)]">
            سقف اعتبار بر اساس درآمد و امتیاز اعتباری شما توسط هوش مصنوعی محاسبه می‌شود.
          </p>
          <label className="flex items-start gap-2 text-xs leading-6 text-slate-500">
            <input type="checkbox" required className="mt-1 accent-[var(--brand)]" />
            شرایط و قوانین استفاده از کارت اعتباری پیشرو وام را مطالعه کرده و می‌پذیرم.
          </label>
          <button type="submit" className="btn-primary w-full py-3">
            <Sparkles className="size-4" aria-hidden />
            تأیید و ارسال درخواست
          </button>
        </form>
      </Modal>

      <section className="border-t border-slate-100 bg-[var(--brand-bg)] py-8">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-[var(--brand-dark)]">
          <span className="flex items-center gap-1.5"><ShieldCheck className="size-4" aria-hidden /> رمزگذاری ۲۵۶-bit</span>
          <span className="flex items-center gap-1.5"><BadgeCheck className="size-4" aria-hidden /> مجوز رسمی بانک مرکزی</span>
          <span className="flex items-center gap-1.5"><Lock className="size-4" aria-hidden /> قفل و بازگشایی آنی کارت</span>
        </div>
      </section>
    </>
  );
}
