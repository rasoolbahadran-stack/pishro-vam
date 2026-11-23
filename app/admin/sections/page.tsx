'use client';

// مدیریت بخش‌های صفحه اصلی — جابه‌جایی با Drag & Drop، فعال/غیرفعال، ویرایش محتوا
// تغییرات بلافاصله در صفحه اصلی سایت اعمال می‌شود (ذخیره در localStorage).
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, GripVertical, Info, PenLine, RotateCcw, Save } from 'lucide-react';
import { Reveal } from '@/components/ui/common';
import { Modal } from '@/components/ui/Modal';
import { useSite } from '@/lib/store';
import type { SectionConfig, SectionType } from '@/lib/types';

const typeLabels: Record<SectionType, string> = {
  hero: 'هیرو (بالای صفحه)',
  calculator: 'محاسبه‌گر وام',
  services: 'خدمات اصلی',
  stats: 'آمار و اعداد',
  howItWorks: 'مراحل کار',
  partners: 'ویژه عاملین',
  plans: 'طرح‌های وام',
  testimonials: 'نظرات کاربران',
  faq: 'سؤالات پرتکرار',
  cta: 'دعوت به اقدام (CTA)',
};

const editableFields: Partial<Record<SectionType, Array<'title' | 'subtitle' | 'ctaLabel' | 'ctaHref' | 'imageUrl'>>> = {
  hero: ['title', 'subtitle', 'ctaLabel', 'ctaHref', 'imageUrl'],
  calculator: ['title', 'subtitle'],
  services: ['title', 'subtitle'],
  stats: ['title', 'subtitle'],
  howItWorks: ['title', 'subtitle'],
  partners: ['title', 'subtitle'],
  plans: ['title', 'subtitle'],
  testimonials: ['title', 'subtitle'],
  faq: ['title', 'subtitle'],
  cta: ['title', 'subtitle', 'ctaLabel', 'ctaHref'],
};

