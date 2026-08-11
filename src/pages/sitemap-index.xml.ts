import { getCollection } from 'astro:content';

const siteUrl = 'https://lacabinepodcasts.com';

const staticPages = [
  { url: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
  { url: `${siteUrl}/studio-podcast-video-photo-reunion/`, priority: '0.9', changefreq: 'monthly' },
  { url: `${siteUrl}/creation-contenu-influenceurs-reunion/`, priority: '0.9', changefreq: 'monthly' },
  { url: `${siteUrl}/video-sales-letter-temoignages-clients-reunion/`, priority: '0.9', changefreq: 'monthly' },
  { url: `${siteUrl}/les-escaliers-sont-en-papier/`, priority: '0.8', changefreq: 'monthly' },
  { url: `${siteUrl}/regarder/`, priority: '0.7', changefreq: 'weekly' },
  { url: `${siteUrl}/blog/`, priority: '0.8', changefreq: 'weekly' },
  { url: `${siteUrl}/mentions-legales/`, priority: '0.2', changefreq: 'yearly' },
  { url: `${siteUrl}/politique-de-confidentialite/`, priority: '0.2', changefreq: 'yearly' },
];

export async function GET() {
  const posts = await getCollection('blog');

  const blogUrls = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: post.data.date.toISOString().split('T')[0],
  }));

  const allUrls = [...staticPages, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
