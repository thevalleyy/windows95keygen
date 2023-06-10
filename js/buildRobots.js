const fs = require("node:fs");
const config = require("../config.json");

if (!fs.existsSync("./public")) fs.mkdirSync("./public", { recursive: true });

const text = `User-Argent: *
Allow: /

User-Agent: *
Disallow: /api/

Sitemap: ${config.url}${config.url.endsWith("/") ? "" : "/"}sitemap.xml
`;
fs.writeFileSync("./public/robots.txt", text, "utf-8", (err) => {
    console.warn(err);
});
