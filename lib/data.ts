// داده‌های اولیه (Seed) — محتوای پیش‌فرض سایت که از پنل مدیریت قابل ویرایش است.
// تمام متون این فایل برای این پروژه نگارش شده است.
import type {
  SectionConfig,
  ServiceItem,
  TestimonialItem,
  FaqItem,
  PlanItem,
  SiteSettings,
  PageMeta,
  NotificationItem,
  ApplicationItem,
  InstallmentItem,
  ProfileInfo,
  MediaItem,
} from './types';

export const defaultSettings: SiteSettings = {
  siteName: 'پیشرو وام',
  logoText: 'پیشرو وام',
  tagline: 'سریع‌ترین مسیر خرید اقساطی',
  heroTitle: 'آینده مالی شما، امروز شروع می‌شود',
  heroHighlight: 'سریع‌ترین مسیر',
  phone: '۰۲۱-۸۸۰۰۰۰۰۰',
  email: 'info@pishrovam.ir',
  address: 'تهران، خیابان ولیعصر، برج نگین، طبقه ۱۲',
  workingHours: 'شنبه تا پنجشنبه، ۸ صبح تا ۸ شب',
  footerNote: 'پیشرو وام، زیرمجموعه هلدینگ بین‌المللی پیشرو سرامیک است و خدمات خود را با مجوز نهادهای ناظر ارائه می‌کند.',
  accent: 'green',
  socials: {
    instagram: 'https://instagram.com/pishrovam',
    telegram: 'https://t.me/pishrovam',
    linkedin: 'https://linkedin.com/company/pishrovam',
  },
};

export const defaultSections: SectionConfig[] = [
  { id: 'hero', type: 'hero', title: 'پیشرو وام؛', subtitle: 'وام هوشمند در ۵ دقیقه، بدون ضامن و بدون مراجعه حضوری — از اعتبارسنجی آنی تا واریز وجه، همه‌چیز آنلاین انجام می‌شود.', ctaLabel: 'ثبت‌نام سریع', ctaHref: '/auth', enabled: true },
  { id: 'calculator', type: 'calculator', title: 'محاسبه‌گر هوشمند وام', subtitle: 'مبلغ و تعداد اقساط را انتخاب کنید؛ قسط ماهانه، سود کل و جدول بازپرداخت همان لحظه محاسبه می‌شود.', enabled: true },
  { id: 'services', type: 'services', title: 'خدمات اصلی پیشرو وام', subtitle: 'راهکارهای مالی هوشمند برای هر نیاز — از وام نقدی تا کارت اعتباری', enabled: true },
  { id: 'stats', type: 'stats', title: 'پیشرو وام در یک نگاه', subtitle: 'اعتماد ده‌ها هزار کاربر، حاصل سال‌ها تجربه در خدمات مالی هوشمند است.', enabled: true },
  { id: 'howItWorks', type: 'howItWorks', title: 'چگونه کار می‌کند؟', subtitle: 'در ۴ مرحله ساده وام بگیرید', enabled: true },
  { id: 'partners', type: 'partners', title: 'ویژه عاملین', subtitle: 'برای فروشگاه‌ها، پزشکان و سازمان‌ها', enabled: true },
  { id: 'plans', type: 'plans', title: 'طرح‌های وام پیشرو', subtitle: 'بهترین طرح را برای نیاز خود انتخاب کنید', enabled: true },
  { id: 'testimonials', type: 'testimonials', title: 'کاربران ما چه می‌گویند؟', subtitle: 'تجربه واقعی مشتریان پیشرو وام', enabled: true },
  { id: 'faq', type: 'faq', title: 'سؤالات پرتکرار', subtitle: 'هر آنچه پیش از شروع باید بدانید', enabled: true },
  { id: 'cta', type: 'cta', title: 'همین حالا شروع کنید', subtitle: 'ثبت‌نام کنید و اولین وام خود را در کمتر از ۵ دقیقه دریافت کنید.', ctaLabel: 'شروع رایگان', ctaHref: '/auth', enabled: true },
];

