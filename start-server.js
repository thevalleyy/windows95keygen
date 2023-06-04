const config = require("./config.json"); // require config
const start = require("next/dist/cli/next-start");

start.nextStart(["-p", config.config.port]);
