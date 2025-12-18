/* @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/user/settings'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },       // allow frontend pages
      { userAgent: '*', disallow: ['/admin', '/api'] }, // block backend/admin
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.com'}/server-sitemap.xml`,
    ],
  },
};
