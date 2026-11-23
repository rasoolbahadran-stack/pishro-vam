/** @type {import('next').NextConfig} */

// GitHub Pages static export:
// - output: 'export'  → خروجی کاملاً استاتیک در پوشه out
// - basePath          → مسیر مخزن (/pishro-vam) هنگام دیپلوی زیر دامنه github.io
// - trailingSlash     → سازگاری با سرو دهی فایل‌های index.html در GitHub Pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
