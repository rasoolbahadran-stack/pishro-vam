// ─────────────────────────────────────────────────────────────
// تایپ‌های اصلی داده‌ای پروژه — پشتیبانِ پنل مدیریت و سایت
// ─────────────────────────────────────────────────────────────

/** انواع بخش‌های صفحه اصلی (هر نوع یک کامپوننت اختصاصی دارد) */
export type SectionType =
  | 'hero'
  | 'calculator'
  | 'services'
  | 'stats'
  | 'howItWorks'
  | 'partners'
  | 'plans'
  | 'testimonials'
  | 'faq'
  | 'cta';

export interface SectionConfig {
  id: string;
  type: SectionType;
  /** عنوان/زیرعنوان قابل ویرایش از پنل مدیریت */
  title?: string;
  subtitle?: string;
  /** تصویر بخش (از کتابخانه رسانه) */
  imageUrl?: string;
  /** دکمه فراخوان اقدام */
  ctaLabel?: string;
  ctaHref?: string;
  /** نمایش یا عدم نمایش بخش در سایت */
  enabled: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  /** نام آیکون lucide */
  icon: string;
  href: string;
  enabled: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number; // 1..5
  enabled: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  enabled: boolean;
}

export interface PlanItem {
  id: string;
  name: string;
  months: number; // حداکثر اقساط
  rate: number; // نرخ سود سالانه ٪
  features: string[];
  popular: boolean;
  enabled: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  alt: string;
  /** dataURL یا URL خارجی */
  src: string;
  kind: 'upload' | 'url';
  createdAt: string;
}

export type PageStatus = 'published' | 'draft';

export interface PageMeta {
  id: string;
  path: string;
  title: string;
  description: string;
  status: PageStatus;
  /** این صفحه در منوی اصلی نمایش داده شود؟ */
  inNav: boolean;
}

export interface SiteSettings {
  siteName: string;
  logoText: string;
  tagline: string;
  heroTitle: string;
  heroHighlight: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  footerNote: string;
  accent: 'green' | 'teal' | 'blue' | 'violet';
  socials: {
    instagram: string;
    telegram: string;
    linkedin: string;
  };
}

export type ApplicationStatus = 'pending' | 'review' | 'approved' | 'rejected';

export interface ApplicationItem {
  id: string;
  trackingCode: string;
  type: string;
  amount: number;
  months: number;
  rate: number;
  monthlyPayment: number;
  downPayment: number;
  status: ApplicationStatus;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: 'payment' | 'approval' | 'plan' | 'system' | 'profile';
  read: boolean;
  action?: string;
}

export interface InstallmentItem {
  id: string;
  number: number;
  applicationCode: string;
  amount: number;
  dueDate: string;
  paid: boolean;
}

export interface ProfileInfo {
  fullName: string;
  nationalId: string;
  mobile: string;
  birthDate: string;
  city: string;
  job: string;
  income: number;
  score: number;
  completed: number;
}

export interface DoctorServiceItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  maxInstallments: number;
  enabled: boolean;
}

export interface OrgPlanItem {
  id: string;
  title: string;
  category: string;
  cap: number; // سقف وام — میلیون تومان
  rate: number;
  maxInstallments: number;
  enabled: boolean;
}
