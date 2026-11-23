'use client';

// مدیریت صفحات — ویرایش عنوان/توضیحات، تغییر وضعیت انتشار، مدیریت نمایش در منو
import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, FileStack, Eye, EyeOff, PenLine, Save } from 'lucide-react';
import { Reveal, EmptyState } from '@/components/ui/common';
import { Modal } from '@/components/ui/Modal';
import { useSite } from '@/lib/store';
import type { PageMeta } from '@/lib/types';

export default function AdminPagesPage() {
  const { pages, setPages } = useSite();
  const [query, setQuery] = useState('');
  const [edit, setEdit] = useState<PageMeta | null>(null);
  const [form, setForm] = useState({ title: '', description: '' });
  const [saved, setSaved] = useState(false);

  const list = query.trim() ? pages.filter((p) => p.title.includes(query.trim()) || p.path.includes(query.trim())) : pages;

  const toggleStatus = (id: string) =>
    setPages(pages.map((p) => (p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p)));
  const toggleNav = (id: string) => setPages(pages.map((p) => (p.id === id ? { ...p, inNav: !p.inNav } : p)));

  const openEdit = (p: PageMeta) => {
    setEdit(p);
    setForm({ title: p.title, description: p.description });
  };

  const save = () => {
    if (!edit) return;
    setPages(pages.map((p) => (p.id === edit.id ? { ...p, ...form } : p)));
    setEdit(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">مدیریت صفحات</h1>
            <p className="mt-1 text-xs text-slate-400">
              وضعیت «پیش‌نویس» باعث نمایش بنر «در دست آماده‌سازی» در آن صفحه می‌شود؛ لینک‌های منو نیز به‌روزرسانی می‌شوند.
            </p>
          </div>
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی صفحه…"
              className="field-input w-56"
              aria-label="جستجوی صفحه"
            />
          </div>
        </div>
      </Reveal>

      {saved && (
        <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
          <Save className="size-4" aria-hidden />
          تغییرات ذخیره و در سایت اعمال شد
        </p>
      )}

      {list.length === 0 ? (
        <EmptyState title="صفحه‌ای یافت نشد" icon={FileStack} />
      ) : (
        <Reveal>
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th>صفحه</th>
                    <th>مسیر</th>
                    <th>توضیحات SEO</th>
                    <th>وضعیت انتشار</th>
                    <th>نمایش در منو</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <tr key={p.id}>
                      <td className="font-extrabold text-slate-700">{p.title}</td>
                      <td>
                        <Link href={p.path} className="flex items-center gap-1 font-mono text-xs text-[var(--brand-dark)] hover:underline" dir="ltr">
                          {p.path}
                          <ExternalLink className="size-3" aria-hidden />
                        </Link>
                      </td>
                      <td className="max-w-64 truncate text-xs text-slate-400">{p.description}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => toggleStatus(p.id)}
                          className={`badge-soft cursor-pointer ${p.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}
                          aria-label={`تغییر وضعیت ${p.title}`}
                        >
                          {p.status === 'published' ? (
                            <>
                              <Eye className="size-3.5" aria-hidden /> منتشر شده
                            </>
                          ) : (
                            <>
                              <EyeOff className="size-3.5" aria-hidden /> پیش‌نویس
                            </>
                          )}
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => toggleNav(p.id)}
                          className={`relative h-6 w-11 rounded-full transition-colors ${p.inNav ? 'bg-[var(--brand)]' : 'bg-slate-300'}`}
                          role="switch"
                          aria-checked={p.inNav}
                          aria-label={`نمایش ${p.title} در منو`}
                        >
                          <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${p.inNav ? 'right-0.5' : 'right-5'}`} />
                        </button>
                      </td>
                      <td>
                        <button type="button" onClick={() => openEdit(p)} className="btn-soft px-3 py-1.5 text-xs">
                          <PenLine className="size-3.5" aria-hidden />
                          ویرایش
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      )}

      <Modal open={!!edit} onClose={() => setEdit(null)} title={`ویرایش صفحه: ${edit?.title || ''}`}>
        <div className="space-y-4">
          <div>
            <label htmlFor="pg-title" className="field-label">عنوان صفحه</label>
            <input id="pg-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="field-input" />
          </div>
          <div>
            <label htmlFor="pg-desc" className="field-label">توضیحات (Meta Description)</label>
            <textarea id="pg-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="field-input resize-y" />
          </div>
          <button type="button" onClick={save} className="btn-primary w-full py-3">
            <Save className="size-4" aria-hidden />
            ذخیره تغییرات
          </button>
        </div>
      </Modal>
    </div>
  );
}
