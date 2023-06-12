const config = require("./config.json");

/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: config.url,
    generateRobotsTxt: false, // (optional)
    sitemapSize: 7000,
    generateIndexSitemap: false,
    // ...other options
};
