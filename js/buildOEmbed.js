const fs = require("node:fs");
const OEmbedConfig = require("../config.json")["oEmbed-meta-data"];

// console.log(process.cwd());

if (!fs.existsSync("./public")) fs.mkdirSync("./public", { recursive: true });
fs.writeFileSync("./public/oembed.json", JSON.stringify(OEmbedConfig, null, 4), "utf-8", (err) => {
    console.warn(err);
});
