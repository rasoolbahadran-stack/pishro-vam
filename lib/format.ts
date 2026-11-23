// ابزارهای قالب‌بندی اعداد و متن فارسی

const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** تبدیل ارقام لاتین به فارسی */
export function faNum(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** قالب‌بندی پول با جداکننده هزارگان و ارقام فارسی */
export function faMoney(value: number): string {
  const rounded = Math.round(value);
  const grouped = rounded.toLocaleString('en-US');
  return faNum(grouped);
}

/** مبلغ + واحد تومان */
export function faToman(value: number): string {
  return `${faMoney(value)} تومان`;
}

/** تبدیل ارقام فارسی/عربی ورودی کاربر به عدد */
export function parseFaDigits(input: string): number {
  const normalized = input
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[^\d.]/g, '');
  return Number(normalized) || 0;
}

/** تبدیل ارقام فارسی/عربی به رشتهٔ رقم لاتین — حفظ صفرهای ابتدایی (کد ملی، شبا و…) */
export function digitsOnly(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[^\d]/g, '');
}

/** جداکننده هزارگان هنگام تایپ */
export function groupDigits(value: number): string {
  return value.toLocaleString('en-US');
}

// ── محاسبات وام ──────────────────────────────────────────────

export interface LoanCalc {
  monthly: number;
  total: number;
  totalProfit: number;
  eir: number; // نرخ مؤثر سالانه ٪
}

/** قسط ماهانه با فرمول استهلاک (Amortization) */
export function loanCalc(amount: number, months: number, annualRate: number, downPayment = 0): LoanCalc {
  const principal = Math.max(0, amount - downPayment);
  const r = annualRate / 100 / 12;
  let monthly: number;
  if (r <= 0) {
    monthly = months > 0 ? principal / months : principal;
  } else {
    monthly = (principal * r) / (1 - Math.pow(1 + r, -months));
  }
  const total = monthly * months + downPayment;
  const totalProfit = total - amount;
  const eir = (Math.pow(1 + r, 12) - 1) * 100;
  return { monthly, total, totalProfit, eir };
}

export interface AmortRow {
  n: number;
  payment: number;
  principal: number;
  profit: number;
  remaining: number;
}

/** جدول اقساط ماه به ماه */
export function amortizationSchedule(amount: number, months: number, annualRate: number, downPayment = 0): AmortRow[] {
  const principal = Math.max(0, amount - downPayment);
  const r = annualRate / 100 / 12;
  const { monthly } = loanCalc(principal, months, annualRate);
  const rows: AmortRow[] = [];
  let remaining = principal;
  for (let i = 1; i <= months; i++) {
    const profit = remaining * r;
    const principalPart = monthly - profit;
    remaining = Math.max(0, remaining - principalPart);
    rows.push({
      n: i,
      payment: monthly,
      principal: principalPart,
      profit,
      remaining,
    });
  }
  return rows;
}

/** محاسبه امتیاز اعتباری نمایشی بر اساس پارامترها (دمو) */
export function clampScore(v: number, min = 300, max = 850): number {
  return Math.min(max, Math.max(min, Math.round(v)));
}