export const defaultServices: ServiceItem[] = [
  { id: 'svc-cash', title: 'وام نقدی بدون ضامن', description: 'دریافت وام نقدی با تأیید سریع، بدون نیاز به ضامن و چک — واریز مستقیم به حساب شما.', icon: 'Banknote', href: '/applications/new', enabled: true },
  { id: 'svc-installment', title: 'خرید اقساطی', description: 'خرید کالا از فروشگاه‌های طرف قرارداد با اقساط منعطف تا ۳۶ ماهه.', icon: 'ShoppingBag', href: '/installments', enabled: true },
  { id: 'svc-medical', title: 'خدمات پزشکی اقساطی', description: 'تأمین هزینه‌های درمان و عمل‌های خاص با پرداخت اقساطی آسان.', icon: 'Stethoscope', href: '/doctors', enabled: true },
  { id: 'svc-card', title: 'کارت اعتباری', description: 'کارت خرید اعتباری مجازی با سقف مناسب و صدور آنلاین در ۷۲ ساعت.', icon: 'CreditCard', href: '/lendtech/card', enabled: true },
  { id: 'svc-auto', title: 'لیزینگ خودرو', description: 'خرید خودروهای داخلی و خارجی با پیش‌پرداخت ۳۰٪ و اقساط تا ۴۸ ماهه.', icon: 'Car', href: '/installments', enabled: true },
  { id: 'svc-invest', title: 'سرمایه‌گذاری آنلاین', description: 'با حداقل ۱ میلیون تومان شروع کنید و سود ماهانه دریافت کنید.', icon: 'TrendingUp', href: '/lendtech/invest', enabled: true },
];

export const defaultTestimonials: TestimonialItem[] = [
  { id: 'tst-1', name: 'احمد رضایی', role: 'مدیر فروشگاه', text: 'با پیوستن به شبکه پذیرندگان پیشرو وام، فروش ماهانه فروشگاه ما حدود ۴۰٪ رشد کرد؛ مشتری‌ها راحت‌تر خرید می‌کنند.', rating: 5, enabled: true },
  { id: 'tst-2', name: 'دکتر سارا موسوی', role: 'پزشک متخصص', text: 'اعتبارسنجی هوشمند واقعاً دقیق است. بیماران من بدون معطلی می‌توانند هزینه درمان را اقساطی تأمین کنند.', rating: 5, enabled: true },
  { id: 'tst-3', name: 'علیرضا نجفی', role: 'کاربر وام خرد', text: 'وام خرد ۵ دقیقه‌ای واقعاً ۵ دقیقه طول کشید؛ از ثبت‌نام تا واریز، همه‌چیز با موبایل انجام شد.', rating: 4, enabled: true },
  { id: 'tst-4', name: 'نازنین کریمی', role: 'کاربر BNPL', text: 'خرید «الان بخر، بعداً پرداخت کن» پیشرو وام را برای خریدهای فوری عاشق شدم؛ ماه اول بدون بهره بود.', rating: 5, enabled: true },
];

export const defaultFaqs: FaqItem[] = [
  { id: 'faq-1', question: 'برای دریافت وام به چه مدارکی نیاز دارم؟', answer: 'فقط کارت ملی و یک مدرک درآمدی (فیش حقوقی یا جواز کسب) کافی است؛ بقیه مراحل به‌صورت آنلاین و با اعتبارسنجی هوشمند انجام می‌شود.', enabled: true },
  { id: 'faq-2', question: 'زمان تأیید و واریز وام چقدر است؟', answer: 'پس از ثبت درخواست، موتور اعتبارسنجی در کمتر از ۵ دقیقه نتیجه را اعلام می‌کند و پس از امضای قرارداد، مبلغ در کمتر از ۷۲ ساعت کاری واریز می‌شود.', enabled: true },
  { id: 'faq-3', question: 'آیا به ضامن یا چک نیاز است؟', answer: 'خیر؛ در اغلب طرح‌های پیشرو وام به ضامن و چک نیازی نیست و اعتبارسنجی بر اساس پرونده مالی شما انجام می‌شود.', enabled: true },
  { id: 'faq-4', question: 'حداقل و حداکثر مبلغ وام چقدر است؟', answer: 'وام‌های خرد از ۱ میلیون تومان شروع می‌شوند و بر اساس امتیاز اعتباری، تا ۵۰۰ میلیون تومان سقف تعیین می‌شود.', enabled: true },
  { id: 'faq-5', question: 'می‌توانم اقساط را زودتر تسویه کنم؟', answer: 'بله؛ بازپرداخت زودتر از موعد بدون جریمه است و بخشی از سود کل نیز به‌صورت خودکار کسر می‌شود.', enabled: true },
];

