'use client';

// پشتیبانی — ارسال تیکت با اعتبارسنجی، ساعات کاری، سؤالات پرتکرار پشتیبانی
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronDown, Clock, Mail, MapPin, Phone, Send, MessageSquareText } from 'lucide-react';
import { PageHero, Reveal, SectionHeading } from '@/components/ui/common';
import { parseFaDigits } from '@/lib/format';
import { useSite } from '@/lib/store';

const subjects = ['مشکل در پرداخت قسط', 'وضعیت پرونده', 'درخواست وام', 'کارت اعتباری', 'سایر موارد'];

const supportFaqs = [
  { q: 'زمان پاسخ‌گویی تیکت‌ها چقدر است؟', a: 'تیم پشتیبانی در ساعات کاری، در کمتر از ۲۴ ساعت به تیکت شما پاسخ می‌دهد. موارد فوری پرداخت را با اولویت بررسی می‌کنیم.' },
  { q: 'چگونه وضعیت پرونده خود را ببینم؟', a: 'از داشبورد مشتری، بخش «درخواست‌های من» وضعیت لحظه‌ای پرونده‌ها را نشان می‌دهد؛ تغییر وضعیت از طریق اعلان هم اطلاع داده می‌شود.' },
  { q: 'پرداخت قسط انجام شد اما ثبت نشده؛ چه کنم؟', a: 'رسید پرداخت را در تیکت پیوست کنید تا تیم مالی حداکثر تا ۴۸ ساعت بررسی و اصلاح کند.' },
];

export default function SupportPage() {
  const { settings } = useSite();
  const [form, setForm] = useState({ name: '', mobile: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = 'نام باید حداقل ۳ کاراکتر باشد';
    let mobileDigits = parseFaDigits(form.mobile).toString();
    if (mobileDigits.startsWith('98')) mobileDigits = mobileDigits.slice(2);
    if (mobileDigits.startsWith('0')) mobileDigits = mobileDigits.slice(1);
    if (!/^9\d{9}$/.test(mobileDigits)) errs.mobile = 'شماره موبایل نامعتبر است';
    if (!form.subject) errs.subject = 'موضوع را انتخاب کنید';
    if (form.message.trim().length < 10) errs.message = 'متن پیام حداقل ۱۰ کاراکتر باشد';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: '', mobile: '', subject: '', message: '' });
    }
  };

  return (
    <>
      <PageHero
        badge="پشتیبانی پیشرو وام"
        title="اینجا هستیم تا کمک کنید"
        subtitle="سؤال، مشکل یا پیشنهادی دارید؟ تیم پشتیبانی ما در کمتر از ۲۴ ساعت پاسخ می‌دهد."
      />

      <section className="section-pad bg-white">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          {/* فرم تیکت */}
          <Reveal className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              {sent ? (
                <div className="py-8 text-center">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                    <CheckCircle2 className="size-8" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-lg font-extrabold text-slate-800">تیکت ارسال شد</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    تیم پشتیبانی ما در کمتر از ۲۴ ساعت پاسخ خواهد داد. کد رهگیری تیکت در پیامک برای شما ارسال می‌شود.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="btn-soft mt-5">
                    <MessageSquareText className="size-4" aria-hidden />
                    ارسال تیکت جدید
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-extrabold text-slate-800">ارسال تیکت پشتیبانی</h2>
                  <p className="mt-2 text-sm text-slate-500">موضوع و متن پیام را وارد کنید</p>
                  <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="sp-name" className="field-label">نام و نام خانوادگی *</label>
                        <input
                          id="sp-name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="field-input"
                          placeholder="مثال: علی محمدی"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="sp-mobile" className="field-label">شماره موبایل *</label>
                        <input
                          id="sp-mobile"
                          value={form.mobile}
                          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                          inputMode="tel"
                          className="field-input"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          dir="ltr"
                          aria-invalid={!!errors.mobile}
                        />
                        {errors.mobile && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.mobile}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="sp-subject" className="field-label">موضوع *</label>
                      <select
                        id="sp-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="field-input"
                        aria-invalid={!!errors.subject}
                      >
                        <option value="">انتخاب موضوع…</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.subject && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.subject}</p>}
                    </div>
                    <div>
                      <label htmlFor="sp-message" className="field-label">متن پیام *</label>
                      <textarea
                        id="sp-message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="field-input resize-y"
                        placeholder="مشکل یا سؤال خود را اینجا بنویسید…"
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.message}</p>}
                    </div>
                    <button type="submit" className="btn-primary w-full py-3">
                      <Send className="size-4" aria-hidden />
                      ارسال تیکت
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>

          {/* تماس */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="space-y-4">
              <div className="card p-6">
                <h2 className="text-base font-extrabold text-slate-800">راه‌های ارتباط</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <Phone className="size-5" aria-hidden />
                    </span>
                    <span dir="ltr">{settings.phone}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <span dir="ltr">{settings.email}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <MapPin className="size-5" aria-hidden />
                    </span>
                    {settings.address}
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <Clock className="size-5" aria-hidden />
                    </span>
                    {settings.workingHours}
                  </li>
                </ul>
              </div>
              <div className="card border-[var(--brand-soft)] bg-[var(--brand-bg)] p-6">
                <h2 className="text-sm font-extrabold text-[var(--brand-dark)]">پاسخ سریع</h2>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  برای موارد فوری مانند سررسید قسط، از داشبورد مشتری استفاده کنید — پرداخت آنلاین بلافاصله ثبت می‌شود.
                </p>
                <Link href="/dashboard" className="btn-primary mt-4 w-full">
                  رفتن به داشبورد
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* سؤالات پشتیبانی */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <SectionHeading title="سؤالات پرتکرار پشتیبانی" subtitle="شاید پاسخ سؤال شما اینجا باشد" />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {supportFaqs.map((f, i) => (
              <SupportFaq key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SupportFaq({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`card overflow-hidden ${open ? 'border-[var(--brand)]' : ''}`}>
      <button type="button" className="flex w-full items-center justify-between gap-3 p-5 text-right" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="text-sm font-bold text-slate-700">{q}</span>
        <span className={`grid size-8 shrink-0 place-items-center rounded-lg transition-colors ${open ? 'bg-[var(--brand)] text-white' : 'bg-slate-100 text-slate-500'}`}>
          <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
        </span>
      </button>
      {open && <div className="animate-slide-down border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-500">{a}</div>}
    </div>
  );
}
