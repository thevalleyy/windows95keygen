const fs = require("node:fs");
const OEmbedConfig = require("../config.json")["oEmbed-meta-data"];
const config = require("../config.json");

function buildRobots() {
    if (!config.generate["robots.txt"]) return console.log("\x1b[36m info\x1b[0m  - skipped robots.txt");
    const text = `User-Argent: *
Allow: /

User-Agent: *
Disallow: /api/
    
Sitemap: ${config.url}${config.url.endsWith("/") ? "" : "/"}sitemap.xml`;
    fs.writeFileSync("./public/robots.txt", text, "utf-8", (err) => {
        console.warn(err);
    });

    console.log("\x1b[36m info\x1b[0m  - built robots.txt");
}

function buildOEmbed() {
    // console.log(process.cwd());

    if (!fs.existsSync("./public")) fs.mkdirSync("./public", { recursive: true });
    fs.writeFileSync("./public/oembed.json", JSON.stringify(OEmbedConfig, null, 4), "utf-8", (err) => {
        console.warn(err);
    });

    console.log("\x1b[36m info\x1b[0m  - built oembed.json");
}

try {
    buildRobots();
} catch (err) {
    throw err;
}

try {
    buildOEmbed();
} catch (err) {
    throw err;
}
