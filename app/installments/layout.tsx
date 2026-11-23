import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'خرید اقساطی از فروشگاه\u200cهای طرف قرارداد',
  description: 'خرید اقساطی کالا و خدمات از فروشگاه\u200cهای طرف قرارداد پیشرو وام با اقساط تا ۳۶ ماهه و تأیید آنی.',
  alternates: { canonical: '/installments' },
};

export default function InstallmentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
