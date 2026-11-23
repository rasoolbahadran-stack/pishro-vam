import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'داشبورد مشتری',
  description: 'مدیریت اقساط، درخواست\u200cهای وام و امتیاز اعتباری در داشبورد پیشرو وام',
  alternates: { canonical: '' },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
