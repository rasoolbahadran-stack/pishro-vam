'use client';

// فرم ثبت درخواست وام — ۴ مرحله: نوع → مبلغ و اقساط → مدارک → امضای قرارداد
import type { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Car,
  Check,
  CircleCheck,
  CreditCard,
  FileCheck2,
  FileUp,
  Landmark,
  PartyPopper,
  PenLine,
  ShoppingBag,
  Stethoscope,
  Upload,
  Wallet,
} from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { faMoney, faNum, loanCalc, parseFaDigits } from '@/lib/format';
import { useSite } from '@/lib/store';

const types = [
  { id: 'installment', title: 'خرید از فروشگاه‌های طرف قرارداد', icon: ShoppingBag, max: 400_000_000, desc: 'لوازم منزل، کالای دیجیتال و…' },
  { id: 'cash', title: 'وام نقدی بدون ضامن', icon: Wallet, max: 200_000_000, desc: 'واریز مستقیم به حساب شما' },
  { id: 'medical', title: 'هزینه‌های درمانی اقساطی', icon: Stethoscope, max: 100_000_000, desc: 'عمل، دندانپزشکی و…' },
  { id: 'auto', title: 'خرید اقساطی خودرو', icon: Car, max: 400_000_000, desc: 'لیزینگ داخلی و خارجی' },
  { id: 'card', title: 'کارت خرید اعتباری', icon: CreditCard, max: 100_000_000, desc: 'ویژه کارکنان سازمان‌ها' },
];

const docs = [
  { id: 'nid-front', label: 'کارت ملی (رو)' },
  { id: 'nid-back', label: 'کارت ملی (پشت)' },
  { id: 'invoice', label: 'فاکتور خرید' },
  { id: 'checks', label: 'سند درآمدی / فیش حقوقی' },
];

