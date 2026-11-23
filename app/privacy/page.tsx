import type { Metadata } from 'next';
import Link from 'next/link';
import { Database, Eye, FileLock2, Share2, Cookie, UserCheck } from 'lucide-react';
import { PageHero, Reveal } from '@/components/ui/common';

export const metadata: Metadata = {
  title: 'حریم خصوصی',
  description: 'سیاست حفظ حریم خصوصی و امنیت اطلاعات کاربران پیشرو وام',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    icon: Database,
    title: 'چه اطلاعاتی جمع‌آوری می‌کنیم؟',
    body: 'برای ارائه خدمات، اطلاعاتی مانند شماره موبایل، اطلاعات هویتی، مدرک درآمدی و سوابق پرداخت جمع‌آوری می‌شود. این اطلاعات فقط برای اعتبارسنجی، انعقاد قرارداد و بهبود خدمات استفاده می‌شود و حداقلِ لازم برای هر فرآیند است.',
  },
  {
    icon: FileLock2,
    title: 'چگونه از اطلاعات محافظت می‌کنیم؟',
    body: 'انتقال داده‌ها با رمزگذاری امن انجام می‌شود و دسترسی کارکنان به اطلاعات، مبتنی بر نقش و نیازمندی است. تمام رویدادهای حساس در لاگ امنیتی ثبت و به‌صورت شبانه‌روزی پایش می‌شوند تا هر رفتار غیرعادی به‌سرعت شناسایی و مهار شود.',
  },
  {
    icon: Share2,
    title: 'اشتراک‌گذاری اطلاعات با اشخاص ثالث',
    body: 'اطلاعات شما فقط با مراجع قانونی (در چارچوب دستور رسمی) و پذیرندگانی که برای تکمیل خرید شما لازم است، به اشتراک گذاشته می‌شود. اطلاعات شما به هیچ عنوان به تبلیغ‌دهندگان یا اشخاص غیرمرتبط فروخته یا اجاره داده نمی‌شود.',
  },
  {
    icon: Cookie,
    title: 'کوکی‌ها و ذخیره‌سازی محلی',
    body: 'برای حفظ نشست، تنظیمات ظاهری و اطلاعات نسخه نمایشی از کوکی و localStorage استفاده می‌کنیم. کاربر می‌تواند این داده‌ها را از تنظیمات مرورگر حذف کند؛ در نسخه نمایشی، داده‌های داشبورد و پنل مدیریت صرفاً در مرورگر خود شما ذخیره می‌شوند.',
  },
  {
    icon: Eye,
    title: 'حقوق کاربران',
    body: 'شما می‌توانید گزارش اطلاعات خود را دریافت کنید، اصلاحات را از طریق پروفایل اعمال کنید یا حذف حساب را درخواست دهید. پردازش درخواست حذف حداکثر در ۳۰ روز انجام می‌شود؛ مگر آنکه تعهد قانونی مانع حذف برخی اسناد مالی باشد.',
  },
  {
    icon: UserCheck,
    title: 'اعلان‌ها و رضایت کاربر',
    body: 'ارسال اعلان‌های پرداخت، وضعیت پرونده و طرح‌های جدید فقط با رضایت شما انجام می‌شود و در هر لحظه می‌توانید نوع اعلان‌ها را از داشبورد مدیریت کنید. برای سؤالات مربوط به حریم خصوصی، با پشتیبانی تماس بگیرید.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        badge="حریم خصوصی"
        title="سیاست حفظ اطلاعات کاربران"
        subtitle="امنیت و محرمانگی اطلاعات کاربران، اصلی‌ترین اولویت پیشرو وام است."
      />
      <section className="section-pad bg-white">
        <div className="container-x max-w-4xl space-y-5">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <article className="card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[var(--brand-bg)] text-[var(--brand-dark)]">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="text-base font-extrabold text-slate-800">{s.title}</h2>
                </div>
                <p className="mt-4 text-sm leading-8 text-slate-600">{s.body}</p>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <p className="rounded-2xl bg-[var(--brand-bg)] p-5 text-sm leading-7 text-[var(--brand-dark)]">
              آخرین بروزرسانی: آبان ۱۴۰۳ — پرسش‌های خود را از طریق صفحه پشتیبانی مطرح کنید.
              <Link href="/support" className="mr-2 font-bold underline underline-offset-4">رفتن به پشتیبانی</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
