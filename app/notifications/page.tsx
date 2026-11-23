'use client';

// اعلان‌ها — فیلتر، خواندن، حذف با ذخیره در localStorage
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Banknote,
  Bell,
  BellOff,
  CircleCheck,
  FileText,
  Info,
  PartyPopper,
  Settings,
  Trash2,
} from 'lucide-react';
import { Reveal, EmptyState } from '@/components/ui/common';
import { useSite } from '@/lib/store';

const kindMeta: Record<string, { icon: React.ComponentType<{ className?: string }>; cls: string }> = {
  payment: { icon: Banknote, cls: 'bg-emerald-50 text-emerald-600' },
  approval: { icon: PartyPopper, cls: 'bg-[var(--brand-bg)] text-[var(--brand-dark)]' },
  plan: { icon: FileText, cls: 'bg-blue-50 text-blue-600' },
  system: { icon: Settings, cls: 'bg-slate-100 text-slate-600' },
  profile: { icon: Info, cls: 'bg-amber-50 text-amber-600' },
};

export default function NotificationsPage() {
  const { notifications, setNotifications } = useSite();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const list = useMemo(
    () => (filter === 'unread' ? notifications.filter((n) => !n.read) : notifications),
    [notifications, filter]
  );
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) =>
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const remove = (id: string) => setNotifications(notifications.filter((n) => n.id !== id));
  const markAll = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const clearRead = () => setNotifications(notifications.filter((n) => !n.read));

  return (
    <div className="container-x section-pad max-w-4xl">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">اعلان‌ها</h1>
            <p className="mt-1 text-sm text-slate-500">
              {unreadCount > 0 ? `${unreadCount} اعلان خوانده‌نشده دارید` : 'همه اعلان‌ها خوانده شده‌اند'}
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={markAll} className="btn-ghost px-4 py-2 text-xs" disabled={unreadCount === 0}>
              علامت‌گذاری همه به‌عنوان خوانده‌شده
            </button>
            <button type="button" onClick={clearRead} className="btn-danger px-4 py-2 text-xs">
              حذف خوانده‌شده‌ها
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <div className="flex gap-2" role="tablist" aria-label="فیلتر اعلان‌ها">
          {[
            { id: 'all', label: `همه (${notifications.length})` },
            { id: 'unread', label: `خوانده‌نشده (${unreadCount})` },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id as 'all' | 'unread')}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                filter === t.id ? 'bg-[var(--brand)] text-white shadow-soft' : 'bg-white text-slate-500 hover:bg-slate-50'
              }`}
              role="tab"
              aria-selected={filter === t.id}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-5 space-y-3">
        {list.length === 0 ? (
          <EmptyState title="اعلانی وجود ندارد" description="هنگامی که اعلان جدیدی دریافت کنید اینجا نمایش داده می‌شود" icon={BellOff} />
        ) : (
          list.map((n, i) => {
            const meta = kindMeta[n.kind];
            const Icon = meta.icon;
            return (
              <Reveal key={n.id} delay={i * 40}>
                <div
                  className={`card flex items-start gap-4 p-5 transition-all ${!n.read ? 'border-[var(--brand-soft)] bg-[var(--brand-bg)]' : 'opacity-90'}`}
                >
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${meta.cls}`}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-extrabold text-slate-800">{n.title}</h2>
                      {!n.read && <span className="size-2 rounded-full bg-[var(--brand)]" aria-label="خوانده‌نشده" />}
                    </div>
                    <p className="mt-1.5 text-sm leading-7 text-slate-500">{n.body}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs text-slate-400">{n.time}</span>
                      {n.action && (
                        <Link href="/dashboard" className="text-xs font-bold text-[var(--brand-dark)] hover:underline">
                          {n.action}
                        </Link>
                      )}
                      <div className="mr-auto flex gap-2">
                        {!n.read ? (
                          <button type="button" onClick={() => markRead(n.id)} className="btn-soft px-3 py-1.5 text-xs">
                            <CircleCheck className="size-3.5" aria-hidden />
                            خوانده شد
                          </button>
                        ) : (
                          <span className="badge-soft bg-slate-50 text-slate-400">خوانده‌شده</span>
                        )}
                        <button
                          type="button"
                          onClick={() => remove(n.id)}
                          className="grid size-8 place-items-center rounded-lg border border-red-100 text-red-400 transition-colors hover:bg-red-50"
                          aria-label={`حذف اعلان ${n.title}`}
                        >
                          <Trash2 className="size-3.5" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })
        )}
      </div>
    </div>
  );
}