export const defaultPlans: PlanItem[] = [
  { id: 'plan-basic', name: 'پایه', months: 12, rate: 24, features: ['اقساط ۱۲ ماهه', 'پشتیبانی استاندارد', 'تأیید در ۴۸ ساعت', 'امکان تمدید اقساط'], popular: false, enabled: true },
  { id: 'plan-pro', name: 'حرفه‌ای', months: 24, rate: 20, features: ['اقساط ۲۴ ماهه', 'پشتیبانی اولویت‌دار', 'تأیید در ۲۴ ساعت', 'تخفیف بازپرداخت زودتر'], popular: true, enabled: true },
  { id: 'plan-vip', name: 'VIP', months: 36, rate: 18, features: ['اقساط ۳۶ ماهه', 'پشتیبانی VIP شبانه‌روزی', 'تأیید در ۱۲ ساعت', 'سقف اعتباری دوبرابر'], popular: false, enabled: true },
];

export const defaultPages: PageMeta[] = [
  { id: 'pg-home', path: '/', title: 'صفحه اصلی', description: 'معرفی خدمات وام و خرید اقساطی پیشرو وام', status: 'published', inNav: true },
  { id: 'pg-installments', path: '/installments', title: 'خرید اقساطی', description: 'خرید اقساطی از فروشگاه‌های طرف قرارداد', status: 'published', inNav: true },
  { id: 'pg-lendtech', path: '/lendtech', title: 'لندتک پیشرو', description: 'فناوری وام‌دهی نسل جدید', status: 'published', inNav: true },
  { id: 'pg-bnpl', path: '/lendtech/bnpl', title: 'BNPL', description: 'خرید الان، پرداخت بعد', status: 'published', inNav: false },
  { id: 'pg-card', path: '/lendtech/card', title: 'کارت اعتباری', description: 'کارت اعتباری دیجیتال', status: 'published', inNav: false },
  { id: 'pg-credit-score', path: '/lendtech/credit-score', title: 'امتیاز اعتباری', description: 'گزارش جامع امتیاز اعتباری', status: 'published', inNav: false },
  { id: 'pg-invest', path: '/lendtech/invest', title: 'سرمایه‌گذاری', description: 'سرمایه‌گذاری آنلاین P2P', status: 'published', inNav: false },
  { id: 'pg-doctors', path: '/doctors', title: 'پزشکان', description: 'پنل پزشکان و کلینیک‌ها', status: 'published', inNav: true },
  { id: 'pg-merchants', path: '/merchants', title: 'پذیرندگان', description: 'پنل فروشگاه‌ها و عاملین', status: 'published', inNav: true },
  { id: 'pg-organizations', path: '/organizations', title: 'سازمان‌ها', description: 'پنل سازمان‌ها و طرح‌های رفاهی', status: 'published', inNav: true },
  { id: 'pg-support', path: '/support', title: 'پشتیبانی', description: 'ارسال تیکت و سؤالات پرتکرار', status: 'published', inNav: true },
];

export const defaultMedia: MediaItem[] = [
  { id: 'med-1', name: 'hero-illustration.svg', alt: 'تصویر مفهومی خدمات مالی پیشرو وام', kind: 'url', src: 'hero-illustration', createdAt: '۱۴۰۳/۰۸/۰۱' },
];

export const defaultNotifications: NotificationItem[] = [
  { id: 'n1', title: 'هشدار سررسید قسط', body: 'قسط دوم پرونده APP-104۲ تا سه روز آینده سررسید می‌شود؛ برای جلوگیری از جریمه، از داشبورد پرداخت را انجام دهید.', time: '۲ ساعت پیش', kind: 'payment', read: false, action: 'پرداخت قسط' },
  { id: 'n2', title: 'درخواست شما تأیید شد', body: 'درخواست وام شما با کد APP-1042 تأیید شد و مبلغ ۵۰ میلیون تومان طی ۲۴ ساعت آینده به حساب شما واریز می‌شود.', time: '۵ ساعت پیش', kind: 'approval', read: false, action: 'مشاهده جزئیات' },
  { id: 'n3', title: 'طرح جدید اقساطی', body: 'طرح ویژه پاییز با نرخ ۱۸٪ سالانه و اقساط تا ۳۶ ماهه فعال شد؛ همین حالا درخواست بدهید.', time: 'دیروز', kind: 'plan', read: false, action: 'مشاهده طرح' },
  { id: 'n4', title: 'پرداخت قسط با موفقیت انجام شد', body: 'قسط ماه مهر پرونده شما به مبلغ ۳٬۸۷۵٬۰۰۰ تومان پرداخت شد؛ رسید پرداخت در پروفایل شما ثبت گردید.', time: '۳ روز پیش', kind: 'payment', read: true, action: 'مشاهده رسید' },
  { id: 'n5', title: 'تکمیل اطلاعات هویتی', body: 'پروفایل شما ۷۰٪ تکمیل شده است؛ با تکمیل بخش‌های باقیمانده، سقف اعتباری شما افزایش می‌یابد.', time: '۴ روز پیش', kind: 'profile', read: true, action: 'تکمیل پروفایل' },
  { id: 'n6', title: 'امتیاز اعتباری به‌روز شد', body: 'امتیاز اعتباری شما از ۷۲۰ به ۷۴۸ افزایش یافت و سقف وام شما ۱۰٪ رشد کرد.', time: '۵ روز پیش', kind: 'system', read: true, action: 'مشاهده گزارش' },
];

