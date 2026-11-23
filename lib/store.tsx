'use client';

// ─────────────────────────────────────────────────────────────
// Store مرکزی پروژه — اتصال پنل مدیریت به سایت
// تمام داده‌ها در localStorage ذخیره می‌شوند (نسخه دمو استاتیک).
// ─────────────────────────────────────────────────────────────
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type {
  SectionConfig,
  ServiceItem,
  TestimonialItem,
  FaqItem,
  PlanItem,
  MediaItem,
  PageMeta,
  SiteSettings,
  ApplicationItem,
  NotificationItem,
  InstallmentItem,
  ProfileInfo,
} from './types';
import {
  defaultSettings,
  defaultSections,
  defaultServices,
  defaultTestimonials,
  defaultFaqs,
  defaultPlans,
  defaultPages,
  defaultMedia,
  defaultNotifications,
  defaultApplications,
  defaultInstallments,
  defaultProfile,
} from './data';

const PREFIX = 'pv1:';
const KEYS = {
  settings: `${PREFIX}settings`,
  sections: `${PREFIX}sections`,
  services: `${PREFIX}services`,
  testimonials: `${PREFIX}testimonials`,
  faqs: `${PREFIX}faqs`,
  plans: `${PREFIX}plans`,
  media: `${PREFIX}media`,
  pages: `${PREFIX}pages`,
  notifications: `${PREFIX}notifications`,
  applications: `${PREFIX}applications`,
  installments: `${PREFIX}installments`,
  profile: `${PREFIX}profile`,
  adminSession: `${PREFIX}admin-session`,
  authSession: `${PREFIX}auth-session`,
} as const;

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // حجم localStorage پر شده (مثلاً تصویر بزرگ) — نادیده گرفته می‌شود
  }
}

/** هوک عمومی برای مقدار ذخیره‌شده + آپدیت همگام با localStorage */
function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const hydrated = useRef(false);

  useEffect(() => {
    const stored = load<T>(key, initial);
    setValue(stored);
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        save(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return { value, update, hydrated: hydrated.current };
}

export interface SiteStore {
  ready: boolean;
  // تنظیمات و محتوای قابل مدیریت از پنل
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
  sections: SectionConfig[];
  setSections: (s: SectionConfig[]) => void;
  services: ServiceItem[];
  setServices: (s: ServiceItem[]) => void;
  testimonials: TestimonialItem[];
  setTestimonials: (s: TestimonialItem[]) => void;
  faqs: FaqItem[];
  setFaqs: (s: FaqItem[]) => void;
  plans: PlanItem[];
  setPlans: (s: PlanItem[]) => void;
  media: MediaItem[];
  setMedia: (s: MediaItem[]) => void;
  pages: PageMeta[];
  setPages: (s: PageMeta[]) => void;
  // داده‌های سمت کاربر
  applications: ApplicationItem[];
  setApplications: (s: ApplicationItem[]) => void;
  notifications: NotificationItem[];
  setNotifications: (s: NotificationItem[]) => void;
  installments: InstallmentItem[];
  setInstallments: (s: InstallmentItem[]) => void;
  profile: ProfileInfo;
  setProfile: (s: ProfileInfo) => void;
  // نشست‌ها
  adminSession: boolean;
  setAdminSession: (v: boolean) => void;
  authUser: string | null;
  setAuthUser: (v: string | null) => void;
  // ابزار
  resetAll: () => void;
}

const SiteContext = createContext<SiteStore | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const settingsState = usePersisted<SiteSettings>(KEYS.settings, defaultSettings);
  const sectionsState = usePersisted<SectionConfig[]>(KEYS.sections, defaultSections);
  const servicesState = usePersisted<ServiceItem[]>(KEYS.services, defaultServices);
  const testimonialsState = usePersisted<TestimonialItem[]>(KEYS.testimonials, defaultTestimonials);
  const faqsState = usePersisted<FaqItem[]>(KEYS.faqs, defaultFaqs);
  const plansState = usePersisted<PlanItem[]>(KEYS.plans, defaultPlans);
  const mediaState = usePersisted<MediaItem[]>(KEYS.media, defaultMedia);
  const pagesState = usePersisted<PageMeta[]>(KEYS.pages, defaultPages);
  const applicationsState = usePersisted<ApplicationItem[]>(KEYS.applications, defaultApplications);
  const notificationsState = usePersisted<NotificationItem[]>(KEYS.notifications, defaultNotifications);
  const installmentsState = usePersisted<InstallmentItem[]>(KEYS.installments, defaultInstallments);
  const profileState = usePersisted<ProfileInfo>(KEYS.profile, defaultProfile);
  const adminState = usePersisted<boolean>(KEYS.adminSession, false);
  const authState = usePersisted<string | null>(KEYS.authSession, null);

  // تا بارگذاری localStorage از SSR مطابقت کند، رندر آماده صبر می‌کند
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const resetAll = useCallback(() => {
    Object.values(KEYS).forEach((k) => {
      try {
        window.localStorage.removeItem(k);
      } catch {
        /* noop */
      }
    });
    window.location.reload();
  }, []);

  const store = useMemo<SiteStore>(
    () => ({
      ready,
      settings: settingsState.value,
      setSettings: settingsState.update,
      sections: sectionsState.value,
      setSections: sectionsState.update,
      services: servicesState.value,
      setServices: servicesState.update,
      testimonials: testimonialsState.value,
      setTestimonials: testimonialsState.update,
      faqs: faqsState.value,
      setFaqs: faqsState.update,
      plans: plansState.value,
      setPlans: plansState.update,
      media: mediaState.value,
      setMedia: mediaState.update,
      pages: pagesState.value,
      setPages: pagesState.update,
      applications: applicationsState.value,
      setApplications: applicationsState.update,
      notifications: notificationsState.value,
      setNotifications: notificationsState.update,
      installments: installmentsState.value,
      setInstallments: installmentsState.update,
      profile: profileState.value,
      setProfile: profileState.update,
      adminSession: adminState.value,
      setAdminSession: adminState.update,
      authUser: authState.value,
      setAuthUser: authState.update,
      resetAll,
    }),
    [ready, settingsState, sectionsState, servicesState, testimonialsState, faqsState, plansState, mediaState, pagesState, applicationsState, notificationsState, installmentsState, profileState, adminState, authState, resetAll]
  );

  return <SiteContext.Provider value={store}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteStore {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}

/** پیدا کردن وضعیت صفحه بر اساس مسیر (برای نمایش وضعیت انتشار) */
export function pageStatusFor(pages: PageMeta[], path: string): PageMeta | undefined {
  const normalized = path.length > 1 ? path.replace(/\/$/, '') : path;
  return pages.find((p) => p.path === normalized);
}
