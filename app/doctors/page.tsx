'use client';

// پنل پزشکان — داشبورد، بیماران، خدمات (CRUD + فعال/غیرفعال)، تسویه هفتگی
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  Plus,
  Search,
  Stethoscope,
  ToggleLeft,
  UserRound,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
} from 'recharts';
import { PageHero, Reveal, StatCard, EmptyState } from '@/components/ui/common';
import { Modal } from '@/components/ui/Modal';
import { faMoney, faNum, parseFaDigits } from '@/lib/format';
import { defaultDoctorServices } from '@/lib/data';
import type { DoctorServiceItem } from '@/lib/types';

const patientsSeed = [
  { name: 'محمد علیپور', service: 'ایمپلنت دندان', amount: 25_000_000, date: '۱۴۰۳/۰۱/۱۵', next: '۱۴۰۳/۰۵/۱۵', status: 'در حال بازپرداخت' },
  { name: 'سارا محمدی', service: 'جراحی بینی', amount: 45_000_000, date: '۱۴۰۳/۰۲/۱۰', next: '۱۴۰۳/۰۵/۱۰', status: 'در حال بازپرداخت' },
  { name: 'حسین احمدی', service: 'زانو مصنوعی', amount: 60_000_000, date: '۱۴۰۳/۰۳/۰۱', next: '۱۴۰۳/۰۴/۰۱', status: 'تسویه شده' },
  { name: 'علی صادقی', service: 'لیزیک چشم', amount: 30_000_000, date: '۱۴۰۳/۰۳/۱۰', next: '۱۴۰۳/۰۴/۱۰', status: 'در حال بازپرداخت' },
  { name: 'مریم کاظمی', service: 'عمل آپاندیس', amount: 18_000_000, date: '۱۴۰۲/۱۱/۰۸', next: '—', status: 'تسویه شده' },
];

const revenueTrend = [
  { month: 'خرداد', revenue: 120 },
  { month: 'تیر', revenue: 145 },
  { month: 'مرداد', revenue: 132 },
  { month: 'شهریور', revenue: 168 },
  { month: 'مهر', revenue: 190 },
  { month: 'آبان', revenue: 210 },
];

const tabs = ['داشبورد', 'بیماران', 'خدمات', 'تسویه'] as const;

