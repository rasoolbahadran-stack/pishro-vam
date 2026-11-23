'use client';

// مودال با انیمیشن، بستن با Escape و قفل اسکرول — دسترس‌پذیر
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function Modal({
  open,
  onClose,
  title,
  children,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' } as const;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 animate-fade-in bg-slate-900/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        className={`relative z-10 w-full ${widths[size]} max-h-[88vh] animate-scale-in overflow-y-auto rounded-t-3xl bg-white p-6 shadow-lift sm:rounded-3xl`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
            aria-label="بستن"
          >
            <X className="size-4.5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
