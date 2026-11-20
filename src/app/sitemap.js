import { site } from '@/content/site';
import { destinations } from '@/content/destinations';

export const dynamic = 'force-static';

export default function sitemap() {
  const routes = ['/', '/destinations/', ...Object.keys(destinations).map((s) => `/destinations/${s}/`), '/our-story/', '/contact/'];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: 'monthly',
    priority: r === '/' ? 1 : r.startsWith('/destinations/') ? 0.9 : 0.7,
  }));
}
