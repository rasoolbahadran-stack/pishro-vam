'use client';

// داشبورد مشتری — آمار، پیشنهاد AI، اقساط با پرداخت نمایشی، نمودارها، پرونده‌های اخیر
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  CircleDollarSign,
  CreditCard,
  FileText,
  FolderOpen,
  Gauge,
  Sparkles,
  Wallet,
  Banknote,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { StatCard, Reveal } from '@/components/ui/common';
import { faMoney, faNum } from '@/lib/format';
import { useSite } from '@/lib/store';


const scoreTrend = [
  { month: 'خرداد', score: 670 },
  { month: 'تیر', score: 688 },
  { month: 'مرداد', score: 702 },
  { month: 'شهریور', score: 715 },
  { month: 'مهر', score: 720 },
  { month: 'آبان', score: 748 },
];

const installmentBars = [
  { name: 'مهر', paid: 3.875, late: 0, pending: 0 },
  { name: 'آبان', paid: 0, late: 4.64, pending: 0 },
  { name: 'آذر', paid: 0, late: 0, pending: 4.64 },
  { name: 'دی', paid: 0, late: 0, pending: 1.97 },
];

const statusLabel: Record<string, { text: string; cls: string }> = {
  pending: { text: 'در انتظار بررسی', cls: 'bg-amber-50 text-amber-600' },
  review: { text: 'در حال بررسی', cls: 'bg-blue-50 text-blue-600' },
  approved: { text: 'تأیید شده', cls: 'bg-emerald-50 text-emerald-600' },
  rejected: { text: 'رد شده', cls: 'bg-red-50 text-red-500' },
};

