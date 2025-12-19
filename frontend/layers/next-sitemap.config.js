/* @type {import('next-sitemap').IConfig} */
module.exports = {
  // The base URL of your frontend site
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://api.theowner.me',

  // Automatically generate a robots.txt file
  generateRobotsTxt: true,

  // Maximum number of URLs per sitemap file
  sitemapSize: 200,

  // Default change frequency for pages in the sitemap
  changefreq: 'weekly',

  // Default priority for pages in the sitemap
  priority: 0.7,

  // Paths to exclude from the sitemap (like admin pages or API routes)
  exclude: ['/admin/*', '/api'],

  // Configuration for the generated robots.txt
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },                 // Allow all search engines to crawl frontend pages
      { userAgent: '*', disallow: ['/admin', '/api'] }, // Block crawling of backend admin and API endpoints
    ],
    // Include any additional sitemaps (e.g., dynamic server-generated sitemap)
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://api.theowner.me'}/server-sitemap.xml`,
    ],
  },
};
