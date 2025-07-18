// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://vform.in',
  generateRobotsTxt: true,
  exclude: ['/careers'],
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/careers'],
      },
    ],
  },
};