export const defaultApplications: ApplicationItem[] = [
  { id: 'app-1042', trackingCode: 'APP-1042', type: 'وام نقدی بدون ضامن', amount: 50_000_000, months: 12, rate: 20, monthlyPayment: 4_640_000, downPayment: 0, status: 'approved', createdAt: '۱۴۰۳/۰۸/۱۸' },
  { id: 'app-1029', trackingCode: 'APP-1029', type: 'خرید اقساطی لوازم منزل', amount: 30_000_000, months: 18, rate: 22, monthlyPayment: 1_970_000, downPayment: 5_000_000, status: 'pending', createdAt: '۱۴۰۳/۰۸/۱۰' },
  { id: 'app-1014', trackingCode: 'APP-1014', type: 'خدمات پزشکی', amount: 12_000_000, months: 6, rate: 24, monthlyPayment: 2_160_000, downPayment: 0, status: 'review', createdAt: '۱۴۰۳/۰۷/۲۹' },
];

export const defaultInstallments: InstallmentItem[] = [
  { id: 'ins-1', number: 1, applicationCode: 'APP-1042', amount: 4_640_000, dueDate: '۱۴۰۳/۰۷/۱۸', paid: true },
  { id: 'ins-2', number: 2, applicationCode: 'APP-1042', amount: 4_640_000, dueDate: '۱۴۰۳/۰۸/۱۸', paid: false },
  { id: 'ins-3', number: 3, applicationCode: 'APP-1042', amount: 4_640_000, dueDate: '۱۴۰۳/۰۹/۱۸', paid: false },
  { id: 'ins-4', number: 4, applicationCode: 'APP-1042', amount: 4_640_000, dueDate: '۱۴۰۳/۱۰/۱۸', paid: false },
  { id: 'ins-5', number: 1, applicationCode: 'APP-1029', amount: 1_970_000, dueDate: '۱۴۰۳/۰۸/۲۵', paid: false },
  { id: 'ins-6', number: 2, applicationCode: 'APP-1029', amount: 1_970_000, dueDate: '۱۴۰۳/۰۹/۲۵', paid: false },
];

export const defaultProfile: ProfileInfo = {
  fullName: 'علی محمدی',
  nationalId: '0012345678',
  mobile: '۰۹۱۲۳۴۵۶۷۸۹',
  birthDate: '۱۳۷۰/۰۱/۰۱',
  city: 'تهران',
  job: 'کارمند شرکت خصوصی',
  income: 15_000_000,
  score: 748,
  completed: 70,
};

export const defaultDoctorServices = [
  { id: 'ds-1', name: 'ایمپلنت دندان', category: 'دندانپزشکی', basePrice: 25_000_000, maxInstallments: 12, enabled: true },
  { id: 'ds-2', name: 'جراحی بینی', category: 'زیبایی', basePrice: 45_000_000, maxInstallments: 18, enabled: true },
  { id: 'ds-3', name: 'لیزیک چشم', category: 'چشم‌پزشکی', basePrice: 30_000_000, maxInstallments: 12, enabled: true },
  { id: 'ds-4', name: 'عمل آپاندیس', category: 'جراحی عمومی', basePrice: 18_000_000, maxInstallments: 6, enabled: true },
  { id: 'ds-5', name: 'پیوند مو', category: 'پوست و مو', basePrice: 35_000_000, maxInstallments: 12, enabled: false },
];

export const defaultOrgPlans = [
  { id: 'op-1', title: 'وام ازدواج', category: 'ازدواج', cap: 200, rate: 18, maxInstallments: 36, enabled: true },
  { id: 'op-2', title: 'وام ضروری پزشکی', category: 'پزشکی', cap: 150, rate: 18, maxInstallments: 24, enabled: true },
  { id: 'op-3', title: 'وام مسکن کارمندی', category: 'مسکن', cap: 500, rate: 20, maxInstallments: 36, enabled: true },
  { id: 'op-4', title: 'وام تحصیلی فرزندان', category: 'تحصیلی', cap: 80, rate: 16, maxInstallments: 24, enabled: false },
];
