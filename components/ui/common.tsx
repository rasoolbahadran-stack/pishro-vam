'use client';

// اجزای مشترک UI — انیمیشن ورود با اسکرول، تیتر بخش، هدر صفحات داخلی، حالت خالی
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

/** نمایش تدریجی هنگام اسکرول (سازگار با Reduced Motion) */
export function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** تیتر استاندارد بخش‌ها */
export function SectionHeading({ title, subtitle, center = true }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      <span className="badge-soft bg-[var(--brand-bg)] text-[var(--brand-dark)]">پیشرو وام</span>
      <h2 className="mt-3 text-2xl font-extrabold text-slate-800 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">{subtitle}</p>}
    </Reveal>
  );
}

/** هدر صفحات داخلی با breadcrumb */
export function PageHero({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'radial-gradient(60% 90% at 85% 0%, var(--brand-bg), transparent 60%)' }}
        aria-hidden
      />
      <div className="container-x relative py-10 sm:py-14">
        <nav className="flex items-center gap-1 text-xs text-slate-400" aria-label="مسیر صفحه">
          <Link href="/" className="transition-colors hover:text-[var(--brand)]">
            خانه
          </Link>
          <ChevronLeft className="size-3.5" aria-hidden />
          <span className="font-semibold text-slate-600">{title}</span>
        </nav>
        {badge && (
          <span className="badge-soft mt-4 bg-[var(--brand-bg)] text-[var(--brand-dark)]">{badge}</span>
        )}
        <h1 className="mt-3 text-2xl font-extrabold text-slate-800 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

/** حالت خالی جداول و لیست‌ها */
export function EmptyState({ title, description, icon: Icon }: { title: string; description?: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-12 text-center">
      {Icon && (
        <span className="grid size-12 place-items-center rounded-xl bg-slate-50 text-slate-300" aria-hidden>
          <Icon className="size-6" />
        </span>
      )}
      <p className="mt-3 text-sm font-bold text-slate-600">{title}</p>
      {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
    </div>
  );
}

/** ست آماری */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'brand',
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: 'brand' | 'amber' | 'blue' | 'red' | 'slate';
}) {
  const tones: Record<string, string> = {
    brand: 'bg-[var(--brand-bg)] text-[var(--brand-dark)]',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-500',
    slate: 'bg-slate-100 text-slate-600',
  };
  return (
    <div className="card p-5 transition-shadow hover:shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`} aria-hidden>
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-800">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
