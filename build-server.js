const build = require("next/dist/cli/next-build");
build.nextBuild();

require("./js/buildOEmbed.js");
require("./js/buildRobots.js");
