const { RateLimiterMemory } = require("rate-limiter-flexible");
const config = require("../config.json");
const fs = require("node:fs");
const blocklist = config["blocked-ips"];

const rateLimiter = new RateLimiterMemory({
    points: config.limits.requests.requests, // how many requests per
    duration: config.limits.requests.specified_time, // seconds
    blockDuration: config.limits.requests.block_duration, // how long to block requests after max points reached
});

async function blocked(req, res, ip) {
    // log requests if enabled
    const ipAddress = ip;

    // check manually blocked ips (prio 1)
    if (config.config.ip_blocklist && blocklist.includes(ipAddress)) {
        res.status(403).json("blocked"); // sent blocked status and text
        return [true, "blacklist"];
    }

    // is there a whitelisted key given?
    if (req.query.whitelistKey && config.config.whitelist_keys.includes(req.query.whitelistKey)) return [false, "whitelist"];

    // skip local ips if enabled
    // this won't work unless the request originates from the same machine as the server
    // even if the request server stands one meter away from the api server
    const localIpv4Regex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/; // local ip regex
    if (config.config.skip_local_ips) {
        if (ipAddress.startsWith("::ffff:")) return [false, "local"]; // ipv4 mapped ipv6
        if (ipAddress === "::1") return [false, "local"]; // ipv6 localhost
        if (localIpv4Regex.test(ipAddress)) return [false, "local"]; // ipv4 localhost
    }

    // is the rate limit active? if not, skip rest of the checks
    if (!config.config.rate_limit_requests) return [false, "no further checks"];

    try {
        const imaginaryVariableThatHasLiterallyNoUse = await rateLimiter.consume(ipAddress, 1);
        return [false, "not ratelimited"]; // not blocked
    } catch (error) {
        res.status(429).json(`Too Many Requests. Timeout will be: ${config.limits.requests.block_duration} seconds`);
        return [true, "ratelimited"]; // blocked
    }
}

async function writeLog(type, reason, ip, url, time) {
    if (!config.log.enabled) return;

    // create log folder if it doesn't exist
    if (!fs.existsSync(`${config.log.log_path}/`)) fs.mkdirSync(`${config.log.log_path}/`, { recursive: true });

    const json = {
        type: type,
        reason: reason,
        time: time,
        ip: config.log.ips ? ip : "IP",
        url: config.log.requests ? url : "URL",
    };

    const dateString = new Date(time).toISOString().substring(0, 10);
    fs.appendFile(`${config.log.log_path}/${dateString}${config.log.log_extention}`, `\n${JSON.stringify(json)}`, (err) => {
        if (err) console.warn(err);
    });
}

async function requestBlock(req, res) {
    const time = Date.now(); // request time
    const ipAddress = req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.connection.remoteAddress; // clients ip address
    const result = await blocked(req, res, ipAddress);

    if (result[0]) {
        writeLog("blocked", result[1], ipAddress, req.url, time);
        return true; // blocked
    } else {
        writeLog("allowed", result[1], ipAddress, req.url, time);
        return false; // not blocked
    }
}

module.exports = requestBlock;
