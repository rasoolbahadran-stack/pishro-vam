import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck, Lock, Coins, Scale, CircleAlert } from 'lucide-react';
import { PageHero, Reveal } from '@/components/ui/common';

export const metadata: Metadata = {
  title: 'قوانین و مقررات',
  description: 'قوانین و مقررات استفاده از خدمات پیشرو وام',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    icon: FileText,
    title: '۱. تعاریف و شمول قرارداد',
    body: 'استفاده از وب‌سایت و خدمات پیشرو وام به معنای پذیرش کامل این مقررات است. «کاربر» به شخصی گفته می‌شود که با شماره موبایل و اطلاعات هویتی خود در پلتفرم حساب ایجاد می‌کند. خدمات شامل معرفی طرح‌های اقساطی، اعتبارسنجی اولیه، اتصال به فروشگاه‌ها و پزشکان طرف قرارداد و مدیریت بازپرداخت است.',
  },
  {
    icon: Scale,
    title: '۲. شرایط دریافت تسهیلات',
    body: 'تأیید نهایی هر درخواست وام منوط به بررسی مدارک، استعلام‌های قانونی و تشخیص سیستم اعتبارسنجی است. مبلغ، نرخ سود و تعداد اقساط هر طرح در قرارداد الکترونیک مربوط درج می‌شود و امضای دیجیتال کاربر به منزله تعهد قانونی است. تأخیر در پرداخت اقساط مشمول جریمه درج‌شده در قرارداد خواهد بود.',
  },
  {
    icon: Coins,
    title: '۳. پرداخت، تسویه و بازپرداخت زودهنگام',
    body: 'اقساط در سررسیدهای تعیین‌شده از درگاه پرداخت رسمی یا حساب کاربر تسویه می‌شود. کاربر می‌تواند هر زمان تسویه زودهنگام را بدون جریمه انجام دهد؛ در این حالت بخشی از سود باقی‌مانده به‌صورت خودکار محاسبه و کسر می‌شود. رسید پرداخت‌ها در پروفایل کاربر قابل مشاهده و دانلود است.',
  },
  {
    icon: Lock,
    title: '۴. امنیت حساب کاربری',
    body: 'مسئولیت حفظ اطلاعات ورود و کدهای پیامکی بر عهده کاربر است. در صورت مشاهده فعالیت مشکوک، پلتفرم می‌تواند به‌صورت موقت دسترسی حساب را محدود کند. قفل کارت اعتباری، مدیریت سرویس‌ها و تغییر تنظیمات امنیتی از طریق داشبورد انجام می‌شود.',
  },
  {
    icon: CircleAlert,
    title: '۵. مسؤولیت‌ها و محدودیت‌ها',
    body: 'اعتبارسنجی اولیه پلتفرم یک پیش‌ارزیابی است و جایگزین استعلام‌های رسمی نیست. پیشرو وام متضمن صحت اطلاعات وارد‌شده توسط کاربر یا پذیرندگان نیست؛ در صورت ارائه اطلاعات نادرست، درخواست رد و حساب تا تعیین تکلیف قانونی مسدود می‌شود.',
  },
  {
    icon: ShieldCheck,
    title: '۶. حل اختلاف',
    body: 'این مقررات تابع قوانین جمهوری اسلامی ایران است. هرگونه اختلاف ابتدا از طریق پشتیبانی و در صورت عدم توافق، در مراجع قانونی صالح بررسی خواهد شد. نسخه به‌روزشده مقررات همیشه در همین صفحه منتشر می‌شود و ادامه استفاده از خدمات به معنای پذیرش نسخه جدید است.',
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        badge="اسناد حقوقی"
        title="قوانین و مقررات"
        subtitle="لطفاً پیش از استفاده از خدمات پیشرو وام، این مقررات را با دقت مطالعه کنید."
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
            <p className="rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-700">
              آخرین بروزرسانی: آبان ۱۴۰۳ — برای سؤالات حقوقی با پشتیبانی تماس بگیرید.
              <Link href="/support" className="mr-2 font-bold underline underline-offset-4">تماس با پشتیبانی</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
