'use client';

// مدیریت محتوا — CRUD کامل برای خدمات، نظرات، سؤالات پرتکرار و طرح‌ها
// با جستجو، فیلتر وضعیت و فعال/غیرفعال‌سازی؛ مستقیماً در سایت اعمال می‌شود.
import { useMemo, useState } from 'react';
import { ChevronDown, MessageSquareQuote, PenLine, Plus, Save, Search, Star, Trash2 } from 'lucide-react';
import { Reveal, EmptyState } from '@/components/ui/common';
import { Modal } from '@/components/ui/Modal';
import { useSite } from '@/lib/store';
import { faNum } from '@/lib/format';
import type { FaqItem, PlanItem, ServiceItem, TestimonialItem } from '@/lib/types';

type Tab = 'services' | 'testimonials' | 'faqs' | 'plans';

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'services', label: 'خدمات' },
  { id: 'testimonials', label: 'نظرات کاربران' },
  { id: 'faqs', label: 'سؤالات پرتکرار' },
  { id: 'plans', label: 'طرح‌های وام' },
];

const serviceIcons = ['Banknote', 'ShoppingBag', 'Stethoscope', 'CreditCard', 'Car', 'TrendingUp'];

export default function AdminContentPage() {
  const site = useSite();
  const [tab, setTab] = useState<Tab>('services');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'on' | 'off'>('all');
  const [saved, setSaved] = useState(false);

  // مودال عمومی
  const [modalOpen, setModalOpen] = useState(false);
  const [editKind, setEditKind] = useState<Tab>('services');
  const [editId, setEditId] = useState<string | null>(null);
  const [svc, setSvc] = useState({ title: '', description: '', icon: 'Banknote', href: '/applications/new' });
  const [tst, setTst] = useState({ name: '', role: '', text: '', rating: 5 });
  const [faq, setFaq] = useState({ question: '', answer: '' });
  const [plan, setPlan] = useState({ name: '', months: '12', rate: '20', features: '', popular: false });
  const [formError, setFormError] = useState('');

  const flash = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const filterList = <T extends { enabled: boolean }>(items: T[], text: (item: T) => string) =>
    items.filter(
      (item) =>
        (statusFilter === 'all' || (statusFilter === 'on' ? item.enabled : !item.enabled)) &&
        (!query.trim() || text(item).includes(query.trim()))
    );

  const services = useMemo(() => filterList(site.services, (s: ServiceItem) => `${s.title} ${s.description}`), [site.services, query, statusFilter]);
  const testimonials = useMemo(() => filterList(site.testimonials, (t: TestimonialItem) => `${t.name} ${t.role} ${t.text}`), [site.testimonials, query, statusFilter]);
  const faqs = useMemo(() => filterList(site.faqs, (f: FaqItem) => `${f.question} ${f.answer}`), [site.faqs, query, statusFilter]);
  const plans = useMemo(() => filterList(site.plans, (p: PlanItem) => `${p.name} ${p.features.join(' ')}`), [site.plans, query, statusFilter]);

  const openNew = () => {
    setEditKind(tab);
    setEditId(null);
    setFormError('');
    setSvc({ title: '', description: '', icon: 'Banknote', href: '/applications/new' });
    setTst({ name: '', role: '', text: '', rating: 5 });
    setFaq({ question: '', answer: '' });
    setPlan({ name: '', months: '12', rate: '20', features: '', popular: false });
    setModalOpen(true);
  };

  const openEdit = (kind: Tab, id: string) => {
    setEditKind(kind);
    setEditId(id);
    setFormError('');
    if (kind === 'services') {
      const s = site.services.find((x) => x.id === id)!;
      setSvc({ title: s.title, description: s.description, icon: s.icon, href: s.href });
    } else if (kind === 'testimonials') {
      const t = site.testimonials.find((x) => x.id === id)!;
      setTst({ name: t.name, role: t.role, text: t.text, rating: t.rating });
    } else if (kind === 'faqs') {
      const f = site.faqs.find((x) => x.id === id)!;
      setFaq({ question: f.question, answer: f.answer });
    } else {
      const p = site.plans.find((x) => x.id === id)!;
      setPlan({ name: p.name, months: String(p.months), rate: String(p.rate), features: p.features.join('، '), popular: p.popular });
    }
    setModalOpen(true);
  };

  const save = () => {
    const id = editId || `new-${Date.now()}`;
    if (editKind === 'services') {
      if (svc.title.trim().length < 2 || svc.description.trim().length < 5) return setFormError('عنوان و توضیحات را کامل وارد کنید');
      const item: ServiceItem = { id, title: svc.title, description: svc.description, icon: svc.icon, href: svc.href, enabled: true };
      site.setServices(editId ? site.services.map((x) => (x.id === editId ? { ...x, ...item } : x)) : [item, ...site.services]);
    } else if (editKind === 'testimonials') {
      if (tst.name.trim().length < 2 || tst.text.trim().length < 10) return setFormError('نام و متن نظر را کامل وارد کنید');
      const item: TestimonialItem = { id, name: tst.name, role: tst.role || 'کاربر', text: tst.text, rating: tst.rating, enabled: true };
      site.setTestimonials(editId ? site.testimonials.map((x) => (x.id === editId ? { ...x, ...item } : x)) : [item, ...site.testimonials]);
    } else if (editKind === 'faqs') {
      if (faq.question.trim().length < 5 || faq.answer.trim().length < 10) return setFormError('سؤال و پاسخ را کامل وارد کنید');
      const item: FaqItem = { id, question: faq.question, answer: faq.answer, enabled: true };
      site.setFaqs(editId ? site.faqs.map((x) => (x.id === editId ? { ...x, ...item } : x)) : [item, ...site.faqs]);
    } else {
      if (plan.name.trim().length < 2) return setFormError('نام طرح الزامی است');
      const item: PlanItem = {
        id,
        name: plan.name,
        months: Number(plan.months) || 12,
        rate: Number(plan.rate) || 20,
        features: plan.features.split(/[،,]/).map((f) => f.trim()).filter(Boolean),
        popular: plan.popular,
        enabled: true,
      };
      site.setPlans(editId ? site.plans.map((x) => (x.id === editId ? { ...x, ...item } : x)) : [item, ...site.plans]);
    }
    setModalOpen(false);
    flash();
  };

  const remove = (kind: Tab, id: string) => {
    if (kind === 'services') site.setServices(site.services.filter((x) => x.id !== id));
    if (kind === 'testimonials') site.setTestimonials(site.testimonials.filter((x) => x.id !== id));
    if (kind === 'faqs') site.setFaqs(site.faqs.filter((x) => x.id !== id));
    if (kind === 'plans') site.setPlans(site.plans.filter((x) => x.id !== id));
  };

  const toggle = (kind: Tab, id: string) => {
    if (kind === 'services') site.setServices(site.services.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));
    if (kind === 'testimonials') site.setTestimonials(site.testimonials.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));
    if (kind === 'faqs') site.setFaqs(site.faqs.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));
    if (kind === 'plans') site.setPlans(site.plans.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));
  };

  const counts: Record<Tab, number> = {
    services: site.services.length,
    testimonials: site.testimonials.length,
    faqs: site.faqs.length,
    plans: site.plans.length,
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">مدیریت محتوا</h1>
            <p className="mt-1 text-xs text-slate-400">ایجاد، ویرایش و حذف محتوای بخش‌های مختلف سایت</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {saved && (
              <span className="badge-soft bg-emerald-50 text-emerald-600">
                <Save className="size-3.5" aria-hidden />
                ذخیره شد
              </span>
            )}
            <button type="button" onClick={openNew} className="btn-primary px-4 py-2 text-xs">
              <Plus className="size-3.5" aria-hidden />
              افزودن آیتم جدید
            </button>
          </div>
        </div>
      </Reveal>

      {/* تب‌ها + فیلترها */}
      <Reveal>
        <div className="card flex flex-wrap items-center gap-3 p-4">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="دسته محتوا">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${tab === t.id ? 'bg-[var(--brand)] text-white shadow-soft' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                role="tab"
                aria-selected={tab === t.id}
              >
                {t.label} ({faNum(counts[t.id])})
              </button>
            ))}
          </div>
          <div className="mr-auto flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجو…" className="field-input w-44 py-2 pr-9 text-xs" aria-label="جستجوی محتوا" />
            </div>
            <div className="relative">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | 'on' | 'off')} className="field-input w-36 appearance-none py-2 pl-8 text-xs" aria-label="فیلتر وضعیت">
                <option value="all">همه وضعیت‌ها</option>
                <option value="on">فعال</option>
                <option value="off">غیرفعال</option>
              </select>
              <ChevronDown className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" aria-hidden />
            </div>
          </div>
        </div>
      </Reveal>

      {/* جدول‌ها */}
      {tab === 'services' && (
        <TableCard empty={services.length === 0} headers={['عنوان', 'توضیحات', 'لینک', 'وضعیت', 'عملیات']}>
          {services.map((s) => (
            <tr key={s.id}>
              <td className="font-extrabold text-slate-700">{s.title}</td>
              <td className="max-w-72 truncate text-xs text-slate-400">{s.description}</td>
              <td className="font-mono text-xs text-[var(--brand-dark)]" dir="ltr">{s.href}</td>
              <td><Toggle on={s.enabled} onClick={() => toggle('services', s.id)} label={s.title} /></td>
              <td>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit('services', s.id)} className="btn-soft px-3 py-1.5 text-xs"><PenLine className="size-3.5" aria-hidden />ویرایش</button>
                  <button type="button" onClick={() => remove('services', s.id)} className="btn-danger px-3 py-1.5 text-xs"><Trash2 className="size-3.5" aria-hidden />حذف</button>
                </div>
              </td>
            </tr>
          ))}
        </TableCard>
      )}

      {tab === 'testimonials' && (
        <TableCard empty={testimonials.length === 0} headers={['نام', 'نقش', 'متن', 'امتیاز', 'وضعیت', 'عملیات']}>
          {testimonials.map((t) => (
            <tr key={t.id}>
              <td className="font-extrabold text-slate-700">{t.name}</td>
              <td className="text-slate-400">{t.role}</td>
              <td className="max-w-72 truncate text-xs text-slate-500">{t.text}</td>
              <td>
                <span className="flex items-center gap-0.5" aria-label={`امتیاز ${faNum(t.rating)} از ۵`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-3.5 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} aria-hidden />
                  ))}
                </span>
              </td>
              <td><Toggle on={t.enabled} onClick={() => toggle('testimonials', t.id)} label={t.name} /></td>
              <td>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit('testimonials', t.id)} className="btn-soft px-3 py-1.5 text-xs"><PenLine className="size-3.5" aria-hidden />ویرایش</button>
                  <button type="button" onClick={() => remove('testimonials', t.id)} className="btn-danger px-3 py-1.5 text-xs"><Trash2 className="size-3.5" aria-hidden />حذف</button>
                </div>
              </td>
            </tr>
          ))}
        </TableCard>
      )}

      {tab === 'faqs' && (
        <TableCard empty={faqs.length === 0} headers={['سؤال', 'پاسخ', 'وضعیت', 'عملیات']}>
          {faqs.map((f) => (
            <tr key={f.id}>
              <td className="font-extrabold text-slate-700">{f.question}</td>
              <td className="max-w-80 truncate text-xs text-slate-400">{f.answer}</td>
              <td><Toggle on={f.enabled} onClick={() => toggle('faqs', f.id)} label={f.question} /></td>
              <td>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit('faqs', f.id)} className="btn-soft px-3 py-1.5 text-xs"><PenLine className="size-3.5" aria-hidden />ویرایش</button>
                  <button type="button" onClick={() => remove('faqs', f.id)} className="btn-danger px-3 py-1.5 text-xs"><Trash2 className="size-3.5" aria-hidden />حذف</button>
                </div>
              </td>
            </tr>
          ))}
        </TableCard>
      )}

      {tab === 'plans' && (
        <TableCard empty={plans.length === 0} headers={['نام طرح', 'اقساط', 'نرخ', 'امکانات', 'پیشنهادی', 'وضعیت', 'عملیات']}>
          {plans.map((p) => (
            <tr key={p.id}>
              <td className="font-extrabold text-slate-700">{p.name}</td>
              <td>{faNum(p.months)} ماه</td>
              <td>{faNum(p.rate)}٪</td>
              <td className="max-w-64 truncate text-xs text-slate-400">{p.features.join('، ')}</td>
              <td>
                <button
                  type="button"
                  onClick={() => site.setPlans(site.plans.map((x) => (x.id === p.id ? { ...x, popular: !x.popular } : x)))}
                  className={`badge-soft cursor-pointer ${p.popular ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'}`}
                >
                  {p.popular ? 'پیشنهاد AI' : 'عادی'}
                </button>
              </td>
              <td><Toggle on={p.enabled} onClick={() => toggle('plans', p.id)} label={p.name} /></td>
              <td>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit('plans', p.id)} className="btn-soft px-3 py-1.5 text-xs"><PenLine className="size-3.5" aria-hidden />ویرایش</button>
                  <button type="button" onClick={() => remove('plans', p.id)} className="btn-danger px-3 py-1.5 text-xs"><Trash2 className="size-3.5" aria-hidden />حذف</button>
                </div>
              </td>
            </tr>
          ))}
        </TableCard>
      )}

      {/* مودال ویرایش/ایجاد */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editId ? 'ویرایش' : 'افزودن'} ${
          editKind === 'services' ? 'خدمت' : editKind === 'testimonials' ? 'نظر کاربر' : editKind === 'faqs' ? 'سؤال پرتکرار' : 'طرح وام'
        }`}
      >
        {editKind === 'services' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="c-svc-t" className="field-label">عنوان *</label>
              <input id="c-svc-t" value={svc.title} onChange={(e) => setSvc({ ...svc, title: e.target.value })} className="field-input" />
            </div>
            <div>
              <label htmlFor="c-svc-d" className="field-label">توضیحات *</label>
              <textarea id="c-svc-d" value={svc.description} onChange={(e) => setSvc({ ...svc, description: e.target.value })} rows={3} className="field-input resize-y" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-svc-i" className="field-label">آیکون</label>
                <select id="c-svc-i" value={svc.icon} onChange={(e) => setSvc({ ...svc, icon: e.target.value })} className="field-input">
                  {serviceIcons.map((ic) => (
                    <option key={ic} value={ic}>{ic}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="c-svc-h" className="field-label">لینک</label>
                <input id="c-svc-h" value={svc.href} onChange={(e) => setSvc({ ...svc, href: e.target.value })} className="field-input" dir="ltr" />
              </div>
            </div>
          </div>
        )}
        {editKind === 'testimonials' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-tst-n" className="field-label">نام *</label>
                <input id="c-tst-n" value={tst.name} onChange={(e) => setTst({ ...tst, name: e.target.value })} className="field-input" />
              </div>
              <div>
                <label htmlFor="c-tst-r" className="field-label">نقش</label>
                <input id="c-tst-r" value={tst.role} onChange={(e) => setTst({ ...tst, role: e.target.value })} className="field-input" placeholder="مثال: مدیر فروشگاه" />
              </div>
            </div>
            <div>
              <label htmlFor="c-tst-t" className="field-label">متن نظر *</label>
              <textarea id="c-tst-t" value={tst.text} onChange={(e) => setTst({ ...tst, text: e.target.value })} rows={3} className="field-input resize-y" />
            </div>
            <div>
              <label htmlFor="c-tst-s" className="field-label">امتیاز (۱ تا ۵)</label>
              <select id="c-tst-s" value={tst.rating} onChange={(e) => setTst({ ...tst, rating: Number(e.target.value) })} className="field-input">
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{faNum(r)}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        {editKind === 'faqs' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="c-faq-q" className="field-label">سؤال *</label>
              <input id="c-faq-q" value={faq.question} onChange={(e) => setFaq({ ...faq, question: e.target.value })} className="field-input" />
            </div>
            <div>
              <label htmlFor="c-faq-a" className="field-label">پاسخ *</label>
              <textarea id="c-faq-a" value={faq.answer} onChange={(e) => setFaq({ ...faq, answer: e.target.value })} rows={4} className="field-input resize-y" />
            </div>
          </div>
        )}
        {editKind === 'plans' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="c-plan-n" className="field-label">نام طرح *</label>
              <input id="c-plan-n" value={plan.name} onChange={(e) => setPlan({ ...plan, name: e.target.value })} className="field-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-plan-m" className="field-label">تعداد اقساط</label>
                <input id="c-plan-m" value={plan.months} onChange={(e) => setPlan({ ...plan, months: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" />
              </div>
              <div>
                <label htmlFor="c-plan-r" className="field-label">نرخ سود ٪</label>
                <input id="c-plan-r" value={plan.rate} onChange={(e) => setPlan({ ...plan, rate: e.target.value })} className="field-input" inputMode="numeric" dir="ltr" />
              </div>
            </div>
            <div>
              <label htmlFor="c-plan-f" className="field-label">امکانات (با ، جدا کنید)</label>
              <input id="c-plan-f" value={plan.features} onChange={(e) => setPlan({ ...plan, features: e.target.value })} className="field-input" placeholder="اقساط ۱۲ ماهه، پشتیبانی استاندارد" />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={plan.popular} onChange={(e) => setPlan({ ...plan, popular: e.target.checked })} className="accent-[var(--brand)]" />
              نمایش به‌عنوان طرح پیشنهادی
            </label>
          </div>
        )}
        {formError && <p className="mt-3 text-xs font-semibold text-red-500">{formError}</p>}
        <button type="button" onClick={save} className="btn-primary mt-5 w-full py-3">
          <Save className="size-4" aria-hidden />
          ذخیره و اعمال در سایت
        </button>
      </Modal>
    </div>
  );
}

function TableCard({ headers, children, empty }: { headers: string[]; children: React.ReactNode; empty: boolean }) {
  return (
    <Reveal>
      <div className="card overflow-hidden">
        {empty ? (
          <div className="p-6">
            <EmptyState title="آیتمی یافت نشد" description="فیلترها را تغییر دهید یا آیتم جدیدی اضافه کنید." icon={MessageSquareQuote} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  {headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        )}
      </div>
    </Reveal>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-[var(--brand)]' : 'bg-slate-300'}`}
      role="switch"
      aria-checked={on}
      aria-label={`فعال‌سازی ${label}`}
    >
      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${on ? 'right-0.5' : 'right-5'}`} />
    </button>
  );
}
