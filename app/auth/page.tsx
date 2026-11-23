'use client';

// صفحه ورود / ثبت‌نام — جریان OTP نمایشی (کد آزمایشی ۱۲۳۴۵۶) + تکمیل پروفایل
import type { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Check, PartyPopper, ShieldCheck, Smartphone } from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { faNum, faMoney, parseFaDigits, digitsOnly } from '@/lib/format';
import { useSite } from '@/lib/store';

type Step = 'mobile' | 'otp' | 'info' | 'done';

export default function AuthPage() {
  const router = useRouter();
  const { setAuthUser, setProfile, profile } = useSite();
  const [step, setStep] = useState<Step>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [form, setForm] = useState({ fullName: '', nationalId: '', birthDate: '', income: '15,000,000' });
  const [infoError, setInfoError] = useState('');
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (step === 'otp') otpRefs.current[0]?.focus();
  }, [step]);

  /** نرمال‌سازی شماره موبایل: پذیرش ۰۹… / 9… / ۹۸… و ارقام فارسی */
  const normalizeMobile = (raw: string): string => {
    let digits = digitsOnly(raw);
    if (digits.startsWith('98')) digits = digits.slice(2);
    if (digits.startsWith('0')) digits = digits.slice(1);
    return digits;
  };

  const sendOtp = () => {
    const digits = normalizeMobile(mobile);
    if (digits.length !== 10 || !digits.startsWith('9')) {
      setOtpError('شماره موبایل را به درستی وارد کنید');
      return;
    }
    setOtpError('');
    setStep('otp');
  };

  const handleOtpInput = (index: number, value: string) => {
    const v = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = v;
    setOtp(next);
    if (v && index < 5) otpRefs.current[index + 1]?.focus();
    if (next.every((d) => d !== '')) verifyOtp(next.join(''));
  };

  const verifyOtp = (code: string) => {
    if (code !== '123456') {
      setOtpError('کد تأیید نامعتبر است — کد آزمایشی: ۱۲۳۴۵۶');
      return;
    }
    setOtpError('');
    // اگر کاربر قبلاً پروفایل داشته، مستقیم به داشبورد
    if (profile.completed >= 100) {
      setAuthUser('کاربر پیشرو');
      router.push('/dashboard');
      return;
    }
    setStep('info');
  };

  const submitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.fullName.trim().length < 3) {
      setInfoError('نام باید حداقل ۳ کاراکتر باشد');
      return;
    }
    if (digitsOnly(form.nationalId).length !== 10) {
      setInfoError('کد ملی باید ۱۰ رقم باشد');
      return;
    }
    if (parseFaDigits(form.income) < 1_000_000) {
      setInfoError('درآمد باید حداقل ۱ میلیون تومان باشد');
      return;
    }
    setInfoError('');
    setProfile({
      ...profile,
      fullName: form.fullName.trim(),
      nationalId: faNum(digitsOnly(form.nationalId)),
      birthDate: form.birthDate || '۱۳۷۰/۰۱/۰۱',
      income: parseFaDigits(form.income),
      mobile: faNum(parseFaDigits(mobile).toString()),
      completed: 100,
    });
    setAuthUser(form.fullName.trim());
    setStep('done');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(135deg, var(--brand-bg), #fff 55%, #f8fafb)' }}
        aria-hidden
      />
      <div className="container-x relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
        {/* معرفی */}
        <Reveal className="hidden lg:block">
          <span className="badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">
            <ShieldCheck className="size-3.5" aria-hidden />
            ورود امن با رمزگذاری دو مرحله‌ای
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-snug text-slate-800">
            با پیشرو وام،
            <br />
            آینده مالی خود را بسازید
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
            حساب کاربری بسازید و به داشبورد اقساط، درخواست وام آنلاین، امتیاز اعتباری و کارت اعتباری دسترسی داشته باشید.
          </p>
          <ul className="mt-6 space-y-3">
            {['ورود بدون رمز با کد پیامکی', 'ثبت درخواست وام در چند دقیقه', 'مدیریت اقساط از موبایل', 'امتیاز اعتباری رایگان'].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <Check className="size-4 text-[var(--brand)]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* فرم */}
        <Reveal delay={120}>
          <div className="card mx-auto w-full max-w-md p-6 shadow-lift sm:p-8">
            {step === 'mobile' && (
              <>
                <h2 className="text-xl font-extrabold text-slate-800">ورود / ثبت‌نام</h2>
                <p className="mt-2 text-sm text-slate-500">شماره موبایل خود را وارد کنید تا کد تأیید ارسال شود.</p>
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendOtp();
                  }}
                >
                  <div>
                    <label htmlFor="auth-mobile" className="field-label">شماره موبایل</label>
                    <input
                      id="auth-mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      inputMode="tel"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="field-input text-center tracking-widest"
                      dir="ltr"
                      autoFocus
                    />
                    {otpError && <p className="mt-1.5 text-xs font-semibold text-red-500">{otpError}</p>}
                  </div>
                  <button type="submit" className="btn-primary w-full py-3">
                    <Smartphone className="size-4" aria-hidden />
                    ارسال کد تأیید
                  </button>
                </form>
                <p className="mt-4 text-center text-xs leading-6 text-slate-400">
                  با ورود، <Link href="/terms" className="font-bold text-[var(--brand-dark)] underline underline-offset-4">قوانین و مقررات</Link> را می‌پذیرید.
                </p>
              </>
            )}

            {step === 'otp' && (
              <>
                <button type="button" onClick={() => setStep('mobile')} className="flex items-center gap-1 text-xs font-bold text-slate-400 transition-colors hover:text-[var(--brand)]">
                  <ArrowRight className="size-3.5" aria-hidden />
                  تغییر شماره
                </button>
                <h2 className="mt-3 text-xl font-extrabold text-slate-800">تأیید شماره موبایل</h2>
                <p className="mt-2 text-sm text-slate-500">
                  کد ۶ رقمی ارسال‌شده به <span className="font-bold text-slate-700" dir="ltr">{faNum(parseFaDigits(mobile).toString())}</span> را وارد کنید.
                </p>
                <div className="mt-6 flex flex-row-reverse justify-center gap-2" dir="ltr">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      value={faNum(d)}
                      onChange={(e) => handleOtpInput(i, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
                      }}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`رقم ${faNum(i + 1)}`}
                      className="size-11 rounded-xl border border-slate-200 text-center text-lg font-extrabold text-slate-800 transition-colors focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-soft)]"
                    />
                  ))}
                </div>
                {otpError && <p className="mt-3 text-center text-xs font-semibold text-red-500">{otpError}</p>}
                <button type="button" onClick={() => verifyOtp(otp.join(''))} className="btn-primary mt-5 w-full py-3">
                  تأیید و ادامه
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-center text-xs font-semibold text-amber-700">
                  نسخه نمایشی — کد آزمایشی: {faNum('۱۲۳۴۵۶')}
                </p>
              </>
            )}

            {step === 'info' && (
              <>
                <h2 className="text-xl font-extrabold text-slate-800">تکمیل اطلاعات هویتی</h2>
                <p className="mt-2 text-sm text-slate-500">برای فعال‌سازی سقف اعتباری، اطلاعات زیر را تکمیل کنید.</p>
                <form className="mt-6 space-y-4" onSubmit={submitInfo}>
                  <div>
                    <label htmlFor="auth-name" className="field-label">نام و نام خانوادگی *</label>
                    <input id="auth-name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="field-input" placeholder="مثال: علی محمدی" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="auth-nid" className="field-label">کد ملی *</label>
                      <input id="auth-nid" value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} inputMode="numeric" className="field-input" placeholder="۰۰۱۲۳۴۵۶۷۸" dir="ltr" />
                    </div>
                    <div>
                      <label htmlFor="auth-birth" className="field-label">تاریخ تولد</label>
                      <input id="auth-birth" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} className="field-input" placeholder="۱۳۷۰/۰۱/۰۱" dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="auth-income" className="field-label">درآمد ماهیانه (تومان)</label>
                    <input id="auth-income" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} inputMode="numeric" className="field-input" dir="ltr" />
                  </div>
                  {infoError && <p className="text-xs font-semibold text-red-500">{infoError}</p>}
                  <button type="submit" className="btn-primary w-full py-3">
                    <BadgeCheck className="size-4" aria-hidden />
                    ثبت‌نام و ورود به داشبورد
                  </button>
                </form>
              </>
            )}

            {step === 'done' && (
              <div className="py-6 text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                  <PartyPopper className="size-8" aria-hidden />
                </span>
                <h2 className="mt-4 text-xl font-extrabold text-slate-800">ثبت‌نام تکمیل است!</h2>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  حساب شما با موفقیت ساخته شد. پیشنهاد هوش مصنوعی: بهترین طرح برای شما، خرید اقساطی {faNum('۱۲')} ماهه است.
                </p>
                <Link href="/dashboard" className="btn-primary mt-6 w-full py-3">
                  ورود به داشبورد
                  <ArrowLeft className="size-4" aria-hidden />
                </Link>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
