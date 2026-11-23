import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'کارت اعتباری دیجیتال',
  description: 'کارت اعتباری مجازی پیشرو وام با سقف تا ۱۰۰ میلیون تومان، صدور ۷۲ ساعته و مدیریت کامل آنلاین.',
  alternates: { canonical: '/lendtech/card' },
};

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
