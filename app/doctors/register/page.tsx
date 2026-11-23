'use client';

// ثبت‌نام پزشک / کلینیک — ۳ مرحله: اطلاعات پزشک → مطب و تخصص → قرارداد
import type { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Check, PartyPopper, PenLine, ShieldCheck, Upload } from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { faNum, digitsOnly } from '@/lib/format';

const specialties = [
  'دندانپزشکی', 'قلب و عروق', 'ارتوپدی', 'چشم‌پزشکی', 'زنان و زایمان', 'اطفال', 'پوست و مو', 'مغز و اعصاب', 'گوارش', 'روانپزشکی', 'جراحی عمومی', 'سایر تخصص‌ها',
];

const cities = ['تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز', 'کرج', 'اهواز', 'قم', 'رشت', 'سایر'];

const stepsMeta = ['اطلاعات پزشک', 'مطب و تخصص', 'قرارداد و تأیید'];

export default function DoctorRegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fullName: '', medicalNo: '', mobile: '', specialty: '', clinic: '', city: '', address: '', licenseFile: false });
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  const next1 = () => {
    if (form.fullName.trim().length < 3) return setError('نام و نام خانوادگی را کامل وارد کنید');
    if (digitsOnly(form.medicalNo).length < 5) return setError('شماره نظام پزشکی معتبر نیست');
    let mob = digitsOnly(form.mobile);
    if (mob.startsWith('98')) mob = mob.slice(2);
    const mobNorm = mob.startsWith('0') ? mob.slice(1) : mob;
    if (!/^9\d{9}$/.test(mobNorm)) return setError('شماره موبایل نامعتبر است');
    setError('');
    setStep(2);
  };

  const next2 = () => {
    if (!form.specialty) return setError('تخصص پزشکی را انتخاب کنید');
    if (form.clinic.trim().length < 3) return setError('نام مطب یا کلینیک را وارد کنید');
    if (!form.city) return setError('شهر را انتخاب کنید');
    setError('');
    setStep(3);
  };

  const submit = () => {
    if (!agree) return setError('ابتدا قرارداد را تأیید کنید');
    setError('');
    setDone(true);
  };

  if (done) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-16">
        <Reveal>
          <div className="card max-w-lg p-10 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--brand-bg)] text-[var(--brand-dark)]">
              <PartyPopper className="size-8" aria-hidden />
            </span>
            <h1 className="mt-4 text-xl font-extrabold text-slate-800">ثبت‌نام با موفقیت انجام شد</h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              اطلاعات شما ثبت شد. کارشناسان پیشرو وام پس از استعلام نظام پزشکی، طی ۲۴ ساعت با شما تماس می‌گیرند و کد یکتای
              فروشنده صادر می‌شود.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/doctors" className="btn-primary px-6 py-3">ورود به پنل پزشکان</Link>
              <Link href="/" className="btn-ghost px-6 py-3">بازگشت به خانه</Link>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="container-x section-pad max-w-3xl">
      <Reveal>
        <span className="badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">
          <ShieldCheck className="size-3.5" aria-hidden />
          عضو شبکه پیشرو وام شوید
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-800">ثبت‌نام پزشک / کلینیک</h1>
        <p className="mt-2 text-sm text-slate-500">خدمات درمانی خود را اقساطی ارائه دهید و بیماران بیشتری جذب کنید.</p>
      </Reveal>

      <Reveal className="mt-6">
        <ol className="flex items-center gap-2" aria-label="مراحل ثبت‌نام">
          {stepsMeta.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                  step > i + 1 ? 'bg-[var(--brand)] text-white' : step === i + 1 ? 'bg-[var(--brand-bg)] text-[var(--brand-dark)] ring-2 ring-[var(--brand)]' : 'bg-slate-100 text-slate-400'
                }`}
                aria-current={step === i + 1 ? 'step' : undefined}
              >
                {step > i + 1 ? <Check className="size-4" aria-hidden /> : faNum(i + 1)}
              </span>
              <span className={`hidden text-xs font-bold sm:block ${step === i + 1 ? 'text-[var(--brand-dark)]' : 'text-slate-400'}`}>{label}</span>
              {i < stepsMeta.length - 1 && <span className="h-0.5 flex-1 rounded bg-slate-100" aria-hidden />}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-8">
        <div className="card p-6 sm:p-8">
          {step === 1 && (
            <>
              <h2 className="text-lg font-extrabold text-slate-800">اطلاعات هویتی و پزشکی</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="dr-name" className="field-label">نام و نام خانوادگی *</label>
                  <input id="dr-name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="field-input" placeholder="مثال: دکتر سارا موسوی" />
                </div>
                <div>
                  <label htmlFor="dr-no" className="field-label">شماره نظام پزشکی *</label>
                  <input id="dr-no" value={form.medicalNo} onChange={(e) => setForm({ ...form, medicalNo: e.target.value })} className="field-input" placeholder="۱۲۳۴۵۶" inputMode="numeric" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="dr-mobile" className="field-label">شماره موبایل *</label>
                  <input id="dr-mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="field-input" placeholder="۰۹۱۲…" inputMode="tel" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="dr-spec" className="field-label">تخصص پزشکی *</label>
                  <select id="dr-spec" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className="field-input">
                    <option value="">انتخاب تخصص…</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="field-label">تصویر پروانه پزشکی</label>
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-slate-200 p-4 transition-colors hover:border-[var(--brand)]">
                  <span className="text-sm text-slate-500">{form.licenseFile ? 'فایل انتخاب شد ✓' : 'کلیک برای آپلود — تصویر پروانه یا مجوز کلینیک'}</span>
                  <span className="btn-soft px-3 py-2 text-xs">
                    <Upload className="size-3.5" aria-hidden />
                    انتخاب فایل
                  </span>
                  <input type="file" className="hidden" onChange={(e) => setForm({ ...form, licenseFile: !!e.target.files?.[0] })} aria-label="پروانه پزشکی" />
                </label>
              </div>
              {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}
              <button type="button" onClick={next1} className="btn-primary mt-6 px-6">
                مرحله بعد
                <ArrowLeft className="size-4" aria-hidden />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-extrabold text-slate-800">مطب و تخصص</h2>
              <p className="mt-2 text-sm text-slate-500">اطلاعات مطب و حوزه تخصصی خود را ثبت کنید</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="dr-clinic" className="field-label">نام مطب / کلینیک *</label>
                  <input id="dr-clinic" value={form.clinic} onChange={(e) => setForm({ ...form, clinic: e.target.value })} className="field-input" placeholder="مطب دکتر…" />
                </div>
                <div>
                  <label htmlFor="dr-city" className="field-label">شهر *</label>
                  <select id="dr-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="field-input">
                    <option value="">انتخاب شهر…</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="dr-addr" className="field-label">آدرس کامل مطب</label>
                  <input id="dr-addr" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="field-input" placeholder="آدرس کامل…" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="dr-hours" className="field-label">ساعات کاری</label>
                  <input id="dr-hours" defaultValue="شنبه تا چهارشنبه ۹ تا ۱۷" className="field-input" />
                </div>
              </div>
              {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-ghost px-5">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت
                </button>
                <button type="button" onClick={next2} className="btn-primary px-6">
                  مرحله بعد
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-extrabold text-slate-800">قرارداد همکاری</h2>
              <div className="mt-5 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-sm leading-7 text-slate-600">
                <p className="font-extrabold text-slate-800">قرارداد همکاری پزشک با پیشرو وام</p>
                <p className="mt-3">
                  این قرارداد میان شرکت پیشرو وام و دکتر {form.fullName || '—'} (تخصص: {form.specialty || '—'}، مطب: {form.clinic || '—'}) منعقد می‌شود.
                </p>
                <p className="mt-3">
                  کمیسیون خدمات پزشکی: ۴٪ از مبلغ کل تسهیلات ارائه‌شده به بیماران. تسویه هفتگی هر روز شنبه انجام می‌شود و
                  درصد کمیسیون بر اساس طرح انتخابی بین ۱۰٪ تا ۳۰٪ قابل تنظیم است.
                </p>
                <p className="mt-3">
                  این قرارداد از تاریخ امضا به مدت یک سال اعتبار دارد و قابل تمدید است. هرگونه اختلاف از طریق داوری حل‌وفصل خواهد شد.
                </p>
              </div>
              <label className="mt-4 flex items-start gap-2 text-sm leading-7 text-slate-600">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1.5 accent-[var(--brand)]" />
                قرارداد را مطالعه کرده‌ام و تأیید می‌کنم — این تأیید به منزله امضای دیجیتال است.
              </label>
              {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-ghost px-5">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت
                </button>
                <button type="button" onClick={submit} className="btn-primary px-6">
                  <PenLine className="size-4" aria-hidden />
                  تأیید نهایی
                </button>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                <BadgeCheck className="size-3.5 text-[var(--brand)]" aria-hidden />
                اطلاعات شما پس از استعلام رسمی از سازمان نظام پزشکی تأیید می‌شود.
              </p>
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
}
