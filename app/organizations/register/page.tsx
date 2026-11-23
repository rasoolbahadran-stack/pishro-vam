'use client';

// ثبت‌نام سازمان — ۳ مرحله: اطلاعات شرکت → اطلاعات بانکی → مدارک و تأیید
import type { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, Check, PartyPopper, Upload } from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { faNum, digitsOnly } from '@/lib/format';

const orgTypes = ['خصوصی', 'نیمه‌دولتی', 'دولتی', 'نظامی/انتظامی'];
const industries = [
  'صنایع سرامیک و ساختمانی', 'فناوری اطلاعات', 'خدمات درمانی', 'مالی و بانکی', 'آموزش و پرورش', 'صنایع غذایی', 'حمل و نقل', 'سایر',
];

const planCards = [
  { id: 'basic', name: 'پایه', fee: '۱٪ هر تراکنش', cap: 'سقف ۵۰ میلیون برای هر کارمند', points: ['حداکثر ۱۲ قسط', 'گزارش ماهانه', 'پنل مدیریت پایه'] },
  { id: 'pro', name: 'حرفه‌ای', fee: '۱.۵٪ هر تراکنش', cap: 'سقف ۱۵۰ میلیون برای هر کارمند', points: ['حداکثر ۲۴ قسط', 'گزارش هفتگی', 'پنل مدیریت کامل'], popular: true },
  { id: 'vip', name: 'سازمانی', fee: '۲٪ هر تراکنش', cap: 'سقف ۵۰۰ میلیون برای هر کارمند', points: ['حداکثر ۳۶ قسط', 'گزارش روزانه', 'پنل پیشرفته + تسویه فوری'], },
];

const docsNeeded = ['اساسنامه سازمان', 'آگهی روزنامه رسمی', 'کارت ملی مدیرعامل', 'آخرین صورت‌های مالی'];

const stepsMeta = ['اطلاعات سازمان', 'اطلاعات بانکی', 'مدارک و تأیید'];

