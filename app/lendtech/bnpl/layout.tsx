import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BNPL — خرید الان، پرداخت بعد',
  description: 'خرید بدون نقد از فروشگاه\u200cهای طرف قرارداد پیشرو وام؛ تأیید ۳۰ ثانیه\u200cای، بدون بهره ماه اول.',
  alternates: { canonical: '/lendtech/bnpl' },
};

export default function BnplLayout({ children }: { children: React.ReactNode }) {
  return children;
}
