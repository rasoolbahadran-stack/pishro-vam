import type { MetadataRoute } from 'next';

const BASE = 'https://rasoolbahadran-stack.github.io/pishro-vam';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/installments/', priority: 0.9 },
    { path: '/lendtech/', priority: 0.9 },
    { path: '/lendtech/bnpl/', priority: 0.8 },
    { path: '/lendtech/card/', priority: 0.8 },
    { path: '/lendtech/credit-score/', priority: 0.8 },
    { path: '/lendtech/invest/', priority: 0.8 },
    { path: '/doctors/', priority: 0.7 },
    { path: '/doctors/register/', priority: 0.6 },
    { path: '/merchants/', priority: 0.7 },
    { path: '/merchants/register/', priority: 0.6 },
    { path: '/organizations/', priority: 0.7 },
    { path: '/organizations/register/', priority: 0.6 },
    { path: '/support/', priority: 0.6 },
    { path: '/terms/', priority: 0.3 },
    { path: '/privacy/', priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r.priority,
  }));
}
