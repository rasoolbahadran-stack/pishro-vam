import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'امتیاز اعتباری هوشمند',
  description: 'گزارش جامع امتیاز اعتباری پیشرو وام — طیف امتیاز، عوامل امتیازدهی، روند ماهانه و پیشنهادات بهبود.',
  alternates: { canonical: '/lendtech/credit-score' },
};

export default function CreditScoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
