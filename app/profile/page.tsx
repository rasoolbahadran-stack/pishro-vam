'use client';

// پروفایل کاربر — ویرایش اطلاعات هویتی (ذخیره در store)، وضعیت مدارک، تاریخچه فعالیت
import Link from 'next/link';
import { useState } from 'react';
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileUp,
  Gauge,
  RefreshCw,
  Save,
  Upload,
  User,
} from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { faMoney, faNum, parseFaDigits } from '@/lib/format';
import { useSite } from '@/lib/store';

const documents = [
  { id: 'nid', label: 'کارت ملی و مدارک هویتی', status: 'approved', date: '۱۴۰۲/۰۸/۱۰' },
  { id: 'income', label: 'گواهی درآمد', status: 'review', date: '۱۴۰۳/۰۷/۲۹' },
  { id: 'residence', label: 'مدرک سکونت', status: 'approved', date: '۱۴۰۲/۰۸/۱۰' },
  { id: 'face', label: 'تشخیص چهره', status: 'pending', date: '—' },
];

const docMeta: Record<string, { text: string; cls: string }> = {
  approved: { text: 'تأیید شده', cls: 'bg-emerald-50 text-emerald-600' },
  review: { text: 'در حال بررسی توسط کارشناس', cls: 'bg-blue-50 text-blue-600' },
  pending: { text: 'آپلود نشده', cls: 'bg-slate-100 text-slate-500' },
};

const activity = [
  { title: 'درخواست خرید اقساطی APP-1042 به مبلغ ۸۰ میلیون تومان ثبت شد', date: '۱۴۰۳/۰۸/۱۸' },
  { title: 'تأیید پرونده پزشکی APP-1014 توسط کارشناس', date: '۱۴۰۳/۰۷/۲۹' },
  { title: 'قسط اول APP-1042 به مبلغ ۴٬۶۴۰٬۰۰۰ تومان پرداخت شد', date: '۱۴۰۳/۰۷/۱۸' },
  { title: 'هشدار سررسید قسط دوم پرونده APP-1042', date: '۱۴۰۳/۰۸/۱۵' },
  { title: 'کارت ملی و مدارک هویتی با موفقیت بارگذاری شدند', date: '۱۴۰۲/۰۸/۱۰' },
  { title: 'ثبت‌نام در سیستم و تأیید حساب کاربری', date: '۱۴۰۲/۰۸/۰۵' },
];

