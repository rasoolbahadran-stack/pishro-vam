'use client';

// کتابخانه رسانه — آپلود تصویر (تبدیل به dataURL)، افزودن با URL، ویرایش نام/Alt، حذف، پیش‌نمایش و کپی
import { useRef, useState } from 'react';
import { Copy, ImagePlus, Images, Link2, PenLine, Trash2, Upload } from 'lucide-react';
import { Reveal, EmptyState } from '@/components/ui/common';
import { Modal } from '@/components/ui/Modal';
import { useSite } from '@/lib/store';
import type { MediaItem } from '@/lib/types';

const MAX_UPLOAD_BYTES = 400 * 1024; // سقف معقول برای localStorage

export default function AdminMediaPage() {
  const { media, setMedia } = useSite();
  const [urlOpen, setUrlOpen] = useState(false);
  const [urlForm, setUrlForm] = useState({ name: '', alt: '', src: '' });
  const [edit, setEdit] = useState<MediaItem | null>(null);
  const [editForm, setEditForm] = useState({ name: '', alt: '' });
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        setError('فقط فایل تصویری قابل آپلود است');
        return;
      }
      if (file.size > MAX_UPLOAD_BYTES) {
        setError(`حجم فایل «${file.name}» بیشتر از ۴۰۰ کیلوبایت است (محدودیت localStorage)`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const item: MediaItem = {
          id: `med-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          name: file.name,
          alt: file.name.replace(/\.[^.]+$/, ''),
          src: String(reader.result),
          kind: 'upload',
          createdAt: 'همین حالا',
        };
        setMedia([item, ...media]);
        setError('');
      };
      reader.readAsDataURL(file);
    });
  };

  const addByUrl = () => {
    if (!urlForm.src.trim()) {
      setError('آدرس تصویر را وارد کنید');
      return;
    }
    const item: MediaItem = {
      id: `med-${Date.now()}`,
      name: urlForm.name.trim() || 'image-from-url',
      alt: urlForm.alt.trim() || urlForm.name.trim() || 'تصویر',
      src: urlForm.src.trim(),
      kind: 'url',
      createdAt: 'همین حالا',
    };
    setMedia([item, ...media]);
    setUrlOpen(false);
    setUrlForm({ name: '', alt: '', src: '' });
    setError('');
  };

  const saveEdit = () => {
    if (!edit) return;
    setMedia(media.map((m) => (m.id === edit.id ? { ...m, name: editForm.name || m.name, alt: editForm.alt } : m)));
    setEdit(null);
  };

  const remove = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
    if (preview?.id === id) setPreview(null);
  };

  const copySrc = (m: MediaItem) => {
    const full = m.src.startsWith('data:') || m.src.startsWith('http') ? m.src : m.src;
    navigator.clipboard?.writeText(full).catch(() => {});
    setCopied(m.id);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">کتابخانه رسانه</h1>
            <p className="mt-1 text-xs text-slate-400">
              تصاویر آپلود‌شده در مرورگر (localStorage) ذخیره می‌شوند و در بخش‌های سایت قابل استفاده هستند.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setUrlOpen(true)} className="btn-ghost px-4 py-2 text-xs">
              <Link2 className="size-3.5" aria-hidden />
              افزودن با URL
            </button>
            <button type="button" onClick={() => fileRef.current?.click()} className="btn-primary px-4 py-2 text-xs">
              <Upload className="size-3.5" aria-hidden />
              آپلود تصویر
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              aria-label="انتخاب فایل تصویر"
            />
          </div>
        </div>
      </Reveal>

      {error && <p className="rounded-xl bg-red-50 p-3 text-xs font-bold text-red-500">{error}</p>}

      {media.length === 0 ? (
        <EmptyState title="رسانه‌ای وجود ندارد" description="تصویری آپلود کنید یا با URL اضافه کنید" icon={Images} />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((m) => (
            <Reveal key={m.id}>
              <div className="card group overflow-hidden">
                <button
                  type="button"
                  className="block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-slate-50"
                  onClick={() => setPreview(m)}
                  aria-label={`پیش‌نمایش ${m.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.kind === 'url' && !m.src.startsWith('data:') ? m.src : m.src}
                    alt={m.alt}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0.25';
                    }}
                  />
                </button>
                <div className="p-3">
                  <p className="truncate text-xs font-extrabold text-slate-700">{m.name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-400" title={m.alt}>
                    Alt: {m.alt || '—'}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="badge-soft bg-slate-100 text-slate-400">{m.kind === 'upload' ? 'آپلودی' : 'URL'}</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEdit(m);
                          setEditForm({ name: m.name, alt: m.alt });
                        }}
                        className="grid size-7 place-items-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:text-[var(--brand)]"
                        aria-label={`ویرایش ${m.name}`}
                      >
                        <PenLine className="size-3.5" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => copySrc(m)}
                        className="grid size-7 place-items-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:text-[var(--brand)]"
                        aria-label={`کپی آدرس ${m.name}`}
                      >
                        <Copy className="size-3.5" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(m.id)}
                        className="grid size-7 place-items-center rounded-lg border border-red-100 text-red-400 transition-colors hover:bg-red-50"
                        aria-label={`حذف ${m.name}`}
                      >
                        <Trash2 className="size-3.5" aria-hidden />
                      </button>
                    </div>
                  </div>
                  {copied === m.id && <p className="mt-1 text-[11px] font-bold text-emerald-600">آدرس کپی شد</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* مودال افزودن با URL */}
      <Modal open={urlOpen} onClose={() => setUrlOpen(false)} title="افزودن تصویر با URL">
        <div className="space-y-4">
          <div>
            <label htmlFor="m-url" className="field-label">آدرس تصویر *</label>
            <input id="m-url" value={urlForm.src} onChange={(e) => setUrlForm({ ...urlForm, src: e.target.value })} className="field-input" dir="ltr" placeholder="https://…" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="m-name" className="field-label">نام فایل</label>
              <input id="m-name" value={urlForm.name} onChange={(e) => setUrlForm({ ...urlForm, name: e.target.value })} className="field-input" />
            </div>
            <div>
              <label htmlFor="m-alt" className="field-label">متن جایگزین (Alt)</label>
              <input id="m-alt" value={urlForm.alt} onChange={(e) => setUrlForm({ ...urlForm, alt: e.target.value })} className="field-input" />
            </div>
          </div>
          <button type="button" onClick={addByUrl} className="btn-primary w-full py-3">
            <ImagePlus className="size-4" aria-hidden />
            افزودن به کتابخانه
          </button>
        </div>
      </Modal>

      {/* مودال ویرایش */}
      <Modal open={!!edit} onClose={() => setEdit(null)} title="ویرایش اطلاعات رسانه" size="sm">
        <div className="space-y-4">
          <div>
            <label htmlFor="em-name" className="field-label">نام فایل</label>
            <input id="em-name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="field-input" />
          </div>
          <div>
            <label htmlFor="em-alt" className="field-label">متن جایگزین (Alt)</label>
            <input id="em-alt" value={editForm.alt} onChange={(e) => setEditForm({ ...editForm, alt: e.target.value })} className="field-input" />
          </div>
          <button type="button" onClick={saveEdit} className="btn-primary w-full py-3">
            ذخیره
          </button>
        </div>
      </Modal>

      {/* پیش‌نمایش */}
      <Modal open={!!preview} onClose={() => setPreview(null)} title={preview?.name || ''} size="lg">
        {preview && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.src} alt={preview.alt} className="max-h-[50vh] w-full rounded-2xl object-contain" />
            <dl className="mt-4 space-y-1.5 text-xs text-slate-500">
              <div className="flex justify-between"><dt>نام:</dt><dd className="font-bold text-slate-700">{preview.name}</dd></div>
              <div className="flex justify-between"><dt>Alt:</dt><dd className="font-bold text-slate-700">{preview.alt || '—'}</dd></div>
              <div className="flex justify-between"><dt>نوع:</dt><dd className="font-bold text-slate-700">{preview.kind === 'upload' ? 'آپلودی (dataURL)' : 'URL خارجی'}</dd></div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}
