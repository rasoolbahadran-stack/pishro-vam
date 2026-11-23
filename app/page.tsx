'use client';

// صفحه اصلی — بخش‌ها به‌صورت داده‌محور رندر می‌شوند تا از پنل مدیریت
// قابل جابه‌جایی، فعال/غیرفعال‌سازی و ویرایش باشند.
import type { SectionType } from '@/lib/types';
import { useSite } from '@/lib/store';
import { HeroSection, CalculatorSection, ServicesSection, StatsSection } from '@/components/home/HomeSections1';
import {
  HowItWorksSection,
  PartnersSection,
  PlansSection,
  TestimonialsSection,
  FaqSection,
  CtaSection,
} from '@/components/home/HomeSections2';

const registry: Record<SectionType, React.ComponentType<{ config: import('@/lib/types').SectionConfig }>> = {
  hero: HeroSection,
  calculator: CalculatorSection,
  services: ServicesSection,
  stats: StatsSection,
  howItWorks: HowItWorksSection,
  partners: PartnersSection,
  plans: PlansSection,
  testimonials: TestimonialsSection,
  faq: FaqSection,
  cta: CtaSection,
};

export default function HomePage() {
  const { sections, ready } = useSite();
  const ordered = [...sections].filter((s) => s.enabled);

  if (!ready) {
    return <div className="container-x py-24 text-center text-sm text-slate-400">در حال بارگذاری…</div>;
  }

  return (
    <>
      {ordered.map((section) => {
        const Cmp = registry[section.type];
        if (!Cmp) return null;
        return <Cmp key={section.id} config={section} />;
      })}
    </>
  );
}
