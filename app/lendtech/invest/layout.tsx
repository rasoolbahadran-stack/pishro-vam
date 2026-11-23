import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سرمایه\u200cگذاری آنلاین P2P',
  description: 'سرمایه\u200cگذاری آنلاین با حداقل ۱ میلیون تومان و سود دوره\u200cای — سبد وام\u200cهای متنوع و گزارش شفاف ماهانه.',
  alternates: { canonical: '/lendtech/invest' },
};

export default function InvestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
