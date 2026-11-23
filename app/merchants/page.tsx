'use client';

// پنل پذیرندگان — فروش، مشتریان، تسویه‌های هفتگی با درخواست تسویه فوری
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Banknote,
  Download,
  Plus,
  Search,
  Store,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PageHero, Reveal, StatCard, EmptyState } from '@/components/ui/common';
import { faMoney, faNum } from '@/lib/format';

const weeklySales = [
  { w: 'هفته اول آبان', sale: 186, settle: 178 },
  { w: 'هفته دوم آبان', sale: 204, settle: 196 },
  { w: 'هفته سوم آبان', sale: 232, settle: 224 },
  { w: 'هفته چهارم آبان', sale: 218, settle: 210 },
  { w: 'هفته اول آذر', sale: 246, settle: 238 },
];

const monthlyRevenue = [
  { month: 'خرداد', revenue: 420 },
  { month: 'تیر', revenue: 485 },
  { month: 'مرداد', revenue: 460 },
  { month: 'شهریور', revenue: 520 },
  { month: 'مهر', revenue: 580 },
  { month: 'آبان', revenue: 640 },
];

const customersSeed = [
  { name: 'مریم نجفی', id: 'C-10231', purchases: 4, total: 42_000_000, last: '۱۴۰۳/۰۸/۲۲' },
  { name: 'رضا موسوی', id: 'C-10254', purchases: 2, total: 18_500_000, last: '۱۴۰۳/۰۸/۱۸' },
  { name: 'سارا حیدری', id: 'C-10302', purchases: 6, total: 66_000_000, last: '۱۴۰۳/۰۸/۲۵' },
  { name: 'محمد نجفی', id: 'C-10319', purchases: 1, total: 9_800_000, last: '۱۴۰۳/۰۸/۱۵' },
  { name: 'فاطمه صادقی', id: 'C-10345', purchases: 3, total: 31_000_000, last: '۱۴۰۳/۰۸/۲۰' },
];

const settlements = [
  { period: 'هفته اول آذر', count: 12, gross: 246, commission: 15, net: 231, status: 'در انتظار' },
  { period: 'هفته چهارم آبان', count: 10, gross: 218, commission: 13, net: 205, status: 'پرداخت‌شده' },
  { period: 'هفته سوم آبان', count: 13, gross: 232, commission: 14, net: 218, status: 'پرداخت‌شده' },
  { period: 'هفته دوم آبان', count: 11, gross: 204, commission: 12, net: 192, status: 'پرداخت‌شده' },
];

