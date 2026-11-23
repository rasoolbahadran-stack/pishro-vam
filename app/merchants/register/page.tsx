'use client';

// ثبت‌نام عامل / فروشگاه — ۳ مرحله: اطلاعات کسب‌وکار → صنف و طرح کارمزد → بررسی و ارسال
import type { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Check, PartyPopper, Store } from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { faMoney, faNum, digitsOnly } from '@/lib/format';

const categories = [
  { id: 'ceramic', label: 'سرامیک و کاشی', desc: 'فروش مصالح ساختمانی و سرامیک', fee: 1.5 },
  { id: 'auto', label: 'خودرو و قطعات', desc: 'نمایشگاه، تعمیرگاه، قطعات خودرو', fee: 2 },
  { id: 'home', label: 'لوازم خانگی', desc: 'فروش لوازم خانگی و اداری', fee: 2 },
  { id: 'digital', label: 'کالای دیجیتال', desc: 'تجهیزات الکترونیک و موبایل', fee: 2.5 },
  { id: 'fashion', label: 'پوشاک و مد', desc: 'فروشگاه‌های پوشاک', fee: 2 },
  { id: 'furniture', label: 'مبلمان و دکوراسیون', desc: 'مبل و دکوراسیون داخلی', fee: 2 },
  { id: 'medical', label: 'خدمات درمانی', desc: 'کلینیک و مطب', fee: 1.5 },
  { id: 'other', label: 'سایر کسب‌وکارها', desc: 'سایر فروشگاه‌ها', fee: 2.5 },
];

const feePlans = [
  { id: 'starter', name: 'پایه', fee: '۱.۵٪ هر تراکنش', customers: 'تا ۱۰ مشتری در ماه', points: ['اعتبار تا ۵۰ میلیون', 'حداکثر ۱۲ قسط', 'گزارش ماهانه', 'پشتیبانی ایمیل'] },
  { id: 'pro', name: 'حرفه‌ای', fee: '۲٪ هر تراکنش', customers: 'تا ۲۰ مشتری در ماه', points: ['اعتبار تا ۱۵۰ میلیون', 'حداکثر ۲۴ قسط', 'گزارش هفتگی', 'پشتیبانی تلفنی', 'ویترین محصولات'], popular: true },
  { id: 'vip', name: 'ویژه', fee: '۲.۵٪ هر تراکنش', customers: 'تا ۳۰ مشتری در ماه', points: ['اعتبار تا ۵۰۰ میلیون', 'حداکثر ۳۶ قسط', 'گزارش روزانه', 'پشتیبانی اولویت‌دار', 'ویترین + فروش آنلاین', 'مدیریت چک و مدارک'] },
];

const stepsMeta = ['اطلاعات کسب‌وکار', 'صنف و طرح', 'بررسی و ارسال'];

