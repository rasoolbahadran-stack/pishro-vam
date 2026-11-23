'use client';

// پنل سازمان‌ها — کارکنان، تسهیلات، طرح‌های رفاهی (فعال/غیرفعال + حذف)، نمودارها
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  Building2,
  ChevronDown,
  Download,
  Plus,
  Search,
  Users,
  Wallet,
  Trash2,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
} from 'recharts';
import { PageHero, Reveal, StatCard, EmptyState } from '@/components/ui/common';
import { Modal } from '@/components/ui/Modal';
import { faMoney, faNum, parseFaDigits } from '@/lib/format';
import { defaultOrgPlans } from '@/lib/data';

const employeesSeed = [
  { name: 'مریم محمدی', role: 'مدیر مالی', dept: 'مالی', loan: 120, status: 'در حال بازپرداخت', mobile: '۰۹۱۲۱۱۱۱۱۱۱' },
  { name: 'حسین کریمی', role: 'مهندس ارشد', dept: 'فناوری', loan: 80, status: 'تأیید در انتظار', mobile: '۰۹۱۲۲۲۲۲۲۲۲' },
  { name: 'نرگس موسوی', role: 'کارشناس HR', dept: 'منابع انسانی', loan: 0, status: 'بدون تسهیلات', mobile: '۰۹۱۳۳۳۳۳۳۳۳' },
  { name: 'حامد رضایی', role: 'تحلیلگر داده', dept: 'فناوری', loan: 60, status: 'در حال بازپرداخت', mobile: '۰۹۱۴۴۴۴۴۴۴۴' },
  { name: 'زهرا نجفی', role: 'مدیر بازاریابی', dept: 'بازاریابی', loan: 150, status: 'در حال بازپرداخت', mobile: '۰۹۱۵۵۵۵۵۵۵۵' },
  { name: 'امیر تهرانی', role: 'وکیل شرکت', dept: 'حقوقی', loan: 40, status: 'در انتظار تأیید', mobile: '۰۹۱۶۶۶۶۶۶۶۶' },
];

const loanMix = [
  { name: 'وام ازدواج', value: 35, color: 'var(--brand)' },
  { name: 'وام ضروری پزشکی', value: 30, color: '#34d399' },
  { name: 'وام مسکن کارمندی', value: 25, color: '#fbbf24' },
  { name: 'سایر', value: 10, color: '#94a3b8' },
];

const monthlyFlow = [
  { month: 'خرداد', paid: 210 },
  { month: 'تیر', paid: 245 },
  { month: 'مرداد', paid: 230 },
  { month: 'شهریور', paid: 260 },
  { month: 'مهر', paid: 285 },
  { month: 'آبان', paid: 310 },
];

const tabs = ['داشبورد', 'کارکنان', 'طرح‌های رفاهی'] as const;

