'use client';

// مدیریت درخواست‌ها — تغییر وضعیت (تأیید/رد) با اثر مستقیم بر داشبورد مشتری
import { useMemo, useState } from 'react';
import { BadgeCheck, CircleAlert, ChevronDown, FileSliders, Search, XCircle } from 'lucide-react';
import { Reveal, EmptyState, StatCard } from '@/components/ui/common';
import { useSite } from '@/lib/store';
import { faMoney, faNum } from '@/lib/format';

const statusMeta: Record<string, { text: string; cls: string }> = {
  pending: { text: 'در انتظار بررسی', cls: 'bg-amber-50 text-amber-600' },
  review: { text: 'در حال بررسی', cls: 'bg-blue-50 text-blue-600' },
  approved: { text: 'تأیید شده', cls: 'bg-emerald-50 text-emerald-600' },
  rejected: { text: 'رد شده', cls: 'bg-red-50 text-red-500' },
};

export default function AdminApplicationsPage() {
  const { applications, setApplications } = useSite();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [flash, setFlash] = useState('');

  const list = useMemo(() => {
    const q = query.trim();
    return applications.filter(
      (a) => (status === 'all' || a.status === status) && (!q || a.trackingCode.includes(q) || a.type.includes(q))
    );
  }, [applications, query, status]);

  const setStatusOf = (id: string, next: 'approved' | 'rejected' | 'review' | 'pending') => {
    setApplications(applications.map((a) => (a.id === id ? { ...a, status: next } : a)));
    const app = applications.find((a) => a.id === id);
    setFlash(`وضعیت درخواست ${app?.trackingCode || ''} به «${statusMeta[next].text}» تغییر کرد — در داشبورد مشتری منعکس می‌شود.`);
    setTimeout(() => setFlash(''), 3000);
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">مدیریت درخواست‌ها</h1>
          <p className="mt-1 text-xs text-slate-400">
            درخواست‌هایی که کاربران از صفحه «ثبت درخواست وام» ثبت می‌کنند اینجا قابل بررسی و تأیید هستند.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="کل درخواست‌ها" value={faNum(applications.length)} hint="در سیستم" icon={FileSliders} />
        <StatCard label="در انتظار بررسی" value={faNum(applications.filter((a) => a.status === 'pending').length)} hint="نیازمند اقدام" icon={CircleAlert} tone="amber" />
        <StatCard label="تأییدشده" value={faNum(applications.filter((a) => a.status === 'approved').length)} hint="پردازش شده" icon={BadgeCheck} />
        <StatCard label="ردشده" value={faNum(applications.filter((a) => a.status === 'rejected').length)} hint="از کل پرونده‌ها" icon={XCircle} tone="red" />
      </div>

      {flash && (
        <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-600">
          <BadgeCheck className="size-4" aria-hidden />
          {flash}
        </p>
      )}

      <Reveal>
        <div className="card overflow-hidden">
          <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو کد یا نوع…" className="field-input pr-10" aria-label="جستجوی درخواست" />
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
          {list.length === 0 ? (
            <div className="p-6"><EmptyState title="درخواستی یافت نشد" icon={FileSliders} /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th>کد</th>
                    <th>نوع</th>
                    <th>مبلغ</th>
                    <th>اقساط</th>
                    <th>قسط ماهانه</th>
                    <th>وضعیت فعلی</th>
                    <th>اقدام</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((a) => (
                    <tr key={a.id}>
                      <td className="font-mono font-bold text-slate-600" dir="ltr">{a.trackingCode}</td>
                      <td className="font-semibold text-slate-700">{a.type}</td>
                      <td className="font-extrabold text-slate-800">{faMoney(a.amount)} ت</td>
                      <td>{faNum(a.months)} ماه — {faNum(a.rate)}٪</td>
                      <td>{faMoney(a.monthlyPayment)} ت</td>
                      <td><span className={`badge-soft ${statusMeta[a.status].cls}`}>{statusMeta[a.status].text}</span></td>
                      <td>
                        <div className="flex flex-wrap gap-1.5">
                          <button type="button" onClick={() => setStatusOf(a.id, 'approved')} className="btn bg-emerald-50 px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-100">
                            تأیید
                          </button>
                          <button type="button" onClick={() => setStatusOf(a.id, 'rejected')} className="btn-danger px-3 py-1.5 text-xs">
                            رد
                          </button>
                          <button type="button" onClick={() => setStatusOf(a.id, 'review')} className="btn bg-blue-50 px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-100">
                            بررسی
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
