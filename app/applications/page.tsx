'use client';

// فهرست درخواست‌های کاربر با جستجو و فیلتر وضعیت + جدول اقساط
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronDown, FileSearch, Plus, Search, Wallet, Banknote } from 'lucide-react';
import { Reveal, EmptyState } from '@/components/ui/common';
import { faMoney, faNum } from '@/lib/format';
import { useSite } from '@/lib/store';

const statusMeta: Record<string, { text: string; cls: string }> = {
  pending: { text: 'در انتظار بررسی', cls: 'bg-amber-50 text-amber-600' },
  review: { text: 'در حال بررسی', cls: 'bg-blue-50 text-blue-600' },
  approved: { text: 'تأیید شده', cls: 'bg-emerald-50 text-emerald-600' },
  rejected: { text: 'رد شده', cls: 'bg-red-50 text-red-500' },
};

export default function ApplicationsPage() {
  const { applications, installments } = useSite();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim();
    return applications.filter(
      (a) => (status === 'all' || a.status === status) && (!q || a.trackingCode.includes(q) || a.type.includes(q))
    );
  }, [applications, query, status]);

  return (
    <div className="container-x section-pad">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">درخواست‌های من</h1>
            <p className="mt-1 text-sm text-slate-500">پیگیری وضعیت پرونده‌ها و اقساط مرتبط</p>
          </div>
          <Link href="/applications/new" className="btn-primary">
            <Plus className="size-4" aria-hidden />
            درخواست جدید
          </Link>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <div className="card overflow-hidden">
          <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجو کد پیگیری یا نوع…"
                className="field-input pr-10"
                aria-label="جستجوی درخواست"
              />
            </div>
            <div className="relative">
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="field-input appearance-none pl-9" aria-label="فیلتر وضعیت">
                <option value="all">همه وضعیت‌ها</option>
                <option value="pending">در انتظار بررسی</option>
                <option value="review">در حال بررسی</option>
                <option value="approved">تأیید شده</option>
                <option value="rejected">رد شده</option>
              </select>
              <ChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="p-6">
              <EmptyState title="درخواستی یافت نشد" description="فیلترها را تغییر دهید یا درخواست جدید ثبت کنید." icon={FileSearch} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th>کد پیگیری</th>
                    <th>نوع درخواست</th>
                    <th>مبلغ</th>
                    <th>اقساط</th>
                    <th>قسط ماهانه</th>
                    <th>تاریخ ثبت</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id} className="transition-colors hover:bg-slate-50/60">
                      <td className="font-mono font-bold text-slate-600" dir="ltr">{a.trackingCode}</td>
                      <td className="font-semibold text-slate-700">{a.type}</td>
                      <td className="font-extrabold text-slate-800">{faMoney(a.amount)} ت</td>
                      <td>{faNum(a.months)} ماه — {faNum(a.rate)}٪</td>
                      <td>{faMoney(a.monthlyPayment)} ت</td>
                      <td className="text-slate-400">{a.createdAt}</td>
                      <td><span className={`badge-soft ${statusMeta[a.status].cls}`}>{statusMeta[a.status].text}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <div className="card p-6">
          <h2 className="text-base font-extrabold text-slate-800">اقساط و چک‌ها</h2>
          <p className="mt-1 text-xs text-slate-400">اقساط همه پرونده‌های فعال</p>
          <div className="mt-4 overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th>شماره قسط</th>
                  <th>پرونده</th>
                  <th>مبلغ</th>
                  <th>سررسید</th>
                  <th>وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {installments.map((ins) => (
                  <tr key={ins.id}>
                    <td className="font-bold text-slate-600">{faNum(ins.number)}</td>
                    <td className="font-mono text-slate-500" dir="ltr">{ins.applicationCode}</td>
                    <td className="font-extrabold text-slate-700">{faMoney(ins.amount)} ت</td>
                    <td className="text-slate-400">{ins.dueDate}</td>
                    <td>
                      <span className={`badge-soft ${ins.paid ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {ins.paid ? 'پرداخت‌شده' : 'در انتظار پرداخت'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <Banknote className="size-4 text-[var(--brand)]" aria-hidden />
            پرداخت آنلاین اقساط از طریق داشبورد مشتری انجام می‌شود.
            <Link href="/dashboard" className="mr-auto flex items-center gap-1 font-bold text-[var(--brand-dark)] hover:underline">
              <Wallet className="size-3.5" aria-hidden />
              رفتن به داشبورد
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