export default function ProfilePage() {
  const { profile, setProfile } = useSite();
  const [form, setForm] = useState({
    fullName: profile.fullName,
    city: profile.city,
    job: profile.job,
    income: faMoney(profile.income),
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.fullName.trim().length < 3) {
      setError('نام باید حداقل ۳ کاراکتر باشد');
      return;
    }
    if (parseFaDigits(form.income) < 1_000_000) {
      setError('درآمد باید حداقل ۱ میلیون تومان باشد');
      return;
    }
    setError('');
    setProfile({ ...profile, ...form, income: parseFaDigits(form.income) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container-x section-pad">
      <Reveal>
        <h1 className="text-2xl font-extrabold text-slate-800">پروفایل من</h1>
        <p className="mt-1 text-sm text-slate-500">اطلاعات هویتی، مدارک و تاریخچه فعالیت‌های شما</p>
      </Reveal>

      {/* خلاصه */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Reveal>
          <div className="card flex items-center gap-4 p-5">
            <span className="grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
              <User className="size-6" aria-hidden />
            </span>
            <div>
              <p className="text-xs text-slate-400">وام‌های فعال</p>
              <p className="text-lg font-extrabold text-slate-800">۲</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={60}>
          <div className="card flex items-center gap-4 p-5">
            <span className="grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
              <Gauge className="size-6" aria-hidden />
            </span>
            <div>
              <p className="text-xs text-slate-400">امتیاز اعتباری</p>
              <p className="text-lg font-extrabold text-slate-800">{faNum(profile.score)}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="card flex items-center gap-4 p-5">
            <span className="grid size-12 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
              <CheckCircle2 className="size-6" aria-hidden />
            </span>
            <div className="w-full">
              <p className="text-xs text-slate-400">تکمیل پروفایل — {faNum(profile.completed)}٪</p>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[var(--brand)] transition-all" style={{ width: `${profile.completed}%` }} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* اطلاعات شخصی */}
        <Reveal>
          <form onSubmit={save} className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">اطلاعات شخصی</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pf-name" className="field-label">نام و نام خانوادگی</label>
                <input id="pf-name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="pf-nid" className="field-label">کد ملی</label>
                <input id="pf-nid" value={profile.nationalId} readOnly className="field-input bg-slate-50 text-slate-400" />
              </div>
              <div>
                <label htmlFor="pf-mobile" className="field-label">شماره موبایل</label>
                <input id="pf-mobile" value={profile.mobile} readOnly className="field-input bg-slate-50 text-slate-400" dir="ltr" />
              </div>
              <div>
                <label htmlFor="pf-city" className="field-label">شهر</label>
                <input id="pf-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="pf-job" className="field-label">شغل</label>
                <input id="pf-job" value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="pf-income" className="field-label">درآمد ماهانه (تومان)</label>
                <input id="pf-income" value={form.income} onChange={(e) => setForm({ ...form, income: e.target.value })} className="field-input" dir="ltr" />
              </div>
            </div>
            {error && <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>}
            {saved && (
              <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <BadgeCheck className="size-4" aria-hidden />
                اطلاعات با موفقیت ذخیره شد
              </p>
            )}
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-700">
              تغییر اطلاعات هویتی ممکن است نیازمند بررسی مجدد توسط کارشناسان باشد.
            </p>
            <button type="submit" className="btn-primary mt-4">
              <Save className="size-4" aria-hidden />
              ذخیره تغییرات
            </button>
          </form>
        </Reveal>

        {/* مدارک */}
        <Reveal delay={100}>
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">مدارک من</h2>
            <ul className="mt-4 divide-y divide-slate-100">
              {documents.map((d) => (
                <li key={d.id} className="flex flex-wrap items-center gap-3 py-3.5">
                  <span className="grid size-10 place-items-center rounded-xl bg-slate-50 text-slate-400">
                    <FileUp className="size-5" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-slate-700">{d.label}</p>
                    <p className="text-xs text-slate-400">{d.date === '—' ? 'هنوز ارسال نشده' : `آخرین به‌روزرسانی: ${d.date}`}</p>
                  </div>
                  <span className={`badge-soft ${docMeta[d.status].cls}`}>{docMeta[d.status].text}</span>
                  <button type="button" className="btn-soft px-3 py-1.5 text-xs">
                    <Upload className="size-3.5" aria-hidden />
                    {d.status === 'pending' ? 'آپلود مدرک' : 'آپلود مجدد'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* تاریخچه فعالیت */}
      <Reveal className="mt-6">
        <div className="card p-6">
          <h2 className="text-base font-extrabold text-slate-800">تاریخچه فعالیت‌ها</h2>
          <ol className="mt-5 space-y-0 border-r-2 border-slate-100 pr-5">
            {activity.map((a, i) => (
              <li key={i} className="relative pb-6 last:pb-0">
                <span className="absolute -right-[26.5px] top-0 grid size-4 place-items-center rounded-full bg-[var(--brand-bg)] ring-4 ring-white">
                  <Clock className="size-2.5 text-[var(--brand-dark)]" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-slate-700">{a.title}</p>
                <p className="mt-1 text-xs text-slate-400">{a.date}</p>
              </li>
            ))}
          </ol>
          <Link href="/notifications" className="btn-soft mt-2">
            <RefreshCw className="size-4" aria-hidden />
            مشاهده اعلان‌ها
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