export default function DashboardPage() {
  const { applications, installments, setInstallments, profile, notifications, setNotifications } = useSite();

  const totalLoans = applications.filter((a) => a.status === 'approved').reduce((s, a) => s + a.amount, 0);
  const paidTotal = installments.filter((i) => i.paid).reduce((s, i) => s + i.amount, 0);
  const unpaid = installments.filter((i) => !i.paid);

  const markPaid = (id: string) => {
    setInstallments(installments.map((i) => (i.id === id ? { ...i, paid: true } : i)));
    setNotifications(
      [
        {
          id: `n-pay-${id}`,
          title: 'پرداخت قسط موفق',
          body: `قسط شما به مبلغ ${faMoney(installments.find((i) => i.id === id)?.amount || 0)} تومان پرداخت شد؛ رسید در پروفایل شما ثبت گردید.`,
          time: 'همین حالا',
          kind: 'payment' as const,
          read: false,
          action: 'مشاهده رسید',
        },
        ...notifications,
      ]
    );
  };

  return (
    <div className="container-x section-pad">
      {/* خوش‌آمد */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              خوش آمدید، <span className="text-[var(--brand-dark)]">{profile.fullName}</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">به داشبورد پیشرو وام خوش آمدید — وضعیت مالی شما در یک نگاه</p>
          </div>
          <Link href="/applications/new" className="btn-primary">
            <Wallet className="size-4" aria-hidden />
            درخواست جدید
          </Link>
        </div>
      </Reveal>

      {/* آمار */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="مجموع تسهیلات" value={`${faMoney(totalLoans / 1_000_000)} میلیون`} hint="تسهیلات دریافتی" icon={CircleDollarSign} />
        <StatCard label="اقساط پرداخت‌شده" value={`${faMoney(paidTotal / 1_000_000)} میلیون`} hint="مجموع تا امروز" icon={BadgeCheck} tone="blue" />
        <StatCard label="امتیاز اعتباری" value={faNum(profile.score)} hint="سطح عالی — رشد ۱۰٪" icon={Gauge} tone="amber" />
        <StatCard label="پرونده‌های فعال" value={faNum(applications.length)} hint="در مسیر بررسی یا بازپرداخت" icon={FolderOpen} tone="slate" />
      </div>

      {/* پیشنهاد AI */}
      <Reveal className="mt-6">
        <div className="card flex flex-col items-start gap-4 border-[var(--brand-soft)] bg-gradient-to-l from-[var(--brand-bg)] to-white p-6 sm:flex-row sm:items-center">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--brand)] text-white shadow-card">
            <Sparkles className="size-6" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-slate-800">پیشنهاد هوش مصنوعی پیشرو</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              بر اساس درآمد و سابقه اعتباری شما، طرح «خرید اقساطی {faNum('۲۴')} ماهه با نرخ {faNum('۲۰')}٪» بهترین گزینه است — قسط ماهانه حدود {faMoney((profile.income * 0.28) )} تومان.
            </p>
          </div>
          <Link href="/applications/new" className="btn-primary shrink-0">
            مشاهده طرح
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* اقساط آینده */}
        <Reveal className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-800">اقساط آینده</h2>
              <Link href="/applications" className="text-xs font-bold text-[var(--brand-dark)] hover:underline">
                همه اقساط
              </Link>
            </div>
            {unpaid.length === 0 ? (
              <p className="mt-6 rounded-2xl bg-emerald-50 p-5 text-center text-sm font-bold text-emerald-600">
                قسطی در انتظار پرداخت ندارید — آفرین!
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-100">
                {unpaid.slice(0, 4).map((ins) => (
                  <li key={ins.id} className="flex flex-wrap items-center gap-3 py-3.5">
                    <span className="grid size-10 place-items-center rounded-xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                      <Banknote className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-slate-700">
                        قسط {faNum(ins.number)} — پرونده {ins.applicationCode}
                      </p>
                      <p className="text-xs text-slate-400">سررسید: {ins.dueDate}</p>
                    </div>
                    <span className="text-sm font-extrabold text-slate-800">{faMoney(ins.amount)} ت</span>
                    <button type="button" className="btn-primary px-4 py-2 text-xs" onClick={() => markPaid(ins.id)}>
                      پرداخت آنلاین
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>

        {/* روند امتیاز */}
        <Reveal delay={100}>
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">روند اعتبارسنجی</h2>
            <p className="mt-1 text-xs text-slate-400">امتیاز اعتباری ۶ ماه گذشته</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreTrend}>
                  <defs>
                    <linearGradient id="dashScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <YAxis domain={[600, 800]} tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <ReTooltip formatter={(v: number | string) => `امتیاز: ${faNum(v)}`} />
                  <Area type="monotone" dataKey="score" stroke="var(--brand)" strokeWidth={2.5} fill="url(#dashScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* وضعیت اقساط ماهانه */}
        <Reveal>
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">وضعیت اقساط ماهانه</h2>
            <p className="mt-1 text-xs text-slate-400">مقایسه پرداخت‌شده، معوق و در انتظار — میلیون تومان</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={installmentBars}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <ReTooltip formatter={(v: number | string) => `${faNum(v)} میلیون تومان`} />
                  <Bar dataKey="paid" name="پرداخت‌شده" stackId="a" fill="var(--brand)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="late" name="معوق" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="در انتظار" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* پرونده‌های اخیر */}
        <Reveal delay={80} className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-800">پرونده‌های اخیر</h2>
              <Link href="/applications" className="flex items-center gap-1 text-xs font-bold text-[var(--brand-dark)] hover:underline">
                مشاهده همه
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th>کد</th>
                    <th>نوع</th>
                    <th>مبلغ</th>
                    <th>اقساط</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 4).map((a) => (
                    <tr key={a.id}>
                      <td className="font-mono font-bold text-slate-600" dir="ltr">{a.trackingCode}</td>
                      <td>{a.type}</td>
                      <td className="font-extrabold text-slate-700">{faMoney(a.amount)} ت</td>
                      <td>{faNum(a.months)} ماه</td>
                      <td>
                        <span className={`badge-soft ${statusLabel[a.status].cls}`}>{statusLabel[a.status].text}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Link href="/applications/new" className="btn-soft justify-center">
                <FileText className="size-4" aria-hidden />
                درخواست وام جدید
              </Link>
              <Link href="/lendtech/card" className="btn-soft justify-center">
                <CreditCard className="size-4" aria-hidden />
                کارت اعتباری
              </Link>
              <Link href="/support" className="btn-soft justify-center">
                پشتیبانی
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