export default function NewApplicationPage() {
  const router = useRouter();
  const { applications, setApplications } = useSite();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [amount, setAmount] = useState(50_000_000);
  const [down, setDown] = useState(0);
  const [months, setMonths] = useState(12);
  const rate = 20;
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [docError, setDocError] = useState('');
  const [signed, setSigned] = useState(false);
  const [tracking, setTracking] = useState<string | null>(null);

  const selected = types.find((t) => t.id === type);
  const calc = useMemo(() => loanCalc(amount, months, rate, down), [amount, months, down]);

  const stepsMeta = [
    { n: 1, label: 'نوع درخواست' },
    { n: 2, label: 'مبلغ و اقساط' },
    { n: 3, label: 'بارگذاری مدارک' },
    { n: 4, label: 'امضای قرارداد' },
  ];

  const maxMonths = selected?.id === 'auto' ? 48 : 36;

  const upload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploaded((prev) => ({ ...prev, [id]: true }));
  };

  const submit = () => {
    const code = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const app = {
      id: code.toLowerCase(),
      trackingCode: code,
      type: selected?.title || 'وام نقدی',
      amount,
      months,
      rate,
      monthlyPayment: Math.round(calc.monthly),
      downPayment: down,
      status: 'pending' as const,
      createdAt: '۱۴۰۳/۰۸/۲۳',
    };
    setApplications([app, ...applications]);
    setTracking(code);
    setStep(5);
  };

  const contractId = useMemo(() => {
    let h = 0;
    const s = `${amount}-${months}-${down}`;
    for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % 4294967296;
    return h.toString(16).toUpperCase();
  }, [amount, months, down]);

  return (
    <div className="container-x section-pad max-w-4xl">
      <Reveal>
        <h1 className="text-2xl font-extrabold text-slate-800">ثبت درخواست وام</h1>
        <p className="mt-2 text-sm text-slate-500">در چند مرحله ساده درخواست خود را ثبت کنید — همه‌چیز آنلاین انجام می‌شود.</p>
      </Reveal>

      {/* نوار مراحل */}
      <Reveal className="mt-6">
        <ol className="flex items-center gap-1 sm:gap-2" aria-label="مراحل ثبت درخواست">
          {stepsMeta.map((s, i) => (
            <li key={s.n} className="flex flex-1 items-center gap-1">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-colors ${
                  step > s.n
                    ? 'bg-[var(--brand)] text-white'
                    : step === s.n
                      ? 'bg-[var(--brand-bg)] text-[var(--brand-dark)] ring-2 ring-[var(--brand)]'
                      : 'bg-slate-100 text-slate-400'
                }`}
                aria-current={step === s.n ? 'step' : undefined}
              >
                {step > s.n ? <Check className="size-4" aria-hidden /> : faNum(s.n)}
              </span>
              <span className={`hidden text-xs font-bold sm:block ${step === s.n ? 'text-[var(--brand-dark)]' : 'text-slate-400'}`}>
                {s.label}
              </span>
              {i < stepsMeta.length - 1 && <span className="h-0.5 flex-1 rounded bg-slate-100" aria-hidden />}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-8">
        <div className="card p-6 sm:p-8">
          {/* مرحله ۱ */}
          {step === 1 && (
            <>
              <h2 className="text-lg font-extrabold text-slate-800">نوع درخواست را انتخاب کنید</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {types.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-right transition-all ${
                      type === t.id ? 'border-[var(--brand)] bg-[var(--brand-bg)]' : 'border-slate-200 hover:border-slate-300'
                    }`}
                    aria-pressed={type === t.id}
                  >
                    <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${type === t.id ? 'bg-[var(--brand)] text-white' : 'bg-[var(--brand-bg)] text-[var(--brand-dark)]'}`}>
                      <t.icon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm font-extrabold text-slate-700">{t.title}</span>
                      <span className="block text-xs text-slate-400">{t.desc}</span>
                      <span className="mt-1 block text-xs font-bold text-[var(--brand-dark)]">تا {faMoney(t.max)} تومان</span>
                    </span>
                  </button>
                ))}
              </div>
              <button type="button" disabled={!type} onClick={() => { setAmount(Math.min(amount, selected?.max || amount)); setStep(2); }} className="btn-primary mt-6 px-6">
                مرحله بعد
                <ArrowLeft className="size-4" aria-hidden />
              </button>
            </>
          )}

          {/* مرحله ۲ */}
          {step === 2 && selected && (
            <>
              <h2 className="text-lg font-extrabold text-slate-800">مبلغ و شرایط پرداخت</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="app-amount" className="field-label">مبلغ کل (تومان)</label>
                    <span className="text-xs font-extrabold text-[var(--brand-dark)]">حداکثر {faMoney(selected.max)}</span>
                  </div>
                  <input
                    id="app-amount"
                    type="range"
                    min={5_000_000}
                    max={selected.max}
                    step={5_000_000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-2 w-full accent-[var(--brand)]"
                  />
                  <p className="mt-1 text-sm font-extrabold text-slate-700">{faMoney(amount)} تومان</p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="app-down" className="field-label">پیش‌پرداخت (تومان)</label>
                    <span className="text-xs font-extrabold text-[var(--brand-dark)]">{faMoney(down)}</span>
                  </div>
                  <input
                    id="app-down"
                    type="range"
                    min={0}
                    max={Math.floor(amount / 2 / 1_000_000) * 1_000_000}
                    step={1_000_000}
                    value={down}
                    onChange={(e) => setDown(Number(e.target.value))}
                    className="mt-2 w-full accent-[var(--brand)]"
                    disabled={selected.id === 'cash'}
                  />
                  <p className="mt-1 text-sm font-extrabold text-slate-700">{down === 0 ? 'بدون پیش‌پرداخت' : `${faMoney(down)} تومان`}</p>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="app-months" className="field-label">تعداد اقساط</label>
                    <span className="text-xs font-extrabold text-[var(--brand-dark)]">حداکثر {faNum(maxMonths)}</span>
                  </div>
                  <input
                    id="app-months"
                    type="range"
                    min={3}
                    max={maxMonths}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="mt-2 w-full accent-[var(--brand)]"
                  />
                  <p className="mt-1 text-sm font-extrabold text-slate-700">{faNum(months)} ماه — سود {faNum(rate)}٪ سالانه</p>
                </div>
              </div>

              {/* خلاصه محاسبه */}
              <div className="mt-6 grid gap-3 rounded-2xl bg-[var(--brand-bg)] p-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-medium text-slate-500">مبلغ هر قسط</p>
                  <p className="mt-1 text-lg font-extrabold text-[var(--brand-dark)]">{faMoney(calc.monthly)} ت</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">کل پرداخت</p>
                  <p className="mt-1 text-lg font-extrabold text-slate-800">{faMoney(calc.total)} ت</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">مجموع سود</p>
                  <p className="mt-1 text-lg font-extrabold text-amber-600">{faMoney(calc.totalProfit)} ت</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-ghost px-5">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت
                </button>
                <button type="button" onClick={() => setStep(3)} className="btn-primary px-6">
                  مرحله بعد
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
              </div>
            </>
          )}

          {/* مرحله ۳ */}
          {step === 3 && (
            <>
              <h2 className="text-lg font-extrabold text-slate-800">بارگذاری مدارک</h2>
              <p className="mt-2 text-sm text-slate-500">در نسخه نمایشی، انتخاب فایل کافی است — مدارک آپلود نمی‌شوند.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {docs.map((d) => (
                  <div key={d.id} className={`flex items-center gap-3 rounded-2xl border p-4 ${uploaded[d.id] ? 'border-[var(--brand)] bg-[var(--brand-bg)]' : 'border-slate-200'}`}>
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${uploaded[d.id] ? 'bg-[var(--brand)] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {uploaded[d.id] ? <Check className="size-5" aria-hidden /> : <FileUp className="size-5" aria-hidden />}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-extrabold text-slate-700">{d.label}</p>
                      <p className="text-xs text-slate-400">{uploaded[d.id] ? 'بارگذاری شد' : 'آپلود نشده'}</p>
                    </div>
                    <label className="btn-soft cursor-pointer px-3 py-2 text-xs">
                      <Upload className="size-3.5" aria-hidden />
                      انتخاب فایل
                      <input type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => upload(d.id, e)} aria-label={d.label} />
                    </label>
                  </div>
                ))}
              </div>
              {docError && <p className="mt-3 text-xs font-semibold text-red-500">{docError}</p>}
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-ghost px-5">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (Object.keys(uploaded).length < 2) {
                      setDocError('حداقل دو مدرک را بارگذاری کنید');
                      return;
                    }
                    setDocError('');
                    setStep(4);
                  }}
                  className="btn-primary px-6"
                >
                  مرحله بعد
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
              </div>
            </>
          )}

          {/* مرحله ۴ */}
          {step === 4 && (
            <>
              <h2 className="text-lg font-extrabold text-slate-800">امضای قرارداد</h2>
              <div className="mt-5 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-sm leading-7 text-slate-600">
                <p className="font-extrabold text-slate-800">قرارداد خدمات مالی پیشرو وام</p>
                <p className="mt-3">
                  این قرارداد میان شرکت پیشرو وام (زیرمجموعه هلدینگ بین‌المللی پیشرو سرامیک) و مشتری منعقد می‌شود. مشتری درخواست
                  «{selected?.title}» به مبلغ {faMoney(amount)} تومان با {faNum(months)} قسط ماهانه و نرخ سود {faNum(rate)}٪ سالانه ثبت کرده است.
                </p>
                <p className="mt-3">
                  مبلغ هر قسط {faMoney(calc.monthly)} تومان است و مشتری متعهد می‌شود اقساط را در سررسیدهای تعیین‌شده پرداخت کند. پیشرو وام
                  متعهد می‌شود پس از تأیید مدارک و امضای قرارداد، مبلغ تسهیلات را در کمتر از ۷۲ ساعت کاری پرداخت نماید.
                </p>
                <p className="mt-3">
                  هرگونه اختلاف از طریق داوری مرکز داوری اتاق بازرگانی ایران حل‌وفصل خواهد شد. هش قرارداد: SHA256-{contractId}
                </p>
              </div>
              <label className="mt-4 flex items-start gap-2 text-sm leading-7 text-slate-600">
                <input type="checkbox" checked={signed} onChange={(e) => setSigned(e.target.checked)} className="mt-1.5 accent-[var(--brand)]" />
                متن قرارداد را مطالعه کردم و امضای دیجیتال خود را تأیید می‌کنم.
              </label>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(3)} className="btn-ghost px-5">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت
                </button>
                <button type="button" disabled={!signed} onClick={submit} className="btn-primary px-6">
                  <PenLine className="size-4" aria-hidden />
                  امضا و ثبت نهایی
                </button>
              </div>
            </>
          )}

          {/* موفقیت */}
          {step === 5 && tracking && (
            <div className="py-6 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                <PartyPopper className="size-8" aria-hidden />
              </span>
              <h2 className="mt-4 text-xl font-extrabold text-slate-800">درخواست ثبت شد!</h2>
              <p className="mt-2 text-sm text-slate-500">درخواست شما با موفقیت ثبت گردید و در حال بررسی است.</p>
              <div className="mx-auto mt-5 max-w-sm rounded-2xl border-2 border-dashed border-[var(--brand)] bg-[var(--brand-bg)] p-5">
                <p className="text-xs font-medium text-slate-500">کد پیگیری</p>
                <p className="mt-1 font-mono text-2xl font-extrabold tracking-widest text-[var(--brand-dark)]" dir="ltr">
                  {tracking}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/dashboard" className="btn-primary px-6 py-3">
                  <CircleCheck className="size-4" aria-hidden />
                  رفتن به داشبورد
                </Link>
                <Link href="/applications" className="btn-ghost px-6 py-3">
                  مشاهده درخواست‌ها
                </Link>
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <BadgeCheck className="size-3.5 text-[var(--brand)]" aria-hidden />
                درگاه پرداخت (آزمایشی): پرداخت موفق شبیه‌سازی شده است
              </p>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5"><Landmark className="size-4 text-[var(--brand)]" aria-hidden /> مجوز رسمی بانک مرکزی</span>
          <span className="flex items-center gap-1.5"><FileCheck2 className="size-4 text-[var(--brand)]" aria-hidden /> قرارداد با هش SHA256</span>
          <span className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-[var(--brand)]" aria-hidden /> تأیید در ۵ دقیقه</span>
        </div>
      </Reveal>
    </div>
  );
}