export default function AdminSectionsPage() {
  const { sections, setSections, media } = useSite();
  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [edit, setEdit] = useState<SectionConfig | null>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', ctaLabel: '', ctaHref: '', imageUrl: '' });
  const [saved, setSaved] = useState(false);

  const move = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    const list = [...sections];
    const from = list.findIndex((s) => s.id === fromId);
    const to = list.findIndex((s) => s.id === toId);
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    setSections(list);
  };

  const toggle = (id: string) =>
    setSections(sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));

  const openEdit = (s: SectionConfig) => {
    setEdit(s);
    setForm({
      title: s.title || '',
      subtitle: s.subtitle || '',
      ctaLabel: s.ctaLabel || '',
      ctaHref: s.ctaHref || '',
      imageUrl: s.imageUrl || '',
    });
  };

  const saveEdit = () => {
    if (!edit) return;
    setSections(sections.map((s) => (s.id === edit.id ? { ...s, ...form } : s)));
    setEdit(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetOrder = () => {
    setSections(sections); // ترتیب فعلی حفظ می‌شود؛ برای بازنشانی کامل از تنظیمات استفاده کنید
    setSaved(false);
  };

  const fieldsFor = (type: SectionType) => editableFields[type] || [];

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">بخش‌های صفحه اصلی</h1>
            <p className="mt-1 text-xs text-slate-400">
              با کشیدن و رها کردن (Drag &amp; Drop) ترتیب بخش‌ها را تغییر دهید؛ تغییرات بلافاصله در سایت اعمال می‌شود.
            </p>
          </div>
          <div className="flex gap-2">
            {saved && (
              <span className="badge-soft bg-emerald-50 text-emerald-600">
                <Save className="size-3.5" aria-hidden />
                ذخیره شد
              </span>
            )}
            <button type="button" onClick={resetOrder} className="btn-ghost px-4 py-2 text-xs">
              <RotateCcw className="size-3.5" aria-hidden />
              بازنشانی ویرایش‌ها (راهنما)
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="flex items-start gap-2 rounded-2xl bg-amber-50 p-4 text-xs leading-6 text-amber-700">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          برای بازنشانی کامل داده‌های دمو به «تنظیمات» بروید و از دکمه بازنشانی استفاده کنید.
        </p>
      </Reveal>

      <div className="space-y-3">
        {sections.map((s, i) => {
          const fields = fieldsFor(s.type);
          return (
            <div
              key={s.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', s.id);
                e.dataTransfer.effectAllowed = 'move';
                setDragId(s.id);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                setOverId(s.id);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const from = e.dataTransfer.getData('text/plain') || dragId;
                if (from && from !== s.id) move(from, s.id);
                setDragId(null);
                setOverId(null);
              }}
              onDragEnd={() => {
                setDragId(null);
                setOverId(null);
              }}
              className={`card flex flex-wrap items-center gap-3 p-4 transition-all ${
                dragId === s.id ? 'opacity-50' : ''
              } ${overId === s.id && dragId !== s.id ? 'ring-2 ring-[var(--brand)]' : ''} ${s.enabled ? '' : 'opacity-60'}`}
            >
              <span className="cursor-grab rounded-lg p-1.5 text-slate-300 hover:text-[var(--brand)] active:cursor-grabbing" aria-label="کشیدن برای جابه‌جایی">
                <GripVertical className="size-5" aria-hidden />
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100 text-xs font-extrabold text-slate-500" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-slate-700">
                  {typeLabels[s.type]}
                  <span className="mr-2 font-mono text-[10px] font-medium text-slate-300" dir="ltr">#{s.type}</span>
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {s.title ? s.title : 'بدون عنوان سفارشی'} — {s.enabled ? 'نمایش داده می‌شود' : 'مخفی است'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {fields.length > 0 && (
                  <button type="button" onClick={() => openEdit(s)} className="btn-soft px-3 py-1.5 text-xs">
                    <PenLine className="size-3.5" aria-hidden />
                    ویرایش
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${s.enabled ? 'bg-[var(--brand)]' : 'bg-slate-300'}`}
                  role="switch"
                  aria-checked={s.enabled}
                  aria-label={`${s.enabled ? 'غیرفعال‌سازی' : 'فعال‌سازی'} ${typeLabels[s.type]}`}
                >
                  <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${s.enabled ? 'right-0.5' : 'right-5'}`} />
                </button>
                {s.enabled ? (
                  <Link href="/" className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:text-[var(--brand)]" aria-label="مشاهده در سایت">
                    <Eye className="size-4" aria-hidden />
                  </Link>
                ) : (
                  <span className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-300" aria-hidden>
                    <EyeOff className="size-4" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* مودال ویرایش بخش */}
      <Modal open={!!edit} onClose={() => setEdit(null)} title={`ویرایش بخش: ${edit ? typeLabels[edit.type] : ''}`}>
        <div className="space-y-4">
          {edit && fieldsFor(edit.type).includes('title') && (
            <div>
              <label htmlFor="sec-title" className="field-label">عنوان</label>
              <input id="sec-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="field-input" />
            </div>
          )}
          {edit && fieldsFor(edit.type).includes('subtitle') && (
            <div>
              <label htmlFor="sec-sub" className="field-label">توضیحات</label>
              <textarea id="sec-sub" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} rows={3} className="field-input resize-y" />
            </div>
          )}
          {edit && fieldsFor(edit.type).includes('imageUrl') && (
            <div>
              <label htmlFor="sec-img" className="field-label">تصویر (از کتابخانه رسانه)</label>
              <select id="sec-img" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="field-input">
                <option value="">— پیش‌فرض (گرافیک داخلی) —</option>
                {media.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-400">برای افزودن تصویر جدید به «رسانه» بروید.</p>
            </div>
          )}
          {edit && fieldsFor(edit.type).includes('ctaLabel') && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="sec-cta" className="field-label">متن دکمه CTA</label>
                <input id="sec-cta" value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="sec-ctah" className="field-label">لینک دکمه CTA</label>
                <input id="sec-ctah" value={form.ctaHref} onChange={(e) => setForm({ ...form, ctaHref: e.target.value })} className="field-input" dir="ltr" placeholder="/auth" />
              </div>
            </div>
          )}
          <button type="button" onClick={saveEdit} className="btn-primary w-full py-3">
            <Save className="size-4" aria-hidden />
            ذخیره و اعمال در سایت
          </button>
          <Link href="/" className="btn-ghost w-full justify-center">
            <ArrowLeft className="size-4" aria-hidden />
            مشاهده نتیجه در سایت
          </Link>
        </div>
      </Modal>
    </div>
  );
}