export default function OrgRegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', type: '', industry: '', regNo: '', nationalId: '', ceo: '', ceoNid: '', city: '', address: '',
    accOwner: '', iban: '', card: '',
    plan: '',
  });
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const next1 = () => {
    if (form.name.trim().length < 3) return setError('نام سازمان را کامل وارد کنید');
    if (!form.type) return setError('نوع سازمان را انتخاب کنید');
    if (!form.industry) return setError('حوزه فعالیت را انتخاب کنید');
    if (digitsOnly(form.regNo).length < 3) return setError('شماره ثبت شرکت معتبر نیست');
    setError('');
    setStep(2);
  };

  const next2 = () => {
    if (!form.accOwner.trim()) return setError('نام صاحب حساب الزامی است');
    if (digitsOnly(form.iban).length < 24) return setError('شماره شبا باید ۲۴ رقم باشد (بدون IR)');
    setError('');
    setStep(3);
  };

  const submit = () => {
    if (docsNeeded.some((d) => !uploaded[d])) return setError('لطفاً تمام مدارک الزامی را آپلود کنید');
    if (!agree) return setError('لطفاً شرایط را تأیید کنید');
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
            <h1 className="mt-4 text-xl font-extrabold text-slate-800">ثبت سازمان با موفقیت انجام شد</h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              مدارک سازمان شما ارسال شد. کارشناسان پیشرو وام در ۳ روز کاری نتیجه را اعلام خواهند کرد و پس از تأیید،
              پنل سازمان فعال می‌شود.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/organizations" className="btn-primary px-6 py-3">مشاهده پنل نمونه</Link>
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
          <Building2 className="size-3.5" aria-hidden />
          سامانه ثبت سازمان‌ها
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-800">ثبت‌نام سازمان</h1>
        <p className="mt-2 text-sm text-slate-500">
          طرح‌های رفاهی و تسهیلات ویژه کارکنان سازمان خود را فعال کنید — با پیشرو وام، رفاه کارکنان شما تضمین است.
        </p>
      </Reveal>

      <Reveal className="mt-6">
        <ol className="flex items-center gap-2" aria-label="مراحل ثبت‌نام">
          {stepsMeta.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                  step > i + 1 ? 'bg-[var(--brand)] text-white' : step === i + 1 ? 'bg-[var(--brand-bg)] text-[var(--brand-dark)] ring-2 ring-[var(--brand)]' : 'bg-slate-100 text-slate-400'
                }`}
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
              <h2 className="text-lg font-extrabold text-slate-800">اطلاعات شرکت و مدیرعامل</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="o-name" className="field-label">نام سازمان / شرکت *</label>
                  <input id="o-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-input" placeholder="مثال: شرکت پیشرو سرامیک بین‌المللی" />
                </div>
                <div>
                  <label htmlFor="o-type" className="field-label">نوع سازمان *</label>
                  <select id="o-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="field-input">
                    <option value="">انتخاب…</option>
                    {orgTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="o-ind" className="field-label">حوزه فعالیت / صنعت *</label>
                  <select id="o-ind" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="field-input">
                    <option value="">انتخاب…</option>
                    {industries.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="o-reg" className="field-label">شماره ثبت شرکت *</label>
                  <input id="o-reg" value={form.regNo} onChange={(e) => setForm({ ...form, regNo: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" placeholder="134567" />
                </div>
                <div>
                  <label htmlFor="o-nid" className="field-label">شناسه ملی شرکت</label>
                  <input id="o-nid" value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" placeholder="۱۰۲۰۰۰۰۰۰۰۰" />
                </div>
                <div>
                  <label htmlFor="o-ceo" className="field-label">نام مدیرعامل *</label>
                  <input id="o-ceo" value={form.ceo} onChange={(e) => setForm({ ...form, ceo: e.target.value })} className="field-input" />
                </div>
                <div>
                  <label htmlFor="o-ceoNid" className="field-label">کد ملی مدیرعامل</label>
                  <input id="o-ceoNid" value={form.ceoNid} onChange={(e) => setForm({ ...form, ceoNid: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="o-city" className="field-label">شهر *</label>
                  <input id="o-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="field-input" placeholder="مثال: تهران" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="o-addr" className="field-label">آدرس دفتر مرکزی</label>
                  <input id="o-addr" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="field-input" placeholder="تهران، خیابان ولیعصر، پلاک…" />
                </div>
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
              <h2 className="text-lg font-extrabold text-slate-800">اطلاعات بانکی</h2>
              <p className="mt-2 text-sm text-slate-500">حساب بانکی سازمان برای پرداخت و تسویه</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="o-acc" className="field-label">نام صاحب حساب *</label>
                  <input id="o-acc" value={form.accOwner} onChange={(e) => setForm({ ...form, accOwner: e.target.value })} className="field-input" placeholder="نام ثبت‌شده در بانک" />
                </div>
                <div>
                  <label htmlFor="o-iban" className="field-label">شماره شبا (بدون IR) *</label>
                  <input id="o-iban" value={form.iban} onChange={(e) => setForm({ ...form, iban: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" placeholder="IR062960000000100000000001" />
                </div>
                <div>
                  <label htmlFor="o-card" className="field-label">شماره کارت سازمانی</label>
                  <input id="o-card" value={form.card} onChange={(e) => setForm({ ...form, card: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" placeholder="۶۰۳۷۹۹۰۰۰۰۰۰۰۰۰۰" />
                </div>
              </div>

              <div className="mt-6">
                <span className="field-label">انتخاب پلن صنفی *</span>
                <div className="grid gap-3 lg:grid-cols-3">
                  {planCards.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setForm({ ...form, plan: p.id })}
                      className={`rounded-2xl border p-4 text-right transition-all ${form.plan === p.id ? 'border-[var(--brand)] bg-[var(--brand-bg)]' : 'border-slate-200 hover:border-slate-300'}`}
                      aria-pressed={form.plan === p.id}
                    >
                      <span className="block text-sm font-extrabold text-slate-700">{p.name}</span>
                      <span className="mt-1 block text-sm font-extrabold text-[var(--brand-dark)]">{p.fee}</span>
                      <span className="mt-1 block text-xs text-slate-400">{p.cap}</span>
                      <ul className="mt-2 space-y-1">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Check className="size-3 text-[var(--brand)]" aria-hidden />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
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
              <h2 className="text-lg font-extrabold text-slate-800">مدارک و تأیید نهایی</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {docsNeeded.map((d) => (
                  <label
                    key={d}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-4 transition-colors ${
                      uploaded[d] ? 'border-[var(--brand)] bg-[var(--brand-bg)]' : 'border-dashed border-slate-200 hover:border-[var(--brand)]'
                    }`}
                  >
                    <span className="text-sm font-semibold text-slate-600">
                      {d} {uploaded[d] && <span className="text-[var(--brand-dark)]">✓</span>}
                    </span>
                    <span className="btn-soft px-3 py-1.5 text-xs">
                      <Upload className="size-3.5" aria-hidden />
                      انتخاب فایل
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setUploaded((prev) => ({ ...prev, [d]: !!e.target.files?.[0] }))}
                      aria-label={d}
                    />
                  </label>
                ))}
              </div>
              <label className="mt-5 flex items-start gap-2 text-sm leading-7 text-slate-600">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1.5 accent-[var(--brand)]" />
                اطلاعات وارد‌شده را صحیح تأیید می‌کنم؛ با قوانین و مقررات پیشرو وام موافقم و می‌پذیرم که پنل سازمان پس از
                بررسی مدارک فعال شود.
              </label>
              {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-ghost px-5">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت
                </button>
                <button type="button" onClick={submit} className="btn-primary px-6">
                  <BadgeCheck className="size-4" aria-hidden />
                  ثبت نهایی سازمان
                </button>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
}
