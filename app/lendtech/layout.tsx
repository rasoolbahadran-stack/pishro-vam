import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'لندتک پیشرو — فناوری وام‌دهی نسل جدید',
  description:
    'اعتبارسنجی هوش مصنوعی، BNPL، وام خرد آنی، سرمایه‌گذاری آنلاین، کارت اعتباری دیجیتال و لیزینگ خودرو — همه در یک پلتفرم لندتک.',
  alternates: { canonical: '/lendtech' },
};

export default function LendTechLayout({ children }: { children: React.ReactNode }) {
  return children;
}