export default function MerchantRegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ shop: '', owner: '', nationalId: '', city: '', address: '', category: '', plan: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const next1 = () => {
    if (form.shop.trim().length < 3) return setError('نام فروشگاه باید حداقل ۳ کاراکتر باشد');
    if (!form.owner.trim()) return setError('نام مالک الزامی است');
    if (digitsOnly(form.nationalId).length !== 10) return setError('کد ملی مالک باید ۱۰ رقم باشد');
    if (form.address.trim().length < 8) return setError('آدرس را کامل وارد کنید');
    setError('');
    setStep(2);
  };

  const next2 = () => {
    if (!form.category) return setError('لطفاً صنف خود را انتخاب کنید');
    if (!form.plan) return setError('لطفاً یک طرح کارمزد انتخاب کنید');
    setError('');
    setStep(3);
  };

  const submit = () => {
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
            <h1 className="mt-4 text-xl font-extrabold text-slate-800">درخواست ثبت‌نام عامل ارسال شد!</h1>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              کارشناسان ما ظرف ۲۴ ساعت با شما تماس می‌گیرند. پس از تأیید مدارک و پرداخت کارمزد ماهانه، پنل فروشنده فعال می‌شود.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/merchants" className="btn-primary px-6 py-3">مشاهده پنل نمونه</Link>
              <Link href="/" className="btn-ghost px-6 py-3">بازگشت به خانه</Link>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  const selectedCat = categories.find((c) => c.id === form.category);
  const selectedPlan = feePlans.find((p) => p.id === form.plan);

  return (
    <div className="container-x section-pad max-w-3xl">
      <Reveal>
        <span className="badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">
          <Store className="size-3.5" aria-hidden />
          پیشرو وام — هلدینگ بین‌المللی پیشرو سرامیک
        </span>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-800">ثبت‌نام عامل / فروشگاه</h1>
        <p className="mt-2 text-sm text-slate-500">فروش اقساطی به مشتریان بیشتر، درآمد بیشتر — اطلاعات کسب‌وکار خود را وارد کنید.</p>
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
              <h2 className="text-lg font-extrabold text-slate-800">اطلاعات فروشگاه یا کسب‌وکار</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="m-shop" className="field-label">نام فروشگاه / کسب‌وکار *</label>
                  <input id="m-shop" value={form.shop} onChange={(e) => setForm({ ...form, shop: e.target.value })} className="field-input" placeholder="مثال: فروشگاه سرامیک پیشرو" />
                </div>
                <div>
                  <label htmlFor="m-owner" className="field-label">نام مالک / مدیر *</label>
                  <input id="m-owner" value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="field-input" placeholder="مثال: احمد رضایی" />
                </div>
                <div>
                  <label htmlFor="m-nid" className="field-label">کد ملی مالک *</label>
                  <input id="m-nid" value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" placeholder="۰۰۱۲۳۴۵۶۷۸" />
                </div>
                <div>
                  <label htmlFor="m-city" className="field-label">شهر محل فعالیت *</label>
                  <input id="m-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="field-input" placeholder="مثال: تهران" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="m-addr" className="field-label">آدرس کسب‌وکار *</label>
                  <input id="m-addr" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="field-input" placeholder="آدرس کامل فروشگاه…" />
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
              <h2 className="text-lg font-extrabold text-slate-800">صنف و طرح کارمزد</h2>
              <p className="mt-2 text-sm text-slate-500">نوع کسب‌وکار و طرح مناسب را انتخاب کنید</p>
              <div className="mt-5">
                <span className="field-label">انتخاب صنف *</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setForm({ ...form, category: c.id })}
                      className={`rounded-2xl border p-4 text-right transition-all ${form.category === c.id ? 'border-[var(--brand)] bg-[var(--brand-bg)]' : 'border-slate-200 hover:border-slate-300'}`}
                      aria-pressed={form.category === c.id}
                    >
                      <span className="block text-sm font-extrabold text-slate-700">{c.label}</span>
                      <span className="mt-1 block text-xs text-slate-400">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <span className="field-label">انتخاب طرح کارمزد *</span>
                <div className="grid gap-3 lg:grid-cols-3">
                  {feePlans.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setForm({ ...form, plan: p.id })}
                      className={`rounded-2xl border p-4 text-right transition-all ${form.plan === p.id ? 'border-[var(--brand)] bg-[var(--brand-bg)]' : 'border-slate-200 hover:border-slate-300'} ${p.popular ? 'ring-1 ring-amber-300' : ''}`}
                      aria-pressed={form.plan === p.id}
                    >
                      <span className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-slate-700">{p.name}</span>
                        {p.popular && <span className="badge-soft bg-amber-100 text-amber-700">پرطرفدار</span>}
                      </span>
                      <span className="mt-2 block text-lg font-extrabold text-[var(--brand-dark)]">{p.fee}</span>
                      <span className="block text-xs text-slate-400">{p.customers}</span>
                      <ul className="mt-2 space-y-1">
                        {p.points.slice(0, 3).map((pt) => (
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
              <h2 className="text-lg font-extrabold text-slate-800">بررسی و ارسال</h2>
              <dl className="mt-5 grid gap-x-6 gap-y-3 rounded-2xl bg-slate-50/60 p-5 text-sm sm:grid-cols-2">
                <div><dt className="text-slate-400">نام فروشگاه</dt><dd className="mt-0.5 font-bold text-slate-700">{form.shop}</dd></div>
                <div><dt className="text-slate-400">نام مالک</dt><dd className="mt-0.5 font-bold text-slate-700">{form.owner}</dd></div>
                <div><dt className="text-slate-400">کد ملی</dt><dd className="mt-0.5 font-bold text-slate-700" dir="ltr">{faNum(digitsOnly(form.nationalId))}</dd></div>
                <div><dt className="text-slate-400">شهر</dt><dd className="mt-0.5 font-bold text-slate-700">{form.city}</dd></div>
                <div><dt className="text-slate-400">صنف</dt><dd className="mt-0.5 font-bold text-slate-700">{selectedCat?.label}</dd></div>
                <div><dt className="text-slate-400">کارمزد ماهانه</dt><dd className="mt-0.5 font-bold text-[var(--brand-dark)]">{selectedPlan?.fee}</dd></div>
                <div className="sm:col-span-2"><dt className="text-slate-400">آدرس</dt><dd className="mt-0.5 font-bold text-slate-700">{form.address}</dd></div>
              </dl>
              {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-ghost px-5">
                  <ArrowRight className="size-4" aria-hidden />
                  بازگشت
                </button>
                <button type="button" onClick={submit} className="btn-primary px-6">
                  <BadgeCheck className="size-4" aria-hidden />
                  تأیید و ارسال
                </button>
              </div>
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
}