export default function MerchantsPage() {
  const [query, setQuery] = useState('');
  const [requested, setRequested] = useState(false);

  const filtered = query.trim()
    ? customersSeed.filter((c) => c.name.includes(query.trim()) || c.id.toLowerCase().includes(query.trim().toLowerCase()))
    : customersSeed;

  const exportCsv = () => {
    const rows = [['نام مشتری', 'شناسه', 'تعداد خرید', 'مجموع خرید (تومان)', 'آخرین خرید']];
    customersSeed.forEach((c) => rows.push([c.name, c.id, String(c.purchases), String(c.total), c.last]));
    const blob = new Blob(['\uFEFF' + rows.map((r) => r.map((x) => `"${x}"`).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHero
        badge="پنل پذیرندگان"
        title="فروشگاه پیشرو — طرح حرفه‌ای"
        subtitle="مدیریت فروش اقساطی، مشتریان و تسویه‌های هفتگی — کارمزد ۲٪ هر تراکنش"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/merchants/register" className="btn-primary px-6 py-3">
            <Plus className="size-4" aria-hidden />
            افزودن شعبه جدید
          </Link>
          <Link href="/support" className="btn-ghost px-6 py-3">
            ارتباط با مدیر حساب
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="کل مشتریان" value="۴۸۶" hint="با خرید اقساطی" icon={Users} />
          <StatCard label="فروش این ماه" value="۶۴۰ میلیون" hint="مجموع قراردادها" icon={TrendingUp} tone="blue" />
          <StatCard label="تسویه معلق" value="۲۳۱ میلیون" hint="هفته جاری" icon={Banknote} tone="amber" />
          <StatCard label="مشتری این ماه" value="۵۸" hint="خریدار جدید" icon={Store} tone="slate" />
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card p-6">
              <h2 className="text-base font-extrabold text-slate-800">فروش هفتگی</h2>
              <p className="mt-1 text-xs text-slate-400">میلیون تومان — هفته جاری</p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklySales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="w" tick={{ fontSize: 9, fontFamily: 'Vazirmatn' }} />
                    <ReTooltip formatter={(v: number | string) => `${faNum(v)} میلیون تومان`} />
                    <Bar dataKey="sale" name="فروش" fill="var(--brand)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="settle" name="تسویه" fill="#fbbf24" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="card p-6">
              <h2 className="text-base font-extrabold text-slate-800">روند ماهانه</h2>
              <p className="mt-1 text-xs text-slate-400">درآمد ۱۲ ماه اخیر — میلیون تومان</p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} />
                    <YAxis tick={{ fontSize: 10, fontFamily: 'Vazirmatn' }} />
                    <ReTooltip formatter={(v: number | string) => `${faNum(v)} میلیون تومان`} />
                    <Line type="monotone" dataKey="revenue" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* مشتریان */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                  <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو نام، موبایل، شناسه…" className="field-input pr-10" aria-label="جستجوی مشتری" />
                </div>
                <button type="button" onClick={exportCsv} className="btn-ghost mr-auto px-4 py-2 text-xs">
                  <Download className="size-3.5" aria-hidden />
                  خروجی CSV
                </button>
              </div>
              {filtered.length === 0 ? (
                <div className="p-6"><EmptyState title="مشتری‌ای یافت نشد" icon={Users} /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table-base">
                    <thead>
                      <tr>
                        <th>نام مشتری</th>
                        <th>شناسه</th>
                        <th>تعداد خرید</th>
                        <th>مجموع خرید</th>
                        <th>آخرین خرید</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((c) => (
                        <tr key={c.id}>
                          <td className="font-extrabold text-slate-700">{c.name}</td>
                          <td className="font-mono text-slate-400" dir="ltr">{c.id}</td>
                          <td>{faNum(c.purchases)} خرید</td>
                          <td className="font-extrabold text-slate-800">{faMoney(c.total)} ت</td>
                          <td className="text-slate-400">{c.last}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* تسویه‌ها */}
      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
                <h2 className="text-base font-extrabold text-slate-800">تسویه‌های هفتگی</h2>
                <button
                  type="button"
                  onClick={() => setRequested(true)}
                  className="btn-primary px-4 py-2 text-xs"
                  disabled={requested}
                >
                  {requested ? 'درخواست ثبت شد ✓' : 'درخواست تسویه فوری'}
                </button>
              </div>
              {requested && (
                <p className="mx-4 mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-600">
                  درخواست تسویه ثبت شد؛ ظرف ۴۸ ساعت پردازش می‌شود.
                </p>
              )}
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>دوره</th>
                      <th>تعداد تراکنش</th>
                      <th>ناخالص</th>
                      <th>کارمزد</th>
                      <th>مبلغ خالص</th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settlements.map((s) => (
                      <tr key={s.period}>
                        <td className="font-extrabold text-slate-700">{s.period}</td>
                        <td>{faNum(s.count)} تراکنش</td>
                        <td>{faNum(s.gross)} م.ت</td>
                        <td className="text-red-500">−{faNum(s.commission)} م.ت</td>
                        <td className="font-extrabold text-[var(--brand-dark)]">{faNum(s.net)} م.ت</td>
                        <td>
                          <span className={`badge-soft ${s.status === 'پرداخت‌شده' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="p-4 text-xs text-slate-400">
                تسویه‌ها هر هفته یکشنبه پردازش می‌شوند. برای تسویه فوری با پشتیبانی تماس بگیرید.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
