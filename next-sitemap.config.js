import config from "./config.json" with { type: "json" };

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
    siteUrl: config.url,
    generateRobotsTxt: false, // (optional)
    sitemapSize: 7000,
    generateIndexSitemap: false,
};

export default sitemapConfig;