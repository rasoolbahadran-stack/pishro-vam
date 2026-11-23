import type { Metadata, Viewport } from 'next';
import { SiteProvider } from '@/lib/store';
import { AccentController, PageStatusBanner } from '@/components/layout/ClientChrome';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import './globals.css';

const SITE_URL = 'https://rasoolbahadran-stack.github.io/pishro-vam';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'پیشرو وام | سریع‌ترین مسیر خرید اقساطی و وام آنلاین',
    template: '%s | پیشرو وام',
  },
  description:
    'پیشرو وام؛ وام بدون ضامن، خرید اقساطی، خدمات پزشکی، لیزینگ خودرو و کارت اعتباری — همه در یک پلتفرم هوشمند با اعتبارسنجی آنی.',
  keywords: ['پیشرو وام', 'خرید اقساطی', 'وام بدون ضامن', 'لندتک', 'کارت اعتباری', 'سرمایه‌گذاری'],
  openGraph: {
    type: 'website',
    siteName: 'پیشرو وام',
    url: SITE_URL,
    title: 'پیشرو وام | سریع‌ترین مسیر خرید اقساطی',
    description: 'وام بدون ضامن، خرید اقساطی، خدمات پزشکی و کارت اعتباری با اعتبارسنجی هوشمند',
    locale: 'fa_IR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'پیشرو وام | سریع‌ترین مسیر خرید اقساطی',
    description: 'وام بدون ضامن، خرید اقساطی، خدمات پزشکی و کارت اعتباری',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1baa5a',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'پیشرو وام',
  url: SITE_URL,
  description: 'پلتفرم وام و خرید اقساطی هوشمند',
  areaServed: 'IR',
  telephone: '+98-21-8800-0000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="icon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SiteProvider>
          <AccentController />
          <PageStatusBanner />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-card"
          >
            پرش به محتوای اصلی
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SiteProvider>
      </body>
    </html>
  );
}
