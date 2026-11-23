'use client';

// تنظیمات سایت — هویت، تماس، رنگ برند، شبکه‌های اجتماعی؛ بلافاصله در سایت اعمال می‌شود.
import { useState } from 'react';
import { Check, Info, Palette, RotateCcw, Save, Settings as SettingsIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { useSite } from '@/lib/store';
import type { SiteSettings } from '@/lib/types';

const accents: Array<{ id: SiteSettings['accent']; label: string; color: string }> = [
  { id: 'green', label: 'سبز پیشرو', color: '#1baa5a' },
  { id: 'teal', label: 'سبزآبی', color: '#0d9488' },
  { id: 'blue', label: 'آبی', color: '#2563eb' },
  { id: 'violet', label: 'بنفش', color: '#7c3aed' },
];

export default function AdminSettingsPage() {
  const { settings, setSettings, resetAll } = useSite();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">تنظیمات سایت</h1>
          <p className="mt-1 text-xs text-slate-400">
            این تنظیمات مستقیماً در هدر، فوتر و هوای سایت اعمال می‌شوند.
          </p>
        </div>
      </Reveal>

      {saved && (
        <p className="flex items-center gap-1.5 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-600">
          <Check className="size-4" aria-hidden />
          تنظیمات ذخیره شد — تغییرات در سایت اعمال گردید
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
              <SettingsIcon className="size-4.5 text-[var(--brand)]" aria-hidden />
              هویت سایت
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="st-name" className="field-label">نام سایت</label>
                <input id="st-name" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="st-logo" className="field-label">متن لوگو</label>
                <input id="st-logo" value={form.logoText} onChange={(e) => setForm({ ...form, logoText: e.target.value })} className="field-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="st-tag" className="field-label">شعار (زیر لوگو)</label>
                <input id="st-tag" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="st-ht" className="field-label">تیتر بخش هیرو</label>
                <input id="st-ht" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="st-hh" className="field-label">عبارت برجسته هیرو</label>
                <input id="st-hh" value={form.heroHighlight} onChange={(e) => setForm({ ...form, heroHighlight: e.target.value })} className="field-input" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="card p-6">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-800">
              <Palette className="size-4.5 text-[var(--brand)]" aria-hidden />
              رنگ برند
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {accents.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setForm({ ...form, accent: a.id })}
                  className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                    form.accent === a.id ? 'border-[var(--brand)] bg-[var(--brand-bg)]' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  aria-pressed={form.accent === a.id}
                >
                  <span className="size-8 rounded-full shadow-inner" style={{ background: a.color }} aria-hidden />
                  <span className="text-xs font-bold text-slate-600">{a.label}</span>
                  {form.accent === a.id && <Check className="size-4 text-[var(--brand-dark)]" aria-hidden />}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              پس از ذخیره، کل رنگ‌بندی سایت (دکمه‌ها، لینک‌ها، نمودارها) به‌صورت خودکار تغییر می‌کند.
            </p>

            <h3 className="mt-6 text-sm font-extrabold text-slate-700">شبکه‌های اجتماعی</h3>
            <div className="mt-3 space-y-3">
              {(
                [
                  ['instagram', 'اینستاگرام'],
                  ['telegram', 'تلگرام'],
                  ['linkedin', 'لینکدین'],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label htmlFor={`st-${key}`} className="field-label">
                    {label}
                  </label>
                  <input
                    id={`st-${key}`}
                    value={form.socials[key]}
                    onChange={(e) => setForm({ ...form, socials: { ...form.socials, [key]: e.target.value } })}
                    className="field-input"
                    dir="ltr"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">اطلاعات تماس (فوتر و پشتیبانی)</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="st-phone" className="field-label">تلفن</label>
                <input id="st-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="st-email" className="field-label">ایمیل</label>
                <input id="st-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-input" dir="ltr" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="st-addr" className="field-label">آدرس</label>
                <input id="st-addr" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="field-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="st-hours" className="field-label">ساعات کاری</label>
                <input id="st-hours" value={form.workingHours} onChange={(e) => setForm({ ...form, workingHours: e.target.value })} className="field-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="st-foot" className="field-label">متن معرفی فوتر</label>
                <textarea id="st-foot" value={form.footerNote} onChange={(e) => setForm({ ...form, footerNote: e.target.value })} rows={3} className="field-input resize-y" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="space-y-4">
            <div className="card p-6">
              <h2 className="text-base font-extrabold text-slate-800">درباره نسخه دمو</h2>
              <p className="mt-3 flex items-start gap-2 text-xs leading-6 text-slate-500">
                <Info className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" aria-hidden />
                این نسخه روی هاست استاتیک (GitHub Pages) اجرا می‌شود؛ بنابراین داده‌های پنل (بخش‌ها، محتوا، رسانه، تنظیمات،
                درخواست‌ها) در localStorage مرورگر ذخیره می‌شوند و فقط روی دستگاه شما باقی می‌مانند. در یک استقرار واقعی،
                این لایه با API سرور جایگزین می‌شود.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('همه داده‌های دمو (پنل + داشبورد کاربر) به حالت اولیه بازمی‌گردند. مطمئن هستید؟')) {
                    resetAll();
                  }
                }}
                className="btn-danger mt-4 w-full"
              >
                <RotateCcw className="size-4" aria-hidden />
                بازنشانی کامل داده‌های دمو
              </button>
            </div>
            <button type="button" onClick={save} className="btn-primary w-full py-3.5 text-base">
              <Save className="size-4.5" aria-hidden />
              ذخیره تنظیمات
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
