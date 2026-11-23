import type { MetadataRoute } from 'next';

const BASE = 'https://rasoolbahadran-stack.github.io/pishro-vam';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/profile/', '/applications/', '/auth/'],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
