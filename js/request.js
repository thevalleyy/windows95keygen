const { RateLimiterMemory } = require("rate-limiter-flexible");
const config = require("../config.json");
const fs = require("node:fs");
const blocklist = config["blocked-ips"];

const rateLimiter = new RateLimiterMemory({
    points: config.limits.requests.requests, // how many requests per
    duration: config.limits.requests.specified_time, // seconds
    blockDuration: config.limits.requests.block_duration, // how long to block requests after max points reached
});

async function blocked(req, res) {
    // log requests if enabled
    const ipAddress = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (config.log.enabled) {
        // /logs/ erstellen
        if (!fs.existsSync(`${config.log.log_path}/`)) {
            fs.mkdirSync(`${config.log.log_path}/`, { recursive: true });
        }

        const json = {
            time: Date.now(),
            ip: config.log.ips ? ipAddress : "IP",
            url: config.log.requests ? req.url : "URL",
        };
        const dateString = new Date().toISOString().substring(0, 10);
        fs.appendFile(`${config.log.log_path}/${dateString}${config.log.log_extention}`, `\n${JSON.stringify(json)}`, (err) => {
            if (err) console.warn(err);
        });
    }

    // check manually blocked ips
    if (config.config.ip_blocklist && blocklist.includes(ipAddress)) {
        // sent blocked status and text
        res.status(403).json("blocked");
        return true;
    }

    // is there a whitelisted key given?
    if (req.query.whitelistKey && config.config.whitelist_keys.includes(req.query.whitelistKey)) return false;

    // is there any blocking enabled?
    if (!config.config.ip_blocklist && !config.config.rate_limit_requests) return false;

    // skip local ips if enabled
    // local ip regex
    const localIpv4Regex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
    if (config.config.skip_local_ips) {
        if (req.connection.remoteAddress.startsWith("::ffff:")) return false;
        if (localIpv4Regex.test(ipAddress)) return false;
        if (ipAddress === "::1") return false;
    }

    // check if rate limiting is enabled
    if (!config.config.rate_limit_requests) return false;

    // rate limiting
    try {
        await rateLimiter.consume(ipAddress, 1).then(() => {
            // not blocked
            return false;
        });
    } catch (error) {
        // blocked
        res.status(429).json(`Too Many Requests. Timeout will be: ${config.limits.requests.block_duration} seconds`);
        return true;
    }
}

module.exports = blocked;