export default function DoctorsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('داشبورد');
  const [services, setServices] = useState(defaultDoctorServices);
  const [query, setQuery] = useState('');
  const [serviceQuery, setServiceQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<DoctorServiceItem | null>(null);
  const [form, setForm] = useState({ name: '', category: '', basePrice: '', maxInstallments: '12' });
  const [formError, setFormError] = useState('');

  const filteredPatients = useMemo(() => {
    const q = query.trim();
    return q ? patientsSeed.filter((p) => p.name.includes(q) || p.service.includes(q)) : patientsSeed;
  }, [query]);

  const filteredServices = useMemo(() => {
    const q = serviceQuery.trim();
    return q ? services.filter((s) => s.name.includes(q) || s.category.includes(q)) : services;
  }, [services, serviceQuery]);

  const openNew = () => {
    setEditItem(null);
    setForm({ name: '', category: '', basePrice: '', maxInstallments: '12' });
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (s: (typeof services)[number]) => {
    setEditItem(s);
    setForm({ name: s.name, category: s.category, basePrice: faMoney(s.basePrice), maxInstallments: String(s.maxInstallments) });
    setFormError('');
    setModalOpen(true);
  };

  const saveService = () => {
    if (form.name.trim().length < 2 || form.category.trim().length < 2) {
      setFormError('نام و دسته‌بندی الزامی است');
      return;
    }
    const price = parseFaDigits(form.basePrice);
    if (price < 100_000) {
      setFormError('قیمت پایه معتبر وارد کنید');
      return;
    }
    if (editItem) {
      setServices(services.map((s) => (s.id === editItem.id ? { ...s, name: form.name, category: form.category, basePrice: price, maxInstallments: Number(parseFaDigits(form.maxInstallments)) || 6 } : s)));
    } else {
      setServices([
        { id: `ds-${Date.now()}`, name: form.name, category: form.category, basePrice: price, maxInstallments: Number(parseFaDigits(form.maxInstallments)) || 6, enabled: true },
        ...services,
      ]);
    }
    setModalOpen(false);
  };

  const toggleService = (id: string) => setServices(services.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  const removeService = (id: string) => setServices(services.filter((s) => s.id !== id));

  const activeServices = services.filter((s) => s.enabled).length;
  const weeklySettle = 168_000_000;

  return (
    <>
      <PageHero
        badge="پنل پزشکان و کلینیک‌ها"
        title="دکتر سارا موسوی — جراحی زیبایی"
        subtitle="مدیریت بیماران، خدمات اقساطی و تسویه هفتگی — کلینیک شبکه پیشرو وام"
      >
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-primary px-6 py-3" onClick={openNew}>
            <Plus className="size-4" aria-hidden />
            افزودن خدمت پزشکی
          </button>
          <Link href="/doctors/register" className="btn-ghost px-6 py-3">
            ویرایش اطلاعات مطب
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="کل بیماران" value="۳۴۲" hint="از شروع همکاری" icon={Users} />
          <StatCard label="خدمات فعال" value={`${faNum(activeServices)} از ${faNum(services.length)}`} hint="خدمات اقساطی ثبت‌شده" icon={Stethoscope} tone="blue" />
          <StatCard label="در انتظار تسویه" value={`${faMoney(84_000_000 / 1_000_000)} میلیون`} hint="دو هفته اخیر" icon={Banknote} tone="amber" />
          <StatCard label="تسویه شنبه آینده" value={`${faMoney(weeklySettle / 1_000_000)} میلیون`} hint="پردازش خودکار" icon={CalendarDays} tone="slate" />
        </div>
      </section>

      <section className="section-pad bg-[var(--brand-bg)]">
        <div className="container-x">
          {/* تب‌ها */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="بخش‌های پنل پزشک">
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
              <div className="grid gap-6 lg:grid-cols-2">
                <Reveal>
                  <div className="card p-6">
                    <h2 className="text-base font-extrabold text-slate-800">درآمد خدمات ماهانه</h2>
                    <p className="mt-1 text-xs text-slate-400">ارقام به میلیون تومان</p>
                    <div className="mt-4 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueTrend}>
                          <defs>
                            <linearGradient id="docRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
                              <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: 'Vazirmatn' }} />
                          <ReTooltip formatter={(v: number | string) => `${faNum(v)} میلیون تومان`} />
                          <Area type="monotone" dataKey="revenue" stroke="var(--brand)" strokeWidth={2.5} fill="url(#docRev)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={100}>
                  <div className="card p-6">
                    <h2 className="text-base font-extrabold text-slate-800">شرایط همکاری شما</h2>
                    <ul className="mt-4 space-y-3 text-sm">
                      {[
                        'کمیسیون خدمات پزشکی: ۴٪ از مبلغ کل تسهیلات',
                        'تسویه هفتگی در هر روز شنبه',
                        'رتبه‌بندی بیماران بر اساس امتیاز اعتباری',
                        'نمایش مطب شما در فهرست پزشکان شبکه',
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2 rounded-xl bg-slate-50/60 p-3 font-semibold text-slate-600">
                          <UserRound className="mt-0.5 size-4 shrink-0 text-[var(--brand)]" aria-hidden />
                          {t}
                        </li>
                      ))}
                    </ul>
                    <Link href="/doctors/register" className="btn-soft mt-4 w-full justify-center">
                      مشاهده قرارداد
                    </Link>
                  </div>
                </Reveal>
              </div>
            )}

            {tab === 'بیماران' && (
              <Reveal>
                <div className="card overflow-hidden">
                  <div className="border-b border-slate-100 p-4">
                    <div className="relative max-w-sm">
                      <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                      <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجوی بیمار…" className="field-input pr-10" aria-label="جستجوی بیمار" />
                    </div>
                  </div>
                  {filteredPatients.length === 0 ? (
                    <div className="p-6"><EmptyState title="بیماری یافت نشد" icon={Users} /></div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="table-base">
                        <thead>
                          <tr>
                            <th>نام بیمار</th>
                            <th>خدمت</th>
                            <th>مبلغ</th>
                            <th>تاریخ ثبت</th>
                            <th>پرداخت بعدی</th>
                            <th>وضعیت</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPatients.map((p) => (
                            <tr key={p.name}>
                              <td className="font-extrabold text-slate-700">{p.name}</td>
                              <td>{p.service}</td>
                              <td className="font-extrabold text-slate-800">{faMoney(p.amount)} ت</td>
                              <td className="text-slate-400">{p.date}</td>
                              <td className="text-slate-400">{p.next}</td>
                              <td>
                                <span className={`badge-soft ${p.status === 'تسویه شده' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{p.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {tab === 'خدمات' && (
              <Reveal>
                <div className="card overflow-hidden">
                  <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
                    <div className="relative max-w-sm flex-1">
                      <Search className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
                      <input type="search" value={serviceQuery} onChange={(e) => setServiceQuery(e.target.value)} placeholder="جستجوی خدمت…" className="field-input pr-10" aria-label="جستجوی خدمت" />
                    </div>
                    <button type="button" onClick={openNew} className="btn-primary mr-auto px-4 py-2 text-xs">
                      <Plus className="size-3.5" aria-hidden />
                      خدمت جدید
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th>نام خدمت</th>
                          <th>دسته‌بندی</th>
                          <th>قیمت پایه</th>
                          <th>حداکثر اقساط</th>
                          <th>وضعیت</th>
                          <th>عملیات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.map((s) => (
                          <tr key={s.id}>
                            <td className="font-extrabold text-slate-700">{s.name}</td>
                            <td className="text-slate-400">{s.category}</td>
                            <td className="font-extrabold text-slate-800">{faMoney(s.basePrice)} ت</td>
                            <td>{faNum(s.maxInstallments)} ماه</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => toggleService(s.id)}
                                className={`relative h-6 w-11 rounded-full transition-colors ${s.enabled ? 'bg-[var(--brand)]' : 'bg-slate-300'}`}
                                role="switch"
                                aria-checked={s.enabled}
                                aria-label={`فعال‌سازی ${s.name}`}
                              >
                                <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${s.enabled ? 'right-0.5' : 'right-5'}`} />
                              </button>
                            </td>
                            <td>
                              <div className="flex gap-2">
                                <button type="button" onClick={() => openEdit(s)} className="btn-soft px-3 py-1.5 text-xs">ویرایش</button>
                                <button type="button" onClick={() => removeService(s.id)} className="btn-danger px-3 py-1.5 text-xs">حذف</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            )}

            {tab === 'تسویه' && (
              <Reveal>
                <div className="card overflow-hidden">
                  <div className="border-b border-slate-100 p-4">
                    <p className="text-sm font-bold text-slate-700">تسویه‌ها هر هفته شنبه پردازش می‌شوند.</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th>دوره</th>
                          <th>تعداد بیمار</th>
                          <th>مبلغ ناخالص</th>
                          <th>کمیسیون</th>
                          <th>مبلغ خالص</th>
                          <th>وضعیت</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { p: 'هفته اول آذر', c: 9, gross: 210, status: 'در پردازش' },
                          { p: 'هفته چهارم آبان', c: 7, gross: 168, status: 'پرداخت‌شده' },
                          { p: 'هفته سوم آبان', c: 8, gross: 192, status: 'پرداخت‌شده' },
                          { p: 'هفته دوم آبان', c: 6, gross: 144, status: 'پرداخت‌شده' },
                        ].map((r) => (
                          <tr key={r.p}>
                            <td className="font-extrabold text-slate-700">{r.p}</td>
                            <td>{faNum(r.c)} بیمار</td>
                            <td>{faNum(r.gross)} میلیون</td>
                            <td className="text-red-500">−{faNum(Math.round(r.gross * 0.04))} میلیون</td>
                            <td className="font-extrabold text-[var(--brand-dark)]">{faNum(r.gross - Math.round(r.gross * 0.04))} میلیون</td>
                            <td>
                              <span className={`badge-soft ${r.status === 'پرداخت‌شده' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{r.status}</span>
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

      {/* مودال خدمت */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'ویرایش خدمت پزشکی' : 'افزودن خدمت پزشکی'}>
        <div className="space-y-4">
          <div>
            <label htmlFor="svc-name" className="field-label">نام خدمت *</label>
            <input id="svc-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-input" placeholder="مثال: جراحی بینی" />
          </div>
          <div>
            <label htmlFor="svc-cat" className="field-label">دسته‌بندی *</label>
            <input id="svc-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="field-input" placeholder="مثال: دندانپزشکی" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="svc-price" className="field-label">قیمت پایه (تومان)</label>
              <input id="svc-price" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} className="field-input" placeholder="۲۵٬۰۰۰٬۰۰۰" inputMode="numeric" dir="ltr" />
            </div>
            <div>
              <label htmlFor="svc-ins" className="field-label">حداکثر اقساط</label>
              <input id="svc-ins" value={form.maxInstallments} onChange={(e) => setForm({ ...form, maxInstallments: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" />
            </div>
          </div>
          {formError && <p className="text-xs font-semibold text-red-500">{formError}</p>}
          <button type="button" onClick={saveService} className="btn-primary w-full py-3">
            <ToggleLeft className="size-4" aria-hidden />
            ذخیره خدمت
          </button>
        </div>
      </Modal>
    </>
  );
}