export default function OrganizationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('داشبورد');
  const [plans, setPlans] = useState(defaultOrgPlans);
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', cap: '100', rate: '18', maxInstallments: '24' });
  const [formError, setFormError] = useState('');

  const departments = ['all', ...new Set(employeesSeed.map((e) => e.dept))];

  const filteredEmployees = useMemo(() => {
    const q = query.trim();
    return employeesSeed.filter(
      (e) => (dept === 'all' || e.dept === dept) && (!q || e.name.includes(q) || e.role.includes(q))
    );
  }, [query, dept]);

  const savePlan = () => {
    if (form.title.trim().length < 2) {
      setFormError('عنوان طرح الزامی است');
      return;
    }
    setPlans([
      {
        id: `op-${Date.now()}`,
        title: form.title,
        category: form.category || 'سایر',
        cap: parseFaDigits(form.cap) || 50,
        rate: parseFaDigits(form.rate) || 18,
        maxInstallments: parseFaDigits(form.maxInstallments) || 24,
        enabled: true,
      },
      ...plans,
    ]);
    setFormError('');
    setModalOpen(false);
  };

  const togglePlan = (id: string) => setPlans(plans.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  const removePlan = (id: string) => setPlans(plans.filter((p) => p.id !== id));

  const activeLoans = employeesSeed.filter((e) => e.loan > 0);
  const totalLoans = activeLoans.reduce((s, e) => s + e.loan, 0);

  return (
    <>
      <PageHero
        badge="پنل مدیریت سازمان"
        title="شرکت پیشرو سرامیک — سازمان تأییدشده"
        subtitle="مدیریت کارکنان، تسهیلات و طرح‌های رفاهی پیشرو وام — کد سازمان: ORG-2025-00142"
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary px-6 py-3" onClick={() => setModalOpen(true)}>
            <Plus className="size-4" aria-hidden />
            طرح رفاهی جدید
          </button>
          <Link href="/organizations/register" className="btn-ghost px-6 py-3">
            ویرایش اطلاعات سازمان
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="کل کارکنان" value="۲۴۸" hint="کارکنان تعریف‌شده" icon={Users} />
          <StatCard label="تسهیلات فعال" value={`${faNum(activeLoans.length)} پرونده`} hint="در حال بازپرداخت" icon={Wallet} tone="blue" />
          <StatCard label="مجموع تسهیلات" value={`${faNum(totalLoans)} میلیارد`} hint="تومان — سال جاری" icon={Building2} tone="amber" />
          <StatCard label="طرح‌های فعال" value={faNum(plans.filter((p) => p.enabled).length)} hint={`از ${faNum(plans.length)} طرح`} icon={Plus} tone="slate" />
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="بخش‌های پنل سازمان">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${tab === t ? 'bg-[var(--brand)] text-white shadow-soft' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                role="tab"
                aria-selected={tab === t}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === 'داشبورد' && (
              <div className="grid gap-6 lg:grid-cols-3">
                <Reveal className="lg:col-span-2">
                  <div className="card p-6">
                    <h2 className="text-base font-extrabold text-slate-800">روند پرداخت ماهانه</h2>
                    <p className="mt-1 text-xs text-slate-400">میلیارد تومان</p>
                    <div className="mt-4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyFlow}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} />
                          <ReTooltip formatter={(v: number | string) => `${faNum(v)} میلیارد تومان`} />
                          <Bar dataKey="paid" name="پرداخت" fill="var(--brand)" radius={[6, 6, 0, 0]} maxBarSize={46} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={100}>
                  <div className="card p-6">
                    <h2 className="text-base font-extrabold text-slate-800">توزیع تسهیلات سازمانی</h2>
                    <p className="mt-1 text-xs text-slate-400">بر اساس هدف دریافت وام</p>
                    <div className="mt-2 h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={loanMix} dataKey="value" innerRadius={44} outerRadius={68} paddingAngle={3} strokeWidth={0}>
                            {loanMix.map((d, i) => (
                              <Cell key={i} fill={d.color} />
                            ))}
                          </Pie>
                          <ReTooltip formatter={(v: number | string) => `${faNum(v)}٪`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {loanMix.map((d) => (
                        <li key={d.name} className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="size-2.5 rounded-full" style={{ background: d.color }} aria-hidden />
                          {d.name} — {faNum(d.value)}٪
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            )}

            {tab === 'کارکنان' && (
              <Reveal>
                <div className="card overflow-hidden">
                  <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-2">
                    <div className="relative">
                      <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                      <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجوی نام یا سمت…" className="field-input pr-10" aria-label="جستجوی کارکنان" />
                    </div>
                    <div className="relative">
                      <select value={dept} onChange={(e) => setDept(e.target.value)} className="field-input appearance-none pl-9" aria-label="دپارتمان">
                        <option value="all">همه دپارتمان‌ها</option>
                        {departments.filter((d) => d !== 'all').map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                    </div>
                  </div>
                  {filteredEmployees.length === 0 ? (
                    <div className="p-6"><EmptyState title="کارمندی یافت نشد" icon={Users} /></div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="table-base">
                        <thead>
                          <tr>
                            <th>نام</th>
                            <th>سمت</th>
                            <th>دپارتمان</th>
                            <th>تسهیلات (م.ت)</th>
                            <th>وضعیت</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEmployees.map((e) => (
                            <tr key={e.name}>
                              <td className="font-extrabold text-slate-700">{e.name}</td>
                              <td>{e.role}</td>
                              <td className="text-slate-400">{e.dept}</td>
                              <td className="font-extrabold text-slate-800">{e.loan > 0 ? faNum(e.loan) : '—'}</td>
                              <td>
                                <span className={`badge-soft ${e.status === 'در حال بازپرداخت' ? 'bg-emerald-50 text-emerald-600' : e.status === 'بدون تسهیلات' ? 'bg-slate-100 text-slate-500' : 'bg-amber-50 text-amber-600'}`}>
                                  {e.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-4">
                    <p className="text-xs text-slate-400">{faNum(filteredEmployees.length)} کارمند نمایش داده می‌شود</p>
                    <button type="button" className="btn-ghost px-4 py-2 text-xs">
                      <Download className="size-3.5" aria-hidden />
                      خروجی Excel
                    </button>
                  </div>
                </div>
              </Reveal>
            )}

            {tab === 'طرح‌های رفاهی' && (
              <Reveal>
                <div className="card overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
                    <h2 className="text-base font-extrabold text-slate-800">لیست طرح‌های رفاهی</h2>
                    <button type="button" onClick={() => setModalOpen(true)} className="btn-primary px-4 py-2 text-xs">
                      <Plus className="size-3.5" aria-hidden />
                      افزودن طرح
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th>عنوان طرح</th>
                          <th>دسته</th>
                          <th>سقف وام (م.ت)</th>
                          <th>نرخ سود</th>
                          <th>حداکثر اقساط</th>
                          <th>وضعیت</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plans.map((p) => (
                          <tr key={p.id}>
                            <td className="font-extrabold text-slate-700">{p.title}</td>
                            <td className="text-slate-400">{p.category}</td>
                            <td className="font-extrabold text-slate-800">{faNum(p.cap)}</td>
                            <td>{faNum(p.rate)}٪</td>
                            <td>{faNum(p.maxInstallments)} ماه</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => togglePlan(p.id)}
                                className={`relative h-6 w-11 rounded-full transition-colors ${p.enabled ? 'bg-[var(--brand)]' : 'bg-slate-300'}`}
                                role="switch"
                                aria-checked={p.enabled}
                                aria-label={`فعال‌سازی ${p.title}`}
                              >
                                <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${p.enabled ? 'right-0.5' : 'right-5'}`} />
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => removePlan(p.id)}
                                className="grid size-8 place-items-center rounded-lg border border-red-100 text-red-400 transition-colors hover:bg-red-50"
                                aria-label={`حذف طرح ${p.title}`}
                              >
                                <Trash2 className="size-3.5" aria-hidden />
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
          </div>
        </div>
      </section>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="افزودن طرح رفاهی جدید">
        <div className="space-y-4">
          <div>
            <label htmlFor="op-title" className="field-label">عنوان طرح *</label>
            <input id="op-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="field-input" placeholder="مثال: وام ازدواج" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="op-cat" className="field-label">دسته‌بندی</label>
              <input id="op-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="field-input" placeholder="ازدواج، پزشکی…" />
            </div>
            <div>
              <label htmlFor="op-cap" className="field-label">سقف وام (م.ت)</label>
              <input id="op-cap" value={form.cap} onChange={(e) => setForm({ ...form, cap: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" />
            </div>
            <div>
              <label htmlFor="op-rate" className="field-label">نرخ سود ٪</label>
              <input id="op-rate" value={form.rate} onChange={(e) => setForm({ ...form, rate: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" />
            </div>
            <div>
              <label htmlFor="op-ins" className="field-label">حداکثر اقساط</label>
              <input id="op-ins" value={form.maxInstallments} onChange={(e) => setForm({ ...form, maxInstallments: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" />
            </div>
          </div>
          {formError && <p className="text-xs font-semibold text-red-500">{formError}</p>}
          <button type="button" onClick={savePlan} className="btn-primary w-full py-3">
            ذخیره طرح
          </button>
        </div>
      </Modal>
    </>
  );
}
