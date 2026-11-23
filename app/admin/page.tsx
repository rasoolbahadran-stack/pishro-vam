'use client';

// داشبورد مدیریت — آمار کلی، نمودارها، آخرین درخواست‌ها، هشدارها
import Link from 'next/link';
import {
  ArrowLeft,
  BadgeCheck,
  CircleAlert,
  Clock3,
  FileSliders,
  ShieldAlert,
  Store,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { StatCard, Reveal } from '@/components/ui/common';
import { faMoney, faNum } from '@/lib/format';
import { useSite } from '@/lib/store';

const monthlyApplications = [
  { month: 'خرداد', apps: 240, approved: 168 },
  { month: 'تیر', apps: 265, approved: 190 },
  { month: 'مرداد', apps: 251, approved: 183 },
  { month: 'شهریور', apps: 298, approved: 224 },
  { month: 'مهر', apps: 336, approved: 258 },
  { month: 'آبان', apps: 372, approved: 291 },
];

const revenueBar = [
  { month: 'خرداد', revenue: 1_240 },
  { month: 'تیر', revenue: 1_380 },
  { month: 'مرداد', revenue: 1_290 },
  { month: 'شهریور', revenue: 1_510 },
  { month: 'مهر', revenue: 1_720 },
  { month: 'آبان', revenue: 1_960 },
];

const loanTypeMix = [
  { name: 'خرید اقساطی', value: 42, color: 'var(--brand)' },
  { name: 'وام نقدی', value: 28, color: '#34d399' },
  { name: 'خدمات پزشکی', value: 18, color: '#fbbf24' },
  { name: 'کارت اعتباری', value: 12, color: '#94a3b8' },
];

const statusMeta: Record<string, { text: string; cls: string }> = {
  pending: { text: 'در انتظار بررسی', cls: 'bg-amber-50 text-amber-600' },
  review: { text: 'در حال بررسی', cls: 'bg-blue-50 text-blue-600' },
  approved: { text: 'تأیید شده', cls: 'bg-emerald-50 text-emerald-600' },
  rejected: { text: 'رد شده', cls: 'bg-red-50 text-red-500' },
};

export default function AdminDashboardPage() {
  const { applications, pages, notifications, settings } = useSite();
  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const totalAmount = applications.reduce((s, a) => s + a.amount, 0);

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">داشبورد مدیریت</h1>
            <p className="mt-1 text-xs text-slate-400">نمای کلی عملکرد پلتفرم {settings.siteName}</p>
          </div>
          <span className="badge-soft bg-slate-100 text-slate-500">
            <Clock3 className="size-3.5" aria-hidden />
            آخرین بروزرسانی: همین الان
          </span>
        </div>
      </Reveal>

      {/* آمار */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="کل کاربران" value="۱۲٬۸۴۰" hint="کاربر ثبت‌نام‌شده" icon={Users} />
        <StatCard label="درخواست معلق" value={faNum(pendingCount)} hint="نیازمند بررسی" icon={FileSliders} tone="amber" />
        <StatCard label="مبلغ پرونده‌ها" value={`${faMoney(totalAmount / 1_000_000)} میلیون`} hint="تومان — کل" icon={Wallet} tone="blue" />
        <StatCard label="عاملین فعال" value="۲٬۵۱۲" hint="فروشگاه، پزشک، سازمان" icon={Store} />
      </div>

      {/* نمودارها */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">درخواست‌ها در برابر تأییدشده‌ها</h2>
            <p className="mt-1 text-xs text-slate-400">روند ماهانه — سال ۱۴۰۳</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyApplications}>
                  <defs>
                    <linearGradient id="admApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="admOk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <ReTooltip formatter={(v: number | string) => faNum(v)} />
                  <Area type="monotone" dataKey="apps" name="درخواست" stroke="var(--brand)" strokeWidth={2.5} fill="url(#admApps)" />
                  <Area type="monotone" dataKey="approved" name="تأییدشده" stroke="#fbbf24" strokeWidth={2.5} fill="url(#admOk)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">توزیع نوع وام</h2>
            <p className="mt-1 text-xs text-slate-400">سهم هر سرویس از کل درخواست‌ها</p>
            <div className="mt-2 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={loanTypeMix} dataKey="value" innerRadius={42} outerRadius={66} paddingAngle={3} strokeWidth={0}>
                    {loanTypeMix.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <ReTooltip formatter={(v: number | string) => `${faNum(v)}٪`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-1.5">
              {loanTypeMix.map((d) => (
                <li key={d.name} className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="size-2.5 rounded-full" style={{ background: d.color }} aria-hidden />
                  {d.name} — {faNum(d.value)}٪
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* درآمد */}
        <Reveal>
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">درآمد ماهانه</h2>
            <p className="mt-1 text-xs text-slate-400">میلیون تومان — سال ۱۴۰۳</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueBar}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                  <ReTooltip formatter={(v: number | string) => `${faNum(v)} م.ت`} />
                  <Bar dataKey="revenue" name="درآمد" fill="var(--brand)" radius={[6, 6, 0, 0]} maxBarSize={34} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* آخرین درخواست‌ها */}
        <Reveal delay={80}>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-800">آخرین درخواست‌ها</h2>
              <Link href="/admin/applications" className="flex items-center gap-1 text-xs font-bold text-[var(--brand-dark)] hover:underline">
                مشاهده همه
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-slate-100">
              {applications.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold text-slate-700" dir="ltr">{a.trackingCode}</p>
                    <p className="truncate text-xs text-slate-400">{a.type} — {faMoney(a.amount)} ت</p>
                  </div>
                  <span className={`badge-soft ${statusMeta[a.status].cls}`}>{statusMeta[a.status].text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* هشدارها */}
        <Reveal delay={140}>
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-800">هشدارهای فعال</h2>
            <ul className="mt-4 space-y-3">
              {[
                { icon: ShieldAlert, text: '۳ تلاش ورود مشکوک مسدود شد', tone: 'bg-red-50 text-red-500' },
                { icon: CircleAlert, text: '۲ درخواست نیاز به مدارک دارد', tone: 'bg-amber-50 text-amber-600' },
                { icon: TrendingUp, text: 'رشد ۱۲٪ درخواست‌ها نسبت به ماه قبل', tone: 'bg-emerald-50 text-emerald-600' },
                { icon: BadgeCheck, text: 'تسویه هفتگی عاملین پردازش شد', tone: 'bg-blue-50 text-blue-600' },
              ].map((w) => (
                <li key={w.text} className={`flex items-start gap-2.5 rounded-xl p-3 text-xs font-bold ${w.tone}`}>
                  <w.icon className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {w.text}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              وضعیت صفحات: {faNum(pages.filter((p) => p.status === 'published').length)} منتشر شده از {faNum(pages.length)}
              {' — '}
              {faNum(notifications.length)} اعلان کاربران
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
